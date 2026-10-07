"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function About() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll("[data-reveal]");

    if (!elements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <Page ref={pageRef} id="about">
      <Hero>
        <HeroInner>
          <Eyebrow
            data-reveal
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            THE CONVERSATION
          </Eyebrow>

          <HeroTitle>
            <HeroLine
              data-reveal
              style={{ "--delay": "100ms" } as React.CSSProperties}
            >
              Financial reporting and
            </HeroLine>

            <HeroLine
              data-reveal
              style={{ "--delay": "180ms" } as React.CSSProperties}
            >
              compliance have never
            </HeroLine>

            <HeroAccent
              data-reveal
              style={{ "--delay": "260ms" } as React.CSSProperties}
            >
              carried higher stakes.
            </HeroAccent>
          </HeroTitle>

          <HeroDescription
            data-reveal
            style={{ "--delay": "380ms" } as React.CSSProperties}
          >
            Regulation is changing. Reporting expectations are rising. AI is
            changing how organisations operate. The systems behind financial
            information and compliance now have to work harder, faster and with
            greater accountability.
          </HeroDescription>
        </HeroInner>
      </Hero>

      <Statement>
        <StatementInner>
          <StatementNumber
            data-reveal
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            01 / THE MOMENT
          </StatementNumber>

          <StatementContent>
            <StatementTitle>
              <RevealLine
                data-reveal
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                The pressure is
              </RevealLine>

              <RevealLine
                data-reveal
                style={{ "--delay": "150ms" } as React.CSSProperties}
              >
                moving upstream.
              </RevealLine>
            </StatementTitle>

            <StatementText
              data-reveal
              style={{ "--delay": "250ms" } as React.CSSProperties}
            >
              Boards want clearer information. Regulators want stronger
              evidence. Investors want greater transparency. Finance and
              compliance teams are being asked to deliver all of this while
              operating in an environment that is becoming increasingly complex.
            </StatementText>

            <StatementText
              data-reveal
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              Yet many organisations still rely on fragmented systems,
              spreadsheets, manual reconciliations and processes that depend on
              individual knowledge.
            </StatementText>

            <StatementText
              data-reveal
              style={{ "--delay": "390ms" } as React.CSSProperties}
            >
              The question is no longer simply how to report. It is how to build
              an operating environment that can support the reporting, controls
              and decisions that come next.
            </StatementText>
          </StatementContent>
        </StatementInner>
      </Statement>

      <Approach>
        <ApproachInner>
          <SectionHeader>
            <Eyebrow
              data-reveal
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              WHAT WE ARE EXPLORING
            </Eyebrow>

            <SectionTitle>
              <RevealLine
                data-reveal
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                Four connected
              </RevealLine>

              <RevealLine
                data-reveal
                style={{ "--delay": "150ms" } as React.CSSProperties}
              >
                questions.
              </RevealLine>
            </SectionTitle>
          </SectionHeader>

          <ApproachList>
            <ApproachItem
              data-reveal
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              <ApproachNumber>01</ApproachNumber>

              <ApproachBody>
                <ApproachTitle>Financial reporting</ApproachTitle>

                <ApproachText>
                  How connected data, consolidation, disclosure and reporting
                  systems can give leadership a more reliable view of
                  performance and reduce the friction between source data and
                  published information.
                </ApproachText>
              </ApproachBody>
            </ApproachItem>

            <ApproachItem
              data-reveal
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              <ApproachNumber>02</ApproachNumber>

              <ApproachBody>
                <ApproachTitle>Compliance</ApproachTitle>

                <ApproachText>
                  How organisations can connect obligations, controls, evidence
                  and ownership so compliance becomes a continuous operating
                  capability rather than a process that accelerates when a
                  deadline arrives.
                </ApproachText>
              </ApproachBody>
            </ApproachItem>

            <ApproachItem
              data-reveal
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <ApproachNumber>03</ApproachNumber>

              <ApproachBody>
                <ApproachTitle>AI & governance</ApproachTitle>

                <ApproachText>
                  As AI becomes embedded across organisations, leaders need to
                  understand where it is operating, what decisions it influences
                  and how accountability, risk and governance should work around
                  it.
                </ApproachText>
              </ApproachBody>
            </ApproachItem>

            <ApproachItem
              data-reveal
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              <ApproachNumber>04</ApproachNumber>

              <ApproachBody>
                <ApproachTitle>Connected systems</ApproachTitle>

                <ApproachText>
                  What changes when finance, risk, compliance and technology
                  stop operating as separate information environments and begin
                  working from connected data and processes.
                </ApproachText>
              </ApproachBody>
            </ApproachItem>
          </ApproachList>
        </ApproachInner>
      </Approach>

      <Executive>
        <ExecutiveInner>
          <ExecutiveNumber
            data-reveal
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            02 / THE EXECUTIVE QUESTION
          </ExecutiveNumber>

          <ExecutiveContent>
            <ExecutiveTitle>
              <RevealLine
                data-reveal
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                Can the organisation
              </RevealLine>

              <RevealLine
                data-reveal
                style={{ "--delay": "150ms" } as React.CSSProperties}
              >
                <ExecutiveAccent>keep pace?</ExecutiveAccent>
              </RevealLine>
            </ExecutiveTitle>

            <ExecutiveText
              data-reveal
              style={{ "--delay": "260ms" } as React.CSSProperties}
            >
              A reporting deadline can move. A regulation can change. A new
              requirement can arrive. An AI system can suddenly become part of a
              critical process.
            </ExecutiveText>

            <ExecutiveText
              data-reveal
              style={{ "--delay": "330ms" } as React.CSSProperties}
            >
              The organisations that respond well will not simply have more
              technology. They will have better connections between their data,
              processes, controls and people.
            </ExecutiveText>

            <ExecutiveText
              data-reveal
              style={{ "--delay": "400ms" } as React.CSSProperties}
            >
              That is the conversation.
            </ExecutiveText>
          </ExecutiveContent>
        </ExecutiveInner>
      </Executive>

      <Closing>
        <ClosingInner>
          <Eyebrow
            data-reveal
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            THE NEXT QUESTION
          </Eyebrow>

          <ClosingTitle>
            <RevealLine
              data-reveal
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              Better information.
            </RevealLine>

            <RevealLine
              data-reveal
              style={{ "--delay": "150ms" } as React.CSSProperties}
            >
              <ClosingBrand>Better decisions.</ClosingBrand>
            </RevealLine>
          </ClosingTitle>

          <ClosingText
            data-reveal
            style={{ "--delay": "260ms" } as React.CSSProperties}
          >
            The future of reporting and compliance will depend on how well
            organisations connect the information they have with the decisions
            they need to make.
          </ClosingText>

          <ClosingLine
            data-reveal
            style={{ "--delay": "340ms" } as React.CSSProperties}
          />
        </ClosingInner>
      </Closing>
    </Page>
  );
}

