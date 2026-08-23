"use client";

import { useEffect, useRef, useState } from "react";

class SpaceAudioEngine {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private isPlaying = false;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();

    const masterGain = this.ctx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(this.ctx.destination);

    this.createDrone(55, 0.08, masterGain);
    this.createDrone(82.5, 0.05, masterGain);
    this.createDrone(110, 0.04, masterGain);

    this.createPad(220, masterGain);
    this.createPad(330, masterGain);

    this.startRandomPulses(masterGain);
  }

  private createDrone(freq: number, volume: number, dest: AudioNode) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = freq;

    filter.type = "lowpass";
    filter.frequency.value = 200;
    filter.Q.value = 2;

    gain.gain.value = volume;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start();
    this.nodes.push(osc, gain, filter);
  }

  private createPad(freq: number, dest: AudioNode) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = "sine";
    osc1.frequency.value = freq;
    osc2.type = "sine";
    osc2.frequency.value = freq * 1.003;

    filter.type = "lowpass";
    filter.frequency.value = 800;

    gain.gain.value = 0.02;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc1.start();
    osc2.start();
    this.nodes.push(osc1, osc2, gain, filter);
  }

  private startRandomPulses(dest: AudioNode) {
    if (!this.ctx) return;

    const schedulePulse = () => {
      if (!this.ctx || !this.isPlaying) return;

      const now = this.ctx.currentTime;
      const freq = 400 + Math.random() * 800;
      const duration = 2 + Math.random() * 4;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + duration);

      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = 10;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 0.5);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + duration);

      setTimeout(schedulePulse, 3000 + Math.random() * 8000);
    };

    this.isPlaying = true;
    schedulePulse();
  }

  start() {
    this.init();
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
    this.nodes.forEach((node) => {
      try {
        if (node instanceof OscillatorNode) node.stop();
        node.disconnect();
      } catch {}
    });
    this.nodes = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export default function AmbientAudio({ enabled }: { enabled: boolean }) {
  const engineRef = useRef<SpaceAudioEngine | null>(null);

  useEffect(() => {
    if (enabled) {
      engineRef.current = new SpaceAudioEngine();
      engineRef.current.start();
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
    };
  }, [enabled]);

  return null;
}
