"use client";

import { useEffect, useState } from "react";
import "./css-solar-system.css";

interface PlanetInfo {
  name: string;
  type: string;
  diameter: string;
  distance: string;
  orbitalPeriod: string;
  dayLength: string;
  moons: number;
  temperature: string;
  atmosphere: string;
  description: string;
}

const planetsData: Record<string, PlanetInfo> = {
  sun: {
    name: "Sun",
    type: "Star (G2V)",
    diameter: "1,391,000 km",
    distance: "0 km (center)",
    orbitalPeriod: "225-250M years (galactic)",
    dayLength: "25.4 days (equator)",
    moons: 0,
    temperature: "5,500 °C (surface)",
    atmosphere: "Hydrogen 73%, Helium 25%",
    description: "Our star, a nearly perfect sphere of hot plasma that powers our solar system.",
  },
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet",
    diameter: "4,879 km",
    distance: "57.9 million km",
    orbitalPeriod: "88 days",
    dayLength: "58.6 days",
    moons: 0,
    temperature: "-173 to 427 °C",
    atmosphere: "Minimal (Oxygen, Sodium)",
    description: "Smallest planet, heavily cratered, closest to the Sun.",
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet",
    diameter: "12,104 km",
    distance: "108.2 million km",
    orbitalPeriod: "225 days",
    dayLength: "243 days (retrograde)",
    moons: 0,
    temperature: "462 °C (average)",
    atmosphere: "CO₂ 96.5%, N₂ 3.5%",
    description: "Hottest planet, thick toxic atmosphere, rotates backwards.",
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet",
    diameter: "12,742 km",
    distance: "149.6 million km",
    orbitalPeriod: "365.25 days",
    dayLength: "23h 56m 4s",
    moons: 1,
    temperature: "15 °C (average)",
    atmosphere: "N₂ 78%, O₂ 21%, Ar 0.9%",
    description: "Our home, the only known planet with liquid water and life.",
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet",
    diameter: "6,779 km",
    distance: "227.9 million km",
    orbitalPeriod: "687 days",
    dayLength: "24h 37m 22s",
    moons: 2,
    temperature: "-65 °C (average)",
    atmosphere: "CO₂ 95.3%, N₂ 2.7%",
    description: "The Red Planet, home to Olympus Mons and Valles Marineris.",
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    diameter: "139,820 km",
    distance: "778.3 million km",
    orbitalPeriod: "11.86 years",
    dayLength: "9h 55m 30s",
    moons: 95,
    temperature: "-108 °C (cloud top)",
    atmosphere: "H₂ 89.8%, He 10.2%",
    description: "Largest planet, Great Red Spot is a storm lasting 350+ years.",
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant",
    diameter: "116,460 km",
    distance: "1.43 billion km",
    orbitalPeriod: "29.46 years",
    dayLength: "10h 33m 38s",
    moons: 146,
    temperature: "-139 °C (cloud top)",
    atmosphere: "H₂ 96.3%, He 3.25%",
    description: "Famous for its spectacular ring system of ice and rock.",
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant",
    diameter: "50,724 km",
    distance: "2.87 billion km",
    orbitalPeriod: "84 years",
    dayLength: "17h 14m 24s",
    moons: 28,
    temperature: "-197 °C (cloud top)",
    atmosphere: "H₂ 82.5%, He 15.2%, CH₄ 2.3%",
    description: "Tilted 98° on its axis, likely from an ancient collision.",
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant",
    diameter: "49,244 km",
    distance: "4.5 billion km",
    orbitalPeriod: "165 years",
    dayLength: "16h 6m 36s",
    moons: 16,
    temperature: "-201 °C (cloud top)",
    atmosphere: "H₂ 80%, He 19%, CH₄ 1.5%",
    description: "Windiest planet with winds up to 2,100 km/h.",
  },
};

