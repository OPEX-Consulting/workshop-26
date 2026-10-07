"use client";

import styled from "styled-components";

const outcomes = [
  {
    number: "01",
    title: "See the risk.",
    text: "Understand where manual reporting creates regulatory, audit and operational exposure.",
  },
  {
    number: "02",
    title: "Connect the data.",
    text: "See how leading institutions are connecting finance, risk and compliance information.",
  },
  {
    number: "03",
    title: "Understand AI.",
    text: "Get a practical view of what AI can and cannot do in reporting and compliance today.",
  },
  {
    number: "04",
    title: "Think continuously.",
    text: "Explore how reporting changes when systems become connected, intelligent and continuous.",
  },
];

export default function Result() {
  return (
    <Section id="results">
      <Container>
        <Header>
          <div>
            <Eyebrow>WHAT YOU&apos;LL LEARN</Eyebrow>

            <Heading>
              What changes
              <br />
              when <span>manual ends.</span>
            </Heading>
          </div>

          <Description>
            A practical executive conversation designed to help leaders
            understand the risks, opportunities and decisions that come with
            connected and intelligent reporting.
          </Description>
        </Header>

        <Stack>
          <StackShadow />

          {outcomes.map((outcome) => (
            <Card key={outcome.number}>
              <CardLeft>
                <Number>{outcome.number}</Number>

                <CardContent>
                  <CardTitle>{outcome.title}</CardTitle>
                  <CardText>{outcome.text}</CardText>
                </CardContent>
              </CardLeft>
            </Card>
          ))}
        </Stack>

        <BottomStatement>
          <StatementLabel>THE OUTCOME</StatementLabel>

          <Statement>
            From <span>manual processes</span> to connected,
            <br />
            intelligent reporting.
          </Statement>
        </BottomStatement>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  padding: 120px 0 130px;
  background: #ffffff;
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 85px 0 95px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const Container = styled.div`
  width: min(1120px, 90vw);
  margin: 0 auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  align-items: end;
  gap: 70px;
  margin-bottom: 65px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-bottom: 45px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 16px;
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  max-width: 760px;
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(46px, 6vw, 76px);
  line-height: 0.92;
  letter-spacing: -0.065em;
  font-weight: 400;

  span {
    color: #0067d4;
  }

  @media (max-width: 700px) {
    font-size: clamp(42px, 13vw, 60px);
  }
`;

const Description = styled.p`
  max-width: 420px;
  margin: 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 14px;
  line-height: 1.7;
  letter-spacing: -0.015em;
  font-weight: 200;

  @media (max-width: 700px) {
    max-width: 100%;
    font-size: 13px;
    line-height: 1.65;
  }
`;

const Stack = styled.div`
  position: relative;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 45px;

  @media (max-width: 700px) {
    padding: 0 8px;
  }
`;

const Card = styled.article`
  position: relative;
  z-index: 1;
  min-height: 150px;
  display: flex;
  align-items: center;
  padding: 28px 34px;
  margin-bottom: 12px;
  background: #f7faff;
  border: 1px solid #c6e3fb;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(8, 54, 114, 0.025),
    0 12px 30px rgba(8, 54, 114, 0.018);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.5s ease, border-color 0.5s ease,
    box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: #ffffff;
    border-color: #0067d4;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(8, 54, 114, 0.045),
      0 24px 60px rgba(8, 54, 114, 0.055);
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    min-height: 150px;
    padding: 23px 21px;
    border-radius: 20px;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const CardLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  min-width: 0;

  @media (max-width: 700px) {
    gap: 14px;
  }
`;

const Number = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #083672;
  color: #ffffff;
  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.06);
    background: #0067d4;
  }

  @media (max-width: 700px) {
    width: 32px;
    height: 32px;
    font-size: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Card}:hover & {
      transform: none;
    }
  }
`;

const CardContent = styled.div`
  min-width: 0;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(23px, 3vw, 35px);
  line-height: 1;
  letter-spacing: -0.055em;
  font-weight: 400;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  ${Card}:hover & {
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Card}:hover & {
      transform: none;
    }
  }
`;

const CardText = styled.p`
  max-width: 560px;
  margin: 11px 0 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 14px;
  line-height: 1.65;
  letter-spacing: -0.005em;
  font-weight: 200;

  @media (max-width: 700px) {
    margin-top: 9px;
    font-size: 13px;
    line-height: 1.6;
  }
`;

const StackShadow = styled.div`
  position: absolute;
  left: 70px;
  right: 70px;
  bottom: -10px;
  height: 40px;
  background: rgba(0, 103, 212, 0.06);
  border-radius: 50%;
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;

  @media (max-width: 700px) {
    left: 30px;
    right: 30px;
  }
`;

const BottomStatement = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 50px;
  margin-top: 85px;
  padding-top: 30px;
  border-top: 1px solid #c6e3fb;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 65px;
  }
`;

const StatementLabel = styled.div`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.17em;
  text-transform: uppercase;
`;

const Statement = styled.p`
  max-width: 650px;
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(22px, 3vw, 34px);
  line-height: 1.02;
  letter-spacing: -0.055em;
  font-weight: 400;

  span {
    color: #0067d4;
  }
`;
