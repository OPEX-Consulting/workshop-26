"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

type AgendaProps = {
  onReserve: () => void;
};

type AgendaItem = {
  time: string;
  title: string;
  description?: string;
  type?: string;
};

const morningAgenda: AgendaItem[] = [
  {
    time: "09:15 – 09:30",
    title: "Registration, Breakfast & Networking",
    type: "Networking",
  },
  {
    time: "09:30 – 09:40",
    title: "Welcome Address: The End of Manual Finance",
  },
  {
    time: "09:40 – 10:00",
    title:
      "From Digitisation to Trust: Building AI-Enabled Reporting and Compliance",
  },
  {
    time: "10:00 – 10:20",
    title: "Reporting Integrity, Governance & Assurance Readiness",
  },
  {
    time: "10:20 – 10:40",
    title: "ESG & Disclosure Management",
    description:
      "A solution showcase on simplifying sustainability reporting and disclosure management.",
    type: "Solution showcase",
  },
  {
    time: "10:40 – 11:00",
    title: "Sustainability Disclosure & Decision-Grade Data",
  },
  {
    time: "11:00 – 11:20",
    title: "Finnivo Financial Consolidation",
    description:
      "See how connected data and automated workflows can improve financial consolidation.",
    type: "Solution showcase",
  },
  {
    time: "11:20 – 11:50",
    title: "CFO Panel: Is Your Finance Function Ready?",
    type: "Executive panel",
  },
  {
    time: "11:50 – 12:00",
    title: "Closing Remarks & Next Steps",
  },
];

const afternoonAgenda: AgendaItem[] = [
  {
    time: "12:00 – 12:10",
    title: "The New Technology Governance Mandate",
  },
  {
    time: "12:10 – 12:30",
    title: "From Reform to Results: Intelligent, Transparent Enterprises",
  },
  {
    time: "12:30 – 13:00",
    title: "From Data to Intelligence: The Enterprise of Tomorrow",
  },
  {
    time: "13:00 – 13:20",
    title: "From Software Development to Intelligent Systems Assurance",
  },
  {
    time: "13:20 – 13:45",
    title: "Unitellas Edge Cloud Solution",
    description:
      "Explore secure, connected infrastructure for intelligent enterprise operations.",
    type: "Solution showcase",
  },
  {
    time: "13:45 – 14:05",
    title: "From Periodic Compliance to Continuous Compliance",
  },
  {
    time: "14:05 – 14:30",
    title: "Connected IT GRC & Continuous Regulatory Readiness",
    description:
      "A live demonstration of connected governance, risk and compliance processes.",
    type: "Live demonstration",
  },
  {
    time: "14:30 – 14:45",
    title: "Networking & Refreshment Break",
    type: "Networking",
  },
  {
    time: "14:45 – 15:05",
    title: "Technology, Integrity & Investor Protection",
  },
  {
    time: "15:05 – 15:25",
    title: "From Periodic Privacy Compliance to Continuous Data Governance",
  },
  {
    time: "15:35 – 15:55",
    title: "Governing AI & Autonomous Systems",
  },
  {
    time: "15:55 – 16:00",
    title: "Executive Action Points & Closing",
  },
];

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Agenda({ onReserve }: AgendaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="agenda" ref={sectionRef}>
      <Container>
        <Header $visible={isVisible}>
          <HeaderMain>
            <Heading>
              A day of ideas.
              <br />
              <Accent>A clearer way forward.</Accent>
            </Heading>
          </HeaderMain>

          <HeaderSide>
            <EventDate>21 OCTOBER 2026</EventDate>
            <Description>
              One conversation bringing finance, sustainability, technology and
              compliance together.
            </Description>
          </HeaderSide>
        </Header>

        <ProgrammeIntro $visible={isVisible}>
          <IntroTitle>Explore the programme</IntroTitle>
          <IntroNote>OPEX Executive Workshop &amp; Summit 2026</IntroNote>
        </ProgrammeIntro>

        <Programme $visible={isVisible}>
          <ProgrammeHeader>
            <ProgrammeHeading>
              <TimeDot />
              <div>
                <ProgrammeTitle>Finance &amp; Sustainability</ProgrammeTitle>
                <ProgrammeDescription>Morning programme</ProgrammeDescription>
              </div>
            </ProgrammeHeading>

            <ProgrammeTime>09:15 – 12:00</ProgrammeTime>
          </ProgrammeHeader>

          <AgendaGrid>
            {morningAgenda.map((item, index) => (
              <SessionCard
                key={`${item.time}-${item.title}`}
                $delay={index * 45}
              >
                <SessionTop>
                  <SessionTime>{item.time}</SessionTime>
                  {item.type && <SessionTag>{item.type}</SessionTag>}
                </SessionTop>

                <SessionTitle>{item.title}</SessionTitle>

                {item.description && (
                  <SessionDescription>{item.description}</SessionDescription>
                )}
              </SessionCard>
            ))}
          </AgendaGrid>
        </Programme>

        <Programme $visible={isVisible}>
          <ProgrammeHeader>
            <ProgrammeHeading>
              <TimeDot />
              <div>
                <ProgrammeTitle>Technology &amp; Governance</ProgrammeTitle>
                <ProgrammeDescription>Afternoon programme</ProgrammeDescription>
              </div>
            </ProgrammeHeading>

            <ProgrammeTime>12:00 – 16:00</ProgrammeTime>
          </ProgrammeHeader>

          <AgendaGrid>
            {afternoonAgenda.map((item, index) => (
              <SessionCard
                key={`${item.time}-${item.title}`}
                $delay={index * 45}
              >
                <SessionTop>
                  <SessionTime>{item.time}</SessionTime>
                  {item.type && <SessionTag>{item.type}</SessionTag>}
                </SessionTop>

                <SessionTitle>{item.title}</SessionTitle>

                {item.description && (
                  <SessionDescription>{item.description}</SessionDescription>
                )}
              </SessionCard>
            ))}
          </AgendaGrid>
        </Programme>

        <RegistrationCard $visible={isVisible}>
          <RegistrationCopy>
            <RegistrationTitle>The future won’t wait.</RegistrationTitle>
            <RegistrationDescription>
              Join the conversation shaping the next chapter of reporting,
              compliance and enterprise technology.
            </RegistrationDescription>
          </RegistrationCopy>

          <ReserveButton type="button" onClick={onReserve}>
            Reserve your seat
            <ButtonArrow aria-hidden="true">↗</ButtonArrow>
          </ReserveButton>
        </RegistrationCard>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 82px 0 88px;
  overflow: hidden;
  background: #ffffff;
  color: #083672;
  font-family: "Montserrat", sans-serif;

  &,
  & * {
    box-sizing: border-box;
  }

  @media (max-width: 700px) {
    padding: 56px 0 64px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const Header = styled.header<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: 1.25fr 0.65fr;
  align-items: end;
  gap: 48px;
  padding-bottom: 38px;
  border-bottom: 1px solid #e8edf3;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? reveal : "none")} 700ms ease both;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-bottom: 28px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeaderMain = styled.div`
  min-width: 0;
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(38px, 5.5vw, 68px);
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

const HeaderSide = styled.div`
  max-width: 350px;
  justify-self: end;

  @media (max-width: 800px) {
    justify-self: start;
  }
`;

const EventDate = styled.p`
  margin: 0 0 10px;
  color: #0879d9;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
`;

const Description = styled.p`
  margin: 0;
  color: #65758a;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.85;
`;

const ProgrammeIntro = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  margin: 35px 0 23px;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? reveal : "none")} 700ms ease both;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    margin-top: 27px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const IntroTitle = styled.h3`
  margin: 0;
  color: #083672;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.045em;
`;

