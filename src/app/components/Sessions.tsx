"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const glow = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(-18px, 15px, 0) scale(1.06);
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-130%) rotate(18deg);
  }

  100% {
    transform: translateX(160%) rotate(18deg);
  }
`;

export default function Sessions() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="sessions" $visible={visible}>
      <Container>
        <Header>
          <HeaderLeft>
            <Eyebrow>THE PROGRAMME</Eyebrow>

            <Heading>
              <HeadingLight>Two sessions.</HeadingLight>

              <br />

              <HeadingBrand>One conversation.</HeadingBrand>
            </Heading>
          </HeaderLeft>

          <HeaderRight>
            <Number>02</Number>

            <HeaderText>
              Two focused executive conversations exploring how reporting and
              compliance change when manual processes become connected and
              intelligent.
            </HeaderText>
          </HeaderRight>
        </Header>

        <Bento>
          {/* FINANCE */}
          <SessionCard $theme="primary" $delay="0.1s" $visible={visible}>
            <CardGlow />

            <CardTop>
              <CardNumber>01</CardNumber>

              <CardLabel>MORNING</CardLabel>

              <CardTime>08:30 — 11:00</CardTime>
            </CardTop>

            <CardContent>
              <SmallHeading>FINANCE</SmallHeading>

              <CardTitle>
                Finance
                <br />
                Executive
                <br />
                Workshop
              </CardTitle>

              <CardDescription>
                A closed-door working session for finance leaders examining
                manual reporting, disconnected systems and the practical role of
                AI.
              </CardDescription>
            </CardContent>

            <CardBottom>
              <Audience>
                <MetaLabel>WHO IT IS FOR</MetaLabel>

                <MetaText>Group CFOs, CFOs & senior finance leaders</MetaText>
              </Audience>
            </CardBottom>
          </SessionCard>

          {/* C-LEVEL */}
          <SessionCard $theme="navy" $delay="0.25s" $visible={visible}>
            <CardGlow />

            <CardTop>
              <CardNumber>02</CardNumber>

              <CardLabel>AFTERNOON</CardLabel>

              <CardTime>12:00 — 16:00</CardTime>
            </CardTop>

            <CardContent>
              <SmallHeading>EXECUTIVE</SmallHeading>

              <CardTitle>
                C-Level
                <br />
                Summit
              </CardTitle>

              <CardDescription>
                A broader executive conversation on connected systems,
                governance, risk and the future of financial reporting and
                compliance.
              </CardDescription>
            </CardContent>

            <CardBottom>
              <Audience>
                <MetaLabel>WHO IT IS FOR</MetaLabel>

                <MetaText>
                  CIOs · CTOs · Chief Compliance Officers · Chief Risk Officers
                  · Chief Information Security Officers · Chief Audit Executives
                  · Senior Technology, Risk & Compliance Leaders
                </MetaText>
              </Audience>
            </CardBottom>
          </SessionCard>

          {/* BREAKFAST */}
          <InfoCard $type="breakfast" $delay="0.4s" $visible={visible}>
            <InfoTop>
              <InfoNumber>03</InfoNumber>

              <InfoIcon aria-hidden="true">☼</InfoIcon>
            </InfoTop>

            <InfoContent>
              <InfoLabel>NETWORKING</InfoLabel>

              <InfoTitle>Refreshments & Networking</InfoTitle>

              <InfoTime>11:30 — 12:00</InfoTime>
            </InfoContent>
          </InfoCard>

          {/* LUNCH */}
          <InfoCard $type="lunch" $delay="0.55s" $visible={visible}>
            <InfoTop>
              <InfoNumber>04</InfoNumber>

              <InfoIcon aria-hidden="true">◌</InfoIcon>
            </InfoTop>

            <InfoContent>
              <InfoLabel>MIDDAY</InfoLabel>

              <InfoTitle>Lunch</InfoTitle>

              <InfoTime>14:00 — 14:30</InfoTime>
            </InfoContent>
          </InfoCard>

          {/* BOTH */}
          <InfoCard $type="both" $delay="0.7s" $visible={visible}>
            <InfoTop>
              <InfoNumber>05</InfoNumber>
            </InfoTop>

            <BothContent>
              <InfoLabel>ONE DAY · TWO ROOMS</InfoLabel>

              <BothTitle>
                Join
                <br />
                both.
              </BothTitle>

              <BothText>
                Morning workshop delegates may register for both sessions.
              </BothText>
            </BothContent>
          </InfoCard>

          {/* QUOTE */}
          <QuoteCard $delay="0.85s" $visible={visible}>
            <QuoteMark aria-hidden="true">“</QuoteMark>

            <QuoteText>
              What changes when reporting becomes connected, intelligent and
              continuous?
            </QuoteText>

            <QuoteBottom>
              <QuoteLine />

              <QuoteLabel>THE QUESTION</QuoteLabel>
            </QuoteBottom>
          </QuoteCard>
        </Bento>

        <BottomNote>
          <BottomLine />

          <BottomContent>
            <BottomNumber>01 / 02</BottomNumber>

            <BottomText>
              Morning workshop places are by invitation. Afternoon nominations
              are subject to seat availability.
            </BottomText>
          </BottomContent>
        </BottomNote>
      </Container>
    </Section>
  );
}

/* =========================
   SECTION
========================= */

const Section = styled.section<{ $visible: boolean }>`
  width: 100%;
  padding: 110px 7vw 120px;
  background: #ffffff;
  overflow: hidden;

  @media (max-width: 1100px) {
    padding: 95px 5vw 105px;
  }

  @media (max-width: 768px) {
    padding: 80px 24px 90px;
  }

  @media (max-width: 480px) {
    padding: 70px 18px 80px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

/* =========================
   HEADER
========================= */

const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
  gap: 70px;
  align-items: end;
  margin-bottom: 60px;

  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
    gap: 45px;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 45px;
  }
