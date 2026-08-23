"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AsteroidBelt({
  innerRadius = 18,
  outerRadius = 24,
  count = 2000,
}: {
  innerRadius?: number;
  outerRadius?: number;
  count?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, scales, rotations } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const sc: number[] = [];
    const rot: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const y = (Math.random() - 0.5) * 0.6;

      pos.push([Math.cos(angle) * r, y, Math.sin(angle) * r]);
      sc.push(0.01 + Math.random() * 0.04);
      rot.push([
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]);
    }

    return { positions: pos, scales: sc, rotations: rot };
  }, [innerRadius, outerRadius, count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      const angle = state.clock.elapsedTime * 0.001 + i * 0.001;
      const r = Math.sqrt(x * x + z * z);

      dummy.position.set(
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r
      );
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.set(rotations[i][0], rotations[i][1] + state.clock.elapsedTime * 0.01, rotations[i][2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={0x888888} roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
}
