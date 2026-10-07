"use client";

import Image from "next/image";
import styled from "styled-components";

type FooterProps = {
  onReserve: () => void;
};

export default function Footer({ onReserve }: FooterProps) {
  return (
    <Section id="footer">
      <Container>
        <Top>
          <BrandSide>
            <LogoWrapper>
              <Image
                src="/images/opexwhite.webp"
                alt="OPEX Consulting"
                width={78}
                height={31}
              />
            </LogoWrapper>

            <Heading>
              <HeadlineLight>The End</HeadlineLight>
              <br />
              <HeadlineBrand>
                of <Accent>Manual.</Accent>
              </HeadlineBrand>
            </Heading>

            <Description>
              AI, connected systems and the future of financial reporting and
              compliance.
            </Description>
          </BrandSide>

          <ActionSide>
            <ActionLabel>OPEX EXECUTIVE WORKSHOP & SUMMIT 2026</ActionLabel>

            <EventDate>
              Wednesday
              <br />
              <strong>21 October 2026</strong>
            </EventDate>

            <Venue>
              The Wheatbaker
              <br />
              Ikoyi, Lagos
            </Venue>

            <ReserveButton type="button" onClick={onReserve}>
              Reserve your seat
            </ReserveButton>
          </ActionSide>
        </Top>

        <Middle>
          <Navigation>
            <NavTitle>EXPLORE</NavTitle>

            <NavLinks>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#agenda">Agenda</NavLink>
              <NavLink href="#sessions">Sessions</NavLink>
              <NavLink href="#invitees">Invitees</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
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
          <Copyright>© 2026 OPEX Consulting LTD</Copyright>

          <Hosted>
            HOSTED BY <strong>OPEX CONSULTING LTD</strong>
          </Hosted>

          <BackToTop
            href="#top"
            onClick={(event) => {
              event.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Back to top
            <TopArrow>↑</TopArrow>
          </BackToTop>
        </Bottom>
      </Container>
    </Section>
  );
}

const Section = styled.footer`
  position: relative;

  width: 100%;

  background: #083672;
  color: #ffffff;

  padding: 110px 0 30px;

  overflow: hidden;

  &::before {
    content: "";

    position: absolute;

    width: 600px;
    height: 600px;

    top: -350px;
    right: -200px;

    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(0, 103, 212, 0.2),
      transparent 65%
    );

    pointer-events: none;
  }

  &::after {
    content: "";

    position: absolute;

    width: 450px;
    height: 450px;

    bottom: -300px;
    left: -200px;

    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(198, 227, 251, 0.08),
      transparent 65%
    );

    pointer-events: none;
  }

  @media (max-width: 700px) {
    padding: 80px 0 25px;
  }
`;

const Container = styled.div`
  width: min(1200px, 90vw);

  margin: 0 auto;

  position: relative;

  z-index: 1;
`;

const Top = styled.div`
  display: grid;

  grid-template-columns: 1.2fr 0.8fr;

  gap: 100px;

  padding-bottom: 100px;

  border-bottom: 1px solid rgba(198, 227, 251, 0.16);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;

    gap: 65px;

    padding-bottom: 70px;
  }
`;

const BrandSide = styled.div`
  display: flex;

  flex-direction: column;

  align-items: flex-start;
`;

const LogoWrapper = styled.div`
  width: 78px;

  margin-bottom: 42px;

  opacity: 0.95;

  img {
    width: 100%;
    height: auto;

    display: block;

    object-fit: contain;
  }

  @media (max-width: 700px) {
    width: 72px;

    margin-bottom: 36px;
  }
`;

const Heading = styled.h2`
  margin: 0;

  color: #ffffff;

  letter-spacing: -0.08em;

  line-height: 0.84;

  @media (max-width: 700px) {
    line-height: 0.86;
  }
`;

const HeadlineLight = styled.span`
  font-family: "Mont", sans-serif;

  font-size: clamp(52px, 6vw, 86px);

  font-weight: 200;

  letter-spacing: -0.075em;
`;

const HeadlineBrand = styled.span`
  font-family: "Chillen", sans-serif;

  font-size: clamp(78px, 9vw, 132px);

  font-weight: 400;

  line-height: 0.78;

  letter-spacing: -0.08em;
`;

const Accent = styled.span`
  color: #c6e3fb;
`;

const Description = styled.p`
  max-width: 430px;

  margin-top: 35px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 15px;

  font-weight: 200;

  line-height: 1.65;

  letter-spacing: -0.015em;

  @media (max-width: 700px) {
    font-size: 14px;

    margin-top: 30px;
  }
`;

const ActionSide = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: flex-end;

  align-items: flex-start;

  padding-bottom: 4px;
`;

const ActionLabel = styled.span`
  margin-bottom: 25px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 10px;

  font-weight: 200;

  letter-spacing: 0.14em;

  line-height: 1.5;
`;

const EventDate = styled.div`
  color: #ffffff;

  font-family: "Mont", sans-serif;

  font-size: 26px;

  font-weight: 200;

  line-height: 1.15;

  letter-spacing: -0.04em;

  strong {
    font-family: "Chillen", sans-serif;

    font-size: 27px;

    font-weight: 400;

    letter-spacing: -0.02em;
  }

  @media (max-width: 700px) {
    font-size: 23px;

    strong {
      font-size: 24px;
    }
  }
`;

const Venue = styled.p`
  margin-top: 22px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 14px;

  font-weight: 200;

  line-height: 1.6;
`;

const ReserveButton = styled.button`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  margin-top: 35px;

  min-height: 52px;

  padding: 0 28px;

  border: 0;

  border-radius: 999px;

  background: #c6e3fb;

  color: #083672;

  font-family: "Chillen", sans-serif;

  font-size: 16px;

  font-weight: 400;

  cursor: pointer;

  box-shadow: 0 10px 30px rgba(0, 103, 212, 0.18);

  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-4px);

    background: #ffffff;

    box-shadow: 0 18px 45px rgba(0, 103, 212, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(-1px) scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid #c6e3fb;

    outline-offset: 4px;
  }

  @media (max-width: 700px) {
    min-height: 50px;

    padding: 0 26px;

    font-size: 15px;
  }
`;

const Middle = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 100px;

  padding: 65px 0;

  border-bottom: 1px solid rgba(198, 227, 251, 0.16);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;

    gap: 50px;

    padding: 55px 0;
  }
`;

const Navigation = styled.div`
  display: flex;

  flex-direction: column;

  gap: 24px;
`;

const NavTitle = styled.span`
  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 10px;

  font-weight: 200;

  letter-spacing: 0.14em;
`;

const NavLinks = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 12px 28px;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.78);

  font-family: "Mont", sans-serif;

  font-size: 14px;

  font-weight: 200;

  letter-spacing: 0.01em;

  text-decoration: none;

  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #c6e3fb;

    transform: translateX(3px);
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

  gap: 24px;
