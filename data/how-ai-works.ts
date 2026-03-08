import type { ConceptData, DifficultyExplanations } from "@/lib/concept-schema";

const sharedSources = [
  {
    title: "Google Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
  },
  {
    title: "Deep Learning Book",
    url: "https://www.deeplearningbook.org/",
  },
  {
    title: "AI Index Report",
    url: "https://aiindex.stanford.edu/report/",
  },
] as const;

function explanations(
  child: string,
  teenager: string,
  collegeStudent: string,
  graduateStudent: string,
  expert: string,
): DifficultyExplanations {
  return {
    Child: child,
    Teenager: teenager,
    "College Student": collegeStudent,
    "Graduate Student": graduateStudent,
    Expert: expert,
  };
}

export const howAiWorksConcept = {
  slug: "how-ai-works",
  title: "How AI Works",
  subtitle:
    "A visual map of how modern AI systems learn patterns and generate outputs.",
  heroSummary:
    "This explainer turns AI into a connected system you can inspect node by node, without losing sight of the overall structure.",
  defaultNodeId: "model",
  defaultDifficulty: "College Student",
  learningObjectives: [
    "Understand the role of data, patterns, training, and prediction in one stable map.",
    "See how tokens and neural networks fit into the broader AI workflow.",
    "Recognize where errors, hallucinations, and risk come from instead of treating them as magic.",
    "Compare the same concept at five levels of technical depth.",
  ],
  theme: {
    accent: "#8fb5ff",
    accentSecondary: "#51e0cb",
    glow: "rgba(143, 181, 255, 0.18)",
  },
  sources: [...sharedSources],
  nodes: [
    {
      id: "what-ai-is",
      title: "What AI Is",
      shortSummary: "AI systems turn patterns in data into useful outputs.",
      icon: "AI",
      position: { x: 50, y: 15 },
      relatedNodeIds: ["data", "patterns", "model", "prediction"],
      example:
        "A spam filter learns from past email examples and predicts whether a new message is junk.",
      misconception:
        "AI is not a thinking being with general understanding just because it produces convincing output.",
      difficultyExplanations: explanations(
        "AI is a tool that learns from lots of examples so it can make smart guesses later.",
        "AI is software that finds useful patterns in examples and uses them to answer, sort, or generate things.",
        "AI refers to systems that infer mappings from data so they can classify, rank, predict, or generate outputs.",
        "Modern AI is best understood as statistical function approximation over structured inputs, optimized for task performance.",
        "In practice, AI systems operationalize pattern extraction and inference under objective functions rather than possessing human-like understanding.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "data",
      title: "Data",
      shortSummary:
        "Data gives the system examples of the world it needs to learn from.",
      icon: "DB",
      position: { x: 27, y: 29 },
      relatedNodeIds: ["patterns", "training", "tokens", "real-world-examples"],
      example:
        "Images, sentences, labels, clicks, sensor readings, or transcripts can all serve as training data.",
      misconception:
        "More data is not automatically better if it is noisy, biased, or poorly matched to the task.",
      difficultyExplanations: explanations(
        "Data is the pile of examples the AI studies.",
        "Data is the collection of examples the system uses to notice what usually goes together.",
        "Data is the empirical basis for learning. It shapes what the model can and cannot generalize from.",
        "Training data defines the support of the learning problem and strongly conditions model behavior, bias, and error modes.",
        "Data quality, coverage, labeling, and sampling strategy dominate downstream capability and failure characteristics.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "patterns",
      title: "Patterns",
      shortSummary:
        "AI works by detecting regularities that repeat across examples.",
      icon: "PT",
      position: { x: 50, y: 32 },
      relatedNodeIds: ["data", "training", "model", "prediction"],
      example:
        "If many pictures of cats share visual features, the system can learn that those features often appear together.",
      misconception:
        "AI does not memorize only exact examples; useful systems capture regularities that transfer to new cases.",
      difficultyExplanations: explanations(
        "Patterns are the clues that show up again and again.",
        "Patterns are recurring signals the model can use, like words that often appear together or shapes that often match a label.",
        "Learning means estimating correlations and structure that help the model make better predictions on new inputs.",
        "Pattern extraction involves parameter updates that encode regularities while discarding some noise and irrelevant variation.",
        "Useful representations capture task-relevant statistical structure without requiring the model to explicitly encode human concepts.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "training",
      title: "Training",
      shortSummary:
        "Training is the repeated adjustment process that improves model behavior.",
      icon: "TR",
      position: { x: 73, y: 30 },
      relatedNodeIds: ["data", "patterns", "model", "errors-hallucinations"],
      example:
        "A model compares its guess to the correct answer, measures the error, and adjusts internal weights over many rounds.",
      misconception:
        "Training is not a one-time upload of knowledge; it is an optimization process with tradeoffs and failure modes.",
      difficultyExplanations: explanations(
        "Training is the practice time where the AI keeps correcting itself.",
        "During training, the system makes guesses, checks how wrong they are, and changes itself a little each round.",
        "Training optimizes model parameters to reduce loss on examples, ideally improving generalization rather than just fitting the training set.",
        "Optimization iteratively updates parameters via gradient-based methods, balancing fit, stability, and generalization.",
        "Training is constrained optimization over high-dimensional parameter spaces with strong dependence on data distribution, objective design, and compute budget.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "model",
      title: "Model",
      shortSummary:
        "The model is the learned structure that turns inputs into outputs.",
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
        "A language model uses learned weights to predict which token should come next in a sequence.",
      misconception:
        "A model is not the same as the full product around it; it is the learned engine inside the system.",
      difficultyExplanations: explanations(
        "The model is the part that remembers what it learned.",
        "The model is the trained pattern machine that takes an input and produces a likely output.",
        "A model is the parameterized function learned during training and later reused during inference.",
        "The model is the deployed hypothesis class instantiation whose parameters encode learned behavior.",
        "Operationally, the model is the learned parameter tensor plus architecture, which together define the inference computation.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "prediction",
      title: "Prediction",
      shortSummary:
        "After training, the model uses learned patterns to choose an output for a new input.",
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
        "A recommendation model predicts which video you are likely to watch next based on past behavior.",
      misconception:
        "Prediction does not have to mean forecasting the future; it means choosing an output from an input.",
      difficultyExplanations: explanations(
        "Prediction is the AI making its best guess.",
        "Prediction is what happens when the trained system uses what it learned on a new case.",
        "Inference applies the trained model to unseen input and outputs scores, classes, probabilities, or generated content.",
        "Prediction is the forward-pass computation under learned parameters, often followed by decoding or decision rules.",
        "Inference maps new observations to outputs via the trained objective, but downstream decoding choices materially affect behavior.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "tokens",
      title: "Tokens",
      shortSummary:
        "Language models break text into smaller pieces they can process numerically.",
      icon: "TK",
      position: { x: 28, y: 61 },
      relatedNodeIds: ["data", "model", "prediction", "real-world-examples"],
      example:
        "A word, part of a word, punctuation mark, or space-like unit can become a token depending on the tokenizer.",
      misconception:
        "Tokens are not the same as words; tokenization is a technical representation choice.",
      difficultyExplanations: explanations(
        "Tokens are the small text pieces the AI reads one bit at a time.",
        "A language model chops text into chunks called tokens so it can process them as numbers.",
        "Tokens are the discrete units produced by tokenization, giving language models a manageable input representation.",
        "Tokenization defines the granularity of sequence modeling and affects context length, efficiency, and representational behavior.",
        "Tokenizer design is a nontrivial modeling choice that shapes compression, alignment, and generation dynamics.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "neural-networks",
      title: "Neural Networks",
      shortSummary:
        "Many modern AI models use layers of weighted computations to build useful internal representations.",
      icon: "NN",
      position: { x: 50, y: 81 },
      relatedNodeIds: ["model", "training", "errors-hallucinations", "limits-risks"],
      example:
        "A neural network can transform raw pixel values into progressively richer features for image recognition.",
      misconception:
        "Neural networks are inspired by brains in a loose sense, not as literal digital copies of biology.",
      difficultyExplanations: explanations(
        "A neural network is a stack of little math steps that helps the AI notice important clues.",
        "Neural networks pass information through many connected layers so the system can learn more useful features.",
        "Neural networks learn weighted transformations that convert raw inputs into increasingly task-relevant representations.",
        "Depth and nonlinear activations let neural networks approximate complex functions across high-dimensional input spaces.",
        "Neural architectures learn hierarchical representations through compositional nonlinear parameterization, enabling expressive function classes at scale.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "errors-hallucinations",
      title: "Errors / Hallucinations",
      shortSummary:
        "AI systems can produce confident outputs that are wrong, incomplete, or misleading.",
      icon: "ER",
      position: { x: 79, y: 78 },
      relatedNodeIds: [
        "training",
        "prediction",
        "neural-networks",
        "limits-risks",
      ],
      example:
        "A chatbot may invent a citation because it is predicting plausible text, not checking a trusted database.",
      misconception:
        "A convincing answer is not proof that the model actually knows the answer is true.",
      difficultyExplanations: explanations(
        "Sometimes AI sounds sure even when it is wrong.",
        "Hallucinations happen when the system produces something that looks believable but does not match reality.",
        "Error modes arise when learned patterns are insufficient, the input is ambiguous, or the model overcommits to likely-looking output.",
        "Hallucination is a mismatch between generated content and grounded truth, often amplified by decoding strategy and missing verification.",
        "These failures reflect objective mismatch, weak grounding, calibration issues, distribution shift, and incomplete observability.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "limits-risks",
      title: "Limits / Risks",
      shortSummary:
        "AI has technical, social, and ethical limits that matter in deployment.",
      icon: "LR",
      position: { x: 22, y: 82 },
      relatedNodeIds: [
        "neural-networks",
        "errors-hallucinations",
        "real-world-examples",
      ],
      example:
        "Bias in the training data can lead to unfair outputs even when the model appears accurate on average.",
      misconception:
        "The main risk is not only superintelligence; many present-day risks come from misuse, bias, opacity, and overreliance.",
      difficultyExplanations: explanations(
        "AI can be useful, but it can also make mistakes that hurt people if we trust it too much.",
        "Limits and risks include wrong answers, unfair patterns, privacy concerns, and using AI where it should not make the decision.",
        "Real-world deployment introduces issues of bias, robustness, accountability, security, and human overtrust.",
        "System risk emerges from both model-level limitations and sociotechnical context, including incentives, governance, and evaluation gaps.",
        "Capability alone is not the key variable; deployment risk depends on calibration, alignment, monitoring, externalities, and institutional control.",
      ),
      sources: [...sharedSources],
    },
    {
      id: "real-world-examples",
      title: "Real-World Examples",
      shortSummary:
        "Everyday AI applications show the same core system in different contexts.",
      icon: "RX",
      position: { x: 12, y: 49 },
      relatedNodeIds: ["data", "prediction", "tokens", "limits-risks"],
      example:
        "Recommendation feeds, autocomplete, translation tools, image search, and medical triage models all rely on learned patterns.",
      misconception:
        "Different AI products may look unrelated, but many rely on the same underlying pattern-learning pipeline.",
      difficultyExplanations: explanations(
        "You already meet AI in things like maps, videos, and chat tools.",
        "Examples like recommender systems, voice assistants, and chatbots show the same learning idea in different products.",
        "Applications differ by data type and objective, but they usually share the pipeline of data, training, modeling, and inference.",
        "Many deployed systems are task-specialized instantiations of a common statistical learning framework with domain-specific constraints.",
        "Product differences often mask a shared substrate of supervised, self-supervised, or reinforcement-driven learning pipelines.",
      ),
      sources: [...sharedSources],
    },
  ],
} satisfies ConceptData;
