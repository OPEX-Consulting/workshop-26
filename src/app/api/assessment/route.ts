import { NextResponse } from "next/server";
import { questions } from "../../assessment/questions";
import { FOLLOW_UP_ENDPOINT, SLIDES_URL } from "../../assessment/config";

// Validates an assessment submission, saves it to the "Follow Up" sheet through the
// Apps Script endpoint, and returns the slides link only once the row is saved.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const other = (body._other || {}) as Record<string, string>;
  const row: Record<string, string> = {};
  const missing: string[] = [];

  for (const q of questions) {
    const raw = body[q.key];
    let values = (Array.isArray(raw) ? raw : raw ? [raw] : [])
      .map((v) => String(v).trim())
      .filter(Boolean);
    if (q.options) {
      values = values.filter((v) => q.options!.includes(v) || (q.other && v === "__other__"));
      if (q.max) values = values.slice(0, q.max);
      values = values.map((v) =>
        v === "__other__" ? `Other: ${String(other[q.key] || "").trim().slice(0, 500)}` : v
      );
    }
    if (q.required && values.length === 0) missing.push(q.key);
    row[q.column] = values.join("; ").slice(0, 2000);
  }
  if (row["Email"] && !/^\S+@\S+\.\S+$/.test(row["Email"])) missing.push("email");
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "Please complete the required questions.", missing },
      { status: 400 }
    );
  }
  row["Source"] = String(body.source || "").slice(0, 100);

  if (!FOLLOW_UP_ENDPOINT) {
    console.error("FOLLOW_UP_ENDPOINT is not set");
    return NextResponse.json({ ok: false, error: "The assessment is not open yet." }, { status: 503 });
  }
  try {
    const res = await fetch(FOLLOW_UP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ columns: questions.map((q) => q.column).concat("Source"), row }),
    });
    const out = await res.json().catch(() => null);
    if (!out || out.ok !== true) {
      console.error("Follow Up endpoint rejected submission:", res.status, out);
      return NextResponse.json({ ok: false, error: "We couldn't save your answers. Please try again." }, { status: 502 });
    }
  } catch (e) {
    console.error("Assessment submission failed:", e);
    return NextResponse.json({ ok: false, error: "We couldn't save your answers. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, slidesUrl: SLIDES_URL });
}
