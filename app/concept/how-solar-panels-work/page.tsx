import type { Metadata } from "next";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { solarPanelConcept } from "@/data/how-solar-panels-work";

export const metadata: Metadata = {
  title: "How Solar Panels Work",
  description:
    "Step through a 3D guided pipeline for how sunlight becomes separated charge, direct current, and usable AC power.",
};

export default function HowSolarPanelsWorkPage() {
  return <ConceptExplorer concept={solarPanelConcept} />;
}
