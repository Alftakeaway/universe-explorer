"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type ZoomLevel = "solar" | "exoplanet" | "galactic" | "cosmic";

const ZOOM_CONFIGS = {
  solar: {
    cameraPosition: [0, 40, 80] as [number, number, number],
    fogNear: 100,
    fogFar: 400,
    showSolarSystem: true,
    showExoplanets: false,
    showDeepSpace: false,
  },
  exoplanet: {
    cameraPosition: [0, 60, 120] as [number, number, number],
    fogNear: 300,
    fogFar: 1200,
    showSolarSystem: false,
    showExoplanets: true,
    showDeepSpace: false,
  },
  galactic: {
    cameraPosition: [0, 150, 250] as [number, number, number],
    fogNear: 1000,
    fogFar: 5000,
    showSolarSystem: false,
    showExoplanets: false,
    showDeepSpace: true,
  },
  cosmic: {
    cameraPosition: [0, 200, 400] as [number, number, number],
    fogNear: 2000,
    fogFar: 10000,
    showSolarSystem: false,
    showExoplanets: false,
    showDeepSpace: true,
  },
};

export default function ZoomLevelManager({
  currentLevel,
  onLevelChange,
}: {
  currentLevel: ZoomLevel;
  onLevelChange: (level: ZoomLevel) => void;
}) {
  const { camera, scene } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const transitioning = useRef(false);

  useEffect(() => {
    const config = ZOOM_CONFIGS[currentLevel];
    targetPos.current.set(...config.cameraPosition);

    const fog = scene.fog as THREE.Fog;
    if (fog) {
      fog.near = config.fogNear;
      fog.far = config.fogFar;
    }
  }, [currentLevel, scene]);

  useFrame(() => {
    if (transitioning.current) {
      camera.position.lerp(targetPos.current, 0.02);
      if (camera.position.distanceTo(targetPos.current) < 0.5) {
        transitioning.current = false;
      }
    }
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (transitioning.current) return;

      if (e.deltaY < -50) {
        const levels: ZoomLevel[] = ["solar", "exoplanet", "galactic", "cosmic"];
        const idx = levels.indexOf(currentLevel);
        if (idx < levels.length - 1) {
          transitioning.current = true;
          onLevelChange(levels[idx + 1]);
        }
      } else if (e.deltaY > 50) {
        const levels: ZoomLevel[] = ["solar", "exoplanet", "galactic", "cosmic"];
        const idx = levels.indexOf(currentLevel);
        if (idx > 0) {
          transitioning.current = true;
          onLevelChange(levels[idx - 1]);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentLevel, onLevelChange]);

  return null;
}
