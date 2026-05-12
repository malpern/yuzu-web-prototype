import { APP_ICONS, type AppIcon } from "./app-icons";

export interface PackPreset {
  id: string;
  name: string;
  description: string;
  iconIds: string[];
}

export const PACK_PRESETS: PackPreset[] = [
  {
    id: "developer",
    name: "Developer",
    description: "Code editors, terminals, and dev tools",
    iconIds: ["vscode", "cursor", "terminal", "iterm2", "docker", "github-desktop", "postman", "chrome", "slack", "notion", "linear", "chatgpt"],
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Communication, notes, and task management",
    iconIds: ["slack", "notion", "linear", "mail", "zoom", "todoist", "obsidian", "bear", "reminders", "notes", "chrome", "1password"],
  },
  {
    id: "designer",
    name: "Designer",
    description: "Design, photo, and video editing tools",
    iconIds: ["figma", "sketch", "photoshop", "illustrator", "blender", "canva", "affinity-designer", "premiere", "final-cut", "safari", "slack", "notion"],
  },
  {
    id: "creative",
    name: "Creative Pro",
    description: "Adobe suite, video, and music production",
    iconIds: ["photoshop", "illustrator", "premiere", "aftereffects", "final-cut", "logic-pro", "davinci", "blender", "figma", "spotify", "slack", "chrome"],
  },
  {
    id: "social",
    name: "Social & Media",
    description: "Messaging, music, and social apps",
    iconIds: ["discord", "spotify", "messages", "whatsapp", "telegram", "signal", "music", "podcasts", "facetime", "chrome", "slack", "notion"],
  },
];

export function getPackIcons(preset: PackPreset): (AppIcon | null)[] {
  return preset.iconIds.map(
    (id) => APP_ICONS.find((a) => a.id === id) ?? null
  );
}