const Page = styled.main`
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  color: #083672;

  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(4px);
    transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
      filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--delay, 0ms);
  }

  [data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }
  }
`;

const Hero = styled.section`
  min-height: 76vh;
  display: flex;
  align-items: flex-end;
  padding: 135px 0 80px;

  @media (max-width: 700px) {
    min-height: auto;
    padding: 125px 0 65px;
  }
`;

const HeroInner = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
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

  @media (max-width: 700px) {
    font-size: 10px;
    margin-bottom: 17px;
  }
`;

const HeroTitle = styled.h1`
  max-width: 1120px;
  margin: 0;
  color: #083672;
  font-size: clamp(52px, 7.4vw, 104px);
  line-height: 0.92;
  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    font-size: clamp(44px, 12vw, 68px);
    line-height: 0.94;
  }
`;

const HeroLine = styled.span`
  display: block;
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const HeroAccent = styled.span`
  display: block;
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-weight: 400;
`;

const HeroDescription = styled.p`
  max-width: 720px;
  margin: 32px 0 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 18px;
  font-weight: 200;
  line-height: 1.65;
  letter-spacing: -0.01em;

  @media (max-width: 700px) {
    margin-top: 25px;
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Statement = styled.section`
  padding: 82px 0;
  background: #f7faff;

  @media (max-width: 700px) {
    padding: 65px 0;
  }
