import type { Metadata } from "next";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { howAiWorksConcept } from "@/data/how-ai-works";

export const metadata: Metadata = {
  title: "How AI Works",
  description:
    "Explore how AI works through a clickable concept map, local concept data, and layered difficulty-based explanations.",
};

export default function HowAiWorksPage() {
  return <ConceptExplorer concept={howAiWorksConcept} />;
}
