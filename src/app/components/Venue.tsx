"use client";

import styled from "styled-components";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Venue() {
  return (
    <Section id="venue" className={montserrat.className}>
      <Container>
        <Header>
          <Heading>
            Great ideas.
            <br />
            <Accent>One connection.</Accent>
          </Heading>

          <Description>
            Join the OPEX Summit 2026 online for fresh perspectives on business,
            finance, and technology. Connect with industry leaders and be part
            of the conversation from anywhere.
          </Description>
        </Header>

        <EventCard>
          <VisualPanel>
            <VisualTop>
              <BrandMark>O</BrandMark>

              <PlatformTag>
                <ZoomCamera />
                <span>Zoom meeting</span>
              </PlatformTag>
            </VisualTop>

            <VisualCenter>
              <SmallTitle>OPEX SUMMIT 2026</SmallTitle>
              <ZoomWord>Zoom.</ZoomWord>
              <VisualDescription>
                A meeting of ideas.
                <br />A future in motion.
              </VisualDescription>
            </VisualCenter>

            <VisualBottom>
              <span>CONNECT FROM ANYWHERE</span>
              <DecorativeLine />
            </VisualBottom>

            <Orbit orbit="one" />
            <Orbit orbit="two" />
            <Orbit orbit="three" />
          </VisualPanel>

          <DetailsPanel>
            <DetailsHeading>
              Everything starts
              <br />
              with a connection.
            </DetailsHeading>

            <DetailsIntro>
              Here are the details for joining us online.
            </DetailsIntro>

            <Detail>
              <DetailIcon>
                <CalendarIcon />
              </DetailIcon>

              <DetailContent>
                <DetailLabel>Date</DetailLabel>
                <DetailValue>Thursday, 19 November 2026</DetailValue>
              </DetailContent>
            </Detail>

            <Detail>
              <DetailIcon>
                <ClockIcon />
              </DetailIcon>

              <DetailContent>
                <DetailLabel>Time</DetailLabel>
                <DetailValue>11:00 AM WAT</DetailValue>
              </DetailContent>
            </Detail>

            <Detail>
              <DetailIcon>
                <MonitorIcon />
              </DetailIcon>

              <DetailContent>
                <DetailLabel>Event format</DetailLabel>
                <DetailValue>Online via Zoom</DetailValue>
              </DetailContent>
            </Detail>

            <AccessNote>
              Zoom joining details will be shared with you after you register
              for the event.
            </AccessNote>
          </DetailsPanel>
        </EventCard>
      </Container>
    </Section>
  );
}

const NAVY = "#083672";
const BLUE = "#1769d2";
const LIGHT_BLUE = "#c9e4ff";

const Section = styled.section`
  width: 100%;
  padding: 112px 24px 100px;
  overflow: hidden;
  background: #ffffff;
  color: ${NAVY};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: inherit;
  }

  @media (max-width: 768px) {
    padding: 76px 18px 76px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.7fr;
  align-items: end;
  gap: 58px;
  margin-bottom: 58px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 38px;
  }
`;

const Heading = styled.h2`
  margin: 0;
  color: ${NAVY};
  font-size: clamp(44px, 6.3vw, 78px);
  font-weight: 600;
  letter-spacing: -4.8px;
  line-height: 1.04;

  @media (max-width: 600px) {
    font-size: clamp(39px, 10vw, 57px);
    letter-spacing: -2.8px;
  }
`;

const Accent = styled.span`
  color: ${BLUE};
`;

const Description = styled.p`
  max-width: 410px;
  margin: 0 0 5px;
  color: #68778b;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.95;

  @media (max-width: 600px) {
    font-size: 13px;
    line-height: 1.9;
  }
`;

const EventCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.92fr;
  overflow: hidden;
  border: 1px solid #e5eaf1;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(8, 54, 114, 0.06),
    0 2px 8px rgba(8, 54, 114, 0.025);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    border-radius: 23px;
  }
