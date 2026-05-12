import { useState } from "react";
import { KEYCAP_COLORS, FAMILY_LABELS, type ColorFamily, type KeycapColor } from "../data/colors";

interface ColorPickerModalProps {
  currentColorId: string;
  onSelect: (color: KeycapColor) => void;
  onClose: () => void;
}

const FAMILIES: ColorFamily[] = ["red", "yellow", "blue", "gray", "purple", "pink", "green", "brown", "orange"];

export function ColorPickerModal({ currentColorId, onSelect, onClose }: ColorPickerModalProps) {
  const [activeFamily, setActiveFamily] = useState<"in-use" | "favorites" | ColorFamily>("in-use");

  const currentColor = KEYCAP_COLORS.find((c) => c.id === currentColorId) ?? KEYCAP_COLORS[1];
  const inUse = KEYCAP_COLORS.filter((c) => c.id === "GR2" || c.id === "GR1");
  const favorites = [...inUse].reverse();

  const familyCounts = FAMILIES.map((f) => ({
    family: f,
    count: KEYCAP_COLORS.filter((c) => c.family === f).length,
  }));

  let displayColors: KeycapColor[];
  let sectionTitle: string;
  if (activeFamily === "in-use") {
    displayColors = inUse;
    sectionTitle = "In use";
  } else if (activeFamily === "favorites") {
    displayColors = favorites;
    sectionTitle = "Favorites";
  } else {
    displayColors = KEYCAP_COLORS.filter((c) => c.family === activeFamily);
    sectionTitle = FAMILY_LABELS[activeFamily];
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 680,
          maxHeight: "80vh",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          display: "flex",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left sidebar */}
        <div style={{ width: 180, borderRight: "1px solid #eee", display: "flex", flexDirection: "column" }}>
          {/* Selected color preview */}
          <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
            <ColorKeycap color={currentColor} size={80} />
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            <SidebarItem
              label="In use"
              count={inUse.length}
              active={activeFamily === "in-use"}
              onClick={() => setActiveFamily("in-use")}
            />
            <SidebarItem
              label="Favorites"
              count={favorites.length}
              active={activeFamily === "favorites"}
              onClick={() => setActiveFamily("favorites")}
            />
            <div style={{ height: 1, background: "#eee", margin: "6px 12px" }} />
            {familyCounts.map(({ family, count }) => (
              <SidebarItem
                key={family}
                label={FAMILY_LABELS[family]}
                count={count}
                color={KEYCAP_COLORS.find((c) => c.family === family)?.hex}
                active={activeFamily === family}
                onClick={() => setActiveFamily(family)}
              />
            ))}
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{sectionTitle}</span>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#999", padding: "4px 8px" }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
            {activeFamily === "in-use" && (
              <>
                <SectionLabel>In use</SectionLabel>
                <ColorGrid colors={inUse} currentId={currentColorId} onSelect={onSelect} />
                <SectionLabel>Favorites</SectionLabel>
                <ColorGrid colors={favorites} currentId={currentColorId} onSelect={onSelect} />
                <SectionLabel>All colors</SectionLabel>
                {FAMILIES.map((f) => {
                  const colors = KEYCAP_COLORS.filter((c) => c.family === f);
                  return (
                    <div key={f}>
                      <div style={{ fontSize: 12, color: "#999", marginBottom: 6, marginTop: 12 }}>{FAMILY_LABELS[f]}</div>
                      <ColorGrid colors={colors} currentId={currentColorId} onSelect={onSelect} />
                    </div>
                  );
                })}
              </>
            )}
            {activeFamily === "favorites" && (
              <ColorGrid colors={favorites} currentId={currentColorId} onSelect={onSelect} />
            )}
            {activeFamily !== "in-use" && activeFamily !== "favorites" && (
              <ColorGrid colors={displayColors} currentId={currentColorId} onSelect={onSelect} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  count,
  color,
  active,
  onClick,
}: {
  label: string;
  count: number;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: "6px 16px",
        background: active ? "#f5f3f0" : "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontSize: 12,
        fontWeight: active ? 600 : 400,
        color: "#333",
      }}
    >
      {color && (
        <div style={{ width: 12, height: 12, borderRadius: 3, background: color, flexShrink: 0 }} />
      )}
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ color: "#aaa", fontSize: 11 }}>{count}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, marginTop: 4 }}>
      {children}
    </div>
  );
}

function ColorGrid({
  colors,
  currentId,
  onSelect,
}: {
  colors: KeycapColor[];
  currentId: string;
  onSelect: (c: KeycapColor) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          style={{
            padding: 0,
            background: "none",
            border: currentId === c.id ? "2px solid #DC633E" : "2px solid transparent",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <ColorKeycap color={c} size={56} />
        </button>
      ))}
    </div>
  );
}

function ColorKeycap({ color, size }: { color: KeycapColor; size: number }) {
  const sideH = Math.max(3, size * 0.07);
  const topH = size - sideH;
  const fontSize = size < 60 ? 9 : 13;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: topH,
          borderRadius: size * 0.1,
          background: darken(color.hex, 0.2),
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: topH,
          borderRadius: size * 0.1,
          background: color.hex,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize, fontWeight: 700, color: color.textHex }}>{color.id}</span>
      </div>
    </div>
  );
}

function darken(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = 1 - amount;
  return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
}
