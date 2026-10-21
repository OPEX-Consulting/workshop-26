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
    title: "Registration, Breakfast and Executive Networking",
    type: "Networking",
  },
  {
    time: "09:30 – 09:40",
    title: "Welcome Address: The End of Manual Finance",
  },
  {
    time: "09:40 – 10:00",
    title:
      "From Digitisation to Trust: Building AI-Enabled Reporting and Compliance for the Future",
  },
  {
    time: "10:00 – 10:20",
    title:
      "Reporting Integrity, Governance and Assurance Readiness in the New Compliance Environment",
  },
  {
    time: "10:20 – 10:40",
    title: "ESG and Disclosure Management",
    description:
      "A solution showcase exploring how technology can simplify sustainability reporting, disclosure management, and access to reliable ESG data.",
    type: "Solution showcase",
  },
  {
    time: "10:40 – 11:00",
    title:
      "Sustainability Disclosure: From Regulatory Expectations to Decision-Grade Data",
  },
  {
    time: "11:00 – 11:20",
    title: "Finnivo Financial Consolidation",
    description:
      "A solution showcase demonstrating how financial consolidation can be streamlined through connected data, automated workflows, and more reliable reporting.",
    type: "Solution showcase",
  },
  {
    time: "11:20 – 11:50",
    title:
      "CFO Panel: Is Your Finance Function Ready for the Next Reporting Cycle?",
    type: "Executive panel",
  },
  {
    time: "11:50 – 12:00",
    title: "Closing Remarks and Next Steps",
  },
];

const afternoonAgenda: AgendaItem[] = [
  {
    time: "12:00 – 12:10",
    title: "The New Technology Governance Mandate",
  },
  {
    time: "12:10 – 12:30",
    title:
      "From Reform to Results: Why Nigeria’s Next Phase of Growth Depends on Intelligent, Transparent Enterprises",
  },
  {
    time: "12:30 – 13:00",
    title:
      "From Data to Intelligence: The Infrastructure Powering the Enterprise of Tomorrow",
  },
  {
    time: "13:00 – 13:20",
    title: "From Software Development to Intelligent Systems Assurance",
  },
  {
    time: "13:20 – 13:45",
    title: "Unitellas Edge Cloud Solution",
    description:
      "An introduction to edge cloud capabilities and how modern infrastructure can support secure, connected, and intelligent enterprise operations.",
    type: "Solution showcase",
  },
  {
    time: "13:45 – 14:05",
    title: "From Periodic Compliance to Continuous Compliance",
  },
  {
    time: "14:05 – 14:30",
    title:
      "From Fragmented IT GRC to Connected Governance and Continuous Regulatory Readiness",
    description:
      "A live demonstration of how connected governance, risk, and compliance processes can improve visibility and regulatory readiness.",
    type: "Live demonstration",
  },
  {
    time: "14:30 – 14:45",
    title: "Networking and Refreshment Break",
    type: "Networking",
  },
  {
    time: "14:45 – 15:05",
    title:
      "Technology, Integrity and Investor Protection in Capital Market 2.0",
  },
  {
    time: "15:05 – 15:25",
    title: "From Periodic Privacy Compliance to Continuous Data Governance",
  },
  {
    time: "15:35 – 15:55",
    title:
      "Connected Compliance: Governing AI and Autonomous Systems in a Real-Time Regulatory Environment",
  },
  {
    time: "15:55 – 16:00",
    title: "Executive Action Points and Closing",
  },
];

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(22px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const softReveal = keyframes`
  from {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
`;

const AgendaSection = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 108px 24px 110px;
  background: #f5f7fa;
  color: #083672;
  font-family: "Mont", sans-serif;

  &,
  & * {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    padding: 76px 18px 82px;
  }

  @media (max-width: 480px) {
    padding: 60px 15px 66px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const AgendaContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const RevealBlock = styled.div<{ $visible: boolean; $delay?: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? softReveal : "none")} 0.75s
    cubic-bezier(0.2, 0.65, 0.3, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.65fr);
  align-items: end;
  gap: 36px;
  margin-bottom: 50px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 34px;
  }
`;

const HeaderMain = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  color: #0067d4;
  font-family: "Mont", sans-serif;
  font-size: 0.73rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &::before {
    width: 22px;
    height: 1px;
    background: #0067d4;
    content: "";
  }
`;

