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
            <SectionTitle>Personal data & event media</SectionTitle>
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
            <SectionTitle>Marketing & exclusive rewards</SectionTitle>

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
          >
            Save preferences
          </SaveButton>
        </Actions>
      </Modal>
    </Overlay>
  );
}

/* Icons */

function ShieldIcon() {
  return (
    <svg
      width="23"
      height="23"
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

/* Apple-inspired modal styling */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  overflow-y: auto;
  background: rgba(15, 15, 17, 0.48);
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

  @media (max-width: 500px) {
    align-items: flex-start;
    padding: 14px;
  }
`;

const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: calc(100dvh - 44px);
  overflow-y: auto;
  padding: 30px 34px 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  background: #ffffff;
  color: #1d1d1f;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.2), 0 3px 12px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  scrollbar-color: #d2d2d7 transparent;

  @media (max-width: 500px) {
    max-height: calc(100dvh - 28px);
    padding: 23px 20px 20px;
    border-radius: 20px;
  }

  @media (max-width: 360px) {
    padding: 20px 16px 17px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
`;

const PrivacyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(0, 113, 227, 0.1);
  border-radius: 14px;
  background: #f0f6ff;
  color: #0071e3;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #f5f5f7;
  color: #6e6e73;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: #e8e8ed;
    color: #1d1d1f;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #0071e3;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
`;

const Title = styled.h2`
  margin: 0;
  color: #1d1d1f;
  font-size: clamp(34px, 6vw, 47px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.065em;
`;

const TitleAccent = styled.span`
  color: #0071e3;
`;

const Description = styled.p`
  max-width: 440px;
  margin: 16px 0 23px;
  color: #6e6e73;
  font-size: 12px;
  line-height: 1.9;
`;

const Divider = styled.div`
  height: 1px;
  margin: 20px 0;
  background: #e8e8ed;
`;

const ConsentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.02em;
`;

const RequiredBadge = styled.span`
  flex-shrink: 0;
  padding: 6px 8px;
  border-radius: 999px;
  background: #f0f6ff;
  color: #0066cc;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.07em;
`;

const OptionalBadge = styled.span`
  flex-shrink: 0;
  padding: 6px 8px;
  border: 1px solid #e5e5ea;
  border-radius: 999px;
  background: #fafafa;
  color: #6e6e73;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.07em;
`;

const ConsentText = styled.p`
  margin: 0;
  color: #626267;
  font-size: 11px;
  line-height: 1.9;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px;
  border: 1px solid #e8e8ed;
  border-radius: 12px;
  background: #fafafa;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: #c8d9f0;
    background: #f7faff;
  }
`;

const Checkbox = styled.input`
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  margin: 1px 0 0;
  accent-color: #0071e3;
  cursor: pointer;
`;

const CheckboxCopy = styled.span`
  color: #424245;
  font-size: 10px;
  line-height: 1.8;
`;

const ErrorText = styled.p`
  margin: -3px 0 0;
  color: #b42318;
  font-size: 10px;
  line-height: 1.7;
`;

const OptionalNote = styled.p`
  margin: -2px 0 0;
  color: #86868b;
  font-size: 10px;
  line-height: 1.7;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 27px;

  @media (max-width: 400px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const CancelButton = styled.button`
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid #e5e5ea;
  border-radius: 999px;
  background: #ffffff;
  color: #424245;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: #d2d2d7;
    background: #f5f5f7;
  }
`;

const SaveButton = styled.button<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  min-height: 44px;
  padding: 0 19px;
  border: 0;
  border-radius: 999px;
  background: ${({ $disabled }) => ($disabled ? "#a7c9ee" : "#0071e3")};
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
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

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const ButtonArrow = styled.span`
  font-size: 15px;
  line-height: 1;
`;

const FooterNote = styled.p`
  margin: 22px 0 0;
  color: #a1a1a6;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: center;
`;
