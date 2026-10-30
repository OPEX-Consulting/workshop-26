// Post-conference assessment questions, from the 'Post Conference Assessment Questions' Google Doc.
// `column` is the header used in the 'Follow Up' tab of the OPEX Conference 2026 sheet.

export type Question = {
  key: string;
  title: string;
  column: string;
  hint?: string;
  type: "text" | "paragraph" | "radio" | "checkbox";
  required: boolean;
  section?: "contact";
  options?: string[];
  other?: boolean;
  max?: number;
  /** Option that clears every other choice when picked (checkbox only). */
  exclusive?: string;
};

export const MATERIALS_ONLY = "Access to summit materials only, without further follow-up";

export type Track = "attendee" | "non_attendee";

export const questions: Question[] = [
  {
    "key": "name",
    "title": "Full name",
    "type": "text",
    "required": true,
    "section": "contact",
    "column": "Name"
  },
  {
    "key": "email",
    "title": "Work email",
    "type": "text",
    "required": true,
    "section": "contact",
    "column": "Email"
  },
  {
    "key": "organisation",
    "title": "Organisation",
    "type": "text",
    "required": true,
    "section": "contact",
    "column": "Organisation"
  },
  {
    "key": "role",
    "title": "Job title",
    "type": "text",
    "required": true,
    "section": "contact",
    "column": "Job Title"
  },
  {
    "key": "q1",
    "title": "Overall, how would you rate your experience at the conference?",
    "type": "radio",
    "required": true,
    "options": [
      "Excellent",
      "Very good",
      "Good",
      "Fair",
      "Poor"
    ],
    "column": "Q1 Overall experience"
  },
  {
    "key": "q2",
    "title": "Which aspects of the conference did you enjoy most?",
    "hint": "Select all that apply.",
    "type": "checkbox",
    "required": true,
    "options": [
      "Keynote presentations",
      "Expert panel discussions",
      "Live product demonstrations",
      "Regulatory insights and industry updates",
      "Networking opportunities",
      "Solution showcases",
      "Question-and-answer sessions"
    ],
    "column": "Q2 Enjoyed most"
  },
  {
    "key": "q3",
    "title": "How relevant were the discussions to your organisation's current priorities?",
    "type": "radio",
    "required": true,
    "options": [
      "Extremely relevant",
      "Very relevant",
      "Somewhat relevant",
      "Not very relevant",
      "Not relevant"
    ],
    "column": "Q3 Relevance"
  },
  {
    "key": "q4",
    "title": "Which of the following platforms or services would be relevant to your organisation?",
    "hint": "Select all that apply.",
    "type": "checkbox",
    "required": true,
    "options": [
      "Finnivo – Financial Consolidation",
      "IRIS Carbon – ESG & Sustainability Disclosure Management",
      "RegComply ERIS – IT Governance, Risk & Compliance",
      "OPEX Cloud – Cloud Infrastructure & Related Services",
      "OPEX Consulting – IT/GRC Consulting Services"
    ],
    "column": "Q4 Relevant solutions"
  },
  {
    "key": "q5",
    "title": "Which one of these solutions would you prioritise for further discussion or a demonstration?",
    "type": "radio",
    "required": true,
    "options": [
      "Finnivo",
      "IRIS Carbon",
      "RegComply ERIS",
      "OPEX Cloud",
      "OPEX Consulting (IT/GRC Services)",
      "None at this time"
    ],
    "column": "Q5 Priority solution"
  },
  {
    "key": "q6",
    "title": "What would be the most useful next step for you?",
    "type": "radio",
    "required": true,
    "options": [
      "A 15-minute walkthrough of how we’d tackle the challenge I named",
      "A short recorded demo or brief I can review in my own time",
      "Just the summit findings report",
      "Nothing at this time"
    ],
    "column": "Q6 Next step"
  },
  {
    "key": "q8",
    "title": "Which part of managing compliance and risk causes your organisation the most effort or problems today?",
    "hint": "Select one.",
    "type": "radio",
    "required": true,
    "other": true,
    "options": [
      "Keeping track of new regulations and circulars, and working out what they mean for us",
      "Knowing who owns each requirement, and whether it is actually being done and working",
      "Gathering and organising evidence when regulators or auditors ask",
      "Tracking audit and exam findings, and making sure they’re fixed on time",
      "Identifying and assessing risks, and keeping the risk register up to date",
      "Managing risk from vendors and third parties",
      "Recording and responding to incidents (cyber, operational, data breach)",
      "Keeping policies current and getting staff to acknowledge them",
      "Giving management and the board a clear, up-to-date picture of risk and compliance"
    ],
    "column": "Q8 Biggest compliance/risk effort"
  },
  {
    "key": "q9",
    "title": "Which of these poses the biggest threat to your organisation achieving its business goals in the next 12 months?",
    "hint": "Select one.",
    "type": "radio",
    "required": true,
    "other": true,
    "options": [
      "Operational disruptions (system downtime, process failures) that affect customers or service",
      "Cyber attacks or data breaches",
      "Fraud and financial crime losses",
      "Failures in vendors or third parties we depend on",
      "Regulatory changes that disrupt how we operate or grow",
      "Damage to customer trust or our reputation",
      "Rising cost of compliance and risk work eating into profitability",
      "Not seeing problems early enough. We find out only after something goes wrong",
      "Slow or manual processes that hold back growth and new products"
    ],
    "column": "Q9 Biggest threat (12 months)"
  },
  {
    "key": "q10",
    "title": "What is the main thing stopping your organisation from getting ahead of that threat?",
    "hint": "Select up to two.",
    "type": "checkbox",
    "max": 2,
    "required": true,
    "other": true,
    "options": [
      "No single, up-to-date view. Information sits in spreadsheets, emails, and separate systems",
      "We react after issues happen rather than seeing them coming",
      "It’s unclear who owns which risks, controls or actions",
      "Processes are manual and depend on a few key people",
      "Our systems don’t talk to each other",
      "We can’t easily show the impact to management, the board or regulators",
      "Not enough skilled people",
      "Budget or management priority"
    ],
    "column": "Q10 Main blockers"
  },
  {
    "key": "q7",
    "title": "What could we improve or include in future OPEX events?",
    "type": "paragraph",
    "required": false,
    "column": "Q7 Improvements"
  },
  {
    "key": "consent",
    "title": "Consent",
    "type": "checkbox",
    "required": true,
    "options": [
      "I agree that OPEX Consulting may store my answers and contact me about the presentation slides and related solutions."
    ],
    "column": "Consent"
  }
];

