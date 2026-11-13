"use client";

import styled, { keyframes } from "styled-components";

const items = [
  "AI & AUTOMATION",
  "FINANCIAL REPORTING",
  "REGULATORY COMPLIANCE",
  "CONNECTED SYSTEMS",
  "RISK & GOVERNANCE",
  "THE FUTURE OF FINANCE",
];

export default function Marquee() {
  return (
    <Container aria-label="RegTech365 areas of expertise">
      <Track>
        {[0, 1].map((group) => (
          <Group key={group} aria-hidden={group === 1}>
            {items.map((item) => (
              <Item key={item}>
                <Text>{item}</Text>
                <Dot />
              </Item>
            ))}
          </Group>
        ))}
      </Track>
    </Container>
  );
}

const marquee = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
`;

const Container = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #ffffff;
  padding: 30px 0;
  border-top: 1px solid rgba(8, 54, 114, 0.1);
  border-bottom: 1px solid rgba(8, 54, 114, 0.1);

  @media (max-width: 768px) {
    padding: 25px 0;
  }

  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
  animation: ${marquee} 38s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    will-change: auto;
  }
`;

const Group = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 38px;
  padding: 0 30px;

  @media (max-width: 768px) {
    gap: 26px;
    padding: 0 22px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 18px;
  }
`;

const Text = styled.span`
  color: #083672;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(25px, 3vw, 46px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.045em;
  white-space: nowrap;
  text-transform: uppercase;
  transition: color 200ms ease;

  ${Item}:hover & {
    color: #0067d4;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }
`;

const Dot = styled.span`
  position: relative;
  display: block;
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  border-radius: 50%;
  background: #00a6d8;

  &::after {
    position: absolute;
    inset: -5px;
    border: 1px solid rgba(0, 166, 216, 0.22);
    border-radius: 50%;
    content: "";
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
    flex-basis: 6px;
  }
`;
