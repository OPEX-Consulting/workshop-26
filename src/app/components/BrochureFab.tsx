"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const BROCHURE_PDF = "/agenda/OPEX-Summit-2026-Brochure.pdf";

export default function BrochureFab() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <Fab
      href={BROCHURE_PDF}
      download
      $isFooterVisible={isFooterVisible}
      aria-label="Download the event brochure (PDF)"
      title="Download brochure"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Fab>
  );
}

const gentleBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  8% {
    transform: translateY(-7px);
  }

  16% {
    transform: translateY(0);
  }

  24% {
    transform: translateY(-4px);
  }

  32% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-2px);
  }

  48%, 100% {
    transform: translateY(0);
  }
`;

const Fab = styled.a<{ $isFooterVisible: boolean }>`
  position: fixed;
  right: 36px;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  z-index: 1000;

  width: 56px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
    ${({ $isFooterVisible }) =>
      $isFooterVisible
        ? "rgba(8, 54, 114, 0.12)"
        : "rgba(255, 255, 255, 0.12)"};

  border-radius: 50%;

  background: ${({ $isFooterVisible }) =>
    $isFooterVisible ? "#c6e3fb" : "#083672"};

  color: ${({ $isFooterVisible }) =>
    $isFooterVisible ? "#083672" : "#ffffff"};

  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  box-shadow: ${({ $isFooterVisible }) =>
    $isFooterVisible
      ? "0 8px 24px rgba(8, 54, 114, 0.12)"
      : "0 8px 24px rgba(8, 54, 114, 0.22)"};

  animation: ${gentleBounce} 4s ease-in-out infinite;

  transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease;

  &:hover {
    animation-play-state: paused;

    background: ${({ $isFooterVisible }) =>
      $isFooterVisible ? "#b3daf8" : "#062b5b"};

    box-shadow: 0 12px 28px rgba(8, 54, 114, 0.22);
  }

  &:active {
    animation-play-state: paused;
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 3px solid var(--blue-light, #c6e3fb);
    outline-offset: 4px;
  }

  @media (max-width: 600px) {
    right: 24px;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));

    width: 50px;
    height: 50px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;
