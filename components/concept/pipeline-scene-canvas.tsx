/* eslint-disable react/no-unknown-property */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  Line,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";
import { Color } from "three";

import type {
  ConceptTheme,
  Hotspot,
  PipelineExplainer,
  Stage,
  VisualLayer,
  VisualLayerTone,
} from "@/lib/concept-schema";

export type PipelineSceneCanvasProps = {
  explainer: PipelineExplainer;
  currentStage: Stage;
  visibleLayerIds: Set<string>;
  highlightedLayerIds: Set<string>;
  stageHotspots: Hotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
  shouldReduceMotion: boolean;
  theme?: ConceptTheme;
};

type SceneVariantProps = {
  currentStage: Stage;
  visibleLayerIds: Set<string>;
  highlightedLayerIds: Set<string>;
  shouldReduceMotion: boolean;
  theme?: ConceptTheme;
};

const sceneSize = {
  width: 12,
  height: 7.2,
} as const;

function tonePalette(tone: VisualLayerTone, theme?: ConceptTheme) {
  if (tone === "warning") {
    return {
      shell: new Color("#5a1f1d"),
      face: new Color("#ff9d7a"),
      emissive: new Color("#ff7b5a"),
      line: "#ff9d7a",
    };
  }

  if (tone === "secondary") {
    return {
      shell: new Color("#0f2e31"),
      face: new Color(theme?.accentSecondary ?? "#51e0cb"),
      emissive: new Color(theme?.accentSecondary ?? "#51e0cb"),
      line: theme?.accentSecondary ?? "#51e0cb",
    };
  }

  if (tone === "accent") {
    return {
      shell: new Color("#17264c"),
      face: new Color(theme?.accent ?? "#8fb5ff"),
      emissive: new Color(theme?.accent ?? "#8fb5ff"),
      line: theme?.accent ?? "#8fb5ff",
    };
  }

  return {
    shell: new Color("#1c253a"),
    face: new Color("#dce7ff"),
    emissive: new Color("#95b8ff"),
    line: theme?.accent ?? "#8fb5ff",
  };
}

function getLayerDepth(layer: VisualLayer, isHighlighted: boolean) {
  const baseDepthByKind: Record<VisualLayer["kind"], number> = {
    input: 0.6,
    data: 0.45,
    process: 1.1,
    model: 1.35,
    output: 1.18,
    warning: 0.35,
    chip: 0.82,
  };

  const depth = layer.depth ? layer.depth / 100 : baseDepthByKind[layer.kind];

  return depth + (isHighlighted ? 0.18 : 0);
}

function toWorldPosition(layer: VisualLayer, isHighlighted: boolean) {
  const centerX = layer.position.x + layer.position.width / 2;
  const centerY = layer.position.y + layer.position.height / 2;

  return [
    (centerX / 100 - 0.5) * sceneSize.width,
    (0.5 - centerY / 100) * sceneSize.height,
    getLayerDepth(layer, isHighlighted),
  ] as [number, number, number];
}

function toWorldSize(layer: VisualLayer) {
  return [
    (layer.position.width / 100) * sceneSize.width,
    (layer.position.height / 100) * sceneSize.height,
    0.34,
  ] as [number, number, number];
}

function toHotspotPosition(hotspot: Hotspot, isActive: boolean) {
  const z =
    hotspot.tone === "warning"
      ? 1.35
      : hotspot.tone === "secondary"
        ? 1.5
        : 1.65;

  return [
    (hotspot.anchor.x / 100 - 0.5) * sceneSize.width,
    (0.5 - hotspot.anchor.y / 100) * sceneSize.height,
    z + (isActive ? 0.15 : 0),
  ] as [number, number, number];
}

function layerTilt(layer: VisualLayer, isHighlighted: boolean) {
  const centerX = layer.position.x + layer.position.width / 2 - 50;
  const centerY = layer.position.y + layer.position.height / 2 - 50;

  return [
    -0.16 + centerY * -0.002 + (isHighlighted ? -0.03 : 0),
    centerX * 0.0025,
    0,
  ] as [number, number, number];
}

function HotspotBeacon({
  hotspot,
  isActive,
  onSelect,
  shouldReduceMotion,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  onSelect: (hotspot: Hotspot) => void;
  shouldReduceMotion: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const basePosition = toHotspotPosition(hotspot, isActive);
  const palette = tonePalette(hotspot.tone ?? "accent");

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (shouldReduceMotion) {
      groupRef.current.position.set(...basePosition);
      return;
    }

    groupRef.current.position.x = basePosition[0];
    groupRef.current.position.z = basePosition[2];
    groupRef.current.position.y =
      basePosition[1] + Math.sin(state.clock.elapsedTime * 1.7 + basePosition[0]) * 0.07;
    groupRef.current.rotation.z += delta * (isActive ? 0.9 : 0.45);
  });

  return (
    <group
      ref={groupRef}
      onClick={() => onSelect(hotspot)}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
      position={basePosition}
    >
      <mesh>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshBasicMaterial color={palette.line} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.024, 18, 48]} />
        <meshBasicMaterial
          color={palette.line}
          opacity={isActive ? 0.95 : 0.55}
          transparent
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.23, 0.27, 48]} />
        <meshBasicMaterial
          color={palette.line}
          opacity={isActive ? 0.4 : 0.2}
          transparent
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </group>
  );
}

function LayerNode({
  layer,
  isHighlighted,
  isDimmed,
  outputLabel,
  theme,
}: {
  layer: VisualLayer;
  isHighlighted: boolean;
  isDimmed: boolean;
  outputLabel?: string;
  theme?: ConceptTheme;
}) {
  const groupRef = useRef<Group>(null);
  const palette = tonePalette(layer.tone, theme);
  const position = toWorldPosition(layer, isHighlighted);
  const size = toWorldSize(layer);
  const rotation = layerTilt(layer, isHighlighted);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const pulse = Math.sin(state.clock.elapsedTime * 1.35 + position[0]) * 0.012;
    groupRef.current.position.set(position[0], position[1], position[2] + pulse);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh position={[0, -size[1] * 0.04, -0.12]}>
        <boxGeometry args={[size[0] * 0.97, size[1] * 0.97, 0.16]} />
        <meshStandardMaterial
          color={palette.shell}
          metalness={0.2}
          opacity={isDimmed ? 0.52 : 0.72}
          roughness={0.6}
          transparent
        />
      </mesh>
      <RoundedBox args={size} radius={0.16} smoothness={6}>
        <meshPhysicalMaterial
          clearcoat={0.75}
          clearcoatRoughness={0.28}
          color={palette.shell}
          emissive={palette.emissive}
          emissiveIntensity={isHighlighted ? 0.34 : 0.12}
          metalness={0.16}
          opacity={isDimmed ? 0.7 : 0.96}
          roughness={0.3}
          transparent
        />
      </RoundedBox>
      <mesh position={[0, 0, size[2] * 0.52]}>
        <planeGeometry args={[size[0] * 0.9, size[1] * 0.88]} />
        <meshBasicMaterial
          color={palette.face}
          opacity={isHighlighted ? 0.3 : 0.18}
          transparent
        />
      </mesh>
      <Html
        center
        occlude
        position={[0, 0, size[2] * 0.62]}
        transform
      >
        <div className="pointer-events-none min-w-[5rem] rounded-[1rem] border border-white/10 bg-[rgba(8,12,24,0.78)] px-3 py-2 text-center shadow-[0_18px_38px_rgba(4,10,24,0.35)] backdrop-blur-md">
          <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {layer.shortLabel}
          </p>
          <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
            {layer.label}
          </p>
          {outputLabel ? (
            <p className="mt-2 rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-[0.62rem] font-medium text-white">
              {outputLabel}
            </p>
          ) : null}
        </div>
      </Html>
    </group>
  );
}