`;

const StatementInner = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.32fr 1fr;
  gap: 70px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StatementNumber = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
`;

const StatementContent = styled.div`
  max-width: 800px;
`;

const StatementTitle = styled.h2`
  margin: 0 0 26px;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(42px, 5vw, 68px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.06em;

  @media (max-width: 700px) {
    font-size: 43px;
  }
`;

const RevealLine = styled.span`
  display: block;
`;

const StatementText = styled.p`
  max-width: 720px;
  margin: 0 0 17px;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 17px;
  font-weight: 200;
  line-height: 1.68;

  &:last-child {
    margin-bottom: 0;
    color: #083672;
    font-weight: 400;
  }

  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Approach = styled.section`
  padding: 90px 0;

  @media (max-width: 700px) {
    padding: 70px 0;
  }
`;

const ApproachInner = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 50px;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #083672;
  font-size: clamp(52px, 6vw, 80px);
  line-height: 0.9;
  letter-spacing: -0.07em;

  @media (max-width: 700px) {
    font-size: 47px;
  }
`;

const SectionLight = styled.span`
  display: block;
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const ApproachList = styled.div`
  border-top: 1px solid #c6e3fb;
`;

const ApproachItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 35px;
  padding: 36px 0;
  border-bottom: 1px solid #c6e3fb;

  @media (max-width: 700px) {
    grid-template-columns: 38px 1fr;
    gap: 17px;
    padding: 30px 0;
  }
`;

const ApproachNumber = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 11px;
  letter-spacing: 0.12em;
`;

const ApproachBody = styled.div`
  max-width: 760px;
`;

const ApproachTitle = styled.h3`
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(30px, 3vw, 43px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const ApproachText = styled.p`
  max-width: 690px;
  margin: 15px 0 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 17px;
  font-weight: 200;
  line-height: 1.68;

  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Executive = styled.section`
  padding: 90px 0;

  @media (max-width: 700px) {
    padding: 70px 0;
  }
`;

const ExecutiveInner = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.32fr 1fr;
  gap: 70px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ExecutiveNumber = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
`;

const ExecutiveContent = styled.div`
  max-width: 800px;
`;

const ExecutiveTitle = styled.h2`
  margin: 0 0 28px;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(44px, 5vw, 70px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.06em;

  @media (max-width: 700px) {
    font-size: 43px;
  }
`;

const ExecutiveAccent = styled.span`
  color: #0067d4;
`;

const ExecutiveText = styled.p`
  max-width: 700px;
  margin: 0 0 17px;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 17px;
  font-weight: 200;
  line-height: 1.68;

  &:last-child {
    color: #083672;
    font-weight: 400;
  }

  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Closing = styled.section`
  padding: 90px 0 100px;
  background: #f7faff;

  @media (max-width: 700px) {
    padding: 70px 0 80px;
  }
`;

const ClosingInner = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
`;

const ClosingTitle = styled.h2`
  margin: 0;
  color: #083672;
  font-size: clamp(54px, 7vw, 94px);
  line-height: 0.9;
  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    font-size: 50px;
  }
`;

const ClosingBrand = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-weight: 400;
`;

const ClosingText = styled.p`
  max-width: 650px;
  margin: 27px 0 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 18px;
  font-weight: 200;
  line-height: 1.65;

  @media (max-width: 700px) {
    font-size: 16px;
    line-height: 1.65;
  }
`;

const ClosingLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 50px;
  background: #c6e3fb;
`;
