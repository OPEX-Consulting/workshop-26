"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

type NavbarProps = {
  onReserve: () => void;
};

export default function Navbar({ onReserve }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    const footer = document.getElementById("footer");

    if (!footer) {
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAtFooter(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      observer.disconnect();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleReserve = () => {
    closeMenu();
    onReserve();
  };

  return (
    <NavWrapper $scrolled={scrolled} $atFooter={atFooter}>
      <NavbarContainer $scrolled={scrolled} $atFooter={atFooter}>
        <Logo
          href="/"
          onClick={closeMenu}
          aria-label="OPEX Consulting home"
          $scrolled={scrolled}
          $atFooter={atFooter}
        >
          <Image
            src="/images/opexwhite.webp"
            alt="OPEX Consulting"
            width={80}
            height={30}
            priority
          />
        </Logo>

        <DesktopNavigation aria-label="Main navigation">
          <NavLink href="#about" $scrolled={scrolled} $atFooter={atFooter}>
            About
          </NavLink>

          <NavLink href="#agenda" $scrolled={scrolled} $atFooter={atFooter}>
            Agenda
          </NavLink>

          <NavLink href="#sessions" $scrolled={scrolled} $atFooter={atFooter}>
            Sessions
          </NavLink>

          <NavLink href="#invitees" $scrolled={scrolled} $atFooter={atFooter}>
            Invitees
          </NavLink>

          <NavLink href="#faq" $scrolled={scrolled} $atFooter={atFooter}>
            FAQ
          </NavLink>
        </DesktopNavigation>

        <DesktopCTA
          type="button"
          onClick={handleReserve}
          $scrolled={scrolled}
          $atFooter={atFooter}
        >
          Reserve your seat
        </DesktopCTA>

        <MobileMenuButton
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          $scrolled={scrolled}
          $atFooter={atFooter}
        >
          <MenuLine
            $open={menuOpen}
            $scrolled={scrolled}
            $atFooter={atFooter}
          />

          <MenuLine
            $open={menuOpen}
            $scrolled={scrolled}
            $atFooter={atFooter}
          />
        </MobileMenuButton>
      </NavbarContainer>

      <MobileMenu
        id="mobile-navigation"
        $open={menuOpen}
        $atFooter={atFooter}
        aria-label="Mobile navigation"
      >
        <MobileLink href="#about" onClick={closeMenu} $atFooter={atFooter}>
          About
        </MobileLink>

        <MobileLink href="#agenda" onClick={closeMenu} $atFooter={atFooter}>
          Agenda
        </MobileLink>

        <MobileLink href="#sessions" onClick={closeMenu} $atFooter={atFooter}>
          Sessions
        </MobileLink>

        <MobileLink href="#invitees" onClick={closeMenu} $atFooter={atFooter}>
          Invitees
        </MobileLink>

        <MobileLink href="#faq" onClick={closeMenu} $atFooter={atFooter}>
          FAQ
        </MobileLink>

        <MobileCTA type="button" onClick={handleReserve} $atFooter={atFooter}>
          Reserve your seat
        </MobileCTA>
      </MobileMenu>
    </NavWrapper>
  );
}

const NavWrapper = styled.header<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  position: ${({ $scrolled }) => ($scrolled ? "fixed" : "absolute")};

  top: ${({ $scrolled }) => ($scrolled ? "14px" : "0")};

  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: center;

  padding: ${({ $scrolled }) => ($scrolled ? "0" : "0 7vw")};

  pointer-events: none;

  transition: top 0.35s ease, padding 0.35s ease;

  @media (max-width: 768px) {
    top: ${({ $scrolled }) => ($scrolled ? "12px" : "0")};

    padding: ${({ $scrolled }) => ($scrolled ? "0" : "0 5vw")};
  }
`;

const NavbarContainer = styled.nav<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  position: relative;

  width: ${({ $scrolled }) => ($scrolled ? "min(920px, 92vw)" : "100%")};

  max-width: ${({ $scrolled }) => ($scrolled ? "760px" : "1320px")};

  height: ${({ $scrolled }) => ($scrolled ? "58px" : "76px")};

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ $scrolled }) => ($scrolled ? "0 18px" : "0")};

  border-radius: ${({ $scrolled }) => ($scrolled ? "100px" : "0")};

  background: ${({ $atFooter, $scrolled }) => {
    if ($atFooter) {
      return "#c6e3fb";
    }

    if ($scrolled) {
      return "#083672";
    }

    return "transparent";
  }};

  box-shadow: ${({ $atFooter, $scrolled }) => {
    if ($atFooter) {
      return "0 14px 45px rgba(8, 54, 114, 0.12)";
    }

    if ($scrolled) {
      return "0 14px 45px rgba(0, 0, 0, 0.25)";
    }

    return "none";
  }};

  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};

  -webkit-backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(20px)" : "none"};

  transition: width 0.4s ease, max-width 0.4s ease, height 0.35s ease,
    padding 0.35s ease, background 0.35s ease, border-radius 0.35s ease,
    box-shadow 0.35s ease;

  pointer-events: auto;

  @media (max-width: 768px) {
    width: ${({ $scrolled }) => ($scrolled ? "92vw" : "100%")};

    max-width: none;

    height: ${({ $scrolled }) => ($scrolled ? "56px" : "68px")};

    padding: ${({ $scrolled }) => ($scrolled ? "0 15px" : "0")};

    border-radius: ${({ $scrolled }) => ($scrolled ? "100px" : "0")};

    background: ${({ $atFooter, $scrolled }) => {
      if ($atFooter) {
        return "#c6e3fb";
      }

      if ($scrolled) {
        return "#083672";
      }

      return "transparent";
    }};

    box-shadow: ${({ $atFooter, $scrolled }) => {
      if ($atFooter) {
        return "0 12px 35px rgba(8, 54, 114, 0.12)";
      }

      if ($scrolled) {
        return "0 12px 35px rgba(0, 0, 0, 0.28)";
      }

      return "none";
    }};
  }
`;

const Logo = styled.a<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  border-radius: 8px;

  img {
    display: block;

    width: ${({ $scrolled }) => ($scrolled ? "60px" : "68px")};

    height: auto;

    filter: ${({ $atFooter }) =>
      $atFooter ? "brightness(0) contrast(1.05)" : "none"};

    transition: width 0.35s ease, filter 0.35s ease, opacity 0.35s ease;
  }

  &:focus-visible {
    outline: 3px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    outline-offset: 5px;
  }

  @media (max-width: 768px) {
    img {
      width: ${({ $scrolled }) => ($scrolled ? "57px" : "62px")};
    }
  }
`;

const DesktopNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media (max-width: 950px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  position: relative;

  color: ${({ $atFooter }) => ($atFooter ? "#083672" : "#ffffff")};

  font-family: "Chillen", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.01em;

  border-radius: 6px;

  transition: color 0.25s ease, transform 0.25s ease;

  &::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: -5px;

    width: 0;
    height: 1px;

    background: ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    transition: width 0.25s ease;
  }

  &:hover {
    color: ${({ $atFooter }) => ($atFooter ? "#0067d4" : "#c6e3fb")};

    transform: translateY(-1px);
  }

  &:hover::after {
    width: 100%;
  }

  &:focus-visible {
    outline: 3px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    outline-offset: 5px;

    color: ${({ $atFooter }) => ($atFooter ? "#0067d4" : "#c6e3fb")};
  }
`;

const DesktopCTA = styled.button<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 46px;
  padding: 0 21px;

  border: 0;
  border-radius: 100px;

  background: ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

  color: ${({ $atFooter }) => ($atFooter ? "#ffffff" : "#083672")};

  font-family: "Chillen", sans-serif;
  font-size: 12px;
  font-weight: 400;

  white-space: nowrap;

  cursor: pointer;

  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: #0067d4;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 103, 212, 0.18);
  }

  &:focus-visible {
    outline: 3px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    outline-offset: 4px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button<{
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  display: none;

  width: 42px;
  height: 42px;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 6px;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background: ${({ $atFooter, $scrolled }) => {
    if ($atFooter) {
      return "rgba(8, 54, 114, 0.08)";
    }

    if ($scrolled) {
      return "rgba(198, 227, 251, 0.14)";
    }

    return "rgba(255, 255, 255, 0.1)";
  }};

  cursor: pointer;

  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    transform: scale(1.04);

    background: ${({ $atFooter, $scrolled }) => {
      if ($atFooter) {
        return "rgba(8, 54, 114, 0.14)";
      }

      if ($scrolled) {
        return "rgba(198, 227, 251, 0.24)";
      }

      return "rgba(255, 255, 255, 0.18)";
    }};
  }

  &:focus-visible {
    outline: 3px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLine = styled.span<{
  $open: boolean;
  $scrolled: boolean;
  $atFooter: boolean;
}>`
  display: block;

  width: 17px;
  height: 1.5px;

  border-radius: 10px;

  background: ${({ $atFooter }) => ($atFooter ? "#083672" : "#ffffff")};

  transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;

  &:first-child {
    transform: ${({ $open }) =>
      $open ? "translateY(3.75px) rotate(45deg)" : "none"};
  }

  &:last-child {
    transform: ${({ $open }) =>
      $open ? "translateY(-3.75px) rotate(-45deg)" : "none"};
  }
`;

const MobileMenu = styled.div<{
  $open: boolean;
  $atFooter: boolean;
}>`
  display: none;

  @media (max-width: 768px) {
    position: absolute;

    top: 76px;
    left: 4vw;

    width: 92vw;

    padding: 20px;

    display: flex;
    flex-direction: column;

    gap: 4px;

    border-radius: 24px;

    background: ${({ $atFooter }) => ($atFooter ? "#c6e3fb" : "#083672")};

    box-shadow: ${({ $atFooter }) =>
      $atFooter
        ? "0 20px 60px rgba(8, 54, 114, 0.14)"
        : "0 20px 60px rgba(0, 0, 0, 0.3)"};

    opacity: ${({ $open }) => ($open ? 1 : 0)};

    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};

    transform: ${({ $open }) =>
      $open ? "translateY(0)" : "translateY(-10px)"};

    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};

    transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.25s ease,
      background 0.3s ease;
  }
`;

const MobileLink = styled.a<{
  $atFooter: boolean;
}>`
  display: flex;
  align-items: center;

  min-height: 46px;

  padding: 0 14px;

  border-radius: 10px;

  color: ${({ $atFooter }) => ($atFooter ? "#083672" : "#ffffff")};

  font-family: "Chillen", sans-serif;
  font-size: 14px;
  font-weight: 400;

  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ $atFooter }) =>
      $atFooter ? "rgba(8, 54, 114, 0.08)" : "rgba(198, 227, 251, 0.12)"};

    color: ${({ $atFooter }) => ($atFooter ? "#0067d4" : "#c6e3fb")};
  }

  &:focus-visible {
    outline: 2px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

    outline-offset: 2px;
  }
`;

const MobileCTA = styled.button<{
  $atFooter: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 50px;

  margin-top: 10px;

  border: 0;
  border-radius: 100px;

  background: ${({ $atFooter }) => ($atFooter ? "#083672" : "#c6e3fb")};

  color: ${({ $atFooter }) => ($atFooter ? "#ffffff" : "#083672")};

  font-family: "Chillen", sans-serif;
  font-size: 13px;
  font-weight: 400;

  cursor: pointer;

  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;

  &:hover {
    background: #0067d4;
    color: #ffffff;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ $atFooter }) => ($atFooter ? "#083672" : "#ffffff")};

    outline-offset: 3px;
  }
`;
