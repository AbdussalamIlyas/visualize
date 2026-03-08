import type { Metadata } from "next";

import { JetEnginePage } from "@/components/jet-engine/jet-engine-page";

export const metadata: Metadata = {
  title: "How a Jet Engine Works",
  description:
    "Explore a 3D guided pipeline for intake, compression, combustion, turbine power recovery, and exhaust thrust.",
};

export default function HowAJetEngineWorksPage() {
  return <JetEnginePage />;
}
