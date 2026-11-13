"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "./Navbar.component";

type HeroProps = {
  onReserve: () => void;
};

type CardName = "daniel" | "simeon";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const particleDrift = keyframes`
  0% {
    background-position:
      0 0,
      30px 50px,
      70px 10px,
      100px 80px;
  }

  100% {
    background-position:
      90px -110px,
      -30px -70px,
      150px -120px,
      20px -40px;
  }
`;

/* Hero section */

const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
  background: #07152f;
  color: #fff;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;

  img {
    object-fit: cover;
    object-position: center;
  }
`;

const BackgroundShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  background: linear-gradient(
    90deg,
    rgba(4, 15, 37, 0.94) 0%,
    rgba(4, 15, 37, 0.83) 42%,
    rgba(4, 15, 37, 0.48) 100%
  );

  @media (max-width: 800px) {
    background: linear-gradient(
      180deg,
      rgba(4, 15, 37, 0.82) 0%,
      rgba(4, 15, 37, 0.88) 60%,
      rgba(4, 15, 37, 0.96) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 1440px;
  min-height: 100svh;
  margin: 0 auto;
  padding: clamp(100px, 13vh, 132px) 6% 48px;

  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(350px, 0.9fr);
  align-items: center;
  gap: 48px;

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.8fr);
    gap: 24px;
    padding-left: 5%;
    padding-right: 5%;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 105px 5% 48px;
  }

  @media (max-width: 480px) {
    padding: 96px 20px 36px;
    gap: 30px;
  }
`;

const Copy = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  animation: ${fadeIn} 0.8s ease both;

  @media (max-width: 800px) {
    max-width: 650px;
  }
`;

const Heading = styled.h1`
  margin: 0;
  max-width: 760px;
  font-size: clamp(42px, 5.4vw, 76px);
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.065em;

  > span {
    display: block;
  }

  .accent {
    color: #54dff4;
  }

  @media (max-width: 800px) {
    max-width: 650px;
    font-size: clamp(44px, 8.4vw, 70px);
  }

  @media (max-width: 480px) {
    font-size: clamp(39px, 10vw, 52px);
    letter-spacing: -0.055em;
    line-height: 1.08;
  }
`;

const Description = styled.p`
  max-width: 490px;
  margin: 25px 0 0;
  color: #c4cfe0;
  font-size: 15px;
  line-height: 1.85;
  font-weight: 400;

  @media (max-width: 480px) {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.75;
  }
`;

const EventDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 28px;

  @media (max-width: 480px) {
    gap: 13px 18px;
    margin-top: 24px;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #e0e8f4;
  font-size: 12px;
  font-weight: 500;

  svg {
    flex-shrink: 0;
    color: #54dff4;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin-top: 34px;

  @media (max-width: 480px) {
    gap: 18px;
    margin-top: 28px;
  }
`;

const PrimaryButton = styled.button`
  min-height: 50px;
  padding: 0 25px;
  border: 1px solid #fff;
  border-radius: 999px;
  background: #fff;
  color: #07152f;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;

  &:hover {
    background: #54dff4;
    border-color: #54dff4;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #54dff4;
    outline-offset: 4px;
  }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #e1e9f5;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #54dff4;
  }

  &:focus-visible {
    outline: 2px solid #54dff4;
    outline-offset: 5px;
  }
`;

/* Speaker cards */

const SpeakersArea = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 470px;
  animation: ${fadeIn} 0.9s ease 0.15s both;

  @media (max-width: 800px) {
    min-height: 390px;
    margin-top: 2px;
  }

  @media (max-width: 480px) {
    min-height: 330px;
  }
`;

const CardDeck = styled.div`
  position: relative;
  width: min(100%, 510px);
  height: 420px;
  perspective: 1200px;

  @media (max-width: 800px) {
    width: min(100%, 460px);
    height: 360px;
  }

  @media (max-width: 480px) {
    height: 310px;
  }
`;

const SpeakerCard = styled.article<{
  $person: CardName;
  $active: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(210px, 22vw, 275px);
  height: clamp(310px, 32vw, 370px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  background: #101d34;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  isolation: isolate;

  transform: ${({ $person, $active }) => {
    if ($person === "daniel") {
      return $active
        ? "translate(-76%, -53%) rotate(-5deg)"
        : "translate(-91%, -50%) rotate(-8deg)";
    }

    return $active
      ? "translate(-24%, -53%) rotate(5deg)"
      : "translate(-9%, -50%) rotate(8deg)";
  }};

  z-index: ${({ $active }) => ($active ? 5 : 2)};

  transition: transform 450ms cubic-bezier(0.2, 0.75, 0.25, 1),
    box-shadow 350ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 32px 75px rgba(0, 0, 0, 0.4);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.75);
    outline-offset: 4px;
  }

  @media (max-width: 800px) {
    width: clamp(190px, 35vw, 245px);
    height: clamp(280px, 48vw, 330px);

    transform: ${({ $person, $active }) => {
      if ($person === "daniel") {
        return $active
          ? "translate(-76%, -53%) rotate(-4deg)"
          : "translate(-88%, -50%) rotate(-7deg)";
      }

      return $active
        ? "translate(-24%, -53%) rotate(4deg)"
        : "translate(-12%, -50%) rotate(7deg)";
    }};
  }

  @media (max-width: 480px) {
    width: clamp(165px, 48vw, 205px);
    height: clamp(245px, 70vw, 285px);
    border-radius: 20px;

    transform: ${({ $person, $active }) => {
      if ($person === "daniel") {
        return $active
          ? "translate(-76%, -53%) rotate(-3deg)"
          : "translate(-85%, -50%) rotate(-6deg)";
      }

      return $active
        ? "translate(-24%, -53%) rotate(3deg)"
        : "translate(-15%, -50%) rotate(6deg)";
    }};
  }
`;

