"use client";

import { useState, useCallback, useMemo } from "react";
import SolarSystem from "@/components/SolarSystem";
import PlanetInfo from "@/components/PlanetInfo";
import ExoplanetInfo from "@/components/ExoplanetInfo";
import DeepSpaceInfo from "@/components/DeepSpaceInfo";
import HUDControls from "@/components/HUDControls";
import AccessibilityControls from "@/components/AccessibilityControls";
import AmbientAudio from "@/components/AmbientAudio";
import { PlanetData, planets } from "@/data/planets";
import { ExoplanetData } from "@/data/exoplanets";
import { DeepSpaceObject } from "@/data/deepSpace";
import { ZoomLevel } from "@/components/ZoomLevelManager";

interface AccessibilitySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  keyboardNav: boolean;
}

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null);
  const [selectedExoplanet, setSelectedExoplanet] = useState<ExoplanetData | null>(null);
  const [selectedDeepSpace, setSelectedDeepSpace] = useState<DeepSpaceObject | null>(null);

  const [timeScale, setTimeScale] = useState(1);
  const [showRings, setShowRings] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [showAsteroids, setShowAsteroids] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("solar");

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    reduceMotion: false,
    highContrast: false,
    keyboardNav: false,
  });

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (zoomLevel !== "solar") return;

      const allPlanets = planets;
      if (direction === "next") {
        if (selectedPlanet) {
          const idx = allPlanets.findIndex((p) => p.name === selectedPlanet.name);
          if (idx < allPlanets.length - 1) {
            setSelectedPlanet(allPlanets[idx + 1]);
          } else {
            setSelectedPlanet(null);
          }
        } else {
          setSelectedPlanet(allPlanets[0]);
        }
      } else {
        if (selectedPlanet) {
          const idx = allPlanets.findIndex((p) => p.name === selectedPlanet.name);
          if (idx > 0) {
            setSelectedPlanet(allPlanets[idx - 1]);
          } else {
            setSelectedPlanet(null);
          }
        } else {
          setSelectedPlanet(allPlanets[allPlanets.length - 1]);
        }
      }
    },
    [selectedPlanet, zoomLevel]
  );

  const anySelected = selectedPlanet || selectedExoplanet || selectedDeepSpace;

  const bottomHint = useMemo(() => {
    if (selectedPlanet) return `${selectedPlanet.name} — clicca altrove per deselezionare`;
    if (selectedExoplanet) return `${selectedExoplanet.name} — clicca altrove per deselezionare`;
    if (selectedDeepSpace) return `${selectedDeepSpace.name} — clicca altrove per deselezionare`;
    if (hoveredPlanet) return `${hoveredPlanet.name} — clicca per esplorare`;
    return "passa il mouse su un oggetto per iniziare • usa la rotellilla per navigare tra i livelli";
  }, [selectedPlanet, selectedExoplanet, selectedDeepSpace, hoveredPlanet]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <SolarSystem
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
        onHoverPlanet={setHoveredPlanet}
        selectedExoplanet={selectedExoplanet}
        onSelectExoplanet={setSelectedExoplanet}
        selectedDeepSpace={selectedDeepSpace}
        onSelectDeepSpace={setSelectedDeepSpace}
        timeScale={timeScale}
        showRings={showRings}
        showAtmosphere={showAtmosphere}
        showAsteroids={showAsteroids}
        zoomLevel={zoomLevel}
        onZoomLevelChange={setZoomLevel}
        reduceMotion={accessibility.reduceMotion}
      />

      <HUDControls
        timeScale={timeScale}
        onTimeScaleChange={setTimeScale}
        showRings={showRings}
        onToggleRings={() => setShowRings(!showRings)}
        showAtmosphere={showAtmosphere}
        onToggleAtmosphere={() => setShowAtmosphere(!showAtmosphere)}
        showAsteroids={showAsteroids}
        onToggleAsteroids={() => setShowAsteroids(!showAsteroids)}
        zoomLevel={zoomLevel}
        onZoomLevelChange={setZoomLevel}
      />

      <PlanetInfo
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />

      <ExoplanetInfo
        planet={selectedExoplanet}
        onClose={() => setSelectedExoplanet(null)}
      />

      <DeepSpaceInfo
        object={selectedDeepSpace}
        onClose={() => setSelectedDeepSpace(null)}
      />

      <AccessibilityControls
        settings={accessibility}
        onSettingsChange={setAccessibility}
        onNavigate={handleNavigate}
      />

      <AmbientAudio enabled={audioEnabled} />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/10 rounded-full px-5 py-2 flex items-center gap-4">
          <p className="text-gray-500 text-[10px] tracking-wider">{bottomHint}</p>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-40">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/10 rounded-lg px-3 py-2">
          <h1 className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">
            Universe Explorer
          </h1>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/10 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-gray-600 text-[9px] uppercase tracking-wider">
            {zoomLevel === "solar" && "Sistema Solare"}
            {zoomLevel === "exoplanet" && "Esopianeti"}
            {zoomLevel === "galactic" && "Strutture Galattiche"}
            {zoomLevel === "cosmic" && "Scala Cosmica"}
          </span>
        </div>
      </div>
    </div>
  );
}
