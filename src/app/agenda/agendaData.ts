// Snapshot of "OPEX Executive Workshop & Summit 2026 - Combined Full Agenda" (Google Doc),
// taken 21 Oct 2026 05:10 WAT. Shown only while PUBLISHED_DOC_URL in page.tsx is empty.

export type AgendaRow = { time: string; title: string; speaker: string };
export type AgendaBlock = {
  label: string;
  title: string;
  window: string;
  audience: string;
  rows: AgendaRow[];
};

export const agendaBlocks: AgendaBlock[] = [
  {
    label: "MORNING SESSION",
    title: "Finance Executive Workshop",
    window: "08:30 AM – 12:00 PM",
    audience:
      "Group CFOs, CFOs, Finance Directors, Controllers, and Financial Reporting/Sustainability Leaders",
    rows: [
      { time: "8:30 – 8:45 AM", title: "Registration, Breakfast & Executive Networking", speaker: "OPEX Secretariat" },
      { time: "8:45 – 9:00 AM", title: "Welcome Address: The End of Manual Finance", speaker: "OPEX Team" },
      { time: "9:00 – 9:20 AM", title: "Keynote Address: From Digitisation to Trust: Building AI-Enabled Reporting and Compliance for the Future", speaker: "Mr. Olufemi Shobanjo, Chief Executive Officer, Nigerian Exchange Group (NGX Group)" },
      { time: "9:20 – 9:40 AM", title: "Disclosure, Credibility & Cost of Capital", speaker: "Dr. Iheanyi Anyahara, Chair, Adoption Readiness Working Group (ARWG) for Sustainability Reporting in Nigeria | Former Director, Financial Reporting Council of Nigeria" },
      { time: "9:40 – 10:00 AM", title: "Reporting Standards Briefing: IFRS 18 and IFRS S1/S2 Readiness", speaker: "Mr. Titus Osawe, Coordinating Director, Financial Reporting Council of Nigeria" },
      { time: "10:00 – 10:20 AM", title: "Networking & Refreshment Break", speaker: "OPEX Secretariat" },
      { time: "10:20 – 10:40 AM", title: "Solution Showcase: ESG & Disclosure Management", speaker: "IRIS Carbon®" },
      { time: "10:40 – 11:00 AM", title: "Solution Showcase: FINNIVO Financial Consolidation", speaker: "Finnivo®" },
      { time: "11:00 – 11:30 AM", title: "CFO Panel: Is Your Finance Function Ready for the Next Reporting Cycle?", speaker: "Kayode Adewuyi (CFO, FCMB), Yinka Olasehinde (MTN Finance), Francis Banjoko, Titus Osawe. Moderated by Jochebed" },
      { time: "11:30 – 11:40 AM", title: "Closing Remarks & Next Steps", speaker: "Moderator / OPEX Team" },
    ],
  },
  {
    label: "AFTERNOON SESSION",
    title: "C-Level Technical Summit",
    window: "12:00 PM – 04:00 PM",
    audience:
      "CIOs, CTOs, CROs, CCOs, CISOs, IT GRC, Internal Control/Audit, DPOs, and Transformation Leaders",
    rows: [
      { time: "12:00 – 12:10 PM", title: "Opening: The New Technology Governance Mandate", speaker: "OPEX Team" },
      { time: "12:10 – 12:30 PM", title: "Economic Keynote: From Reform to Results: Why Nigeria's Next Phase of Growth Depends on Intelligent, Transparent Enterprises", speaker: "Musibau Lasisi, CEO, OPEX Consulting" },
      { time: "12:30 – 1:00 PM", title: "Panel 1: From Data to Intelligence: The Infrastructure Powering the Enterprise of Tomorrow", speaker: "Samson Adejumo (CTO, OPEX Consulting), Smith Osemeke (CEO, Unitellas)" },
      { time: "1:00 – 1:20 PM", title: "Talk & Q&A: From Software Development to Intelligent Systems Assurance", speaker: "Mr. Iyinoluwa Aboyeji, CEO and Founding Partner, Future Africa" },
      { time: "1:20 – 1:45 PM", title: "Solution Showcase & Q&A: Unitellas Edge Cloud Solution", speaker: "UNITELLAS" },
      { time: "1:45 – 2:05 PM", title: "Talk & Q&A: From Periodic Compliance to Continuous Compliance", speaker: "Central Bank of Nigeria" },
      { time: "2:05 – 2:30 PM", title: "Live Demonstration: From Fragmented IT GRC to Connected Governance and Continuous Regulatory Readiness", speaker: "RegTech365 / OPEX Team" },
      { time: "2:30 – 2:45 PM", title: "Networking & Refreshment Break", speaker: "OPEX Secretariat" },
      { time: "2:45 – 3:05 PM", title: "Talk & Q&A: Technology, Integrity and Investor Protection in Capital Market 2.0", speaker: "Securities and Exchange Commission" },
      { time: "3:05 – 3:25 PM", title: "Keynote & Q&A: From Periodic Privacy Compliance to Continuous Data Governance", speaker: "Lydia Ogba, Nigeria Data Protection Commission" },
      { time: "3:35 – 3:55 PM", title: "Panel: Connected Compliance: Governing AI and Autonomous Systems in a Real-Time Regulatory Environment", speaker: "Ofem-Ofem (CIO, FSDH), Dr. Niyi Ajao (CEO, Digital Finance Solutions). Moderated by Ayomide Osuntoye" },
      { time: "3:55 – 4:00 PM", title: "Executive Action Points and Closing", speaker: "OPEX Team" },
    ],
  },
];
