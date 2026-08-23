"use client";

import { DeepSpaceObject } from "@/data/deepSpace";

export default function DeepSpaceInfo({
  object,
  onClose,
}: {
  object: DeepSpaceObject | null;
  onClose: () => void;
}) {
  if (!object) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-cyan-500/20 overflow-y-auto z-50">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-lg font-bold tracking-wide">
              {object.name}
            </h2>
            <span className="text-[9px] text-purple-400/80 uppercase tracking-widest">
              {object.type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-lg leading-none p-1"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <DataRow label="Distanza" value={`${object.distanceLightYears} anni luce`} />
          {object.constellation && (
            <DataRow label="Costellazione" value={object.constellation} />
          )}
          <DataRow label="Tipo" value={object.type} />
        </div>

        <div className="mt-4">
          <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Descrizione
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed bg-gray-900/50 border border-gray-700/50 rounded p-3">
            {object.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Posizione nella scena
          </h4>
          <div className="text-gray-400 text-[10px] space-y-1">
            <p>X: {object.position[0].toFixed(1)}</p>
            <p>Y: {object.position[1].toFixed(1)}</p>
            <p>Z: {object.position[2].toFixed(1)}</p>
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