export default function CSSSolarSystem() {
  const [bodyClass, setBodyClass] = useState("view-2D zoom-large data-close controls-close");
  const [activePlanet, setActivePlanet] = useState("earth");
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setBodyClass("view-3D zoom-large data-close controls-close set-speed");
    }, 2000);
  }, []);

  const toggleView = () => {
    setBodyClass((prev) =>
      prev.includes("view-3D")
        ? prev.replace("view-3D", "view-2D")
        : prev.replace("view-2D", "view-3D")
    );
  };

  const toggleZoom = () => {
    setBodyClass((prev) =>
      prev.includes("zoom-large")
        ? prev.replace("zoom-large", "zoom-close")
        : prev.replace("zoom-close", "zoom-large")
    );
  };

  const setDataMode = (mode: string) => {
    setBodyClass((prev) =>
      prev
        .replace("set-speed", "")
        .replace("set-size", "")
        .replace("set-distance", "")
        .trim() + ` ${mode}`
    );
  };

  const toggleData = () => {
    setBodyClass((prev) =>
      prev.includes("data-open")
        ? prev.replace("data-open", "data-close")
        : prev.replace("data-close", "data-open")
    );
  };

  const toggleControls = () => {
    setBodyClass((prev) =>
      prev.includes("controls-open")
        ? prev.replace("controls-open", "controls-close")
        : prev.replace("controls-close", "controls-open")
    );
  };

  const handlePlanetClick = (planetName: string) => {
    setActivePlanet(planetName);
    setSelectedPlanet(planetName);
  };

  const closeInfoPanel = () => {
    setSelectedPlanet(null);
  };

  const info = selectedPlanet ? planetsData[selectedPlanet] : null;

  return (
    <div className={`css-solar-system ${bodyClass}`}>
      <div id="navbar">
        <a id="toggle-data" href="#" onClick={(e) => { e.preventDefault(); toggleData(); }}>
          <span className="icon-data"></span>Data
        </a>
        <h1>3D CSS Solar System</h1>
        <a id="toggle-controls" href="#" onClick={(e) => { e.preventDefault(); toggleControls(); }}>
          <span className="icon-controls"></span>Controls
        </a>
      </div>

      <div id="data">
        <a className={`sun ${activePlanet === "sun" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("sun"); }}>Sun</a>
        <a className={`mercury ${activePlanet === "mercury" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("mercury"); }}>Mercury</a>
        <a className={`venus ${activePlanet === "venus" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("venus"); }}>Venus</a>
        <a className={`earth ${activePlanet === "earth" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("earth"); }}>Earth</a>
        <a className={`mars ${activePlanet === "mars" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("mars"); }}>Mars</a>
        <a className={`jupiter ${activePlanet === "jupiter" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("jupiter"); }}>Jupiter</a>
        <a className={`saturn ${activePlanet === "saturn" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("saturn"); }}>Saturn</a>
        <a className={`uranus ${activePlanet === "uranus" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("uranus"); }}>Uranus</a>
        <a className={`neptune ${activePlanet === "neptune" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); handlePlanetClick("neptune"); }}>Neptune</a>
      </div>

      <div id="controls">
        <label className="set-view">
          <input type="checkbox" checked={bodyClass.includes("view-3D")} onChange={toggleView} />
        </label>
        <label className="set-zoom">
          <input type="checkbox" checked={bodyClass.includes("zoom-large")} onChange={toggleZoom} />
        </label>
        <label>
          <input type="radio" className="set-speed" name="scale" checked={bodyClass.includes("set-speed")} onChange={() => setDataMode("set-speed")} />
          <span>Speed</span>
        </label>
        <label>
          <input type="radio" className="set-size" name="scale" checked={bodyClass.includes("set-size")} onChange={() => setDataMode("set-size")} />
          <span>Size</span>
        </label>
        <label>
          <input type="radio" className="set-distance" name="scale" checked={bodyClass.includes("set-distance")} onChange={() => setDataMode("set-distance")} />
          <span>Distance</span>
        </label>
      </div>

      <div id="universe" className="scale-stretched">
        <div id="galaxy">
          <div id="solar-system" className={activePlanet}>
            <div id="mercury" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("mercury")}></div>
              </div>
            </div>
            <div id="venus" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("venus")}></div>
              </div>
            </div>
            <div id="earth" className="orbit">
              <div className="pos">
                <div className="orbit">
                  <div className="pos">
                    <div className="moon"></div>
                  </div>
                </div>
                <div className="planet" onClick={() => handlePlanetClick("earth")}></div>
              </div>
            </div>
            <div id="mars" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("mars")}></div>
              </div>
            </div>
            <div id="jupiter" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("jupiter")}></div>
              </div>
            </div>
            <div id="saturn" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("saturn")}>
                  <div className="ring"></div>
                </div>
              </div>
            </div>
            <div id="uranus" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("uranus")}></div>
              </div>
            </div>
            <div id="neptune" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetClick("neptune")}></div>
              </div>
            </div>
            <div id="sun" onClick={() => handlePlanetClick("sun")}></div>
          </div>
        </div>
      </div>

      {info && (
        <div className="planet-info-panel" onClick={closeInfoPanel}>
          <div className="planet-info-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeInfoPanel}>×</button>
            <h2>{info.name}</h2>
            <span className="planet-type">{info.type}</span>
            <p className="description">{info.description}</p>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Diameter</span>
                <span className="value">{info.diameter}</span>
              </div>
              <div className="data-item">
                <span className="label">Distance from Sun</span>
                <span className="value">{info.distance}</span>
              </div>
              <div className="data-item">
                <span className="label">Orbital Period</span>
                <span className="value">{info.orbitalPeriod}</span>
              </div>
              <div className="data-item">
                <span className="label">Day Length</span>
                <span className="value">{info.dayLength}</span>
              </div>
              <div className="data-item">
                <span className="label">Moons</span>
                <span className="value">{info.moons}</span>
              </div>
              <div className="data-item">
                <span className="label">Temperature</span>
                <span className="value">{info.temperature}</span>
              </div>
              <div className="data-item full-width">
                <span className="label">Atmosphere</span>
                <span className="value">{info.atmosphere}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
