import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./agenda.module.css";

// The agenda is the event brochure (12 pages). Page images live in public/agenda/
// (page-01.webp ... page-12.webp), rendered from OPEX-Summit-2026-Brochure.pdf.
// To update: replace the PDF, re-render the pages, and push.
const BROCHURE_PDF = "/agenda/OPEX-Summit-2026-Brochure.pdf";
const PAGE_COUNT = 12;
const PAGE_W = 1200;
const PAGE_H = 1685;

export const metadata: Metadata = {
  title: "Agenda | OPEX Executive Workshop & Summit 2026",
  description:
    "Full agenda for the OPEX Executive Workshop & Summit 2026, Wednesday 21 October 2026, The Wheatbaker, Ikoyi, Lagos.",
};

export default function AgendaPage() {

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>
            ← Back to summit
          </Link>
          <span className={styles.eyebrow}>THE AGENDA</span>
          <h1 className={styles.heading}>
            <span className={styles.light}>The End</span>{" "}
            <span className={styles.brand}>
              of <span className={styles.accent}>Manual.</span>
            </span>
          </h1>
          <p className={styles.meta}>
            Wednesday, 21 October 2026 · The Wheatbaker, Ikoyi, Lagos
          </p>
          <a href={BROCHURE_PDF} className={styles.pdfButton} download>
            Download brochure (PDF)
          </a>
          <p className={styles.theme}>
            AI, Connected Systems and the Future of Financial Reporting and
            Compliance
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.pages}>
          {Array.from({ length: PAGE_COUNT }, (_, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={n}
                src={`/agenda/page-${n}.webp`}
                alt={`Event brochure, page ${i + 1} of ${PAGE_COUNT}`}
                width={PAGE_W}
                height={PAGE_H}
                loading={i < 2 ? "eager" : "lazy"}
                className={styles.pageImg}
              />
            );
          })}
        </div>

        <footer className={styles.footer}>
          <Image
            src="/images/opexwhite.webp"
            alt="OPEX Consulting"
            width={78}
            height={31}
            className={styles.logo}
          />
          <span>Agenda subject to change.</span>
        </footer>
      </div>
    </main>
  );
}
