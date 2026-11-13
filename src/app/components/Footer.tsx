"use client";

import Image from "next/image";
import styled from "styled-components";

type FooterProps = {
  onReserve: () => void;
};

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer({ onReserve }: FooterProps) {
  const handleBackToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Section id="footer">
      <Container>
        <Top>
          <BrandSide>
            <LogoWrapper>
              <Image
                src="/images/opexwhite.webp"
                alt="OPEX Consulting"
                width={100}
                height={40}
              />
            </LogoWrapper>

            <Eyebrow>OPEX EXECUTIVE WORKSHOP & SUMMIT 2026</Eyebrow>

            <Heading>
              From Manual
              <br />
              <Accent>Risk Assessment</Accent>
              <br />
              to Intelligent
              <br />
              Risk Operations.
            </Heading>

            <Description>
              Explore how AI is transforming enterprise risk management in
              financial institutions.
            </Description>
          </BrandSide>

          <ActionSide>
            <LiveBadge>
              <StatusDot />
              LIVE ON ZOOM
            </LiveBadge>

            <EventDate>
              Thursday
              <br />
              <strong>19 November 2026</strong>
            </EventDate>

            <EventTime>
              <TimeIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 7v5l3 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </TimeIcon>
              11:00 AM WAT
            </EventTime>

            <Venue>
              Online event
              <br />
              Join from anywhere.
            </Venue>

            <ReserveButton type="button" onClick={onReserve}>
              Register for the event
              <ButtonArrow aria-hidden="true">↗</ButtonArrow>
            </ReserveButton>

            <ButtonNote>
              Registration is required to join the meeting.
            </ButtonNote>
          </ActionSide>
        </Top>

        <Middle>
          <Navigation>
            <NavTitle>EXPLORE</NavTitle>

            <NavLinks>
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </NavLinks>
          </Navigation>

          <Contact>
            <ContactTitle>ENQUIRIES</ContactTitle>

            <ContactLinks>
              <ContactLink href="tel:+2348087477190">
                +234 808 747 7190
              </ContactLink>

              <ContactLink href="tel:+2348024611363">
                +234 802 461 1363
              </ContactLink>

              <ContactLink href="mailto:info@opexconsult.co.uk">
                info@opexconsult.co.uk
              </ContactLink>
            </ContactLinks>
          </Contact>
        </Middle>

        <Bottom>
          <Copyright>
            © {new Date().getFullYear()} OPEX Consulting LTD
          </Copyright>

          <Hosted>AN OPEX CONSULTING LTD EVENT</Hosted>

          <BackToTop href="#top" onClick={handleBackToTop}>
            Back to top
            <TopArrow aria-hidden="true">↑</TopArrow>
          </BackToTop>
        </Bottom>
      </Container>
    </Section>
  );
}

const Section = styled.footer`
  width: 100%;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  padding: 100px 0 24px;
  background: #083672;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 700px) {
    padding: 72px 0 24px;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: min(1200px, 90vw);
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 80px;
  padding-bottom: 85px;
  border-bottom: 1px solid rgba(198, 227, 251, 0.2);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 55px;
    padding-bottom: 60px;
  }

  @media (max-width: 480px) {
    gap: 42px;
  }
`;

const BrandSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoWrapper = styled.div`
  width: 88px;
  margin-bottom: 38px;

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 700px) {
    width: 76px;
    margin-bottom: 30px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 22px;
  color: #c6e3fb;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.8;
  letter-spacing: 0.13em;
`;

const Heading = styled.h2`
  max-width: 760px;
  margin: 0;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(35px, 5vw, 65px);
  font-weight: 500;
  line-height: 1.13;
  letter-spacing: -0.065em;

  @media (max-width: 480px) {
    font-size: clamp(32px, 8.5vw, 43px);
    line-height: 1.2;
    letter-spacing: -0.055em;
  }
`;

const Accent = styled.span`
  color: #c6e3fb;
`;

const Description = styled.p`
  max-width: 450px;
  margin: 26px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.9;

  @media (max-width: 700px) {
    margin-top: 22px;
    font-size: 13px;
  }
`;

const ActionSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10px;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const LiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding: 10px 13px;
  border: 1px solid rgba(198, 227, 251, 0.3);
  border-radius: 999px;
  color: #c6e3fb;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.13em;
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #c6e3fb;
`;

const EventDate = styled.div`
  color: #ffffff;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.04em;

  strong {
    display: inline-block;
    margin-top: 3px;
    font-size: clamp(23px, 2.7vw, 30px);
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: -0.055em;
  }

  @media (max-width: 480px) {
    font-size: 19px;

    strong {
      font-size: 24px;
    }
  }
`;

const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: #c6e3fb;
  font-size: 13px;
  font-weight: 500;
`;

const TimeIcon = styled.svg`
  width: 19px;
  height: 19px;
  flex-shrink: 0;
`;

const Venue = styled.p`
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.9;
`;

const ReserveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 54px;
  margin-top: 30px;
  padding: 0 23px;
  border: 1px solid #c6e3fb;
  border-radius: 999px;
  background: #c6e3fb;
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease,
    transform 200ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #ffffff;
    background: #ffffff;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
  }

  @media (max-width: 480px) {
    min-height: 51px;
    padding: 0 19px;
    font-size: 11px;
  }
`;

const ButtonArrow = styled.span`
  font-size: 16px;
  font-weight: 400;
  transition: transform 200ms ease;

  ${ReserveButton}:hover & {
    transform: translate(2px, -2px);
  }
`;

const ButtonNote = styled.p`
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.56);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.7;
`;

const Middle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  padding: 55px 0;
  border-bottom: 1px solid rgba(198, 227, 251, 0.2);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 42px;
    padding: 45px 0;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

const NavTitle = styled.p`
  margin: 0;
  color: #c6e3fb;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 27px;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  transition: color 180ms ease;

  &:hover {
    color: #c6e3fb;
  }

  &:focus-visible {
    outline: 2px solid #c6e3fb;
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

const ContactTitle = styled.p`
  margin: 0;
  color: #c6e3fb;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
`;

const ContactLink = styled.a`
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 180ms ease;

  &:hover {
    color: #c6e3fb;
  }

  &:focus-visible {
    outline: 2px solid #c6e3fb;
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 20px;
  min-height: 76px;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 17px;
    padding: 25px 0 5px;
  }
`;

const Copyright = styled.span`
  color: rgba(255, 255, 255, 0.57);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.7;
`;

const Hosted = styled.span`
  color: rgba(255, 255, 255, 0.57);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-align: center;

  @media (max-width: 700px) {
    text-align: left;
  }
`;

const BackToTop = styled.a`
  display: inline-flex;
  align-items: center;
  justify-self: end;
  gap: 10px;
  color: #c6e3fb;
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  transition: color 180ms ease;

  &:hover {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #c6e3fb;
    outline-offset: 4px;
    border-radius: 3px;
  }

  @media (max-width: 700px) {
    justify-self: auto;
  }
`;

const TopArrow = styled.span`
  font-size: 16px;
  font-weight: 400;
  transition: transform 180ms ease;

  ${BackToTop}:hover & {
    transform: translateY(-3px);
  }
`;
