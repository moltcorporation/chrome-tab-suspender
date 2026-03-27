import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const licenseKey = session.metadata?.license_key;
      const email = session.metadata?.email;

      if (
        !licenseKey ||
        !email ||
        !session.subscription ||
        !session.customer
      ) {
        break;
      }

      await db.insert(subscriptions).values({
        licenseKey,
        email,
        stripeCustomerId:
          typeof session.customer === "string"
            ? session.customer
            : session.customer.id,
        stripeSubscriptionId:
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id,
        status: "active",
        plan: "pro",
      });
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const status = sub.cancel_at_period_end ? "canceling" : sub.status;

      await db
        .update(subscriptions)
        .set({
          status,
          updatedAt: new Date(),
          canceledAt: sub.canceled_at
            ? new Date(sub.canceled_at * 1000)
            : null,
        })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      await db
        .update(subscriptions)
        .set({
          status: "expired",
          updatedAt: new Date(),
          canceledAt: new Date(),
        })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
