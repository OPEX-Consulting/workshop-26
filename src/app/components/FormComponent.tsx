"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const EVENT = {
  title: "From Manual Risk Assessment to Intelligent Risk Operations",
  description:
    "Explore how AI is transforming enterprise risk management in financial institutions.",
  date: "Thursday, 19 November 2026",
  time: "11:00 AM",
  venue: "Live on Zoom",
  flyer: "/images/webinarflyer.jpeg",
  logo: "/images/opexwhite.webp",
};

const ZOOM_LINK = "https://bit.ly/4ku1L8s";
const REDIRECT_DELAY = 5000;

type FormComponentProps = {
  onCancel: () => void;
};

type FormValues = {
  fullName: string;
  email: string;
  referralSource: string;
  consent: boolean;
};

type FormStep = "overview" | "details" | "success";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
  }

  button, input, select {
    font: inherit;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background: #dce8f7;
    color: #142b49;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const flyerFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const lightSweep = keyframes`
  0% { transform: translateX(-150%) rotate(18deg); opacity: 0; }
  15% { opacity: 0.2; }
  55% { opacity: 0.12; }
  100% { transform: translateX(180%) rotate(18deg); opacity: 0; }
`;

const pillReveal = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const successEnter = keyframes`
  from { opacity: 0; transform: scale(1.015); }
  to { opacity: 1; transform: scale(1); }
`;

const checkCircle = keyframes`
  0% { opacity: 0; transform: scale(0.65); }
  65% { opacity: 1; transform: scale(1.07); }
  100% { opacity: 1; transform: scale(1); }
`;

const checkDraw = keyframes`
  to { stroke-dashoffset: 0; }
`;

const successText = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spinnerRotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spinnerRotate} 0.7s linear infinite;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 28px;
  background: rgba(20, 27, 37, 0.46);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  @media (max-width: 600px) {
    align-items: flex-start;
    padding: 10px;
  }
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1020px;
  height: min(760px, calc(100vh - 56px));
  height: min(760px, calc(100dvh - 56px));
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e8ebef;
  border-radius: 14px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.16);
  animation: ${fadeIn} 0.28s ease both;

  @media (max-width: 760px) {
    height: auto;
    max-height: calc(100vh - 20px);
    max-height: calc(100dvh - 20px);
    overflow-y: auto;
  }

  @media (max-width: 600px) {
    border-radius: 11px;
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  min-height: 72px;
  padding: 16px 34px;
  background: #ffffff;
  border-bottom: 1px solid #eaecf0;

  @media (max-width: 600px) {
    min-height: 62px;
    padding: 12px 18px;
  }
`;

const Logo = styled(Image)`
  display: block;
  width: 88px;
  height: 32px;
  object-fit: contain;
  object-position: left center;
  filter: brightness(0) saturate(100%) invert(12%) sepia(16%) saturate(2126%)
    hue-rotate(176deg) brightness(91%) contrast(92%);

  @media (max-width: 600px) {
    width: 76px;
    height: 28px;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  color: #667085;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #f7f8fa;
    border-color: #d0d5dd;
  }

  &:focus-visible {
    outline: 3px solid #b2ccf2;
    outline-offset: 2px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    overflow: visible;
  }
`;

const MainPanel = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  padding: 38px 40px;
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-width: 760px) {
    flex: 0 0 auto;
    padding: 30px 24px;
    overflow: visible;
  }

  @media (max-width: 400px) {
    padding: 26px 17px;
  }
`;

const SidePanel = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  min-width: 0;
  min-height: 0;
  padding: 24px 27px;
  overflow: hidden;
  background: #f7f8fa;
  border-left: 1px solid #eaecf0;

  @media (max-width: 760px) {
    flex: 0 0 auto;
    padding: 22px 24px 26px;
    overflow: visible;
    border-top: 1px solid #eaecf0;
    border-left: none;
  }

  @media (max-width: 400px) {
    padding: 18px 17px 22px;
  }
`;

const Heading = styled.h1`
  margin: 0;
  color: #142b49;
  font-size: clamp(29px, 3vw, 37px);
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -1.3px;

  @media (max-width: 400px) {
    font-size: 28px;
    letter-spacing: -0.9px;
  }
`;

