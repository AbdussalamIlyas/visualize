"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { motion } from "motion/react";
import { startTransition, useState } from "react";

import { ConceptDetailPanel } from "@/components/concept/concept-detail-panel";
import { ConceptFlow } from "@/components/concept/concept-flow";
import { Pill } from "@/components/ui/pill";
import type { MapExplainer } from "@/lib/concept-schema";
import {
  getDefaultMapNode,
  getMapNodeById,
  getRelatedMapNodes,
} from "@/lib/concept-utils";

type MapExplainerProps = {
  explainer: MapExplainer;
};

export function MapExplainerView({ explainer }: MapExplainerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    () => getDefaultMapNode(explainer).id,
  );
  const selectedNode =
    getMapNodeById(explainer, selectedNodeId) ?? getDefaultMapNode(explainer);
  const relatedNodes = getRelatedMapNodes(explainer, selectedNode);

  function handleSelectNode(nodeId: string) {
    if (nodeId === selectedNode.id) {
      return;
    }

    startTransition(() => {
      setSelectedNodeId(nodeId);
    });
  }

  return (
    <section className="space-y-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 px-1"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">Secondary view</Pill>
          <Pill>{explainer.type}</Pill>
        </div>
        <p
          className="text-sm text-[var(--color-muted)]"
          id="map-explainer-intro"
        >
          Tap nodes for definitions and links.
        </p>
      </motion.div>

      <ReactFlowProvider>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,27rem)]">
          <ConceptFlow
            describedById="map-explainer-intro"
            explainer={explainer}
            onSelectNode={handleSelectNode}
            selectedNodeId={selectedNode.id}
          />
          <ConceptDetailPanel
            node={selectedNode}
            onSelectNode={handleSelectNode}
            relatedNodes={relatedNodes}
          />
        </div>
      </ReactFlowProvider>
    </section>
  );
}
