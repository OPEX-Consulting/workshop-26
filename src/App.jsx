import React, { useEffect, useMemo, useState } from "react";

const COLORS = {
  ink: "#0E1B38", text: "#15213B", muted: "#5B667A", blue: "#2563EB",
  blueSoft: "#EFF6FF", border: "#D9E1EC", surface: "#FFFFFF", background: "#F6F8FB",
  green: "#087443", gold: "#A15C00", red: "#B42318",
};
const EVENT_DATE = new Date("2026-10-21T08:00:00+01:00");
const EVENT_LABEL = "Wednesday 21 October 2026 · The Wheatbaker, Ikoyi";
const OPEX_LOGO_URL = new URL("../OPEX Logo.png", import.meta.url).href;

const ROUTER = {
  prompt: "Which of these is closest to what lands on your desk?",
  help: "This places you in the workshop session most relevant to your remit.",
  options: [
    { value: "A", label: "The accounts, the disclosures, the auditors, the investors", session: "breakfast" },
    { value: "B", label: "Sustainability and climate reporting", session: "breakfast" },
    { value: "C", label: "Risk, compliance, internal audit, technology governance", session: "summit" },
    { value: "D", label: "All of it — I'm accountable across finance and risk", session: "fullDay" },
  ],
};

const SET_A = {
  label: "Financial reporting", questions: [
    ["Last year-end, how long did it take you from trial balance to signed accounts?", ["Under a month", "One to two months", "Two to three months", "Longer than that"]],
    ["Be honest about the consolidation pack — is it built in a system, or is it built in Excel?", ["In a proper consolidation system", "Half system, half Excel", "Our auditors or a consultant do it", "Excel, with someone who knows where everything is"]],
    ["Eliminations and FX translation — does the system do it, or does a person do it?", ["The system, with a journal you can follow", "System first, then someone checks it line by line", "There's a spreadsheet, and one person owns it", "We rebuild it every period"]],
    ["When you're putting the annual report together, where do the numbers and the words live?", ["Same platform, linked", "Numbers linked, narrative in Word", "Both by hand, checked by eye", "We send files to a designer and hope"]],
    ["A number changes after the pack has gone to the reviewers. What happens?", ["It updates everywhere it appears", "We have a checklist of where to look", "We rely on somebody remembering", "We've published something inconsistent before"]],
    ["Who does your tagging for structured filing?", ["We do it ourselves, as part of the cycle", "We do it, and it's painful", "We pay a firm to do it", "Nobody's asked us for it yet"]],
    ["If a regulator asked you today where a figure in last year's accounts came from, how long would that take?", ["Same day", "A few days", "Only one person could answer that", "We've never been asked"]],
  ],
};
const SET_B = {
  label: "Sustainability and ESG", questions: [
    ["Has your board actually passed a resolution to adopt the sustainability standards?", ["Passed and filed", "Drafted, waiting on the board", "Not yet", "I'd have to check"]],
    ["Has anyone sat down and compared what you report now against what S1 and S2 ask for?", ["Done and submitted", "Being done now", "We've asked someone to", "Not yet"]],
    ["And if that comparison has been done — is there a plan and a budget behind it?", ["Written, costed, approved", "Drafted", "No plan yet", "We haven't got that far"]],
    ["Your energy, fuel and emissions numbers — where do they come from?", ["Collected through the year, with owners", "Pulled together once a year", "Worked out from invoices and averages", "We don't collect them"]],
    ["What about your suppliers and value chain?", ["We have a method that works", "Started with the big categories", "We know it's coming", "Not on the agenda"]],
    ["Who writes the sustainability report — and does it run on the same calendar as the accounts?", ["Finance, same cycle", "Finance, different timeline", "Sustainability or comms team, separately", "An outside consultant, each year"]],
    ["If your auditors had to give assurance on it, how would that go?", ["Fine, the evidence is there", "Limited assurance, yes", "They've raised issues before", "It's never been assured"]],
  ],
};
const SET_C = {
  label: "Regtech compliance and GRC", questions: [
    ["How many risk registers exist across the group?", ["One, with one taxonomy", "A group one plus local versions", "Several, reconciled now and then", "Every function keeps its own"]],
    ["When it's time to test controls, where does the evidence come from?", ["The systems produce it as they run", "Partly automatic", "Someone goes and collects it", "We pull it together when the auditor arrives"]],
    ["Four or five regulators, each with their own obligations. How do you keep track?", ["A live register with named owners", "A shared tracker", "Compliance circulates updates", "Honestly, we find out when it lands"]],
    ["Do you know everywhere AI or automated decisioning is already running in your business?", ["Yes, documented, with owners", "There's an informal list", "It's running, but nobody's listed it", "I couldn't tell you"]],
    ["And who governs those models?", ["There's a framework, with accountability and validation", "A policy exists, not really operating", "IT treats them like any other system", "Nobody, formally"]],
    ["Here's a different question — is your GRC function itself automated, or is it doing the manual work it tells everyone else to stop doing?", ["Controls, evidence and reporting run automatically", "We've automated one area", "We've talked about it", "It's all manual"]],
    ["Your vendors and third parties — how closely do you actually watch them?", ["Assessed, monitored, with exit plans in place", "Checked at onboarding", "There are contracts, no ongoing review", "Case by case"]],
  ],
};
const SET_D = {
  label: "Full day", questions: [
    ["How many different systems end up producing your regulatory and financial submissions?", ["One connected chain", "Two or three, integrated", "Several, loosely joined", "I've never counted"]],
    ["The same number, going to two different regulators — does it ever come out differently?", ["Never, it reconciles", "It reconciles once we adjust", "We assume it does", "Yes, it has"]],
    ["Who owns the space between finance data and risk data?", ["A named person or function", "Shared between the CFO and CRO", "Nobody, really", "It hasn't come up"]],
    ["Between board meetings, how much assurance do you actually have?", ["Continuous, I can ask any day", "A monthly pack", "Quarterly", "At year end"]],
    ["Invoice-level reporting to the tax authority — where are you?", ["Fully integrated from source", "Partly", "Manual submission", "Not addressed"]],
    ["Has anyone outside the business — a lender, a correspondent bank, an investor — ever questioned the quality of your reporting or your controls?", ["Never come up", "Raised, and we satisfied them", "Raised, still open", "Yes, and it cost us"]],
    ["If a deadline moved forward by three months, what breaks first?", ["Nothing serious", "The reporting side", "The evidence and controls side", "Both, and we'd be exposed"]],
  ],
};
const QUESTION_SETS = { A: SET_A, B: SET_B, C: SET_C, D: SET_D };
const SESSIONS = {
  breakfast: { name: "Breakfast briefing", time: "8am – 11am WAT", theme: "Consolidation, disclosure and sustainability reporting" },
  summit: { name: "Main summit", time: "11:30am – 4pm WAT", theme: "Regtech compliance, GRC and AI governance" },
  fullDay: { name: "Full day", time: "8am – 4pm WAT", theme: "Institution-wide finance and risk accountability" },
};

