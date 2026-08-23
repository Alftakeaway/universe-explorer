"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphericGlowProps {
  radius: number;
  color?: THREE.ColorRepresentation;
  intensity?: number;
  power?: number;
}

export default function AtmosphericGlow({
  radius,
  color = 0x4488ff,
  intensity = 1.5,
  power = 2.5,
}: AtmosphericGlowProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        uniforms={{
          glowColor: { value: new THREE.Color(color) },
          viewVector: { value: new THREE.Vector3(0, 0, 1) },
          intensity: { value: intensity },
          power: { value: power },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPositionNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          uniform float intensity;
          uniform float power;
          varying vec3 vNormal;
          varying vec3 vPositionNormal;
          void main() {
            float intensityFactor = pow(intensity - dot(vNormal, vPositionNormal), power);
            gl_FragColor = vec4(glowColor, intensityFactor * 0.6);
          }
        `}
      />
    </mesh>
  );
}