`;

const HeaderLeft = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 20px;

  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;

  letter-spacing: 0.18em;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 10px;
    margin-bottom: 17px;
  }
`;

const Heading = styled.h2`
  margin: 0;

  color: #083672;

  font-size: clamp(54px, 6vw, 88px);
  line-height: 0.9;

  letter-spacing: -0.075em;

  @media (max-width: 1050px) {
    font-size: clamp(52px, 7vw, 76px);
  }

  @media (max-width: 850px) {
    font-size: clamp(50px, 9vw, 72px);
  }

  @media (max-width: 600px) {
    font-size: clamp(46px, 13vw, 68px);
    line-height: 0.92;
  }
`;

const HeadingLight = styled.span`
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const HeadingBrand = styled.span`
  font-family: "Chillen", sans-serif;
  font-weight: 400;
  color: #0067d4;
`;

const HeaderRight = styled.div`
  max-width: 390px;
  margin-left: auto;

  @media (max-width: 850px) {
    margin-left: 0;
    max-width: 620px;
  }
`;

const Number = styled.span`
  display: block;
  margin-bottom: 16px;

  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;

  letter-spacing: 0.12em;
`;

const HeaderText = styled.p`
  margin: 0;

  color: #555555;

  font-family: "Mont", sans-serif;
  font-size: 15px;
  font-weight: 200;

  line-height: 1.7;
  letter-spacing: -0.015em;

  @media (max-width: 850px) {
    max-width: 620px;
    font-size: 15px;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 1.65;
  }
