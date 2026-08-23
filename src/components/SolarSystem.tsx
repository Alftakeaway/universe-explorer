"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { planets, PlanetData } from "@/data/planets";
import { exoplanets, ExoplanetData } from "@/data/exoplanets";
import { deepSpaceObjects, DeepSpaceObject } from "@/data/deepSpace";
import Starfield from "./Starfield";
import PlanetRings from "./PlanetRings";
import AsteroidBelt from "./AsteroidBelt";
import AtmosphericGlow from "./AtmosphericGlow";
import LensFlare from "./LensFlare";
import DeepSpaceScene from "./DeepSpaceScene";
import ExoplanetSystems from "./ExoplanetSystems";
import ZoomLevelManager, { ZoomLevel } from "./ZoomLevelManager";
import { createPlanetTexture } from "@/utils/planetTextures";

const SCALE_FACTOR = 10;

function Sun({ showLensFlare }: { showLensFlare: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const sunTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#ffdd44");
    grad.addColorStop(0.3, "#ffaa22");
    grad.addColorStop(0.5, "#ff8800");
    grad.addColorStop(0.7, "#ffaa22");
    grad.addColorStop(1, "#ffdd44");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const r = 5 + Math.random() * 20;
      const spotGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      spotGrad.addColorStop(0, "rgba(255, 100, 0, 0.4)");
      spotGrad.addColorStop(1, "rgba(255, 100, 0, 0)");
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0004;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      <pointLight color={0xfff5e0} intensity={2.5} distance={1000} decay={0.1} />
      <ambientLight intensity={0.08} />
      {showLensFlare && <LensFlare position={[0, 0, 0]} color={0xfff8e0} size={5} />}
    </group>
  );
}

interface PlanetProps {
  data: PlanetData;
  onClick: (data: PlanetData) => void;
  onHover: (data: PlanetData | null) => void;
  isSelected: boolean;
  timeScale: number;
  showRings: boolean;
  showAtmosphere: boolean;
  reduceMotion: boolean;
}

