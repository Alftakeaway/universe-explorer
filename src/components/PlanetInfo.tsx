"use client";

import { useState, useEffect, useMemo } from "react";
import { PlanetData } from "@/data/planets";

function CrossSection({ planet }: { planet: PlanetData }) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const colors = [
    "#8b5e3c", "#c0392b", "#e67e22", "#f1c40f",
    "#ecf0f1", "#3498db", "#9b59b6",
  ];

  return (
    <div className="mt-4">
      <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
        Sezione trasversale
      </h4>
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700/50">
        <div className="absolute inset-0 flex items-center justify-center">
          {planet.layers.slice().reverse().map((layer, i) => {
            const totalLayers = planet.layers.length;
            const size = 100 - (i / totalLayers) * 80;
            const realIndex = totalLayers - 1 - i;
            const isHovered = hoveredLayer === realIndex;
            return (
              <div
                key={i}
                className="absolute rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  backgroundColor: colors[realIndex % colors.length],
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? "scale(1.03)" : "scale(1)",
                  boxShadow: isHovered ? `0 0 12px ${colors[realIndex % colors.length]}44` : "none",
                }}
                onMouseEnter={() => setHoveredLayer(realIndex)}
                onMouseLeave={() => setHoveredLayer(null)}
              />
            );
          })}
        </div>
        {hoveredLayer !== null && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/90 border border-cyan-500/40 rounded p-2 text-[10px]">
            <p className="text-cyan-300 font-bold">{planet.layers[hoveredLayer].name}</p>
            <p className="text-gray-400">Profondità: {planet.layers[hoveredLayer].depth}</p>
            <p className="text-gray-400">Composizione: {planet.layers[hoveredLayer].composition}</p>
            <p className="text-gray-400">Temperatura: {planet.layers[hoveredLayer].temperature}</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {planet.layers.map((layer, i) => (
          <div key={i} className="flex items-center gap-1 text-[9px] text-gray-500">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            {layer.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateRealTimeDistance(distanceAU: number): string {
  const now = new Date();
  const yearFraction = now.getFullYear() + now.getMonth() / 12 + now.getDate() / 365;
  const angle = (yearFraction * 2 * Math.PI) / (distanceAU * 365.25);
  const earthAngle = (yearFraction * 2 * Math.PI) / 365.25;

  const earthX = Math.cos(earthAngle) * 1;
  const earthZ = Math.sin(earthAngle) * 1;
  const planetX = Math.cos(angle) * distanceAU;
  const planetZ = Math.sin(angle) * distanceAU;

  const dist = Math.sqrt(
    (planetX - earthX) ** 2 + (planetZ - earthZ) ** 2
  );

  const km = dist * 149597870.7;
  if (km > 1e9) {
    return `${(km / 1e9).toFixed(2)} miliardi km`;
  }
  return `${(km / 1e6).toFixed(1)} milioni km`;
}

export default function PlanetInfo({
  planet,
  onClose,
}: {
  planet: PlanetData | null;
  onClose: () => void;
}) {
  const [realTimeDistance, setRealTimeDistance] = useState("");

  useEffect(() => {
    if (!planet) return;
    const update = () => setRealTimeDistance(calculateRealTimeDistance(planet.distance));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [planet]);

  if (!planet) return null;

  const hexColor = `#${planet.color.toString(16).padStart(6, "0")}`;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-cyan-500/20 overflow-y-auto z-50">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full border border-white/20"
              style={{ backgroundColor: hexColor }}
            />
            <div>
              <h2 className="text-white text-lg font-bold tracking-wide">
                {planet.name}
              </h2>
              {planet.isDwarfPlanet && (
                <span className="text-[9px] text-amber-400/80 uppercase tracking-widest">
                  Pianeta Nano
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-lg leading-none p-1"
          >
            ×
          </button>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed mb-4">
          {planet.description}
        </p>

        <div className="space-y-3">
          <DataRow label="Massa" value={planet.mass} />
          <DataRow label="Densità" value={planet.density} />
          <DataRow label="Gravità" value={planet.gravity} />
          <DataRow label="Temperatura" value={planet.temperature} />
          <DataRow label="Giorno sidereo" value={planet.dayLength} />
          <DataRow label="Anno orbitale" value={`${planet.period} giorni terrestri`} />
          <DataRow label="Distanza dal Sole" value={planet.distanceFromSun} />
          <DataRow label="Lune" value={planet.moons.toString()} />
          <DataRow label="Distanza dalla Terra (ora)" value={realTimeDistance} />
        </div>

        <div className="mt-4">
          <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Atmosfera
          </h4>
          <p className="text-gray-300 text-xs leading-relaxed bg-gray-900/50 border border-gray-700/50 rounded p-2">
            {planet.atmosphere}
          </p>
        </div>

        <CrossSection planet={planet} />

        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Strati interni
          </h4>
          <div className="space-y-2">
            {planet.layers.map((layer, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-700/50 rounded p-2 text-[10px]">
                <p className="text-cyan-300 font-bold">{layer.name}</p>
                <div className="text-gray-400 mt-0.5 space-y-0.5">
                  <p>Profondità: {layer.depth}</p>
                  <p>Spessore: {layer.thickness}</p>
                  <p>Composizione: {layer.composition}</p>
                  <p>Temperatura: {layer.temperature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-gray-500 text-[10px] uppercase tracking-wider">{label}</span>
      <span className="text-gray-300 text-xs text-right max-w-[55%]">{value}</span>
    </div>
  );
}
