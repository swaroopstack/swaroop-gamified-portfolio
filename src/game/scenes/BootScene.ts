import * as Phaser from "phaser";
import { SCENE_KEYS } from "@/utils/constants";

/**
 * BootScene
 * ─────────
 * Runs first. Handles any global setup / asset preloading.
 * For the intro phase there are no heavy assets, so it jumps
 * straight to IntroScene after a single frame.
 */
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.BOOT });
  }

  preload(): void {
    // Future: preload spritesheets, fonts, audio here
  }

  create(): void {
    this.scene.start(SCENE_KEYS.INTRO);
  }
}