import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Understand AI Visually",
  description:
    "Explore a polished concept-explainer MVP that teaches how AI works through a visual map and five difficulty levels.",
};

export default function HomePage() {
  return <LandingPage />;
}