const SpeakerImage = styled(Image)`
  object-fit: cover;
  object-position: center 25%;
  user-select: none;
  pointer-events: none;
`;

const ParticleLayer = styled.div`
  position: absolute;
  z-index: 1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.3;

  background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.95) 0 0.8px,
      transparent 1.5px
    ),
    radial-gradient(circle, rgba(84, 223, 244, 0.9) 0 1px, transparent 1.7px),
    radial-gradient(circle, rgba(255, 255, 255, 0.8) 0 0.6px, transparent 1.4px),
    radial-gradient(circle, rgba(84, 223, 244, 0.7) 0 0.8px, transparent 1.5px);

  background-size: 110px 130px, 150px 170px, 90px 110px, 180px 140px;

  animation: ${particleDrift} 22s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CardGradient = styled.div`
  position: absolute;
  z-index: 2;
  inset: 30% 0 0;
  pointer-events: none;

  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(4, 10, 22, 0.12) 25%,
    rgba(4, 10, 22, 0.9) 100%
  );
`;

const SpeakerInfo = styled.div`
  position: absolute;
  z-index: 3;
  right: 20px;
  bottom: 21px;
  left: 20px;

  .role {
    margin: 0 0 7px;
    color: #8deafa;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    color: #fff;
    font-size: clamp(19px, 2vw, 25px);
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  p {
    margin: 7px 0 0;
    color: rgba(255, 255, 255, 0.76);
    font-size: 11px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    right: 14px;
    bottom: 16px;
    left: 14px;

    .role {
      font-size: 8px;
    }

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 10px;
    }
  }
`;

/* Hero component */

export default function Hero({ onReserve }: HeroProps) {
  const [activeCard, setActiveCard] = useState<CardName>("daniel");

  return (
    <>
      {/* Navbar is outside the isolated hero stacking context */}
      <Navbar onReserve={onReserve} />

      <HeroSection className={montserrat.className}>
        <BackgroundImage>
          <Image
            src="/images/webinartheme.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </BackgroundImage>

        <BackgroundShade />

        <HeroContent>
          <Copy>
            <Heading>
              <span>From Manual</span>
              <span>Risk Assessment</span>
              <span>
                to <span className="accent">Intelligent</span>
              </span>
              <span className="accent">Risk Operations.</span>
            </Heading>

            <Description>
              Explore how AI is transforming enterprise risk management in
              financial institutions.
            </Description>

            <EventDetails>
              <Detail>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M16 3v4M8 3v4M3 10h18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                Thursday, 19 November 2026
              </Detail>

              <Detail>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                11:00 AM
              </Detail>

              <Detail>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 10h8M8 14h4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                Live on Zoom
              </Detail>
            </EventDetails>

            <Actions>
              <PrimaryButton type="button" onClick={onReserve}>
                Reserve your spot
              </PrimaryButton>

              <TextLink href="#speakers">Meet the speakers</TextLink>
            </Actions>
          </Copy>

          <SpeakersArea>
            <CardDeck
              onMouseLeave={() => setActiveCard("daniel")}
              aria-label="Webinar speakers"
            >
              <SpeakerCard
                $person="daniel"
                $active={activeCard === "daniel"}
                onMouseEnter={() => setActiveCard("daniel")}
                onFocus={() => setActiveCard("daniel")}
                onClick={() => setActiveCard("daniel")}
                tabIndex={0}
                aria-label="Daniel Simon, Product Marketing Lead at RegTech365"
              >
                <SpeakerImage
                  src="/images/invitees/daniel.png"
                  alt="Daniel Simon"
                  fill
                  sizes="(max-width: 480px) 48vw, 275px"
                  draggable={false}
                />

                <ParticleLayer />
                <CardGradient />

                <SpeakerInfo>
                  <p className="role">Host</p>
                  <h2>Daniel Simon</h2>
                  <p>Product Marketing Lead, RegTech365</p>
                </SpeakerInfo>
              </SpeakerCard>

              <SpeakerCard
                $person="simeon"
                $active={activeCard === "simeon"}
                onMouseEnter={() => setActiveCard("simeon")}
                onFocus={() => setActiveCard("simeon")}
                onClick={() => setActiveCard("simeon")}
                tabIndex={0}
                aria-label="Simeon, webinar speaker"
              >
                <SpeakerImage
                  src="/images/invitees/simeon.png"
                  alt="Simeon"
                  fill
                  sizes="(max-width: 480px) 48vw, 275px"
                  draggable={false}
                />

                <ParticleLayer />
                <CardGradient />

                <SpeakerInfo>
                  <p className="role">Guest Speaker</p>
                  <h2>Ayomide Osuntoye</h2>
                  <p>RegTech365</p>
                </SpeakerInfo>
              </SpeakerCard>
            </CardDeck>
          </SpeakersArea>
        </HeroContent>
      </HeroSection>
    </>
  );
}
