"use client";

import { FormEvent, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

type RouteKey = "financial" | "sustainability" | "regtech" | "fullDay";

type SessionKey = "breakfast" | "summit" | "fullDay";

type FormStep = "intro" | "routes" | "questions" | "contact" | "success";

type Question = {
  question: string;
  options: string[];
};

type Route = {
  key: RouteKey;
  letter: string;
  title: string;
  description: string;
  session: SessionKey;
  questions: Question[];
};

type FormComponentProps = {
  onCancel: () => void;
};

const ROUTES: Route[] = [
  {
    key: "financial",
    letter: "A",
    title: "Financial reporting",
    description:
      "Consolidation, disclosure and the reporting chain from source data to signed accounts.",
    session: "breakfast",
    questions: [
      {
        question:
          "Last year-end, how long did it take you from trial balance to signed accounts?",
        options: [
          "Under a month",
          "One to two months",
          "Two to three months",
          "Longer than that",
        ],
      },
      {
        question:
          "Be honest about the consolidation pack — is it built in a system, or is it built in Excel?",
        options: [
          "In a proper consolidation system",
          "Half system, half Excel",
          "Our auditors or a consultant do it",
          "Excel, with someone who knows where everything is",
        ],
      },
      {
        question:
          "Eliminations and FX translation — does the system do it, or does a person do it?",
        options: [
          "The system, with a journal you can follow",
          "System first, then someone checks it line by line",
          "There's a spreadsheet, and one person owns it",
          "We rebuild it every period",
        ],
      },
      {
        question:
          "When you're putting the annual report together, where do the numbers and the words live?",
        options: [
          "Same platform, linked",
          "Numbers linked, narrative in Word",
          "Both by hand, checked by eye",
          "We send files to a designer and hope",
        ],
      },
      {
        question:
          "A number changes after the pack has gone to the reviewers. What happens?",
        options: [
          "It updates everywhere it appears",
          "We have a checklist of where to look",
          "We rely on somebody remembering",
          "We've published something inconsistent before",
        ],
      },
      {
        question: "Who does your tagging for structured filing?",
        options: [
          "We do it ourselves, as part of the cycle",
          "We do it, and it's painful",
          "We pay a firm to do it",
          "Nobody's asked us for it yet",
        ],
      },
      {
        question:
          "If a regulator asked you today where a figure in last year's accounts came from, how long would that take?",
        options: [
          "Same day",
          "A few days",
          "Only one person could answer that",
          "We've never been asked",
        ],
      },
    ],
  },

  {
    key: "sustainability",
    letter: "B",
    title: "Sustainability & ESG",
    description:
      "Sustainability reporting, S1 and S2 readiness, evidence and assurance.",
    session: "breakfast",
    questions: [
      {
        question:
          "Has your board actually passed a resolution to adopt the sustainability standards?",
        options: [
          "Passed and filed",
          "Drafted, waiting on the board",
          "Not yet",
          "I'd have to check",
        ],
      },
      {
        question:
          "Has anyone sat down and compared what you report now against what S1 and S2 ask for?",
        options: [
          "Done and submitted",
          "Being done now",
          "We've asked someone to",
          "Not yet",
        ],
      },
      {
        question:
          "And if that comparison has been done — is there a plan and a budget behind it?",
        options: [
          "Written, costed, approved",
          "Drafted",
          "No plan yet",
          "We haven't got that far",
        ],
      },
      {
        question:
          "Your energy, fuel and emissions numbers — where do they come from?",
        options: [
          "Collected through the year, with owners",
          "Pulled together once a year",
          "Worked out from invoices and averages",
          "We don't collect them",
        ],
      },
      {
        question: "What about your suppliers and value chain?",
        options: [
          "We have a method that works",
          "Started with the big categories",
          "We know it's coming",
          "Not on the agenda",
        ],
      },
      {
        question:
          "Who writes the sustainability report — and does it run on the same calendar as the accounts?",
        options: [
          "Finance, same cycle",
          "Finance, different timeline",
          "Sustainability or comms team, separately",
          "An outside consultant, each year",
        ],
      },
      {
        question:
          "If your auditors had to give assurance on it, how would that go?",
        options: [
          "Fine, the evidence is there",
          "Limited assurance, yes",
          "They've raised issues before",
          "It's never been assured",
        ],
      },
    ],
  },

  {
    key: "regtech",
    letter: "C",
    title: "Regtech, compliance & GRC",
    description:
      "Regulatory obligations, controls, AI governance, evidence and third-party risk.",
    session: "summit",
    questions: [
      {
        question: "How many risk registers exist across the group?",
        options: [
          "One, with one taxonomy",
          "A group one plus local versions",
          "Several, reconciled now and then",
          "Every function keeps its own",
        ],
      },
      {
        question:
          "When it's time to test controls, where does the evidence come from?",
        options: [
          "The systems produce it as they run",
          "Partly automatic",
          "Someone goes and collects it",
          "We pull it together when the auditor arrives",
        ],
      },
      {
        question:
          "Four or five regulators, each with their own obligations. How do you keep track?",
        options: [
          "A live register with named owners",
          "A shared tracker",
          "Compliance circulates updates",
          "Honestly, we find out when it lands",
        ],
      },
      {
        question:
          "Do you know everywhere AI or automated decisioning is already running in your business?",
        options: [
          "Yes, documented, with owners",
          "There's an informal list",
          "It's running, but nobody's listed it",
          "I couldn't tell you",
        ],
      },
      {
        question: "And who governs those models?",
        options: [
          "There's a framework, with accountability and validation",
          "A policy exists, not really operating",
          "IT treats them like any other system",
          "Nobody, formally",
        ],
      },
      {
        question:
          "Here's a different question — is your GRC function itself automated, or is it doing the manual work it tells everyone else to stop doing?",
        options: [
          "Controls, evidence and reporting run automatically",
          "We've automated one area",
          "We've talked about it",
          "It's all manual",
        ],
      },
      {
        question:
          "Your vendors and third parties — how closely do you actually watch them?",
        options: [
          "Assessed, monitored, with exit plans in place",
          "Checked at onboarding",
          "There are contracts, no ongoing review",
          "Case by case",
        ],
      },
    ],
  },

  {
    key: "fullDay",
    letter: "D",
    title: "Full-day executive assessment",
    description:
      "Institution-wide finance and risk accountability across reporting, controls and regulatory operations.",
    session: "fullDay",
    questions: [
      {
        question:
          "How many different systems end up producing your regulatory and financial submissions?",
        options: [
          "One connected chain",
          "Two or three, integrated",
          "Several, loosely joined",
          "I've never counted",
        ],
      },
      {
        question:
          "The same number, going to two different regulators — does it ever come out differently?",
        options: [
          "Never, it reconciles",
          "It reconciles once we adjust",
          "We assume it does",
          "Yes, it has",
        ],
      },
      {
        question: "Who owns the space between finance data and risk data?",
        options: [
          "A named person or function",
          "Shared between the CFO and CRO",
          "Nobody, really",
          "It hasn't come up",
        ],
      },
      {
        question:
          "Between board meetings, how much assurance do you actually have?",
        options: [
          "Continuous, I can ask any day",
          "A monthly pack",
          "Quarterly",
          "At year end",
        ],
      },
      {
        question:
          "Invoice-level reporting to the tax authority — where are you?",
        options: [
          "Fully integrated from source",
          "Partly",
          "Manual submission",
          "Not addressed",
        ],
      },
      {
        question:
          "Has anyone outside the business — a lender, a correspondent bank, an investor — ever questioned the quality of your reporting or your controls?",
        options: [
          "Never come up",
          "Raised, and we satisfied them",
          "Raised, still open",
          "Yes, and it cost us",
        ],
      },
      {
        question:
          "If a deadline moved forward by three months, what breaks first?",
        options: [
          "Nothing serious",
          "The reporting side",
          "The evidence and controls side",
          "Both, and we'd be exposed",
        ],
      },
    ],
  },
];

const SESSION_DETAILS: Record<
  SessionKey,
  {
    title: string;
    time: string;
    description: string;
  }
> = {
  breakfast: {
    title: "Breakfast briefing",
    time: "8am – 11am WAT",
    description: "Consolidation, disclosure and sustainability reporting.",
  },
  summit: {
    title: "Main summit",
    time: "11:30am – 4pm WAT",
    description: "Regtech compliance, GRC and AI governance.",
  },
  fullDay: {
    title: "Full day",
    time: "8am – 4pm WAT",
    description: "Institution-wide finance and risk accountability.",
  },
};

const generateReference = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `RDX-2026-${random}`;
};