function ConnectionBeams({
  explainer,
  visibleLayerIds,
  highlightedLayerIds,
  theme,
}: {
  explainer: PipelineExplainer;
  visibleLayerIds: Set<string>;
  highlightedLayerIds: Set<string>;
  theme?: ConceptTheme;
}) {
  return (
    <>
      {explainer.connections.map((connection) => {
        const source = explainer.layers.find(
          (layer) => layer.id === connection.sourceLayerId,
        );
        const target = explainer.layers.find(
          (layer) => layer.id === connection.targetLayerId,
        );

        if (!source || !target) {
          return null;
        }

        const isVisible =
          visibleLayerIds.has(connection.sourceLayerId) &&
          visibleLayerIds.has(connection.targetLayerId);

        if (!isVisible) {
          return null;
        }

        const isHighlighted =
          highlightedLayerIds.has(connection.sourceLayerId) ||
          highlightedLayerIds.has(connection.targetLayerId);

        const sourcePoint = toWorldPosition(source, highlightedLayerIds.has(source.id));
        const targetPoint = toWorldPosition(target, highlightedLayerIds.has(target.id));
        const midX = (sourcePoint[0] + targetPoint[0]) / 2;
        const midY = (sourcePoint[1] + targetPoint[1]) / 2;
        const lift = isHighlighted ? 0.8 : 0.45;
        const midZ = Math.max(sourcePoint[2], targetPoint[2]) + lift;
        const color = isHighlighted ? theme?.accent ?? "#8fb5ff" : "#9caed5";

        return (
          <group key={connection.id}>
            <Line
              color={color}
              lineWidth={isHighlighted ? 3.6 : 2.4}
              opacity={isHighlighted ? 0.22 : 0.1}
              points={[
                [sourcePoint[0], sourcePoint[1], sourcePoint[2]],
                [midX, midY, midZ],
                [targetPoint[0], targetPoint[1], targetPoint[2]],
              ]}
              transparent
            />
            <Line
              color={color}
              lineWidth={isHighlighted ? 1.3 : 0.7}
              opacity={isHighlighted ? 0.95 : 0.42}
              points={[
                [sourcePoint[0], sourcePoint[1], sourcePoint[2]],
                [midX, midY, midZ],
                [targetPoint[0], targetPoint[1], targetPoint[2]],
              ]}
              transparent
            />
          </group>
        );
      })}
    </>
  );
}

function SceneRig({
  children,
  shouldReduceMotion,
}: {
  children: ReactNode;
  shouldReduceMotion: boolean;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const targetX = shouldReduceMotion ? -0.48 : -0.5 + state.pointer.y * 0.08;
    const targetY = shouldReduceMotion ? -0.36 : -0.36 + state.pointer.x * 0.16;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.06;
  });

  return <group ref={groupRef}>{children}</group>;
}

function SceneTag({
  label,
  position,
  secondary,
}: {
  label: string;
  position: [number, number, number];
  secondary?: string;
}) {
  return (
    <Html center occlude position={position} transform>
      <div className="pointer-events-none rounded-full border border-white/10 bg-[rgba(8,12,24,0.8)] px-3 py-2 text-center shadow-[0_18px_36px_rgba(4,10,24,0.34)] backdrop-blur-md">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white">
          {label}
        </p>
        {secondary ? (
          <p className="mt-1 text-[0.62rem] text-[var(--color-muted)]">{secondary}</p>
        ) : null}
      </div>
    </Html>
  );
}

function FlowBand({
  startX,
  endX,
  y,
  z,
  color,
  count,
  speed,
  shouldReduceMotion,
}: {
  startX: number;
  endX: number;
  y: number;
  z: number;
  color: string;
  count: number;
  speed: number;
  shouldReduceMotion: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const span = endX - startX;
  const offsets = Array.from({ length: count }, (_, index) => index / count);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.children.forEach((child, index) => {
      const progress = shouldReduceMotion
        ? offsets[index]
        : (offsets[index] + state.clock.elapsedTime * speed) % 1;

      child.position.x = startX + progress * span;
    });
  });

  return (
    <group ref={groupRef} position={[0, y, z]}>
      {offsets.map((offset) => (
        <mesh key={`${color}-${offset}`} position={[startX + offset * span, 0, 0]}>
          <sphereGeometry args={[0.06, 18, 18]} />
          <meshBasicMaterial color={color} opacity={0.88} transparent />
        </mesh>
      ))}
    </group>
  );
}

function JetEngineScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const fanRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!fanRef.current || shouldReduceMotion) {
      return;
    }

    fanRef.current.rotation.x += delta * 5.2;
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.42;
  }

  const accentColor = theme?.accent ?? "#9ac3ff";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      <mesh position={[0.15, 0, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.5, 1.72, 8.8, 42, 1, true]} />
        <meshStandardMaterial
          color="#9da9bb"
          metalness={0.62}
          opacity={0.24}
          roughness={0.36}
          side={2}
          transparent
        />
      </mesh>

      <mesh position={[-4.55, 0, 0.28]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.36, 0.14, 20, 50]} />
        <meshStandardMaterial color="#d8e0ec" metalness={0.58} roughness={0.24} />
      </mesh>

      {isVisible("bypass") ? (
        <>
          <RoundedBox args={[7.7, 0.44, 0.32]} position={[0.18, 1.06, 0.08]} radius={0.18} smoothness={4}>
            <meshPhysicalMaterial
              color={secondaryColor}
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("bypass") ? 0.4 : 0.14}
              opacity={opacityFor("bypass", 0.74)}
              roughness={0.24}
              transparent
            />
          </RoundedBox>
          <RoundedBox args={[7.7, 0.44, 0.32]} position={[0.18, -1.06, 0.08]} radius={0.18} smoothness={4}>
            <meshPhysicalMaterial
              color={secondaryColor}
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("bypass") ? 0.4 : 0.14}
              opacity={opacityFor("bypass", 0.74)}
              roughness={0.24}
              transparent
            />
          </RoundedBox>
          <SceneTag label="Bypass flow" position={[0.25, 1.62, 0.7]} />
        </>
      ) : null}

      {isVisible("core") ? (
        <>
          <mesh position={[0.28, 0, 0.38]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.72, 0.78, 6.2, 32]} />
            <meshPhysicalMaterial
              color="#1e2536"
              clearcoat={0.36}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("core") ? 0.18 : 0.05}
              metalness={0.18}
              opacity={opacityFor("core", 0.82)}
              roughness={0.42}
              transparent
            />
          </mesh>
          <SceneTag label="Core flow" position={[-1.3, -1.02, 0.92]} />
        </>
      ) : null}

      {isVisible("fan") ? (
        <>
          <group ref={fanRef} position={[-4.55, 0, 0.45]}>
            {Array.from({ length: 8 }, (_, index) => (
              <mesh
                key={`fan-blade-${index}`}
                position={[0, 0, 0]}
                rotation={[0, 0, (index / 8) * Math.PI * 2]}
              >
                <boxGeometry args={[0.12, 1.82, 0.04]} />
                <meshStandardMaterial
                  color={accentColor}
                  emissive={new Color(accentColor)}
                  emissiveIntensity={isHighlighted("fan") ? 0.36 : 0.12}
                  metalness={0.26}
                  opacity={opacityFor("fan", 0.94)}
                  roughness={0.32}
                  transparent
                />
              </mesh>
            ))}
          </group>
          <mesh position={[-4.55, 0, 0.48]}>
            <cylinderGeometry args={[0.16, 0.16, 0.22, 20]} />
            <meshStandardMaterial color="#dce6f7" metalness={0.62} roughness={0.2} />
          </mesh>
          <SceneTag label="Fan" position={[-4.58, 1.82, 0.86]} />
        </>
      ) : null}

      {isVisible("compressor") ? (
        <>
          {Array.from({ length: 5 }, (_, index) => (
            <mesh
              key={`compressor-${index}`}
              position={[-2.2 + index * 0.45, 0, 0.55]}
              rotation={[0.24, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.92 - index * 0.06, 0.38]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={new Color(accentColor)}
                emissiveIntensity={isHighlighted("compressor") ? 0.36 : 0.1}
                metalness={0.42}
                opacity={opacityFor("compressor", 0.9)}
                roughness={0.24}
                transparent
              />
            </mesh>
          ))}
          <SceneTag label="Compressor" position={[-1.1, -1.48, 0.9]} />
        </>
      ) : null}

      {isVisible("combustor") ? (
        <>
          <mesh position={[1.05, 0, 0.58]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.54, 0.62, 1.5, 28]} />
            <meshPhysicalMaterial
              color="#ff9d7a"
              emissive={new Color("#ff7d52")}
              emissiveIntensity={isHighlighted("combustor") ? 1.2 : 0.5}
              opacity={opacityFor("combustor", 0.9)}
              roughness={0.16}
              transparent
            />
          </mesh>
          <mesh position={[1.2, 0, 0.75]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.32, 1.1, 28]} />
            <meshBasicMaterial color="#ffb26b" opacity={opacityFor("combustor", 0.5)} transparent />
          </mesh>
          <SceneTag label="Combustor" position={[1.18, 1.38, 1.1]} />
        </>
      ) : null}

      {isVisible("shaft") ? (
        <>
          <mesh position={[0.42, 0, 0.44]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 5.5, 18]} />
            <meshStandardMaterial
              color={secondaryColor}
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("shaft") ? 0.42 : 0.12}
              metalness={0.38}
              opacity={opacityFor("shaft", 0.9)}
              roughness={0.26}
              transparent
            />
          </mesh>
          <SceneTag label="Shaft" position={[0.3, -1.72, 0.85]} />
        </>
      ) : null}

      {isVisible("turbine") ? (
        <>
          {Array.from({ length: 4 }, (_, index) => (
            <mesh
              key={`turbine-${index}`}
              position={[2.12 + index * 0.34, 0, 0.56]}
              rotation={[-0.22, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.88 - index * 0.08, 0.34]} />
              <meshStandardMaterial
                color="#ffd38a"
                emissive={new Color("#ffb26b")}
                emissiveIntensity={isHighlighted("turbine") ? 0.52 : 0.18}
                metalness={0.46}
                opacity={opacityFor("turbine", 0.92)}
                roughness={0.18}
                transparent
              />
            </mesh>
          ))}
          <SceneTag label="Turbine" position={[2.64, 1.54, 0.96]} />
        </>
      ) : null}

      {isVisible("nozzle") ? (
        <>
          <mesh position={[4.32, 0, 0.44]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.46, 0.74, 1.9, 30]} />
            <meshPhysicalMaterial
              color="#d9e2f3"
              clearcoat={0.34}
              emissive={new Color("#cbd8ff")}
              emissiveIntensity={isHighlighted("nozzle") ? 0.2 : 0.06}
              metalness={0.54}
              opacity={opacityFor("nozzle", 0.9)}
              roughness={0.22}
              transparent
            />
          </mesh>
          <SceneTag label="Nozzle" position={[4.38, -1.44, 0.9]} />
        </>
      ) : null}

      {isVisible("thrust") ? (
        <>
          <mesh position={[5.78, 0, 0.42]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.44, 2.1, 30]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={opacityFor("thrust", 0.45)}
              transparent
            />
          </mesh>
          <SceneTag
            label="Thrust"
            position={[6.2, 1.42, 1.02]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </>
      ) : null}

      {isVisible("fan") ? (
        <FlowBand
          color={secondaryColor}
          count={6}
          endX={-3.35}
          speed={0.26}
          shouldReduceMotion={shouldReduceMotion}
          startX={-5.5}
          y={0}
          z={0.92}
        />
      ) : null}

      {isVisible("bypass") ? (
        <>
          <FlowBand
            color={secondaryColor}
            count={7}
            endX={4.95}
            speed={0.34}
            shouldReduceMotion={shouldReduceMotion}
            startX={-3.55}
            y={1.02}
            z={0.82}
          />
          <FlowBand
            color={secondaryColor}
            count={7}
            endX={4.95}
            speed={0.34}
            shouldReduceMotion={shouldReduceMotion}
            startX={-3.55}
            y={-1.02}
            z={0.82}
          />
        </>
      ) : null}

      {isVisible("core") || isVisible("compressor") ? (
        <FlowBand
          color={accentColor}
          count={6}
          endX={-0.2}
          speed={0.28}
          shouldReduceMotion={shouldReduceMotion}
          startX={-3.25}
          y={0}
          z={0.96}
        />
      ) : null}

      {isVisible("combustor") || isVisible("turbine") || isVisible("nozzle") ? (
        <FlowBand
          color="#ffb26b"
          count={7}
          endX={4.65}
          speed={0.38}
          shouldReduceMotion={shouldReduceMotion}
          startX={0.1}
          y={0}
          z={1.02}
        />
      ) : null}
    </>
  );
}

function GpsScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const satelliteRef = useRef<Group>(null);
  const satellitePositions = [
    [-2.7, 1.6, 1.5],
    [0.1, 2.15, 1.7],
    [2.95, 1.3, 1.48],
    [2.35, -0.55, 1.38],
  ] as const;
  const receiverPosition = [-1.9, -1.5, 0.8] as const;
  const solverPosition = [1.05, -0.18, 1.08] as const;
  const mapPosition = [4.55, -0.62, 0.84] as const;

  useFrame((_, delta) => {
    if (!satelliteRef.current || shouldReduceMotion) {
      return;
    }

    satelliteRef.current.rotation.z += delta * 0.12;
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.45;
  }

  const accentColor = theme?.accent ?? "#9ac3ff";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      <mesh position={[0.8, -0.62, -0.32]}>
        <sphereGeometry args={[1.92, 40, 40]} />
        <meshPhysicalMaterial
          clearcoat={0.18}
          color="#15304a"
          emissive={new Color("#1a4d74")}
          emissiveIntensity={0.12}
          metalness={0.12}
          opacity={0.92}
          roughness={0.44}
          transparent
        />
      </mesh>

      <mesh position={[0.8, -0.58, 1.06]} rotation={[-0.36, 0.18, 0.1]}>
        <torusGeometry args={[3.45, 0.04, 18, 128]} />
        <meshBasicMaterial color="#5d7fb8" opacity={0.18} transparent />
      </mesh>

      {isVisible("satellites") ? (
        <group ref={satelliteRef}>
          {satellitePositions.map((position, index) => (
            <group key={`satellite-${index}`} position={position}>
              <mesh>
                <boxGeometry args={[0.34, 0.2, 0.18]} />
                <meshStandardMaterial
                  color="#dbe5f5"
                  emissive={new Color(secondaryColor)}
                  emissiveIntensity={isHighlighted("satellites") ? 0.34 : 0.1}
                  metalness={0.58}
                  opacity={opacityFor("satellites", 0.96)}
                  roughness={0.2}
                  transparent
                />
              </mesh>
              <mesh position={[-0.32, 0, 0]}>
                <boxGeometry args={[0.42, 0.12, 0.02]} />
                <meshStandardMaterial
                  color={secondaryColor}
                  emissive={new Color(secondaryColor)}
                  emissiveIntensity={0.24}
                  opacity={opacityFor("satellites", 0.9)}
                  roughness={0.34}
                  transparent
                />
              </mesh>
              <mesh position={[0.32, 0, 0]}>
                <boxGeometry args={[0.42, 0.12, 0.02]} />
                <meshStandardMaterial
                  color={secondaryColor}
                  emissive={new Color(secondaryColor)}
                  emissiveIntensity={0.24}
                  opacity={opacityFor("satellites", 0.9)}
                  roughness={0.34}
                  transparent
                />
              </mesh>
            </group>
          ))}
          <SceneTag label="Satellites" position={[0.2, 2.85, 1.9]} />
        </group>
      ) : null}

      {isVisible("signals") ? (
        <>
          {satellitePositions.map((position, index) => (
            <Line
              key={`signal-${index}`}
              color={accentColor}
              lineWidth={isHighlighted("signals") ? 2.4 : 1.5}
              opacity={opacityFor("signals", 0.82)}
              points={[
                position,
                [
                  (position[0] + receiverPosition[0]) / 2,
                  (position[1] + receiverPosition[1]) / 2 + 0.5,
                  1.55,
                ],
                receiverPosition,
              ]}
              transparent
            />
          ))}
          <SceneTag label="Timed signals" position={[-0.9, 0.96, 1.78]} />
        </>
      ) : null}

      {isVisible("receiver") ? (
        <group position={receiverPosition}>
          <RoundedBox args={[0.82, 1.42, 0.16]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.5}
              color="#e2e8f2"
              emissive={new Color("#8fb5ff")}
              emissiveIntensity={isHighlighted("receiver") ? 0.26 : 0.06}
              metalness={0.22}
              opacity={opacityFor("receiver", 0.96)}
              roughness={0.24}
              transparent
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.09]}>
            <planeGeometry args={[0.58, 1.02]} />
            <meshBasicMaterial color="#0b1d38" opacity={opacityFor("receiver", 0.98)} transparent />
          </mesh>
          <mesh position={[0, 0.42, 0.1]}>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshBasicMaterial color={secondaryColor} opacity={opacityFor("receiver", 0.92)} transparent />
          </mesh>
          <SceneTag label="Receiver" position={[-1.95, -2.4, 1.18]} />
        </group>
      ) : null}

      {isVisible("ranges") ? (
        <>
          <mesh position={receiverPosition}>
            <sphereGeometry args={[1.08, 28, 28]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={opacityFor("ranges", 0.08)}
              transparent
              wireframe
            />
          </mesh>
          <mesh position={receiverPosition}>
            <sphereGeometry args={[1.48, 28, 28]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={opacityFor("ranges", 0.07)}
              transparent
              wireframe
            />
          </mesh>
          <mesh position={receiverPosition}>
            <sphereGeometry args={[1.88, 28, 28]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={opacityFor("ranges", 0.06)}
              transparent
              wireframe
            />
          </mesh>
          <Line
            color={accentColor}
            lineWidth={2}
            opacity={opacityFor("ranges", 0.78)}
            points={[receiverPosition, solverPosition]}
            transparent
          />
          <SceneTag label="Range shells" position={[-0.9, -0.66, 1.48]} />
        </>
      ) : null}

      {isVisible("clock") ? (
        <group position={[0.95, 1.52, 1.04]}>
          <mesh>
            <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
            <meshStandardMaterial
              color="#dce7ff"
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("clock") ? 0.34 : 0.1}
              metalness={0.3}
              opacity={opacityFor("clock", 0.94)}
              roughness={0.24}
              transparent
            />
          </mesh>
          <Line
            color={secondaryColor}
            lineWidth={1.2}
            opacity={opacityFor("clock", 0.92)}
            points={[
              [0, 0, 0.08],
              [0.12, 0.08, 0.08],
              [0, 0, 0.08],
              [-0.08, 0.16, 0.08],
            ]}
            transparent
          />
          <SceneTag label="Clock bias" position={[0.95, 2.18, 1.56]} />
        </group>
      ) : null}

      {isVisible("solver") ? (
        <group position={solverPosition}>
          <mesh>
            <icosahedronGeometry args={[0.52, 0]} />
            <meshPhysicalMaterial
              clearcoat={0.7}
              color={accentColor}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("solver") ? 0.72 : 0.24}
              metalness={0.12}
              opacity={opacityFor("solver", 0.94)}
              roughness={0.18}
              transparent
            />
          </mesh>
          <SceneTag label="Position solver" position={[1.08, -1.08, 1.72]} />
        </group>
      ) : null}

      {isVisible("map") ? (
        <group position={mapPosition}>
          <RoundedBox args={[1.72, 1.3, 0.12]} radius={0.12} smoothness={4}>
            <meshStandardMaterial
              color="#102033"
              emissive={new Color("#2f8d73")}
              emissiveIntensity={0.12}
              opacity={opacityFor("map", 0.95)}
              roughness={0.54}
              transparent
            />
          </RoundedBox>
          <Line
            color="#5dd6a6"
            lineWidth={1.2}
            opacity={opacityFor("map", 0.82)}
            points={[
              [-0.65, 0.22, 0.08],
              [-0.2, -0.08, 0.08],
              [0.12, 0.12, 0.08],
              [0.5, -0.16, 0.08],
            ]}
            transparent
          />
          <mesh position={[0.18, 0.14, 0.12]}>
            <coneGeometry args={[0.14, 0.36, 18]} />
            <meshBasicMaterial color="#ff6f61" opacity={opacityFor("map", 0.96)} transparent />
          </mesh>
          <mesh position={[0.18, 0.3, 0.12]}>
            <sphereGeometry args={[0.12, 18, 18]} />
            <meshBasicMaterial color="#ffd2c8" opacity={opacityFor("map", 0.96)} transparent />
          </mesh>
          <SceneTag
            label="Map fix"
            position={[4.58, 0.46, 1.36]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </group>
      ) : null}

      {isVisible("errors") ? (
        <group position={[2.95, -2.02, 0.78]}>
          <mesh position={[-0.36, 0.04, 0]}>
            <sphereGeometry args={[0.34, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("errors", 0.4)} transparent />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.44, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("errors", 0.48)} transparent />
          </mesh>
          <mesh position={[0.42, 0.04, 0]}>
            <sphereGeometry args={[0.32, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("errors", 0.4)} transparent />
          </mesh>
          <SceneTag label="Noise / blockage" position={[3.2, -1.18, 1.36]} />
        </group>
      ) : null}
    </>
  );
}

function SolarPanelScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const photonRef = useRef<Group>(null);
  const panelPosition = [-0.85, -0.22, 0.76] as const;

  useFrame((state) => {
    if (!photonRef.current || shouldReduceMotion) {
      return;
    }

    photonRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.06 + 0.04;
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.46;
  }

  const accentColor = theme?.accent ?? "#ffd26b";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      {isVisible("sunlight") ? (
        <group ref={photonRef} position={[-4.55, 1.95, 0.92]}>
          <mesh>
            <sphereGeometry args={[0.56, 28, 28]} />
            <meshBasicMaterial color="#ffd56c" opacity={opacityFor("sunlight", 0.96)} transparent />
          </mesh>
          {Array.from({ length: 8 }, (_, index) => (
            <mesh
              key={`sun-ray-${index}`}
              position={[
                Math.cos((index / 8) * Math.PI * 2) * 0.92,
                Math.sin((index / 8) * Math.PI * 2) * 0.92,
                0,
              ]}
              rotation={[0, 0, (index / 8) * Math.PI * 2]}
            >
              <boxGeometry args={[0.48, 0.08, 0.04]} />
              <meshBasicMaterial color="#ffd56c" opacity={opacityFor("sunlight", 0.78)} transparent />
            </mesh>
          ))}
          <SceneTag label="Sunlight" position={[-4.52, 3.0, 1.42]} />
        </group>
      ) : null}

      <group position={panelPosition} rotation={[-0.52, 0.34, -0.2]}>
        <RoundedBox args={[3.3, 1.92, 0.12]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            clearcoat={0.45}
            color="#15304a"
            emissive={new Color(secondaryColor)}
            emissiveIntensity={isHighlighted("silicon") ? 0.24 : 0.06}
            metalness={0.18}
            opacity={opacityFor("silicon", 0.96)}
            roughness={0.26}
            transparent
          />
        </RoundedBox>
        {Array.from({ length: 5 }, (_, index) => (
          <Line
            key={`panel-v-${index}`}
            color="#6fd6c0"
            lineWidth={0.7}
            opacity={opacityFor("silicon", 0.72)}
            points={[
              [-1.32 + index * 0.66, -0.82, 0.07],
              [-1.32 + index * 0.66, 0.82, 0.07],
            ]}
            transparent
          />
        ))}
        {Array.from({ length: 3 }, (_, index) => (
          <Line
            key={`panel-h-${index}`}
            color="#6fd6c0"
            lineWidth={0.7}
            opacity={opacityFor("silicon", 0.72)}
            points={[
              [-1.58, -0.52 + index * 0.52, 0.07],
              [1.58, -0.52 + index * 0.52, 0.07],
            ]}
            transparent
          />
        ))}
      </group>

      {isVisible("silicon") ? (
        <SceneTag label="Solar cell" position={[-0.42, -1.88, 1.36]} />
      ) : null}

      {isVisible("sunlight") ? (
        <>
          <Line
            color="#ffd56c"
            lineWidth={1.5}
            opacity={opacityFor("sunlight", 0.72)}
            points={[
              [-3.95, 1.52, 1.02],
              [-2.9, 1.0, 0.98],
              [-1.72, 0.42, 0.92],
            ]}
            transparent
          />
          <Line
            color="#ffd56c"
            lineWidth={1.5}
            opacity={opacityFor("sunlight", 0.72)}
            points={[
              [-3.78, 1.88, 0.98],
              [-2.62, 1.34, 0.94],
              [-1.05, 0.88, 0.9],
            ]}
            transparent
          />
          <Line
            color="#ffd56c"
            lineWidth={1.5}
            opacity={opacityFor("sunlight", 0.72)}
            points={[
              [-3.7, 1.18, 0.98],
              [-2.42, 0.64, 0.92],
              [-0.32, 0.2, 0.88],
            ]}
            transparent
          />
        </>
      ) : null}

      {isVisible("field") ? (
        <>
          {Array.from({ length: 5 }, (_, index) => (
            <Line
              key={`field-${index}`}
              color={accentColor}
              lineWidth={1.1}
              opacity={opacityFor("field", 0.8)}
              points={[
                [-1.75 + index * 0.72, -0.92, 0.52],
                [-1.45 + index * 0.72, -1.42, 0.92],
              ]}
              transparent
            />
          ))}
          <SceneTag label="Built-in field" position={[-0.76, -2.62, 1.2]} />
        </>
      ) : null}

      {isVisible("dc") ? (
        <>
          <Line
            color={secondaryColor}
            lineWidth={2}
            opacity={opacityFor("dc", 0.82)}
            points={[
              [0.62, -1.1, 0.9],
              [1.46, -1.0, 0.92],
              [2.08, -0.84, 0.9],
            ]}
            transparent
          />
          <FlowBand
            color={secondaryColor}
            count={6}
            endX={2.14}
            speed={0.34}
            shouldReduceMotion={shouldReduceMotion}
            startX={0.72}
            y={-0.98}
            z={1.02}
          />
          <SceneTag label="DC current" position={[1.64, -1.82, 1.42]} />
        </>
      ) : null}

      {isVisible("inverter") ? (
        <group position={[2.95, -0.5, 0.76]}>
          <RoundedBox args={[1.32, 1.7, 0.64]} radius={0.16} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.4}
              color="#d8e1ed"
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("inverter") ? 0.28 : 0.08}
              metalness={0.22}
              opacity={opacityFor("inverter", 0.96)}
              roughness={0.28}
              transparent
            />
          </RoundedBox>
          <Line
            color={secondaryColor}
            lineWidth={1.1}
            opacity={opacityFor("inverter", 0.9)}
            points={[
              [-0.26, 0.28, 0.34],
              [0, 0.04, 0.34],
              [0.26, 0.28, 0.34],
            ]}
            transparent
          />
          <Line
            color={accentColor}
            lineWidth={1.1}
            opacity={opacityFor("inverter", 0.9)}
            points={[
              [-0.26, -0.26, 0.34],
              [0, -0.04, 0.34],
              [0.26, -0.26, 0.34],
            ]}
            transparent
          />
          <SceneTag label="Inverter" position={[2.95, 0.84, 1.36]} />
        </group>
      ) : null}

      {isVisible("grid") ? (
        <group position={[5.1, -0.4, 0.72]}>
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[1.24, 0.92, 0.92]} />
            <meshStandardMaterial
              color="#d9e4f2"
              emissive={new Color("#8fb5ff")}
              emissiveIntensity={0.08}
              opacity={opacityFor("grid", 0.96)}
              roughness={0.32}
              transparent
            />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <coneGeometry args={[0.82, 0.82, 4]} />
            <meshStandardMaterial
              color="#b8c6d9"
              opacity={opacityFor("grid", 0.96)}
              roughness={0.34}
              transparent
            />
          </mesh>
          <Line
            color="#9ed4ff"
            lineWidth={1.4}
            opacity={opacityFor("grid", 0.86)}
            points={[
              [3.65, -0.48, 0.96],
              [4.25, -0.36, 0.98],
              [4.82, -0.22, 0.96],
            ]}
            transparent
          />
          <SceneTag
            label="Home / grid"
            position={[5.1, 1.08, 1.4]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </group>
      ) : null}

      {isVisible("limits") ? (
        <group position={[0.7, 1.35, 1.02]}>
          <mesh position={[-0.48, 0, 0]}>
            <sphereGeometry args={[0.34, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("limits", 0.28)} transparent />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <sphereGeometry args={[0.48, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("limits", 0.34)} transparent />
          </mesh>
          <mesh position={[0.54, 0, 0]}>
            <sphereGeometry args={[0.32, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("limits", 0.28)} transparent />
          </mesh>
          <mesh position={[-1.2, -1.18, -0.04]} rotation={[-0.52, 0.34, -0.2]}>
            <planeGeometry args={[2.8, 1.6]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("limits", 0.12)} transparent />
          </mesh>
          <SceneTag label="Shade / heat losses" position={[0.82, 2.18, 1.48]} />
        </group>
      ) : null}
    </>
  );
}

function TransistorScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const currentRef = useRef<Group>(null);

  useFrame((state) => {
    if (!currentRef.current || shouldReduceMotion) {
      return;
    }

    currentRef.current.position.z = 0.04 + Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.46;
  }

  const accentColor = theme?.accent ?? "#8fb5ff";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      <RoundedBox args={[8.2, 3.3, 0.42]} position={[0.15, -0.76, 0.16]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#131c2f" metalness={0.12} roughness={0.72} />
      </RoundedBox>

      {isVisible("source") ? (
        <group position={[-2.95, -0.16, 0.76]}>
          <RoundedBox args={[1.38, 1.18, 0.58]} radius={0.12} smoothness={4}>
            <meshStandardMaterial
              color="#dce5f3"
              emissive={new Color("#b8c6de")}
              emissiveIntensity={isHighlighted("source") ? 0.18 : 0.04}
              metalness={0.28}
              opacity={opacityFor("source", 0.96)}
              roughness={0.24}
              transparent
            />
          </RoundedBox>
          <SceneTag label="Source" position={[-2.95, -1.48, 1.3]} />
        </group>
      ) : null}

      {isVisible("drain") ? (
        <group position={[2.95, -0.16, 0.76]}>
          <RoundedBox args={[1.38, 1.18, 0.58]} radius={0.12} smoothness={4}>
            <meshStandardMaterial
              color="#dce5f3"
              emissive={new Color("#b8c6de")}
              emissiveIntensity={isHighlighted("drain") ? 0.18 : 0.04}
              metalness={0.28}
              opacity={opacityFor("drain", 0.96)}
              roughness={0.24}
              transparent
            />
          </RoundedBox>
          <SceneTag label="Drain" position={[2.95, -1.48, 1.3]} />
        </group>
      ) : null}

      {isVisible("channel") ? (
        <group position={[0, -0.18, 0.82]}>
          <RoundedBox args={[3.9, 0.34, 0.22]} radius={0.08} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.34}
              color={isHighlighted("channel") ? accentColor : "#20324c"}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("channel") ? 0.56 : 0.08}
              metalness={0.1}
              opacity={opacityFor("channel", 0.92)}
              roughness={0.22}
              transparent
            />
          </RoundedBox>
          <SceneTag
            label="Channel"
            position={[0, -1.04, 1.28]}
            secondary={currentStage.id === "off" ? "blocked path" : undefined}
          />
        </group>
      ) : null}

      {isVisible("gate") ? (
        <group position={[0, 1.15, 0.98]}>
          <RoundedBox args={[2.16, 0.38, 0.3]} radius={0.08} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.48}
              color={accentColor}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("gate") ? 0.5 : 0.14}
              metalness={0.22}
              opacity={opacityFor("gate", 0.92)}
              roughness={0.18}
              transparent
            />
          </RoundedBox>
          <Line
            color={accentColor}
            lineWidth={1.8}
            opacity={opacityFor("gate", 0.86)}
            points={[
              [0, 0.18, 0.18],
              [0, 0.68, 0.26],
              [0, 1.16, 0.32],
            ]}
            transparent
          />
          <SceneTag label="Gate" position={[0, 2.0, 1.48]} />
        </group>
      ) : null}

      {isVisible("field") ? (
        <>
          {Array.from({ length: 4 }, (_, index) => (
            <Line
              key={`field-line-${index}`}
              color={secondaryColor}
              lineWidth={1.1}
              opacity={opacityFor("field", 0.82)}
              points={[
                [-1.1 + index * 0.74, 0.88, 0.96],
                [-1.0 + index * 0.74, 0.18, 0.9],
              ]}
              transparent
            />
          ))}
          <SceneTag label="Electric field" position={[0, 0.44, 1.54]} />
        </>
      ) : null}

      {isVisible("current") ? (
        <group ref={currentRef}>
          <FlowBand
            color={secondaryColor}
            count={7}
            endX={2.3}
            speed={0.42}
            shouldReduceMotion={shouldReduceMotion}
            startX={-2.34}
            y={-0.18}
            z={1.14}
          />
          <SceneTag label="Current flow" position={[0.12, 0.68, 1.62]} />
        </group>
      ) : null}

      {isVisible("logic") ? (
        <group position={[5.0, 0.1, 0.82]}>
          <RoundedBox args={[1.58, 1.58, 0.44]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.3}
              color="#132744"
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("logic") ? 0.28 : 0.08}
              metalness={0.18}
              opacity={opacityFor("logic", 0.95)}
              roughness={0.32}
              transparent
            />
          </RoundedBox>
          {Array.from({ length: 4 }, (_, index) => (
            <mesh
              key={`logic-pin-top-${index}`}
              position={[-0.5 + index * 0.34, 0.96, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.34, 0.08]} />
              <meshStandardMaterial color="#dce7ff" opacity={opacityFor("logic", 0.9)} transparent />
            </mesh>
          ))}
          {Array.from({ length: 4 }, (_, index) => (
            <mesh
              key={`logic-pin-bottom-${index}`}
              position={[-0.5 + index * 0.34, -0.96, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.34, 0.08]} />
              <meshStandardMaterial color="#dce7ff" opacity={opacityFor("logic", 0.9)} transparent />
            </mesh>
          ))}
          <Line
            color={accentColor}
            lineWidth={1.5}
            opacity={opacityFor("logic", 0.82)}
            points={[
              [3.56, -0.08, 1.02],
              [4.24, 0.02, 1.02],
              [4.76, 0.04, 1.02],
            ]}
            transparent
          />
          <SceneTag
            label="Digital logic"
            position={[5.02, 1.5, 1.46]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </group>
      ) : null}
    </>
  );
}

function WebPageScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const browserPulseRef = useRef<Group>(null);

  useFrame((state) => {
    if (!browserPulseRef.current || shouldReduceMotion) {
      return;
    }

    browserPulseRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.46;
  }

  const accentColor = theme?.accent ?? "#8fb5ff";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      {isVisible("browser") ? (
        <group ref={browserPulseRef} position={[-4.4, -0.32, 0.82]}>
          <RoundedBox args={[1.94, 1.38, 0.22]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.44}
              color="#dfe7f2"
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("browser") ? 0.2 : 0.04}
              metalness={0.18}
              opacity={opacityFor("browser", 0.96)}
              roughness={0.22}
              transparent
            />
          </RoundedBox>
          <mesh position={[0, 0.04, 0.12]}>
            <planeGeometry args={[1.58, 1.04]} />
            <meshBasicMaterial color="#0b1a32" opacity={opacityFor("browser", 0.98)} transparent />
          </mesh>
          <mesh position={[0, -0.98, 0]}>
            <boxGeometry args={[0.28, 0.44, 0.12]} />
            <meshStandardMaterial color="#ccd7e8" opacity={opacityFor("browser", 0.92)} transparent />
          </mesh>
          <mesh position={[0, -1.22, 0]}>
            <boxGeometry args={[0.92, 0.08, 0.24]} />
            <meshStandardMaterial color="#ccd7e8" opacity={opacityFor("browser", 0.92)} transparent />
          </mesh>
          <SceneTag label="Browser" position={[-4.42, -1.92, 1.46]} />
        </group>
      ) : null}

      {isVisible("cache") ? (
        <group position={[-4.65, 1.56, 0.76]}>
          {Array.from({ length: 3 }, (_, index) => (
            <mesh key={`cache-${index}`} position={[0, index * 0.18, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.12, 28]} />
              <meshPhysicalMaterial
                color={secondaryColor}
                emissive={new Color(secondaryColor)}
                emissiveIntensity={isHighlighted("cache") ? 0.34 : 0.1}
                opacity={opacityFor("cache", 0.88)}
                roughness={0.24}
                transparent
              />
            </mesh>
          ))}
          <SceneTag label="Cache" position={[-4.65, 2.4, 1.26]} />
        </group>
      ) : null}

      {isVisible("dns") ? (
        <group position={[-1.8, 1.72, 0.94]}>
          <mesh>
            <octahedronGeometry args={[0.62, 0]} />
            <meshPhysicalMaterial
              clearcoat={0.42}
              color={accentColor}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("dns") ? 0.44 : 0.12}
              metalness={0.12}
              opacity={opacityFor("dns", 0.92)}
              roughness={0.18}
              transparent
            />
          </mesh>
          <SceneTag label="DNS lookup" position={[-1.82, 2.62, 1.5]} />
        </group>
      ) : null}

      {isVisible("edge") ? (
        <group position={[-0.4, -0.18, 0.78]}>
          {Array.from({ length: 3 }, (_, index) => (
            <RoundedBox
              key={`edge-rack-${index}`}
              args={[0.54, 1.32, 0.42]}
              position={[-0.7 + index * 0.7, 0, 0]}
              radius={0.08}
              smoothness={4}
            >
              <meshPhysicalMaterial
                clearcoat={0.26}
                color="#12213b"
                emissive={new Color(secondaryColor)}
                emissiveIntensity={isHighlighted("edge") ? 0.2 : 0.06}
                metalness={0.18}
                opacity={opacityFor("edge", 0.94)}
                roughness={0.34}
                transparent
              />
            </RoundedBox>
          ))}
          <SceneTag label="Edge / CDN" position={[-0.4, -1.62, 1.36]} />
        </group>
      ) : null}

      {isVisible("origin") ? (
        <group position={[2.1, 0.14, 0.86]}>
          {Array.from({ length: 2 }, (_, index) => (
            <RoundedBox
              key={`origin-rack-${index}`}
              args={[0.7, 1.76, 0.54]}
              position={[-0.46 + index * 0.92, 0, 0]}
              radius={0.08}
              smoothness={4}
            >
              <meshPhysicalMaterial
                clearcoat={0.26}
                color="#101b30"
                emissive={new Color(accentColor)}
                emissiveIntensity={isHighlighted("origin") ? 0.26 : 0.08}
                metalness={0.18}
                opacity={opacityFor("origin", 0.95)}
                roughness={0.3}
                transparent
              />
            </RoundedBox>
          ))}
          <SceneTag label="Origin server" position={[2.08, -1.82, 1.42]} />
        </group>
      ) : null}

      {isVisible("response") ? (
        <group position={[3.95, 1.64, 1.02]}>
          <mesh rotation={[0.12, -0.12, 0.06]}>
            <planeGeometry args={[1.22, 1.42]} />
            <meshBasicMaterial color="#f3f6fc" opacity={opacityFor("response", 0.92)} transparent />
          </mesh>
          <mesh position={[0.2, -0.08, -0.04]} rotation={[0.12, -0.12, 0.06]}>
            <planeGeometry args={[1.22, 1.42]} />
            <meshBasicMaterial color="#cfdaed" opacity={opacityFor("response", 0.42)} transparent />
          </mesh>
          <Line
            color={accentColor}
            lineWidth={1}
            opacity={opacityFor("response", 0.82)}
            points={[
              [-0.38, 0.32, 0.04],
              [0.28, 0.32, 0.04],
              [-0.38, 0.04, 0.04],
              [0.18, 0.04, 0.04],
            ]}
            transparent
          />
          <SceneTag
            label="Response"
            position={[3.95, 2.7, 1.54]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </group>
      ) : null}

      {isVisible("renderer") ? (
        <group position={[3.45, -1.08, 0.88]}>
          <mesh>
            <cylinderGeometry args={[0.64, 0.64, 0.22, 28]} />
            <meshPhysicalMaterial
              color="#e1e9f4"
              emissive={new Color(secondaryColor)}
              emissiveIntensity={isHighlighted("renderer") ? 0.24 : 0.06}
              metalness={0.2}
              opacity={opacityFor("renderer", 0.94)}
              roughness={0.24}
              transparent
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.24, 0.24, 0.3, 6]} />
            <meshStandardMaterial color="#0d1d36" opacity={opacityFor("renderer", 0.98)} transparent />
          </mesh>
          <SceneTag label="Render engine" position={[3.42, -2.0, 1.42]} />
        </group>
      ) : null}

      {isVisible("page") ? (
        <group position={[5.5, -0.18, 0.82]}>
          <RoundedBox args={[1.42, 2.08, 0.16]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.4}
              color="#f6f8fd"
              emissive={new Color("#7dc9ff")}
              emissiveIntensity={isHighlighted("page") ? 0.24 : 0.06}
              metalness={0.12}
              opacity={opacityFor("page", 0.96)}
              roughness={0.18}
              transparent
            />
          </RoundedBox>
          <mesh position={[0, 0.42, 0.09]}>
            <planeGeometry args={[1.04, 0.48]} />
            <meshBasicMaterial color="#8fb5ff" opacity={opacityFor("page", 0.72)} transparent />
          </mesh>
          <mesh position={[0, -0.22, 0.09]}>
            <planeGeometry args={[1.04, 0.74]} />
            <meshBasicMaterial color="#d4deee" opacity={opacityFor("page", 0.86)} transparent />
          </mesh>
          <SceneTag label="Visible page" position={[5.5, 1.54, 1.44]} />
        </group>
      ) : null}

      {isVisible("latency") ? (
        <group position={[1.75, -2.04, 0.7]}>
          <Line
            color="#ff8f72"
            lineWidth={2.6}
            opacity={opacityFor("latency", 0.44)}
            points={[
              [-4.5, 0, 0],
              [-2.4, 0.22, 0.16],
              [0.1, -0.18, 0.12],
              [2.8, 0.12, 0.1],
            ]}
            transparent
          />
          <Line
            color="#ff8f72"
            lineWidth={1.6}
            opacity={opacityFor("latency", 0.52)}
            points={[
              [-4.5, 0.22, 0.1],
              [-1.8, 0.46, 0.16],
              [0.5, 0.08, 0.12],
              [2.8, 0.36, 0.1],
            ]}
            transparent
          />
          <SceneTag label="Latency" position={[1.78, -1.34, 1.28]} />
        </group>
      ) : null}

      {isVisible("browser") && isVisible("dns") ? (
        <Line
          color={accentColor}
          lineWidth={1.6}
          opacity={Math.min(opacityFor("browser", 0.44), opacityFor("dns", 0.82))}
          points={[
            [-3.5, 0.28, 1.04],
            [-2.8, 1.0, 1.14],
            [-2.1, 1.5, 1.08],
          ]}
          transparent
        />
      ) : null}

      {isVisible("edge") ? (
        <FlowBand
          color={secondaryColor}
          count={6}
          endX={1.02}
          speed={0.3}
          shouldReduceMotion={shouldReduceMotion}
          startX={-3.2}
          y={-0.22}
          z={1.08}
        />
      ) : null}

      {isVisible("origin") ? (
        <FlowBand
          color={accentColor}
          count={5}
          endX={2.7}
          speed={0.36}
          shouldReduceMotion={shouldReduceMotion}
          startX={0.6}
          y={0.36}
          z={1.16}
        />
      ) : null}
    </>
  );
}