const IntroNote = styled.p`
  margin: 0;
  color: #8793a2;
  font-size: 11px;
  font-weight: 400;
`;

const Programme = styled.div<{ $visible: boolean }>`
  margin-top: 38px;

  &:first-of-type {
    margin-top: 0;
  }

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? reveal : "none")} 650ms ease both;

  @media (max-width: 700px) {
    margin-top: 30px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const ProgrammeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 17px;

  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

const ProgrammeHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TimeDot = styled.span`
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #0879d9;
  box-shadow: 0 0 0 4px #eaf4ff;
`;

const ProgrammeTitle = styled.h3`
  margin: 0;
  color: #12395f;
  font-size: clamp(17px, 2.1vw, 21px);
  font-weight: 600;
  letter-spacing: -0.045em;
`;

const ProgrammeDescription = styled.p`
  margin: 5px 0 0;
  color: #8995a5;
  font-size: 11px;
  font-weight: 400;
`;

const ProgrammeTime = styled.span`
  padding: 8px 11px;
  border: 1px solid #e7edf4;
  border-radius: 8px;
  background: #ffffff;
  color: #647991;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const AgendaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 9px;
  }
`;

const SessionCard = styled.article<{ $delay: number }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px;
  border: 1px solid #e9eef4;
  border-radius: 13px;
  background: #f8fafc;
  transition: transform 220ms ease, border-color 220ms ease,
    background 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #cbdff3;
    background: #ffffff;
    box-shadow: 0 8px 22px rgba(8, 54, 114, 0.045);
  }

  @media (max-width: 580px) {
    padding: 17px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const SessionTop = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 13px;
`;

const SessionTime = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 5px 8px;
  border-radius: 6px;
  background: #edf5ff;
  color: #2367a8;
  font-size: 10px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const SessionTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 5px 8px;
  border: 1px solid #e5ebf2;
  border-radius: 6px;
  color: #708096;
  font-size: 9px;
  font-weight: 500;
`;

const SessionTitle = styled.h4`
  margin: 0;
  color: #203d5b;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.7;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;

  ${SessionCard}:hover & {
    color: #0879d9;
  }
`;

const SessionDescription = styled.p`
  margin: 9px 0 0;
  color: #718096;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.75;
`;

const RegistrationCard = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 35px;
  padding: 27px 29px;
  border-radius: 16px;
  background: #083672;
  color: #ffffff;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? reveal : "none")} 700ms ease both;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 24px 21px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const RegistrationCopy = styled.div`
  max-width: 570px;
`;

const RegistrationTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(22px, 3vw, 29px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.055em;
`;

const RegistrationDescription = styled.p`
  margin: 9px 0 0;
  color: #d5e4f6;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.8;
`;

const ReserveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 45px;
  flex-shrink: 0;
  padding: 0 17px;
  border: 1px solid #ffffff;
  border-radius: 9px;
  background: #ffffff;
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease, transform 200ms ease;

  &:hover {
    transform: translateY(-2px);
    background: #edf5ff;
  }

  &:focus-visible {
    outline: 3px solid #8dcfff;
    outline-offset: 4px;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 680px) {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

const ButtonArrow = styled.span`
  font-size: 15px;
  line-height: 1;
`;
