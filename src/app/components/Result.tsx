"use client";

import styled from "styled-components";

const outcomes = [
  {
    number: "01",
    title: "See the risk.",
    text: "Understand where manual reporting creates regulatory, audit and operational exposure.",
    type: "featured",
  },
  {
    number: "02",
    title: "Connect the data.",
    text: "Connect finance, risk and compliance information for a clearer view.",
    type: "connect",
  },
  {
    number: "03",
    title: "Understand AI.",
    text: "Discover how AI can support reporting and compliance today.",
    type: "ai",
  },
  {
    number: "04",
    title: "Think continuously.",
    text: "Explore a future of connected, intelligent and continuous reporting.",
    type: "wide",
  },
];

export default function Result() {
  return (
    <Section id="results">
      <Container>
        <Header>
          <Heading>
            What changes
            <br />
            when <Accent>manual ends.</Accent>
          </Heading>

          <Description>
            Four practical takeaways for leaders navigating the future of risk,
            reporting and compliance.
          </Description>
        </Header>

        <BentoGrid>
          {outcomes.map((outcome) => (
            <Card key={outcome.number} $type={outcome.type}>
              <CardTop>
                <Number $featured={outcome.type === "featured"}>
                  {outcome.number}
                </Number>

                <CardIndicator $featured={outcome.type === "featured"}>
                  <span />
                </CardIndicator>
              </CardTop>

              <CardContent>
                <CardTitle $featured={outcome.type === "featured"}>
                  {outcome.title}
                </CardTitle>

                <CardText $featured={outcome.type === "featured"}>
                  {outcome.text}
                </CardText>
              </CardContent>

              {outcome.type === "featured" && (
                <FeatureAccent aria-hidden="true">
                  <AccentOrb />
                </FeatureAccent>
              )}

              {outcome.type === "wide" && (
                <WideAccent aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </WideAccent>
              )}
            </Card>
          ))}
        </BentoGrid>

        <BottomStatement>
          <Statement>
            From manual processes to{" "}
            <StatementAccent>intelligent reporting.</StatementAccent>
          </Statement>

          <StatementLine />
        </BottomStatement>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 76px 0 80px;
  overflow: hidden;
  background: #ffffff;
  color: #083672;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 700px) {
    padding: 54px 0 58px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const Container = styled.div`
  width: min(1080px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 36px;
  margin-bottom: 30px;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 25px;
  }
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(38px, 5.4vw, 64px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.065em;

  @media (max-width: 600px) {
    font-size: clamp(34px, 9vw, 48px);
    letter-spacing: -0.055em;
  }
`;

const Accent = styled.span`
  color: #0879d9;
`;

const Description = styled.p`
  max-width: 320px;
  margin: 0 0 4px;
  color: #68788d;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.8;

  @media (max-width: 760px) {
    max-width: 430px;
    font-size: 12px;
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    "featured featured connect"
    "ai wide wide";
  grid-auto-rows: minmax(190px, auto);
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "featured featured"
      "connect ai"
      "wide wide";
    grid-auto-rows: minmax(170px, auto);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "featured"
      "connect"
      "ai"
      "wide";
    grid-auto-rows: auto;
  }
`;

const Card = styled.article<{ $type: string }>`
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 190px;
  flex-direction: column;
  justify-content: space-between;
  padding: 23px;
  overflow: hidden;
  border: 1px solid #e8edf3;
  border-radius: 17px;
  background: #f8fafc;
  transition: transform 250ms ease, border-color 250ms ease,
    background 250ms ease;

  ${({ $type }) => {
    switch ($type) {
      case "featured":
        return `
          grid-area: featured;
          min-height: 235px;
          padding: 27px;
          background: #083672;
          border-color: #083672;
        `;
      case "connect":
        return `grid-area: connect;`;
      case "ai":
        return `grid-area: ai;`;
      case "wide":
        return `
          grid-area: wide;
          flex-direction: row;
          align-items: flex-end;
          gap: 20px;
          background: #f1f6fc;
        `;
      default:
        return "";
    }
  }}

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $type }) =>
      $type === "featured" ? "#083672" : "#c6d9ed"};
    background: ${({ $type }) =>
      $type === "featured"
        ? "#083672"
        : $type === "wide"
        ? "#edf4fc"
        : "#ffffff"};
  }

  @media (max-width: 760px) {
    min-height: 175px;
    padding: 19px;

    ${({ $type }) =>
      $type === "featured" &&
      `
        min-height: 215px;
        padding: 23px;
      `}
  }

  @media (max-width: 480px) {
    min-height: 160px;

    ${({ $type }) =>
      $type === "featured" &&
      `
        min-height: 205px;
      `}

    ${({ $type }) =>
      $type === "wide" &&
      `
        min-height: 165px;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const CardTop = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Number = styled.span<{ $featured: boolean }>`
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $featured }) => ($featured ? "rgba(255,255,255,0.22)" : "#e0e7ef")};
  border-radius: 50%;
  color: ${({ $featured }) => ($featured ? "#ffffff" : "#0879d9")};
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 500;
`;

const CardIndicator = styled.span<{ $featured: boolean }>`
  display: flex;
  width: 27px;
  height: 27px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $featured }) => ($featured ? "rgba(255,255,255,0.2)" : "#e0e7ef")};
  border-radius: 50%;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $featured }) => ($featured ? "#8dcfff" : "#0879d9")};
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 390px;
`;

const CardTitle = styled.h3<{ $featured: boolean }>`
  margin: 0;
  color: ${({ $featured }) => ($featured ? "#ffffff" : "#083672")};
  font-family: "Montserrat", sans-serif;
  font-size: ${({ $featured }) =>
    $featured ? "clamp(27px, 3.4vw, 39px)" : "clamp(19px, 2.1vw, 24px)"};
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.055em;
`;

const CardText = styled.p<{ $featured: boolean }>`
  max-width: 350px;
  margin: 9px 0 0;
  color: ${({ $featured }) => ($featured ? "#d5e4f6" : "#68788d")};
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.8;

  ${({ $featured }) =>
    $featured &&
    `
      max-width: 370px;
      font-size: 13px;
    `}
`;

const FeatureAccent = styled.div`
  position: absolute;
  right: 45px;
  top: 60px;
  width: 82px;
  height: 82px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  pointer-events: none;

  &::before {
    position: absolute;
    content: "";
    inset: 11px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    right: 24px;
    top: 63px;
    width: 65px;
    height: 65px;
  }
`;

const AccentOrb = styled.span`
  position: absolute;
  top: 8px;
  right: 7px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #8dcfff;
  box-shadow: 0 0 0 5px rgba(141, 207, 255, 0.12);
`;

const WideAccent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 42px;
  flex-shrink: 0;
  padding-bottom: 2px;

  span {
    display: block;
    width: 5px;
    border-radius: 5px;
    background: #0879d9;
  }

  span:nth-child(1) {
    height: 16px;
    opacity: 0.35;
  }

  span:nth-child(2) {
    height: 27px;
    opacity: 0.65;
  }

  span:nth-child(3) {
    height: 39px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const BottomStatement = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-top: 25px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
`;

const Statement = styled.p`
  max-width: 650px;
  margin: 0;
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(18px, 2.5vw, 27px);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.045em;
`;

const StatementAccent = styled.span`
  color: #0879d9;
`;

const StatementLine = styled.div`
  height: 1px;
  flex: 1;
  background: #e5ebf2;

  @media (max-width: 600px) {
    width: 100%;
    flex: none;
  }
`;
