import { useState } from "react";
import type { BaseColor } from "../hooks/useKeyboard";

import type { KeycapColor } from "../data/colors";

interface SidebarProps {
  baseColor: BaseColor;
  keycapColor: KeycapColor;
  legendColor: KeycapColor;
  onBaseColorClick: () => void;
  onLegendColorClick: () => void;
}

type Tab = "colors" | "legends" | "settings";

export function Sidebar({ keycapColor, legendColor, onBaseColorClick, onLegendColorClick }: SidebarProps) {
  const [tab, setTab] = useState<Tab>("settings");

  const tabs: { id: Tab; label: string }[] = [
    { id: "colors", label: "Colors" },
    { id: "legends", label: "Legends" },
    { id: "settings", label: "Settings" },
  ];

  function TabIcon({ id, active }: { id: Tab; active: boolean }) {
    const color = active ? "#333" : "#bbb";
    if (id === "colors") {
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="10" cy="9" r="1.5" fill={color} stroke="none" />
          <circle cx="14.5" cy="9" r="1.5" fill={color} stroke="none" />
          <circle cx="8" cy="13" r="1.5" fill={color} stroke="none" />
          <circle cx="16" cy="13" r="1.5" fill={color} stroke="none" />
          <circle cx="12" cy="16" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    }
    if (id === "legends") {
      return (
        <span style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, 'Times New Roman', serif", color, lineHeight: 1 }}>
          T
        </span>
      );
    }
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    );
  }

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", borderBottom: "1px solid #eee" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              paddingTop: 18,
              paddingBottom: 12,
              background: tab === t.id ? "#f5f3f0" : "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #333" : "2px solid transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s",
            }}
          >
            <TabIcon id={t.id} active={tab === t.id} />
            <span style={{ fontSize: 11, color: tab === t.id ? "#333" : "#aaa", fontWeight: 500 }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {tab === "colors" && <ColorsTab keycapColor={keycapColor} legendColor={legendColor} onBaseColorClick={onBaseColorClick} onLegendColorClick={onLegendColorClick} />}
        {tab === "legends" && <LegendsTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      color: "#c4956e",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom: 8,
      marginTop: 20,
    }}>
      {children}
    </div>
  );
}

function SectionValue({ children }: { children: string }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
      {children}
    </div>
  );
}

function PillButton({ children }: { children: string }) {
  return (
    <button style={{
      padding: "4px 10px",
      fontSize: 11,
      border: "1px solid #ddd",
      borderRadius: 5,
      background: "#fff",
      cursor: "pointer",
      color: "#555",
      fontWeight: 500,
    }}>
      {children}
    </button>
  );
}

function ColorsTab({ keycapColor, legendColor, onBaseColorClick, onLegendColorClick }: { keycapColor: KeycapColor; legendColor: KeycapColor; onBaseColorClick: () => void; onLegendColorClick: () => void }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <div>
          <div style={{ fontSize: 9, color: "#999", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Base color:</div>
          <button
            onClick={onBaseColorClick}
            style={{ border: "none", borderRadius: 8, padding: 0, cursor: "pointer", background: "none" }}
          >
            <div style={{
              width: 80,
              height: 56,
              borderRadius: 6,
              background: keycapColor.hex,
              boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: keycapColor.textHex }}>{keycapColor.id}</span>
            </div>
          </button>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#999", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Legend:</div>
          <button
            onClick={onLegendColorClick}
            style={{ border: "none", borderRadius: 8, padding: 0, cursor: "pointer", background: "none" }}
          >
            <div style={{
              width: 80,
              height: 56,
              borderRadius: 6,
              background: legendColor.hex,
              boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: legendColor.textHex }}>{legendColor.id}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function LegendsTab() {
  return (
    <div>
      <SectionHeader>Keyboard</SectionHeader>
      <SectionValue>TKL</SectionValue>
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        <PillButton>🔍 Search</PillButton>
        <PillButton>⚙ Options</PillButton>
        <PillButton>✏ Edit</PillButton>
      </div>

      <SectionHeader>Profile</SectionHeader>
      <SectionValue>Cherry (PBT dye sub)</SectionValue>
      <PillButton>✏ Edit</PillButton>

      <SectionHeader>Language</SectionHeader>
      <SectionValue>Default (QWERTY)</SectionValue>
      <PillButton>✏ Edit</PillButton>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <SectionHeader>Keyboard</SectionHeader>
      <SectionValue>TKL</SectionValue>
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        <PillButton>🔍 Search</PillButton>
        <PillButton>⚙ Options</PillButton>
        <PillButton>✏ Edit</PillButton>
      </div>

      <SectionHeader>Profile</SectionHeader>
      <SectionValue>Cherry (PBT dye sub)</SectionValue>
      <PillButton>✏ Edit</PillButton>

      <SectionHeader>Language</SectionHeader>
      <SectionValue>Default (QWERTY)</SectionValue>
      <PillButton>✏ Edit</PillButton>

      <SectionHeader>Advanced</SectionHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {["📷 Download as image", "{ } Export JSON", "🎨 Background", "🔗 Share as a creation"].map((item) => (
          <button
            key={item}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: 0,
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              color: item.includes("Share") ? "#bbb" : "#333",
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            {item}
          </button>
        ))}
        <a href="#" style={{ fontSize: 12, color: "#6696CE", textDecoration: "underline", marginTop: 4 }}>
          About Yuzu creations
        </a>
      </div>
    </div>
  );
}
