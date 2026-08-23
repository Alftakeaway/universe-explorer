"use client";

import { ZoomLevel } from "./ZoomLevelManager";

const ZOOM_LEVELS: { level: ZoomLevel; label: string; icon: string }[] = [
  { level: "solar", label: "Sistema Solare", icon: "☀️" },
  { level: "exoplanet", label: "Esopianeti", icon: "🌍" },
  { level: "galactic", label: "Galassie", icon: "🌌" },
  { level: "cosmic", label: "Cosmico", icon: "✨" },
];

export default function HUDControls({
  timeScale,
  onTimeScaleChange,
  showRings,
  onToggleRings,
  showAtmosphere,
  onToggleAtmosphere,
  showAsteroids,
  onToggleAsteroids,
  zoomLevel,
  onZoomLevelChange,
}: {
  timeScale: number;
  onTimeScaleChange: (v: number) => void;
  showRings: boolean;
  onToggleRings: () => void;
  showAtmosphere: boolean;
  onToggleAtmosphere: () => void;
  showAsteroids: boolean;
  onToggleAsteroids: () => void;
  zoomLevel: ZoomLevel;
  onZoomLevelChange: (level: ZoomLevel) => void;
}) {
  return (
    <div className="fixed top-4 left-4 z-50 space-y-3">
      <div className="bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-3 w-56">
        <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          Navigazione
        </h3>
        <div className="space-y-1">
          {ZOOM_LEVELS.map((z) => (
            <button
              key={z.level}
              onClick={() => onZoomLevelChange(z.level)}
              className={`w-full text-left px-2 py-1.5 rounded text-[10px] transition-colors flex items-center gap-2 ${
                zoomLevel === z.level
                  ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30"
                  : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <span>{z.icon}</span>
              <span>{z.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-3 w-56">
        <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          Controllo Temporale
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-[10px] w-6">0×</span>
          <input
            type="range"
            min="0"
            max="50"
            step="0.5"
            value={timeScale}
            onChange={(e) => onTimeScaleChange(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-gray-500 text-[10px] w-10 text-right">{timeScale}×</span>
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-3 w-56">
        <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          Visualizzazione
        </h3>
        <div className="space-y-1.5">
          <ToggleRow label="Anelli planetari" checked={showRings} onChange={onToggleRings} />
          <ToggleRow label="Atmosfere" checked={showAtmosphere} onChange={onToggleAtmosphere} />
          <ToggleRow label="Cintura asteroidi" checked={showAsteroids} onChange={onToggleAsteroids} />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-400 text-[10px]">{label}</span>
      <div
        className={`w-7 h-4 rounded-full transition-colors ${checked ? "bg-cyan-600" : "bg-gray-700"}`}
        onClick={onChange}
      >
        <div
          className={`w-3 h-3 rounded-full bg-white transition-transform mt-0.5 ${
            checked ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </div>
    </label>
  );
}
