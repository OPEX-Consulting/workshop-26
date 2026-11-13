"use client";

import { useState } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const faqs = [
  {
    question: "Who can join the meeting?",
    answer:
      "The meeting is open to everyone interested in the discussion, including business leaders, technology professionals, finance teams, risk and compliance professionals, cybersecurity specialists, auditors, and other interested participants. Registration is required before joining.",
  },
  {
    question: "Do I need to register before joining?",
    answer:
      "Yes. All attendees must complete the registration form before joining the meeting. Once you have registered successfully, you will be redirected to the online meeting.",
  },
  {
    question: "How do I join the meeting?",
    answer:
      "Complete the registration form on our website. After successful registration, you will be redirected to the Zoom meeting, where you can follow the instructions to join.",
  },
  {
    question: "When is the meeting?",
    answer:
      "The meeting is scheduled for Thursday, 19 November 2026, at 11:00 AM West Africa Time (WAT).",
  },
  {
    question: "Where will the meeting take place?",
    answer:
      "The meeting will take place online via Zoom. You can participate from anywhere with a reliable internet connection and a compatible device.",
  },
  {
    question: "Do I need to install Zoom?",
    answer:
      "You can join using the Zoom application or a supported web browser, depending on the options available when you are redirected to the meeting.",
  },
  {
    question: "Can I join using my phone?",
    answer:
      "Yes. You can join from a smartphone, tablet, laptop, or desktop computer. For the best experience, use a stable internet connection and ensure your device's audio is working properly.",
  },
  {
    question: "Can I ask questions during the meeting?",
    answer:
      "Participation options depend on the meeting host's settings. You may be able to ask questions through the meeting chat or other participation features made available during the session.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className={montserrat.className}>
      <Container>
        <Intro>
          <IntroContent>
            <Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow>

            <Heading>
              Good questions.
              <br />
              <Accent>Clear answers.</Accent>
            </Heading>

            <Description>
              Everything you need to know before joining the OPEX online
              meeting. Register on our website and you will be redirected to the
              meeting after successful registration.
            </Description>

            <JoinCard>
              <JoinIcon>
                <MeetingIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
                </MeetingIcon>
              </JoinIcon>

              <JoinText>
                <JoinTitle>Everyone is welcome</JoinTitle>
                <JoinDescription>
                  Register first to access the online meeting.
                </JoinDescription>
              </JoinText>
            </JoinCard>
          </IntroContent>

          <IntroAside>
            <AsideNumber>01 / 02</AsideNumber>

            <AsideTitle>
              One meeting.
              <br />
              Everyone welcome.
            </AsideTitle>

            <AsideText>
              Secure your place by completing the registration form. Once
              registration is successful, you will be redirected to the Zoom
              meeting.
            </AsideText>
          </IntroAside>
        </Intro>

        <FAQLayout>
          <FAQHeading>
            <FAQHeadingTitle>Questions, answered.</FAQHeadingTitle>

            <FAQHeadingText>
              Find the details you need to prepare for the meeting.
            </FAQHeadingText>
          </FAQHeading>

          <FAQList>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <FaqItem key={faq.question} data-open={isOpen}>
                  <QuestionButton
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <QuestionNumber>
                      {String(index + 1).padStart(2, "0")}
                    </QuestionNumber>

                    <Question>{faq.question}</Question>

                    <Toggle aria-hidden="true" data-open={isOpen}>
                      <span />
                      <span />
                    </Toggle>
                  </QuestionButton>

                  <AnswerWrapper
                    id={answerId}
                    data-open={isOpen}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <Answer data-open={isOpen}>
                      <AnswerInner>{faq.answer}</AnswerInner>
                    </Answer>
                  </AnswerWrapper>
                </FaqItem>
              );
            })}
          </FAQList>
        </FAQLayout>

        <BottomNote>
          <BottomNoteText>Still have a question?</BottomNoteText>

          <ContactLink href="mailto:info@opexconsult.co.uk">
            Contact our team
            <ContactArrow aria-hidden="true">↗</ContactArrow>
          </ContactLink>
        </BottomNote>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 120px 24px;
  background: #ffffff;
  color: #083672;
  font-family: inherit;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 80px;
  align-items: end;
  padding-bottom: 90px;
  border-bottom: 1px solid #e8edf3;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 35px;
    padding-bottom: 55px;
  }
`;

const IntroContent = styled.div`
  max-width: 700px;
`;

const Eyebrow = styled.p`
  margin: 0 0 24px;
  color: #0067d4;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

const Heading = styled.h2`
  margin: 0;
  color: #083672;
  font-size: clamp(42px, 6vw, 76px);
  line-height: 1.08;
  letter-spacing: -0.065em;
  font-weight: 600;
`;

const Accent = styled.span`
  color: #0067d4;
`;

