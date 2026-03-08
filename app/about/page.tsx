import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Visualize uses one minimalist 3D guided pipeline model across every concept page.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