`;

const ContactTitle = styled.span`
  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 10px;

  font-weight: 200;

  letter-spacing: 0.14em;
`;

const ContactLinks = styled.div`
  display: flex;

  flex-direction: column;

  gap: 11px;
`;

const ContactLink = styled.a`
  width: fit-content;

  color: rgba(255, 255, 255, 0.78);

  font-family: "Mont", sans-serif;

  font-size: 14px;

  font-weight: 200;

  letter-spacing: 0.01em;

  text-decoration: none;

  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffffff;

    transform: translateX(3px);
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

  min-height: 80px;

  gap: 30px;

  @media (max-width: 700px) {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 18px;

    padding: 25px 0 5px;
  }
`;

const Copyright = styled.span`
  color: rgba(198, 227, 251, 0.68);

  font-family: "Mont", sans-serif;

  font-size: 10px;

  font-weight: 200;

  letter-spacing: 0.03em;
`;

const Hosted = styled.span`
  color: rgba(198, 227, 251, 0.68);

  font-family: "Mont", sans-serif;

  font-size: 9px;

  font-weight: 200;

  letter-spacing: 0.08em;

  text-align: center;

  strong {
    color: #c6e3fb;

    font-family: "Chillen", sans-serif;

    font-weight: 400;
  }

  @media (max-width: 700px) {
    text-align: left;
  }
`;

const BackToTop = styled.a`
  justify-self: end;

  display: inline-flex;

  align-items: center;

  gap: 10px;

  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 11px;

  font-weight: 200;

  text-decoration: none;

  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffffff;

    transform: translateY(-2px);
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
  color: #c6e3fb;

  font-family: "Mont", sans-serif;

  font-size: 15px;

  font-weight: 200;

  transition: transform 0.3s ease, color 0.3s ease;

  ${BackToTop}:hover & {
    transform: translateY(-3px);

    color: #ffffff;
  }
`;