const Description = styled.p`
  max-width: 540px;
  margin: 26px 0 0;
  color: #68788c;
  font-size: 15px;
  line-height: 1.9;
  font-weight: 400;
`;

const JoinCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 390px;
  margin-top: 32px;
  padding: 18px;
  border: 1px solid #e7edf4;
  border-radius: 16px;
  background: #f8fbff;
`;

const JoinIcon = styled.div`
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  background: #e7f1ff;
  color: #0067d4;
`;

const MeetingIcon = styled.svg`
  width: 22px;
  height: 22px;
`;

const JoinText = styled.div``;

const JoinTitle = styled.p`
  margin: 0;
  color: #083672;
  font-size: 13px;
  font-weight: 700;
`;

const JoinDescription = styled.p`
  margin: 5px 0 0;
  color: #68788c;
  font-size: 11px;
  line-height: 1.6;
`;

const IntroAside = styled.aside`
  padding: 30px 0 6px 30px;
  border-left: 1px solid #e8edf3;

  @media (max-width: 850px) {
    padding: 25px 0 0;
    border-left: 0;
    border-top: 1px solid #e8edf3;
  }
`;

const AsideNumber = styled.p`
  margin: 0 0 25px;
  color: #0067d4;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
`;

const AsideTitle = styled.h3`
  margin: 0;
  color: #083672;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.3;
  letter-spacing: -0.045em;
  font-weight: 600;
`;

const AsideText = styled.p`
  max-width: 320px;
  margin: 18px 0 0;
  color: #68788c;
  font-size: 13px;
  line-height: 1.9;
`;

const FAQLayout = styled.div`
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 90px;
  padding-top: 80px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-top: 55px;
  }
`;

const FAQHeading = styled.div`
  align-self: start;
`;

const FAQHeadingTitle = styled.h3`
  margin: 0;
  color: #083672;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.045em;
`;

const FAQHeadingText = styled.p`
  margin: 12px 0 0;
  color: #68788c;
  font-size: 13px;
  line-height: 1.8;
`;

const FAQList = styled.div`
  border-top: 1px solid #e8edf3;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #e8edf3;
`;

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 18px;
  padding: 23px 0;
  border: 0;
  background: transparent;
  color: #083672;
  text-align: left;
  cursor: pointer;
  font-family: inherit;

  &:focus-visible {
    outline: 2px solid #0067d4;
    outline-offset: 4px;
    border-radius: 4px;
  }

  @media (max-width: 600px) {
    gap: 12px;
    padding: 20px 0;
  }
`;

const QuestionNumber = styled.span`
  width: 24px;
  flex-shrink: 0;
  color: #8a9ab0;
  font-size: 10px;
  font-weight: 600;
`;

const Question = styled.span`
  flex: 1;
  font-size: 14px;
  line-height: 1.7;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Toggle = styled.span<{ "data-open": boolean }>`
  position: relative;
  display: block;
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  border: 1px solid #dce5ef;
  border-radius: 50%;
  transition: background 200ms ease, border-color 200ms ease;

  span {
    position: absolute;
    top: 11px;
    left: 7px;
    width: 9px;
    height: 1px;
    background: ${({ "data-open": open }) => (open ? "#ffffff" : "#0067d4")};
    transition: transform 200ms ease, background 200ms ease;
  }

  span:last-child {
    transform: rotate(90deg);
  }

  ${({ "data-open": open }) =>
    open &&
    `
      background: #0067d4;
      border-color: #0067d4;

      span:last-child {
        transform: rotate(0deg);
      }
    `}
`;

const AnswerWrapper = styled.div<{ "data-open": boolean }>`
  display: grid;
  grid-template-rows: ${({ "data-open": open }) => (open ? "1fr" : "0fr")};
  transition: grid-template-rows 260ms ease;
`;

const Answer = styled.div<{ "data-open": boolean }>`
  min-height: 0;
  overflow: hidden;
  padding: ${({ "data-open": open }) => (open ? "0 42px 23px" : "0 42px 0")};
  transition: padding 260ms ease;

  @media (max-width: 600px) {
    padding-left: 36px;
    padding-right: 25px;
    padding-bottom: ${({ "data-open": open }) => (open ? "20px" : "0")};
  }
`;

const AnswerInner = styled.p`
  margin: 0;
  color: #68788c;
  font-size: 13px;
  line-height: 1.95;
  font-weight: 400;
`;

const BottomNote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 75px;
  padding-top: 25px;
  border-top: 1px solid #e8edf3;

  @media (max-width: 550px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
  }
`;

const BottomNoteText = styled.p`
  margin: 0;
  color: #68788c;
  font-size: 13px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #0067d4;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: gap 180ms ease;

  &:hover {
    gap: 14px;
  }

  &:focus-visible {
    outline: 2px solid #0067d4;
    outline-offset: 5px;
    border-radius: 3px;
  }
`;

const ContactArrow = styled.span`
  font-size: 16px;
  line-height: 1;
`;
