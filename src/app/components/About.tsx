"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function About() {
  const pageRef = useRef<HTMLElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
    } else {
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
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px",
        }
      );

      elements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = bounds.width;
      height = bounds.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        48,
        Math.max(18, Math.floor((width * height) / 8500))
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.5 + 0.6,
      }));

      draw(true);
    };

    const draw = (staticFrame = false) => {
      if (!context) return;

      context.clearRect(0, 0, width, height);

      const connectionDistance = 105;

      particles.forEach((particle, index) => {
        if (!staticFrame && !reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
          }

          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
          }

          particle.x = Math.max(0, Math.min(width, particle.x));
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(8, 121, 217, ${opacity})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(8, 121, 217, 0.48)";
        context.fill();
      });
    };

    const animate = () => {
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();

    if (!reducedMotion.matches) {
      animate();
    }

    const handleMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);

      if (reducedMotion.matches) {
        draw(true);
      } else {
        animate();
      }
    };

    reducedMotion.addEventListener("change", handleMotionChange);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <Page ref={pageRef} id="about">
      <Hero>
        <HeroInner>
          <HeroCopy>
            <HeroTitle data-reveal>
              Financial reporting
              <br />
              meets a <HeroBlue>new era.</HeroBlue>
            </HeroTitle>

            <HeroDescription
              data-reveal
              style={{ "--delay": "100ms" } as React.CSSProperties}
            >
              Clearer insight. Smarter compliance. Better decisions in a
              changing financial world.
            </HeroDescription>
          </HeroCopy>

          <ParticlePanel
            data-reveal
            style={{ "--delay": "180ms" } as React.CSSProperties}
          >
            <ParticleCanvas ref={particleCanvasRef} aria-hidden="true" />

            <ParticleCaption>
              <span>01</span>
              <strong>Connected information.</strong>
              <strong>Confident decisions.</strong>
            </ParticleCaption>

            <ParticleDot aria-hidden="true" />
          </ParticlePanel>
        </HeroInner>
      </Hero>

      <Statement>
        <StatementInner>
          <StatementTitle data-reveal>
            The pressure is changing.
            <br />
            <StatementBlue>So must we.</StatementBlue>
          </StatementTitle>

          <StatementCopy>
            <StatementText
              data-reveal
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              Regulators expect stronger evidence. Boards want clearer
              information. Finance and compliance teams must deliver more with
              increasingly complex systems.
            </StatementText>

            <StatementText
              data-reveal
              style={{ "--delay": "150ms" } as React.CSSProperties}
            >
              Connecting data, processes and people creates a stronger
              foundation for reporting and risk management.
            </StatementText>
          </StatementCopy>
        </StatementInner>
      </Statement>

      <Approach>
        <ApproachInner>
          <ApproachHeading data-reveal>
            Four areas.
            <br />
            <ApproachBlue>One bigger picture.</ApproachBlue>
          </ApproachHeading>

          <ApproachIntro
            data-reveal
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            The ideas shaping the future of financial services.
          </ApproachIntro>

          <TopicGrid>
            <TopicCard
              data-reveal
              style={{ "--delay": "60ms" } as React.CSSProperties}
            >
              <TopicNumber>01</TopicNumber>
              <TopicTitle>Financial reporting</TopicTitle>
              <TopicText>
                Turn complex data into reliable information for better
                decisions.
              </TopicText>
            </TopicCard>

            <TopicCard
              data-reveal
              style={{ "--delay": "120ms" } as React.CSSProperties}
            >
              <TopicNumber>02</TopicNumber>
              <TopicTitle>Compliance</TopicTitle>
              <TopicText>
                Connect obligations, controls and evidence in a more consistent
                way.
              </TopicText>
            </TopicCard>

            <TopicCard
              data-reveal
              style={{ "--delay": "180ms" } as React.CSSProperties}
            >
              <TopicNumber>03</TopicNumber>
              <TopicTitle>AI &amp; governance</TopicTitle>
              <TopicText>
                Adopt emerging technology with appropriate oversight and
                accountability.
              </TopicText>
            </TopicCard>

            <TopicCard
              data-reveal
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <TopicNumber>04</TopicNumber>
              <TopicTitle>Connected systems</TopicTitle>
              <TopicText>
                Bring information and teams together to improve visibility
                across the organisation.
              </TopicText>
            </TopicCard>
          </TopicGrid>
        </ApproachInner>
      </Approach>

      <Executive>
        <ExecutiveInner>
          <ExecutiveTitle data-reveal>
            Can your organisation
            <br />
            <ExecutiveBlue>keep pace?</ExecutiveBlue>
          </ExecutiveTitle>

          <ExecutiveDescription
            data-reveal
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            Regulations change. New risks emerge. Technology moves forward.
            <strong>
              Staying ready means connecting your data, processes, controls and
              people.
            </strong>
          </ExecutiveDescription>
        </ExecutiveInner>
      </Executive>

      <Closing>
        <ClosingInner>
          <ClosingTitle data-reveal>
            Better information.
            <br />
            <ClosingBlue>Better decisions.</ClosingBlue>
          </ClosingTitle>

          <ClosingText
            data-reveal
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            Turn information into understanding, and understanding into action.
          </ClosingText>
        </ClosingInner>
      </Closing>
    </Page>
  );
}

