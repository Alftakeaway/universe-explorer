"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface PlanetRingsProps {
  innerRadius: number;
  outerRadius: number;
  color: THREE.ColorRepresentation;
  opacity?: number;
  tilt?: number;
}

export default function PlanetRings({
  innerRadius,
  outerRadius,
  color,
  opacity = 0.5,
  tilt = 0.2,
}: PlanetRingsProps) {
  const ringGeometry = useMemo(() => {
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, 128);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const t = (dist - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, t, 0.5);
    }

    return geo;
  }, [innerRadius, outerRadius]);

  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]} geometry={ringGeometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}
