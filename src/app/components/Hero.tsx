"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "./Navbar.component";

type HeroProps = {
  onReserve: () => void;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const qrFloatAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }

  8% {
    transform: translateY(-2px) rotate(-3deg);
  }

  16% {
    transform: translateY(1px) rotate(3deg);
  }

  24% {
    transform: translateY(-2px) rotate(-2.5deg);
  }

  32% {
    transform: translateY(1px) rotate(2.5deg);
  }

  40% {
    transform: translateY(-2px) rotate(-2deg);
  }

  48% {
    transform: translateY(-7px) rotate(0deg);
  }

  60% {
    transform: translateY(-3px) rotate(0deg);
  }

  72% {
    transform: translateY(0) rotate(0deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

const qrGlowAnimation = keyframes`
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.92);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.08);
  }
`;

export default function Hero({ onReserve }: HeroProps) {
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = qrOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [qrOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQrOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleReserve = () => {
    setQrOpen(false);
    onReserve();
  };

  return (
    <Container id="top">
      <Navbar onReserve={onReserve} />

      <HeroComponent>
        <BackgroundImage
          src="/images/eventImg.jpeg"
          alt="OPEX Executive Workshop and Summit"
          fill
          priority
          quality={75}
          sizes="100vw"
        />

        <Overlay />

        <HeroContent>
          <Headline>
            <HeadlineTop>
              <HeadlineLight>The End of</HeadlineLight>
            </HeadlineTop>

            <HeadlineBrand>
              <Accent>Manual.</Accent>
            </HeadlineBrand>
          </Headline>

          <Subheadline>
            AI, connected systems and the future of financial reporting and
            compliance
          </Subheadline>

          <ValueText>
            How Nigeria&apos;s leading financial institutions are building
            reporting and compliance that regulators, boards and partners can
            trust.
          </ValueText>

          <EventDetails>
            <Detail>
              <DetailLabel>DATE</DetailLabel>
              <DetailValue>Wednesday, 21 October 2026</DetailValue>
            </Detail>

            <Detail>
              <DetailLabel>VENUE</DetailLabel>
              <DetailValue>The Wheatbaker, Ikoyi, Lagos</DetailValue>
            </Detail>
          </EventDetails>

          <Actions>
            <PrimaryButton type="button" onClick={onReserve}>
              Reserve your seat
            </PrimaryButton>

            <SecondaryButton href="#agenda">View the agenda</SecondaryButton>
          </Actions>
        </HeroContent>

        <QRCodeCard
          type="button"
          onClick={() => setQrOpen(true)}
          aria-label="Open reservation QR code"
        >
          <QRGlow />

          <QRImage
            src="/images/qrcode.png"
            alt="Scan to reserve your seat"
            width={72}
            height={72}
          />

          <QRText>SCAN TO RESERVE</QRText>
        </QRCodeCard>
      </HeroComponent>

      {qrOpen && (
        <QRModalOverlay onClick={() => setQrOpen(false)}>
          <QRModal
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Reservation QR code"
          >
            <CloseButton
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Close QR code"
            >
              <CloseLine />
              <CloseLine />
            </CloseButton>

            <ModalEyebrow>OPEX EXECUTIVE WORKSHOP & SUMMIT 2026</ModalEyebrow>

            <ModalTitle>
              Reserve
              <br />
              your <ModalAccent>seat.</ModalAccent>
            </ModalTitle>

            <ModalDescription>
              Scan the QR code with your phone to reserve your seat for the
              executive workshop and summit.
            </ModalDescription>

            <LargeQRWrapper>
              <LargeQR
                src="/images/qrcode.png"
                alt="QR code to reserve your seat"
                width={181}
                height={181}
              />
            </LargeQRWrapper>

            <ModalHint>SCAN WITH YOUR PHONE CAMERA</ModalHint>

            <ModalLink type="button" onClick={handleReserve}>
              Open reservation form
              <ModalArrow>↗</ModalArrow>
            </ModalLink>
          </QRModal>
        </QRModalOverlay>
      )}
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
`;

const HeroComponent = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #050505;
`;

const BackgroundImage = styled(Image)`
  position: absolute !important;
  inset: 0;
  z-index: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;

  transform: scale(1.01);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  /*
    Deep OPEX blue foundation.
    The left side is darker for text readability,
    while the right side allows the image to breathe.
  */

  background: linear-gradient(
      90deg,
      rgba(3, 20, 48, 0.96) 0%,
      rgba(5, 31, 69, 0.88) 24%,
      rgba(7, 45, 88, 0.66) 48%,
      rgba(5, 38, 78, 0.42) 72%,
      rgba(2, 15, 35, 0.52) 100%
    ),
    linear-gradient(
      180deg,
      rgba(3, 18, 40, 0.42) 0%,
      rgba(0, 48, 105, 0.12) 45%,
      rgba(0, 8, 22, 0.78) 100%
    );

  /*
    Very subtle blue atmospheric wash.
    This makes the photography feel part of the
    OPEX visual system without flattening it.
  */

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    background: radial-gradient(
        circle at 72% 42%,
        rgba(0, 103, 212, 0.22) 0%,
        rgba(0, 103, 212, 0.08) 28%,
        rgba(0, 103, 212, 0) 60%
      ),
      linear-gradient(
        90deg,
        rgba(0, 103, 212, 0.08) 0%,
        rgba(0, 103, 212, 0) 65%
      );

    pointer-events: none;
  }

  @media (max-width: 700px) {
    background: linear-gradient(
        90deg,
        rgba(3, 20, 48, 0.97) 0%,
        rgba(5, 31, 69, 0.9) 42%,
        rgba(5, 38, 78, 0.68) 75%,
        rgba(2, 15, 35, 0.64) 100%
      ),
      linear-gradient(
        180deg,
        rgba(3, 18, 40, 0.5) 0%,
        rgba(0, 48, 105, 0.12) 45%,
        rgba(0, 8, 22, 0.82) 100%
      );

    &::after {
      background: radial-gradient(
          circle at 75% 40%,
          rgba(0, 103, 212, 0.16) 0%,
          rgba(0, 103, 212, 0) 55%
        ),
        linear-gradient(
          90deg,
          rgba(0, 103, 212, 0.06) 0%,
          rgba(0, 103, 212, 0) 70%
        );
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  width: min(900px, 90vw);

  margin-left: clamp(30px, 8vw, 130px);
  padding-top: 100px;

  color: #ffffff;

  @media (max-width: 700px) {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding-top: 80px;
  }
`;

const Headline = styled.h1`
  margin: 0;

  color: #ffffff;

  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    letter-spacing: -0.065em;
  }
`;

const HeadlineTop = styled.span`
  display: block;

  white-space: nowrap;

  font-family: "Mont", sans-serif;
  font-size: clamp(48px, 6.5vw, 98px);
  line-height: 0.9;
  font-weight: 200;
  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    font-size: clamp(40px, 11vw, 72px);
  }
`;

const HeadlineLight = styled.span`
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const HeadlineBrand = styled.span`
  display: block;

  margin-top: 8px;

  font-family: "Chillen", sans-serif;
  font-size: clamp(100px, 13vw, 190px);
  line-height: 0.78;
  font-weight: 400;
  letter-spacing: -0.085em;

  @media (max-width: 700px) {
    margin-top: 8px;
    font-size: clamp(78px, 21vw, 140px);
    line-height: 0.8;
  }
`;

const Accent = styled.span`
  color: #0067d4;
`;

const Subheadline = styled.p`
  max-width: 590px;

  margin-top: 36px;

  color: #f1f1f1;

  font-family: "Chillen", sans-serif;
  font-size: clamp(16px, 1.5vw, 21px);
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-weight: 400;

  @media (max-width: 700px) {
    margin-top: 28px;
    font-size: 15px;
  }
`;

const ValueText = styled.p`
  max-width: 520px;

  margin-top: 18px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;
  font-size: 12px;
  line-height: 1.65;
  letter-spacing: -0.01em;
  font-weight: 200;

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const EventDetails = styled.div`
  display: flex;

  gap: 48px;

  margin-top: 34px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const DetailLabel = styled.span`
  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.16em;
`;

const DetailValue = styled.span`
  color: #f5f5f5;

  font-family: "Mont", sans-serif;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: -0.01em;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;

  margin-top: 36px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 54px;

  padding: 0 28px;

  border: 0;
  border-radius: 100px;

  background: #c6e3fb;
  color: #083672;

  font-family: "Chillen", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.01em;

  cursor: pointer;

  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-3px);

    background: #ffffff;

    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(198, 227, 251, 0.25);
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;
    outline-offset: 4px;
  }

  @media (max-width: 600px) {
    min-height: 52px;
    padding: 0 25px;

    font-size: 14px;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 48px;

  padding: 0 20px;

  border-radius: 100px;

  color: #eeeeee;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;

  text-decoration: none;

  transition: color 0.25s ease, transform 0.25s ease;

  &:hover {
    color: #c6e3fb;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;
    outline-offset: 4px;
  }
`;

const QRCodeCard = styled.button`
  position: absolute;
  z-index: 4;

  right: clamp(24px, 5vw, 70px);
  bottom: 32px;

  width: 108px;
  height: 108px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10px;

  cursor: pointer;

  border: 0;
  border-radius: 18px;

  background: #ffffff;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2);

  animation: ${qrFloatAnimation} 2.2s ease-in-out infinite;

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    animation-play-state: paused;

    transform: translateY(-5px) scale(1.04);

    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.32),
      0 0 0 1px rgba(198, 227, 251, 0.35);
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;
    outline-offset: 5px;
  }

  @media (max-width: 600px) {
    right: 20px;
    bottom: 20px;

    width: 88px;
    height: 88px;

    padding: 8px;

    border-radius: 14px;
  }
`;

const QRGlow = styled.div`
  position: absolute;

  inset: -10px;

  z-index: -1;

  border-radius: 24px;

  background: radial-gradient(
    circle,
    rgba(0, 103, 212, 0.38) 0%,
    rgba(0, 103, 212, 0) 70%
  );

  filter: blur(8px);

  animation: ${qrGlowAnimation} 3s ease-in-out infinite;

  pointer-events: none;
`;

const QRImage = styled(Image)`
  position: relative;
  z-index: 1;

  width: 72px;
  height: 72px;

  object-fit: contain;

  @media (max-width: 600px) {
    width: 58px;
    height: 58px;
  }
`;

const QRText = styled.span`
  position: relative;
  z-index: 1;

  margin-top: 4px;

  color: #083672;

  font-family: "Chillen", sans-serif;
  font-size: 6px;
  font-weight: 400;
  letter-spacing: 0.12em;

  @media (max-width: 600px) {
    font-size: 5px;
  }
`;

const QRModalOverlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.78);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  animation: ${fadeIn} 0.25s ease;
`;

const QRModal = styled.div`
  position: relative;

  width: min(390px, 100%);
  max-height: 90vh;

  padding: 34px 30px 28px;

  overflow-y: auto;

  border-radius: 24px;

  background: #083672;

  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), 0 8px 30px rgba(0, 0, 0, 0.25);

  animation: ${modalIn} 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 600px) {
    width: min(350px, 100%);

    padding: 30px 22px 24px;

    border-radius: 22px;
  }
`;

const CloseButton = styled.button`
  position: absolute;

  top: 16px;
  right: 16px;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border: 0;
  border-radius: 50%;

  background: rgba(198, 227, 251, 0.14);

  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: rgba(198, 227, 251, 0.24);
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;
    outline-offset: 3px;
  }
`;

const CloseLine = styled.span`
  position: absolute;

  width: 13px;
  height: 1px;

  background: #ffffff;

  &:first-child {
    transform: rotate(45deg);
  }

  &:last-child {
    transform: rotate(-45deg);
  }
`;

const ModalEyebrow = styled.div`
  margin-bottom: 14px;

  padding-right: 35px;

  color: #c6e3fb;

  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.16em;

  text-transform: uppercase;
`;

const ModalTitle = styled.h2`
  margin: 0;

  color: #ffffff;

  font-family: "Chillen", sans-serif;
  font-size: clamp(34px, 6vw, 46px);
  line-height: 0.94;
  letter-spacing: -0.055em;
  font-weight: 400;
`;

const ModalAccent = styled.span`
  color: #0067d4;
`;

const ModalDescription = styled.p`
  max-width: 320px;

  margin: 18px 0 24px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;
  font-size: 11px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  font-weight: 200;
`;

const LargeQRWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 205px;
  height: 205px;

  margin: 0 auto 18px;

  padding: 12px;

  border-radius: 18px;

  background: #ffffff;

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    width: 190px;
    height: 190px;
  }
`;

const LargeQR = styled(Image)`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const ModalHint = styled.div`
  margin-bottom: 20px;

  color: #c6e3fb;

  font-family: "Chillen", sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.16em;

  text-align: center;
`;

const ModalLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  width: 100%;
  height: 44px;

  border: 0;
  border-radius: 100px;

  background: #c6e3fb;
  color: #083672;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: -0.01em;

  text-decoration: none;

  cursor: pointer;

  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #ffffff;
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;
    outline-offset: 4px;
  }
`;

const ModalArrow = styled.span`
  font-size: 15px;

  transition: transform 0.25s ease;

  ${ModalLink}:hover & {
    transform: translate(2px, -2px);
  }
`;
