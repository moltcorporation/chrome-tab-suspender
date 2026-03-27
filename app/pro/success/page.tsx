"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const licenseKey = searchParams.get("license_key");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a1a",
        color: "#e0e0e8",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #34d399, #14b8a6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: "28px",
          }}
        >
          &#10003;
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          Welcome to Pro!
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#a0a0b0",
            marginBottom: "32px",
          }}
        >
          Your subscription is now active. Copy your license key below and paste
          it into the extension popup to unlock Pro features.
        </p>

        {licenseKey && (
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid #3a3a4c",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#8888a0",
                marginBottom: "8px",
              }}
            >
              Your License Key
            </div>
            <code
              style={{
                fontSize: "14px",
                color: "#34d399",
                background: "#252538",
                padding: "8px 12px",
                borderRadius: "6px",
                display: "block",
                wordBreak: "break-all",
                userSelect: "all",
              }}
            >
              {licenseKey}
            </code>
            <p
              style={{
                fontSize: "12px",
                color: "#666680",
                marginTop: "12px",
              }}
            >
              Click the extension icon &rarr; Enter this key &rarr; Click
              Activate
            </p>
          </div>
        )}

        <div style={{ fontSize: "13px", color: "#666680" }}>
          <p>Pro features include:</p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "8px",
              lineHeight: "1.8",
            }}
          >
            <li>Unlimited domain whitelist</li>
            <li>Tab group suspension rules</li>
            <li>Scheduled suspension windows</li>
            <li>Per-site custom timeouts</li>
            <li>Cloud session backup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
