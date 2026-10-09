"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(28px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const logos = [
  {
    name: "CBN",
    src: "/images/invitees/cbn.png",
  },
  {
    name: "FCDC",
    src: "/images/invitees/fcdc.jpg",
  },
  {
    name: "FRC",
    src: "/images/invitees/frc.png",
  },
  {
    name: "NDPC",
    src: "/images/invitees/ndpc.png",
  },
  {
    name: "NRS",
    src: "/images/invitees/nrs.png",
  },
  {
    name: "SEC",
    src: "/images/invitees/sec.png",
  },
  {
    name: "NITDA",
    src: "/images/invitees/nitda.png",
  },
  {
    name: "FIRSTBANK",
    src: "/images/invitees/fbn.jpeg",
  },
  {
    name: "LETSHEGO",
    src: "/images/invitees/letshego.png",
  },
  {
    name: "MONIEPOINT",
    src: "/images/invitees/moniePoint.jpeg",
  },
  {
    name: "SMARTCASH",
    src: "/images/invitees/smartcash.png",
  },
  {
    name: "REGTECH365",
    src: "/images/invitees/regtech365.jpeg",
  },
  {
    name: "ACCESSBANK",
    src: "/images/invitees/access.jpeg",
  },
];

export default function Invitee() {
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
    <Section ref={sectionRef} id="invitees">
      <Container>
        <Top>
          <Left>
            <Eyebrow>THE ROOM</Eyebrow>

            <Heading>
              Featuring insights
              <br />
              from <Accent>leaders.</Accent>
            </Heading>
          </Left>

          <Right>
            <Description>
              A focused gathering of senior executives from leading financial
              institutions and organisations shaping the future of reporting,
              technology and compliance.
            </Description>
          </Right>
        </Top>

        <LogoGrid $visible={visible}>
          {logos.map((logo, index) => (
            <LogoCard key={logo.name} $delay={`${0.08 * index}s`}>
              <Logo
                src={logo.src}
                alt={`${logo.name} logo`}
                width={260}
                height={110}
              />
            </LogoCard>
          ))}
        </LogoGrid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  background: #ffffff;
  padding: 115px 0 125px;
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 85px 0 95px;
  }
`;

const Container = styled.div`
  width: min(1200px, 90vw);
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: 100px;
  align-items: end;
  margin-bottom: 65px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 50px;
  }
`;

const Left = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 20px;
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  @media (max-width: 700px) {
    margin-bottom: 16px;
  }
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(48px, 5.7vw, 78px);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.07em;

  @media (max-width: 700px) {
    font-size: clamp(44px, 12vw, 64px);
    line-height: 0.94;
  }
`;

const Accent = styled.span`
  color: #0067d4;
`;

const Right = styled.div`
  align-self: end;

  @media (max-width: 900px) {
    max-width: 600px;
  }
`;

const Description = styled.p`
  max-width: 430px;
  margin: 0;
  color: #555555;
  font-family: "Mont", sans-serif;
  font-size: 13px;
  font-weight: 200;
  line-height: 1.7;
  letter-spacing: -0.015em;

  @media (max-width: 700px) {
    font-size: 12px;
    line-height: 1.65;
  }
`;

const LogoGrid = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  animation: ${({ $visible }) => ($visible ? reveal : "none")} 0.9s
    cubic-bezier(0.22, 1, 0.36, 1) forwards;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const LogoCard = styled.div<{ $delay: string }>`
  position: relative;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px solid #c6e3fb;
  border-radius: 18px;
  background: #ffffff;
  overflow: visible;

  animation: ${reveal} 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay }) => $delay};

  transition: background 0.45s ease, border-color 0.45s ease,
    box-shadow 0.45s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    z-index: 5;
    background: #f7faff;
    border-color: #0067d4;
    transform: translateY(-5px);
    box-shadow: 0 24px 50px rgba(8, 54, 114, 0.08),
      0 6px 18px rgba(8, 54, 114, 0.04);
  }

  @media (max-width: 700px) {
    height: 145px;
    padding: 25px;
    border-radius: 15px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const Logo = styled(Image)`
  width: auto;
  max-width: 220px;
  height: 70px;
  object-fit: contain;

  filter: grayscale(1);
  opacity: 0.55;
  transform: scale(1);

  transition: filter 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  ${LogoCard}:hover & {
    filter: grayscale(0);
    opacity: 1;
    transform: scale(1.08);
  }

  @media (max-width: 700px) {
    max-width: 180px;
    height: 60px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
