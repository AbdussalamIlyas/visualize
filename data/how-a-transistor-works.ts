export const transistorStarterConcept = {
  slug: "how-a-transistor-works",
  title: "How a Transistor Works",
  question: "How does a tiny switch control current inside a chip?",
  summary:
    "Starter route for a visual explainer focused on gate control, source and drain flow, and why billions of transistors make modern computing possible.",
  theme: {
    accent: "#b4a6ff",
    accentSecondary: "#67e2d4",
    glow: "rgba(180, 166, 255, 0.16)",
    canvas:
      "radial-gradient(circle at 18% 18%, rgba(180,166,255,0.22), rgba(180,166,255,0) 36%), radial-gradient(circle at 82% 20%, rgba(103,226,212,0.14), rgba(103,226,212,0) 32%), linear-gradient(180deg, rgba(10,11,28,0.98), rgba(6,8,21,0.96))",
  },
  estimatedMinutes: 3,
  tags: ["Electronics", "Semiconductors", "Starter route"],
  plannedStages: [
    "No gate voltage: the channel stays pinched off.",
    "Gate voltage creates an electric field in the silicon.",
    "A conductive channel forms between source and drain.",
    "Current flow becomes a controllable digital switch.",
  ],
  starterNote:
    "Planned format: a layered field-and-current scene, not a concept map.",
};
