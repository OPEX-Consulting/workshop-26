"use client";
import styled from "styled-components";
import VenueMap from "./VenueMap";

export default function Venue() {
  return (
    <Section id="venue">
      <Container>
        <Header>
          <Left>
            <Eyebrow>THE VENUE</Eyebrow>

            <Heading>
              <HeadingLight>Meet at</HeadingLight>
              <br />
              <Accent>The Wheatbaker.</Accent>
            </Heading>
          </Left>

          <Right>
            <Description>
              A private setting in the heart of Ikoyi, Lagos, designed for
              focused conversations between senior executives.
            </Description>
          </Right>
        </Header>

        <VenueLayout>
          <VenueInfo>
            <Top>
              <VenueNumber>01</VenueNumber>

              <VenueTitle>
                The
                <br />
                Wheatbaker
              </VenueTitle>

              <VenueLocation>
                4 Onitolo Road
                <br />
                Ikoyi, Lagos, Nigeria
              </VenueLocation>
            </Top>

            <Bottom>
              <VenueMeta>
                <MetaItem>
                  <MetaLabel>DATE</MetaLabel>
                  <MetaValue>Wednesday, 21 October 2026</MetaValue>
                </MetaItem>

                <MetaItem>
                  <MetaLabel>ACCESS</MetaLabel>
                  <MetaValue>Parking available on site</MetaValue>
                </MetaItem>
              </VenueMeta>

              <Directions
                href="https://www.google.com/maps/search/?api=1&query=The+Wheatbaker+Ikoyi+Lagos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps
                <Arrow>↗</Arrow>
              </Directions>
            </Bottom>

            <CardGlow />
          </VenueInfo>

          <MapWrapper>
            <VenueMap />
          </MapWrapper>
        </VenueLayout>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  background: #f7faff;
  padding: 125px 0;
  overflow: hidden;

  @media (max-width: 700px) {
    padding: 90px 0;
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
  margin-bottom: 75px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 55px;
  }
`;

const Left = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 22px;

  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  margin: 0;

  color: #083672;

  font-size: clamp(54px, 6vw, 84px);
  line-height: 0.9;
  letter-spacing: -0.075em;

  @media (max-width: 700px) {
    font-size: clamp(48px, 13vw, 70px);
  }
`;

const HeadingLight = styled.span`
  font-family: "Mont", sans-serif;
  font-weight: 200;
`;

const Accent = styled.span`
  color: #0067d4;
  font-family: "Chillen", sans-serif;
  font-weight: 400;
`;

const Right = styled.div`
  padding-bottom: 6px;
`;

const Description = styled.p`
  max-width: 480px;
  margin: 0;

  color: #555555;

  font-family: "Mont", sans-serif;
  font-size: 15px;
  font-weight: 200;
  line-height: 1.7;
  letter-spacing: -0.018em;

  @media (max-width: 700px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

const VenueLayout = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 35px;
  align-items: stretch;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const VenueInfo = styled.div`
  position: relative;
  min-width: 0;
  min-height: 500px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  padding: 44px;

  border: 1px solid #c6e3fb;
  border-radius: 24px;

  background: #ffffff;

  box-shadow: 0 25px 70px rgba(8, 54, 114, 0.06),
    0 2px 10px rgba(8, 54, 114, 0.025);

  @media (max-width: 850px) {
    min-height: 500px;
  }

  @media (max-width: 600px) {
    min-height: 480px;
    padding: 30px;
    border-radius: 20px;
  }
`;

const Top = styled.div`
  position: relative;
  z-index: 2;
`;

const Bottom = styled.div`
  position: relative;
  z-index: 2;
`;

const VenueNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border: 1px solid rgba(0, 103, 212, 0.3);
  border-radius: 50%;

  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.12em;
`;

const VenueTitle = styled.h3`
  margin: 58px 0 0;

  color: #083672;

  font-family: "Chillen", sans-serif;
  font-size: clamp(42px, 4vw, 58px);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.07em;

  @media (max-width: 850px) {
    margin-top: 45px;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const VenueLocation = styled.p`
  margin: 24px 0 0;

  color: #555555;

  font-family: "Mont", sans-serif;
  font-size: 14px;
  font-weight: 200;
  line-height: 1.65;
  letter-spacing: -0.01em;
`;

const VenueMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  padding-top: 28px;

  border-top: 1px solid #c6e3fb;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const MetaLabel = styled.span`
  color: #0067d4;

  font-family: "Chillen", sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.16em;
`;

const MetaValue = styled.span`
  color: #083672;

  font-family: "Mont", sans-serif;
  font-size: 12px;
  font-weight: 200;
  line-height: 1.4;
`;

const Directions = styled.a`
  width: fit-content;

  display: inline-flex;
  align-items: center;
  gap: 14px;

  margin-top: 28px;
  padding: 14px 20px;

  border-radius: 999px;

  background: #083672;
  color: #ffffff;

  font-family: "Chillen", sans-serif;
  font-size: 11px;
  font-weight: 400;

  text-decoration: none;

  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: #0067d4;
    box-shadow: 0 12px 25px rgba(0, 103, 212, 0.2);
  }

  &:focus-visible {
    outline: 3px solid #0067d4;
    outline-offset: 4px;
  }
`;

const Arrow = styled.span`
  font-size: 16px;
  line-height: 1;

  transition: transform 0.3s ease;

  ${Directions}:hover & {
    transform: translate(2px, -2px);
  }
`;

const CardGlow = styled.div`
  position: absolute;

  width: 280px;
  height: 280px;

  right: -120px;
  bottom: -130px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(0, 103, 212, 0.14) 0%,
    rgba(198, 227, 251, 0.18) 38%,
    transparent 70%
  );

  pointer-events: none;
`;

const MapWrapper = styled.div`
  min-width: 0;
  min-height: 500px;
  height: 100%;

  overflow: hidden;

  border-radius: 24px;

  box-shadow: 0 25px 70px rgba(8, 54, 114, 0.08),
    0 2px 10px rgba(8, 54, 114, 0.025);

  @media (max-width: 850px) {
    min-height: 430px;
    height: 430px;
  }

  @media (max-width: 600px) {
    min-height: 350px;
    height: 350px;
    border-radius: 20px;
  }
`;