function AiSystemScene({
  currentStage,
  highlightedLayerIds,
  visibleLayerIds,
  shouldReduceMotion,
  theme,
}: SceneVariantProps) {
  const loopRef = useRef<Group>(null);
  const tokenRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (loopRef.current && !shouldReduceMotion) {
      loopRef.current.rotation.z += delta * 0.45;
    }

    if (tokenRef.current && !shouldReduceMotion) {
      tokenRef.current.rotation.y += delta * 0.3;
    }
  });

  function isVisible(id: string) {
    return visibleLayerIds.has(id);
  }

  function isHighlighted(id: string) {
    return highlightedLayerIds.has(id);
  }

  function opacityFor(id: string, base = 0.88) {
    if (!isVisible(id)) {
      return 0;
    }

    return isHighlighted(id) ? base : base * 0.46;
  }

  const accentColor = theme?.accent ?? "#8fb5ff";
  const secondaryColor = theme?.accentSecondary ?? "#5ee2c8";

  return (
    <>
      {isVisible("training-data") ? (
        <group position={[-4.18, 1.44, 0.8]}>
          {Array.from({ length: 4 }, (_, index) => (
            <mesh
              key={`dataset-${index}`}
              position={[0, index * 0.12, 0]}
              rotation={[0, 0, -0.08 + index * 0.04]}
            >
              <boxGeometry args={[1.48, 0.18, 0.92]} />
              <meshPhysicalMaterial
                color={secondaryColor}
                emissive={new Color(secondaryColor)}
                emissiveIntensity={isHighlighted("training-data") ? 0.32 : 0.08}
                opacity={opacityFor("training-data", 0.88)}
                roughness={0.34}
                transparent
              />
            </mesh>
          ))}
          <SceneTag label="Training data" position={[-4.2, 2.42, 1.36]} />
        </group>
      ) : null}

      {isVisible("live-input") ? (
        <group position={[-4.18, -1.1, 0.8]}>
          <RoundedBox args={[1.8, 1.08, 0.2]} radius={0.1} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.34}
              color="#dde6f3"
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("live-input") ? 0.22 : 0.06}
              metalness={0.12}
              opacity={opacityFor("live-input", 0.96)}
              roughness={0.18}
              transparent
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[1.46, 0.78]} />
            <meshBasicMaterial color="#0d1b32" opacity={opacityFor("live-input", 0.96)} transparent />
          </mesh>
          <Line
            color={secondaryColor}
            lineWidth={1}
            opacity={opacityFor("live-input", 0.86)}
            points={[
              [-0.5, 0.14, 0.12],
              [0.22, 0.14, 0.12],
              [-0.5, -0.06, 0.12],
              [0.4, -0.06, 0.12],
            ]}
            transparent
          />
          <SceneTag label="Live input" position={[-4.18, -2.02, 1.36]} />
        </group>
      ) : null}

      {isVisible("tokenizer") ? (
        <group ref={tokenRef} position={[-1.72, -0.96, 0.92]}>
          {Array.from({ length: 4 }, (_, index) => (
            <RoundedBox
              key={`token-${index}`}
              args={[0.42, 0.42, 0.42]}
              position={[-0.72 + index * 0.5, 0, 0]}
              radius={0.08}
              smoothness={4}
            >
              <meshPhysicalMaterial
                color={accentColor}
                emissive={new Color(accentColor)}
                emissiveIntensity={isHighlighted("tokenizer") ? 0.4 : 0.12}
                opacity={opacityFor("tokenizer", 0.9)}
                roughness={0.18}
                transparent
              />
            </RoundedBox>
          ))}
          <SceneTag label="Tokenizer" position={[-1.72, -1.82, 1.46]} />
        </group>
      ) : null}

      {isVisible("training-loop") ? (
        <group ref={loopRef} position={[-0.5, 1.2, 0.96]}>
          <mesh>
            <torusGeometry args={[0.84, 0.1, 18, 48]} />
            <meshPhysicalMaterial
              color={accentColor}
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("training-loop") ? 0.42 : 0.14}
              opacity={opacityFor("training-loop", 0.92)}
              roughness={0.18}
              transparent
            />
          </mesh>
          {Array.from({ length: 3 }, (_, index) => (
            <mesh
              key={`loop-node-${index}`}
              position={[
                Math.cos((index / 3) * Math.PI * 2) * 0.84,
                Math.sin((index / 3) * Math.PI * 2) * 0.84,
                0,
              ]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#ffd08a" opacity={opacityFor("training-loop", 0.9)} transparent />
            </mesh>
          ))}
          <SceneTag label="Training loop" position={[-0.52, 2.28, 1.46]} />
        </group>
      ) : null}

      {isVisible("model") ? (
        <group position={[1.24, 0.08, 1.02]}>
          <RoundedBox args={[1.84, 1.84, 1.2]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.32}
              color="#122643"
              emissive={new Color(accentColor)}
              emissiveIntensity={isHighlighted("model") ? 0.3 : 0.08}
              metalness={0.16}
              opacity={opacityFor("model", 0.96)}
              roughness={0.32}
              transparent
            />
          </RoundedBox>
          {Array.from({ length: 3 }, (_, index) => (
            <mesh key={`model-layer-${index}`} position={[0, -0.42 + index * 0.42, 0.62]}>
              <planeGeometry args={[1.36, 0.18]} />
              <meshBasicMaterial color={secondaryColor} opacity={opacityFor("model", 0.42)} transparent />
            </mesh>
          ))}
          <SceneTag label="Model" position={[1.22, -1.38, 1.68]} />
        </group>
      ) : null}

      {isVisible("inference") ? (
        <>
          <FlowBand
            color={secondaryColor}
            count={6}
            endX={3.38}
            speed={0.34}
            shouldReduceMotion={shouldReduceMotion}
            startX={-3.25}
            y={-0.14}
            z={1.22}
          />
          <SceneTag label="Inference" position={[3.05, -1.02, 1.58]} />
        </>
      ) : null}

      {isVisible("output") ? (
        <group position={[4.76, 0.18, 0.92]}>
          <RoundedBox args={[1.62, 1.08, 0.22]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              clearcoat={0.3}
              color="#eef3fb"
              emissive={new Color("#9dd0ff")}
              emissiveIntensity={isHighlighted("output") ? 0.22 : 0.06}
              metalness={0.08}
              opacity={opacityFor("output", 0.96)}
              roughness={0.18}
              transparent
            />
          </RoundedBox>
          <mesh position={[0.48, -0.44, 0]}>
            <coneGeometry args={[0.18, 0.34, 3]} />
            <meshStandardMaterial color="#eef3fb" opacity={opacityFor("output", 0.96)} transparent />
          </mesh>
          <SceneTag
            label="Output"
            position={[4.76, 1.18, 1.44]}
            secondary={currentStage.statePatch.outputLabel}
          />
        </group>
      ) : null}

      {isVisible("risk") ? (
        <group position={[3.82, -1.72, 0.82]}>
          <mesh position={[-0.44, 0, 0]}>
            <sphereGeometry args={[0.34, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("risk", 0.32)} transparent />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.48, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("risk", 0.4)} transparent />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <sphereGeometry args={[0.3, 18, 18]} />
            <meshBasicMaterial color="#ff8f72" opacity={opacityFor("risk", 0.3)} transparent />
          </mesh>
          <SceneTag label="Limits / risk" position={[3.9, -0.84, 1.36]} />
        </group>
      ) : null}
    </>
  );
}

