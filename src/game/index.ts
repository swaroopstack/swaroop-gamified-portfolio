/**
 * game/index.ts
 * ─────────────
 * Creates and returns the Phaser.Game instance.
 * Must only be called in a browser context (no SSR).
 */

import type * as PhaserTypes from "phaser";
import { PHASER_PARENT_ID } from "@/utils/constants";
import { buildPhaserConfig } from "./config/phaser-config";

let gameInstance: PhaserTypes.Game | null = null;

export async function initGame(): Promise<PhaserTypes.Game> {
  if (gameInstance) return gameInstance;

  // Namespace import — Phaser ESM has no default export.
  // Scenes import Phaser at module scope, so load them only in the browser
  // alongside the Phaser runtime instead of during Next.js prerendering.
  const [Phaser, { default: BootScene }, { default: IntroScene }] =
    await Promise.all([
      import("phaser"),
      import("./scenes/BootScene"),
      import("./scenes/IntroScene"),
    ]);

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