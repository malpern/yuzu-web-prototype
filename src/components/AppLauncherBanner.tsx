import type { FKeyDisplay } from "../hooks/useKeyboard";
import type { AppIcon } from "../data/app-icons";
import { PACK_PRESETS, getPackIcons, type PackPreset } from "../data/packs";

const BASE = import.meta.env.BASE_URL;
const SHOWCASE_ICONS = [
  { name: "Figma", icon: `${BASE}icons/figma.png` },
  { name: "Slack", icon: `${BASE}icons/slack.png` },
  { name: "Spotify", icon: `${BASE}icons/spotify.png` },
  { name: "Chrome", icon: `${BASE}icons/chrome.png` },
  { name: "Discord", icon: `${BASE}icons/discord.png` },
  { name: "Notion", icon: `${BASE}icons/notion.png` },
  { name: "Xcode", icon: `${BASE}icons/xcode.png` },
  { name: "Linear", icon: `${BASE}icons/linear.png` },
  { name: "Terminal", icon: `${BASE}icons/terminal.png` },
  { name: "Sketch", icon: `${BASE}icons/sketch.png` },
  { name: "Cursor", icon: `${BASE}icons/cursor.png` },
  { name: "Zoom", icon: `${BASE}icons/zoom.png` },
];

const DISPLAY_OPTIONS: { value: FKeyDisplay; label: string; desc: string }[] = [
  { value: "label", label: "F1", desc: "Label only" },
  { value: "icon", label: "⬤", desc: "Full color" },
  { value: "silhouette", label: "◐", desc: "Silhouette" },
  { value: "dual", label: "⬤ F1", desc: "Icon + label" },
];

type BannerPhase = "promo" | "packs" | "active";

interface AppLauncherBannerProps {
  phase: BannerPhase;
  onPhaseChange: (p: BannerPhase) => void;
  assignedCount: number;
  fkeyDisplay: FKeyDisplay;
  onDisplayChange: (d: FKeyDisplay) => void;
  onApplyPack: (icons: (AppIcon | null)[], packId?: string) => void;
}

export function AppLauncherBanner({
  phase,
  onPhaseChange,
  assignedCount,
  fkeyDisplay,
  onDisplayChange,
  onApplyPack,
}: AppLauncherBannerProps) {
  const maxHeight = phase === "promo" ? 160 : phase === "packs" ? 220 : 56;

  return (
    <div
      style={{
        maxWidth: 980,
        width: "100%",
        maxHeight,
        overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <BannerContent
        phase={phase}
        onPhaseChange={onPhaseChange}
        assignedCount={assignedCount}
        fkeyDisplay={fkeyDisplay}
        onDisplayChange={onDisplayChange}
        onApplyPack={onApplyPack}
      />
    </div>
  );
}

function BannerContent({
  phase,
  onPhaseChange,
  assignedCount,
  fkeyDisplay,
  onDisplayChange,
  onApplyPack,
}: AppLauncherBannerProps) {
  if (phase === "active") {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 980,
          width: "100%",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          border: "1px solid #eae7e2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>
            App Launchers
          </span>
          <span style={{ fontSize: 11, color: "#999" }}>
            {assignedCount}/12 assigned
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onPhaseChange("packs")}
            style={{
              fontSize: 11,
              color: "#999",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#DC633E"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; }}
          >
            Change pack
          </button>

          <div style={{ display: "flex", gap: 2, background: "#f0ede8", borderRadius: 6, padding: 2 }}>
            {DISPLAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onDisplayChange(opt.value)}
                title={opt.desc}
                style={{
                  padding: "4px 10px",
                  fontSize: 10,
                  fontWeight: 600,
                  color: fkeyDisplay === opt.value ? "#1a1a1a" : "#aaa",
                  background: fkeyDisplay === opt.value ? "#fff" : "transparent",
                  border: fkeyDisplay === opt.value ? "1px solid #ddd" : "1px solid transparent",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "packs") {
    return <PackPicker onApplyPack={onApplyPack} onCustomize={() => onPhaseChange("active")} />;
  }

  // Promo
  return (
    <button
      onClick={() => onPhaseChange("packs")}
      style={{
        background: "linear-gradient(135deg, #281E2C 0%, #3a2a42 50%, #2d1f33 100%)",
        borderRadius: 12,
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        maxWidth: 980,
        width: "100%",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(220, 99, 62, 0.3)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 6,
          flexShrink: 0,
        }}
      >
        {SHOWCASE_ICONS.map((app) => (
          <img
            key={app.name}
            src={app.icon}
            alt={app.name}
            style={{ width: 32, height: 32, borderRadius: 7, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          />
        ))}
      </div>

      <div style={{ textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>App Launchers</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#DC633E", background: "rgba(220,99,62,0.15)", padding: "2px 8px", borderRadius: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            New
          </span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 12px", lineHeight: 1.5 }}>
          Turn your F-keys into one-tap app launchers. Choose from curated packs
          or pick individual apps — your icons, printed on your keycaps.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#DC633E" }}>
          Customize F-Keys <span style={{ fontSize: 14 }}>→</span>
        </div>
      </div>
    </button>
  );
}

function PackPicker({
  onApplyPack,
  onCustomize,
}: {
  onApplyPack: (icons: (AppIcon | null)[], packId?: string) => void;
  onCustomize: () => void;
}) {
  function applyPreset(preset: PackPreset) {
    onApplyPack(getPackIcons(preset), preset.id);
  }

  return (
    <div style={{ maxWidth: 980, width: "100%" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #281E2C 0%, #3a2a42 100%)",
          borderRadius: 12,
          padding: "20px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Choose a pack</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 10 }}>
              One click to assign all 12 F-keys
            </span>
          </div>
          <button
            onClick={onCustomize}
            style={{
              fontSize: 11,
              color: "#DC633E",
              background: "rgba(220,99,62,0.1)",
              border: "1px solid rgba(220,99,62,0.2)",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Pick individually →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {PACK_PRESETS.map((preset) => {
            const icons = getPackIcons(preset);
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "10px 10px 8px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(220,99,62,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                  {icons.slice(0, 4).map((icon, i) =>
                    icon ? (
                      <img
                        key={i}
                        src={icon.icon}
                        alt={icon.name}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      />
                    ) : null
                  )}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", marginBottom: 1 }}>
                  {preset.name}
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
