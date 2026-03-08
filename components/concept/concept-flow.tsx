"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesInitialized,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ConceptEmptyState } from "@/components/concept/concept-empty-state";
import {
  ConceptMapNode,
  type ConceptFlowNode,
} from "@/components/concept/concept-map-node";
import type { MapExplainer } from "@/lib/concept-schema";
import {
  conceptCanvas,
  getConnections,
  getDefaultMapNode,
  getFocusNodeIds,
  getMapNodeById,
  toCanvasPosition,
} from "@/lib/concept-utils";

type ConceptFlowProps = {
  explainer: MapExplainer;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  describedById?: string;
};

const nodeTypes = {
  concept: ConceptMapNode,
} satisfies NodeTypes;

export function ConceptFlow({
  explainer,
  selectedNodeId,
  onSelectNode,
  describedById,
}: ConceptFlowProps) {
  const shouldReduceMotion = useReducedMotion();
  const nodesInitialized = useNodesInitialized();

  if (explainer.nodes.length === 0) {
    return (
      <ConceptEmptyState
        description="This secondary explainer does not have any map nodes to render yet."
        title="No map nodes are available."
      />
    );
  }

  const selectedNode =
    getMapNodeById(explainer, selectedNodeId) ?? getDefaultMapNode(explainer);
  const focusIds = getFocusNodeIds(selectedNode);

  const nodes: ConceptFlowNode[] = explainer.nodes.map((node) => ({
    id: node.id,
    type: "concept",
    position: toCanvasPosition(node.position),
    data: {
      id: node.id,
      title: node.title,
      icon: node.icon,
      shortSummary: node.shortSummary,
      isActive: node.id === selectedNode.id,
      isRelated: node.relatedNodeIds.includes(selectedNode.id),
      isDimmed: !focusIds.has(node.id),
      onSelect: onSelectNode,
    },
    draggable: false,
    selectable: false,
    focusable: false,
  }));

  const edges: Edge[] = getConnections(explainer).map((connection) => {
    const isDirect =
      connection.source === selectedNode.id || connection.target === selectedNode.id;
    const isWithinFocus =
      focusIds.has(connection.source) && focusIds.has(connection.target);

    return {
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      type: "smoothstep",
      animated: isDirect && !shouldReduceMotion,
      selectable: false,
      focusable: false,
      interactionWidth: 24,
      style: {
        stroke: isDirect
          ? "rgba(143, 181, 255, 0.92)"
          : isWithinFocus
            ? "rgba(81, 224, 203, 0.46)"
            : "rgba(163, 177, 214, 0.18)",
        strokeWidth: isDirect ? 2.6 : isWithinFocus ? 1.8 : 1.15,
        opacity: isDirect ? 1 : isWithinFocus ? 0.72 : 0.34,
      },
    };
  });

  return (
    <motion.section
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      className="surface overflow-hidden"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="space-y-2">
          <h2 className="section-eyebrow" id="concept-map-title">
            Concept Map
          </h2>
          <p className="text-sm text-[var(--color-muted)]">Tap nodes. Drag to inspect.</p>
        </div>
        <motion.div
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]"
          key={selectedNode.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          Selected: {selectedNode.title}
        </motion.div>
      </div>
      <div className="relative h-[30rem] sm:h-[36rem] xl:h-[44rem]">
        <p className="sr-only" id="concept-map-instructions">
          Use Tab to move to node buttons in the concept map. Activate a node to
          update the detail panel. On touch devices, drag to inspect the map.
        </p>
        <ReactFlow
          aria-label={`${explainer.title} view`}
          aria-describedby={
            describedById
              ? `${describedById} concept-map-instructions`
              : "concept-map-instructions"
          }
          aria-labelledby="concept-map-title"
          aria-busy={!nodesInitialized}
          defaultEdgeOptions={{ type: "smoothstep" }}
          edges={edges}
          elementsSelectable={false}
          fitView
          fitViewOptions={{ padding: 0.16 }}
          maxZoom={1.35}
          minZoom={0.64}
          nodeOrigin={[0.5, 0.5]}
          nodeTypes={nodeTypes}
          nodes={nodes}
          nodesConnectable={false}
          nodesDraggable={false}
          onNodeClick={(_, node) => onSelectNode(node.id)}
          panOnDrag
          translateExtent={[
            [-140, -140],
            [conceptCanvas.width + 140, conceptCanvas.height + 140],
          ]}
          zoomOnDoubleClick={false}
          zoomOnScroll={false}
        >
          <Background
            color="rgba(255,255,255,0.08)"
            gap={22}
            size={1}
            variant={BackgroundVariant.Dots}
          />
          <Controls className="max-sm:hidden" position="bottom-right" showInteractive={false} />
        </ReactFlow>
        <AnimatePresence>
          {!nodesInitialized ? (
            <motion.div
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(180deg,rgba(8,12,24,0.7),rgba(8,12,24,0.58))] backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <div className="surface-muted flex items-center gap-3 px-4 py-3">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
                <span className="text-sm text-[var(--color-muted)]">
                  Loading map...
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
