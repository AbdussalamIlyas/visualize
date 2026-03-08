import type { Metadata } from "next";

import { ConceptExplorer } from "@/components/concept/concept-explorer";
import { webPageConcept } from "@/data/how-the-internet-delivers-a-web-page";

export const metadata: Metadata = {
  title: "How the Internet Delivers a Web Page",
  description:
    "Follow a browser request from URL and DNS lookup to the server response and the final rendered page.",
};

export default function HowTheInternetDeliversAWebPagePage() {
  return <ConceptExplorer concept={webPageConcept} />;
}
