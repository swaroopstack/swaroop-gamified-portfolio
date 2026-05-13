"use client";

import React from "react";

interface StartButtonProps {
  visible: boolean;
  onClick: () => void;
}

/**
 * Renders as another CMD prompt line — immersed in the terminal flow.
 * Fades in via .start-wrap → .start-btn in retro.css.
 */
export default function StartButton({ visible, onClick }: StartButtonProps) {
  if (!visible) return null;

  return (
    <div className="start-wrap">
      <button className="start-btn" onClick={onClick} aria-label="Start portfolio">
        <span className="start-btn-prefix">swaroop_os:~$</span>
        <span className="start-btn-label">-- START --</span>
      </button>
    </div>
  );
}