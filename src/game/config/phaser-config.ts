import type Phaser from "phaser";

/** Returns a Phaser.Types.Core.GameConfig object.
 *  Scenes are injected at runtime so this stays scene-agnostic.
 */
export function buildPhaserConfig(
  scenes: Phaser.Types.Scenes.SceneType[],
  parent: string
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    parent,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: "100%",
      height: "100%",
    },
    scene: scenes,
    // No physics, audio, or plugins needed for intro phase
    audio: { noAudio: true },
    banner: false,
  };
}