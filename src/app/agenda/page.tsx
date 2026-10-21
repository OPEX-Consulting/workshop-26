import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./agenda.module.css";
import { agendaBlocks } from "./agendaData";

// Paste the Google Docs "Publish to the web" link here (File > Share > Publish to web).
// When set, the page shows the live doc and updates on its own whenever the doc is edited.
// When empty, the page shows the snapshot in agendaData.ts.
const PUBLISHED_DOC_URL =
  "https://docs.google.com/document/d/e/2PACX-1vQq0ctbhKmJCwvTF3tFPmacJyrXgPqavbdMniUFDiT7Bsu4jmGBML1KezCqU7rVMiFh6Rq75EYQb7JO/pub";

export const metadata: Metadata = {
  title: "Agenda | OPEX Executive Workshop & Summit 2026",
  description:
    "Full agenda for the OPEX Executive Workshop & Summit 2026, Wednesday 21 October 2026, The Wheatbaker, Ikoyi, Lagos.",
};

function embedUrl(url: string) {
  const u = new URL(url);
  u.searchParams.set("embedded", "true");
  return u.toString();
}

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
          <p className={styles.theme}>
            AI, Connected Systems and the Future of Financial Reporting and
            Compliance
          </p>
        </div>
      </header>

      <div className={styles.container}>
        {PUBLISHED_DOC_URL ? (
          <div className={styles.embedWrap}>
            <iframe
              src={embedUrl(PUBLISHED_DOC_URL)}
              title="OPEX Summit 2026 agenda"
              className={styles.embed}
            />
            <a
              href={PUBLISHED_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openFull}
            >
              Open agenda in full screen
            </a>
          </div>
        ) : (
          agendaBlocks.map((block) => (
            <section key={block.title} className={styles.block}>
              <span className={styles.eyebrow}>{block.label}</span>
              <h2 className={styles.blockTitle}>{block.title}</h2>
              <p className={styles.window}>{block.window}</p>
              <p className={styles.audience}>
                <strong>Audience:</strong> {block.audience}
              </p>
              <ol className={styles.rows}>
                {block.rows.map((row) => (
                  <li key={row.time + row.title} className={styles.row}>
                    <span className={styles.time}>{row.time}</span>
                    <div>
                      <p className={styles.title}>{row.title}</p>
                      <p className={styles.speaker}>{row.speaker}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}

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
