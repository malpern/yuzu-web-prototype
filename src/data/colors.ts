export interface KeycapColor {
  id: string;
  hex: string;
  textHex: string;
  family: ColorFamily;
}

export type ColorFamily = "red" | "yellow" | "blue" | "gray" | "purple" | "pink" | "green" | "brown" | "orange";

export const FAMILY_LABELS: Record<ColorFamily, string> = {
  red: "Red",
  yellow: "Yellow",
  blue: "Blue",
  gray: "Gray",
  purple: "Purple",
  pink: "Pink",
  green: "Green",
  brown: "Brown",
  orange: "Orange",
};

function color(id: string, hex: string, family: ColorFamily, textHex = "#333"): KeycapColor {
  return { id, hex, textHex, family };
}

export const KEYCAP_COLORS: KeycapColor[] = [
  // Gray
  color("GR1", "#2a2730", "gray", "#c8c4be"),
  color("GR2", "#e8e4df", "gray"),
  color("GR3", "#c4c0bb", "gray"),
  color("GR4", "#9a968f", "gray", "#e8e4df"),
  color("GR5", "#f5f2ed", "gray"),
  color("GR6", "#3d3a42", "gray", "#c8c4be"),
  color("GR7", "#555259", "gray", "#ddd"),
  color("GR8", "#787578", "gray", "#eee"),

  // Red
  color("RD1", "#c0392b", "red", "#fff"),
  color("RD2", "#e74c3c", "red", "#fff"),
  color("RD3", "#d45d5d", "red", "#fff"),
  color("RD4", "#a93226", "red", "#fff"),
  color("RD5", "#f1948a", "red", "#333"),
  color("RD6", "#641e16", "red", "#eee"),
  color("RD7", "#943126", "red", "#eee"),
  color("RD8", "#e6b0aa", "red", "#333"),
  color("RD9", "#f5b7b1", "red", "#333"),
  color("RD10", "#ff6b6b", "red", "#fff"),

  // Orange
  color("OR1", "#e67e22", "orange", "#fff"),
  color("OR2", "#f39c12", "orange", "#333"),
  color("OR3", "#d35400", "orange", "#fff"),
  color("OR4", "#dc7633", "orange", "#fff"),
  color("OR5", "#f8c471", "orange", "#333"),
  color("OR6", "#e59866", "orange", "#333"),
  color("OR7", "#fad7a0", "orange", "#333"),

  // Yellow
  color("YL1", "#f1c40f", "yellow", "#333"),
  color("YL2", "#f9e154", "yellow", "#333"),
  color("YL3", "#d4ac0d", "yellow", "#333"),
  color("YL4", "#fef9e7", "yellow", "#333"),
  color("YL5", "#f7dc6f", "yellow", "#333"),
  color("YL6", "#b7950b", "yellow", "#fff"),

  // Green
  color("GN1", "#27ae60", "green", "#fff"),
  color("GN2", "#2ecc71", "green", "#333"),
  color("GN3", "#1e8449", "green", "#fff"),
  color("GN4", "#82e0aa", "green", "#333"),
  color("GN5", "#a9dfbf", "green", "#333"),
  color("GN6", "#196f3d", "green", "#fff"),
  color("GN7", "#d5f5e3", "green", "#333"),
  color("GN8", "#0b5345", "green", "#eee"),

  // Blue
  color("BL1", "#2980b9", "blue", "#fff"),
  color("BL2", "#3498db", "blue", "#fff"),
  color("BL3", "#1a5276", "blue", "#fff"),
  color("BL4", "#85c1e9", "blue", "#333"),
  color("BL5", "#aed6f1", "blue", "#333"),
  color("BL6", "#154360", "blue", "#eee"),
  color("BL7", "#5dade2", "blue", "#fff"),
  color("BL8", "#2e86c1", "blue", "#fff"),
  color("BL9", "#d4e6f1", "blue", "#333"),
  color("BL10", "#1b4f72", "blue", "#eee"),

  // Purple
  color("PR1", "#8e44ad", "purple", "#fff"),
  color("PR2", "#9b59b6", "purple", "#fff"),
  color("PR3", "#6c3483", "purple", "#fff"),
  color("PR4", "#bb8fce", "purple", "#333"),
  color("PR5", "#d2b4de", "purple", "#333"),
  color("PR6", "#4a235a", "purple", "#eee"),
  color("PR7", "#a569bd", "purple", "#fff"),

  // Pink
  color("PK1", "#e91e90", "pink", "#fff"),
  color("PK2", "#f06292", "pink", "#fff"),
  color("PK3", "#c2185b", "pink", "#fff"),
  color("PK4", "#f48fb1", "pink", "#333"),
  color("PK5", "#f8bbd0", "pink", "#333"),
  color("PK6", "#880e4f", "pink", "#eee"),

  // Brown
  color("BR1", "#795548", "brown", "#fff"),
  color("BR2", "#8d6e63", "brown", "#fff"),
  color("BR3", "#5d4037", "brown", "#fff"),
  color("BR4", "#a1887f", "brown", "#333"),
  color("BR5", "#bcaaa4", "brown", "#333"),
  color("BR6", "#3e2723", "brown", "#eee"),
  color("BR7", "#d7ccc8", "brown", "#333"),
  color("BR8", "#6d4c41", "brown", "#fff"),
];