// Non-attendee track, from the Google Doc 1uB88F55FjfOWGUuF7SnaQUtckpfUQXhWpI0U34kauiU.
// Saved to the "Non-Attendee Follow Up" tab of "OPEX End of Manual Participants 2026".
export const nonAttendeeQuestions: Question[] = [
  { key: "name", title: "Full name", type: "text", required: true, section: "contact", column: "Name" },
  { key: "email", title: "Work email", type: "text", required: true, section: "contact", column: "Email" },
  { key: "organisation", title: "Organisation", type: "text", required: true, section: "contact", column: "Organisation" },
  {
    key: "role",
    title: "What best describes your current role?",
    type: "radio",
    required: true,
    column: "Role",
    options: [
      "C-Suite / Executive Management",
      "Finance / Financial Reporting",
      "Risk / Compliance / Internal Audit",
      "IT / Information Security",
      "Operations / Business Transformation",
      "Sustainability / ESG Reporting",
    ],
    other: true,
  },
  {
    key: "n1",
    title: "Which business priority is receiving the greatest attention from your organisation over the next 12 months?",
    hint: "Select up to 2.",
    type: "checkbox",
    required: true,
    max: 2,
    column: "Q1 Business priorities",
    options: [
      "Improving financial reporting accuracy, speed and visibility",
      "Strengthening regulatory reporting and disclosure processes",
      "Meeting data residency, localisation or cloud infrastructure requirements",
      "Improving risk oversight, compliance monitoring and governance",
      "Automating manual workflows and connecting existing business systems",
      "Reducing operating costs while improving productivity",
      "Modernising technology infrastructure to support business growth",
    ],
  },
  {
    key: "n2",
    title: "Where does your organisation experience the most significant operational bottlenecks?",
    hint: "Select up to 2.",
    type: "checkbox",
    required: true,
    max: 2,
    exclusive: "No significant bottlenecks at present",
    column: "Q2 Operational bottlenecks",
    options: [
      "Consolidating data from multiple systems or business units",
      "Reconciling inconsistent data and correcting reporting errors",
      "Preparing financial statements, management reports or regulatory returns",
      "Tracking regulatory changes and implementing required actions",
      "Identifying risks, monitoring transactions and investigating exceptions",
      "Managing controls, audit evidence and remediation",
      "Managing cloud infrastructure, data security or system integration",
      "No significant bottlenecks at present",
    ],
  },
  {
    key: "n3",
    title: "How confident is your organisation in managing these processes accurately, efficiently and within required timelines?",
    type: "radio",
    required: true,
    column: "Q3 Confidence",
    options: [
      "Highly confident \u2014 processes are controlled and largely automated",
      "Moderately confident \u2014 processes are reliable but require manual work",
      "Limited confidence \u2014 data gaps, control weaknesses or delays remain",
      "Low confidence \u2014 processes frequently require significant intervention",
      "Not directly involved in these processes",
    ],
  },
  {
    key: "n4",
    title: "What best describes your organisation\u2019s current approach to addressing these challenges?",
    type: "radio",
    required: true,
    column: "Q4 Current approach",
    options: [
      "Actively evaluating solutions or providers",
      "Considering upgrades or replacement of existing systems",
      "Exploring automation, integration or process improvement",
      "Assessing requirements before committing to a solution",
      "No formal initiative planned at present",
    ],
  },
  {
    key: "n5",
    title: "What would be the most useful next step for your organisation?",
    type: "radio",
    required: true,
    column: "Q5 Next step",
    options: [
      "A product demonstration tailored to our needs",
      "A consultation to assess processes and identify gaps",
      "A technical discussion on cloud, data localisation or integration",
      "A discussion on financial reporting, risk, compliance or governance",
      "A proposal outlining solutions, scope and costs",
      "Relevant industry insights or case studies",
      MATERIALS_ONLY,
    ],
  },
  {
    key: "n6",
    title: "Is there a specific business challenge or upcoming deadline you would like us to understand?",
    hint: "Optional.",
    type: "paragraph",
    required: false,
    column: "Challenge / deadline",
  },
  {
    key: "consent",
    title: "Consent",
    type: "checkbox",
    required: true,
    options: [
      "I agree that OPEX Consulting may store my answers and contact me about the summit materials and related solutions.",
    ],
    column: "Consent",
  },
];

export const questionsFor = (track: Track) => (track === "attendee" ? questions : nonAttendeeQuestions);
export const TAB_FOR: Record<Track, string> = { attendee: "Follow Up", non_attendee: "Non-Attendee Follow Up" };