const SectionTitle = styled.h2`
  max-width: 680px;
  margin: 0;
  color: #102d50;
  font-family: "Chillen", "Mont", sans-serif;
  font-size: clamp(2.7rem, 5.2vw, 4.25rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.045em;

  span {
    color: #0067d4;
  }

  @media (max-width: 760px) {
    font-size: clamp(2.4rem, 8vw, 3.3rem);
  }
`;

const SectionDescription = styled.p`
  max-width: 450px;
  margin: 0 0 5px;
  color: #697789;
  font-family: "Mont", sans-serif;
  font-size: 0.94rem;
  font-weight: 400;
  line-height: 1.9;

  @media (max-width: 760px) {
    max-width: 620px;
    font-size: 0.9rem;
    line-height: 1.8;
  }
`;

const ProgrammeSection = styled.section`
  margin-top: 48px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const ProgrammeHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 22px;
  margin-bottom: 21px;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

const ProgrammeHeaderMain = styled.div`
  min-width: 0;
`;

const ProgrammeLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 9px;
  color: #0067d4;
  font-family: "Mont", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #0067d4;
    content: "";
  }
`;

const ProgrammeTitle = styled.h3`
  margin: 0;
  color: #102d50;
  font-family: "Chillen", "Mont", sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.15rem);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.03em;
`;

const ProgrammeSubtitle = styled.p`
  max-width: 600px;
  margin: 7px 0 0;
  color: #748195;
  font-family: "Mont", sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.8;
`;

const ProgrammeTime = styled.span`
  flex-shrink: 0;
  padding: 8px 11px;
  border: 1px solid #e2e9f1;
  border-radius: 8px;
  background: #ffffff;
  color: #53718f;
  font-family: "Mont", sans-serif;
  font-size: 0.73rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`;

const AgendaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 15px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 13px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 11px;
  }
`;

const SessionCard = styled.article<{ $delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  min-height: 188px;
  padding: 21px;
  border: 1px solid rgba(17, 48, 82, 0.09);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 1px 2px rgba(16, 45, 80, 0.02),
    0 4px 16px rgba(16, 45, 80, 0.025);
  opacity: 0;
  animation: ${fadeUp} 0.65s cubic-bezier(0.2, 0.65, 0.3, 1) forwards;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
  transition: border-color 0.28s ease, box-shadow 0.28s ease,
    transform 0.28s cubic-bezier(0.2, 0.65, 0.3, 1), background 0.28s ease;

  &:hover {
    border-color: rgba(0, 103, 212, 0.25);
    background: #ffffff;
    box-shadow: 0 3px 8px rgba(16, 45, 80, 0.035),
      0 12px 30px rgba(16, 45, 80, 0.06);
    transform: translateY(-4px);
  }

  @media (max-width: 600px) {
    min-height: 0;
    padding: 19px;
    border-radius: 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;

const SessionTime = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 15px;
  padding: 6px 9px;
  border: 1px solid #e3edf8;
  border-radius: 7px;
  background: #f3f8fe;
  color: #386c9f;
  font-family: "Mont", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
`;

const SessionTitle = styled.h4`
  margin: 0;
  color: #29435f;
  font-family: "Mont", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: -0.012em;
  overflow-wrap: anywhere;
  transition: color 0.25s ease;

  ${SessionCard}:hover & {
    color: #0067d4;
  }
`;

const SessionDescription = styled.p`
  margin: 10px 0 0;
  color: #748195;
  font-family: "Mont", sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.85;
  overflow-wrap: anywhere;
`;

const SessionType = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  margin-top: 15px;
  padding: 5px 8px;
  border: 1px solid #e4eaf2;
  border-radius: 6px;
  background: #f8fafc;
  color: #617991;
  font-family: "Mont", sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  line-height: 1.5;
`;

const AgendaFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 42px;
  padding: 30px;
  border: 1px solid #dce7f3;
  border-radius: 14px;
  background: #edf5fd;
  box-shadow: 0 3px 14px rgba(16, 45, 80, 0.025);

  @media (max-width: 680px) {
    align-items: stretch;
    flex-direction: column;
    gap: 21px;
    padding: 23px 20px;
    border-radius: 12px;
  }
`;

