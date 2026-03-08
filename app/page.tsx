import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Understand Complex Systems Visually",
  description:
    "Explore a visual-first explainer MVP featuring a finished jet engine walkthrough plus starter routes for AI and transistor learning.",
};

export default function HomePage() {
  return <LandingPage />;
}
