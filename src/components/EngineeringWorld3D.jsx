import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EngineeringWorld3D.jsx — Ultra-Premium Isometric 3D Engineering Environment
 *
 * Visual concept: A rich, detailed CPU / motherboard engineering world seen from
 * an elevated isometric perspective. Think of a high-end chip-level render with
 * neon-lime illumination, detailed geometry, and cinematic scroll-driven camera.
 *
 * Features:
 * ─ Large, detailed multi-layer CPU die with bevelled substrate, bond wires,
 *   capacitor arrays, heatsink fins, and contact grid
 * ─ Solid motherboard floor with gold traces, SMD chips, and solder pads
 * ─ PCIe-style expansion slots and connector strips
 * ─ Physical conduit pipes running data pulses (light runners) between modules
 * ─ Four interconnected computing tower modules with server rack aesthetics
 * ─ Suspended holographic HUD info panels, floating with gentle sinusoidal motion
 * ─ Ambient particle field
 * ─ Cinematic scroll-driven camera path (6 waypoints)
 * ─ Mouse pointer parallax for tactile depth
 */

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS TEXTURE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function createCpuDieTexture() {
  const SIZE = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  // Base: deep obsidian
  ctx.fillStyle = '#040a06';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Outer substrate ring
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, SIZE - 28, SIZE - 28);

  ctx.strokeStyle = 'rgba(132,204,22,0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, SIZE - 60, SIZE - 60);
  ctx.strokeRect(44, 44, SIZE - 88, SIZE - 88);

  // HUD corner brackets
  const drawBracket = (x, y, ox, oy) => {
    ctx.beginPath();
    ctx.moveTo(x, y + oy * 52);
    ctx.lineTo(x, y);
    ctx.lineTo(x + ox * 52, y);
    ctx.stroke();
  };
  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 10;
  drawBracket(14, 14, 1, 1);
  drawBracket(SIZE - 14, 14, -1, 1);
  drawBracket(14, SIZE - 14, 1, -1);
  drawBracket(SIZE - 14, SIZE - 14, -1, -1);

  // Fine orthogonal silicon traces on left/right margins
  ctx.strokeStyle = 'rgba(132,204,22,0.35)';
  ctx.lineWidth = 2.5;
  for (let y = 90; y <= SIZE - 90; y += 36) {
    ctx.beginPath();
    ctx.moveTo(58, y); ctx.lineTo(180, y);
    ctx.moveTo(SIZE - 58, y); ctx.lineTo(SIZE - 180, y);
    ctx.stroke();
    // Small cross-tick
    ctx.beginPath();
    ctx.moveTo(180, y); ctx.lineTo(180, y + 18); ctx.lineTo(200, y + 18);
    ctx.moveTo(SIZE - 180, y); ctx.lineTo(SIZE - 180, y + 18); ctx.lineTo(SIZE - 200, y + 18);
    ctx.stroke();
  }

  // Central die container
  const dx = 220, dy = 220, dw = SIZE - 440, dh = SIZE - 440;
  ctx.fillStyle = '#050d08';
  ctx.fillRect(dx, dy, dw, dh);

  // Die outer glow border
  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 5;
  ctx.strokeRect(dx, dy, dw, dh);

  // Inner die grid (functional blocks)
  ctx.strokeStyle = 'rgba(132,204,22,0.25)';
  ctx.lineWidth = 1.5;
  const step = dw / 6;
  for (let gx = 1; gx < 6; gx++) {
    ctx.beginPath();
    ctx.moveTo(dx + gx * step, dy);
    ctx.lineTo(dx + gx * step, dy + dh);
    ctx.stroke();
  }
  for (let gy = 1; gy < 6; gy++) {
    ctx.beginPath();
    ctx.moveTo(dx, dy + gy * step);
    ctx.lineTo(dx + dw, dy + gy * step);
    ctx.stroke();
  }

  // Random functional block highlights (real CPU die visual)
  const blocks = [
    [0, 0, 3, 2], [3, 0, 3, 1], [0, 2, 2, 2], [2, 2, 4, 2],
    [4, 2, 2, 2], [0, 4, 2, 2], [2, 4, 2, 2], [4, 4, 2, 2],
  ];
  const blockColors = ['rgba(132,204,22,0.12)', 'rgba(56,189,248,0.10)', 'rgba(132,204,22,0.08)', 'rgba(163,230,53,0.10)'];
  blocks.forEach((b, i) => {
    ctx.fillStyle = blockColors[i % blockColors.length];
    ctx.fillRect(dx + b[0] * step + 2, dy + b[1] * step + 2, b[2] * step - 4, b[3] * step - 4);
  });

  // "AD" Monogram
  ctx.shadowColor = '#84cc16';
  ctx.shadowBlur = 32;
  ctx.fillStyle = '#84cc16';
  ctx.font = '900 220px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AD', SIZE / 2, SIZE / 2 - 20);
  ctx.shadowBlur = 0;

  // Label below monogram
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.fillText('COMPUTATIONAL CORE', SIZE / 2, SIZE / 2 + 130);

  ctx.fillStyle = '#84cc16';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('ARYAN DADWAL · v1.0', SIZE / 2, SIZE / 2 + 160);

  // Bottom status bar
  ctx.fillStyle = 'rgba(132,204,22,0.15)';
  ctx.fillRect(dx, dy + dh - 46, dw, 46);
  ctx.fillStyle = '#a3e635';
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: ACTIVE  ·  NODE: PRIMARY  ·  THERMAL: NOMINAL', SIZE / 2, dy + dh - 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createHudPanelTexture(title, number, items = []) {
  const W = 640, H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(4, 10, 8, 0.94)';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, W - 16, H - 16);

  ctx.strokeStyle = 'rgba(132,204,22,0.3)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(18, 18, W - 36, H - 36);

  const b = 28;
  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(8, 8 + b); ctx.lineTo(8, 8); ctx.lineTo(8 + b, 8);
  ctx.moveTo(W - 8 - b, 8); ctx.lineTo(W - 8, 8); ctx.lineTo(W - 8, 8 + b);
  ctx.moveTo(8, H - 8 - b); ctx.lineTo(8, H - 8); ctx.lineTo(8 + b, H - 8);
  ctx.moveTo(W - 8 - b, H - 8); ctx.lineTo(W - 8, H - 8); ctx.lineTo(W - 8, H - 8 - b);
  ctx.stroke();

  ctx.fillStyle = '#84cc16';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(number, 28, 30);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(title, 28, 54);

  ctx.strokeStyle = 'rgba(132,204,22,0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(28, 98); ctx.lineTo(W - 28, 98);
  ctx.stroke();

  let y = 120;
  items.forEach((item) => {
    ctx.fillStyle = 'rgba(132,204,22,0.10)';
    ctx.fillRect(28, y - 12, W - 56, 30);
    ctx.strokeStyle = 'rgba(132,204,22,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(28, y - 12, W - 56, 30);

    ctx.fillStyle = '#84cc16';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText('◈ ' + item, 40, y + 3);
    y += 40;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function EngineeringWorld3D() {
  const mountRef = useRef(null);
  const scrollRatioRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL availability check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch (_) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // ── RENDERER ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2.0));
    renderer.setClearColor(0x030507, 1);
    container.appendChild(renderer.domElement);

    // ── SCENE & FOG ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030507, 0.010);

    // ── CAMERA (Elevated Isometric Perspective) ───────────────────────────
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(34, aspect, 0.5, 600);
    const baseCamPos = new THREE.Vector3(28, 34, 28);
    const baseLookAt = new THREE.Vector3(1, 1, 0);
    camera.position.copy(baseCamPos);
    camera.lookAt(baseLookAt);

    // ── LIGHTING ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x080e0a, 1.4);
    scene.add(ambientLight);

    // Core pulsing neon-lime point light
    const coreLight = new THREE.PointLight(0x84cc16, 30, 44);
    coreLight.position.set(0, 5, 0);
    scene.add(coreLight);

    // Secondary lime fill from below
    const coreLightLow = new THREE.PointLight(0x84cc16, 8, 22);
    coreLightLow.position.set(0, -2, 0);
    scene.add(coreLightLow);

    // Key directional (cyan/steel blue) reflecting metallic bevels
    const keyDir = new THREE.DirectionalLight(0x38bdf8, 1.8);
    keyDir.position.set(24, 40, -18);
    scene.add(keyDir);

    // Warm lime fill opposite
    const fillDir = new THREE.DirectionalLight(0x84cc16, 1.4);
    fillDir.position.set(-22, 30, 24);
    scene.add(fillDir);

    // Deep back-light for depth
    const backLight = new THREE.DirectionalLight(0x0f2a1a, 3);
    backLight.position.set(0, -10, -30);
    scene.add(backLight);

    // ── MATERIALS ─────────────────────────────────────────────────────────
    const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x0b1014, roughness: 0.28, metalness: 0.92 });
    const heatsinkMat  = new THREE.MeshStandardMaterial({ color: 0x151d2a, roughness: 0.18, metalness: 0.96 });
    const chassisMat   = new THREE.MeshStandardMaterial({ color: 0x0f1520, roughness: 0.38, metalness: 0.82 });
    const goldMat      = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.22, metalness: 0.97 });
    const silverMat    = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.28, metalness: 0.92 });
    const siliconMat   = new THREE.MeshStandardMaterial({ color: 0x071408, emissive: 0x84cc16, emissiveIntensity: 0.45, roughness: 0.18, metalness: 0.88 });
    const conduitMat   = new THREE.MeshStandardMaterial({ color: 0x0f2012, emissive: 0x84cc16, emissiveIntensity: 0.85, roughness: 0.28, metalness: 0.72 });
    const limeMat      = new THREE.MeshBasicMaterial({ color: 0xa3e635 });
    const cyanMat      = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const whiteGlowMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const lineMatLime  = new THREE.LineBasicMaterial({ color: 0x84cc16, transparent: true, opacity: 0.7 });
    const lineMatCyan  = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const lineMatGold  = new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.55 });

    // ─────────────────────────────────────────────────────────────────────
    // 1. MOTHERBOARD FLOOR — Solid PCB with detail layer
    // ─────────────────────────────────────────────────────────────────────
    // Main PCB slab
    const groundGeo = new THREE.BoxGeometry(70, 0.5, 70);
    scene.add(new THREE.Mesh(groundGeo, darkMetalMat));

    // PCB layer lip (slightly lighter frame showing board layers)
    const pcbEdgeGeo = new THREE.BoxGeometry(70, 0.15, 70);
    const pcbEdgeMat = new THREE.MeshStandardMaterial({ color: 0x0d2415, roughness: 0.45, metalness: 0.6 });
    const pcbEdge = new THREE.Mesh(pcbEdgeGeo, pcbEdgeMat);
    pcbEdge.position.y = -0.32;
    scene.add(pcbEdge);

    // ── Orthogonal Circuit Trace Network (Manhattan routing)
    const tracePoints = [];
    const coords = [-24, -18, -12, -6, 6, 12, 18, 24];
    coords.forEach((v) => {
      tracePoints.push(new THREE.Vector3(v, 0.1, -30), new THREE.Vector3(v, 0.1, v * 0.35));
      tracePoints.push(new THREE.Vector3(v, 0.1, v * 0.35), new THREE.Vector3(Math.sign(v) * 32, 0.1, v * 0.35));
      tracePoints.push(new THREE.Vector3(-30, 0.1, v), new THREE.Vector3(v * 0.35, 0.1, v));
      tracePoints.push(new THREE.Vector3(v * 0.35, 0.1, v), new THREE.Vector3(v * 0.35, 0.1, Math.sign(v) * 30));
    });
    // Extra dense trace cluster around CPU center
    for (let i = -4; i <= 4; i++) {
      tracePoints.push(new THREE.Vector3(i * 1.2, 0.1, -6.5), new THREE.Vector3(i * 1.2, 0.1, -10));
      tracePoints.push(new THREE.Vector3(-6.5, 0.1, i * 1.2), new THREE.Vector3(-10, 0.1, i * 1.2));
      tracePoints.push(new THREE.Vector3(i * 1.2, 0.1, 6.5), new THREE.Vector3(i * 1.2, 0.1, 10));
      tracePoints.push(new THREE.Vector3(6.5, 0.1, i * 1.2), new THREE.Vector3(10, 0.1, i * 1.2));
    }
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tracePoints), lineMatLime));

    // ── Gold solder pads & SMD chips
    const padGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.09, 12);
    const padMesh = new THREE.InstancedMesh(padGeo, goldMat, 40);
    const smdGeo = new THREE.BoxGeometry(0.38, 0.2, 0.22);
    const smdMesh = new THREE.InstancedMesh(smdGeo, heatsinkMat, 40);
    const dummy = new THREE.Object3D();
    let pi = 0;
    for (let px = -24; px <= 24; px += 6) {
      for (let pz = -24; pz <= 24; pz += 6) {
        if (Math.abs(px) < 7 && Math.abs(pz) < 7) continue;
        if (pi < 40) {
          dummy.position.set(px, 0.05, pz);
          dummy.rotation.y = Math.random() * Math.PI;
          dummy.updateMatrix();
          padMesh.setMatrixAt(pi, dummy.matrix);
          dummy.position.set(px + 0.55, 0.1, pz + 0.2);
          dummy.updateMatrix();
          smdMesh.setMatrixAt(pi, dummy.matrix);
          pi++;
        }
      }
    }
    padMesh.instanceMatrix.needsUpdate = true;
    smdMesh.instanceMatrix.needsUpdate = true;
    scene.add(padMesh);
    scene.add(smdMesh);

    // ── PCIe slot connector strips (at board edges)
    const pciSlotGeo = new THREE.BoxGeometry(18, 0.35, 0.55);
    const pciSlotMat = new THREE.MeshStandardMaterial({ color: 0x1a2530, roughness: 0.5, metalness: 0.7 });
    [{ x: 0, z: -28 }, { x: 0, z: 26 }].forEach(({ x, z }) => {
      const slot = new THREE.Mesh(pciSlotGeo, pciSlotMat);
      slot.position.set(x, 0.17, z);
      scene.add(slot);
      // Gold connector contacts
      for (let ci = -8; ci <= 8; ci += 1.8) {
        const contactGeo = new THREE.BoxGeometry(0.14, 0.22, 0.5);
        const contact = new THREE.Mesh(contactGeo, goldMat);
        contact.position.set(x + ci, 0.18, z);
        scene.add(contact);
      }
    });

    // ─────────────────────────────────────────────────────────────────────
    // 2. CENTRAL CPU PROCESSOR — Multi-layer, highly detailed
    // ─────────────────────────────────────────────────────────────────────
    const cpuGroup = new THREE.Group();
    scene.add(cpuGroup);

    // Layer 1: LGA Contact Grid Substrate (thickest bottom layer)
    const socketGeo = new THREE.BoxGeometry(12, 0.75, 12);
    cpuGroup.add(new THREE.Mesh(socketGeo, darkMetalMat).translateY(0.375));

    // LGA pin contacts — dense 2D grid on socket face
    const pinGeo = new THREE.BoxGeometry(0.12, 0.3, 0.12);
    for (let px = -5.2; px <= 5.2; px += 0.52) {
      for (let pz = -5.2; pz <= 5.2; pz += 0.52) {
        const pin = new THREE.Mesh(pinGeo, goldMat);
        pin.position.set(px, 0.15, pz);
        cpuGroup.add(pin);
      }
    }

    // Layer 2: PCB Substrate (green-tinted, narrower)
    const substrateGeo = new THREE.BoxGeometry(11.2, 0.4, 11.2);
    const substrateMat = new THREE.MeshStandardMaterial({ color: 0x0a1f0e, roughness: 0.5, metalness: 0.4 });
    const substrateMesh = new THREE.Mesh(substrateGeo, substrateMat);
    substrateMesh.position.y = 0.95;
    cpuGroup.add(substrateMesh);
    // Substrate trace lines (visible on edge)
    const subEdgeGeo = new THREE.EdgesGeometry(substrateGeo);
    const subEdge = new THREE.LineSegments(subEdgeGeo, lineMatLime);
    subEdge.position.y = 0.95;
    cpuGroup.add(subEdge);

    // Layer 3: IHS — Integrated Heat Spreader
    const spreaderGeo = new THREE.BoxGeometry(9.6, 0.8, 9.6);
    const spreaderMesh = new THREE.Mesh(spreaderGeo, heatsinkMat);
    spreaderMesh.position.y = 1.55;
    cpuGroup.add(spreaderMesh);
    // IHS surface detail — cross-hatch engraving
    const ihsDetailPoints = [];
    for (let d = -4.4; d <= 4.4; d += 0.8) {
      ihsDetailPoints.push(new THREE.Vector3(d, 1.97, -4.4), new THREE.Vector3(d, 1.97, 4.4));
      ihsDetailPoints.push(new THREE.Vector3(-4.4, 1.97, d), new THREE.Vector3(4.4, 1.97, d));
    }
    const ihsDetailGeo = new THREE.BufferGeometry().setFromPoints(ihsDetailPoints);
    scene.add(new THREE.LineSegments(ihsDetailGeo, new THREE.LineBasicMaterial({ color: 0x1e3828, transparent: true, opacity: 0.6 })));

    // Layer 4: Heatsink with solid aluminum fins
    const hsBaseGeo = new THREE.BoxGeometry(8.8, 0.5, 8.8);
    const hsMesh = new THREE.Mesh(hsBaseGeo, heatsinkMat);
    hsMesh.position.y = 2.6;
    cpuGroup.add(hsMesh);
    // Fins (horizontal slabs stacked)
    for (let f = 0; f < 7; f++) {
      const finGeo = new THREE.BoxGeometry(8.6, 0.22, 8.6 - f * 0.5);
      const fin = new THREE.Mesh(finGeo, heatsinkMat);
      fin.position.y = 3.0 + f * 0.38;
      cpuGroup.add(fin);
    }
    // Heatsink heatpipes (copper cylinders)
    const heatpipeGeo = new THREE.CylinderGeometry(0.28, 0.28, 5.8, 12);
    const heatpipeMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.2, metalness: 0.98 });
    [-2.2, 0, 2.2].forEach((offset) => {
      const hp = new THREE.Mesh(heatpipeGeo, heatpipeMat);
      hp.rotation.z = Math.PI / 2;
      hp.position.set(offset, 3.8, 0);
      cpuGroup.add(hp);
    });

    // Layer 5: Silicon Die exposed (visible top of IHS for texture)
    const cpuDieTex = createCpuDieTexture();
    const dieGeo = new THREE.BoxGeometry(6.4, 0.65, 6.4);
    const dieTopMat = new THREE.MeshBasicMaterial({ map: cpuDieTex });
    const dieMesh = new THREE.Mesh(dieGeo, [siliconMat, siliconMat, dieTopMat, siliconMat, siliconMat, siliconMat]);
    dieMesh.position.y = 1.95;
    cpuGroup.add(dieMesh);

    // Electrolytic capacitors (around CPU socket - 8 positions)
    const capGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.4, 12);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x1a2b3c, roughness: 0.35, metalness: 0.7 });
    const capTopGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 12);
    const capTopMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.3, metalness: 0.85, emissive: 0x1e40af, emissiveIntensity: 0.3 });
    const capPositions = [
      [-6.2, 0], [6.2, 0], [0, -6.2], [0, 6.2],
      [-6.2, -6.2], [6.2, -6.2], [-6.2, 6.2], [6.2, 6.2],
    ];
    capPositions.forEach(([cx, cz]) => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(cx, 0.7, cz);
      cpuGroup.add(cap);
      const capTop = new THREE.Mesh(capTopGeo, capTopMat);
      capTop.position.set(cx, 1.45, cz);
      cpuGroup.add(capTop);
    });

    // MOSFET power regulators (large rectangular chips around socket)
    const mosfetGeo = new THREE.BoxGeometry(1.2, 0.5, 0.8);
    const mosfetMat = new THREE.MeshStandardMaterial({ color: 0x0c1520, roughness: 0.3, metalness: 0.85 });
    [[-5, 0.25, -4], [5, 0.25, -4], [-5, 0.25, 4], [5, 0.25, 4]].forEach(([mx, my, mz]) => {
      const m = new THREE.Mesh(mosfetGeo, mosfetMat);
      m.position.set(mx, my, mz);
      cpuGroup.add(m);
    });

    // Power inductor coils
    const inductorGeo = new THREE.BoxGeometry(1.0, 0.8, 1.0);
    const inductorMat = new THREE.MeshStandardMaterial({ color: 0x18202e, roughness: 0.4, metalness: 0.75 });
    [[-7, 0.4, -2], [7, 0.4, -2], [-7, 0.4, 2], [7, 0.4, 2]].forEach(([ix, iy, iz]) => {
      const ind = new THREE.Mesh(inductorGeo, inductorMat);
      ind.position.set(ix, iy, iz);
      cpuGroup.add(ind);
      // Glowing top indicator
      const indTopGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.1, 10);
      const indTop = new THREE.Mesh(indTopGeo, limeMat);
      indTop.position.set(ix, iy + 0.45, iz);
      cpuGroup.add(indTop);
    });

    // Rotating perimeter ring (mechanical trim)
    const mechRingGeo = new THREE.TorusGeometry(5.5, 0.075, 8, 64);
    const mechRingMesh = new THREE.Mesh(mechRingGeo, limeMat);
    mechRingMesh.rotation.x = Math.PI / 2;
    mechRingMesh.position.y = 1.95;
    cpuGroup.add(mechRingMesh);

    // Secondary inner ring
    const innerRingGeo = new THREE.TorusGeometry(3.6, 0.05, 8, 48);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, cyanMat);
    innerRingMesh.rotation.x = Math.PI / 2;
    innerRingMesh.position.y = 2.0;
    cpuGroup.add(innerRingMesh);

    // ─────────────────────────────────────────────────────────────────────
    // 3. COMPUTING TOWER MODULES
    // ─────────────────────────────────────────────────────────────────────
    const modules = [
      { x: -13, z: -11, w: 5.5, h: 5.0, d: 5.5, name: 'AboutUnit' },
      { x:  13, z: -12, w: 5.5, h: 5.5, d: 5.5, name: 'SkillsUnit' },
      { x: -15, z:   9, w: 5.8, h: 5.8, d: 5.8, name: 'ProjectsUnit' },
      { x:  14, z:  10, w: 5.6, h: 6.0, d: 5.6, name: 'ArchUnit' },
      { x:  -7, z: -20, w: 4.4, h: 9.0, d: 4.4, name: 'BgTower1' },
      { x:   7, z: -20, w: 4.4, h: 10.0, d: 4.4, name: 'BgTower2' },
      { x:   0, z: -24, w: 6.0, h: 12.5, d: 6.0, name: 'BgTowerCenter' },
    ];

    const hardwareGroups = [];
    modules.forEach((mod) => {
      const group = new THREE.Group();
      group.position.set(mod.x, 0, mod.z);

      // Main chassis block
      const body = new THREE.Mesh(new THREE.BoxGeometry(mod.w, mod.h, mod.d), chassisMat);
      body.position.y = mod.h / 2;
      group.add(body);

      // Front panel overlay (slightly different material for depth)
      const frontGeo = new THREE.BoxGeometry(mod.w * 0.9, mod.h * 0.85, 0.12);
      const frontMat = new THREE.MeshStandardMaterial({ color: 0x0d1828, roughness: 0.45, metalness: 0.75 });
      const front = new THREE.Mesh(frontGeo, frontMat);
      front.position.set(0, mod.h / 2, mod.d / 2 + 0.05);
      group.add(front);

      // Stepped heatsink cap
      const cap1 = new THREE.Mesh(new THREE.BoxGeometry(mod.w * 0.82, 0.45, mod.d * 0.82), heatsinkMat);
      cap1.position.y = mod.h + 0.22;
      group.add(cap1);
      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(mod.w * 0.65, 0.3, mod.d * 0.65), heatsinkMat);
      cap2.position.y = mod.h + 0.52;
      group.add(cap2);

      // Glowing status light on cap
      const sLight = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.14, 10), limeMat);
      sLight.position.y = mod.h + 0.68;
      group.add(sLight);

      // Horizontal vent slots (server rack aesthetics)
      const numVents = Math.min(5, Math.floor(mod.h / 1.2));
      for (let v = 1; v <= numVents; v++) {
        const ventY = (mod.h / (numVents + 1)) * v;
        const vent = new THREE.Mesh(
          new THREE.BoxGeometry(mod.w * 0.75, 0.09, mod.d + 0.05),
          v % 2 === 0 ? limeMat : cyanMat
        );
        vent.position.y = ventY;
        group.add(vent);
      }

      // Small SMD chip row on front face
      for (let ci = -1.5; ci <= 1.5; ci += 1.0) {
        const chip = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.22, 0.18),
          new THREE.MeshStandardMaterial({ color: 0x0c1a14, roughness: 0.35, metalness: 0.8, emissive: 0x84cc16, emissiveIntensity: 0.15 })
        );
        chip.position.set(ci, mod.h * 0.25, mod.d / 2 + 0.16);
        group.add(chip);
      }

      scene.add(group);
      hardwareGroups.push({ group, mod });
    });

    // ─────────────────────────────────────────────────────────────────────
    // 4. CONDUIT PIPES & LIGHT RUNNERS
    // ─────────────────────────────────────────────────────────────────────
    const conduitCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6.0, 0.85, -2.5),
        new THREE.Vector3(-9.5, 0.85, -2.5),
        new THREE.Vector3(-9.5, 1.3, -8.0),
        new THREE.Vector3(-13.0, 1.3, -8.5),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(6.0, 0.85, -2.5),
        new THREE.Vector3(9.5, 0.85, -2.5),
        new THREE.Vector3(9.5, 1.3, -8.5),
        new THREE.Vector3(12.5, 1.3, -9.0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6.0, 0.85, 2.5),
        new THREE.Vector3(-9.5, 0.85, 2.5),
        new THREE.Vector3(-9.5, 1.3, 7.0),
        new THREE.Vector3(-14.0, 1.3, 7.2),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(6.0, 0.85, 2.5),
        new THREE.Vector3(9.5, 0.85, 2.5),
        new THREE.Vector3(9.5, 1.3, 7.5),
        new THREE.Vector3(13.0, 1.3, 7.8),
      ]),
    ];

    const conduitGeos = [];
    conduitCurves.forEach((curve) => {
      const pipeGeo = new THREE.TubeGeometry(curve, 40, 0.1, 8, false);
      scene.add(new THREE.Mesh(pipeGeo, conduitMat));
      conduitGeos.push(pipeGeo);
    });

    // Light runner packets
    const runnerGeo = new THREE.SphereGeometry(0.22, 8, 8);
    const runners = [];
    const NUM_RUNNERS = isMobile ? 10 : 24;
    for (let r = 0; r < NUM_RUNNERS; r++) {
      const cIdx = r % conduitCurves.length;
      const isLime = r % 3 !== 0;
      const runner = new THREE.Mesh(runnerGeo, isLime ? limeMat : cyanMat);
      scene.add(runner);
      runners.push({
        mesh: runner,
        curve: conduitCurves[cIdx],
        progress: r / NUM_RUNNERS,
        speed: 0.10 + (r % 5) * 0.025,
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // 5. HOLOGRAPHIC HUD PANELS
    // ─────────────────────────────────────────────────────────────────────
    const hudConfigs = [
      { title: 'ABOUT', number: '01', items: ['B.TECH CSE · LPU PHAGWARA', 'CGPA: 7.07', 'CLASS OF 2028'], x: -10.0, y: 8.0, z: -9.0, rotY: 0.35 },
      { title: 'SKILLS', number: '02', items: ['MERN STACK · REACT.JS', 'JAVA · DSA · DFS · RECURSION', 'REST APIS · MONGODB'], x: 11.5, y: 8.5, z: -9.5, rotY: -0.38 },
      { title: 'PROJECTS', number: '03', items: ['CAREER GUIDANCE SYSTEM', 'STOCKSENSE AI', 'MAZE SOLVER (JAVA/DFS)'], x: -13.5, y: 9.0, z: 7.8, rotY: 0.4 },
      { title: 'ARCHITECTURE', number: '04', items: ['DECOUPLED REST TIERS', 'WEIGHTED-SUM SCORING', 'RENDER CLOUD CI/CD'], x: 12.5, y: 9.2, z: 8.5, rotY: -0.4 },
      { title: 'CONTACT', number: '05', items: ['ARYANDADWAL709@GMAIL.COM', '+91 8626963353', 'LINKEDIN · GITHUB'], x: 0, y: 7.5, z: 16.0, rotY: 0 },
    ];

    const panelGeo = new THREE.PlaneGeometry(5.2, 2.9);
    const panelFrameGeo = new THREE.EdgesGeometry(panelGeo);
    const hudPanels = [];

    hudConfigs.forEach((cfg, idx) => {
      const tex = createHudPanelTexture(cfg.title, cfg.number, cfg.items);
      const pMesh = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, side: THREE.DoubleSide }));
      pMesh.position.set(cfg.x, cfg.y, cfg.z);
      pMesh.rotation.y = cfg.rotY;
      pMesh.rotation.x = -0.14;
      pMesh.add(new THREE.LineSegments(panelFrameGeo, lineMatLime));
      scene.add(pMesh);
      hudPanels.push({ mesh: pMesh, tex, baseY: cfg.y, phase: idx * 1.25 });
    });

    // ─────────────────────────────────────────────────────────────────────
    // 6. FLOATING DATA CUBES
    // ─────────────────────────────────────────────────────────────────────
    const cubeConfigs = [
      { x: -5.5, y: 5.5, z: -5.5, s: 1.2 },
      { x:  6.5, y: 6.2, z: -4.5, s: 1.4 },
      { x: -7.5, y: 6.8, z:  6.5, s: 1.3 },
      { x:  7.5, y: 6.0, z:  6.2, s: 1.1 },
    ];
    const dataCubes = [];
    cubeConfigs.forEach(({ x, y, z, s }, i) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      const boxGeo = new THREE.BoxGeometry(s, s, s);
      const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), i % 2 === 0 ? lineMatLime : lineMatCyan);
      group.add(wireframe);
      const innerChip = new THREE.Mesh(new THREE.BoxGeometry(s * 0.42, s * 0.42, s * 0.42), i % 2 === 0 ? limeMat : cyanMat);
      group.add(innerChip);
      scene.add(group);
      dataCubes.push({ group, baseY: y, phase: i * 1.5, rxSpeed: 0.45 + i * 0.2, rySpeed: 0.65 + i * 0.15 });
    });

    // ─────────────────────────────────────────────────────────────────────
    // 7. AMBIENT PARTICLES
    // ─────────────────────────────────────────────────────────────────────
    const pCount = isMobile ? 500 : 1200;
    const pPos = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      pPos[p * 3]     = (Math.random() - 0.5) * 64;
      pPos[p * 3 + 1] = Math.random() * 30 + 0.5;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 64;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x84cc16, size: 0.1, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // ─────────────────────────────────────────────────────────────────────
    // 8. SCROLL-DRIVEN CAMERA CHOREOGRAPHY
    // ─────────────────────────────────────────────────────────────────────
    const WAYPOINTS = [
      { s: 0.00, pos: new THREE.Vector3(28, 34, 28), look: new THREE.Vector3(1, 2, 0) },   // Hero — full overview
      { s: 0.18, pos: new THREE.Vector3(14, 22, 20), look: new THREE.Vector3(-6, 3, -4) },  // About
      { s: 0.36, pos: new THREE.Vector3(20, 24, 14), look: new THREE.Vector3(6, 3, -5) },   // Skills
      { s: 0.55, pos: new THREE.Vector3(12, 20, 22), look: new THREE.Vector3(-6, 2, 6) },   // Projects
      { s: 0.74, pos: new THREE.Vector3(22, 26, 16), look: new THREE.Vector3(6, 2, 6) },    // Architecture
      { s: 1.00, pos: new THREE.Vector3(30, 38, 30), look: new THREE.Vector3(0, 1, 0) },    // Contact / End
    ];

    const currentCamPos = baseCamPos.clone();
    const currentLookAt = baseLookAt.clone();
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRatioRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─────────────────────────────────────────────────────────────────────
    // 9. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────
    let rafId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // CPU core rotation & pulse
        mechRingMesh.rotation.z += delta * 0.5;
        innerRingMesh.rotation.z -= delta * 0.35;
        coreLight.intensity = 26 + 10 * Math.sin(t * 2.6);
        coreLightLow.intensity = 6 + 3 * Math.sin(t * 1.8 + 1.5);
        dieMesh.position.y = 1.95 + 0.03 * Math.sin(t * 2.0);

        // Light runners along conduits
        runners.forEach((r) => {
          r.progress = (r.progress + delta * r.speed) % 1.0;
          r.mesh.position.copy(r.curve.getPointAt(r.progress));
        });

        // HUD panel hover
        hudPanels.forEach((p) => {
          p.mesh.position.y = p.baseY + Math.sin(t * 1.4 + p.phase) * 0.24;
        });

        // Data cube rotation
        dataCubes.forEach((c) => {
          c.group.rotation.x += delta * c.rxSpeed;
          c.group.rotation.y += delta * c.rySpeed;
          c.group.position.y = c.baseY + Math.sin(t * 1.3 + c.phase) * 0.3;
        });
      }

      // Camera waypoint scroll interpolation
      const s = scrollRatioRef.current;
      let wpA = WAYPOINTS[0], wpB = WAYPOINTS[WAYPOINTS.length - 1];
      for (let w = 0; w < WAYPOINTS.length - 1; w++) {
        if (s >= WAYPOINTS[w].s && s <= WAYPOINTS[w + 1].s) {
          wpA = WAYPOINTS[w];
          wpB = WAYPOINTS[w + 1];
          break;
        }
      }
      const frac = wpB.s > wpA.s ? (s - wpA.s) / (wpB.s - wpA.s) : 0;
      targetCamPos.lerpVectors(wpA.pos, wpB.pos, frac);
      targetLookAt.lerpVectors(wpA.look, wpB.look, frac);

      // Mouse parallax
      if (!isMobile) {
        const mx = mouseRef.current.x * 2.5;
        const my = mouseRef.current.y * 1.6;
        targetCamPos.x += mx;
        targetCamPos.y += my;
        targetLookAt.x += mx * 0.22;
      }

      currentCamPos.lerp(targetCamPos, 0.042);
      currentLookAt.lerp(targetLookAt, 0.042);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };
    animate();

    // ─────────────────────────────────────────────────────────────────────
    // 10. RESIZE HANDLER
    // ─────────────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ─────────────────────────────────────────────────────────────────────
    // 11. CLEANUP
    // ─────────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
