"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import styled from "styled-components";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const NAVY = "#07152F";
const MUTED_NAVY = "#315Caa";

const speakers = [
  {
    name: "Daniel Simeon",
    role: "Host",
    image: "/images/invitees/daniel.png",
    position: "center 25%",
    number: "01",
  },
  {
    name: "Ayomide Osuntoye",
    role: "Speakr",
    image: "/images/invitees/simeon.png",
    position: "center 25%",
    number: "02",
  },
];

export default function Speakers() {
  return (
    <Section id="speakers" className={montserrat.className}>
      <Container>
        <TopBar>
          <SectionLabel>
            <LabelLine />
            OUR SPEAKERS
          </SectionLabel>

          <Edition>OPEX SUMMIT 2026</Edition>
        </TopBar>

        <Intro>
          <Heading>
            Ideas move
            <br />
            <Muted>business forward.</Muted>
          </Heading>

          <IntroText>
            Meet the voices bringing fresh perspectives, practical experience,
            and forward-thinking conversations to the OPEX Executive Workshop &
            Summit.
          </IntroText>
        </Intro>

        <SpeakersGrid>
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.number}>
              <ImageFrame>
                <SpeakerImage
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectPosition: speaker.position }}
                />

                <ImageOverlay />

                <ImageContent>
                  <SpeakerMeta>
                    <SpeakerIndex>{speaker.number}</SpeakerIndex>
                    <SpeakerRole>{speaker.role}</SpeakerRole>
                  </SpeakerMeta>

                  <SpeakerBottom>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerRule />
                  </SpeakerBottom>
                </ImageContent>
              </ImageFrame>
            </SpeakerCard>
          ))}
        </SpeakersGrid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 110px 28px 100px;
  background: #f5f5f2;
  color: ${NAVY};
  font-family: inherit;
  overflow: hidden;

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  @media (max-width: 768px) {
    padding: 76px 20px 70px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 22px;
  border-bottom: 1px solid #d9dfe7;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  color: ${NAVY};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.17em;
`;

const LabelLine = styled.span`
  display: inline-block;
  width: 25px;
  height: 2px;
  background: ${MUTED_NAVY};
`;

const Edition = styled.span`
  color: ${MUTED_NAVY};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;

  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 0.07em;
  }
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.65fr;
  align-items: end;
  gap: 50px;
  padding: 58px 0 46px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 42px 0 32px;
  }
`;

const Heading = styled.h2`
  margin: 0;
  color: ${NAVY};
  font-size: clamp(43px, 6.7vw, 88px);
  font-weight: 600;
  line-height: 0.99;
  letter-spacing: -0.075em;

  @media (max-width: 480px) {
    font-size: clamp(42px, 12vw, 62px);
  }
`;

const Muted = styled.span`
  color: ${MUTED_NAVY};
`;

const IntroText = styled.p`
  max-width: 390px;
  margin: 0 0 6px auto;
  color: #465875;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.95;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 12px;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const SpeakerCard = styled.article`
  min-width: 0;
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.94 / 1;
  overflow: hidden;
  isolation: isolate;
  border-radius: 18px;
  background: #deded9;
  cursor: pointer;

  &:hover img {
    filter: grayscale(0%);
    transform: scale(1.055);
  }

  @media (max-width: 640px) {
    aspect-ratio: 0.95 / 1;
    border-radius: 15px;
  }
`;

const SpeakerImage = styled(Image)`
  object-fit: cover;
  filter: grayscale(100%);
  transform: scale(1);
  transition: filter 650ms ease,
    transform 900ms cubic-bezier(0.2, 0.65, 0.25, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  z-index: 1;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(7, 21, 47, 0.02) 0%,
    rgba(7, 21, 47, 0) 38%,
    rgba(7, 21, 47, 0.25) 58%,
    rgba(7, 21, 47, 0.88) 100%
  );
`;

const ImageContent = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 26px;
  color: #fff;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SpeakerMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SpeakerIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

const SpeakerRole = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const SpeakerBottom = styled.div`
  width: 100%;
`;

const SpeakerName = styled.h3`
  margin: 0;
  color: #fff;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 600;
  letter-spacing: -0.065em;
  line-height: 1;
  text-transform: capitalize;

  @media (max-width: 640px) {
    font-size: 46px;
  }
`;

const SpeakerRule = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 19px;
  background: rgba(255, 255, 255, 0.55);
`;
