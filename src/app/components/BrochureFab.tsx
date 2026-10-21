"use client";

import styled from "styled-components";

// Floating "Download brochure" button on the landing page.
const BROCHURE_PDF = "/agenda/OPEX-Summit-2026-Brochure.pdf";

export default function BrochureFab() {
  return (
    <Fab href={BROCHURE_PDF} download aria-label="Download the event brochure (PDF)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Download brochure</span>
    </Fab>
  );
}

const Fab = styled.a`
  position: fixed;
  right: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px 0 18px;
  border-radius: 999px;
  background: #083672;
  color: #fff;
  font-family: "Mont", sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #6fb6ff;
  box-shadow: 0 12px 32px rgba(8, 54, 114, 0.35);
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover { background: #0067d4; transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid #c6e3fb; outline-offset: 3px; }

  @media (max-width: 600px) {
    right: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
    min-height: 48px;
    padding: 0 18px 0 14px;
    font-size: 14px;
  }
`;