function Planet({
  data,
  onClick,
  onHover,
  isSelected,
  timeScale,
  showRings,
  showAtmosphere,
  reduceMotion,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const planetTexture = useMemo(
    () => createPlanetTexture(data.color, data.name),
    [data.color, data.name]
  );

  const orbitalSpeed = useMemo(
    () => (2 * Math.PI) / (data.period * 86400),
    [data.period]
  );

  const displayRadius = useMemo(() => {
    if (data.isDwarfPlanet) return Math.max(data.radius * 0.15, 0.12);
    return Math.max(data.radius * 0.3, 0.2);
  }, [data.radius, data.isDwarfPlanet]);

  const orbitRadius = useMemo(() => {
    if (data.isDwarfPlanet) return Math.log10(data.distance + 1) * SCALE_FACTOR + 12;
    return Math.log10(data.distance + 1) * SCALE_FACTOR + 8;
  }, [data.distance, data.isDwarfPlanet]);

  useFrame((_, delta) => {
    if (orbitRef.current && !reduceMotion) {
      orbitRef.current.rotation.y += orbitalSpeed * delta * timeScale * 10000;
    }
  });

  const orbitPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = data.isDwarfPlanet ? 96 : 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius]);
    }
    return pts;
  }, [orbitRadius, data.isDwarfPlanet]);

  const ringInnerRadius = displayRadius * 1.4;
  const ringOuterRadius = displayRadius * 2.5;

  return (
    <group ref={orbitRef}>
      <Line
        points={orbitPoints}
        color={data.isDwarfPlanet ? "#666666" : "white"}
        opacity={isSelected ? 0.6 : data.isDwarfPlanet ? 0.06 : 0.15}
        transparent
        lineWidth={data.isDwarfPlanet ? 0.3 : 0.5}
      />

      <group position={[orbitRadius, 0, 0]}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick(data);
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(data);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);
            onHover(null);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[displayRadius, 32, 32]} />
          <meshStandardMaterial
            map={planetTexture}
            emissive={hovered ? 0x222244 : 0x000000}
            emissiveIntensity={hovered ? 0.5 : 0}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {data.hasRings && showRings && (
          <PlanetRings
            innerRadius={ringInnerRadius}
            outerRadius={ringOuterRadius}
            color={data.name === "Saturn" ? 0xd4c4a8 : 0x8899aa}
            opacity={data.name === "Saturn" ? 0.5 : 0.3}
            tilt={data.name === "Uranus" ? 1.7 : 0.2}
          />
        )}

        {data.hasAtmosphere && showAtmosphere && (
          <AtmosphericGlow
            radius={displayRadius}
            color={data.atmosphereColor || 0x4488ff}
            intensity={data.atmosphereIntensity || 1.5}
          />
        )}
      </group>

      {(hovered || isSelected) && (
        <Html
          position={[orbitRadius, displayRadius + 1, 0]}
          center
          distanceFactor={15}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              isSelected
                ? "bg-black/90 border border-cyan-400 shadow-lg shadow-cyan-500/20"
                : "bg-black/80 border border-cyan-500/50"
            }`}
          >
            <p className="text-cyan-300 text-xs font-bold">{data.name}</p>
            <p className="text-gray-400 text-[10px]">{data.distanceFromSun} dal Sole</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraController({
  selectedPlanet,
  selectedExoplanet,
  selectedDeepSpace,
  zoomLevel,
}: {
  selectedPlanet: PlanetData | null;
  selectedExoplanet: ExoplanetData | null;
  selectedDeepSpace: DeepSpaceObject | null;
  zoomLevel: ZoomLevel;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 40, 80));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedPlanet) {
      const orbitRadius = Math.log10(selectedPlanet.distance + 1) * SCALE_FACTOR + 8;
      const viewDist = Math.max(selectedPlanet.radius * 2, 4);
      targetPos.current.set(orbitRadius + viewDist, viewDist * 0.5, viewDist);
      targetLookAt.current.set(orbitRadius, 0, 0);
    } else if (selectedExoplanet) {
      const orbitRadius = selectedExoplanet.displayDistance * 0.4;
      const viewDist = Math.max(selectedExoplanet.displayRadius * 3, 3);
      targetPos.current.set(
        -30 + orbitRadius + viewDist,
        8 + viewDist * 0.5,
        20 + viewDist
      );
      targetLookAt.current.set(-30 + orbitRadius, 8, 20);
    } else if (selectedDeepSpace) {
      const pos = new THREE.Vector3(...selectedDeepSpace.position);
      const viewDist = selectedDeepSpace.size * 4;
      targetPos.current.set(pos.x + viewDist, pos.y + viewDist * 0.5, pos.z + viewDist);
      targetLookAt.current.copy(pos);
    } else {
      const config = {
        solar: new THREE.Vector3(0, 40, 80),
        exoplanet: new THREE.Vector3(0, 50, 100),
        galactic: new THREE.Vector3(0, 80, 160),
        cosmic: new THREE.Vector3(0, 120, 200),
      };
      targetPos.current.copy(config[zoomLevel]);
      targetLookAt.current.set(0, 0, 0);
    }
  }, [selectedPlanet, selectedExoplanet, selectedDeepSpace, zoomLevel]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.02);
  });

  return null;
}

function Scene({
  selectedPlanet,
  onSelectPlanet,
  onHoverPlanet,
  selectedExoplanet,
  onSelectExoplanet,
  selectedDeepSpace,
  onSelectDeepSpace,
  timeScale,
  showRings,
  showAtmosphere,
  showAsteroids,
  zoomLevel,
  reduceMotion,
}: {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (p: PlanetData | null) => void;
  onHoverPlanet: (p: PlanetData | null) => void;
  selectedExoplanet: ExoplanetData | null;
  onSelectExoplanet: (p: ExoplanetData | null) => void;
  selectedDeepSpace: DeepSpaceObject | null;
  onSelectDeepSpace: (o: DeepSpaceObject | null) => void;
  timeScale: number;
  showRings: boolean;
  showAtmosphere: boolean;
  showAsteroids: boolean;
  zoomLevel: ZoomLevel;
  reduceMotion: boolean;
}) {
  const showSolarSystem = zoomLevel === "solar";
  const showExoplanets = zoomLevel === "exoplanet";
  const showDeepSpace = zoomLevel === "galactic" || zoomLevel === "cosmic";

  return (
    <>
      <CameraController
        selectedPlanet={selectedPlanet}
        selectedExoplanet={selectedExoplanet}
        selectedDeepSpace={selectedDeepSpace}
        zoomLevel={zoomLevel}
      />
      <Starfield count={zoomLevel === "cosmic" ? 12000 : 8000} />
      <Sun showLensFlare={zoomLevel === "solar"} />

      {showSolarSystem && (
        <>
          {planets.map((planet) => (
            <Planet
              key={planet.name}
              data={planet}
              onClick={(p) => onSelectPlanet(selectedPlanet?.name === p.name ? null : p)}
              onHover={onHoverPlanet}
              isSelected={selectedPlanet?.name === planet.name}
              timeScale={timeScale}
              showRings={showRings}
              showAtmosphere={showAtmosphere}
              reduceMotion={reduceMotion}
            />
          ))}
          {showAsteroids && <AsteroidBelt innerRadius={18} outerRadius={24} count={2000} />}
        </>
      )}

      {showExoplanets && (
        <ExoplanetSystems onSelect={onSelectExoplanet} selectedPlanet={selectedExoplanet} />
      )}

      {showDeepSpace && (
        <DeepSpaceScene
          objects={deepSpaceObjects}
          onSelect={onSelectDeepSpace}
          selectedObject={selectedDeepSpace}
        />
      )}

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.8} />
      </EffectComposer>
    </>
  );
}

export default function SolarSystem({
  selectedPlanet,
  onSelectPlanet,
  onHoverPlanet,
  selectedExoplanet,
  onSelectExoplanet,
  selectedDeepSpace,
  onSelectDeepSpace,
  timeScale,
  showRings,
  showAtmosphere,
  showAsteroids,
  zoomLevel,
  onZoomLevelChange,
  reduceMotion,
}: {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (p: PlanetData | null) => void;
  onHoverPlanet: (p: PlanetData | null) => void;
  selectedExoplanet: ExoplanetData | null;
  onSelectExoplanet: (p: ExoplanetData | null) => void;
  selectedDeepSpace: DeepSpaceObject | null;
  onSelectDeepSpace: (o: DeepSpaceObject | null) => void;
  timeScale: number;
  showRings: boolean;
  showAtmosphere: boolean;
  showAsteroids: boolean;
  zoomLevel: ZoomLevel;
  onZoomLevelChange: (level: ZoomLevel) => void;
  reduceMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 40, 80], fov: 60, near: 0.1, far: 10000 }}
      style={{ height: "100vh", width: "100%" }}
      gl={{ antialias: true, alpha: false }}
      onPointerMissed={() => {
        onSelectPlanet(null);
        onSelectExoplanet(null);
        onSelectDeepSpace(null);
      }}
    >
      <color attach="background" args={["#000008"]} />
      <fog attach="fog" args={["#000008", 100, 400]} />
      <Scene
        selectedPlanet={selectedPlanet}
        onSelectPlanet={onSelectPlanet}
        onHoverPlanet={onHoverPlanet}
        selectedExoplanet={selectedExoplanet}
        onSelectExoplanet={onSelectExoplanet}
        selectedDeepSpace={selectedDeepSpace}
        onSelectDeepSpace={onSelectDeepSpace}
        timeScale={timeScale}
        showRings={showRings}
        showAtmosphere={showAtmosphere}
        showAsteroids={showAsteroids}
        zoomLevel={zoomLevel}
        reduceMotion={reduceMotion}
      />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={500}
        maxPolarAngle={Math.PI * 0.85}
        makeDefault
      />
      <ZoomLevelManager currentLevel={zoomLevel} onLevelChange={onZoomLevelChange} />
    </Canvas>
  );
}
