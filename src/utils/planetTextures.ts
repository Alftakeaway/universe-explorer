import * as THREE from "three";

export function createPlanetTexture(
  color: number,
  name: string,
  width = 512,
  height = 256
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const baseColor = new THREE.Color(color);

  ctx.fillStyle = `rgb(${Math.floor(baseColor.r * 255)}, ${Math.floor(baseColor.g * 255)}, ${Math.floor(baseColor.b * 255)})`;
  ctx.fillRect(0, 0, width, height);

  switch (name) {
    case "Jupiter":
      drawJupiterBands(ctx, width, height);
      break;
    case "Saturn":
      drawSaturnBands(ctx, width, height);
      break;
    case "Earth":
      drawEarthTexture(ctx, width, height);
      break;
    case "Mars":
      drawMarsTexture(ctx, width, height);
      break;
    case "Venus":
      drawVenusTexture(ctx, width, height);
      break;
    case "Neptune":
    case "Uranus":
      drawGasGiantTexture(ctx, width, height, baseColor);
      break;
    case "Mercury":
      drawMercuryTexture(ctx, width, height);
      break;
    default:
      drawGenericTexture(ctx, width, height, baseColor);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function drawJupiterBands(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const bands = [
    { y: 0.15, color: "#c4a56e", width: 0.08 },
    { y: 0.25, color: "#8b6f47", width: 0.06 },
    { y: 0.35, color: "#d4b896", width: 0.1 },
    { y: 0.45, color: "#a0826d", width: 0.05 },
    { y: 0.55, color: "#c9a87c", width: 0.12 },
    { y: 0.65, color: "#7a5c3a", width: 0.04 },
    { y: 0.75, color: "#b8956a", width: 0.08 },
    { y: 0.85, color: "#9c7e5b", width: 0.06 },
  ];

  bands.forEach((band) => {
    const grad = ctx.createLinearGradient(0, (band.y - band.width / 2) * h, 0, (band.y + band.width / 2) * h);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.3, band.color);
    grad.addColorStop(0.7, band.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, (band.y - band.width / 2) * h, w, band.width * h);
  });

  const spotX = w * 0.6;
  const spotY = h * 0.58;
  const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, w * 0.06);
  spotGrad.addColorStop(0, "#cc5533");
  spotGrad.addColorStop(0.5, "#bb4422");
  spotGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.ellipse(spotX, spotY, w * 0.06, h * 0.025, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawSaturnBands(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const bands = [
    { y: 0.2, color: "#e8d5a3", width: 0.08 },
    { y: 0.35, color: "#c9b07a", width: 0.1 },
    { y: 0.5, color: "#dfc89a", width: 0.12 },
    { y: 0.65, color: "#b8a06d", width: 0.08 },
    { y: 0.8, color: "#d4bf8e", width: 0.06 },
  ];

  bands.forEach((band) => {
    const grad = ctx.createLinearGradient(0, (band.y - band.width / 2) * h, 0, (band.y + band.width / 2) * h);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.3, band.color);
    grad.addColorStop(0.7, band.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, (band.y - band.width / 2) * h, w, band.width * h);
  });
}

function drawEarthTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  ctx.fillStyle = "#1a5276";
  ctx.fillRect(0, 0, w, h);

  const continents = [
    { x: 0.25, y: 0.35, w: 0.08, h: 0.12, color: "#2d6a4f" },
    { x: 0.28, y: 0.45, w: 0.05, h: 0.08, color: "#2d6a4f" },
    { x: 0.45, y: 0.3, w: 0.12, h: 0.15, color: "#2d6a4f" },
    { x: 0.48, y: 0.45, w: 0.08, h: 0.1, color: "#2d6a4f" },
    { x: 0.55, y: 0.25, w: 0.15, h: 0.2, color: "#2d6a4f" },
    { x: 0.58, y: 0.5, w: 0.1, h: 0.15, color: "#2d6a4f" },
    { x: 0.75, y: 0.35, w: 0.1, h: 0.12, color: "#2d6a4f" },
    { x: 0.85, y: 0.55, w: 0.08, h: 0.1, color: "#2d6a4f" },
  ];

  continents.forEach((c) => {
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.ellipse(c.x * w, c.y * h, c.w * w * 0.5, c.h * h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  const poleGrad = ctx.createLinearGradient(0, 0, 0, h * 0.1);
  poleGrad.addColorStop(0, "rgba(255,255,255,0.7)");
  poleGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = poleGrad;
  ctx.fillRect(0, 0, w, h * 0.1);

  const poleGrad2 = ctx.createLinearGradient(0, h * 0.9, 0, h);
  poleGrad2.addColorStop(0, "rgba(255,255,255,0)");
  poleGrad2.addColorStop(1, "rgba(255,255,255,0.7)");
  ctx.fillStyle = poleGrad2;
  ctx.fillRect(0, h * 0.9, w, h * 0.1);

  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const cr = 5 + Math.random() * 15;
    const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    cloudGrad.addColorStop(0, "rgba(255,255,255,0.15)");
    cloudGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cr * 1.5, cr, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMarsTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#c4734a");
  grad.addColorStop(0.15, "#d4835a");
  grad.addColorStop(0.5, "#c06838");
  grad.addColorStop(0.85, "#d4835a");
  grad.addColorStop(1, "#c4734a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(180, 120, 80, 0.3)";
  ctx.beginPath();
  ctx.ellipse(w * 0.4, h * 0.45, w * 0.08, h * 0.04, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(200, 180, 160, 0.5)";
  ctx.beginPath();
  ctx.ellipse(w * 0.35, h * 0.15, w * 0.05, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(100, 70, 50, 0.3)";
  ctx.fillRect(w * 0.2, h * 0.42, w * 0.4, h * 0.01);
}

function drawVenusTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  ctx.fillStyle = "#d4a04a";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const cr = 20 + Math.random() * 40;
    const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    cloudGrad.addColorStop(0, "rgba(210, 170, 80, 0.3)");
    cloudGrad.addColorStop(1, "rgba(180, 140, 60, 0)");
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cr, cr * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = "rgba(160, 120, 50, 0.2)";
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    const startX = Math.random() * w;
    const startY = Math.random() * h;
    ctx.moveTo(startX, startY);
    for (let j = 0; j < 5; j++) {
      ctx.lineTo(
        startX + (Math.random() - 0.5) * w * 0.3,
        startY + (Math.random() - 0.5) * h * 0.1
      );
    }
    ctx.stroke();
  }
}

function drawGasGiantTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseColor: THREE.Color
) {
  const bands = 8;
  for (let i = 0; i < bands; i++) {
    const y = (i / bands) * h;
    const bandH = h / bands;
    const variation = 0.9 + Math.random() * 0.2;
    const r = Math.floor(baseColor.r * 255 * variation);
    const g = Math.floor(baseColor.g * 255 * variation);
    const b = Math.floor(baseColor.b * 255 * variation);

    const grad = ctx.createLinearGradient(0, y, 0, y + bandH);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
    grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.8)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.5)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, w, bandH);
  }
}

function drawMercuryTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  ctx.fillStyle = "#8a7a6a";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 50; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const cr = 2 + Math.random() * 8;
    const craterGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    craterGrad.addColorStop(0, "rgba(100, 90, 80, 0.5)");
    craterGrad.addColorStop(0.7, "rgba(120, 110, 100, 0.3)");
    craterGrad.addColorStop(1, "rgba(130, 120, 110, 0)");
    ctx.fillStyle = craterGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGenericTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseColor: THREE.Color
) {
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const cr = 10 + Math.random() * 30;
    const variation = 0.8 + Math.random() * 0.4;
    const r = Math.floor(baseColor.r * 255 * variation);
    const g = Math.floor(baseColor.g * 255 * variation);
    const b = Math.floor(baseColor.b * 255 * variation);

    const patchGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    patchGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
    patchGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = patchGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cr, cr * (0.5 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}
