"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { DeepSpaceObject } from "@/data/deepSpace";

function NebulaObject({ obj }: { obj: DeepSpaceObject }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    const baseColor = new THREE.Color(obj.color);
    const glowColor = new THREE.Color(obj.glowColor);

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, `rgba(${Math.floor(glowColor.r * 255)}, ${Math.floor(glowColor.g * 255)}, ${Math.floor(glowColor.b * 255)}, 0.6)`);
    gradient.addColorStop(0.4, `rgba(${Math.floor(baseColor.r * 255)}, ${Math.floor(baseColor.g * 255)}, ${Math.floor(baseColor.b * 255)}, 0.3)`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  }, [obj.color, obj.glowColor]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0003;
    }
  });

  return (
    <sprite ref={meshRef} position={obj.position} scale={[obj.size * 2, obj.size * 2, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

function GalaxyObject({ obj }: { obj: DeepSpaceObject }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const cx = 256;
    const cy = 256;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 512, 512);

    for (let arm = 0; arm < 4; arm++) {
      const armAngle = (arm * Math.PI) / 2;
      for (let i = 0; i < 300; i++) {
        const t = i / 300;
        const r = t * 200;
        const angle = armAngle + t * 4;
        const x = cx + Math.cos(angle) * r + (Math.random() - 0.5) * 20;
        const y = cy + Math.sin(angle) * r + (Math.random() - 0.5) * 20;

        const brightness = 1 - t * 0.7;
        const size = 1 + Math.random() * 2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${brightness * 0.5})`;
        ctx.fill();
      }
    }

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    gradient.addColorStop(0, "rgba(255, 255, 200, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 220, 150, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0002;
    }
  });

  return (
    <sprite ref={meshRef} position={obj.position} scale={[obj.size * 2, obj.size * 2, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

function BlackHoleObject({ obj }: { obj: DeepSpaceObject }) {
  const meshRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (diskRef.current) {
      diskRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={obj.position}>
      <mesh>
        <sphereGeometry args={[obj.size * 0.4, 32, 32]} />
        <meshBasicMaterial color={0x000000} />
      </mesh>

      <mesh ref={diskRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[obj.size * 1.2, obj.size * 0.3, 16, 64]} />
        <meshBasicMaterial
          color={0xff6622}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <sprite>
        <spriteMaterial
          color={0xff4400}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

function GenericObject({ obj }: { obj: DeepSpaceObject }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={obj.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[obj.size * 0.5, 32, 32]} />
        <meshBasicMaterial
          color={obj.color}
          transparent
          opacity={0.8}
        />
      </mesh>
      <sprite scale={[obj.size * 3, obj.size * 3, 1]}>
        <spriteMaterial
          color={obj.glowColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

function DeepSpaceObjectMesh({
  obj,
  onSelect,
  isSelected,
}: {
  obj: DeepSpaceObject;
  onSelect: (obj: DeepSpaceObject) => void;
  isSelected: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const renderObject = () => {
    switch (obj.type) {
      case "Nebula":
      case "Supernova Remnant":
        return <NebulaObject obj={obj} />;
      case "Galaxy":
      case "Galaxy Cluster":
        return <GalaxyObject obj={obj} />;
      case "Black Hole":
        return <BlackHoleObject obj={obj} />;
      default:
        return <GenericObject obj={obj} />;
    }
  };

  return (
    <group ref={groupRef}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect(obj);
        }}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {renderObject()}
      </group>
      {isSelected && (
        <Html position={obj.position} center distanceFactor={50} style={{ pointerEvents: "none" }}>
          <div className="bg-black/90 border border-cyan-400 px-3 py-2 rounded-md whitespace-nowrap shadow-lg shadow-cyan-500/20">
            <p className="text-cyan-300 text-xs font-bold">{obj.name}</p>
            <p className="text-gray-400 text-[10px]">{obj.distanceLightYears} anni luce</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function DeepSpaceScene({
  objects,
  onSelect,
  selectedObject,
}: {
  objects: DeepSpaceObject[];
  onSelect: (obj: DeepSpaceObject | null) => void;
  selectedObject: DeepSpaceObject | null;
}) {
  return (
    <group>
      {objects.map((obj) => (
        <DeepSpaceObjectMesh
          key={obj.name}
          obj={obj}
          onSelect={(o) => onSelect(selectedObject?.name === o.name ? null : o)}
          isSelected={selectedObject?.name === obj.name}
        />
      ))}
    </group>
  );
}
