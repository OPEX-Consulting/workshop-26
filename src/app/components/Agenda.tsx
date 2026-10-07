"use client";
import styled from "styled-components";
type AgendaProps = {
  onReserve: () => void;
};

const agenda = [
  {
    time: "08:30",
    end: "11:00",
    type: "MORNING · BY INVITATION",
    title: "Finance Executive Workshop",
    description:
      "A closed-door conversation for Group CFOs, CFOs and senior finance leaders on the risks of manual reporting, disconnected data and the practical role of AI in finance.",
    audience: "Group CFOs · CFOs · Senior Finance Leaders",
  },
  {
    time: "11:30",
    end: "12:00",
    type: "NETWORKING",
    title: "Refreshments & Networking",
    description:
      "An informal opportunity for delegates to connect, exchange perspectives and continue the morning conversation.",
    audience: "Morning Workshop Delegates",
  },
  {
    time: "12:00",
    end: "16:00",
    type: "AFTERNOON · EXECUTIVE",
    title: "C-Level Summit",
    description:
      "A broader executive conversation exploring connected systems, governance, risk, compliance and what AI means for the future of financial reporting.",
    audience:
      "CIOs · CTOs · Chief Compliance Officers · Chief Risk Officers · Chief Information Security Officers · Chief Audit Executives · Senior Technology, Risk & Compliance Leaders",
  },
  {
    time: "14:00",
    end: "14:30",
    type: "MIDDAY",
    title: "Executive Lunch",
    description:
      "Lunch and continued conversations between senior leaders across finance, technology, risk and compliance.",
    audience: "All Delegates",
  },
];

