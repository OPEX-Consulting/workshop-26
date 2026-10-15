"use client";

import { FormEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import PrivacyModal, { type PrivacyPreferences } from "./PrivacyModal";

type RouteKey = "financial" | "sustainability" | "regtech" | "fullDay";
type SessionKey = "breakfast" | "summit";
type FormStep = "intro" | "routes" | "contact" | "success";

type Route = {
  key: RouteKey;
  letter: string;
  title: string;
  description: string;
  session: SessionKey;
};

type FormComponentProps = {
  onCancel: () => void;
};

const ROUTES: Route[] = [
  {
    key: "financial",
    letter: "A",
    title: "Financial Reporting & Regulatory Readiness",
    description:
      "IFRS 18 Implementation • Sustainability Disclosures (IFRS S1/S2) • FRCN/SEC/NGX RegCo Requirements • Reporting Accuracy • Data Integrity • Audit Assurance • Investor Confidence • Cost of Capital.",
    session: "breakfast",
  },
  {
    key: "sustainability",
    letter: "B",
    title: "Financial Automation & Consolidation",
    description:
      "Automated Group Financial Consolidation • Multi-Entity Reporting • Data Integration • Intercompany Reconciliation • Faster Close Cycles • Standardised Reporting • Reduced Manual Errors • Real-Time Financial Visibility.",
    session: "breakfast",
  },
  {
    key: "regtech",
    letter: "C",
    title: "AI Governance, Integrated GRC & Regulatory Compliance",
    description:
      "Responsible AI • Regulatory Compliance Automation • Enterprise GRC Integration • Continuous Controls Monitoring • Cybersecurity • Technology Risk • Auditability • Regulatory Reporting.",
    session: "summit",
  },
  {
    key: "fullDay",
    letter: "D",
    title: "Digital Trust, Resilience & Intelligent Operations",
    description:
      "AML Reporting Automation • Operational Resilience • Software Quality Assurance • Data Governance • Risk Intelligence • Automated Control Testing • Continuous Regulatory Readiness.",
    session: "summit",
  },
];

const SESSION_DETAILS: Record<
  SessionKey,
  { title: string; time: string; description: string }
> = {
  breakfast: {
    title: "Morning Financial Reporting & Automation Briefing",
    time: "8am – 11am WAT",
    description:
      "Financial reporting, regulatory readiness, automation and consolidation.",
  },
  summit: {
    title: "Afternoon C-Level Technical Summit",
    time: "11:30am – 4pm WAT",
    description:
      "AI governance, integrated GRC, regulatory compliance, digital trust and resilience.",
  },
};

const generateReference = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RDX-2026-${random}`;
};

export default function FormComponent({ onCancel }: FormComponentProps) {
  const [step, setStep] = useState<FormStep>("intro");
  const [route, setRoute] = useState<Route | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [organisation, setOrganisation] = useState("");

  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const selectRoute = (selectedRoute: Route) => {
    setRoute(selectedRoute);
    setSubmitError("");
    setStep("contact");
  };

  const goBackFromContact = () => {
    if (submitting) return;

    setSubmitError("");
    setStep("routes");
  };

  const handleRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!route || submitting) return;

    setSubmitError("");
    setPrivacyOpen(true);
  };

  const submitRegistration = async (preferences: PrivacyPreferences) => {
    if (!route || submitting) return;

    if (!preferences.personalDataConsent) {
      return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT?.trim();

    if (!endpoint) {
      setPrivacyOpen(false);
      setSubmitError(
        "Registration is temporarily unavailable. Please try again later."
      );

      console.error("NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT is missing.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const newReference = generateReference();

    const payload = {
      ref: newReference,
      submittedAt: new Date().toISOString(),

      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      organisation: organisation.trim(),

      route: route.title,
      session: route.session,

      score: 0,
      maxScore: 0,
      pct: 0,
      band: "Not assessed",
      priority: "Nurture",
      flags: 0,
      answers: [],

      // Privacy and consent records
      privacyConsent: preferences.personalDataConsent,
      marketingConsent: preferences.marketingConsent,
    };

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setReference(newReference);
      setPrivacyOpen(false);
      setStep("success");
    } catch (error) {
      console.error("Registration submission failed:", error);

      setPrivacyOpen(false);
      setSubmitError(
        "We could not send your registration. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "intro") {
    return (
      <FormShell>
        <Page>
          <Header>
            <Logo src="/images/opexwhite.webp" alt="OPEX" />

            <HeaderRight>
              <CancelButton type="button" onClick={onCancel}>
                Cancel
              </CancelButton>
            </HeaderRight>
          </Header>

          <Main>
            <IntroLayout>
              <IntroContent>
                <IntroTitle>
                  THE END OF
                  <br />
                  <IntroTitleBlue>MANUAL</IntroTitleBlue>
                </IntroTitle>

                <IntroDescription>
                  AI, Connected Systems and the Future of Financial Reporting
                  and Compliance
                </IntroDescription>

                <IntroMeta>
                  <span>Wednesday 21 October 2026</span>
                  <IntroDot />
                  <span>The Wheatbaker, Ikoyi</span>
                </IntroMeta>

                <IntroNote>
                  Choose the workshop session most relevant to your role and
                  priorities.
                </IntroNote>

                <BeginButton type="button" onClick={() => setStep("routes")}>
                  Begin registration
                </BeginButton>
              </IntroContent>

              <FlyerWrap>
                <Flyer
                  src="/images/newflierupdate.jpeg"
                  alt="REGTECH365 Executive Workshop"
                />
              </FlyerWrap>
            </IntroLayout>
          </Main>
        </Page>
      </FormShell>
    );
  }

  if (step === "routes") {
    return (
      <FormShell>
        <Page>
          <Header>
            <Logo src="/images/opexwhite.webp" alt="OPEX" />

            <HeaderRight>
              <HeaderText>Executive Workshop</HeaderText>

              <CancelButton type="button" onClick={onCancel}>
                Cancel
              </CancelButton>
            </HeaderRight>
          </Header>

          <Main>
            <RouteContent>
              <RouteTitle>
                Choose the conversation
                <br />
                that matters most.
              </RouteTitle>

              <RouteIntro>
                Select the workshop session most relevant to your role and
                priorities.
              </RouteIntro>

              <RouteList>
                <SessionHeading>
                  <SessionHeadingTitle>Morning Session</SessionHeadingTitle>

                  <SessionHeadingTime>
                    8:00 AM – 11:00 AM WAT
                  </SessionHeadingTime>
                </SessionHeading>

                {ROUTES.filter((item) => item.session === "breakfast").map(
                  (item) => (
                    <RouteItem
                      key={item.key}
                      type="button"
                      onClick={() => selectRoute(item)}
                    >
                      <RouteLetter>{item.letter}</RouteLetter>

                      <RouteText>
                        <RouteName>{item.title}</RouteName>
                        <RouteDescription>{item.description}</RouteDescription>

                        <RouteSession>
                          MORNING SESSION · 8AM–11AM WAT
                        </RouteSession>
                      </RouteText>

                      <Arrow aria-hidden="true">→</Arrow>
                    </RouteItem>
                  )
                )}

                <SessionHeading $afternoon>
                  <SessionHeadingTitle>
                    Afternoon C-Level Technical Summit
                  </SessionHeadingTitle>

                  <SessionHeadingTime>
                    11:30 AM – 4:00 PM WAT
                  </SessionHeadingTime>
                </SessionHeading>

                {ROUTES.filter((item) => item.session === "summit").map(
                  (item) => (
                    <RouteItem
                      key={item.key}
                      type="button"
                      onClick={() => selectRoute(item)}
                    >
                      <RouteLetter>{item.letter}</RouteLetter>

                      <RouteText>
                        <RouteName>{item.title}</RouteName>
                        <RouteDescription>{item.description}</RouteDescription>

                        <RouteSession>
                          AFTERNOON SUMMIT · 11:30AM–4PM WAT
                        </RouteSession>
                      </RouteText>

                      <Arrow aria-hidden="true">→</Arrow>
                    </RouteItem>
                  )
                )}
              </RouteList>
            </RouteContent>
          </Main>
        </Page>
      </FormShell>
    );
  }

  if (step === "contact" && route) {
    const session = SESSION_DETAILS[route.session];

    return (
      <FormShell>
        <Page>
          <Header>
            <Logo src="/images/opexwhite.webp" alt="OPEX" />

            <HeaderRight>
              <HeaderText>{route.title}</HeaderText>

              <CancelButton
                type="button"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </CancelButton>
            </HeaderRight>
          </Header>

          <Main>
            <ContactContent>
              <ContactTitle>
                Tell us who
                <br />
                we&apos;re meeting.
              </ContactTitle>

              <ContactDescription>
                These details are used to confirm your registration and prepare
                for the workshop.
              </ContactDescription>

              <SelectedSession>
                <SelectedSessionLabel>
                  YOUR SELECTED SESSION
                </SelectedSessionLabel>

                <SelectedSessionTitle>{route.title}</SelectedSessionTitle>

                <SelectedSessionTime>
                  {session.title} · {session.time}
                </SelectedSessionTime>
              </SelectedSession>

              <form onSubmit={handleRegistrationSubmit}>
                <Fields>
                  <FieldGroup>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>

                    <FieldInput
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                      disabled={submitting}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel htmlFor="email">Work email</FieldLabel>

                    <FieldInput
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      placeholder="name@organisation.com"
                      required
                      disabled={submitting}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel htmlFor="role">Role</FieldLabel>

                    <FieldInput
                      id="role"
                      name="role"
                      type="text"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      autoComplete="organization-title"
                      placeholder="Your role"
                      required
                      disabled={submitting}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel htmlFor="organisation">Organisation</FieldLabel>

                    <FieldInput
                      id="organisation"
                      name="organisation"
                      type="text"
                      value={organisation}
                      onChange={(event) => setOrganisation(event.target.value)}
                      autoComplete="organization"
                      placeholder="Organisation name"
                      required
                      disabled={submitting}
                    />
                  </FieldGroup>
                </Fields>

                {submitError && (
                  <ErrorMessage role="alert">{submitError}</ErrorMessage>
                )}

                <ContactActions>
                  <BackButton
                    type="button"
                    onClick={goBackFromContact}
                    disabled={submitting}
                  >
                    Back to selection
                  </BackButton>

                  <NextButton type="submit" disabled={submitting}>
                    Confirm registration
                  </NextButton>
                </ContactActions>
              </form>
            </ContactContent>
          </Main>
        </Page>

        <PrivacyModal
          isOpen={privacyOpen}
          onClose={() => {
            if (!submitting) {
              setPrivacyOpen(false);
            }
          }}
          onSave={(preferences) => {
            void submitRegistration(preferences);
          }}
        />
      </FormShell>
    );
  }

  if (step === "success" && route) {
    const session = SESSION_DETAILS[route.session];

    return (
      <FormShell>
        <ReceiptPage>
          <Ticket>
            <TicketTop>
              <TicketLogo src="/images/opexwhite.webp" alt="OPEX" />
              <TicketStatus>REGISTRATION REQUEST SENT</TicketStatus>
            </TicketTop>

            <TicketMain>
              <TicketEyebrow>REGTECH365 · EXECUTIVE WORKSHOP</TicketEyebrow>

              <TicketTitle>You&apos;re on the list.</TicketTitle>

              <TicketText>
                Your registration request has been submitted. Please keep your
                reference for your records.
              </TicketText>

              <TicketDetails>
                <TicketDetail>
                  <TicketLabel>REFERENCE</TicketLabel>
                  <TicketValue>{reference}</TicketValue>
                </TicketDetail>

                <TicketDetail>
                  <TicketLabel>SESSION</TicketLabel>
                  <TicketValue>{session.title}</TicketValue>
                </TicketDetail>

                <TicketDetail>
                  <TicketLabel>TIME</TicketLabel>
                  <TicketValue>{session.time}</TicketValue>
                </TicketDetail>

                <TicketDetail>
                  <TicketLabel>WORKSHOP</TicketLabel>
                  <TicketValue>{route.title}</TicketValue>
                </TicketDetail>

                <TicketDetail>
                  <TicketLabel>PARTICIPANT</TicketLabel>
                  <TicketValue>{name}</TicketValue>
                </TicketDetail>
              </TicketDetails>
            </TicketMain>

            <TicketDivider>
              <TicketNotch $position="left" />
              <TicketDashed />
              <TicketNotch $position="right" />
            </TicketDivider>

            <TicketBottom>
              <TicketEvent>
                <TicketEventDate>21</TicketEventDate>

                <TicketEventInfo>
                  <strong>OCTOBER 2026</strong>
                  <span>The Wheatbaker · Ikoyi</span>
                </TicketEventInfo>
              </TicketEvent>

              <DoneButton type="button" onClick={onCancel}>
                Done
              </DoneButton>
            </TicketBottom>
          </Ticket>
        </ReceiptPage>
      </FormShell>
    );
  }

  return null;
}

/* Animations */

const pageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const receiptIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(32px) scale(.94);
  }

  55% {
    opacity: 1;
    transform: translateY(-5px) scale(1.008);
  }

  75% {
    transform: translateY(2px) scale(.998);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const flyerIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(24px) scale(.98);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

/* Main layout */

const FormShell = styled.main`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background: #ffffff;
  color: #111111;
  font-family: "Mont", Arial, sans-serif;
`;

const Page = styled.section`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  animation: ${pageIn} 0.45s ease both;
`;

const Header = styled.header`
  width: 100%;
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 42px 0;

  @media (max-width: 700px) {
    min-height: 68px;
    padding: 8px 20px 0;
  }

  @media (max-width: 430px) {
    min-height: 62px;
    padding: 6px 16px 0;
  }
`;

const Logo = styled.img`
  width: 82px;
  height: auto;
  display: block;
  filter: brightness(0) contrast(1.05);
  transform: translateY(6px);

  @media (max-width: 700px) {
    width: 70px;
    transform: translateY(4px);
  }

  @media (max-width: 430px) {
    width: 64px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 700px) {
    gap: 8px;
  }
`;

const HeaderText = styled.span`
  max-width: 420px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #666666;

  @media (max-width: 700px) {
    display: none;
  }
`;

const CancelButton = styled.button`
  appearance: none;
  border: 1px solid #d9dfe5;
  border-radius: 999px;
  background: #ffffff;
  color: #083672;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease,
    transform 0.25s ease;

  &:hover:not(:disabled) {
    color: #0067d4;
    border-color: #aebfd1;
    background: #f7faff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    padding: 7px 12px;
    font-size: 10px;
  }
`;

const Main = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 42px 34px;

  @media (max-width: 900px) {
    padding: 10px 30px 28px;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
    padding: 5px 20px 24px;
  }

  @media (max-width: 430px) {
    padding: 4px 16px 20px;
  }
`;

const Content = styled.div`
  width: min(760px, 100%);
  margin: 0 auto;
`;

/* Intro screen */

const IntroLayout = styled.div`
  width: min(1160px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 430px);
  align-items: center;
  gap: clamp(40px, 7vw, 100px);
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(260px, 340px);
    gap: 32px;
  }

  @media (max-width: 700px) {
    display: block;
  }
`;

const IntroContent = styled(Content)`
  width: 100%;
  transform: translateY(-8px);

  @media (max-width: 700px) {
    transform: none;
  }
`;

const IntroBrand = styled.div`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #083672;
  margin-bottom: 18px;

  @media (max-width: 700px) {
    font-size: 9px;
    margin-bottom: 10px;
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  max-width: 850px;
  font-size: clamp(42px, 6vw, 72px);
  line-height: 0.94;
  font-weight: 200;
  letter-spacing: -0.055em;

  @media (max-width: 900px) {
    font-size: clamp(40px, 7vw, 62px);
  }

  @media (max-width: 700px) {
    font-size: clamp(38px, 11vw, 52px);
    line-height: 0.92;
  }

  @media (max-width: 430px) {
    font-size: 37px;
  }
`;

const IntroTitleBlue = styled.span`
  color: #083672;
`;

const IntroDescription = styled.p`
  margin: 22px 0 28px;
  max-width: 690px;
  font-size: 17px;
  line-height: 1.55;
  color: #555555;

  @media (max-width: 700px) {
    margin: 14px 0 16px;
    font-size: 13px;
    line-height: 1.45;
  }

  @media (max-width: 430px) {
    margin: 11px 0 13px;
    font-size: 12px;
  }
`;

const IntroMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 27px;
  font-size: 13px;
  color: #111111;

  @media (max-width: 700px) {
    margin-bottom: 14px;
    font-size: 10px;
    gap: 6px;
  }

  @media (max-width: 430px) {
    font-size: 9px;
    margin-bottom: 10px;
  }
`;

const IntroDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #0067d4;
  flex-shrink: 0;
`;

const IntroNote = styled.p`
  margin: 0 0 25px;
  font-size: 12px;
  color: #777777;

  @media (max-width: 700px) {
    margin-bottom: 15px;
    font-size: 10px;
  }

  @media (max-width: 430px) {
    margin-bottom: 11px;
    font-size: 9px;
  }
`;

const BeginButton = styled.button`
  appearance: none;
  min-width: 166px;
  height: 46px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  background: #083672;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: #0067d4;
    transform: translateY(-1px);
    box-shadow: 0 7px 24px rgba(0, 103, 212, 0.15);
  }

  @media (max-width: 700px) {
    min-width: 145px;
    height: 43px;
    padding: 0 18px;
    font-size: 11px;
  }
`;

const FlyerWrap = styled.div`
  width: 100%;
  max-width: 430px;
  justify-self: end;
  animation: ${flyerIn} 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;

  @media (max-width: 900px) {
    max-width: 340px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const Flyer = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: min(67vh, 620px);
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 24px 70px rgba(8, 54, 114, 0.12);
`;

/* Session selection */

const RouteContent = styled(Content)`
  width: min(900px, 100%);
  padding: 20px 0;
  margin: auto;

  @media (max-width: 700px) {
    padding: 8px 0;
  }
`;

const RouteTitle = styled.h1`
  margin: 0;
  max-width: 680px;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 200;
  line-height: 0.98;
  letter-spacing: -0.045em;

  @media (max-width: 700px) {
    font-size: clamp(34px, 9vw, 46px);
  }
`;

const RouteIntro = styled.p`
  margin: 19px 0 28px;
  max-width: 620px;
  font-size: 15px;
  line-height: 1.55;
  color: #555555;

  @media (max-width: 700px) {
    margin: 15px 0 20px;
    font-size: 13px;
  }
`;

const RouteList = styled.div`
  width: 100%;
`;

const SessionHeading = styled.div<{ $afternoon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: ${({ $afternoon }) =>
    $afternoon ? "30px 4px 12px" : "4px 4px 12px"};
  border-bottom: 1px solid #dce3eb;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    padding: ${({ $afternoon }) =>
      $afternoon ? "24px 2px 10px" : "4px 2px 10px"};
  }
