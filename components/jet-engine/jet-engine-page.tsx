"use client";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { jetEngineConcept } from "@/data/how-a-jet-engine-works";

export function JetEnginePage() {
  return <ConceptExplorer concept={jetEngineConcept} />;
}
