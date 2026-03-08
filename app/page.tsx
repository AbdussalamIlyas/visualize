import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Understand Complex Systems Visually",
  description:
    "Explore a minimalist visual-first learning site built around 3D guided pipelines for AI, jet engines, web delivery, GPS, solar panels, and more.",
};

export default function HomePage() {
  return <LandingPage />;
}