`;

const SessionHeadingTitle = styled.h2`
  margin: 0;
  color: #083672;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const SessionHeadingTime = styled.span`
  color: #777777;
  font-size: 10px;
  white-space: nowrap;

  @media (max-width: 700px) {
    font-size: 9px;
    white-space: normal;
  }
`;

const RouteItem = styled.button`
  width: 100%;
  appearance: none;
  border: 0;
  border-top: 1px solid #e5e5e5;
  background: transparent;
  padding: 22px 4px;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 20px;
  align-items: start;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: padding 0.25s ease, background 0.25s ease, border-color 0.25s ease;

  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }

  &:hover {
    padding-left: 12px;
    padding-right: 12px;
    background: #f7faff;
    border-color: #cbd6e1;
    border-radius: 8px;
  }

  &:focus-visible {
    outline: 2px solid #0067d4;
    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 20px minmax(0, 1fr) 16px;
    gap: 9px;
    padding: 18px 2px;
  }

  @media (max-width: 430px) {
    gap: 7px;
    padding: 16px 1px;
  }
`;

const RouteLetter = styled.span`
  font-size: 13px;
  color: #0067d4;
  padding-top: 2px;

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const RouteText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`;

const RouteName = styled.span`
  display: block;
  color: #111111;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  overflow-wrap: anywhere;

  @media (max-width: 700px) {
    font-size: 14px;
  }

  @media (max-width: 430px) {
    font-size: 13px;
  }
