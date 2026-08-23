"use client";

import { ExoplanetData } from "@/data/exoplanets";

export default function ExoplanetInfo({
  planet,
  onClose,
}: {
  planet: ExoplanetData | null;
  onClose: () => void;
}) {
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
              <span className="text-[9px] text-green-400/80 uppercase tracking-widest">
                {planet.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-lg leading-none p-1"
          >
            ×
          </button>
        </div>

        {planet.habitableZone && (
          <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-2 mb-4">
            <p className="text-green-400 text-[10px] font-bold uppercase tracking-wider">
              Nella zona abitabile
            </p>
            <p className="text-green-300/70 text-[9px] mt-1">
              Condizioni potenzialmente favorevoli per acqua liquida
            </p>
          </div>
        )}

        <p className="text-gray-400 text-xs leading-relaxed mb-4">
          {planet.description}
        </p>

        <div className="space-y-3">
          <DataRow label="Stella" value={planet.star} />
          <DataRow label="Costellazione" value={planet.constellation} />
          <DataRow label="Distanza" value={`${planet.distanceLightYears} anni luce`} />
          <DataRow label="Raggio (× Terra)" value={`${planet.radiusEarth}×`} />
          <DataRow label="Massa (× Terra)" value={`${planet.massEarth}×`} />
          <DataRow label="Periodo orbitale" value={`${planet.orbitalPeriodDays} giorni`} />
          <DataRow label="Temperatura" value={`${planet.temperatureK} K`} />
          <DataRow label="Anno scoperta" value={planet.discoveryYear.toString()} />
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Indicatore di abitabilità
          </h4>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (1 - Math.abs(planet.temperatureK - 288) / 200) * 100)}%`,
                backgroundColor: planet.habitableZone ? "#22c55e" : "#ef4444",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-500">Troppo freddo</span>
            <span className="text-[9px] text-gray-500">Zona abitabile</span>
            <span className="text-[9px] text-gray-500">Troppo caldo</span>
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
