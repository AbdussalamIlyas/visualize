export const difficultyLevels = [
  "Child",
  "Teenager",
  "College Student",
  "Graduate Student",
  "Expert",
] as const;

export type DifficultyLevel = (typeof difficultyLevels)[number];

export type DifficultyMeta = {
  order: number;
  summary: string;
  lens: string;
  audience: string;
};

export const difficultyMetadata: Record<DifficultyLevel, DifficultyMeta> = {
  Child: {
    order: 1,
    summary: "Simple metaphors, intuitive language, and almost no jargon.",
    lens: "Prioritizes intuition over precision so the basic shape is easy to grasp.",
    audience: "Best for first-time learners who need the idea to feel concrete fast.",
  },
  Teenager: {
    order: 2,
    summary: "Adds structure and core terms without becoming dense.",
    lens: "Introduces technical ideas gently while keeping the system easy to track.",
    audience: "Best for curious learners who want more than analogies but not full formalism.",
  },
  "College Student": {
    order: 3,
    summary: "Balanced conceptual depth with meaningful technical vocabulary.",
    lens: "Explains the workflow clearly enough to connect intuition with mechanism.",
    audience: "Best for learners who want a solid mental model they can build on.",
  },
  "Graduate Student": {
    order: 4,
    summary: "More formal, system-level, and technically careful.",
    lens: "Emphasizes process detail, model behavior, and cleaner conceptual boundaries.",
    audience: "Best for readers who want stronger precision without going fully specialist.",
  },
  Expert: {
    order: 5,
    summary: "Concise, dense, and nuance-aware.",
    lens: "Focuses on technical framing, limitations, and the assumptions behind the system.",
    audience: "Best for advanced readers who want compact language and sharper caveats.",
  },
};

export type ConceptPosition = {
  x: number;
  y: number;
};

export type ConceptSource = {
  title: string;
  url: string;
};

export type DifficultyExplanations = Record<DifficultyLevel, string>;

export type ConceptNode = {
  id: string;
  title: string;
  shortSummary: string;
  icon: string;
  position: ConceptPosition;
  relatedNodeIds: string[];
  example: string;
  misconception: string;
  difficultyExplanations: DifficultyExplanations;
  sources: ConceptSource[];
};

export type ConceptTheme = {
  accent: string;
  accentSecondary: string;
  glow: string;
};

export type ConceptData = {
  slug: string;
  title: string;
  subtitle: string;
  heroSummary: string;
  defaultNodeId: string;
  defaultDifficulty: DifficultyLevel;
  learningObjectives: string[];
  theme: ConceptTheme;
  sources: ConceptSource[];
  nodes: ConceptNode[];
};
