import type { Metadata } from "next";
import AssessmentForm from "./AssessmentForm";

export const metadata: Metadata = {
  title: "Post-Conference Assessment | OPEX Executive Workshop & Summit 2026",
  description:
    "Share your feedback on the OPEX Executive Workshop & Summit 2026 and get the presentation slides.",
};

export default function AssessmentPage() {
  return <AssessmentForm />;
}
