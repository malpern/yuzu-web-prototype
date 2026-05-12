import { useState } from "react";
import type { AppIcon } from "../data/app-icons";
import type { KeycapColor } from "../data/colors";
import { KEYCAP_COLORS } from "../data/colors";

export type FKeyDisplay = "label" | "icon" | "silhouette" | "dual";
export type LauncherPhase = "promo" | "packs" | "active";
export type BaseColor = "light" | "dark";
export type ColorPickerTarget = "base" | "legend" | null;

const F_KEYS = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"];

const DEFAULT_BASE = KEYCAP_COLORS.find((c) => c.id === "GR2")!;
const DEFAULT_LEGEND = KEYCAP_COLORS.find((c) => c.id === "GR1")!;

export function useKeyboard() {
  const [assignments, setAssignments] = useState<Record<string, AppIcon | null>>(
    Object.fromEntries(F_KEYS.map((k) => [k, null]))
  );
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [keycapColor, setKeycapColor] = useState<KeycapColor>(DEFAULT_BASE);
  const [legendColor, setLegendColor] = useState<KeycapColor>(DEFAULT_LEGEND);
  const [launcherPhase, setLauncherPhase] = useState<LauncherPhase>("promo");
  const [fkeyDisplay, setFKeyDisplay] = useState<FKeyDisplay>("icon");
  const [colorPickerTarget, setColorPickerTarget] = useState<ColorPickerTarget>(null);
  const [lastPackId, setLastPackId] = useState<string | null>(null);

  const baseColor: BaseColor = parseInt(keycapColor.hex.slice(1), 16) < 0x808080 ? "dark" : "light";

  function assignIcon(key: string, icon: AppIcon) {
    setAssignments((prev) => ({ ...prev, [key]: icon }));
    setActiveKey(null);
  }

  function clearIcon(key: string) {
    setAssignments((prev) => ({ ...prev, [key]: null }));
  }

  function applyPack(icons: (AppIcon | null)[], packId?: string) {
    const newAssignments: Record<string, AppIcon | null> = {};
    F_KEYS.forEach((key, i) => {
      newAssignments[key] = icons[i] ?? null;
    });
    setAssignments(newAssignments);
    setFKeyDisplay("icon");
    setLauncherPhase("active");
    setLastPackId(packId ?? null);
  }

  const assignedCount = Object.values(assignments).filter(Boolean).length;
  const launcherMode = launcherPhase === "active";

  return {
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
    clearIcon,
    applyPack,
    setActiveKey,
    setKeycapColor,
    setLegendColor,
    setLauncherPhase,
    setFKeyDisplay,
    setColorPickerTarget,
  };
}