function GenericPipelineScene({
  explainer,
  currentStage,
  visibleLayerIds,
  highlightedLayerIds,
  theme,
}: {
  explainer: PipelineExplainer;
  currentStage: Stage;
  visibleLayerIds: Set<string>;
  highlightedLayerIds: Set<string>;
  theme?: ConceptTheme;
}) {
  return (
    <>
      <ConnectionBeams
        explainer={explainer}
        highlightedLayerIds={highlightedLayerIds}
        theme={theme}
        visibleLayerIds={visibleLayerIds}
      />

      {explainer.layers.map((layer) => {
        if (!visibleLayerIds.has(layer.id)) {
          return null;
        }

        const isHighlighted = highlightedLayerIds.has(layer.id);
        const isOutput = layer.kind === "output";

        return (
          <LayerNode
            key={layer.id}
            isDimmed={!isHighlighted}
            isHighlighted={isHighlighted}
            layer={layer}
            outputLabel={isOutput ? currentStage.statePatch.outputLabel : undefined}
            theme={theme}
          />
        );
      })}
    </>
  );
}

export function PipelineSceneCanvas({
  explainer,
  currentStage,
  visibleLayerIds,
  highlightedLayerIds,
  stageHotspots,
  activeHotspotId,
  onSelectHotspot,
  shouldReduceMotion,
  theme,
}: PipelineSceneCanvasProps) {
  return (
    <Canvas
      camera={{ fov: 32, position: [0, 1.3, 12] }}
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
    >
      <color args={["#050713"]} attach="background" />
      <fog args={["#050713", 10, 22]} attach="fog" />

      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.2} position={[5, 8, 7]} />
      <directionalLight color={theme?.accent ?? "#8fb5ff"} intensity={0.75} position={[-8, 2, 6]} />
      <pointLight color={theme?.accentSecondary ?? "#51e0cb"} intensity={1.3} position={[-3, -1, 5]} />
      <pointLight color="#ffb48e" intensity={0.5} position={[4, 2, 4]} />

      <SceneRig shouldReduceMotion={shouldReduceMotion}>
        <Sparkles
          count={50}
          opacity={0.35}
          scale={[14, 9, 8]}
          size={2.2}
          speed={shouldReduceMotion ? 0 : 0.25}
          color={theme?.accent ?? "#8fb5ff"}
        />

        <mesh position={[0, -2.95, -0.2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16, 10]} />
          <meshStandardMaterial color="#09101f" metalness={0.08} roughness={0.96} />
        </mesh>

        <RoundedBox args={[11.4, 6.9, 0.32]} position={[0, 0, -0.42]} radius={0.28} smoothness={5}>
          <meshPhysicalMaterial
            clearcoat={0.4}
            clearcoatRoughness={0.55}
            color="#10192f"
            emissive={new Color(theme?.accent ?? "#8fb5ff")}
            emissiveIntensity={0.06}
            metalness={0.12}
            opacity={0.82}
            roughness={0.58}
            transparent
          />
        </RoundedBox>

        <RoundedBox args={[10.2, 5.9, 0.12]} position={[0, 0, -0.05]} radius={0.24} smoothness={5}>
          <meshStandardMaterial color="#13203b" metalness={0.05} opacity={0.38} roughness={0.72} transparent />
        </RoundedBox>

        {explainer.sceneVariant === "jet-engine" ? (
          <JetEngineScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : explainer.sceneVariant === "gps" ? (
          <GpsScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : explainer.sceneVariant === "solar-panel" ? (
          <SolarPanelScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : explainer.sceneVariant === "transistor" ? (
          <TransistorScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : explainer.sceneVariant === "web-page" ? (
          <WebPageScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : explainer.sceneVariant === "ai-system" ? (
          <AiSystemScene
            currentStage={currentStage}
            highlightedLayerIds={highlightedLayerIds}
            shouldReduceMotion={shouldReduceMotion}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        ) : (
          <GenericPipelineScene
            currentStage={currentStage}
            explainer={explainer}
            highlightedLayerIds={highlightedLayerIds}
            theme={theme}
            visibleLayerIds={visibleLayerIds}
          />
        )}

        {stageHotspots.map((hotspot) => (
          <HotspotBeacon
            key={hotspot.id}
            hotspot={hotspot}
            isActive={hotspot.id === activeHotspotId}
            onSelect={onSelectHotspot}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}

        <ContactShadows
          blur={2.8}
          color={theme?.glow ?? "rgba(143,181,255,0.2)"}
          far={8}
          opacity={0.5}
          position={[0, -2.86, 0]}
          resolution={1024}
          scale={12}
        />
      </SceneRig>
    </Canvas>
  );
}