`;

const RouteDescription = styled.span`
  display: block;
  max-width: 680px;
  color: #687587;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.8;
  overflow-wrap: anywhere;

  @media (max-width: 700px) {
    font-size: 11px;
    line-height: 1.7;
  }

  @media (max-width: 430px) {
    font-size: 10px;
    line-height: 1.65;
  }
`;

const RouteSession = styled.span`
  display: inline-block;
  margin-top: 3px;
  color: #0067d4;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.07em;
  line-height: 1.6;

  @media (max-width: 430px) {
    font-size: 8px;
    letter-spacing: 0.04em;
  }
`;

const Arrow = styled.span`
  font-size: 20px;
  color: #083672;
  transition: transform 0.25s ease;
  justify-self: end;

  ${RouteItem}:hover & {
    transform: translateX(4px);
  }
`;

/* Contact form */

const ContactContent = styled(Content)`
  width: min(620px, 100%);
  padding: 12px 0;
`;

const ContactTitle = styled.h1`
  margin: 0;
  font-size: clamp(32px, 4.5vw, 50px);
  line-height: 1;
  font-weight: 200;
  letter-spacing: -0.04em;

  @media (max-width: 700px) {
    font-size: clamp(31px, 9vw, 42px);
  }
`;

const ContactDescription = styled.p`
  margin: 13px 0 21px;
  color: #555555;
  font-size: 14px;
  line-height: 1.5;

  @media (max-width: 700px) {
    margin: 12px 0 17px;
    font-size: 12px;
  }
