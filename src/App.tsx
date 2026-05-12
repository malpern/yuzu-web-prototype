import { useKeyboard } from "./hooks/useKeyboard";
import { Keyboard } from "./components/Keyboard";
import { Sidebar } from "./components/Sidebar";
import { IconPickerModal } from "./components/IconPickerModal";
import { ColorPickerModal } from "./components/ColorPickerModal";
import { AppLauncherBanner } from "./components/AppLauncherBanner";

export default function App() {
  const {
    assignments,
    activeKey,
    baseColor,
    keycapColor,
    legendColor,
    launcherPhase,
    launcherMode,
    fkeyDisplay,
    assignedCount,
    colorPickerTarget,
    lastPackId,
    assignIcon,
    applyPack,
    setActiveKey,
    setKeycapColor,
    setLegendColor,
    setLauncherPhase,
    setFKeyDisplay,
    setColorPickerTarget,
  } = useKeyboard();

  const totalPrice = (80 + assignedCount * 0.07).toFixed(2);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F6F1",
        display: "flex",
        flexDirection: "column",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <header
        style={{
          backgroundColor: "#281E2C",
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#8D5ED1" }}>Y</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#6696CE" }}>U</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#DC633E" }}>Z</span>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color: "#F29E35" }}>U</span>
          <span style={{ marginLeft: 16, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Keycaps
          </span>
        </div>

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>My Keyboard</span>
          <span style={{ fontSize: 10, padding: "2px 7px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>TKL</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.75)", fontVariantNumeric: "tabular-nums" }}>
            ${totalPrice}
          </span>
          <button
            style={{
              backgroundColor: "#DC633E",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Add to Cart →
          </button>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 24px",
          gap: 16,
        }}
      >
        <AppLauncherBanner
          phase={launcherPhase}
          onPhaseChange={setLauncherPhase}
          assignedCount={assignedCount}
          fkeyDisplay={fkeyDisplay}
          onDisplayChange={setFKeyDisplay}
          onApplyPack={applyPack}
        />

        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            width: "100%",
            maxWidth: 1300,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <Keyboard
              assignments={assignments}
              activeKey={activeKey}
              baseColor={baseColor}
              keycapColor={keycapColor}
              legendColor={legendColor}
              launcherMode={launcherMode}
              fkeyDisplay={fkeyDisplay}
              onFKeyClick={(key) => {
                if (launcherPhase === "promo") setLauncherPhase("active");
                setActiveKey(key);
              }}
            />
            <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
              {launcherMode
                ? "Click an F-key to change its app"
                : "Click a key to customize it, hold Ctrl/Cmd to select multiple keys"}
            </p>
          </div>

          <Sidebar
            baseColor={baseColor}
            keycapColor={keycapColor}
            legendColor={legendColor}
            onBaseColorClick={() => setColorPickerTarget("base")}
            onLegendColorClick={() => setColorPickerTarget("legend")}
          />
        </div>
      </main>

      {activeKey && (
        <IconPickerModal
          activeKey={activeKey}
          assignments={assignments}
          defaultPack={lastPackId}
          onSelect={(icon) => assignIcon(activeKey, icon)}
          onClose={() => setActiveKey(null)}
        />
      )}

      {colorPickerTarget && (
        <ColorPickerModal
          currentColorId={colorPickerTarget === "base" ? keycapColor.id : legendColor.id}
          onSelect={(color) => {
            if (colorPickerTarget === "base") setKeycapColor(color);
            else setLegendColor(color);
            setColorPickerTarget(null);
          }}
          onClose={() => setColorPickerTarget(null)}
        />
      )}
    </div>
  );
}
