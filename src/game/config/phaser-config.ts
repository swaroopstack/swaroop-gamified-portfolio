/**
 * phaser-config.ts
 * ────────────────
 * Phaser is browser-only and loaded via dynamic import.
 * We receive the live namespace as a parameter so this file
 * never imports Phaser at the top level (safe for SSR / Turbopack).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhaserNS = typeof import("phaser");

export function buildPhaserConfig(
  PH: PhaserNS,
  scenes: PhaserNS["Scene"][],
  parent: string
): ConstructorParameters<PhaserNS["Game"]>[0] {
  return {
    type: PH.AUTO,
    backgroundColor: "#000000",
    parent,
    scale: {
      mode: PH.Scale.RESIZE,
      autoCenter: PH.Scale.CENTER_BOTH,
      width: "100%",
      height: "100%",
    },
    scene: scenes,
    audio: { noAudio: true },
    banner: false,
  };
}