/* BASE */

const Page = styled.main`
  --navy: #092b57;
  --blue: #0879d9;
  --muted: #68788d;
  --border: #e6edf5;

  width: 100%;
  overflow: clip;
  background: #ffffff;
  color: var(--navy);
  font-family: "Montserrat", sans-serif;

  [data-reveal] {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--delay, 0ms);
  }

  [data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal],
    [data-reveal].is-visible {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;

/* HERO */

const Hero = styled.section`
  padding: 118px 0 54px;

  @media (max-width: 700px) {
    padding: 105px 0 38px;
  }
`;

const HeroInner = styled.div`
  width: min(1050px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const HeroCopy = styled.div`
  max-width: 850px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(42px, 6.6vw, 76px);
  font-weight: 650;
  line-height: 1.09;
  letter-spacing: -3.5px;

  @media (max-width: 700px) {
    font-size: clamp(36px, 8.6vw, 55px);
    letter-spacing: -1.8px;
  }
`;

const HeroBlue = styled.span`
  color: #0879d9;
`;

const HeroDescription = styled.p`
  max-width: 590px;
  margin: 17px 0 0;
  color: #68788d;
  font-size: 14px;
  line-height: 1.85;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const ParticlePanel = styled.div`
  position: relative;
  height: 155px;
  margin-top: 28px;
  overflow: hidden;
  border: 1px solid #e6edf5;
  border-radius: 15px;
  background: #f7faff;

  @media (max-width: 600px) {
    height: 130px;
    margin-top: 24px;
  }
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ParticleCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform: translateY(-50%);

  span {
    margin-bottom: 5px;
    color: #0879d9;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  strong {
    color: #092b57;
    font-size: clamp(15px, 2vw, 20px);
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  @media (max-width: 600px) {
    left: 18px;

    strong {
      font-size: 15px;
    }
  }
`;

const ParticleDot = styled.span`
  position: absolute;
  top: 50%;
  right: 22%;
  width: 9px;
  height: 9px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #0879d9;
  box-shadow: 0 0 0 5px rgba(8, 121, 217, 0.12);
  transform: translateY(-50%);

  @media (max-width: 600px) {
    right: 12%;
  }
`;

/* STATEMENT */

const Statement = styled.section`
  padding: 54px 0;
  background: #f7f9fc;

  @media (max-width: 700px) {
    padding: 45px 0;
  }
`;

const StatementInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 55px;
  align-items: start;
  width: min(1050px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const StatementTitle = styled.h2`
  margin: 0;
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 650;
  line-height: 1.16;
  letter-spacing: -2px;

  @media (max-width: 600px) {
    font-size: 34px;
    letter-spacing: -1.4px;
  }
`;

const StatementBlue = styled.span`
  color: #0879d9;
`;

const StatementCopy = styled.div`
  padding-top: 3px;
`;

const StatementText = styled.p`
  margin: 0 0 13px;
  color: #68788d;
  font-size: 13px;
  line-height: 1.85;

  &:last-child {
    margin-bottom: 0;
  }
`;

/* TOPICS */

const Approach = styled.section`
  padding: 65px 0 70px;

  @media (max-width: 700px) {
    padding: 52px 0;
  }
`;

const ApproachInner = styled.div`
  width: min(1050px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const ApproachHeading = styled.h2`
  margin: 0;
  font-size: clamp(37px, 5.3vw, 58px);
  font-weight: 650;
  line-height: 1.12;
  letter-spacing: -2.8px;

  @media (max-width: 600px) {
    font-size: 38px;
    letter-spacing: -1.6px;
  }
`;

const ApproachBlue = styled.span`
  color: #0879d9;
`;

const ApproachIntro = styled.p`
  margin: 12px 0 25px;
  color: #718096;
  font-size: 13px;
  line-height: 1.8;
`;

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const TopicCard = styled.article`
  position: relative;
  min-height: 145px;
  padding: 22px 23px;
  border: 1px solid #e6edf5;
  border-radius: 13px;
  background: #ffffff;
  transition: border-color 220ms ease, background 220ms ease,
    transform 220ms ease;

  &:hover {
    border-color: #b9d9f4;
    background: #fafdff;
    transform: translateY(-2px);
  }

  @media (max-width: 650px) {
    min-height: auto;
    padding: 20px;
  }
`;

const TopicNumber = styled.span`
  position: absolute;
  top: 23px;
  right: 23px;
  color: #9aaabd;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const TopicTitle = styled.h3`
  margin: 0 35px 8px 0;
  color: #092b57;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.4px;
`;

const TopicText = styled.p`
  max-width: 400px;
  margin: 0;
  color: #718096;
  font-size: 12px;
  line-height: 1.8;
`;

/* EXECUTIVE */

const Executive = styled.section`
  padding: 58px 0;
  background: #f0f7ff;

  @media (max-width: 700px) {
    padding: 45px 0;
  }
`;

const ExecutiveInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  gap: 45px;
  width: min(1050px, calc(100% - 56px));
  margin: 0 auto;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    width: calc(100% - 36px);
  }
`;

const ExecutiveTitle = styled.h2`
  margin: 0;
  font-size: clamp(34px, 4.8vw, 53px);
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -2.4px;

  @media (max-width: 600px) {
    font-size: 36px;
    letter-spacing: -1.5px;
  }
`;

const ExecutiveBlue = styled.span`
  color: #0879d9;
`;

const ExecutiveDescription = styled.p`
  margin: 0;
  color: #68788d;
  font-size: 13px;
  line-height: 1.9;

  strong {
    display: block;
    margin-top: 10px;
    color: #173d6c;
    font-weight: 600;
  }
`;

/* CLOSING */

const Closing = styled.section`
  padding: 65px 0 70px;
  background: #ffffff;
  text-align: center;

  @media (max-width: 700px) {
    padding: 52px 0 58px;
  }
`;

const ClosingInner = styled.div`
  width: min(850px, calc(100% - 40px));
  margin: 0 auto;
`;

const ClosingTitle = styled.h2`
  margin: 0;
  font-size: clamp(37px, 5.5vw, 62px);
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -3px;

  @media (max-width: 600px) {
    font-size: 36px;
    letter-spacing: -1.5px;
  }
`;

const ClosingBlue = styled.span`
  color: #0879d9;
`;

const ClosingText = styled.p`
  max-width: 470px;
  margin: 14px auto 0;
  color: #718096;
  font-size: 13px;
  line-height: 1.85;
`;