`;

const VisualPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 490px;
  padding: 34px;
  overflow: hidden;
  isolation: isolate;
  background: ${NAVY};

  @media (max-width: 800px) {
    min-height: 350px;
    padding: 27px;
  }

  @media (max-width: 480px) {
    min-height: 315px;
    padding: 23px;
  }
`;

const VisualTop = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const BrandMark = styled.div`
  display: grid;
  width: 43px;
  height: 43px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -2px;
`;

const PlatformTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 13px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 100px;
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1px;

  svg {
    flex-shrink: 0;
    color: ${LIGHT_BLUE};
  }
`;

const VisualCenter = styled.div`
  position: relative;
  z-index: 2;
  padding: 48px 0 40px;
`;

const SmallTitle = styled.p`
  margin: 0 0 19px;
  color: ${LIGHT_BLUE};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2.4px;
`;

const ZoomWord = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: clamp(70px, 9vw, 112px);
  font-weight: 600;
  letter-spacing: -7px;
  line-height: 0.98;

  @media (max-width: 480px) {
    font-size: 78px;
    letter-spacing: -5px;
  }
`;

const VisualDescription = styled.p`
  margin: 25px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.9;
`;

const VisualBottom = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 1.4px;
`;

const DecorativeLine = styled.span`
  width: 40px;
  height: 1px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.5);
`;

const Orbit = styled.div<{ orbit: "one" | "two" | "three" }>`
  position: absolute;
  z-index: 0;
  top: ${({ orbit }) =>
    orbit === "one" ? "-170px" : orbit === "two" ? "-105px" : "-40px"};
  right: ${({ orbit }) =>
    orbit === "one" ? "-180px" : orbit === "two" ? "-115px" : "-50px"};
  width: ${({ orbit }) =>
    orbit === "one" ? "450px" : orbit === "two" ? "320px" : "190px"};
  height: ${({ orbit }) =>
    orbit === "one" ? "450px" : orbit === "two" ? "320px" : "190px"};
  border: 1px solid rgba(201, 228, 255, 0.14);
  border-radius: 50%;
  pointer-events: none;
`;

const DetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 46px 40px;

  @media (max-width: 800px) {
    padding: 35px 28px;
  }

  @media (max-width: 480px) {
    padding: 28px 22px;
  }
`;

const DetailsHeading = styled.h3`
  margin: 0;
  color: ${NAVY};
  font-size: clamp(27px, 3.3vw, 37px);
  font-weight: 600;
  letter-spacing: -1.8px;
  line-height: 1.24;
`;

const DetailsIntro = styled.p`
  margin: 14px 0 25px;
  color: #7a8799;
  font-size: 12px;
  line-height: 1.8;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 19px 0;
  border-top: 1px solid #edf0f5;
`;

const DetailIcon = styled.div`
  display: grid;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid #e8eef7;
  border-radius: 13px;
  background: #f7faff;
  color: ${BLUE};
`;

const CalendarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3.5"
      y="5"
      width="17"
      height="15"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7.5 3.5V7M16.5 3.5V7M3.5 9.5H20.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 13H8.01M12 13H12.01M16 13H16.01M8 16.5H8.01M12 16.5H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 7V12L15.5 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="13"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 21H16M12 17V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ZoomCamera = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="6"
      width="12"
      height="12"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M15 10L21 7V17L15 14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const DetailContent = styled.div`
  min-width: 0;
`;

const DetailLabel = styled.p`
  margin: 0 0 5px;
  color: #8a96a7;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const DetailValue = styled.p`
  margin: 0;
  color: ${NAVY};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.7;
  overflow-wrap: anywhere;
`;

const AccessNote = styled.p`
  margin: 21px 0 0;
  padding: 16px;
  border: 1px solid #e8eef7;
  border-radius: 14px;
  background: #f8faff;
  color: #5f7087;
  font-size: 11px;
  line-height: 1.9;
`;
