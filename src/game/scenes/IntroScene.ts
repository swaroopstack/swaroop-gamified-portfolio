import * as Phaser from "phaser";
import { SCENE_KEYS } from "@/utils/constants";

/**
 * IntroScene
 * ──────────
 * Phaser owns the scene lifecycle.
 * It fires ONE event — START_SEQUENCE — after a short boot delay.
 * React's TerminalScreen then drives the full typewriter sequence
 * itself, so there are no timing races between Phaser timers and
 * React's setInterval typewriter.
 */

export type IntroEventDetail =
  | { type: "START_SEQUENCE" }
  | { type: "FADE_OUT" };

export function emitIntro(detail: IntroEventDetail): void {
  window.dispatchEvent(new CustomEvent("introScene", { detail }));
}

export default class IntroScene extends Phaser.Scene {
  private startTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: SCENE_KEYS.INTRO });
  }

  create(): void {
    // Small boot pause, then hand off to React
    this.startTimer = this.time.delayedCall(600, () => {
      emitIntro({ type: "START_SEQUENCE" });
    });
  }

  /** Called by React when START is clicked. */
  public triggerFadeOut(): void {
    emitIntro({ type: "FADE_OUT" });
  }

  shutdown(): void {
    this.startTimer?.destroy();
  }
}