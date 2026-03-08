import type { Metadata } from "next";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { gpsConcept } from "@/data/how-gps-works";

export const metadata: Metadata = {
  title: "How GPS Works",
  description:
    "Explore a 3D guided pipeline for how GPS turns timed satellite signals into a position estimate.",
};

export default function HowGpsWorksPage() {
  return <ConceptExplorer concept={gpsConcept} />;
}
