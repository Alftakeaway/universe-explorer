"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LensFlare({
  position = [0, 0, 0],
  color = 0xfff8e0,
  size = 5,
}: {
  position?: [number, number, number];
  color?: number;
  size?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const flareTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.1, "rgba(255, 255, 240, 0.8)");
    gradient.addColorStop(0.3, "rgba(255, 240, 200, 0.3)");
    gradient.addColorStop(0.6, "rgba(255, 200, 100, 0.1)");
    gradient.addColorStop(1, "rgba(255, 150, 50, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {[0, 1.5, 3, 4.5].map((offset, i) => (
        <sprite key={i} position={[offset * 0.3, offset * 0.15, 0]}>
          <spriteMaterial
            map={flareTexture}
            color={color}
            transparent
            opacity={0.4 - i * 0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
