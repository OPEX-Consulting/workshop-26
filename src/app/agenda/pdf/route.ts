// Serves the agenda Google Doc as a PDF, always generated from the doc's latest version.
// The doc must be shared "Anyone with the link can view" for Google's export to work.
const AGENDA_DOC_ID = "12XjDEsvCoUxVKTqJzDfD7aypFDj9ow1_Sjv3I_rLv-U";

export const revalidate = 60;

export async function GET() {
  const res = await fetch(
    `https://docs.google.com/document/d/${AGENDA_DOC_ID}/export?format=pdf`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok || !(res.headers.get("content-type") || "").includes("pdf")) {
    return new Response("Agenda PDF is temporarily unavailable.", { status: 502 });
  }
  return new Response(await res.arrayBuffer(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="OPEX-Summit-2026-Agenda.pdf"',
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
