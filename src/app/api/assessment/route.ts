import { NextResponse } from "next/server";
import { questionsFor, TAB_FOR, type Track } from "../../assessment/questions";
import { FOLLOW_UP_ENDPOINT } from "../../assessment/config";

// Validates an assessment submission, saves it to the "Follow Up" sheet through the
// Apps Script endpoint. Slides are emailed separately by the OPEX team.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const track: Track = body.track === "non_attendee" ? "non_attendee" : "attendee";
  const questions = questionsFor(track);
  const tab = TAB_FOR[track];
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
      if (q.exclusive && values.includes(q.exclusive)) values = [q.exclusive];
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
  row["Attended"] = track === "attendee" ? "Yes" : "No";

  if (!FOLLOW_UP_ENDPOINT) {
    console.error("FOLLOW_UP_ENDPOINT is not set");
    return NextResponse.json({ ok: false, error: "The assessment is not open yet." }, { status: 503 });
  }
  // The non-attendee tab needs the v2 Apps Script (routes by tab). An older script
  // would write these rows into "Follow Up", so hold them until v2 is deployed.
  if (track !== "attendee" && !(await endpointSupportsTabs())) {
    console.error("Apps Script is not v2 yet; non-attendee submission held");
    return NextResponse.json(
      { ok: false, error: "This assessment opens shortly. Please try again in a little while." },
      { status: 503 }
    );
  }
  try {
    const res = await fetch(FOLLOW_UP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ tab, columns: questions.map((q) => q.column).concat("Source", "Attended"), row }),
    });
    const out = await res.json().catch(() => null);
    if (!out || out.ok !== true || (out.tab && out.tab !== tab)) {
      console.error("Follow Up endpoint rejected submission:", res.status, out);
      return NextResponse.json({ ok: false, error: "We couldn't save your answers. Please try again." }, { status: 502 });
    }
  } catch (e) {
    console.error("Assessment submission failed:", e);
    return NextResponse.json({ ok: false, error: "We couldn't save your answers. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

let tabsSupported = false;
async function endpointSupportsTabs(): Promise<boolean> {
  if (tabsSupported) return true;
  try {
    const res = await fetch(FOLLOW_UP_ENDPOINT, { cache: "no-store" });
    const out = await res.json().catch(() => null);
    tabsSupported = !!out && Number(out.version) >= 2;
  } catch {
    tabsSupported = false;
  }
  return tabsSupported;
}