function makeQuestions(route) {
  return QUESTION_SETS[route].questions.map(([prompt, options], index) => ({
    id: `${route}${index + 1}`, prompt, options, tag: QUESTION_SETS[route].label,
    priorityImmediate: route === "D" && index === 5,
  }));
}
function sessionFor(route) { return SESSIONS[ROUTER.options.find((option) => option.value === route)?.session]; }
function score(route, answers) {
  const questions = makeQuestions(route); let got = 0; const flags = []; let immediatePriority = false;
  questions.forEach((question) => {
    const answer = answers[question.id]; if (answer === undefined) return;
    got += 3 - answer;
    if (answer >= 2) flags.push({ question: question.id, label: question.prompt, answer: String.fromCharCode(65 + answer) });
    if (question.priorityImmediate && answer === 3) immediatePriority = true;
  });
  const pct = Math.round((got / (questions.length * 3)) * 100);
  const band = pct >= 75 ? { label: "Substantially ready", color: COLORS.green } : pct >= 45 ? { label: "Partially ready", color: COLORS.gold } : { label: "Materially exposed", color: COLORS.red };
  const priority = immediatePriority || flags.length >= 3 ? "Priority" : flags.length ? "Follow up" : "Nurture";
  return { got, max: questions.length * 3, pct, band, flags, priority };
}
function newReference() { return `RDX-2026-${Math.floor(1000 + Math.random() * 9000)}`; }