`;

const SelectedSession = styled.div`
  margin-bottom: 16px;
  padding: 13px 15px;
  border: 1px solid #dce6f1;
  border-radius: 12px;
  background: #f7faff;
`;

const SelectedSessionLabel = styled.span`
  display: block;
  margin-bottom: 6px;
  color: #0067d4;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

const SelectedSessionTitle = styled.p`
  margin: 0;
  color: #111111;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`;

const SelectedSessionTime = styled.p`
  margin: 5px 0 0;
  color: #687587;
  font-size: 11px;
  line-height: 1.5;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`;

const FieldGroup = styled.div`
  position: relative;
  width: 100%;
  min-height: 60px;
  padding: 8px 14px 5px;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  background: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.35s ease,
    transform 0.35s ease;

  &::after {
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: -1px;
    height: 2px;
    border-radius: 2px;
    background: #0067d4;
    opacity: 0;
    transform: scaleX(0);
    transition: transform 0.35s ease, opacity 0.25s ease;
  }

  &:focus-within {
    border-color: #aebfd1;
    box-shadow: 0 7px 25px rgba(8, 54, 114, 0.06);
    transform: translateY(-1px);
  }

  &:focus-within::after {
    opacity: 1;
    transform: scaleX(1);
  }

  @media (max-width: 700px) {
    min-height: 55px;
    padding: 6px 13px 4px;
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 2px;
  font-size: 10px;
  color: #666666;

  ${FieldGroup}:focus-within & {
    color: #0067d4;
  }

  @media (max-width: 700px) {
    font-size: 9px;
  }
`;

