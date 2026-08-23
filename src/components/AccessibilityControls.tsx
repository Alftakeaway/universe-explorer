"use client";

import { useState, useEffect, useCallback } from "react";

interface AccessibilitySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  keyboardNav: boolean;
}

export default function AccessibilityControls({
  settings,
  onSettingsChange,
  onNavigate,
}: {
  settings: AccessibilitySettings;
  onSettingsChange: (s: AccessibilitySettings) => void;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!settings.keyboardNav) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onNavigate("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          onNavigate("next");
          break;
        case "Escape":
          onSettingsChange({ ...settings, keyboardNav: false });
          break;
      }
    },
    [settings, onNavigate, onSettingsChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-2 text-gray-400 hover:text-white transition-colors text-sm"
        title="Accessibilità"
      >
        ♿
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-black/90 backdrop-blur-md border border-cyan-500/20 rounded-lg p-3 w-56">
          <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            Accessibilità
          </h3>

          <div className="space-y-2">
            <ToggleRow
              label="Riduci movimento"
              checked={settings.reduceMotion}
              onChange={() =>
                onSettingsChange({
                  ...settings,
                  reduceMotion: !settings.reduceMotion,
                })
              }
            />

            <ToggleRow
              label="Alto contrasto"
              checked={settings.highContrast}
              onChange={() =>
                onSettingsChange({
                  ...settings,
                  highContrast: !settings.highContrast,
                })
              }
            />

            <ToggleRow
              label="Navigazione tastiera"
              checked={settings.keyboardNav}
              onChange={() =>
                onSettingsChange({
                  ...settings,
                  keyboardNav: !settings.keyboardNav,
                })
              }
            />
          </div>

          {settings.keyboardNav && (
            <div className="mt-3 pt-2 border-t border-gray-700/50">
              <p className="text-gray-500 text-[9px]">
                ← → per navigare tra i pianeti
              </p>
            </div>
          )}
        </div>
      )}
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
        className={`w-7 h-4 rounded-full transition-colors ${
          checked ? "bg-cyan-600" : "bg-gray-700"
        }`}
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
