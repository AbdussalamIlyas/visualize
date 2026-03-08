import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why Visualize is shifting toward explainer-first pages and how the MVP is designed around visual learning.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
