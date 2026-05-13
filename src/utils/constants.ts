export const TERMINAL_PREFIX = "swaroop_os:~$";

export const TERMINAL_LINES: string[] = [
  "Initializing Portfolio OS...",
  "Loading Developer Profile...",
  "Assets Synced.",
  "READY",
];

export const TYPING_SPEED_MS = 35;       // ms per character
export const LINE_DELAY_MS = 600;         // pause between lines
export const POST_READY_DELAY_MS = 700;   // pause before showing button

export const SCENE_KEYS = {
  BOOT: "BootScene",
  INTRO: "IntroScene",
  MAIN: "MainScene",
} as const;

export const GAME_CONFIG = {
  WIDTH: "100%",
  HEIGHT: "100%",
  BG_COLOR: 0x000000,
} as const;