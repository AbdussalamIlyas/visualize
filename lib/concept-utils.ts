import type {
  ConceptData,
  ConceptNode,
  DifficultyLevel,
  ConceptPosition,
} from "@/lib/concept-schema";
import { difficultyLevels } from "@/lib/concept-schema";

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

export function getDefaultDifficulty(concept: ConceptData): DifficultyLevel {
  return concept.defaultDifficulty ?? difficultyLevels[2];
}

export function getNodeById(
  concept: ConceptData,
  nodeId: string,
): ConceptNode | undefined {
  return concept.nodes.find((node) => node.id === nodeId);
}

export function getDefaultNode(concept: ConceptData): ConceptNode {
  return getNodeById(concept, concept.defaultNodeId) ?? concept.nodes[0];
}

export function getRelatedNodes(
  concept: ConceptData,
  node: ConceptNode,
): ConceptNode[] {
  const relatedIds = new Set(node.relatedNodeIds);

  return concept.nodes.filter((candidate) => relatedIds.has(candidate.id));
}

export function getFocusNodeIds(node: ConceptNode): Set<string> {
  return new Set([node.id, ...node.relatedNodeIds]);
}

export function toCanvasPosition(position: ConceptPosition) {
  return {
    x: (position.x / 100) * conceptCanvas.width,
    y: (position.y / 100) * conceptCanvas.height,
  };
}

export function getHandleForDirection(
  source: ConceptPosition,
  target: ConceptPosition,
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

export function getConnectionPairs(concept: ConceptData): ConnectionPair[] {
  const seen = new Set<string>();
  const pairs: ConnectionPair[] = [];

  concept.nodes.forEach((node) => {
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

export function getConnections(concept: ConceptData): ConceptConnection[] {
  return getConnectionPairs(concept)
    .map((pair) => {
      const sourceNode = getNodeById(concept, pair.source);
      const targetNode = getNodeById(concept, pair.target);

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
