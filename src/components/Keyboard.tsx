import { ROWS, GAP_BETWEEN_KEYS } from "../data/keyboard-layout";
import { Keycap } from "./Keycap";
import type { AppIcon } from "../data/app-icons";
import type { KeycapColor } from "../data/colors";
import type { BaseColor, FKeyDisplay } from "../hooks/useKeyboard";

interface KeyboardProps {
  assignments: Record<string, AppIcon | null>;
  activeKey: string | null;
  baseColor: BaseColor;
  keycapColor: KeycapColor;
  legendColor: KeycapColor;
  launcherMode: boolean;
  fkeyDisplay: FKeyDisplay;
  onFKeyClick: (key: string) => void;
}

export function Keyboard({ assignments, activeKey, baseColor, keycapColor, legendColor, launcherMode, fkeyDisplay, onFKeyClick }: KeyboardProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: GAP_BETWEEN_KEYS,
        padding: "20px 24px",
        backgroundColor: baseColor === "dark" ? "#1e1b24" : "#d9d5cf",
        borderRadius: 12,
        boxShadow:
          baseColor === "dark"
            ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {ROWS.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: GAP_BETWEEN_KEYS,
            marginTop: rowIdx === 1 ? 12 : 0,
          }}
        >
          {row.map((keyDef) => (
            <Keycap
              key={keyDef.id}
              keyDef={keyDef}
              assignment={assignments[keyDef.id] ?? null}
              baseColor={baseColor}
              keycapColor={keycapColor}
              legendColor={legendColor}
              isActive={activeKey === keyDef.id}
              launcherMode={launcherMode}
              fkeyDisplay={fkeyDisplay}
              onClick={keyDef.type === "fkey" ? () => onFKeyClick(keyDef.id) : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
