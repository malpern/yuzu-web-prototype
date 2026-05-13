import type { AppIcon } from "../data/app-icons";
import type { KeycapColor } from "../data/colors";
import type { FKeyDisplay } from "../hooks/useKeyboard";

const F_KEY_TO_KEYCODE: Record<string, string> = {
  F1: "F13", F2: "F14", F3: "F15", F4: "F16",
  F5: "F17", F6: "F18", F7: "F19", F8: "F20",
  F9: "F21", F10: "F22", F11: "F23", F12: "F24",
};

const APP_PATHS: Record<string, string> = {
  "com.figma.Desktop": "/Applications/Figma.app",
  "com.tinyspeck.slackmacgap": "/Applications/Slack.app",
  "com.spotify.client": "/Applications/Spotify.app",
  "com.google.Chrome": "/Applications/Google Chrome.app",
  "com.hnc.Discord": "/Applications/Discord.app",
  "notion.id": "/Applications/Notion.app",
  "com.apple.dt.Xcode": "/Applications/Xcode.app",
  "com.linear": "/Applications/Linear.app",
  "com.apple.Terminal": "/System/Applications/Utilities/Terminal.app",
  "com.todesktop.230313mzl4w4u92": "/Applications/Cursor.app",
  "us.zoom.xos": "/Applications/zoom.us.app",
  "com.microsoft.VSCode": "/Applications/Visual Studio Code.app",
};

function buildDeepLink(assignments: Record<string, AppIcon | null>): string {
  const mappings = Object.entries(assignments)
    .filter(([, app]) => app !== null)
    .map(([fkey, app]) => ({
      keycode: F_KEY_TO_KEYCODE[fkey] || fkey,
      app_name: app!.name,
      bundle_id: app!.bundleId,
      app_path: APP_PATHS[app!.bundleId] || `/Applications/${app!.name}.app`,
    }));

  const config = {
    version: 1,
    mappings,
    show_tray_icon: false,
    launch_at_login: true,
  };

  const json = JSON.stringify(config);
  const b64 = btoa(json);
  return `yuzu://import?config=${encodeURIComponent(b64)}`;
}

interface OrderConfirmationProps {
  assignments: Record<string, AppIcon | null>;
  keycapColor: KeycapColor;
  legendColor: KeycapColor;
  fkeyDisplay: FKeyDisplay;
  onBack: () => void;
}

export function OrderConfirmation({ assignments, keycapColor, legendColor, fkeyDisplay, onBack }: OrderConfirmationProps) {
  const assignedKeys = Object.entries(assignments).filter(([, app]) => app !== null) as [string, AppIcon][];
  const deepLink = buildDeepLink(assignments);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F8F6F1",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#281E2C",
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#8D5ED1" }}>Y</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#6696CE" }}>U</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#DC633E" }}>Z</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#F29E35" }}>U</span>
          <span style={{ marginLeft: 16, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Keycaps
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px" }}>
        {/* Success banner */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px" }}>
            Keycaps Ordered
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>
            Your custom TKL keycaps are being prepared. Set up your Yuzu Launcher below.
          </p>
        </div>

        {/* Order summary card */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#c4956e", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
            Order Summary
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>Mode Loop TKL</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Cherry profile, PBT dye sub</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>$80.80</div>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
            <div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Base Color</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 4,
                  background: keycapColor.hex,
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.08)",
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{keycapColor.id}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Legend Color</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 4,
                  background: legendColor.hex,
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.08)",
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{legendColor.id}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>Icon Style</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                {fkeyDisplay === "icon" ? "Full Color" : fkeyDisplay === "silhouette" ? "Silhouette" : fkeyDisplay === "dual" ? "Icon + Label" : "Label Only"}
              </span>
            </div>
          </div>

          {/* F-key assignments */}
          <div style={{ fontSize: 11, color: "#999", marginBottom: 8 }}>App Launcher Keys ({assignedKeys.length}/12)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {assignedKeys.map(([fkey, app]) => (
              <div
                key={fkey}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  background: "#f8f6f2",
                  borderRadius: 8,
                }}
              >
                <img src={app.icon} alt={app.name} style={{ width: 24, height: 24, borderRadius: 5 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#333", lineHeight: 1.2 }}>{app.name}</div>
                  <div style={{ fontSize: 9, color: "#aaa" }}>{fkey}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep link card */}
        <div style={{
          background: "linear-gradient(135deg, #281E2C 0%, #3a2a42 100%)",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
            Configure Yuzu Launcher
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", lineHeight: 1.5 }}>
            Click the button below to automatically configure your Yuzu Launcher app
            with the apps you selected. Your F-keys will be mapped to launch these apps instantly.
          </p>

          <a
            href={deepLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#DC633E",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            Open in Yuzu Launcher →
          </a>

          <div style={{ marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            Don't have the app? <a href="#" style={{ color: "#DC633E", textDecoration: "underline" }}>Download Yuzu Launcher</a>
          </div>
        </div>

        {/* Technical details (collapsible) */}
        <details style={{
          background: "#fff",
          borderRadius: 12,
          padding: "16px 24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 24,
        }}>
          <summary style={{ fontSize: 12, fontWeight: 600, color: "#888", cursor: "pointer", marginBottom: 8 }}>
            Technical Details
          </summary>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 8 }}>Deep Link URL:</div>
          <div style={{
            background: "#f5f3f0",
            borderRadius: 6,
            padding: "10px 12px",
            fontSize: 10,
            fontFamily: "monospace",
            color: "#666",
            wordBreak: "break-all",
            lineHeight: 1.5,
          }}>
            {deepLink}
          </div>
          <div style={{ fontSize: 11, color: "#999", marginTop: 12, marginBottom: 8 }}>Decoded Config:</div>
          <pre style={{
            background: "#f5f3f0",
            borderRadius: 6,
            padding: "10px 12px",
            fontSize: 10,
            fontFamily: "monospace",
            color: "#666",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            lineHeight: 1.4,
            margin: 0,
          }}>
            {JSON.stringify(JSON.parse(atob(decodeURIComponent(deepLink.split("config=")[1]))), null, 2)}
          </pre>
        </details>

        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 13,
            color: "#666",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          ← Back to Configurator
        </button>
      </main>
    </div>
  );
}
