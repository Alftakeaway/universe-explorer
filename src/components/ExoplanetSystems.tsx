"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { ExoplanetData } from "@/data/exoplanets";

function ExoplanetMesh({
  planet,
  onClick,
  isSelected,
}: {
  planet: ExoplanetData;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const orbitRadius = planet.displayDistance * 0.4;
  const orbitalSpeed = (2 * Math.PI) / (planet.orbitalPeriodDays * 86400) * 50000;

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += orbitalSpeed * delta;
    }
  });

  const orbitPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius]);
    }
    return pts;
  }, [orbitRadius]);

  return (
    <group ref={orbitRef}>
      <Line
        points={orbitPoints}
        color={planet.habitableZone ? "#22aa44" : "#ffffff"}
        opacity={isSelected ? 0.6 : 0.12}
        transparent
        lineWidth={0.4}
      />

      {planet.habitableZone && (
        <Line
          points={orbitPoints.map((p) => [p[0], p[1] + 0.02, p[2]])}
          color="#22aa44"
          opacity={0.05}
          transparent
          lineWidth={2}
        />
      )}

      <mesh
        ref={meshRef}
        position={[orbitRadius, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[planet.displayRadius, 24, 24]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={hovered ? 0x222244 : 0x000000}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.8}
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html
          position={[orbitRadius, planet.displayRadius + 0.5, 0]}
          center
          distanceFactor={20}
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-black/80 border border-cyan-500/50 px-3 py-1.5 rounded-md whitespace-nowrap">
            <p className="text-cyan-300 text-xs font-bold">{planet.name}</p>
            <p className="text-gray-400 text-[10px]">
              {planet.distanceLightYears} anni luce • {planet.type}
            </p>
            {planet.habitableZone && (
              <p className="text-green-400 text-[10px]">Zona abitabile</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function Trappist1System({
  onSelect,
  selectedPlanet,
}: {
  onSelect: (p: ExoplanetData | null) => void;
  selectedPlanet: ExoplanetData | null;
}) {
  const trappist1Planets = useMemo(
    () => [
      {
        name: "TRAPPIST-1",
        star: "TRAPPIST-1",
        constellation: "Acquario",
        distanceLightYears: 40.7,
        radiusEarth: 0.12,
        massEarth: 0.089,
        orbitalPeriodDays: 0,
        temperatureK: 2566,
        type: "M-dwarf Star" as const,
        habitableZone: false,
        discoveryYear: 1999,
        description: "Una nana ultrafredda 9 volte meno massiccia di Giove.",
        color: 0xff6633,
        displayRadius: 0.8,
        displayDistance: 0,
      },
      {
        name: "TRAPPIST-1b",
        star: "TRAPPIST-1",
        constellation: "Acquario",
        distanceLightYears: 40.7,
        radiusEarth: 1.12,
        massEarth: 1.02,
        orbitalPeriodDays: 1.5,
        temperatureK: 400,
        type: "Terrestrial" as const,
        habitableZone: false,
        discoveryYear: 2016,
        description: "Il pianeta più interno, con un lato sempre rivolto verso la stella.",
        color: 0x886644,
        displayRadius: 0.35,
        displayDistance: 3,
      },
      {
        name: "TRAPPIST-1c",
        star: "TRAPPIST-1",
        constellation: "Acquario",
        distanceLightYears: 40.7,
        radiusEarth: 1.02,
        massEarth: 1.16,
        orbitalPeriodDays: 2.4,
        temperatureK: 342,
        type: "Terrestrial" as const,
        habitableZone: false,
        discoveryYear: 2016,
        description: "Potrebbe avere un'atmosfera spessa come Venere.",
        color: 0x997755,
        displayRadius: 0.38,
        displayDistance: 4.5,
      },
      {
        name: "TRAPPIST-1d",
        star: "TRAPPIST-1",
        constellation: "Acquario",
        distanceLightYears: 40.7,
        radiusEarth: 0.77,
        massEarth: 0.33,
        orbitalPeriodDays: 4.0,
        temperatureK: 288,
        type: "Terrestrial" as const,
        habitableZone: true,
        discoveryYear: 2016,
        description: "Il più piccolo del sistema, con una massa simile a Marte.",
        color: 0xaa8866,
        displayRadius: 0.3,
        displayDistance: 6,
      },
    ],
    []
  );

  return (
    <group position={[-30, 8, 20]}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color={0xff6633} />
      </mesh>
      <pointLight color={0xff8844} intensity={0.8} distance={30} decay={0.2} />

      {trappist1Planets.slice(1).map((planet) => (
        <ExoplanetMesh
          key={planet.name}
          planet={planet}
          onClick={() => onSelect(planet)}
          isSelected={selectedPlanet?.name === planet.name}
        />
      ))}
    </group>
  );
}

import { useState } from "react";
import { exoplanets } from "@/data/exoplanets";

export default function ExoplanetSystems({
  onSelect,
  selectedPlanet,
}: {
  onSelect: (p: ExoplanetData | null) => void;
  selectedPlanet: ExoplanetData | null;
}) {
  return (
    <group>
      <Trappist1System onSelect={onSelect} selectedPlanet={selectedPlanet} />

      {exoplanets
        .filter((p) => p.name !== "TRAPPIST-1e" && p.name !== "TRAPPIST-1f" && p.name !== "TRAPPIST-1g")
        .map((planet) => (
          <ExoplanetMesh
            key={planet.name}
            planet={planet}
            onClick={() => onSelect(planet)}
            isSelected={selectedPlanet?.name === planet.name}
          />
        ))}
    </group>
  );
}
