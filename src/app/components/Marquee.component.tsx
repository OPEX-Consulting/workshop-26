"use client";

import styled, { keyframes } from "styled-components";

export default function Marquee() {
  const items = [
    "AI & AUTOMATION",
    "FINANCIAL REPORTING",
    "REGULATORY COMPLIANCE",
    "CONNECTED SYSTEMS",
    "RISK & GOVERNANCE",
    "THE FUTURE OF FINANCE",
  ];

  return (
    <Container>
      <Track>
        {[...items, ...items].map((item, index) => (
          <Item key={`${item}-${index}`}>
            <Text>{item}</Text>
            <Dot />
          </Item>
        ))}
      </Track>
    </Container>
  );
}

const marquee = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`;

const Container = styled.section`
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  padding: 38px 0;
  white-space: nowrap;
  border-top: 1px solid #c6e3fb;
  border-bottom: 1px solid #c6e3fb;

  @media (max-width: 768px) {
    padding: 30px 0;
  }
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  animation: ${marquee} 32s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;
  padding: 0 34px;

  @media (max-width: 768px) {
    gap: 30px;
    padding: 0 24px;
  }
`;

const Text = styled.span`
  color: #083672;
  font-family: "Chillen", sans-serif;
  font-size: clamp(28px, 3.2vw, 52px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.055em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #0067d4;

  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;
