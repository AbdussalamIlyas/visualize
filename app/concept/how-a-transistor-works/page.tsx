import type { Metadata } from "next";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { transistorConcept } from "@/data/how-a-transistor-works";

export const metadata: Metadata = {
  title: "How a Transistor Works",
  description:
    "Explore a 3D guided pipeline for gate control, channel formation, current flow, and transistor switching.",
};

export default function HowATransistorWorksPage() {
  return <ConceptExplorer concept={transistorConcept} />;
}
