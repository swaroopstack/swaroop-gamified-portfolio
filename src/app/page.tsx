"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PHASER_PARENT_ID } from "@/utils/constants";

const TerminalScreen = dynamic(
  () => import("@/components/ui/TerminalScreen"),
  { ssr: false }
);

type Phase = "intro" | "main";

export default function HomePage() {
  const [phase, setPhase]   = useState<Phase>("intro");
  const booted              = useRef(false);

  /* Boot Phaser once */
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    (async () => {
      const { initGame } = await import("@/game/index");
      await initGame();
    })();

    return () => {
      (async () => {
        const { destroyGame } = await import("@/game/index");
        destroyGame();
      })();
    };
  }, []);

  const handleStart = useCallback(() => setPhase("main"), []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Phaser canvas */}
      <div
        id={PHASER_PARENT_ID}
        className="absolute inset-0"
        style={{
          opacity:    phase === "main" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Terminal intro overlay */}
      {phase === "intro" && <TerminalScreen onStart={handleStart} />}

      {/* Next phase placeholder */}
      {phase === "main" && (
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          "100%",
            height:         "100%",
            fontFamily:     "var(--font-mono)",
            fontSize:       "13px",
            color:          "rgba(110,231,255,0.8)",
            letterSpacing:  "0.08em",
            animation:      "cmdLineIn 0.4s ease-out both",
          }}
        >
          swaroop_os:~$&nbsp;
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            portfolio loaded
          </span>
          <span
            style={{
              display:      "inline-block",
              width:        "9px",
              height:       "15px",
              marginLeft:   "6px",
              background:   "rgba(255,255,255,0.65)",
              borderRadius: "2px",
              animation:    "blockBlink 1.1s step-end infinite",
            }}
          />
        </div>
      )}
    </main>
  );
}