const FooterText = styled.div`
  min-width: 0;

  h3 {
    margin: 0 0 8px;
    color: #102d50;
    font-family: "Chillen", "Mont", sans-serif;
    font-size: clamp(1.55rem, 2.5vw, 1.9rem);
    font-weight: 400;
    line-height: 1.35;
    letter-spacing: -0.025em;
  }

  p {
    max-width: 620px;
    margin: 0;
    color: #5e7288;
    font-family: "Mont", sans-serif;
    font-size: 0.87rem;
    font-weight: 400;
    line-height: 1.85;
  }
`;

const ReserveButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 13px 22px;
  border: 1px solid #083672;
  border-radius: 9px;
  background: #083672;
  color: #ffffff;
  font-family: "Mont", sans-serif;
  font-size: 0.83rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: #0067d4;
    background: #0067d4;
    box-shadow: 0 5px 14px rgba(0, 103, 212, 0.16);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid #91c7fa;
    outline-offset: 3px;
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

function AgendaCards({
  items,
  startDelay = 0,
}: {
  items: AgendaItem[];
  startDelay?: number;
}) {
  return (
    <AgendaGrid>
      {items.map((item, index) => (
        <SessionCard
          key={`${item.time}-${item.title}`}
          $delay={startDelay + index * 65}
        >
          <SessionTime>{item.time}</SessionTime>

          <SessionTitle>{item.title}</SessionTitle>

          {item.description && (
            <SessionDescription>{item.description}</SessionDescription>
          )}

          {item.type && <SessionType>{item.type}</SessionType>}
        </SessionCard>
      ))}
    </AgendaGrid>
  );
}

export default function Agenda({ onReserve }: AgendaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
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
      {
        threshold: 0.05,
        rootMargin: "0px 0px 40px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <AgendaSection id="agenda" ref={sectionRef}>
      <AgendaContainer>
        <RevealBlock $visible={isVisible}>
          <SectionHeader>
            <HeaderMain>
              <Eyebrow>Agenda</Eyebrow>

              <SectionTitle>
                A day built around <span>what comes next.</span>
              </SectionTitle>
            </HeaderMain>

            <SectionDescription>
              Explore the programme for the OPEX Executive Workshop &amp; Summit
              2026, with conversations spanning finance, sustainability,
              governance, compliance, and intelligent enterprise technology.
            </SectionDescription>
          </SectionHeader>
        </RevealBlock>

        <ProgrammeSection>
          <RevealBlock $visible={isVisible}>
            <ProgrammeHeader>
              <ProgrammeHeaderMain>
                <ProgrammeLabel>Morning programme</ProgrammeLabel>
                <ProgrammeTitle>Finance &amp; Sustainability</ProgrammeTitle>
                <ProgrammeSubtitle>
                  Reporting, disclosure and the changing role of finance.
                </ProgrammeSubtitle>
              </ProgrammeHeaderMain>

              <ProgrammeTime>09:15 – 12:00</ProgrammeTime>
            </ProgrammeHeader>
          </RevealBlock>

          <AgendaCards items={morningAgenda} startDelay={isVisible ? 80 : 0} />
        </ProgrammeSection>

        <ProgrammeSection>
          <RevealBlock $visible={isVisible} $delay={120}>
            <ProgrammeHeader>
              <ProgrammeHeaderMain>
                <ProgrammeLabel>Afternoon programme</ProgrammeLabel>
                <ProgrammeTitle>Technology &amp; Governance</ProgrammeTitle>
                <ProgrammeSubtitle>
                  Connected systems, intelligent operations and continuous
                  compliance.
                </ProgrammeSubtitle>
              </ProgrammeHeaderMain>

              <ProgrammeTime>12:00 – 16:00</ProgrammeTime>
            </ProgrammeHeader>
          </RevealBlock>

          <AgendaCards
            items={afternoonAgenda}
            startDelay={isVisible ? 250 : 0}
          />
        </ProgrammeSection>

        <RevealBlock $visible={isVisible} $delay={180}>
          <AgendaFooter>
            <FooterText>
              <h3>Be part of the conversation.</h3>
              <p>
                Join business leaders and decision-makers exploring the future
                of reporting, compliance and enterprise technology.
              </p>
            </FooterText>

            <ReserveButton type="button" onClick={onReserve}>
              Reserve your seat
            </ReserveButton>
          </AgendaFooter>
        </RevealBlock>
      </AgendaContainer>
    </AgendaSection>
  );
}