/*
 * IMPORTANT:
 * Keep the input font at 16px to prevent automatic
 * focus zoom in Safari on iPhones.
 */
const FieldInput = styled.input`
  display: block;
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: #111111;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.4;
  height: 25px;
  -webkit-appearance: none;
  appearance: none;

  &::placeholder {
    color: #a0a0a0;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    font-size: 16px;
    height: 24px;
  }
`;

const ErrorMessage = styled.p`
  margin: 12px 0 0;
  color: #b42318;
  font-size: 12px;
  line-height: 1.5;
`;

const ContactActions = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 700px) {
    margin-top: 18px;
  }

  @media (max-width: 430px) {
    flex-direction: column-reverse;
  }
`;

const BackButton = styled.button`
  appearance: none;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid #d9dfe5;
  border-radius: 999px;
  background: #ffffff;
  color: #083672;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover:not(:disabled) {
    background: #f1f7fd;
    transform: translateY(-1px);
    box-shadow: 0 5px 18px rgba(8, 54, 114, 0.06);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    min-height: 42px;
    padding: 0 14px;
    font-size: 11px;
  }
`;

const NextButton = styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: #083672;
  color: #ffffff;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease, opacity 0.25s ease,
    box-shadow 0.25s ease;

  &:hover:not(:disabled) {
    background: #0067d4;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 103, 212, 0.16);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    min-height: 42px;
    padding: 0 16px;
    font-size: 11px;
  }
`;

