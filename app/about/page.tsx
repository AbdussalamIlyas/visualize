import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why Visualize exists, who it is for, and how the MVP is designed to teach AI visually.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