export default function FormComponent({ onCancel }: FormComponentProps) {
  const [step, setStep] = useState<FormStep>("intro");

  const [route, setRoute] = useState<Route | null>(null);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<number[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");

  const [organisation, setOrganisation] = useState("");

  const [reference, setReference] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = useMemo(() => {
    if (!route) return null;

    return route.questions[questionIndex];
  }, [route, questionIndex]);

  const selectRoute = (selectedRoute: Route) => {
    setRoute(selectedRoute);
    setQuestionIndex(0);
    setAnswers([]);
    setStep("questions");
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers((previous) => {
      const next = [...previous];

      next[questionIndex] = answerIndex;

      return next;
    });
  };

  const goBackFromQuestion = () => {
    if (questionIndex === 0) {
      setStep("routes");
      return;
    }

    setQuestionIndex((previous) => previous - 1);
  };

  const continueQuestion = () => {
    if (!route || answers[questionIndex] === undefined) {
      return;
    }

    if (questionIndex < route.questions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      return;
    }

    setStep("contact");
  };

  const goBackFromContact = () => {
    if (!route) return;

    setQuestionIndex(route.questions.length - 1);

    setStep("questions");
  };

  const submitRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!route || submitting) {
      return;
    }

    if (!name.trim() || !email.trim() || !role.trim() || !organisation.trim()) {
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT;

    if (!endpoint) {
      console.error("NEXT_PUBLIC_REGISTRATION_SHEET_ENDPOINT is missing.");

      return;
    }

    setSubmitting(true);

    const finalAnswers = route.questions.map((_, index) => answers[index] ?? 0);

    const score = finalAnswers.reduce(
      (total, answer) => total + (3 - answer),
      0
    );

    const maxScore = route.questions.length * 3;

    const percentage = Math.round((score / maxScore) * 100);

    const band =
      percentage >= 75
        ? "Substantially ready"
        : percentage >= 45
        ? "Partially ready"
        : "Materially exposed";

    const flags = finalAnswers.filter((answer) => answer >= 2).length;

    const priority =
      (route.key === "fullDay" && finalAnswers[5] === 3) || flags >= 3
        ? "Priority"
        : flags > 0
        ? "Follow up"
        : "Nurture";

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
      score,
      maxScore,
      pct: percentage,
      band,
      priority,
      flags,
      answers: finalAnswers,
    };

    console.log("Submitting registration:", payload);

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log("Registration request sent.");

      setReference(newReference);
      setStep("success");
    } catch (error) {
      console.error("Registration submission failed:", error);
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
                  Allow approximately 3 minutes. Your answers place you in the
                  most relevant workshop session.
                </IntroNote>

                <BeginButton type="button" onClick={() => setStep("routes")}>
                  Begin registration
                </BeginButton>
              </IntroContent>

              <FlyerWrap>
                <Flyer
                  src="/images/newflier.jpeg"
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
                Select one area for your executive assessment. Your answers will
                help focus the conversation during the workshop.
              </RouteIntro>

              <RouteList>
                {ROUTES.map((item) => (
                  <RouteItem
                    key={item.key}
                    type="button"
                    onClick={() => selectRoute(item)}
                  >
                    <RouteLetter>{item.letter}</RouteLetter>

                    <RouteName>{item.title}</RouteName>

                    <Arrow>→</Arrow>
                  </RouteItem>
                ))}
              </RouteList>
            </RouteContent>
          </Main>
        </Page>
      </FormShell>
    );
  }

  if (step === "questions" && route && currentQuestion) {
    return (
      <FormShell>
        <Page key={`question-${questionIndex}`}>
          <Header>
            <Logo src="/images/opexwhite.webp" alt="OPEX" />

            <HeaderRight>
              <HeaderText>
                {questionIndex + 1} of {route.questions.length}
              </HeaderText>

              <CancelButton type="button" onClick={onCancel}>
                Cancel
              </CancelButton>
            </HeaderRight>
          </Header>

          <Main>
            <AssessmentContent>
              <QuestionNumber>
                {String(questionIndex + 1).padStart(2, "0")}
              </QuestionNumber>

              <QuestionTitle>{currentQuestion.question}</QuestionTitle>

              <Options>
                {currentQuestion.options.map((option, index) => (
                  <Option
                    key={option}
                    type="button"
                    $selected={answers[questionIndex] === index}
                    onClick={() => selectAnswer(index)}
                  >
                    <OptionMark $selected={answers[questionIndex] === index} />

                    {option}
                  </Option>
                ))}
              </Options>

              <ActionRow>
                <BackButton type="button" onClick={goBackFromQuestion}>
                  Back
                </BackButton>

                <NextButton
                  type="button"
                  disabled={answers[questionIndex] === undefined}
                  onClick={continueQuestion}
                >
                  {questionIndex === route.questions.length - 1
                    ? "Continue"
                    : "Next"}
                </NextButton>
              </ActionRow>
            </AssessmentContent>
          </Main>
        </Page>
      </FormShell>
    );
  }

  if (step === "contact" && route) {
    return (
      <FormShell>
        <Page>
          <Header>
            <Logo src="/images/opexwhite.webp" alt="OPEX" />

            <HeaderRight>
              <HeaderText>{route.title}</HeaderText>

              <CancelButton type="button" onClick={onCancel}>
                Cancel
              </CancelButton>
            </HeaderRight>
          </Header>

          <Main>
            <ContactContent>
              <ContactTitle>
                Tell us who
                <br />
                we're meeting.
              </ContactTitle>

              <ContactDescription>
                These details are used to confirm your registration and prepare
                for the workshop.
              </ContactDescription>

              <form onSubmit={submitRegistration}>
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
                    />
                  </FieldGroup>
                </Fields>

                <ContactActions>
                  <BackButton type="button" onClick={goBackFromContact}>
                    Back to questions
                  </BackButton>

                  <NextButton type="submit" disabled={submitting}>
                    {submitting ? "Confirming…" : "Confirm registration"}
                  </NextButton>
                </ContactActions>
              </form>
            </ContactContent>
          </Main>
        </Page>
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

              <TicketStatus>REGISTRATION CONFIRMED</TicketStatus>
            </TicketTop>

            <TicketMain>
              <TicketEyebrow>REGTECH365 · EXECUTIVE WORKSHOP</TicketEyebrow>

              <TicketTitle>You're on the list.</TicketTitle>

              <TicketText>
                Your place has been recorded for the OPEX Executive Workshop.
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
    transform:
      translateY(32px)
      scale(.94);
  }

  55% {
    opacity: 1;
    transform:
      translateY(-5px)
      scale(1.008);
  }

  75% {
    transform:
      translateY(2px)
      scale(.998);
  }

  100% {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
`;

const flyerIn = keyframes`
  from {
    opacity: 0;
    transform:
      translateX(24px)
      scale(.98);
  }

  to {
    opacity: 1;
    transform:
      translateX(0)
      scale(1);
  }
`;

const FormShell = styled.main`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  overflow: hidden;
  background: #ffffff;
  color: #111111;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
`;

const Page = styled.section`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  animation: ${pageIn} 0.45s ease both;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
`;

const Header = styled.header`
  width: 100%;
  height: 82px;
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 42px 0;

  @media (max-width: 700px) {
    height: 68px;
    min-height: 68px;
    padding: 8px 20px 0;
  }

  @media (max-width: 430px) {
    height: 62px;
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
  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
  font-size: 12px;
  color: #666666;

  @media (max-width: 700px) {
    display: none;
  }
`;

const CancelButton = styled.button`
  appearance: none;
  border: 1px solid #d9dfe5;
  border-radius: 6px;
  background: #ffffff;
  color: #083672;
  padding: 7px 12px;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
  font-size: 12px;

  cursor: pointer;

  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    color: #0067d4;
    border-color: #aebfd1;
    background: #f7faff;
    transform: translateY(-1px);
  }

  @media (max-width: 700px) {
    padding: 6px 10px;
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
    padding: 5px 20px 18px;
  }

  @media (max-width: 430px) {
    padding: 4px 16px 14px;
  }
`;

const Content = styled.div`
  width: min(760px, 100%);
  margin: 0 auto;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
`;

const IntroLayout = styled.div`
  width: min(1160px, 100%);
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(300px, 430px);
  align-items: center;
  gap: clamp(40px, 7vw, 100px);
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(260px, 340px);
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
  font-family: "Mont", Arial, sans-serif;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 0.08em;
  color: #083672;
  margin-bottom: 18px;

  @media (max-width: 700px) {
    font-size: 9px;
    letter-spacing: 0.07em;
    margin-bottom: 10px;
  }

  @media (max-width: 430px) {
    font-size: 8px;
    margin-bottom: 8px;
  }
`;

const IntroTitle = styled.h1`
  margin: 0;
  max-width: 850px;

  font-family: "Mont", Arial, sans-serif;
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
  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;
  color: #083672;
`;

const IntroDescription = styled.p`
  margin: 22px 0 28px;
  max-width: 690px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 17px;
  font-weight: 200;
  line-height: 1.55;

  color: #555555;

  @media (max-width: 700px) {
    margin: 14px 0 16px;
    font-size: 13px;
    line-height: 1.45;
    max-width: 520px;
  }

  @media (max-width: 430px) {
    margin: 11px 0 13px;
    font-size: 12px;
  }
`;

const IntroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 27px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;

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

  @media (max-width: 700px) {
    width: 3px;
    height: 3px;
  }
`;

const IntroNote = styled.p`
  margin: 0 0 25px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 12px;
  font-weight: 200;

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
  height: 48px;
  padding: 0 22px;
  border: 0;
  border-radius: 6px;
  background: #083672;
  color: #ffffff;

  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;

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

  @media (max-width: 430px) {
    height: 40px;
    min-width: 138px;
    font-size: 10px;
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

const RouteContent = styled(Content)`
  transform: translateY(-8px);

  @media (max-width: 700px) {
    transform: none;
  }
`;

const RouteTitle = styled.h1`
  margin: 0;
  max-width: 680px;

  font-family: "Mont", Arial, sans-serif;
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

  font-family: "Mont", Arial, sans-serif;
  font-size: 15px;
  font-weight: 200;
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

const RouteItem = styled.button`
  width: 100%;
  appearance: none;
  border: 0;
  border-top: 1px solid #e5e5e5;
  background: transparent;
  padding: 15px 4px;

  display: grid;
  grid-template-columns:
    38px
    1fr
    20px;

  align-items: center;
  gap: 14px;

  text-align: left;
  cursor: pointer;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;

  transition: padding 0.3s ease, background 0.3s ease, border-color 0.3s ease;

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

  @media (max-width: 700px) {
    grid-template-columns:
      28px
      1fr
      18px;

    padding: 13px 3px;
    gap: 10px;
  }
`;

const RouteLetter = styled.span`
  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;
  color: #0067d4;

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const RouteName = styled.span`
  font-family: "Mont", Arial, sans-serif;
  font-size: 17px;
  font-weight: 200;
  color: #111111;

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const Arrow = styled.span`
  font-family: "Mont", Arial, sans-serif;
  font-size: 20px;
  font-weight: 200;
  color: #083672;

  transition: transform 0.25s ease;

  ${RouteItem}:hover & {
    transform: translateX(4px);
  }
`;

const AssessmentContent = styled(Content)`
  width: min(820px, 100%);
  transform: translateY(-4px);

  @media (max-width: 700px) {
    transform: none;
  }
`;

const QuestionNumber = styled.div`
  margin-bottom: 11px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 12px;
  font-weight: 200;

  color: #0067d4;

  @media (max-width: 700px) {
    margin-bottom: 8px;
    font-size: 10px;
  }
`;

const QuestionTitle = styled.h1`
  margin: 0;
  max-width: 800px;

  font-family: "Mont", Arial, sans-serif;
  font-size: clamp(28px, 4vw, 46px);
  line-height: 1.08;
  font-weight: 200;
  letter-spacing: -0.035em;

  @media (max-width: 700px) {
    font-size: clamp(25px, 7.5vw, 34px);
    line-height: 1.05;
  }
`;

const Options = styled.div`
  margin-top: 24px;
  width: 100%;
  border: 1px solid #e0e4e8;
  border-radius: 9px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(8, 54, 114, 0.035);

  @media (max-width: 700px) {
    margin-top: 17px;
  }
`;

const Option = styled.button<{ $selected: boolean }>`
  width: 100%;
  appearance: none;
  border: 0;
  border-bottom: 1px solid #e5e5e5;

  background: ${({ $selected }) => ($selected ? "#f1f7fd" : "#ffffff")};

  color: #111111;

  padding: 13px 15px;
  min-height: 48px;

  display: flex;
  align-items: center;

  text-align: left;

  font-family: "Mont", Arial, sans-serif;
  font-size: 14px;
  font-weight: 200;
  line-height: 1.35;

  cursor: pointer;

  transition: background 0.25s ease, padding 0.25s ease;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: #f7faff;
    padding-left: 20px;
  }

  @media (max-width: 700px) {
    padding: 11px 12px;
    min-height: 46px;
    font-size: 12px;

    &:hover {
      padding-left: 16px;
    }
  }
`;

const OptionMark = styled.span<{ $selected: boolean }>`
  width: 16px;
  height: 16px;
  min-width: 16px;
  margin-right: 13px;

  border: 1px solid ${({ $selected }) => ($selected ? "#0067d4" : "#bdbdbd")};

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";

    width: 7px;
    height: 7px;

    border-radius: 50%;
    background: #0067d4;

    opacity: ${({ $selected }) => ($selected ? 1 : 0)};

    transform: scale(${({ $selected }) => ($selected ? 1 : 0.4)});

    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  @media (max-width: 700px) {
    width: 14px;
    height: 14px;
    min-width: 14px;
    margin-right: 10px;

    &::after {
      width: 6px;
      height: 6px;
    }
  }
`;

const ActionRow = styled.div`
  width: 100%;
  margin-top: 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  @media (max-width: 700px) {
    margin-top: 20px;
  }
`;

const BackButton = styled.button`
  appearance: none;
  min-width: 118px;
  height: 46px;
  padding: 0 18px;

  border: 1px solid #083672;
  border-radius: 6px;

  background: #ffffff;
  color: #083672;

  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;

  cursor: pointer;

  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: #f1f7fd;
    transform: translateY(-1px);
    box-shadow: 0 5px 18px rgba(8, 54, 114, 0.06);
  }

  @media (max-width: 700px) {
    min-width: 105px;
    height: 42px;
    padding: 0 14px;
    font-size: 11px;
  }
`;

const NextButton = styled.button`
  appearance: none;
  min-width: 142px;
  height: 46px;
  padding: 0 21px;

  border: 0;
  border-radius: 6px;

  background: #083672;
  color: #ffffff;

  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;

  cursor: pointer;

  transition: background 0.25s ease, transform 0.25s ease, opacity 0.25s ease,
    box-shadow 0.25s ease;

  &:hover:not(:disabled) {
    background: #0067d4;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 103, 212, 0.16);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    min-width: 125px;
    height: 42px;
    padding: 0 16px;
    font-size: 11px;
  }
`;

const ContactContent = styled(Content)`
  width: min(620px, 100%);
  transform: translateY(-3px);

  @media (max-width: 700px) {
    transform: none;
  }
`;

const ContactTitle = styled.h1`
  margin: 0;

  font-family: "Mont", Arial, sans-serif;
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

  font-family: "Mont", Arial, sans-serif;
  font-size: 14px;
  font-weight: 200;
  line-height: 1.5;

  @media (max-width: 700px) {
    margin: 12px 0 17px;
    font-size: 12px;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 700px) {
    gap: 7px;
  }
`;

const FieldGroup = styled.div`
  position: relative;
  width: 100%;
  min-height: 56px;
  padding: 7px 15px 5px;

  border: 1px solid #dcdcdc;
  border-radius: 8px;

  background: #ffffff;

  transition: border-color 0.3s ease, box-shadow 0.35s ease,
    transform 0.35s ease;

  &::after {
    content: "";

    position: absolute;
    left: 15px;
    right: 15px;
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
    min-height: 52px;
    padding: 6px 13px 4px;
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 2px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 10px;
  font-weight: 200;

  color: #666666;

  ${FieldGroup}:focus-within & {
    color: #0067d4;
  }

  @media (max-width: 700px) {
    font-size: 9px;
  }
`;

const FieldInput = styled.input`
  width: 100%;

  border: 0;
  outline: 0;
  padding: 0;

  background: transparent;
  color: #111111;

  font-family: "Mont", Arial, sans-serif;
  font-size: 14px;
  font-weight: 200;

  height: 24px;

  &::placeholder {
    color: #a0a0a0;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    height: 22px;
  }
`;

const ContactActions = styled.div`
  margin-top: 22px;

  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 700px) {
    margin-top: 18px;
  }
`;

const ReceiptPage = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;

  background: #f5f7fa;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  font-family: "Mont", Arial, sans-serif;
  font-weight: 200;

  @media (max-width: 700px) {
    padding: 16px;
  }
`;

const Ticket = styled.div`
  position: relative;
  width: min(540px, 100%);

  background: #ffffff;

  border-radius: 10px;

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
  font-family: "Mont", Arial, sans-serif;
  font-size: 9px;
  font-weight: 200;
  letter-spacing: 0.12em;

  color: #c6e3fb;

  white-space: nowrap;

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

  font-family: "Mont", Arial, sans-serif;
  font-size: 9px;
  font-weight: 200;
  letter-spacing: 0.1em;

  color: #0067d4;

  @media (max-width: 700px) {
    font-size: 8px;
  }
`;

const TicketTitle = styled.h1`
  margin: 0;

  font-family: "Mont", Arial, sans-serif;
  font-size: clamp(32px, 5vw, 46px);
  line-height: 0.98;
  font-weight: 200;
  letter-spacing: -0.045em;

  color: #111111;
`;

const TicketText = styled.p`
  max-width: 390px;
  margin: 14px 0 27px;

  font-family: "Mont", Arial, sans-serif;
  font-size: 13px;
  font-weight: 200;
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
  font-family: "Mont", Arial, sans-serif;
  font-size: 9px;
  font-weight: 200;
  letter-spacing: 0.08em;

  color: #888888;

  @media (max-width: 700px) {
    font-size: 8px;
  }
`;

const TicketValue = styled.span`
  max-width: 65%;

  text-align: right;

  font-family: "Mont", Arial, sans-serif;
  font-size: 12px;
  font-weight: 200;

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
  font-family: "Mont", Arial, sans-serif;
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
    font-family: "Mont", Arial, sans-serif;
    font-size: 9px;
    letter-spacing: 0.08em;
    font-weight: 200;
    color: #111111;
  }

  span {
    font-family: "Mont", Arial, sans-serif;
    font-size: 10px;
    font-weight: 200;
    color: #777777;
  }
`;

const DoneButton = styled.button`
  min-width: 105px;
  height: 42px;

  border: 0;
  border-radius: 6px;

  background: #083672;
  color: #ffffff;

  font-family: "Mont", Arial, sans-serif;
  font-size: 11px;
  font-weight: 200;

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
