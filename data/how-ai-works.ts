import type {
  Concept,
  GlossaryTerm,
  MapExplainer,
  MapNode,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sharedSources: Source[] = [
  {
    title: "Google Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
    note: "Clear introductions to supervised learning, training, and evaluation.",
  },
  {
    title: "Deep Learning Book",
    url: "https://www.deeplearningbook.org/",
    note: "Reference for representations, optimization, and neural networks.",
  },
  {
    title: "Stanford AI Index Report",
    url: "https://aiindex.stanford.edu/report/",
    note: "Context on capability growth, adoption, and current risk conversations.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "tokens",
    term: "Tokens",
    definition:
      "Small pieces of text or symbols that a language model turns into numbers before processing.",
    stageIds: ["representation", "prediction"],
  },
  {
    id: "model",
    term: "Model",
    definition:
      "The learned parameter set and architecture that turn inputs into predictions.",
    stageIds: ["model"],
  },
  {
    id: "inference",
    term: "Inference",
    definition:
      "Using the trained model on a new input instead of updating it with training examples.",
    stageIds: ["prediction"],
  },
  {
    id: "hallucination",
    term: "Hallucination",
    definition:
      "A confident-looking output that is unsupported, incorrect, or invented.",
    stageIds: ["limits"],
  },
  {
    id: "grounding",
    term: "Grounding",
    definition:
      "Tying an answer to reliable context, tools, or evidence instead of only pattern matching.",
    stageIds: ["limits"],
  },
  {
    id: "bias",
    term: "Bias",
    definition:
      "Skewed behavior caused by data, labels, objectives, or deployment context.",
    stageIds: ["limits"],
  },
];

const stages: Stage[] = [
  {
    id: "input",
    label: "Stage 1",
    goal: "Start with the two things AI needs: past examples and a new input.",
    headline: "AI begins with examples plus a live question.",
    body:
      "A model is trained on many examples first. Later, at runtime, it receives one new input such as a prompt, image, or click stream.",
    actionLabel: "Compare the archive of examples with the new request.",
    visibleLayerIds: ["training-data", "live-input"],
    activeHotspotIds: ["examples"],
    statePatch: {
      highlightedLayerIds: ["training-data", "live-input"],
      note: "Nothing intelligent happens before the system has examples to learn from and a new input to act on.",
      metrics: [
        { label: "Learns from", value: "many past examples", tone: "accent" },
        { label: "Responds to", value: "one live input", tone: "neutral" },
      ],
    },
  },
  {
    id: "representation",
    label: "Stage 2",
    goal: "Show how messy human input becomes machine-readable structure.",
    headline: "The system converts input into a representation it can compute on.",
    body:
      "Text becomes tokens, images become pixel arrays or embeddings, and everything becomes numbers the model can process consistently.",
    actionLabel: "Focus the tokenizer and see how input is broken into smaller units.",
    visibleLayerIds: ["training-data", "live-input", "tokenizer"],
    activeHotspotIds: ["tokens"],
    statePatch: {
      highlightedLayerIds: ["live-input", "tokenizer"],
      note: "Representation is a translation step: the world must be turned into structured signals before learning can begin.",
      metrics: [
        { label: "Human form", value: "text, images, clicks", tone: "neutral" },
        { label: "Machine form", value: "numbers and tokens", tone: "accent" },
      ],
    },
  },
  {
    id: "training",
    label: "Stage 3",
    goal: "Make training feel like repeated prediction and correction.",
    headline: "Training is a loop of guessing, measuring error, and adjusting.",
    body:
      "The model predicts, compares its guess against a target, then changes internal weights a little. Repeating that loop over huge datasets is how useful behavior emerges.",
    actionLabel: "Step into the training loop and watch error drive updates.",
    visibleLayerIds: ["training-data", "tokenizer", "training-loop", "model"],
    activeHotspotIds: ["loss", "patterns"],
    statePatch: {
      highlightedLayerIds: ["training-loop", "training-data"],
      note: "Training is not uploading facts. It is optimization over many rounds of feedback.",
      metrics: [
        { label: "Loop", value: "predict -> compare -> update", tone: "accent" },
        { label: "Optimization target", value: "lower error", tone: "neutral" },
      ],
    },
  },
  {
    id: "model",
    label: "Stage 4",
    goal: "Explain what the trained model actually contains.",
    headline: "The model stores useful patterns in learned parameters.",
    body:
      "After training, the model is a compressed pattern machine. It does not save every example verbatim, but it encodes enough structure to respond to new cases.",
    actionLabel: "Inspect the model itself instead of the training loop around it.",
    visibleLayerIds: ["training-loop", "model"],
    activeHotspotIds: ["weights"],
    statePatch: {
      highlightedLayerIds: ["model"],
      note: "The model is the reusable engine created by training. Products wrap interfaces and rules around it later.",
      metrics: [
        { label: "Contains", value: "learned parameters", tone: "accent" },
        { label: "Does not contain", value: "full human understanding", tone: "warning" },
      ],
    },
  },
  {
    id: "prediction",
    label: "Stage 5",
    goal: "Show how a trained model turns a new input into an output.",
    headline:
      "Inference runs the trained model on a new input and produces the most likely next output.",
    body:
      "At runtime, the live input is represented again, passed through the model, and decoded into an answer, class, score, or generated token sequence.",
    actionLabel: "Follow the live input through the model to the output.",
    visibleLayerIds: ["live-input", "tokenizer", "model", "inference", "output"],
    activeHotspotIds: ["inference", "grounding"],
    statePatch: {
      highlightedLayerIds: ["live-input", "inference", "output"],
      outputLabel: "Most likely next answer",
      note: "Prediction does not always mean forecasting the future. It means choosing an output from an input.",
      metrics: [
        { label: "Runtime mode", value: "weights stay fixed", tone: "neutral" },
        { label: "System task", value: "produce a likely output", tone: "accent" },
      ],
    },
  },
  {
    id: "limits",
    label: "Stage 6",
    goal: "Make failure modes part of the main story, not an afterthought.",
    headline:
      "The same pattern-matching system can also fail with confident but weak output.",
    body:
      "If the data is biased, the input is ambiguous, or the model lacks grounding, the output can be wrong while still sounding fluent. Limits come from both model behavior and deployment context.",
    actionLabel: "Inspect where hallucinations, bias, and weak grounding enter the system.",
    visibleLayerIds: ["live-input", "model", "inference", "output", "risk"],
    activeHotspotIds: ["hallucinations", "bias", "grounding"],
    statePatch: {
      highlightedLayerIds: ["risk", "output"],
      outputLabel: "Plausible, not guaranteed",
      note: "Good product design adds retrieval, validation, monitoring, and human review instead of trusting the raw model blindly.",
      metrics: [
        { label: "Common failure", value: "confident wrong output", tone: "warning" },
        { label: "Mitigation", value: "grounding and evaluation", tone: "accent" },
      ],
    },
  },
];

export const howAiWorksWalkthrough = {
  id: "walkthrough",
  type: "pipeline",
  title: "Interactive walkthrough",
  summary:
    "Primary view. Move through a single AI request as it becomes representation, training signal, prediction, and risk.",
  intro:
    "Use this view first. Each stage changes the system state so the visual carries the main explanation.",
  defaultStageId: stages[0].id,
  heroKicker: "Primary explainer",
  heroTitle: "Watch AI turn examples into output.",
  heroSummary:
    "Move stage by stage. The visual shows where data enters, where training happens, what the model stores, and why failure modes still appear.",
  layers: [
    {
      id: "training-data",
      label: "Training data",
      shortLabel: "Examples",
      kind: "data",
      tone: "secondary",
      position: { x: 8, y: 10, width: 24, height: 20 },
      description: "Large piles of examples that define what the model can learn from.",
    },
    {
      id: "live-input",
      label: "New input",
      shortLabel: "Prompt",
      kind: "input",
      tone: "neutral",
      position: { x: 7, y: 58, width: 22, height: 18 },
      description: "The live question, image, or event arriving after training.",
    },
    {
      id: "tokenizer",
      label: "Representation",
      shortLabel: "Tokens",
      kind: "chip",
      tone: "accent",
      position: { x: 32, y: 53, width: 18, height: 16 },
      description: "The step that turns input into structured machine-readable units.",
    },
    {
      id: "training-loop",
      label: "Training loop",
      shortLabel: "Update",
      kind: "process",
      tone: "accent",
      position: { x: 42, y: 14, width: 20, height: 24 },
      description: "Guess, measure error, and update the model repeatedly.",
    },
    {
      id: "model",
      label: "Learned model",
      shortLabel: "Model",
      kind: "model",
      tone: "accent",
      position: { x: 45, y: 50, width: 18, height: 22 },
      description: "The reusable pattern machine created by training.",
    },
    {
      id: "inference",
      label: "Inference",
      shortLabel: "Run",
      kind: "process",
      tone: "secondary",
      position: { x: 68, y: 34, width: 16, height: 18 },
      description: "The forward pass on a new input after training is complete.",
    },
    {
      id: "output",
      label: "Output",
      shortLabel: "Answer",
      kind: "output",
      tone: "neutral",
      position: { x: 85, y: 34, width: 10, height: 18 },
      description: "The chosen answer, class, score, or generated continuation.",
    },
    {
      id: "risk",
      label: "Limits and risks",
      shortLabel: "Limits",
      kind: "warning",
      tone: "warning",
      position: { x: 73, y: 66, width: 22, height: 14 },
      description: "Where weak grounding, bias, and hallucinations become visible.",
    },
  ],
  connections: [
    { id: "data-training", sourceLayerId: "training-data", targetLayerId: "training-loop" },
    { id: "input-tokenizer", sourceLayerId: "live-input", targetLayerId: "tokenizer" },
    { id: "tokenizer-training", sourceLayerId: "tokenizer", targetLayerId: "training-loop" },
    { id: "training-model", sourceLayerId: "training-loop", targetLayerId: "model" },
    { id: "input-inference", sourceLayerId: "live-input", targetLayerId: "inference" },
    { id: "model-inference", sourceLayerId: "model", targetLayerId: "inference" },
    { id: "inference-output", sourceLayerId: "inference", targetLayerId: "output" },
    { id: "output-risk", sourceLayerId: "output", targetLayerId: "risk" },
  ],
  hotspots: [
    {
      id: "examples",
      anchor: { x: 19, y: 21 },
      label: "Training examples",
      body:
        "Data quality matters more than raw volume. Examples shape what the model can generalize and where it will fail.",
      media: "Images, sentences, labels, clicks, and transcripts can all become training data.",
      revealsInStages: ["input"],
      tone: "secondary",
    },
    {
      id: "tokens",
      anchor: { x: 40, y: 62 },
      label: "Tokens",
      body:
        "Language models do not read whole sentences directly. They convert text into smaller discrete units first.",
      media: "A token can be a word, part of a word, or punctuation depending on the tokenizer.",
      revealsInStages: ["representation", "prediction"],
      relatedGlossaryTermIds: ["tokens"],
      tone: "accent",
    },
    {
      id: "loss",
      anchor: { x: 52, y: 24 },
      label: "Error signal",
      body:
        "Training depends on a measurable mistake. The system compares its output to a target and updates weights to reduce future error.",
      media: "No error signal means no learning loop.",
      revealsInStages: ["training"],
      tone: "accent",
    },
    {
      id: "patterns",
      anchor: { x: 60, y: 34 },
      label: "Patterns",
      body:
        "What the system learns are useful regularities, not full human concepts. Good models encode structure that transfers to new inputs.",
      media: "Pattern learning is why AI can handle unseen examples at all.",
      revealsInStages: ["training"],
      tone: "secondary",
    },
    {
      id: "weights",
      anchor: { x: 55, y: 61 },
      label: "Learned parameters",
      body:
        "The model stores behavior in a large parameter set. Those weights define how input signals are transformed during inference.",
      media: "The model is the engine inside the product, not the whole product experience.",
      revealsInStages: ["model"],
      relatedGlossaryTermIds: ["model"],
      tone: "accent",
    },
    {
      id: "inference",
      anchor: { x: 75, y: 43 },
      label: "Inference",
      body:
        "Inference means running a trained model on a new input without updating its weights. It is use-time, not learn-time.",
      media: "This is the moment users actually experience.",
      revealsInStages: ["prediction"],
      relatedGlossaryTermIds: ["inference"],
      tone: "secondary",
    },
    {
      id: "grounding",
      anchor: { x: 90, y: 28 },
      label: "Grounding",
      body:
        "Outputs improve when the model is tied to trusted context such as retrieved documents, tools, or verified databases.",
      media: "Fluency alone is not the same as evidence.",
      revealsInStages: ["prediction", "limits"],
      relatedGlossaryTermIds: ["grounding"],
      tone: "neutral",
    },
    {
      id: "hallucinations",
      anchor: { x: 84, y: 72 },
      label: "Hallucinations",
      body:
        "A model can generate a plausible-looking answer that is simply invented because it is predicting likely text, not checking truth by default.",
      media: "Confidence and correctness are separate properties.",
      revealsInStages: ["limits"],
      relatedGlossaryTermIds: ["hallucination"],
      tone: "warning",
    },
    {
      id: "bias",
      anchor: { x: 73, y: 77 },
      label: "Bias",
      body:
        "Bias enters through data, labels, objectives, and deployment choices. It is a system property, not just a bad-output edge case.",
      media: "Even accurate average performance can hide unfair behavior.",
      revealsInStages: ["limits"],
      relatedGlossaryTermIds: ["bias"],
      tone: "warning",
    },
  ],
  stages,
  sources: sharedSources,
} satisfies PipelineExplainer;

function mapNode(node: MapNode): MapNode {
  return node;
}

export const howAiWorksMapExplainer = {
  id: "map",
  type: "map",
  title: "Concept map",
  summary:
    "Secondary view. Browse the vocabulary and supporting relationships after the main walkthrough.",
  intro:
    "Use the map when you want to inspect how the supporting ideas connect to the main pipeline.",
  defaultNodeId: "model",
  sources: sharedSources,
  nodes: [
    mapNode({
      id: "what-ai-is",
      title: "What AI Is",
      shortSummary: "AI systems turn patterns in data into useful outputs.",
      detail:
        "Modern AI is best understood as a system that learns mappings from data and then reuses those mappings on new inputs.",
      icon: "AI",
      position: { x: 50, y: 15 },
      relatedNodeIds: ["data", "patterns", "model", "prediction"],
      example:
        "A spam filter learns from old email examples and predicts whether a new message is junk.",
      misconception:
        "Convincing output does not mean the system has human-like understanding.",
      sources: sharedSources,
    }),
    mapNode({
      id: "data",
      title: "Data",
      shortSummary: "Examples give the system something to learn from.",
      detail:
        "Training data defines what the model sees, what it misses, and which error patterns are likely later.",
      icon: "DB",
      position: { x: 27, y: 29 },
      relatedNodeIds: ["patterns", "training", "tokens", "real-world-examples"],
      example:
        "Images, sentences, labels, clicks, sensor logs, and transcripts can all become data.",
      misconception:
        "More data is not automatically better if the data is noisy, biased, or poorly matched to the task.",
      sources: sharedSources,
    }),
    mapNode({
      id: "patterns",
      title: "Patterns",
      shortSummary: "AI works by detecting regularities that repeat.",
      detail:
        "Learning means capturing useful structure that helps the model handle inputs it has not seen before.",
      icon: "PT",
      position: { x: 50, y: 32 },
      relatedNodeIds: ["data", "training", "model", "prediction"],
      example:
        "If many cat photos share similar features, the model can use those recurring signals later.",
      misconception:
        "Useful systems do not only memorize exact examples; they encode transferable regularities.",
      sources: sharedSources,
    }),
    mapNode({
      id: "training",
      title: "Training",
      shortSummary: "Training repeatedly adjusts the model.",
      detail:
        "Training is an optimization process where the model predicts, measures error, and updates weights across many rounds.",
      icon: "TR",
      position: { x: 73, y: 30 },
      relatedNodeIds: ["data", "patterns", "model", "errors-hallucinations"],
      example:
        "A model compares its guess to the correct answer and nudges weights to reduce future mistakes.",
      misconception:
        "Training is not a one-time upload of knowledge; it is iterative optimization with tradeoffs.",
      sources: sharedSources,
    }),
    mapNode({
      id: "model",
      title: "Model",
      shortSummary: "The model is the learned engine.",
      detail:
        "Operationally, the model is the learned parameter set and architecture that define how inference is computed.",
      icon: "MD",
      position: { x: 50, y: 54 },
      relatedNodeIds: [
        "what-ai-is",
        "patterns",
        "training",
        "prediction",
        "tokens",
        "neural-networks",
      ],
      example:
        "A language model uses learned weights to estimate which token should come next in a sequence.",
      misconception:
        "The model is not the whole product; it is the learned core inside the wider system.",
      sources: sharedSources,
    }),
    mapNode({
      id: "prediction",
      title: "Prediction",
      shortSummary: "After training, the model makes a best guess.",
      detail:
        "Inference applies the trained model to new input and returns a class, score, probability, or generated continuation.",
      icon: "PR",
      position: { x: 74, y: 58 },
      relatedNodeIds: [
        "what-ai-is",
        "patterns",
        "model",
        "tokens",
        "real-world-examples",
        "errors-hallucinations",
      ],
      example:
        "A recommendation system predicts which video you are likely to watch next.",
      misconception:
        "Prediction does not always mean forecasting the future; it means choosing an output from an input.",
      sources: sharedSources,
    }),
    mapNode({
      id: "tokens",
      title: "Tokens",
      shortSummary: "Language models process smaller text units.",
      detail:
        "Tokenization decides the discrete units a model sees, which affects efficiency, context length, and behavior.",
      icon: "TK",
      position: { x: 28, y: 61 },
      relatedNodeIds: ["data", "model", "prediction", "real-world-examples"],
      example:
        "A token can be a whole word, part of a word, punctuation, or whitespace-like unit.",
      misconception:
        "Tokens are not the same thing as words.",
      sources: sharedSources,
    }),
    mapNode({
      id: "neural-networks",
      title: "Neural Networks",
      shortSummary: "Many modern AI systems use layered weighted computation.",
      detail:
        "Depth and nonlinearity let neural networks learn hierarchical representations over complex input spaces.",
      icon: "NN",
      position: { x: 50, y: 81 },
      relatedNodeIds: ["model", "training", "errors-hallucinations", "limits-risks"],
      example:
        "An image model can transform raw pixels into richer internal features layer by layer.",
      misconception:
        "Neural networks are inspired by brains only loosely, not built as literal digital brains.",
      sources: sharedSources,
    }),
    mapNode({
      id: "errors-hallucinations",
      title: "Errors / Hallucinations",
      shortSummary: "AI can sound sure while being wrong.",
      detail:
        "Hallucinations reflect a mismatch between generated output and grounded truth, often worsened by weak verification or missing context.",
      icon: "ER",
      position: { x: 79, y: 78 },
      relatedNodeIds: [
        "training",
        "prediction",
        "neural-networks",
        "limits-risks",
      ],
      example:
        "A chatbot may invent a citation because plausible text generation is not the same as fact-checking.",
      misconception:
        "A fluent answer is not proof that the answer is correct.",
      sources: sharedSources,
    }),
    mapNode({
      id: "limits-risks",
      title: "Limits / Risks",
      shortSummary: "Technical and social limits matter in deployment.",
      detail:
        "System risk comes from both model behavior and the sociotechnical context around deployment, monitoring, and incentives.",
      icon: "LR",
      position: { x: 22, y: 82 },
      relatedNodeIds: [
        "neural-networks",
        "errors-hallucinations",
        "real-world-examples",
      ],
      example:
        "Biased data can create unfair outputs even when average accuracy looks strong.",
      misconception:
        "Present-day AI risk is not only about superintelligence; misuse and overtrust matter now.",
      sources: sharedSources,
    }),
    mapNode({
      id: "real-world-examples",
      title: "Real-World Examples",
      shortSummary: "The same core pipeline appears in many products.",
      detail:
        "Applications differ in data type and objective, but many share the same structure of data, training, model, and inference.",
      icon: "RX",
      position: { x: 12, y: 49 },
      relatedNodeIds: ["data", "prediction", "tokens", "limits-risks"],
      example:
        "Recommendation feeds, autocomplete, translation, image search, and triage models all use learned patterns.",
      misconception:
        "Products may look unrelated on the surface while sharing the same underlying learning pipeline.",
      sources: sharedSources,
    }),
  ],
} satisfies MapExplainer;

export const howAiWorksConcept = {
  slug: "how-ai-works",
  title: "How AI Works",
  question: "How does AI turn examples into outputs?",
  summary:
    "A visual-first explainer for the flow from data and representation to training, inference, and failure modes.",
  thumbnail: "AI pipeline walkthrough",
  estimatedMinutes: 4,
  tags: ["AI", "Machine Learning", "Interactive"],
  status: "published",
  defaultExplainerId: howAiWorksWalkthrough.id,
  theme: {
    accent: "#8fb5ff",
    accentSecondary: "#51e0cb",
    glow: "rgba(143, 181, 255, 0.18)",
    canvas:
      "radial-gradient(circle at top, rgba(137,181,255,0.18), rgba(137,181,255,0) 46%), linear-gradient(180deg, rgba(7,11,24,0.98), rgba(6,9,20,0.96))",
  },
  glossary,
  sources: sharedSources,
  explainers: [howAiWorksWalkthrough, howAiWorksMapExplainer],
} satisfies Concept;