const Description = styled.p`
  max-width: 470px;
  margin: 14px 0 0;
  color: #667085;
  font-size: 13px;
  font-weight: 450;
  line-height: 1.85;
`;

const MetaList = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 25px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  color: #344054;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 9px;
`;

const MetaCopy = styled.div`
  min-width: 0;
  padding-top: 1px;
`;

const MetaLabel = styled.p`
  margin: 0 0 5px;
  color: #7a8494;
  font-size: 11px;
  font-weight: 500;
`;

const MetaValue = styled.p`
  margin: 0;
  color: #26364b;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.65;
  overflow-wrap: anywhere;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0 18px;
  background: #eaecf0;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      min-height: 48px;
    }
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 47px;
  padding: 0 20px;
  color: #ffffff;
  background: #142b49;
  border: 1px solid #142b49;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    background: #203e62;
    box-shadow: 0 5px 14px rgba(20, 43, 73, 0.12);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.75;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid #b2ccf2;
    outline-offset: 2px;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 47px;
  padding: 0 18px;
  color: #344054;
  background: #ffffff;
  border: 1px solid #e0e4e9;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #f8f9fb;
    border-color: #d0d5dd;
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid #b2ccf2;
    outline-offset: 2px;
  }
`;

const FlyerFrame = styled.div`
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 11px;
  box-shadow: 0 10px 28px rgba(20, 43, 73, 0.07);
  animation: ${flyerFloat} 6s ease-in-out infinite;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  img {
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &::after {
    position: absolute;
    z-index: 1;
    top: -30%;
    bottom: -30%;
    left: 0;
    width: 35%;
    content: "";
    pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.34),
      transparent
    );
    transform: translateX(-150%) rotate(18deg);
    animation: ${lightSweep} 7s ease-in-out 1.5s infinite;
  }

  &:hover {
    border-color: #d2dae5;
    box-shadow: 0 18px 38px rgba(20, 43, 73, 0.12);
  }

  &:hover img {
    transform: scale(1.015);
  }

  @media (max-width: 760px) {
    max-width: 360px;
    margin: 0 auto;
    aspect-ratio: 16 / 10;
  }
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Pill = styled.span<{
  $variant?: "dark" | "light";
  $delay?: number;
}>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 31px;
  padding: 7px 11px;
  color: ${({ $variant }) => ($variant === "dark" ? "#ffffff" : "#344054")};
  background: ${({ $variant }) =>
    $variant === "dark" ? "#142b49" : "#ffffff"};
  border: 1px solid
    ${({ $variant }) => ($variant === "dark" ? "#142b49" : "#e2e7ed")};
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  animation: ${pillReveal} 0.45s ease both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  svg {
    flex: 0 0 auto;
  }
`;

const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #82d6a5;
  box-shadow: 0 0 0 3px rgba(130, 214, 165, 0.12);
`;

const SideHeading = styled.h2`
  margin: 20px 0 7px;
  color: #142b49;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const SideDescription = styled.p`
  margin: 0;
  color: #667085;
  font-size: 12px;
  font-weight: 450;
  line-height: 1.8;
`;

const SideFooter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 17px;
  padding-top: 15px;
  border-top: 1px solid #e4e7ec;
  color: #596579;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.7;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
  }
`;

const FormTitle = styled.h2`
  margin: 0;
  color: #142b49;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -1px;

  @media (max-width: 400px) {
    font-size: 27px;
  }
`;

const FormDescription = styled.p`
  margin: 11px 0 25px;
  color: #667085;
  font-size: 13px;
  font-weight: 450;
  line-height: 1.85;
`;