function Logo() {
  return <img src={OPEX_LOGO_URL} alt="OPEX Consulting" style={styles.logoImage} />;
}
function Button({ children, onClick, secondary = false, disabled = false, type = "button" }) { return <button type={type} onClick={onClick} disabled={disabled} style={{ ...styles.button, ...(secondary ? styles.secondaryButton : {}), ...(disabled ? styles.disabledButton : {}) }}>{children}</button>; }
function Progress({ current, total, label }) { return <div style={styles.progressWrap}><div style={styles.progressMeta}><span>{label}</span><span>{current} of {total}</span></div><div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${Math.min(100, (current / total) * 100)}%` }} /></div></div>; }
function Field({ label, value, onChange, type = "text" }) { return <label style={styles.field}><span>{label} <em>*</em></span><input required type={type} value={value} onChange={(event) => onChange(event.target.value)} style={styles.input} /></label>; }
function LoadingState() { return <section style={styles.card} aria-live="polite" aria-busy="true"><div style={styles.loadingState}><div className="readiness-spinner" aria-hidden="true"><span /><span /><span /></div><div style={styles.eyebrow}>SECURING YOUR PLACE</div><h2 style={styles.heading}>Connecting the dots…</h2><p style={styles.helper}>We’re recording your registration and preparing your session details.</p><div style={styles.loadingNote}><span className="loading-dot" /> This usually takes a few seconds.</div></div></section>; }

export default function App() {
  const [stage, setStage] = useState("intro"); const [route, setRoute] = useState(null); const [questionIndex, setQuestionIndex] = useState(0); const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", email: "", role: "", organisation: "" }); const [saveState, setSaveState] = useState("idle"); const [submitError, setSubmitError] = useState(""); const [reference] = useState(newReference);
  useEffect(() => { const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"; document.head.appendChild(link); return () => document.head.removeChild(link); }, []);
  const questions = useMemo(() => route ? makeQuestions(route) : [], [route]); const result = useMemo(() => route ? score(route, answers) : null, [route, answers]); const session = route ? sessionFor(route) : null;
  const selectedAnswer = route ? answers[questions[questionIndex]?.id] : undefined; const daysToEvent = Math.max(0, Math.ceil((EVENT_DATE - new Date()) / 86400000));
  function chooseRoute(value) { setRoute(value); setAnswers({}); setQuestionIndex(0); }
  function goBack() {
    if (stage === "route") setStage("intro");
    else if (stage === "questions") {
      if (questionIndex === 0) setStage("route");
      else setQuestionIndex((index) => index - 1);
    } else if (stage === "details") {
      setQuestionIndex(questions.length - 1);
      setStage("questions");
    }
  }
  function continueFromQuestion() {
    if (questionIndex < questions.length - 1) setQuestionIndex((index) => index + 1);
    else setStage("details");
  }
  async function submit(event) {
    event.preventDefault(); setSaveState("saving"); setSubmitError("");
    const record = { ref: reference, at: new Date().toISOString(), route, answers, session: session.name, pct: result.pct, band: result.band.label, priority: result.priority, flags: result.flags, ...contact };
    try {
      const endpoint = import.meta.env.REGISTRATION_SHEET_ENDPOINT;
      if (!endpoint) throw new Error("Registration endpoint is not configured");
      await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(record) });
      setSaveState("saved");
      setStage("result");
    } catch {
      setSaveState("error");
      setSubmitError("We couldn’t complete your registration. Please check your connection and try again.");
    }
  }
  return <div style={styles.app}>
    <header style={styles.header}><div style={styles.headerInner}><Logo /><div style={styles.headerMeta}><span>{daysToEvent} days to the workshop</span></div></div></header>
    <main style={styles.main}><div style={styles.container}>
      {stage !== "intro" && stage !== "result" && <div style={styles.topLine}><button onClick={goBack} style={styles.backButton}>← Back</button><span>Private executive registration</span></div>}
      {stage === "intro" && <section style={styles.heroCard}><div style={styles.heroTop}><div style={styles.eyebrow}>REGTECH365 · EXECUTIVE WORKSHOP</div><h1 style={styles.heroTitle}>THE END OF MANUAL</h1><p style={styles.heroCopy}>AI, Connected Systems and the Future of Financial Reporting and Compliance</p><Button onClick={() => setStage("route")}>Begin registration <span aria-hidden="true">→</span></Button></div><div style={styles.eventDetails}><div><strong>{EVENT_LABEL}</strong></div><div>Allow approximately 3 minutes. Your answers place you in the most relevant workshop session.</div></div></section>}
      {stage === "route" && <section style={styles.card}><Progress current={1} total={2} label="Your remit" /><h2 style={styles.heading}>{ROUTER.prompt}</h2><p style={styles.helper}>{ROUTER.help}</p><div style={styles.options} role="radiogroup" aria-label={ROUTER.prompt}>{ROUTER.options.map((option) => <button key={option.value} role="radio" aria-checked={route === option.value} onClick={() => chooseRoute(option.value)} style={{ ...styles.option, ...(route === option.value ? styles.selectedOption : {}) }}><span style={{ ...styles.radio, ...(route === option.value ? styles.selectedRadio : {}) }}>{route === option.value && <span style={styles.radioDot} />}</span><span><strong>{option.label}</strong></span></button>)}</div><div style={styles.actions}><Button disabled={!route} onClick={() => setStage("questions")}>Continue <span aria-hidden="true">→</span></Button></div></section>}
      {stage === "questions" && questions[questionIndex] && <section style={styles.card}><Progress current={questionIndex + 1} total={questions.length} label={QUESTION_SETS[route].label} /><div style={styles.questionTag}>{questions[questionIndex].tag}</div><h2 style={styles.heading}>{questions[questionIndex].prompt}</h2><div style={styles.options} role="radiogroup" aria-label={questions[questionIndex].prompt}>{questions[questionIndex].options.map((option, index) => { const selected = selectedAnswer === index; return <button key={option} role="radio" aria-checked={selected} onClick={() => setAnswers((current) => ({ ...current, [questions[questionIndex].id]: index }))} style={{ ...styles.option, ...(selected ? styles.selectedOption : {}) }}><span style={{ ...styles.radio, ...(selected ? styles.selectedRadio : {}) }}>{selected && <span style={styles.radioDot} />}</span><span><strong>{String.fromCharCode(65 + index)}.</strong> {option}</span></button>; })}</div><div style={styles.actions}><Button disabled={selectedAnswer === undefined} onClick={continueFromQuestion}>{questionIndex === questions.length - 1 ? "Continue to registration" : "Continue"} <span aria-hidden="true">→</span></Button></div></section>}
      {stage === "details" && (saveState === "saving" ? <LoadingState /> : <section style={styles.card}><Progress current={3} total={3} label="Registration details" /><h2 style={styles.heading}>Reserve your place</h2><p style={styles.helper}>We’ll use these details to confirm your seat and send the workshop information.</p><form onSubmit={submit}><div style={styles.formGrid}><Field label="Full name" value={contact.name} onChange={(value) => setContact({ ...contact, name: value })} /><Field label="Work email" type="email" value={contact.email} onChange={(value) => setContact({ ...contact, email: value })} /><Field label="Role or title" value={contact.role} onChange={(value) => setContact({ ...contact, role: value })} /><Field label="Organisation" value={contact.organisation} onChange={(value) => setContact({ ...contact, organisation: value })} /></div>{submitError && <p role="alert" style={styles.error}>{submitError}</p>}<div style={styles.actions}><Button secondary onClick={goBack}>Back</Button><Button type="submit" disabled={!contact.name || !contact.email || !contact.role || !contact.organisation || saveState === "saving"}>{saveState === "saving" ? "Saving…" : "Confirm my place →"}</Button></div></form></section>)}
      {stage === "result" && <section style={styles.confirmation}><div style={styles.confirmationMark} aria-hidden="true">✓</div><div style={styles.eyebrow}>REGISTRATION CONFIRMED</div><h1 style={styles.confirmTitle}>We’ll see you there, {contact.name.split(" ")[0]}.</h1><p style={styles.confirmCopy}>Your place at the OPEX executive workshop is reserved.</p><div style={styles.sessionBox}><div style={styles.sessionLabel}>YOUR SESSION</div><strong style={styles.sessionName}>{session.name}</strong><div>{session.time} · {EVENT_LABEL.split(" · ")[0]}</div><div style={styles.sessionTheme}>{session.theme}</div></div></section>}
    </div></main><footer style={styles.footer}>OPEX Consulting · Executive workshop registration</footer>
  </div>;
}

const styles = {
  app: { minHeight: "100vh", display: "flex", flexDirection: "column", background: COLORS.background, color: COLORS.text, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
  header: { background: COLORS.surface, color: COLORS.ink, borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }, headerInner: { maxWidth: 860, margin: "0 auto", width: "100%", boxSizing: "border-box", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 },
  logoImage: { display: "block", width: 142, height: 48, objectFit: "contain", objectPosition: "left center" }, headerMeta: { color: COLORS.muted, fontSize: 11, display: "flex", gap: 8, alignItems: "center", textAlign: "right" },
  main: { flex: 1, padding: "32px 20px 48px" }, container: { maxWidth: 680, margin: "0 auto" }, topLine: { display: "flex", justifyContent: "space-between", alignItems: "center", color: COLORS.muted, fontSize: 11, marginBottom: 14 }, backButton: { border: 0, background: "transparent", color: COLORS.muted, padding: 0, cursor: "pointer", font: "inherit", fontSize: 13, fontWeight: 600 },
  heroCard: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 35px rgba(14,27,56,0.06)" }, heroTop: { background: COLORS.ink, color: "#FFFFFF", padding: "48px" }, eyebrow: { fontSize: 10, letterSpacing: "1.5px", fontWeight: 800, color: "#60A5FA", textTransform: "uppercase", marginBottom: 14 }, heroTitle: { fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, fontSize: "clamp(34px, 6vw, 52px)", lineHeight: 1.03, margin: "0 0 18px", maxWidth: 560 }, heroCopy: { color: "#D6DEEB", fontSize: 14, lineHeight: 1.65, maxWidth: 520, margin: "0 0 28px" }, eventDetails: { padding: "22px 48px", display: "grid", gap: 8, color: COLORS.muted, fontSize: 12.5, lineHeight: 1.55 },
  card: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "32px 36px", boxShadow: "0 12px 35px rgba(14,27,56,0.05)" }, progressWrap: { marginBottom: 28 }, progressMeta: { display: "flex", justifyContent: "space-between", color: COLORS.muted, fontSize: 11, fontWeight: 700, marginBottom: 8 }, progressTrack: { height: 5, background: "#E8EDF4", borderRadius: 99, overflow: "hidden" }, progressFill: { height: "100%", background: COLORS.blue, borderRadius: 99, transition: "width 180ms ease" }, questionTag: { color: COLORS.blue, textTransform: "uppercase", letterSpacing: "1px", fontSize: 10, fontWeight: 800, marginBottom: 9 }, heading: { fontSize: 23, lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.35px", margin: "0 0 10px", color: COLORS.ink }, helper: { color: COLORS.muted, fontSize: 13, lineHeight: 1.55, margin: "0 0 24px" }, options: { display: "grid", gap: 10, marginTop: 24 }, option: { display: "flex", alignItems: "flex-start", gap: 13, textAlign: "left", width: "100%", padding: "15px 16px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, cursor: "pointer", font: "inherit", fontSize: 13.5, lineHeight: 1.45 }, selectedOption: { borderColor: COLORS.blue, background: COLORS.blueSoft, boxShadow: `0 0 0 1px ${COLORS.blue}` }, radio: { width: 19, height: 19, borderRadius: "50%", border: `2px solid ${COLORS.border}`, display: "grid", placeItems: "center", flexShrink: 0, marginTop: 1 }, selectedRadio: { borderColor: COLORS.blue }, radioDot: { width: 9, height: 9, borderRadius: "50%", background: COLORS.blue }, actions: { display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "center", marginTop: 28 }, button: { background: COLORS.blue, color: "#FFFFFF", border: 0, borderRadius: 6, padding: "12px 19px", font: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", minHeight: 44 }, secondaryButton: { background: COLORS.surface, color: COLORS.text, border: `1px solid ${COLORS.border}` }, disabledButton: { opacity: 0.45, cursor: "not-allowed" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 16px" }, field: { display: "grid", gap: 7, color: COLORS.text, fontSize: 12, fontWeight: 700 }, input: { width: "100%", boxSizing: "border-box", padding: "12px 13px", border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.text, background: COLORS.surface, font: "inherit", fontSize: 13, outlineColor: COLORS.blue }, error: { color: COLORS.red, background: "#FEF3F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 12px", fontSize: 12, lineHeight: 1.45, margin: "18px 0 0" }, loadingState: { textAlign: "center", padding: "18px 10px 8px" }, loadingNote: { display: "inline-flex", alignItems: "center", gap: 8, color: COLORS.muted, fontSize: 11.5, marginTop: 2 },
  confirmation: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "44px 48px", boxShadow: "0 12px 35px rgba(14,27,56,0.06)" }, confirmationMark: { width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", color: COLORS.green, background: "#EAF8F0", fontSize: 22, fontWeight: 800, marginBottom: 22 }, confirmTitle: { fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, fontSize: 44, lineHeight: 1.05, margin: "0 0 12px", color: COLORS.ink }, confirmCopy: { color: COLORS.muted, fontSize: 14, margin: "0 0 26px" }, sessionBox: { display: "grid", gap: 6, background: COLORS.blueSoft, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "18px 20px", color: COLORS.text, fontSize: 13 }, sessionLabel: { color: COLORS.blue, fontSize: 10, letterSpacing: "1.2px", fontWeight: 800 }, sessionName: { color: COLORS.ink, fontSize: 20 }, sessionTheme: { color: COLORS.muted, marginTop: 4 }, scoreRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 26, paddingTop: 22, borderTop: `1px solid ${COLORS.border}` }, scoreNumber: { fontFamily: "'Instrument Serif', Georgia, serif", color: COLORS.ink, fontSize: 48 }, scoreUnit: { color: COLORS.muted, fontSize: 13, marginLeft: 5 }, band: { color: "#FFFFFF", borderRadius: 99, padding: "7px 12px", fontSize: 11, fontWeight: 800 }, reference: { color: COLORS.muted, fontSize: 11, margin: "24px 0 0" }, footer: { padding: "18px 20px", textAlign: "center", color: COLORS.muted, fontSize: 10, flexShrink: 0 },
};
