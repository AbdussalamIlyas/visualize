import type { Metadata } from "next";

import { JetEnginePage } from "@/components/jet-engine/jet-engine-page";

export const metadata: Metadata = {
  title: "How a Jet Engine Works",
  description:
    "Explore a one-page interactive turbofan explainer from intake and compression to combustion, turbine power, and exhaust thrust.",
};

export default function HowAJetEngineWorksPage() {
  return <JetEnginePage />;
}
