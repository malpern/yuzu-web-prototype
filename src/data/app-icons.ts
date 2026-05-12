export interface AppIcon {
  id: string;
  name: string;
  bundleId: string;
  icon: string;
  pack: Pack;
}

export type Pack =
  | "developer"
  | "productivity"
  | "designer"
  | "social"
  | "browsers"
  | "utilities"
  | "ai"
  | "apple"
  | "microsoft";

export const PACK_LABELS: Record<Pack, string> = {
  developer: "Developer",
  productivity: "Productivity",
  designer: "Designer",
  social: "Social & Media",
  browsers: "Browsers",
  utilities: "Utilities",
  ai: "AI",
  apple: "Apple",
  microsoft: "Microsoft",
};

const BASE = import.meta.env.BASE_URL;

function icon(id: string, name: string, bundleId: string, pack: Pack): AppIcon {
  return { id, name, bundleId, icon: `${BASE}icons/${id}.png`, pack };
}

export const APP_ICONS: AppIcon[] = [
  // Developer
  icon("xcode", "Xcode", "com.apple.dt.Xcode", "developer"),
  icon("cursor", "Cursor", "com.todesktop.230313mzl4w4u92", "developer"),
  icon("terminal", "Terminal", "com.apple.Terminal", "developer"),
  icon("iterm2", "iTerm2", "com.googlecode.iterm2", "developer"),
  icon("sublime-text", "Sublime Text", "com.sublimetext.4", "developer"),
  icon("vscode", "VS Code", "com.microsoft.VSCode", "developer"),
  icon("zed", "Zed", "dev.zed.Zed", "developer"),
  icon("docker", "Docker", "com.docker.docker", "developer"),
  icon("github-desktop", "GitHub Desktop", "com.github.GitHubClient", "developer"),
  icon("postman", "Postman", "com.postmanlabs.mac", "developer"),
  icon("tableplus", "TablePlus", "com.tinyapp.TablePlus", "developer"),
  icon("warp", "Warp", "dev.warp.Warp-Stable", "developer"),
  icon("transmit", "Transmit", "com.panic.Transmit", "developer"),

  // Productivity
  icon("slack", "Slack", "com.tinyspeck.slackmacgap", "productivity"),
  icon("notion", "Notion", "notion.id", "productivity"),
  icon("linear", "Linear", "com.linear", "productivity"),
  icon("zoom", "Zoom", "us.zoom.xos", "productivity"),
  icon("mail", "Mail", "com.apple.mail", "productivity"),
  icon("notes", "Notes", "com.apple.Notes", "productivity"),
  icon("reminders", "Reminders", "com.apple.reminders", "productivity"),
  icon("todoist", "Todoist", "com.todoist.mac.Todoist", "productivity"),
  icon("obsidian", "Obsidian", "md.obsidian", "productivity"),
  icon("bear", "Bear", "net.shinyfrog.bear", "productivity"),
  icon("things", "Things", "com.culturedcode.ThingsMac", "productivity"),
  icon("asana", "Asana", "com.asana.app", "productivity"),
  icon("contacts", "Contacts", "com.apple.AddressBook", "productivity"),
  icon("freeform", "Freeform", "com.apple.Freeform", "productivity"),

  // Designer
  icon("figma", "Figma", "com.figma.Desktop", "designer"),
  icon("sketch", "Sketch", "com.bohemiancoding.sketch3", "designer"),
  icon("photoshop", "Photoshop", "com.adobe.Photoshop", "designer"),
  icon("illustrator", "Illustrator", "com.adobe.Illustrator", "designer"),
  icon("premiere", "Premiere Pro", "com.adobe.PremierePro", "designer"),
  icon("aftereffects", "After Effects", "com.adobe.AfterEffects", "designer"),
  icon("final-cut", "Final Cut Pro", "com.apple.FinalCut", "designer"),
  icon("logic-pro", "Logic Pro", "com.apple.logic10", "designer"),
  icon("davinci", "DaVinci Resolve", "com.blackmagic-design.DaVinciResolve", "designer"),
  icon("blender", "Blender", "org.blenderfoundation.blender", "designer"),
  icon("canva", "Canva", "com.canva.CanvaDesktop", "designer"),
  icon("affinity-designer", "Affinity Designer", "com.seriflabs.affinitydesigner2", "designer"),
  icon("affinity-photo", "Affinity Photo", "com.seriflabs.affinityphoto2", "designer"),
  icon("preview", "Preview", "com.apple.Preview", "designer"),
  icon("photos", "Photos", "com.apple.Photos", "designer"),
  icon("font-book", "Font Book", "com.apple.FontBook", "designer"),

  // Social & Media
  icon("discord", "Discord", "com.hnc.Discord", "social"),
  icon("spotify", "Spotify", "com.spotify.client", "social"),
  icon("messages", "Messages", "com.apple.MobileSMS", "social"),
  icon("whatsapp", "WhatsApp", "net.whatsapp.WhatsApp", "social"),
  icon("music", "Music", "com.apple.Music", "social"),
  icon("podcasts", "Podcasts", "com.apple.podcasts", "social"),
  icon("facetime", "FaceTime", "com.apple.FaceTime", "social"),
  icon("telegram", "Telegram", "ph.telegra.Telegraph", "social"),
  icon("signal", "Signal", "org.whispersystems.signal-desktop", "social"),
  icon("teams", "Teams", "com.microsoft.teams2", "social"),
  icon("vlc", "VLC", "org.videolan.vlc", "social"),

  // Browsers
  icon("chrome", "Chrome", "com.google.Chrome", "browsers"),
  icon("safari", "Safari", "com.apple.Safari", "browsers"),
  icon("firefox", "Firefox", "org.mozilla.firefox", "browsers"),
  icon("arc", "Arc", "company.thebrowser.Browser", "browsers"),
  icon("brave", "Brave", "com.brave.Browser", "browsers"),
  icon("dia", "Dia", "com.anthropic.dia", "browsers"),

  // AI
  icon("chatgpt", "ChatGPT", "com.openai.chat", "ai"),
  icon("claude", "Claude", "com.anthropic.claude", "ai"),

  // Apple
  icon("keynote", "Keynote", "com.apple.iWork.Keynote", "apple"),
  icon("pages", "Pages", "com.apple.iWork.Pages", "apple"),
  icon("maps", "Maps", "com.apple.Maps", "apple"),
  icon("books", "Books", "com.apple.iBooksX", "apple"),
  icon("weather", "Weather", "com.apple.weather", "apple"),
  icon("stocks", "Stocks", "com.apple.stocks", "apple"),
  icon("news", "News", "com.apple.news", "apple"),
  icon("shortcuts", "Shortcuts", "com.apple.shortcuts", "apple"),
  icon("clock", "Clock", "com.apple.clock", "apple"),
  icon("textedit", "TextEdit", "com.apple.TextEdit", "apple"),
  icon("automator", "Automator", "com.apple.Automator", "apple"),
  icon("calculator", "Calculator", "com.apple.calculator", "apple"),
  icon("finder", "Finder", "com.apple.finder", "apple"),
  icon("system-settings", "System Settings", "com.apple.systempreferences", "apple"),

  // Microsoft
  icon("powerpoint", "PowerPoint", "com.microsoft.Powerpoint", "microsoft"),

  // Utilities
  icon("1password", "1Password", "com.1password.1password", "utilities"),
  icon("activity-monitor", "Activity Monitor", "com.apple.ActivityMonitor", "utilities"),
  icon("raycast", "Raycast", "com.raycast.macos", "utilities"),
  icon("cleanshot", "CleanShot X", "com.cleanshot.mac", "utilities"),
  icon("magnet", "Magnet", "id.mnemonicapps.Magnet", "utilities"),
  icon("keyboard-maestro", "Keyboard Maestro", "com.stairways.keyboardmaestro", "utilities"),
];
