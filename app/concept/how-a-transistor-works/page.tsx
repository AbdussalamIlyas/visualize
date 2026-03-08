import type { Metadata } from "next";

import { ConceptStarterPage } from "@/components/concept/concept-starter-page";
import { transistorStarterConcept } from "@/data/how-a-transistor-works";

export const metadata: Metadata = {
  title: "How a Transistor Works",
  description:
    "Starter route for a visual transistor explainer focused on gate control, current flow, and switching behavior.",
};

export default function HowATransistorWorksPage() {
  return <ConceptStarterPage {...transistorStarterConcept} />;
}