const Fields = styled.div`
  display: grid;
  gap: 19px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: #344054;
  font-size: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 13px;
  color: #1d2939;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 9px;
  outline: none;
  font-size: 13px;
  font-weight: 450;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.025);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &::placeholder {
    color: #98a2b3;
  }

  &:hover:not(:focus) {
    border-color: #b8c0cc;
  }

  &:focus {
    border-color: #667f9f;
    box-shadow: 0 0 0 3px rgba(51, 83, 122, 0.09);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 13px;
  color: #344054;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 9px;
  outline: none;
  font-size: 13px;
  font-weight: 450;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover:not(:focus) {
    border-color: #b8c0cc;
  }

  &:focus {
    border-color: #667f9f;
    box-shadow: 0 0 0 3px rgba(51, 83, 122, 0.09);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

const ConsentRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 21px;
  color: #667085;
  font-size: 11px;
  font-weight: 450;
  line-height: 1.85;
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    margin: 3px 0 0;
    accent-color: #142b49;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  margin: 15px 0 0;
  padding: 12px 13px;
  color: #912018;
  background: #fef3f2;
  border: 1px solid #fecdca;
  border-radius: 9px;
  font-size: 12px;
  line-height: 1.7;
`;

const SuccessScreen = styled.section`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 30px 22px;
  overflow-y: auto;
  color: #ffffff;
  background: #142b49;
  animation: ${successEnter} 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    pointer-events: none;
    background: radial-gradient(
        ellipse at 50% 34%,
        rgba(100, 139, 185, 0.17),
        transparent 48%
      ),
      linear-gradient(145deg, rgba(255, 255, 255, 0.025), transparent 45%);
  }
`;

const SuccessContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 560px;
  margin: auto;
  text-align: center;
`;

const SuccessBrand = styled.div`
  position: absolute;
  top: 34px;
  left: 38px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.8px;

  @media (max-width: 600px) {
    top: 22px;
    left: 20px;
    font-size: 10px;
  }
`;

const SuccessClose = styled.button`
  position: absolute;
  top: 26px;
  right: 30px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: rotate(5deg);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.6);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    top: 14px;
    right: 14px;
    width: 38px;
    height: 38px;
  }
`;

const SuccessMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94px;
  height: 94px;
  margin-bottom: 30px;
  color: #142b49;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.055),
    0 18px 60px rgba(0, 0, 0, 0.15);
  animation: ${checkCircle} 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) both;

  svg {
    width: 43px;
    height: 43px;
  }

  path {
    stroke-dasharray: 42;
    stroke-dashoffset: 42;
    animation: ${checkDraw} 0.55s 0.32s ease-out forwards;
  }

  @media (max-width: 600px) {
    width: 82px;
    height: 82px;
    margin-bottom: 26px;
  }
`;

const SuccessEyebrow = styled.p`
  margin: 0 0 15px;
  color: #a9c9ef;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  animation: ${successText} 0.5s 0.15s ease both;
`;

const SuccessHeading = styled.h1`
  max-width: 500px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(32px, 5vw, 49px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -1.8px;
  animation: ${successText} 0.55s 0.22s ease both;

  @media (max-width: 400px) {
    font-size: 32px;
    letter-spacing: -1.1px;
  }
`;

const SuccessDescription = styled.p`
  max-width: 410px;
  margin: 17px 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.9;
  animation: ${successText} 0.55s 0.3s ease both;
`;

const SuccessReference = styled.div`
  width: 100%;
  max-width: 390px;
  margin-top: 31px;
  padding: 18px 20px;
  text-align: left;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 13px;
  animation: ${successText} 0.55s 0.38s ease both;
`;

const SuccessReferenceLabel = styled.p`
  margin: 0 0 9px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`;

const SuccessReferenceValue = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: clamp(17px, 3vw, 21px);
  font-weight: 700;
  letter-spacing: 0.5px;
  overflow-wrap: anywhere;
`;

const SuccessEvent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 23px;
  animation: ${successText} 0.55s 0.44s ease both;
`;

const SuccessPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  font-size: 10px;
  font-weight: 500;
`;

const SuccessNotice = styled.p`
  max-width: 390px;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: 10px;
  line-height: 1.8;
  animation: ${successText} 0.55s 0.48s ease both;
`;

const SuccessButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  min-height: 47px;
  margin-top: 28px;
  padding: 0 25px;
  color: #142b49;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${successText} 0.55s 0.52s ease both;

  &:hover {
    background: #eaf1fa;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.13);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.65);
    outline-offset: 4px;
  }
`;

function CalendarIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 3.5V7M16.5 3.5V7M4 9.5H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="6"
        width="12"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15 10L21 7V17L15 14V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LargeCheckIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M9 22.5L18 31L35 13"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FormComponent({ onCancel }: FormComponentProps) {
  const [step, setStep] = useState<FormStep>("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    referralSource: "",
    consent: false,
  });

  useEffect(() => {
    if (step !== "success") return;

    const redirectTimer = window.setTimeout(() => {
      window.location.href = ZOOM_LINK;
    }, REDIRECT_DELAY);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [step]);

  const updateField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!values.consent) {
      setError("Please confirm your consent before continuing.");
      return;
    }

    const endpoint =
      "https://script.google.com/macros/s/AKfycbwvjwTggsA0ZuJRLQBtfSQDG68RFU8D6xJ9tIzHC6zday1n5GDMmcJ-Zjwf5PnSUH4H/exec";

    if (!endpoint) {
      setError(
        "Registration is not configured yet. Please contact the event organiser."
      );
      return;
    }

    setLoading(true);

    const registrationReference = `OPEX-${Date.now().toString().slice(-8)}`;

    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      referralSource: values.referralSource,
    };

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setReference(registrationReference);
      setStep("success");
    } catch {
      setError(
        "We could not submit your registration. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <GlobalStyles />

      <Overlay
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !loading) {
            onCancel();
          }
        }}
      >
        {step === "success" ? (
          <SuccessScreen
            role="status"
            aria-live="polite"
            aria-label="Registration confirmation"
          >
            <SuccessBrand>OPEX CONSULTING</SuccessBrand>

            <SuccessClose
              type="button"
              onClick={onCancel}
              aria-label="Close confirmation"
            >
              <CloseIcon />
            </SuccessClose>

            <SuccessContent>
              <SuccessMark>
                <LargeCheckIcon />
              </SuccessMark>

              <SuccessEyebrow>Registration submitted</SuccessEyebrow>

              <SuccessHeading>You’re on the list.</SuccessHeading>

              <SuccessDescription>
                Thank you for your interest in the OPEX webinar. Keep your
                registration reference for your records.
              </SuccessDescription>

              <SuccessReference>
                <SuccessReferenceLabel>
                  Your registration reference
                </SuccessReferenceLabel>

                <SuccessReferenceValue>{reference}</SuccessReferenceValue>
              </SuccessReference>

              <SuccessEvent>
                <SuccessPill>
                  <CalendarIcon />
                  {EVENT.date}
                </SuccessPill>

                <SuccessPill>
                  <ClockIcon />
                  {EVENT.time}
                </SuccessPill>

                <SuccessPill>
                  <VideoIcon />
                  {EVENT.venue}
                </SuccessPill>
              </SuccessEvent>

              <SuccessNotice>
                You will be redirected to the Zoom webinar in five seconds. If
                you are not redirected automatically, click Join webinar to
                continue.
              </SuccessNotice>

              <SuccessButton
                type="button"
                onClick={() => {
                  window.location.href = ZOOM_LINK;
                }}
              >
                Join webinar
              </SuccessButton>
            </SuccessContent>
          </SuccessScreen>
        ) : (
          <Modal
            role="dialog"
            aria-modal="true"
            aria-label="OPEX webinar registration"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Header>
              <Logo
                src={EVENT.logo}
                alt="OPEX Consulting"
                width={88}
                height={32}
                priority
              />

              <CloseButton
                type="button"
                onClick={() => {
                  if (!loading) onCancel();
                }}
                disabled={loading}
                aria-label="Close registration"
              >
                <CloseIcon />
              </CloseButton>
            </Header>

            <Content>
              <MainPanel>
                {step === "overview" ? (
                  <>
                    <Heading>{EVENT.title}</Heading>

                    <Description>{EVENT.description}</Description>

                    <MetaList>
                      <MetaItem>
                        <IconBox>
                          <CalendarIcon />
                        </IconBox>

                        <MetaCopy>
                          <MetaLabel>Date</MetaLabel>
                          <MetaValue>{EVENT.date}</MetaValue>
                        </MetaCopy>
                      </MetaItem>

                      <MetaItem>
                        <IconBox>
                          <ClockIcon />
                        </IconBox>

                        <MetaCopy>
                          <MetaLabel>Time</MetaLabel>
                          <MetaValue>{EVENT.time}</MetaValue>
                        </MetaCopy>
                      </MetaItem>

                      <MetaItem>
                        <IconBox>
                          <VideoIcon />
                        </IconBox>

                        <MetaCopy>
                          <MetaLabel>Location</MetaLabel>
                          <MetaValue>{EVENT.venue}</MetaValue>
                        </MetaCopy>
                      </MetaItem>
                    </MetaList>

                    <Divider />

                    <Description
                      style={{
                        marginTop: 0,
                        fontSize: 12,
                      }}
                    >
                      Join us to explore a more intelligent approach to
                      enterprise risk management.
                    </Description>

                    <ButtonRow>
                      <PrimaryButton
                        type="button"
                        onClick={() => setStep("details")}
                      >
                        Register for the webinar
                      </PrimaryButton>

                      <SecondaryButton type="button" onClick={onCancel}>
                        Cancel
                      </SecondaryButton>
                    </ButtonRow>
                  </>
                ) : (
                  <>
                    <FormTitle>Your details</FormTitle>

                    <FormDescription>
                      Complete your details below to register for the OPEX
                      webinar.
                    </FormDescription>

                    <form onSubmit={handleSubmit}>
                      <Fields>
                        <Field>
                          Full name
                          <Input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            value={values.fullName}
                            onChange={(event) =>
                              updateField("fullName", event.target.value)
                            }
                            minLength={2}
                            required
                            disabled={loading}
                          />
                        </Field>

                        <Field>
                          Email address
                          <Input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={values.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            required
                            disabled={loading}
                          />
                        </Field>

                        <Field>
                          How did you hear about this event?
                          <Select
                            name="referralSource"
                            value={values.referralSource}
                            onChange={(event) =>
                              updateField("referralSource", event.target.value)
                            }
                            required
                            disabled={loading}
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Email">Email invitation</option>
                            <option value="Colleague">
                              Colleague or referral
                            </option>
                            <option value="Website">OPEX website</option>
                            <option value="Other">Other</option>
                          </Select>
                        </Field>
                      </Fields>

                      <ConsentRow>
                        <input
                          type="checkbox"
                          checked={values.consent}
                          onChange={(event) =>
                            updateField("consent", event.target.checked)
                          }
                          required
                          disabled={loading}
                        />

                        <span>
                          I agree to be contacted by OPEX Consulting about this
                          webinar and related event information.
                        </span>
                      </ConsentRow>

                      {error && (
                        <ErrorMessage role="alert">{error}</ErrorMessage>
                      )}

                      <ButtonRow>
                        <PrimaryButton
                          type="submit"
                          disabled={loading}
                          aria-busy={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner aria-hidden="true" />
                              <span>Submitting registration...</span>
                            </>
                          ) : (
                            "Complete registration"
                          )}
                        </PrimaryButton>

                        <SecondaryButton
                          type="button"
                          onClick={() => {
                            setError("");
                            setStep("overview");
                          }}
                          disabled={loading}
                        >
                          Back
                        </SecondaryButton>
                      </ButtonRow>
                    </form>
                  </>
                )}
              </MainPanel>

              <SidePanel>
                <FlyerFrame>
                  <Image
                    src={EVENT.flyer}
                    alt="OPEX webinar flyer"
                    fill
                    sizes="(max-width: 760px) 90vw, 420px"
                    priority
                  />
                </FlyerFrame>

                <PillRow>
                  <Pill $variant="dark" $delay={100}>
                    <CalendarIcon />
                    19 NOV 2026
                  </Pill>

                  <Pill $variant="light" $delay={180}>
                    <ClockIcon />
                    11:00 AM
                  </Pill>

                  <Pill $variant="light" $delay={260}>
                    <LiveDot />
                    Live webinar
                  </Pill>
                </PillRow>

                <SideHeading>
                  A more intelligent way to manage risk.
                </SideHeading>

                <SideDescription>
                  Discover how AI can help financial institutions move beyond
                  manual risk assessment towards smarter, more connected risk
                  operations.
                </SideDescription>

                <SideFooter>
                  <CalendarIcon />
                  <span>Thursday, 19 November 2026 · 11:00 AM</span>
                </SideFooter>
              </SidePanel>
            </Content>
          </Modal>
        )}
      </Overlay>
    </>
  );
}
