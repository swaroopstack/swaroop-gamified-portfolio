"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import StartButton from "./StartButton";
import { TERMINAL_PREFIX, TYPING_SPEED_MS, TERMINAL_LINES } from "@/utils/constants";
import type { IntroEventDetail } from "@/game/scenes/IntroScene";
import { SCENE_KEYS } from "@/utils/constants";

interface TerminalScreenProps {
  onStart: () => void;
}

export default function TerminalScreen({ onStart }: TerminalScreenProps) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut]       = useState(false);

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef   = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const skippedRef   = useRef(false);
  const bottomRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typedLines]);

  const typeNextChar = useCallback(() => {
    const lineIdx = lineIndexRef.current;
    const line    = TERMINAL_LINES[lineIdx];
    if (!line) return;

    charIndexRef.current += 1;
    const charIdx = charIndexRef.current;
    const partial = line.slice(0, charIdx);

    setTypedLines((prev) => {
      const next = [...prev];
      next[lineIdx] = partial;
      return next;
    });

    if (charIdx >= line.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const isLast = lineIdx === TERMINAL_LINES.length - 1;

      if (isLast) {
        timeoutRef.current = setTimeout(() => setShowButton(true), 500);
      } else {
        timeoutRef.current = setTimeout(() => {
          lineIndexRef.current += 1;
          charIndexRef.current  = 0;
          setTypedLines((prev) => [...prev, ""]);
          intervalRef.current = setInterval(typeNextChar, TYPING_SPEED_MS);
        }, 420);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<IntroEventDetail>).detail;

      if (detail.type === "START_SEQUENCE") {
        lineIndexRef.current = 0;
        charIndexRef.current = 0;
        setTypedLines([""]);
        intervalRef.current = setInterval(typeNextChar, TYPING_SPEED_MS);
      }

      if (detail.type === "FADE_OUT") setFadeOut(true);
    };

    window.addEventListener("introScene", handler);
    return () => {
      window.removeEventListener("introScene", handler);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current)  clearTimeout(timeoutRef.current);
    };
  }, [typeNextChar]);

  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current)  clearTimeout(timeoutRef.current);
    setTypedLines([...TERMINAL_LINES]);
    setShowButton(true);
  }, []);

  const handleStart = useCallback(async () => {
    const { getScene } = await import("@/game/index");
    const scene = getScene<import("@/game/scenes/IntroScene").default>(SCENE_KEYS.INTRO);
    scene?.triggerFadeOut();
    setTimeout(onStart, 440);
  }, [onStart]);

  const activeLineIdx = showButton ? -1 : lineIndexRef.current;

  return (
    <>
      {/* Full-screen black backdrop */}
      <div className={`cmd-shell${fadeOut ? " fade-out" : ""}`}>

        {/* Centered glassmorphic widget */}
        <div className="term-widget">

          {/* Mac-style title bar */}
          <div className="term-bar">
            <span className="term-dot" />
            <span className="term-dot" />
            <span className="term-dot" />
            <span className="term-title">swaroop_os</span>
          </div>

          {/* Body: ONLY typed lines + START button. Nothing static. */}
          <div className="term-body">
            <div className="cmd-lines">
              {typedLines.map((text, idx) => {
                const isActive = idx === activeLineIdx && !showButton;
                const isReady  = TERMINAL_LINES[idx] === "READY" && text === "READY";

                return (
                  <div key={idx} className="cmd-line">
                    <span className="cmd-prefix">{TERMINAL_PREFIX}</span>
                    <span
                      className={[
                        "cmd-text",
                        isReady  ? "ready"      : "",
                        isActive ? "cmd-typing" : "",
                      ].filter(Boolean).join(" ")}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>

            <StartButton visible={showButton} onClick={handleStart} />
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Game-style skip hint — fixed bottom-right */}
      <button className="skip-btn" onClick={handleSkip} aria-label="Skip intro">
        <span>SKIP</span>
        <span className="skip-key">ESC</span>
      </button>
    </>
  );
}