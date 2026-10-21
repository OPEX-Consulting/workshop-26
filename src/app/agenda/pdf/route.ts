// Old download link: now points at the brochure PDF.
import { NextResponse } from "next/server";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/agenda/OPEX-Summit-2026-Brochure.pdf", req.url), 307);
}
