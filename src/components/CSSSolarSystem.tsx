"use client";

import { useEffect, useState } from "react";
import "./css-solar-system.css";

export default function CSSSolarSystem() {
  const [bodyClass, setBodyClass] = useState("view-2D zoom-large data-close controls-close");
  const [activePlanet, setActivePlanet] = useState("earth");

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

  const setScale = (scale: string) => {
    setBodyClass((prev) =>
      prev
        .replace("scale-stretched", "")
        .replace("scale-s", "")
        .replace("scale-d", "")
        .trim() + ` ${scale}`
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
        <a className={`sun ${activePlanet === "sun" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("sun"); }}>Sun</a>
        <a className={`mercury ${activePlanet === "mercury" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("mercury"); }}>Mercury</a>
        <a className={`venus ${activePlanet === "venus" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("venus"); }}>Venus</a>
        <a className={`earth ${activePlanet === "earth" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("earth"); }}>Earth</a>
        <a className={`mars ${activePlanet === "mars" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("mars"); }}>Mars</a>
        <a className={`jupiter ${activePlanet === "jupiter" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("jupiter"); }}>Jupiter</a>
        <a className={`saturn ${activePlanet === "saturn" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("saturn"); }}>Saturn</a>
        <a className={`uranus ${activePlanet === "uranus" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("uranus"); }}>Uranus</a>
        <a className={`neptune ${activePlanet === "neptune" ? "active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActivePlanet("neptune"); }}>Neptune</a>
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
                <div className="planet">
                  <dl className="infos">
                    <dt>Mercury</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="venus" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Venus</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="earth" className="orbit">
              <div className="pos">
                <div className="orbit">
                  <div className="pos">
                    <div className="moon"></div>
                  </div>
                </div>
                <div className="planet">
                  <dl className="infos">
                    <dt>Earth</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="mars" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Mars</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="jupiter" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Jupiter</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="saturn" className="orbit">
              <div className="pos">
                <div className="planet">
                  <div className="ring"></div>
                  <dl className="infos">
                    <dt>Saturn</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="uranus" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Uranus</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="neptune" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Neptune</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="sun">
              <dl className="infos">
                <dt>Sun</dt>
                <dd><span></span></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