export default function Agenda({ onReserve }: AgendaProps) {
  return (
    <Section id="agenda">
      <Container>
        <Header>
          <HeaderLeft>
            <Eyebrow>THE AGENDA</Eyebrow>

            <Heading>
              <HeadingLight>One day.</HeadingLight>
              <br />
              <HeadingBrand>
                <Accent>Two conversations.</Accent>
              </HeadingBrand>
            </Heading>
          </HeaderLeft>

          <HeaderRight>
            <Intro>
              A focused programme designed around the decisions financial,
              technology, risk and compliance leaders are making now.
            </Intro>

            <Date>
              <DateLabel>WEDNESDAY</DateLabel>
              <DateValue>21 OCTOBER 2026</DateValue>
            </Date>
          </HeaderRight>
        </Header>

        <Timeline>
          {agenda.map((item, index) => (
            <AgendaItem key={`${item.time}-${item.title}`}>
              <TimeColumn>
                <Time>{item.time}</Time>
                <EndTime>{item.end}</EndTime>
              </TimeColumn>

              <DotColumn>
                <Dot />
                {index !== agenda.length - 1 && <Line />}
              </DotColumn>

              <Content>
                <TopRow>
                  <Type>{item.type}</Type>
                  <Index>{String(index + 1).padStart(2, "0")}</Index>
                </TopRow>

                <Title>{item.title}</Title>

                <Description>{item.description}</Description>

                <Audience>
                  <AudienceLabel>FOR</AudienceLabel>
                  <AudienceText>{item.audience}</AudienceText>
                </Audience>
              </Content>

              <HoverGlow />
            </AgendaItem>
          ))}
        </Timeline>

        <Bottom>
          <BottomLeft>
            <BottomNumber>01 / 02</BottomNumber>

            <BottomText>
              Morning workshop delegates may register
              <br />
              for both sessions.
            </BottomText>
          </BottomLeft>

          <BottomCTA type="button" onClick={onReserve}>
            Reserve your seat
          </BottomCTA>
        </Bottom>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  background: #f7faff;
  padding: 125px 0 130px;

  @media (max-width: 700px) {
    padding: 90px 0 100px;
  }
`;

const Container = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 100px;
  align-items: end;
  margin-bottom: 100px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 70px;
  }
`;

const HeaderLeft = styled.div``;

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 22px;
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-size: clamp(52px, 6vw, 82px);
  line-height: 0.9;
  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    font-size: clamp(46px, 13vw, 68px);
  }
`;

const HeadingLight = styled.span`
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const HeadingBrand = styled.span`
  font-family: "Chillen", sans-serif;
  font-weight: 400;
`;

const Accent = styled.span`
  color: #0067d4;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding-bottom: 5px;
`;

const Intro = styled.p`
  max-width: 430px;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 13px;
  font-weight: 200;
  line-height: 1.7;
  letter-spacing: -0.015em;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const DateLabel = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.16em;
`;

const DateValue = styled.span`
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.08em;
`;

const Timeline = styled.div`
  position: relative;
`;

const AgendaItem = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 100px 30px 1fr;
  min-height: 220px;

  transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 700px) {
    grid-template-columns: 65px 20px 1fr;
    min-height: 250px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const HoverGlow = styled.div`
  position: absolute;
  z-index: 0;
  top: -15px;
  right: -25px;
  bottom: 15px;
  left: 75px;
  border-radius: 22px;

  background: radial-gradient(
    circle at 20% 50%,
    rgba(0, 103, 212, 0.09),
    transparent 45%
  );

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.5s ease;

  ${AgendaItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 700px) {
    left: 40px;
    right: -10px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const TimeColumn = styled.div`
  position: relative;
  z-index: 2;
  padding-top: 3px;
  padding-right: 25px;
  text-align: right;

  @media (max-width: 700px) {
    padding-right: 15px;
  }
`;

const Time = styled.span`
  display: block;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.04em;

  transition: font-size 0.45s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;

  ${AgendaItem}:hover & {
    color: #0067d4;
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 14px;

    ${AgendaItem}:hover & {
      font-size: 15px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease;
  }
`;

const EndTime = styled.span`
  display: block;
  margin-top: 3px;
  color: #666666;
  font-family: "Mont", sans-serif;
  font-size: 9px;
  font-weight: 200;

  transition: color 0.4s ease;

  ${AgendaItem}:hover & {
    color: #555555;
  }
`;

const DotColumn = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

const Dot = styled.span`
  position: relative;
  z-index: 2;
  width: 9px;
  height: 9px;
  margin-top: 7px;
  border-radius: 50%;
  background: #0067d4;

  box-shadow: 0 0 0 5px rgba(0, 103, 212, 0.08),
    0 3px 10px rgba(0, 103, 212, 0.16);

  transition: transform 0.4s ease, box-shadow 0.4s ease;

  ${AgendaItem}:hover & {
    transform: scale(1.35);

    box-shadow: 0 0 0 6px rgba(0, 103, 212, 0.12),
      0 4px 15px rgba(0, 103, 212, 0.22);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Line = styled.div`
  position: absolute;
  top: 20px;
  bottom: 0;
  width: 1px;
  background: #c6e3fb;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 0 70px 35px;
  border-bottom: 1px solid #c6e3fb;

  @media (max-width: 700px) {
    padding: 0 0 55px 20px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const Type = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.16em;

  transition: letter-spacing 0.4s ease, color 0.4s ease;

  ${AgendaItem}:hover & {
    letter-spacing: 0.2em;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease;
  }
`;

const Index = styled.span`
  color: #666666;
  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.08em;

  transition: color 0.4s ease, transform 0.4s ease;

  ${AgendaItem}:hover & {
    color: #0067d4;
    transform: translateX(-5px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease;
  }
`;

const Title = styled.h3`
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.055em;

  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 0.5s ease, color 0.35s ease;

  ${AgendaItem}:hover & {
    color: #0067d4;
    transform: translateX(5px);
    letter-spacing: -0.065em;
  }

  @media (max-width: 700px) {
    font-size: 27px;
    line-height: 1.02;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease;
  }
`;

const Description = styled.p`
  max-width: 650px;
  margin-top: 18px;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 12px;
  font-weight: 200;
  line-height: 1.7;
  letter-spacing: -0.01em;

  transition: color 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  ${AgendaItem}:hover & {
    color: #333333;
    transform: translateX(5px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease;
  }
`;

const Audience = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 27px;

  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  ${AgendaItem}:hover & {
    transform: translateX(5px);
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const AudienceLabel = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 0.16em;
`;

const AudienceText = styled.span`
  color: #083672;
  font-family: "Mont", sans-serif;
  font-size: 9px;
  font-weight: 200;
  letter-spacing: 0.01em;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 55px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 30px;
  }
`;

const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const BottomNumber = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.12em;
`;

const BottomText = styled.p`
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 10px;
  font-weight: 200;
  line-height: 1.5;
`;

const BottomCTA = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 48px;
  padding: 0 24px;

  border: 0;
  border-radius: 999px;

  background: #083672;
  color: #ffffff;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;

  cursor: pointer;

  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background: #0067d4;
    box-shadow: 0 12px 30px rgba(0, 103, 212, 0.2);
  }

  &:focus-visible {
    outline: 3px solid #0067d4;
    outline-offset: 4px;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;
