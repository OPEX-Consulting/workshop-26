"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./assessment.module.css";
import { questions, type Question } from "./questions";
import { CALENDLY_URL } from "./config";

type Answers = Record<string, string | string[]>;

export default function AssessmentForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [other, setOther] = useState<Record<string, string>>({});
  const [source, setSource] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  // Pre-fill from the email link, e.g. /assessment?email=jane@bank.com&name=Jane%20Doe&src=email
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const pre: Answers = {};
    ["name", "email", "organisation", "role"].forEach((k) => {
      const v = p.get(k);
      if (v) pre[k] = v;
    });
    if (Object.keys(pre).length) setAnswers((a) => ({ ...pre, ...a }));
    setSource(p.get("src") || p.get("utm_source") || "");
  }, []);

  const set = (key: string, value: string | string[]) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setMissing((m) => m.filter((k) => k !== key));
  };

  const toggle = (q: Question, value: string) => {
    const cur = (answers[q.key] as string[]) || [];
    if (cur.includes(value)) return set(q.key, cur.filter((v) => v !== value));
    if (q.max && cur.length >= q.max) return;
    set(q.key, [...cur, value]);
  };

  const isEmpty = (q: Question) => {
    const v = answers[q.key];
    if (!v || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim())) return true;
    const vals = Array.isArray(v) ? v : [v];
    return vals.includes("__other__") && !(other[q.key] || "").trim();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const miss = questions.filter((q) => q.required && isEmpty(q)).map((q) => q.key);
    const email = String(answers.email || "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) miss.push("email");
    setMissing(miss);
    if (miss.length) {
      setError("Please answer the highlighted questions.");
      document.getElementById(`q-${miss[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, _other: other, source }),
      });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out?.ok) throw new Error(out?.error || "Something went wrong.");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const contact = questions.filter((q) => q.section === "contact");
  const survey = questions.filter((q) => q.section !== "contact");
  let n = 0;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>
            ← Back to summit
          </Link>
          <span className={styles.eyebrow}>POST-CONFERENCE ASSESSMENT</span>
          <h1 className={styles.heading}>
            <span className={styles.light}>The End</span>{" "}
            <span className={styles.brand}>
              of <span className={styles.accent}>Manual.</span>
            </span>
          </h1>
          <p className={styles.lead}>
            {status === "done"
              ? "Thank you. Your answers have been received."
              : "Thank you for joining us on 21 October 2026. Answer a few short questions (3–5 minutes) and we\u2019ll email you the presentation slides."}
          </p>
        </div>
      </header>

      <div className={styles.container}>
        {status === "done" ? (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>What happens next</h2>
            <p className={styles.text}>
              We&apos;ll reply to {String(answers.email || "your email")} with the presentation
              slides.
            </p>
            <hr className={styles.rule} />
            <h2 className={styles.cardTitle}>Book your discovery call</h2>
            <p className={styles.text}>
              Schedule a convenient time to speak with our team about your organisation&apos;s
              priorities and see how our solutions may help address them.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
              Book a discovery call
            </a>
          </section>
        ) : (
          <form onSubmit={submit} noValidate>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>About you</h2>
              <div className={styles.grid}>
                {contact.map((q) => (
                  <label key={q.key} id={`q-${q.key}`} className={styles.field}>
                    <span className={styles.label}>
                      {q.title} {q.required && <span className={styles.req}>*</span>}
                    </span>
                    <input
                      type={q.key === "email" ? "email" : "text"}
                      autoComplete={{ name: "name", email: "email", organisation: "organization", role: "organization-title" }[q.key]}
                      className={`${styles.input} ${missing.includes(q.key) ? styles.invalid : ""}`}
                      value={(answers[q.key] as string) || ""}
                      onChange={(e) => set(q.key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </section>

            {survey.map((q) => {
              const isConsent = q.key === "consent";
              if (!isConsent) n += 1;
              const bad = missing.includes(q.key);
              const val = answers[q.key];
              const vals = Array.isArray(val) ? val : val ? [val] : [];
              const opts = [...(q.options || []), ...(q.other ? ["__other__"] : [])];
              return (
                <fieldset key={q.key} id={`q-${q.key}`} className={`${styles.card} ${bad ? styles.cardInvalid : ""}`}>
                  {!isConsent && (
                    <legend className={styles.question}>
                      <span className={styles.num}>{n}.</span> {q.title}{" "}
                      {q.required && <span className={styles.req}>*</span>}
                    </legend>
                  )}
                  {q.hint && <p className={styles.hint}>{q.hint}</p>}
                  {q.type === "paragraph" ? (
                    <textarea
                      rows={4}
                      className={styles.input}
                      value={(val as string) || ""}
                      onChange={(e) => set(q.key, e.target.value)}
                    />
                  ) : (
                    <div className={styles.options}>
                      {opts.map((o) => {
                        const checked = vals.includes(o);
                        const disabled = q.type === "checkbox" && !!q.max && !checked && vals.length >= q.max;
                        return (
                          <label key={o} className={`${styles.option} ${checked ? styles.checked : ""} ${disabled ? styles.disabled : ""}`}>
                            <input
                              type={q.type === "radio" ? "radio" : "checkbox"}
                              name={q.key}
                              checked={checked}
                              disabled={disabled}
                              onChange={() => (q.type === "radio" ? set(q.key, o) : toggle(q, o))}
                            />
                            <span>{o === "__other__" ? "Other (please specify)" : o}</span>
                          </label>
                        );
                      })}
                      {vals.includes("__other__") && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          className={styles.input}
                          value={other[q.key] || ""}
                          onChange={(e) => {
                            setOther((x) => ({ ...x, [q.key]: e.target.value }));
                            setMissing((m) => m.filter((k) => k !== q.key));
                          }}
                        />
                      )}
                    </div>
                  )}
                </fieldset>
              );
            })}

            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.primary} disabled={status === "sending"}>
              {status === "sending" ? "Submitting…" : "Submit assessment"}
            </button>
          </form>
        )}

        <footer className={styles.footer}>
          <Image src="/images/opexwhite.webp" alt="OPEX Consulting" width={78} height={31} className={styles.logo} />
          <span>OPEX Executive Workshop &amp; Summit 2026</span>
        </footer>
      </div>
    </main>
  );
}
