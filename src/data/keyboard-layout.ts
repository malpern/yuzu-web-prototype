export interface KeyDef {
  id: string;
  label: string;
  width: number; // in units
  type: "fkey" | "normal" | "gap";
  secondaryLabel?: string;  // shift symbol or icon label
  sizeLabel?: string;       // "1.5u", "2u", etc.
  homingLabel?: boolean;    // true for F and J homing keys
}

export type Row = KeyDef[];

// 1u = 48px
export const UNIT = 48;
export const GAP_BETWEEN_KEYS = 4;
export const GAP_BETWEEN_CLUSTERS = 16;

// gap helper
let _gapCounter = 0;
function gap(w: number): KeyDef {
  return { id: `gap-${_gapCounter++}`, label: "", width: w, type: "gap" };
}

function key(id: string, label: string, width = 1, opts?: Partial<Pick<KeyDef, "secondaryLabel" | "sizeLabel" | "homingLabel">>): KeyDef {
  return { id, label, width, type: "normal", ...opts };
}

function fkey(id: string, label: string): KeyDef {
  return { id, label, width: 1, type: "fkey" };
}

export const ROWS: Row[] = [
  // Row 0: Function row
  [
    key("Esc", "Esc"),
    gap(1),
    fkey("F1", "F1"),
    fkey("F2", "F2"),
    fkey("F3", "F3"),
    fkey("F4", "F4"),
    gap(0.5),
    fkey("F5", "F5"),
    fkey("F6", "F6"),
    fkey("F7", "F7"),
    fkey("F8", "F8"),
    gap(0.5),
    fkey("F9", "F9"),
    fkey("F10", "F10"),
    fkey("F11", "F11"),
    fkey("F12", "F12"),
    gap(0.25),
    key("PrtSc", "PrtSc"),
    key("ScrLk", "ScrLk"),
    key("Pause", "Pause"),
  ],

  // Row 1: Number row
  [
    key("Tilde", "`", 1, { secondaryLabel: "~" }),
    key("1", "1", 1, { secondaryLabel: "!" }),
    key("2", "2", 1, { secondaryLabel: "@" }),
    key("3", "3", 1, { secondaryLabel: "#" }),
    key("4", "4", 1, { secondaryLabel: "$" }),
    key("5", "5", 1, { secondaryLabel: "%" }),
    key("6", "6", 1, { secondaryLabel: "^" }),
    key("7", "7", 1, { secondaryLabel: "&" }),
    key("8", "8", 1, { secondaryLabel: "*" }),
    key("9", "9", 1, { secondaryLabel: "(" }),
    key("0", "0", 1, { secondaryLabel: ")" }),
    key("Minus", "-", 1, { secondaryLabel: "_" }),
    key("Equal", "=", 1, { secondaryLabel: "+" }),
    key("Backspace", "Backspace", 2, { secondaryLabel: "←", sizeLabel: "2u" }),
    gap(0.25),
    key("Insert", "Ins"),
    key("Home", "Home"),
    key("PgUp", "PgUp"),
  ],

  // Row 2: QWERTY
  [
    key("Tab", "Tab", 1.5, { secondaryLabel: "⇤⇥", sizeLabel: "1.5u" }),
    key("Q", "Q"),
    key("W", "W"),
    key("E", "E"),
    key("R", "R"),
    key("T", "T"),
    key("Y", "Y"),
    key("U", "U"),
    key("I", "I"),
    key("O", "O"),
    key("P", "P"),
    key("LBracket", "["),
    key("RBracket", "]"),
    key("Backslash", "\\", 1.5, { sizeLabel: "1.5u" }),
    gap(0.25),
    key("Delete", "Del"),
    key("End", "End"),
    key("PgDn", "PgDn"),
  ],

  // Row 3: Home row
  [
    key("Caps", "Caps Lock", 1.75, { secondaryLabel: "⇪", sizeLabel: "1.75u" }),
    key("A", "A"),
    key("S", "S"),
    key("D", "D"),
    key("F", "F", 1, { homingLabel: true }),
    key("G", "G"),
    key("H", "H"),
    key("J", "J", 1, { homingLabel: true }),
    key("K", "K"),
    key("L", "L"),
    key("Semicolon", ";"),
    key("Quote", "'"),
    key("Return", "Return", 2.25, { secondaryLabel: "↵", sizeLabel: "2.25u" }),
  ],

  // Row 4: Shift row
  [
    key("LShift", "Shift", 2.25, { secondaryLabel: "⇧", sizeLabel: "2.25u" }),
    key("Z", "Z"),
    key("X", "X"),
    key("C", "C"),
    key("V", "V"),
    key("B", "B"),
    key("N", "N"),
    key("M", "M"),
    key("Comma", ","),
    key("Period", "."),
    key("Slash", "/"),
    key("RShift", "Shift", 2.75, { secondaryLabel: "⇧", sizeLabel: "2.75u" }),
    gap(1.25),
    key("Up", "↑"),
    gap(1),
  ],

  // Row 5: Bottom row
  [
    key("LCtrl", "Ctrl", 1.25, { sizeLabel: "1.25u" }),
    key("LSuper", "⌘", 1.25, { sizeLabel: "1.25u" }),
    key("LAlt", "Alt", 1.25, { sizeLabel: "1.25u" }),
    key("Space", "", 6.25, { sizeLabel: "6.25u spacebar" }),
    key("RAlt", "Alt", 1.25, { sizeLabel: "1.25u" }),
    key("RSuper", "⌘", 1.25, { sizeLabel: "1.25u" }),
    key("Menu", "☰", 1.25, { sizeLabel: "1.25u" }),
    key("RCtrl", "Ctrl", 1.25, { sizeLabel: "1.25u" }),
    gap(0.25),
    key("Left", "←"),
    key("Down", "↓"),
    key("Right", "→"),
  ],
];
