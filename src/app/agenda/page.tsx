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

// Re-fetch the published doc at most once a minute, so doc edits reach the page
// without a redeploy (Google itself republishes within ~5 minutes).
export const revalidate = 60;

async function loadPublishedDoc(url: string): Promise<{ css: string; html: string } | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const page = await res.text();
    const open = '<div id="contents">';
    const start = page.indexOf(open);
    if (start === -1) return null;
    const scriptAt = page.indexOf("<script", start);
    let inner = page.slice(start + open.length, scriptAt === -1 ? undefined : scriptAt).trim();

    // Drop closing </div> tags that belong to Google's wrappers, not the doc.
    const count = (re: RegExp) => (inner.match(re) || []).length;
    while (inner.endsWith("</div>") && count(/<\/div>/g) > count(/<div[\s>]/g)) {
      inner = inner.slice(0, -"</div>".length).trimEnd();
    }

    // Pull out Google's stylesheet and scope every rule to .gdoc so it can't restyle the site.
    let css = "";
    inner = inner.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (_m, c: string) => {
      css += c;
      return "";
    });
    css = css
      .replace(/@import[^;]+;/g, "")
      .replace(/(^|})([^{}@]+)\{/g, (_m, b: string, sel: string) =>
        b + sel.split(",").map((x) => `.gdoc ${x.trim()}`).join(",") + "{"
      );

    if (!inner.includes("<")) return null;
    return { css, html: inner };
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Agenda | OPEX Executive Workshop & Summit 2026",
  description:
    "Full agenda for the OPEX Executive Workshop & Summit 2026, Wednesday 21 October 2026, The Wheatbaker, Ikoyi, Lagos.",
};

export default async function AgendaPage() {
  const doc = PUBLISHED_DOC_URL ? await loadPublishedDoc(PUBLISHED_DOC_URL) : null;

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
          <a href="/agenda/pdf" className={styles.pdfButton} download>
            Download agenda (PDF)
          </a>
          <p className={styles.theme}>
            AI, Connected Systems and the Future of Financial Reporting and
            Compliance
          </p>
        </div>
      </header>

      <div className={styles.container}>
        {doc ? (
          <div className={styles.docWrap}>
            <style dangerouslySetInnerHTML={{ __html: doc.css }} />
            <div
              className={`gdoc ${styles.docBody}`}
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />
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
