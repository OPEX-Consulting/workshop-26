"use client";

import { useState } from "react";
import styled from "styled-components";

export type PrivacyPreferences = {
  personalDataConsent: boolean;
  marketingConsent: boolean;
};

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: PrivacyPreferences) => void;
};

export default function PrivacyModal({
  isOpen,
  onClose,
  onSave,
}: PrivacyModalProps) {
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [showError, setShowError] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!personalDataConsent) {
      setShowError(true);
      return;
    }

    onSave({
      personalDataConsent,
      marketingConsent,
    });
  };

  return (
    <Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        aria-describedby="privacy-description"
      >
        <ModalHeader>
          <PrivacyIcon aria-hidden="true">
            <ShieldIcon />
          </PrivacyIcon>

          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="Close privacy preferences"
          >
            ×
          </CloseButton>
        </ModalHeader>

        <Eyebrow>YOUR PRIVACY MATTERS</Eyebrow>

        <Title id="privacy-title">
          Your data.
          <br />
          <TitleAccent>Your choice.</TitleAccent>
        </Title>

        <Description id="privacy-description">
          Before completing your registration, please review how OPEX Consulting
          uses your information and choose whether you would also like to
          receive marketing communications.
        </Description>

        <Divider />

        <ConsentSection>
          <SectionHeading>
            <SectionTitle>Personal data &amp; event media</SectionTitle>
            <RequiredBadge>REQUIRED</RequiredBadge>
          </SectionHeading>

          <ConsentText>
            I consent to OPEX Consulting, its subsidiary and its event partners
            collecting and processing the personal details I provide in this
            registration form for the purpose of managing my attendance at this
            event. I understand that by attending, I may appear in photographs
            and video recordings of the event, which OPEX Consulting and its
            subsidiary may use in their marketing, brand promotion and event
            communications.
          </ConsentText>

          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={personalDataConsent}
              onChange={(event) => {
                setPersonalDataConsent(event.target.checked);
                setShowError(false);
              }}
              required
            />

            <CheckboxCopy>
              I have read and agree to the required consent statement above.
            </CheckboxCopy>
          </CheckboxLabel>

          {showError && !personalDataConsent && (
            <ErrorText>
              Please provide the required consent to continue.
            </ErrorText>
          )}
        </ConsentSection>

        <Divider />

        <ConsentSection>
          <SectionHeading>
            <SectionTitle>Marketing &amp; exclusive rewards</SectionTitle>
            <OptionalBadge>OPTIONAL</OptionalBadge>
          </SectionHeading>

          <ConsentText>
            I would like to share feedback on the products and services of OPEX
            Consulting and its subsidiary for a chance to win exclusive rewards.
            I also agree to receive offers, promotions and other commercial
            messages, including personalised marketing emails from OPEX
            Consulting and its subsidiary. I understand that I can unsubscribe
            at any time.
          </ConsentText>

          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={marketingConsent}
              onChange={(event) => setMarketingConsent(event.target.checked)}
            />

            <CheckboxCopy>
              Yes, I would like to participate and receive marketing
              communications.
            </CheckboxCopy>
          </CheckboxLabel>

          <OptionalNote>
            This choice is optional and does not affect your event registration.
          </OptionalNote>
        </ConsentSection>

        <Actions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>

          <SaveButton
            type="button"
            onClick={handleSave}
            $disabled={!personalDataConsent}
            disabled={!personalDataConsent}
          >
            Save preferences
          </SaveButton>
        </Actions>
      </Modal>
    </Overlay>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3L19 6V11.5C19 16 16.1 19.1 12 21C7.9 19.1 5 16 5 11.5V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Overlay */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  overflow-y: auto;
  background: rgba(15, 15, 17, 0.52);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: overlayIn 180ms ease both;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    justify-content: center;
    padding: 12px;
    padding-top: max(12px, env(safe-area-inset-top));
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
`;

/* Modal */

const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 590px;
  max-height: calc(100dvh - 44px);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 32px 36px 26px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 25px;
  background: #ffffff;
  color: #1d1d1f;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.2), 0 3px 12px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  scrollbar-color: #d2d2d7 transparent;

  @media (max-width: 600px) {
    max-height: calc(
      100dvh - max(24px, env(safe-area-inset-top)) -
        max(24px, env(safe-area-inset-bottom))
    );
    padding: 24px 22px 22px;
    border-radius: 21px;
  }

  @media (max-width: 380px) {
    padding: 20px 17px 18px;
    border-radius: 18px;
  }

  @media (max-height: 700px) and (min-width: 601px) {
    padding-top: 23px;
    padding-bottom: 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  @media (max-width: 600px) {
    margin-bottom: 21px;
  }
`;

const PrivacyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(0, 113, 227, 0.1);
  border-radius: 15px;
  background: #f0f6ff;
  color: #0071e3;

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    border-radius: 13px;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #f5f5f7;
  color: #6e6e73;
  font-size: 25px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: #e8e8ed;
    color: #1d1d1f;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 113, 227, 0.35);
    outline-offset: 3px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #0071e3;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.13em;

  @media (max-width: 600px) {
    font-size: 10px;
    margin-bottom: 10px;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #1d1d1f;
  font-size: clamp(36px, 6vw, 48px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -0.06em;

  @media (max-width: 600px) {
    font-size: clamp(34px, 9vw, 42px);
    line-height: 1.1;
  }

  @media (max-width: 360px) {
    font-size: 32px;
  }
`;

const TitleAccent = styled.span`
  color: #0071e3;
`;

const Description = styled.p`
  max-width: 460px;
  margin: 17px 0 25px;
  color: #626267;
  font-size: 14px;
  line-height: 1.8;

  @media (max-width: 600px) {
    margin: 14px 0 21px;
    font-size: 14px;
    line-height: 1.75;
  }

  @media (max-width: 360px) {
    font-size: 13px;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 22px 0;
  background: #e8e8ed;

  @media (max-width: 600px) {
    margin: 19px 0;
  }
`;

const ConsentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 13px;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 360px) {
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #1d1d1f;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.5;
  letter-spacing: -0.025em;

  @media (max-width: 600px) {
    font-size: 15px;
  }

  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

const RequiredBadge = styled.span`
  flex-shrink: 0;
  padding: 6px 9px;
  border-radius: 999px;
  background: #f0f6ff;
  color: #0066cc;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.06em;
`;

const OptionalBadge = styled.span`
  flex-shrink: 0;
  padding: 6px 9px;
  border: 1px solid #e5e5ea;
  border-radius: 999px;
  background: #fafafa;
  color: #6e6e73;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.06em;
`;

const ConsentText = styled.p`
  margin: 0;
  color: #505055;
  font-size: 13px;
  line-height: 1.85;

  @media (max-width: 600px) {
    font-size: 13.5px;
    line-height: 1.8;
  }

  @media (max-width: 360px) {
    font-size: 13px;
    line-height: 1.75;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 15px;
  border: 1px solid #e8e8ed;
  border-radius: 13px;
  background: #fafafa;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: #c8d9f0;
    background: #f7faff;
  }

  &:focus-within {
    border-color: #0071e3;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
  }

  @media (max-width: 600px) {
    gap: 12px;
    padding: 14px 13px;
    border-radius: 12px;
  }
`;

const Checkbox = styled.input`
  flex-shrink: 0;
  width: 19px;
  height: 19px;
  margin: 2px 0 0;
  accent-color: #0071e3;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

const CheckboxCopy = styled.span`
  color: #38383c;
  font-size: 12px;
  line-height: 1.75;

  @media (max-width: 600px) {
    font-size: 13px;
    line-height: 1.7;
  }
`;

const ErrorText = styled.p`
  margin: -3px 0 0;
  color: #b42318;
  font-size: 12px;
  line-height: 1.7;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const OptionalNote = styled.p`
  margin: -2px 0 0;
  color: #747479;
  font-size: 12px;
  line-height: 1.7;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

/* Actions */

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 29px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 10px;
    margin-top: 24px;
  }
`;

const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-height: 47px;
  padding: 0 22px;
  border: 1px solid #e5e5ea;
  border-radius: 999px;
  background: #ffffff;
  color: #424245;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: #d2d2d7;
    background: #f5f5f7;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 113, 227, 0.3);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-height: 48px;
    font-size: 14px;
  }
`;

const SaveButton = styled.button<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 47px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  background: ${({ $disabled }) => ($disabled ? "#a7c9ee" : "#0071e3")};
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: background 160ms ease, transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    background: ${({ $disabled }) => ($disabled ? "#a7c9ee" : "#0077ed")};
    box-shadow: ${({ $disabled }) =>
      $disabled ? "none" : "0 5px 14px rgba(0, 113, 227, 0.2)"};
  }

  &:active {
    transform: ${({ $disabled }) => ($disabled ? "none" : "scale(0.98)")};
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 113, 227, 0.3);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-height: 50px;
    padding: 0 18px;
    font-size: 14px;
  }
`;

const ButtonArrow = styled.span`
  font-size: 17px;
  line-height: 1;
`;

const FooterNote = styled.p`
  margin: 23px 0 0;
  color: #929298;
  font-size: 9px;
  font-weight: 550;
  letter-spacing: 0.1em;
  text-align: center;

  @media (max-width: 600px) {
    margin-top: 19px;
    font-size: 9px;
  }
`;