/* Success ticket */

const ReceiptPage = styled.div`
  width: 100%;
  min-height: 100dvh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  @media (max-width: 700px) {
    padding: 16px;
  }
`;

const Ticket = styled.div`
  position: relative;
  width: min(540px, 100%);
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 30px 90px rgba(8, 54, 114, 0.12), 0 4px 18px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  animation: ${receiptIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const TicketTop = styled.div`
  min-height: 76px;
  padding: 0 32px;
  background: #083672;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 700px) {
    min-height: 64px;
    padding: 0 22px;
  }
`;

const TicketLogo = styled.img`
  width: 72px;
  height: auto;
  display: block;
  filter: brightness(0) invert(1);

  @media (max-width: 700px) {
    width: 62px;
  }
`;

const TicketStatus = styled.span`
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #c6e3fb;
  text-align: right;

  @media (max-width: 700px) {
    font-size: 8px;
  }
`;

const TicketMain = styled.div`
  padding: 34px 38px 30px;

  @media (max-width: 700px) {
    padding: 27px 23px 25px;
  }
`;

const TicketEyebrow = styled.div`
  margin-bottom: 13px;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #0067d4;

  @media (max-width: 700px) {
    font-size: 8px;
  }
`;

const TicketTitle = styled.h1`
  margin: 0;
  font-size: clamp(32px, 5vw, 46px);
  line-height: 0.98;
  font-weight: 200;
  letter-spacing: -0.045em;
  color: #111111;
