"use client";
import styled from "styled-components";

interface SpinnerProps {
  size?: number;
  thickness?: number;
}

export default function Spinner({ size = 28, thickness = 2 }: SpinnerProps) {
  return (
    <Wrapper
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-thickness": `${thickness}px`,
        } as React.CSSProperties
      }
      role="status"
      aria-label="Loading"
    >
      <Circle />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.span`
  display: block;

  width: var(--spinner-size);
  height: var(--spinner-size);

  border: var(--spinner-thickness) solid #c6e3fb;
  border-top-color: #0067d4;

  border-radius: 50%;

  animation: spinnerRotate 0.8s linear infinite;

  @keyframes spinnerRotate {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.5s;
  }
`;
