"use client";

import Image from "next/image";
import styled from "styled-components";

const invitees = [
  { name: "Central Bank of Nigeria", logo: "/images/invitees/cbn.png" },
  { name: "FCDC", logo: "/images/invitees/fcdc.jpg" },
  { name: "Financial Reporting Council", logo: "/images/invitees/frc.png" },
  { name: "NDPC", logo: "/images/invitees/ndpc.png" },
  { name: "NRS", logo: "/images/invitees/nrs.png" },
  { name: "SEC", logo: "/images/invitees/sec.png" },
  { name: "NITDA", logo: "/images/invitees/nitda.png" },
  { name: "FirstBank", logo: "/images/invitees/fbn.jpeg" },
  { name: "Letshego", logo: "/images/invitees/letshego.png" },
  { name: "Moniepoint", logo: "/images/invitees/moniepoint.png" },
  { name: "Smartcash", logo: "/images/invitees/smartcash.png" },
  { name: "REGTECH365", logo: "/images/invitees/regtech365.jpeg" },
  { name: "Access Bank", logo: "/images/invitees/access.jpeg" },
  { name: "Coronation Bank", logo: "/images/invitees/coronation.png" },
  { name: "FCMB", logo: "/images/invitees/fcmb.jpeg" },
  { name: "Fidelity Bank", logo: "/images/invitees/fidelity.jpeg" },
  { name: "Greenwich", logo: "/images/invitees/greenwich.jpeg" },
  { name: "Sterling Bank", logo: "/images/invitees/sterling.png" },
  { name: "TeamApt", logo: "/images/invitees/teamapt.png" },
];

export default function Invitee() {
  return (
    <Section id="invitees">
      <Container>
        <SectionHeader>
          <Eyebrow>WHO'S IN THE ROOM</Eyebrow>

          <Heading>
            An exclusive gathering of
            <HeadingAccent> industry leaders.</HeadingAccent>
          </Heading>

          <Description>
            Connecting the people shaping the future of operational excellence,
            financial reporting, compliance, and technology.
          </Description>
        </SectionHeader>

        <LogoGrid>
          {invitees.map((invitee) => (
            <LogoCard key={invitee.name}>
              <LogoWrapper>
                <Image
                  src={invitee.logo}
                  alt={`${invitee.name} logo`}
                  width={480}
                  height={200}
                  sizes="
                    (max-width: 650px) 90vw,
                    (max-width: 1100px) 28vw,
                    22vw
                  "
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </LogoWrapper>
            </LogoCard>
          ))}
        </LogoGrid>

        <BottomNote>
          <NoteLine />
          <NoteText>
            Bringing together the institutions and innovators driving change.
          </NoteText>
          <NoteLine />
        </BottomNote>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: clamp(56px, 8vw, 120px) 0;
  background: #ffffff;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: clamp(16px, 4vw, 56px);
`;

const SectionHeader = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto clamp(32px, 5vw, 64px);
  text-align: center;
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: clamp(14px, 2vw, 20px);
  color: #0067d4;
  font-family: "Mont", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.6;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(28px, 4.5vw, 58px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.045em;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: clamp(27px, 7vw, 34px);
    letter-spacing: -0.035em;
  }
`;

const HeadingAccent = styled.span`
  color: #0067d4;
`;

const Description = styled.p`
  width: 100%;
  max-width: 620px;
  margin: clamp(14px, 2vw, 22px) auto 0;
  color: #65748b;
  font-family: "Mont", sans-serif;
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.8;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    line-height: 1.7;
  }
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 2vw, 22px);
  width: 100%;
  min-width: 0;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  @media (max-width: 360px) {
    gap: 10px;
  }
`;

const LogoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  height: clamp(115px, 15vw, 190px);
  padding: clamp(12px, 2.2vw, 26px);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e8edf3;
  border-radius: clamp(10px, 1.5vw, 18px);
  box-shadow: 0 4px 18px rgba(8, 54, 114, 0.035);
  transition: border-color 250ms ease, box-shadow 250ms ease,
    transform 250ms ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: rgba(0, 103, 212, 0.3);
      box-shadow: 0 12px 30px rgba(8, 54, 114, 0.09);
      transform: translateY(-3px);
    }
  }

  @media (max-width: 650px) {
    height: 125px;
    padding: 18px 28px;
  }

  @media (max-width: 360px) {
    height: 110px;
    padding: 14px 22px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 260px;
    max-height: 120px;
    object-fit: contain;
    object-position: center;
    filter: grayscale(0.15);
    opacity: 0.9;
    transition: filter 250ms ease, opacity 250ms ease, transform 250ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    ${LogoCard}:hover & img {
      filter: grayscale(0);
      opacity: 1;
      transform: scale(1.04);
    }
  }

  @media (max-width: 650px) {
    img {
      max-width: 100%;
      max-height: 95px;
    }
  }

  @media (max-width: 360px) {
    img {
      max-height: 82px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
  }
`;

const BottomNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, 22px);
  width: 100%;
  margin-top: clamp(32px, 5vw, 52px);

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const NoteLine = styled.div`
  width: clamp(20px, 5vw, 60px);
  height: 1px;
  flex-shrink: 0;
  background: #dbe5f0;
`;

const NoteText = styled.p`
  max-width: 500px;
  margin: 0;
  color: #8190a5;
  font-family: "Chillen", sans-serif;
  font-size: clamp(11px, 1.2vw, 13px);
  line-height: 1.6;
  text-align: center;
`;
