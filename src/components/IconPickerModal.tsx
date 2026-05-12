import { useState, useMemo } from "react";
import { APP_ICONS, PACK_LABELS } from "../data/app-icons";
import type { AppIcon, Pack } from "../data/app-icons";
import { PACK_PRESETS } from "../data/packs";

type Category = "in-use" | "all" | "other" | `pack:${string}` | Pack;

const allPackIconIds = new Set(PACK_PRESETS.flatMap((p) => p.iconIds));
const otherIcons = APP_ICONS.filter((i) => !allPackIconIds.has(i.id));

interface IconPickerModalProps {
  activeKey: string;
  assignments: Record<string, AppIcon | null>;
  defaultPack?: string | null;
  onSelect: (icon: AppIcon) => void;
  onClose: () => void;
}

export function IconPickerModal({ activeKey, assignments, defaultPack, onSelect, onClose }: IconPickerModalProps) {
  const initialCategory: Category = defaultPack
    ? PACK_PRESETS.find((p) => p.id === defaultPack) ? `pack:${defaultPack}` : "all"
    : "all";
  const [category, setCategory] = useState<Category>(initialCategory);
  const [search, setSearch] = useState("");

  const usedIcons = useMemo(
    () => Object.values(assignments).filter((a): a is AppIcon => a !== null),
    [assignments]
  );

  const filtered = useMemo(() => {
    let base: AppIcon[];
    if (category === "in-use") {
      const usedIds = new Set(usedIcons.map((i) => i.id));
      base = APP_ICONS.filter((i) => usedIds.has(i.id));
    } else if (category === "all") {
      base = APP_ICONS;
    } else if (category === "other") {
      base = otherIcons;
    } else if (category.startsWith("pack:")) {
      const packId = category.slice(5);
      const preset = PACK_PRESETS.find((p) => p.id === packId);
      if (preset) {
        const idSet = new Set(preset.iconIds);
        base = APP_ICONS.filter((i) => idSet.has(i.id));
      } else {
        base = APP_ICONS;
      }
    } else {
      base = APP_ICONS.filter((i) => i.pack === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter((i) => i.name.toLowerCase().includes(q));
    }
    return base;
  }, [category, search, usedIcons]);


  function categoryLabel(): string {
    if (category === "in-use") return "In Use";
    if (category === "all") return "All Icons";
    if (category === "other") return "Other";
    if (category.startsWith("pack:")) {
      const preset = PACK_PRESETS.find((p) => p.id === category.slice(5));
      return preset?.name ?? "Pack";
    }
    return PACK_LABELS[category as Pack];
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: 700,
          maxWidth: "92vw",
          height: 500,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
              Assign Icon
            </span>
            <span
              style={{
                marginLeft: 8,
                padding: "2px 8px",
                background: "#DC633E",
                color: "#fff",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {activeKey}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              color: "#999",
              lineHeight: 1,
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left sidebar */}
          <div
            style={{
              width: 200,
              borderRight: "1px solid #eee",
              padding: "12px 0",
              overflowY: "auto",
              flexShrink: 0,
            }}
          >
            {/* Upload button */}
            <div style={{ padding: "0 12px 12px" }}>
              <button
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1.5px dashed #ccc",
                  borderRadius: 7,
                  background: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>↑</span> Upload from disk
              </button>
            </div>

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>
              <CategoryItem
                label="In use"
                count={usedIcons.length}
                active={category === "in-use"}
                onClick={() => setCategory("in-use")}
              />
              <CategoryItem
                label="All"
                count={APP_ICONS.length}
                active={category === "all"}
                onClick={() => setCategory("all")}
              />
            </div>

            {/* Pack presets — same as promo */}
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8, marginTop: 4 }}>
              <div style={{ padding: "4px 16px 6px", fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Packs
              </div>
              {PACK_PRESETS.map((preset) => (
                <CategoryItem
                  key={preset.id}
                  label={preset.name}
                  count={preset.iconIds.length}
                  active={category === `pack:${preset.id}`}
                  onClick={() => setCategory(`pack:${preset.id}`)}
                />
              ))}
              <CategoryItem
                label="Other"
                count={otherIcons.length}
                active={category === "other"}
                onClick={() => setCategory("other")}
              />
            </div>

          </div>

          {/* Right content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {categoryLabel()}
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    padding: "6px 12px",
                    border: "1px solid #e0e0e0",
                    borderRadius: 6,
                    fontSize: 12,
                    outline: "none",
                    width: 160,
                    color: "#333",
                    background: "#fafafa",
                  }}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {filtered.length === 0 ? (
                <div style={{ color: "#999", fontSize: 13, textAlign: "center", marginTop: 40 }}>
                  No icons found
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 8,
                  }}
                >
                  {filtered.map((icon) => (
                    <IconCell key={icon.id} icon={icon} onSelect={onSelect} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "6px 16px",
        background: active ? "#DC633E" : "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: 0,
      }}
    >
      <span style={{ fontSize: 13, color: active ? "#fff" : "#333", fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
      <span style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.75)" : "#aaa", fontWeight: 500 }}>
        {count}
      </span>
    </button>
  );
}

function IconCell({ icon, onSelect }: { icon: AppIcon; onSelect: (icon: AppIcon) => void }) {
  return (
    <button
      onClick={() => onSelect(icon)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 6px 8px",
        background: "none",
        border: "1.5px solid transparent",
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 0.1s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fdf4f0";
        e.currentTarget.style.borderColor = "#DC633E";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "none";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <img
        src={icon.icon}
        alt={icon.name}
        style={{ width: 48, height: 48, objectFit: "contain" }}
      />
      <span
        style={{
          fontSize: 10,
          color: "#444",
          textAlign: "center",
          lineHeight: 1.2,
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {icon.name}
      </span>
    </button>
  );
}
