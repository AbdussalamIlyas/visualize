import type {
  Concept,
  ConceptExplainer,
  GlossaryTerm,
  Hotspot,
  MapExplainer,
  MapNode,
  MapPosition,
  PipelineExplainer,
  Source,
  Stage,
  VisualLayer,
} from "@/lib/concept-schema";

type ConnectionPair = {
  source: string;
  target: string;
};

export type ConceptHandleSide = "top" | "right" | "bottom" | "left";

export type ConceptConnection = ConnectionPair & {
  sourceHandle: ConceptHandleSide;
  targetHandle: ConceptHandleSide;
};

export const conceptCanvas = {
  width: 1000,
  height: 760,
} as const;

export function getExplainerById(
  concept: Concept,
  explainerId: string,
): ConceptExplainer | undefined {
  return concept.explainers.find((explainer) => explainer.id === explainerId);
}

export function getDefaultExplainer(concept: Concept): ConceptExplainer {
  return (
    getExplainerById(concept, concept.defaultExplainerId) ?? concept.explainers[0]
  );
}

export function getPipelineStageById(
  explainer: PipelineExplainer,
  stageId: string,
): Stage | undefined {
  return explainer.stages.find((stage) => stage.id === stageId);
}

export function getDefaultPipelineStage(explainer: PipelineExplainer): Stage {
  return (
    getPipelineStageById(explainer, explainer.defaultStageId ?? "") ??
    explainer.stages[0]
  );
}

export function getLayerById(
  explainer: PipelineExplainer,
  layerId: string,
): VisualLayer | undefined {
  return explainer.layers.find((layer) => layer.id === layerId);
}

export function getVisibleLayers(
  explainer: PipelineExplainer,
  stage: Stage,
): VisualLayer[] {
  const visibleIds = new Set(stage.visibleLayerIds);

  return explainer.layers.filter((layer) => visibleIds.has(layer.id));
}

export function getHotspotById(
  explainer: PipelineExplainer,
  hotspotId: string,
): Hotspot | undefined {
  return explainer.hotspots.find((hotspot) => hotspot.id === hotspotId);
}

export function getStageHotspots(
  explainer: PipelineExplainer,
  stage: Stage,
): Hotspot[] {
  return stage.activeHotspotIds
    .map((hotspotId) => getHotspotById(explainer, hotspotId))
    .filter((hotspot): hotspot is Hotspot => {
      if (!hotspot) {
        return false;
      }

      return hotspot.revealsInStages.includes(stage.id);
    });
}

export function getDefaultHotspotId(
  explainer: PipelineExplainer,
  stage: Stage,
): string | null {
  return getStageHotspots(explainer, stage)[0]?.id ?? null;
}

export function getMapNodeById(
  explainer: MapExplainer,
  nodeId: string,
): MapNode | undefined {
  return explainer.nodes.find((node) => node.id === nodeId);
}

export function getDefaultMapNode(explainer: MapExplainer): MapNode {
  return getMapNodeById(explainer, explainer.defaultNodeId) ?? explainer.nodes[0];
}

export function getRelatedMapNodes(
  explainer: MapExplainer,
  node: MapNode,
): MapNode[] {
  const relatedIds = new Set(node.relatedNodeIds);

  return explainer.nodes.filter((candidate) => relatedIds.has(candidate.id));
}

export function getFocusNodeIds(node: MapNode): Set<string> {
  return new Set([node.id, ...node.relatedNodeIds]);
}

export function toCanvasPosition(position: MapPosition) {
  return {
    x: (position.x / 100) * conceptCanvas.width,
    y: (position.y / 100) * conceptCanvas.height,
  };
}

export function getHandleForDirection(
  source: MapPosition,
  target: MapPosition,
): {
  sourceHandle: ConceptHandleSide;
  targetHandle: ConceptHandleSide;
} {
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;

  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX >= 0
      ? { sourceHandle: "right", targetHandle: "left" }
      : { sourceHandle: "left", targetHandle: "right" };
  }

  return deltaY >= 0
    ? { sourceHandle: "bottom", targetHandle: "top" }
    : { sourceHandle: "top", targetHandle: "bottom" };
}

export function getConnectionPairs(explainer: MapExplainer): ConnectionPair[] {
  const seen = new Set<string>();
  const pairs: ConnectionPair[] = [];

  explainer.nodes.forEach((node) => {
    node.relatedNodeIds.forEach((relatedId) => {
      const [source, target] = [node.id, relatedId].sort();
      const key = `${source}:${target}`;

      if (!seen.has(key)) {
        seen.add(key);
        pairs.push({ source, target });
      }
    });
  });

  return pairs;
}

export function getConnections(explainer: MapExplainer): ConceptConnection[] {
  return getConnectionPairs(explainer)
    .map((pair) => {
      const sourceNode = getMapNodeById(explainer, pair.source);
      const targetNode = getMapNodeById(explainer, pair.target);

      if (!sourceNode || !targetNode) {
        return null;
      }

      return {
        ...pair,
        ...getHandleForDirection(sourceNode.position, targetNode.position),
      };
    })
    .filter((connection): connection is ConceptConnection => connection !== null);
}

export function getCombinedSources(
  concept: Concept,
  explainer: ConceptExplainer,
): Source[] {
  const sourceMap = new Map<string, Source>();

  [...concept.sources, ...(explainer.sources ?? [])].forEach((source) => {
    sourceMap.set(source.url, source);
  });

  return [...sourceMap.values()];
}

export function getCombinedGlossary(
  concept: Concept,
  explainer: ConceptExplainer,
): GlossaryTerm[] {
  const glossaryMap = new Map<string, GlossaryTerm>();

  [...concept.glossary, ...(explainer.glossary ?? [])].forEach((term) => {
    glossaryMap.set(term.id, term);
  });

  return [...glossaryMap.values()];
}