`;

/* =========================
   BENTO
========================= */

const Bento = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(0, 0.8fr)
    minmax(190px, 0.65fr);

  grid-template-rows:
    270px
    180px
    180px;

  gap: 12px;

  grid-template-areas:
    "morning afternoon breakfast"
    "morning afternoon lunch"
    "morning both quote";

  @media (max-width: 1100px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    grid-template-rows:
      360px
      190px
      190px
      190px;

    grid-template-areas:
      "morning afternoon"
      "morning breakfast"
      "morning lunch"
      "both quote";

    gap: 12px;
  }

  @media (max-width: 850px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    grid-template-rows:
      330px
      180px
      180px
      180px;

    grid-template-areas:
      "morning morning"
      "afternoon afternoon"
      "breakfast lunch"
      "both quote";
  }

  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

/* =========================
   MAIN SESSION CARDS
========================= */

const SessionCard = styled.article<{
  $theme: "primary" | "navy";
  $delay: string;
  $visible: boolean;
}>`
  position: relative;

  grid-area: ${({ $theme }) =>
    $theme === "primary" ? "morning" : "afternoon"};

  min-width: 0;
  min-height: 0;

  padding: 28px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  border-radius: 28px;

  color: #ffffff;

  background: ${({ $theme }) =>
    $theme === "primary"
      ? `
        radial-gradient(
          circle at 90% 8%,
          rgba(198, 227, 251, 0.25),
          transparent 28%
        ),
        linear-gradient(
          145deg,
          #0067d4 0%,
          #0759b8 50%,
          #083672 100%
        )
      `
      : `
        radial-gradient(
          circle at 90% 8%,
          rgba(198, 227, 251, 0.16),
          transparent 28%
        ),
        linear-gradient(
          145deg,
          #083672 0%,
          #0a427e 55%,
          #0067d4 100%
        )
      `};

  box-shadow: 0 18px 45px rgba(8, 54, 114, 0.12);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  animation: ${({ $visible }) => ($visible ? reveal : "none")} 1.2s
    cubic-bezier(0.22, 1, 0.36, 1) forwards;

  animation-delay: ${({ $delay }) => $delay};

  transform-style: preserve-3d;

  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.6s ease;

  &::after {
    content: "";

    position: absolute;
    top: -30%;
    left: -80%;

    width: 45%;
    height: 170%;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.13),
      transparent
    );

    transform: rotate(18deg);

    pointer-events: none;
  }

  &:hover::after {
    animation: ${shimmer} 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: translateY(-5px) scale(1.004);

    box-shadow: 0 28px 70px rgba(8, 54, 114, 0.2);
  }

  @media (max-width: 1100px) {
    padding: 26px;
  }

  @media (max-width: 850px) {
    min-height: 330px;
  }

  @media (max-width: 650px) {
    min-height: 430px;
    padding: 23px;
    border-radius: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transition: none;

    &:hover {
      transform: none;
    }

    &:hover::after {
      animation: none;
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;

  width: 320px;
  height: 320px;

  right: -160px;
  bottom: -160px;

  border-radius: 50%;

  background: rgba(198, 227, 251, 0.12);

  filter: blur(8px);

  pointer-events: none;

  animation: ${glow} 7s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CardTop = styled.div`
  position: relative;
  z-index: 3;

  display: grid;

  grid-template-columns:
    auto
    1fr
    auto;

  align-items: center;

  gap: 16px;

  padding-bottom: 17px;

  border-bottom: 1px solid rgba(198, 227, 251, 0.22);

  @media (max-width: 500px) {
    gap: 10px;
  }
`;

const CardNumber = styled.span`
  font-family: "Chillen", sans-serif;

  font-size: 10px;
  font-weight: 400;

  letter-spacing: 0.12em;

  opacity: 0.78;
`;

const CardLabel = styled.span`
  font-family: "Chillen", sans-serif;

  font-size: 9px;
  font-weight: 400;

  letter-spacing: 0.16em;
`;

const CardTime = styled.span`
  font-family: "Mont", sans-serif;

  font-size: 13px;
  font-weight: 200;

  letter-spacing: -0.02em;

  opacity: 0.95;

  white-space: nowrap;

  @media (max-width: 850px) {
    font-size: 12px;
  }

  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 3;

  margin-top: auto;
  margin-bottom: auto;

  padding: 25px 0;

  @media (max-width: 850px) {
    padding: 20px 0;
  }
`;

const SmallHeading = styled.span`
  display: block;

  margin-bottom: 11px;

  font-family: "Chillen", sans-serif;

  font-size: 9px;
  font-weight: 400;

  letter-spacing: 0.17em;

  opacity: 0.75;
`;

const CardTitle = styled.h3`
  margin: 0 0 20px;

  font-family: "Chillen", sans-serif;

  font-size: clamp(42px, 4.5vw, 68px);

  font-weight: 400;

  line-height: 0.88;

  letter-spacing: -0.075em;

  @media (max-width: 1100px) {
    font-size: clamp(42px, 5.5vw, 62px);
  }

  @media (max-width: 850px) {
    font-size: clamp(42px, 7vw, 60px);
  }

  @media (max-width: 700px) {
    font-size: 48px;
  }
`;

const CardDescription = styled.p`
  max-width: 500px;

  margin: 0;

  font-family: "Mont", sans-serif;

  font-size: 13px;
  font-weight: 200;

  line-height: 1.65;

  letter-spacing: -0.01em;

  opacity: 0.9;

  @media (max-width: 850px) {
    font-size: 12.5px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const CardBottom = styled.div`
  position: relative;
  z-index: 3;

  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  padding-top: 17px;

  border-top: 1px solid rgba(198, 227, 251, 0.22);
`;

const Audience = styled.div`
  max-width: 500px;
`;

const MetaLabel = styled.span`
  display: block;

  margin-bottom: 6px;

  font-family: "Chillen", sans-serif;

  font-size: 8px;
  font-weight: 400;

  letter-spacing: 0.16em;

  opacity: 0.78;
`;

const MetaText = styled.span`
  display: block;

  font-family: "Mont", sans-serif;

  font-size: 11px;
  font-weight: 200;

  line-height: 1.5;

  opacity: 0.95;

  @media (max-width: 850px) {
    font-size: 10.5px;
  }

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

/* =========================
   SMALL CARDS
========================= */

const InfoCard = styled.article<{
  $type: "breakfast" | "lunch" | "both";
  $delay: string;
  $visible: boolean;
}>`
  position: relative;

  grid-area: ${({ $type }) => $type};

  min-width: 0;

  padding: 22px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  border-radius: 24px;

  color: #083672;

  background: ${({ $type }) => {
    if ($type === "breakfast") {
      return `
        linear-gradient(
          145deg,
          #c6e3fb,
          #e1f0fb
        )
      `;
    }

    if ($type === "lunch") {
      return `
        linear-gradient(
          145deg,
          #f7faff,
          #e7f1fa
        )
      `;
    }

    return `
      linear-gradient(
        145deg,
        #ffffff,
        #f0f7fd
      )
    `;
  }};

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 10px 30px rgba(8, 54, 114, 0.06);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  animation: ${({ $visible }) => ($visible ? reveal : "none")} 1.2s
    cubic-bezier(0.22, 1, 0.36, 1) forwards;

  animation-delay: ${({ $delay }) => $delay};

  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s ease;

  &::before {
    content: "";

    position: absolute;

    width: 180px;
    height: 180px;

    right: -90px;
    top: -90px;

    border-radius: 50%;

    background: rgba(0, 103, 212, 0.1);

    filter: blur(5px);

    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: translateY(-5px);

    box-shadow: 0 20px 50px rgba(8, 54, 114, 0.1);
  }

  &:hover::before {
    transform: scale(1.3);
  }

  @media (max-width: 850px) {
    padding: 20px;
  }

  @media (max-width: 650px) {
    min-height: 190px;
    border-radius: 22px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transition: none;

    &:hover {
      transform: none;
    }

    &:hover::before {
      transform: none;
    }
  }
`;

const InfoTop = styled.div`
  position: relative;
  z-index: 2;

  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const InfoNumber = styled.span`
  color: #0067d4;

  font-family: "Chillen", sans-serif;

  font-size: 9px;
  font-weight: 400;

  letter-spacing: 0.12em;
`;

const InfoIcon = styled.span`
  width: 34px;
  height: 34px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.7);

  color: #0067d4;

  font-size: 18px;
`;

const InfoContent = styled.div`
  position: relative;
  z-index: 2;
`;

const InfoLabel = styled.span`
  display: block;

  margin-bottom: 7px;

  color: #0067d4;

  font-family: "Chillen", sans-serif;

  font-size: 8px;
  font-weight: 400;

  letter-spacing: 0.15em;
`;

const InfoTitle = styled.h4`
  margin: 0 0 6px;

  color: #083672;

  font-family: "Chillen", sans-serif;

  font-size: clamp(30px, 2.7vw, 40px);

  font-weight: 400;

  line-height: 0.9;

  letter-spacing: -0.065em;

  @media (max-width: 850px) {
    font-size: clamp(28px, 4vw, 36px);
  }

  @media (max-width: 650px) {
    font-size: 34px;
  }
`;

const InfoTime = styled.span`
  color: #555555;

  font-family: "Mont", sans-serif;

  font-size: 12px;
  font-weight: 200;

  letter-spacing: -0.01em;
`;

const BothContent = styled.div`
  position: relative;
  z-index: 2;
`;

const BothTitle = styled.h4`
  margin: 7px 0 10px;

  color: #083672;

  font-family: "Chillen", sans-serif;

  font-size: clamp(38px, 3.5vw, 52px);

  font-weight: 400;

  line-height: 0.84;

  letter-spacing: -0.07em;

  @media (max-width: 850px) {
    font-size: 42px;
  }
`;

const BothText = styled.p`
  max-width: 240px;

  margin: 0;

  color: #555555;

  font-family: "Mont", sans-serif;

  font-size: 11px;
  font-weight: 200;

  line-height: 1.5;

  @media (max-width: 850px) {
    font-size: 10.5px;
  }
`;

/* =========================
   QUOTE
========================= */

const QuoteCard = styled.article<{
  $delay: string;
  $visible: boolean;
}>`
  grid-area: quote;

  position: relative;

  min-width: 0;

  padding: 22px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  border-radius: 24px;

  background: #083672;

  color: #ffffff;

  box-shadow: 0 15px 40px rgba(8, 54, 114, 0.12);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  animation: ${({ $visible }) => ($visible ? reveal : "none")} 1.2s
    cubic-bezier(0.22, 1, 0.36, 1) forwards;

  animation-delay: ${({ $delay }) => $delay};

  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s ease;

  &:hover {
    transform: translateY(-5px);

    box-shadow: 0 22px 55px rgba(8, 54, 114, 0.2);
  }

  @media (max-width: 850px) {
    padding: 20px;
  }

  @media (max-width: 650px) {
    min-height: 190px;
    border-radius: 22px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const QuoteMark = styled.span`
  color: #0067d4;

  font-family: "Chillen", sans-serif;

  font-size: 46px;
  font-weight: 400;

  line-height: 0.5;
`;

const QuoteText = styled.p`
  max-width: 430px;

  margin: 0;

  color: #ffffff;

  font-family: "Chillen", sans-serif;

  font-size: 21px;
  font-weight: 400;

  line-height: 1.18;

  letter-spacing: -0.04em;

  @media (max-width: 850px) {
    font-size: 19px;
  }

  @media (max-width: 650px) {
    font-size: 20px;
  }
`;

const QuoteBottom = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`;

const QuoteLine = styled.span`
  width: 20px;
  height: 1px;

  background: #0067d4;
`;

const QuoteLabel = styled.span`
  color: #c6e3fb;

  font-family: "Chillen", sans-serif;

  font-size: 8px;
  font-weight: 400;

  letter-spacing: 0.15em;
`;

/* =========================
   BOTTOM NOTE
========================= */

const BottomNote = styled.div`
  margin-top: 55px;

  @media (max-width: 768px) {
    margin-top: 45px;
  }
`;

const BottomLine = styled.div`
  width: 100%;
  height: 1px;

  background: #c6e3fb;
`;

const BottomContent = styled.div`
  display: grid;

  grid-template-columns: 90px 1fr;

  align-items: center;

  gap: 25px;

  padding-top: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const BottomNumber = styled.span`
  color: #0067d4;

  font-family: "Chillen", sans-serif;

  font-size: 9px;
  font-weight: 400;

  letter-spacing: 0.12em;
`;

const BottomText = styled.p`
  margin: 0;

  color: #555555;

  font-family: "Mont", sans-serif;

  font-size: 11px;
  font-weight: 200;

  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 10.5px;
  }
`;
