import { howAiWorksConcept } from "@/data/how-ai-works";
import { jetEngineConcept } from "@/data/how-a-jet-engine-works";
import { transistorStarterConcept } from "@/data/how-a-transistor-works";

export const conceptGalleryEntries = [
  {
    title: jetEngineConcept.title,
    summary: "Finished one-page turbofan explainer.",
    href: "/concept/how-a-jet-engine-works",
    status: "Featured",
    cta: "Open flagship explainer",
    minutes: jetEngineConcept.estimatedMinutes,
    tags: jetEngineConcept.tags,
  },
  {
    title: howAiWorksConcept.title,
    summary: "Starter walkthrough plus concept map view.",
    href: "/concept/how-ai-works",
    status: "Live",
    cta: "Open AI route",
    minutes: howAiWorksConcept.estimatedMinutes,
    tags: howAiWorksConcept.tags,
  },
  {
    title: transistorStarterConcept.title,
    summary: "Starter route for a future field-and-current explainer.",
    href: "/concept/how-a-transistor-works",
    status: "Starter",
    cta: "Open starter route",
    minutes: transistorStarterConcept.estimatedMinutes,
    tags: transistorStarterConcept.tags,
  },
];
