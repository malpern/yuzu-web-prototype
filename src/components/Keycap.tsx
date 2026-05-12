import React, { useState, useEffect, useRef } from "react";
import type { KeyDef } from "../data/keyboard-layout";
import { UNIT, GAP_BETWEEN_KEYS } from "../data/keyboard-layout";
import type { AppIcon } from "../data/app-icons";
import type { KeycapColor } from "../data/colors";
import type { FKeyDisplay } from "../hooks/useKeyboard";

interface KeycapProps {
  keyDef: KeyDef;
  assignment?: AppIcon | null;
  baseColor: "light" | "dark";
  keycapColor?: KeycapColor;
  legendColor?: KeycapColor;
  launcherMode: boolean;
  fkeyDisplay: FKeyDisplay;
  isActive?: boolean;
  onClick?: () => void;
}

export function Keycap({ keyDef, assignment, baseColor, keycapColor, legendColor, launcherMode, fkeyDisplay, isActive, onClick }: KeycapProps) {
  const widthPx = keyDef.width * UNIT + (keyDef.width - 1) * GAP_BETWEEN_KEYS;
  const [popClass, setPopClass] = useState("");
  const prevAssignmentRef = useRef(assignment?.id);

  useEffect(() => {
    if (assignment && assignment.id !== prevAssignmentRef.current) {
      setPopClass("keycap-assigned");
      const timer = setTimeout(() => setPopClass(""), 400);
      prevAssignmentRef.current = assignment.id;
      return () => clearTimeout(timer);
    }
    prevAssignmentRef.current = assignment?.id;
  }, [assignment]);

  if (keyDef.type === "gap") {
    return <div style={{ width: widthPx, flexShrink: 0 }} />;
  }

  const isFKey = keyDef.type === "fkey";
  const isDark = baseColor === "dark";
  const isInteractive = isFKey;
  const keyHeight = isFKey ? 42 : 50;
  const sideHeight = 8;

  const topFace = keycapColor ? keycapColor.hex : (isDark ? "#2e2a35" : "#e8e5e0");
  const sideFace = keycapColor ? darkenHex(keycapColor.hex, 0.15) : (isDark ? "#1a1720" : "#c4bfb8");
  const textColor = legendColor ? legendColor.hex : (keycapColor ? keycapColor.textHex : (isDark ? "#c8c4be" : "#444"));
  const fkeyHoverBg = isDark ? "#38303e" : "#f0ede8";

  const launcherEmptyBorder = isFKey && launcherMode && !assignment && !isActive;

  const hasSecondary = Boolean(keyDef.secondaryLabel);
  const hasSizeLabel = Boolean(keyDef.sizeLabel);
  const isHoming = Boolean(keyDef.homingLabel);
  const useStackedLayout = !isFKey && hasSecondary;

  return (
    <div
      className={popClass}
      onClick={isInteractive ? onClick : undefined}
      style={{
        width: widthPx,
        height: keyHeight + sideHeight,
        flexShrink: 0,
        position: "relative",
        cursor: isInteractive ? "pointer" : "default",
        userSelect: "none",
        opacity: isFKey && !launcherMode ? 0.85 : 1,
        transition: "all 0.1s ease",
      }}
      onMouseEnter={isInteractive ? (e) => {
        const top = e.currentTarget.querySelector("[data-top]") as HTMLElement;
        if (top && !isActive) {
          top.style.backgroundColor = fkeyHoverBg;
          top.style.outline = "2px solid #DC633E";
          top.style.outlineOffset = "-2px";
        }
      } : undefined}
      onMouseLeave={isInteractive ? (e) => {
        const top = e.currentTarget.querySelector("[data-top]") as HTMLElement;
        if (top && !isActive) {
          top.style.backgroundColor = topFace;
          top.style.outline = launcherEmptyBorder ? "1px dashed #bbb" : "none";
          top.style.outlineOffset = "-1px";
        }
      } : undefined}
    >
      {/* Side face (bottom edge for 3D depth) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: keyHeight,
          backgroundColor: sideFace,
          borderRadius: 6,
        }}
      />
      {/* Top face */}
      <div
        data-top
        style={{
          position: "relative",
          width: "100%",
          height: keyHeight,
          backgroundColor: isActive ? fkeyHoverBg : topFace,
          borderRadius: 5,
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.15)"
            : "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 3px rgba(0,0,0,0.04)",
          border: !isDark ? "1px solid rgba(0,0,0,0.04)" : undefined,
          outline: isActive
            ? "2px solid #DC633E"
            : launcherEmptyBorder
              ? `1px dashed ${isDark ? "#555" : "#bbb"}`
              : "none",
          outlineOffset: isActive ? "-2px" : "-1px",
          display: "flex",
          alignItems: useStackedLayout ? "flex-start" : "center",
          justifyContent: useStackedLayout ? "space-between" : "center",
          flexDirection: "column",
          padding: useStackedLayout ? "5px 7px" : undefined,
          gap: !useStackedLayout ? 1 : undefined,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {assignment && isFKey ? (
          fkeyDisplay === "label" ? (
            <span style={{ fontSize: 10, color: textColor, fontWeight: 500 }}>
              {keyDef.label}
            </span>
          ) : fkeyDisplay === "silhouette" ? (
            <div
              style={{
                width: 26,
                height: 26,
                backgroundColor: textColor,
                WebkitMaskImage: `url(${assignment.icon.replace("/icons/", "/icons-silhouette/")})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: `url(${assignment.icon.replace("/icons/", "/icons-silhouette/")})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          ) : fkeyDisplay === "icon" ? (
            <img
              src={assignment.icon}
              alt={assignment.name}
              style={{ width: 26, height: 26, objectFit: "contain" }}
            />
          ) : (
            <>
              <img
                src={assignment.icon}
                alt={assignment.name}
                style={{ width: 20, height: 20, objectFit: "contain" }}
              />
              <span style={{ fontSize: 7, color: textColor, opacity: 0.5, lineHeight: 1 }}>
                {keyDef.label}
              </span>
            </>
          )
        ) : isFKey && launcherMode && !assignment ? (
          <span style={{ fontSize: 16, color: isDark ? "#555" : "#aaa", fontWeight: 300 }}>+</span>
        ) : useStackedLayout ? (
          <>
            <span
              style={{
                fontSize: 9,
                color: isDark ? "#8a8090" : "#999",
                fontWeight: 400,
                lineHeight: 1,
                alignSelf: "flex-start",
              }}
            >
              {keyDef.secondaryLabel}
            </span>
            <span
              style={{
                fontSize: 12,
                color: textColor,
                fontWeight: 500,
                lineHeight: 1,
                alignSelf: "flex-start",
              }}
            >
              {keyDef.label}
            </span>
            <div style={{ display: "flex", width: "100%", alignItems: "flex-end", justifyContent: "space-between" }}>
              {hasSizeLabel && (
                <span style={{ fontSize: 7, color: isDark ? "#5a5560" : "#bbb", lineHeight: 1, fontWeight: 400 }}>
                  {keyDef.sizeLabel}
                </span>
              )}
            </div>
          </>
        ) : (
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <span
              style={{
                fontSize: isFKey ? 11 : 12,
                color: isFKey ? (isDark ? "#a89fc0" : "#6a5f7a") : textColor,
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {keyDef.label}
            </span>
            {isHoming && (
              <span
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 7,
                  color: isDark ? "#6a6070" : "#bbb",
                  lineHeight: 1,
                }}
              >
                —
              </span>
            )}
            {hasSizeLabel && !hasSecondary && (
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: 4,
                  fontSize: 7,
                  color: isDark ? "#5a5560" : "#bbb",
                  lineHeight: 1,
                }}
              >
                {keyDef.sizeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function darkenHex(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = 1 - amount;
  return `#${Math.round(r * f).toString(16).padStart(2, "0")}${Math.round(g * f).toString(16).padStart(2, "0")}${Math.round(b * f).toString(16).padStart(2, "0")}`;
}
