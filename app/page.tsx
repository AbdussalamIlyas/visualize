import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Understand Complex Systems Visually",
  description:
    "Explore a visual-first learning site featuring explainers for jet engines, AI, web delivery, GPS, solar panels, and more.",
};

export default function HomePage() {
  return <LandingPage />;
}
