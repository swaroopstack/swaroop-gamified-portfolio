/**
 * game/index.ts
 * ─────────────
 * Creates and returns the Phaser.Game instance.
 * Must only be called in a browser context (no SSR).
 */

import type * as PhaserTypes from "phaser";
import { buildPhaserConfig } from "./config/phaser-config";
import BootScene from "./scenes/BootScene";
import IntroScene from "./scenes/IntroScene";

export const PHASER_PARENT_ID = "phaser-container";

let gameInstance: PhaserTypes.Game | null = null;

export async function initGame(): Promise<PhaserTypes.Game> {
  if (gameInstance) return gameInstance;

  // Namespace import — Phaser ESM has no default export
  const Phaser = await import("phaser");

  const config = buildPhaserConfig(Phaser, [BootScene, IntroScene], PHASER_PARENT_ID);
  gameInstance = new Phaser.Game(config);
  return gameInstance;
}

export function destroyGame(): void {
  gameInstance?.destroy(true);
  gameInstance = null;
}

/** Retrieve a running scene by key (typed). */
export function getScene<T extends PhaserTypes.Scene>(key: string): T | null {
  if (!gameInstance) return null;
  return (gameInstance.scene.getScene(key) as T) ?? null;
}