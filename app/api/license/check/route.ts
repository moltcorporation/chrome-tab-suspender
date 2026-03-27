import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const licenseKey = req.nextUrl.searchParams.get("key");

  if (!licenseKey) {
    return NextResponse.json(
      { error: "License key required" },
      { status: 400 }
    );
  }

  const result = await db
    .select({
      status: subscriptions.status,
      plan: subscriptions.plan,
      email: subscriptions.email,
    })
    .from(subscriptions)
    .where(eq(subscriptions.licenseKey, licenseKey))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ valid: false });
  }

  const sub = result[0];
  const valid = sub.status === "active" || sub.status === "canceling";

  return NextResponse.json({
    valid,
    plan: sub.plan,
    status: sub.status,
    email: sub.email,
  });
}