`;

const TicketText = styled.p`
  max-width: 390px;
  margin: 14px 0 27px;
  font-size: 13px;
  line-height: 1.55;
  color: #666666;

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 11px 0 22px;
  }
`;

const TicketDetails = styled.div`
  border-top: 1px solid #e5e5e5;
`;

const TicketDetail = styled.div`
  min-height: 46px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #e5e5e5;

  @media (max-width: 700px) {
    min-height: 42px;
    padding: 8px 0;
  }
`;

const TicketLabel = styled.span`
  flex-shrink: 0;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: #888888;

  @media (max-width: 700px) {
    font-size: 8px;
  }
`;

const TicketValue = styled.span`
  max-width: 65%;
  text-align: right;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 1.5;
  color: #111111;

  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const TicketDivider = styled.div`
  position: relative;
  height: 1px;
  display: flex;
  align-items: center;
`;

const TicketDashed = styled.div`
  width: 100%;
  border-top: 1px dashed #cfd5db;
`;

const TicketNotch = styled.span<{
  $position: "left" | "right";
}>`
  position: absolute;
  z-index: 2;
  width: 22px;
  height: 22px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #f5f7fa;

  ${({ $position }) =>
    $position === "left" ? "left: -11px;" : "right: -11px;"}

  @media (max-width: 700px) {
    width: 20px;
    height: 20px;

    ${({ $position }) =>
      $position === "left" ? "left: -10px;" : "right: -10px;"}
  }
`;

const TicketBottom = styled.div`
  padding: 24px 38px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 700px) {
    padding: 20px 23px 24px;
    align-items: stretch;
    flex-direction: column;
  }
`;

const TicketEvent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TicketEventDate = styled.div`
  font-size: 29px;
  line-height: 1;
  font-weight: 200;
  color: #083672;
`;

const TicketEventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 9px;
    letter-spacing: 0.08em;
    font-weight: 400;
    color: #111111;
  }

  span {
    font-size: 10px;
    color: #777777;
  }
`;

const DoneButton = styled.button`
  min-width: 105px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: #083672;
  color: #ffffff;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: #0067d4;
    transform: translateY(-1px);
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 43px;
  }
`;
