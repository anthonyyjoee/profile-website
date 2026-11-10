"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { sound } from "@/utils/sound";

export default function DeskAnatomy() {
  const mountRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousMouseXRef = useRef(0);
  const targetAzimuthRef = useRef(42 * (Math.PI / 180));
  const currentAzimuthRef = useRef(42 * (Math.PI / 180));
  const autoRotateRef = useRef(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const developerHandsRef = useRef<THREE.Group | null>(null);
  const mainScreenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const portraitScreenTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Helper to create the 32" main IDE screen texture
  const createMainScreenCanvas = useCallback((): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Background editor canvas
    ctx.fillStyle = "#121214";
    ctx.fillRect(0, 0, 512, 320);

    // Title bar / Tabs
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, 512, 30);

    // Tabs
    ctx.fillStyle = "#222226";
    ctx.fillRect(10, 5, 110, 25);
    ctx.fillStyle = "#8ddd8d";
    ctx.fillRect(10, 28, 110, 2);
    ctx.fillStyle = "#fbfbfb";
    ctx.font = "bold 12px monospace";
    ctx.fillText("page.tsx", 25, 21);

    ctx.fillStyle = "#1a1a1e";
    ctx.fillRect(125, 5, 110, 25);
    ctx.fillStyle = "#8e8e93";
    ctx.font = "12px monospace";
    ctx.fillText("portfolio.ts", 138, 21);

    // Sidebar & Line numbers
    ctx.fillStyle = "#161619";
    ctx.fillRect(0, 30, 42, 290);

    ctx.fillStyle = "#52525e";
    ctx.font = "11px monospace";
    for (let i = 1; i <= 14; i++) {
      ctx.fillText(String(i).padStart(2, "0"), 12, 35 + i * 19);
    }

    // Code lines with vibrant syntax colors
    const codeLines = [
      { text: "export default function Hero() {", color: "#6066ee" },
      { text: "  const [status, setStatus] = useState('live');", color: "#faaafa" },
      { text: "  const engineer = 'Anthony';", color: "#e0e055" },
      { text: "  // Built with Next.js & Cloudflare edge", color: "#727278" },
      { text: "  useEffect(() => {", color: "#8ddd8d" },
      { text: "    console.log('Dual monitors ready');", color: "#8ddd8d" },
      { text: "    shipCode({ target: 'production' });", color: "#6066ee" },
      { text: "  }, []);", color: "#fbfbfb" },
      { text: "  return (", color: "#faaafa" },
      { text: "    <Workstation dualDisplay={true}>", color: "#8ddd8d" },
      { text: "      <MacMini m4Pro={true} />", color: "#e0e055" },
      { text: "      <Coffee powered={true} />", color: "#faaafa" },
      { text: "    </Workstation>", color: "#8ddd8d" },
      { text: "  );", color: "#fbfbfb" },
    ];

    ctx.font = "12px monospace";
    codeLines.forEach((line, idx) => {
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 54, 54 + idx * 19);
    });

    // Blinking cursor
    ctx.fillStyle = "#e0e055";
    ctx.fillRect(120, 283, 7, 14);

    return canvas;
  }, []);

  // Helper to create the 27" vertical portrait terminal screen texture
  const createPortraitScreenCanvas = useCallback((): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Dark terminal background
    ctx.fillStyle = "#0e0e11";
    ctx.fillRect(0, 0, 320, 512);

    // Terminal header
    ctx.fillStyle = "#18181c";
    ctx.fillRect(0, 0, 320, 28);
    // Window dots
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(14, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(28, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(42, 14, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#8e8e93";
    ctx.font = "11px monospace";
    ctx.fillText("zsh - anthony@macbook", 65, 18);

    // Terminal streams
    const logs = [
      { text: "anthony@studio ~/profile $ pnpm build", color: "#8ddd8d" },
      { text: "▲ Next.js 16.4.5 (webpack)", color: "#fbfbfb" },
      { text: "✓ Static pages exported: 4/4", color: "#8ddd8d" },
      { text: "✓ Output: /out", color: "#8e8e93" },
      { text: "", color: "" },
      { text: "Cloudflare Pages deployment:", color: "#6066ee" },
      { text: "Uploading 28 static assets...", color: "#e0e055" },
      { text: "✓ Success! Hash: c25f1e39", color: "#8ddd8d" },
      { text: "URL: https://anthony.dev", color: "#6066ee" },
      { text: "", color: "" },
      { text: "[METRICS] CPU: 12% | RAM: 18.2GB", color: "#faaafa" },
      { text: "[TELEMETRY] 60 FPS • Edge CDN Live", color: "#8ddd8d" },
      { text: "[DOCKER] 3 containers healthy", color: "#8e8e93" },
      { text: "Watching files for changes...", color: "#727278" },
      { text: "❯ git status -s", color: "#8ddd8d" },
      { text: "M src/app/page.tsx", color: "#e0e055" },
      { text: "Working tree clean.", color: "#8e8e93" },
      { text: "❯ _", color: "#e0e055" },
    ];

    ctx.font = "11px monospace";
    logs.forEach((log, idx) => {
      ctx.fillStyle = log.color || "#8e8e93";
      ctx.fillText(log.text, 12, 48 + idx * 22);
    });

    return canvas;
  }, []);

  // Helper to create rich light brown wood grain texture for desktop and desk shelf
  const createLightBrownWoodCanvas = useCallback((): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // 1. Warm golden light brown base tone (honey teak / natural light oak)
    ctx.fillStyle = "#ba946a";
    ctx.fillRect(0, 0, 1024, 512);

    // 2. Multi-tone timber plank shading bands
    const plankHeight = 512 / 3;
    for (let p = 0; p < 3; p++) {
      const py = p * plankHeight;
      const plankTint = p % 2 === 0 ? "rgba(204, 174, 138, 0.28)" : "rgba(160, 126, 88, 0.24)";
      ctx.fillStyle = plankTint;
      ctx.fillRect(0, py, 1024, plankHeight);

      // Subtle plank groove line
      ctx.strokeStyle = "rgba(95, 70, 42, 0.4)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(1024, py);
      ctx.stroke();
    }

    // 3. Flowing longitudinal wood grain lines along the length of the desk
    const grainPalette = [
      "rgba(142, 108, 72, 0.65)",  // Medium light brown grain
      "rgba(104, 76, 46, 0.72)",   // Deep oak timber grain
      "rgba(215, 186, 150, 0.52)", // Warm golden amber highlight
      "rgba(82, 58, 34, 0.58)",    // Distinct dark grain fiber
      "rgba(168, 132, 94, 0.5)",   // Soft honey-brown grain
    ];

    for (let y = 0; y < 512; y += 4) {
      const strokeColor = grainPalette[Math.floor((y / 10) % grainPalette.length)];
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.3 + (y % 6 === 0 ? 1.0 : 0);
      ctx.beginPath();
      ctx.moveTo(0, y);

      for (let x = 0; x <= 1024; x += 32) {
        // Natural timber sinusoidal wave
        const wave =
          Math.sin(x * 0.008 + y * 0.05) * 4.5 +
          Math.sin(x * 0.02) * 2.2 +
          Math.sin(x * 0.003) * 6;
        ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }

    // 4. Natural cathedral grain / growth ring arches (characteristic of sliced oak)
    ctx.lineWidth = 2.0;
    const archCenters = [
      { x: 280, y: 160, rx: 140, ry: 55 },
      { x: 740, y: 340, rx: 160, ry: 60 },
      { x: 512, y: 220, rx: 110, ry: 45 },
    ];

    archCenters.forEach((center) => {
      for (let ring = 1; ring <= 5; ring++) {
        ctx.strokeStyle = ring % 2 === 0 ? "rgba(95, 70, 42, 0.52)" : "rgba(212, 182, 146, 0.45)";
        ctx.beginPath();
        ctx.ellipse(center.x, center.y, center.rx * (ring / 5), center.ry * (ring / 5), 0.05, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 5. Fine timber pores and ray flecks
    ctx.fillStyle = "rgba(82, 58, 34, 0.4)";
    for (let i = 0; i < 750; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 512;
      const rw = 3 + Math.random() * 8;
      const rh = 1 + Math.random() * 1.5;
      ctx.fillRect(rx, ry, rw, rh);
    }

    return canvas;
  }, []);

  // Helper to create the classic self-healing green cutting mat texture
  const createCuttingMatCanvas = useCallback((): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 440;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // 1. Classic Olfa / self-healing craft cutting mat deep green
    ctx.fillStyle = "#1b4632";
    ctx.fillRect(0, 0, 960, 440);

    // Subtle edge bevel / darker border rim
    ctx.fillStyle = "#143727";
    ctx.fillRect(0, 0, 960, 16);
    ctx.fillRect(0, 424, 960, 16);
    ctx.fillRect(0, 0, 16, 440);
    ctx.fillRect(944, 0, 16, 440);

    // 2. Printed outer boundary box
    ctx.strokeStyle = "rgba(220, 245, 230, 0.45)";
    ctx.lineWidth = 1.6;
    ctx.strokeRect(24, 24, 912, 392);

    // 3. Minor grid lines (every 20px)
    ctx.strokeStyle = "rgba(200, 238, 215, 0.16)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let x = 44; x < 936; x += 20) {
      if ((x - 24) % 80 === 0) continue;
      ctx.moveTo(x, 24);
      ctx.lineTo(x, 416);
    }
    for (let y = 44; y < 416; y += 20) {
      if ((y - 24) % 80 === 0) continue;
      ctx.moveTo(24, y);
      ctx.lineTo(936, y);
    }
    ctx.stroke();

    // 4. Major grid lines (every 80px)
    ctx.strokeStyle = "rgba(230, 252, 240, 0.38)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 104; x < 936; x += 80) {
      ctx.moveTo(x, 24);
      ctx.lineTo(x, 416);
    }
    for (let y = 104; y < 416; y += 80) {
      ctx.moveTo(24, y);
      ctx.lineTo(936, y);
    }
    ctx.stroke();

    // 5. Diagonal cutting angle guide lines (45°, 30°, 60°)
    ctx.strokeStyle = "rgba(230, 252, 240, 0.3)";
    ctx.lineWidth = 1.0;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(24, 416);
    ctx.lineTo(416, 24);
    ctx.moveTo(936, 416);
    ctx.lineTo(544, 24);
    ctx.moveTo(480, 416);
    ctx.lineTo(872, 24);
    ctx.moveTo(480, 416);
    ctx.lineTo(88, 24);
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Ruler tick marks along perimeter border
    ctx.strokeStyle = "rgba(220, 245, 230, 0.4)";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    for (let x = 24; x <= 936; x += 10) {
      const tickLen = (x - 24) % 80 === 0 ? 8 : (x - 24) % 20 === 0 ? 5 : 3;
      ctx.moveTo(x, 24);
      ctx.lineTo(x, 24 + tickLen);
      ctx.moveTo(x, 416);
      ctx.lineTo(x, 416 - tickLen);
    }
    for (let y = 24; y <= 416; y += 10) {
      const tickLen = (y - 24) % 80 === 0 ? 8 : (y - 24) % 20 === 0 ? 5 : 3;
      ctx.moveTo(24, y);
      ctx.lineTo(24 + tickLen, y);
      ctx.moveTo(936, y);
      ctx.lineTo(936 - tickLen, y);
    }
    ctx.stroke();

    // 7. Technical corner stamp
    ctx.fillStyle = "rgba(210, 242, 224, 0.35)";
    ctx.font = "9px monospace";
    ctx.fillText("SELF-HEALING CUTTING MAT // CM-4822", 34, 408);
    ctx.fillText("ANTHONY DEV STUDIO", 760, 408);

    return canvas;
  }, []);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 460;

    // 1. Scene & Isometric Orthographic Camera
    const scene = new THREE.Scene();
    scene.background = null; // Transparent canvas blending into page

    // Helper to calculate responsive orthographic frustum dimensions
    const calculateFrustum = (w: number, h: number) => {
      const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const winH = typeof window !== "undefined" ? window.innerHeight : 800;

      // Adaptive base frustum according to viewport width and height
      // Smaller frustum = larger 3D model; larger frustum = zoom out for smaller screens
      let baseFrustum = 11.0;
      if (winW < 480 || winH < 600) {
        baseFrustum = 13.6; // Mobile phones
      } else if (winW < 768) {
        baseFrustum = 12.4; // Mobile landscape / small tablets
      } else if (winW < 1024) {
        baseFrustum = 11.6; // Tablets
      } else if (winW >= 1920) {
        baseFrustum = 9.8; // 2K / 4K monitors: scale up for monumental presence
      } else if (winW >= 1536) {
        baseFrustum = 10.4; // Large desktops
      }

      // Aspect-ratio containment (object-fit: contain for 3D)
      const targetAspect = 1.15;
      const currentAspect = w / h;

      let frustumW: number;
      let frustumH: number;

      if (currentAspect < targetAspect) {
        // Narrow container (mobile/portrait/narrow columns): preserve horizontal span
        frustumW = baseFrustum * targetAspect;
        frustumH = frustumW / currentAspect;
      } else {
        // Wide container: preserve vertical span
        frustumH = baseFrustum;
        frustumW = frustumH * currentAspect;
      }

      return { frustumW, frustumH };
    };

    const initialFrustum = calculateFrustum(width, height);
    const camera = new THREE.OrthographicCamera(
      -initialFrustum.frustumW / 2,
      initialFrustum.frustumW / 2,
      initialFrustum.frustumH / 2,
      -initialFrustum.frustumH / 2,
      0.1,
      100
    );

    // Standard 30° elevation isometric viewpoint
    const elevation = 28 * (Math.PI / 180);
    const cameraDistance = 24;
    camera.position.set(
      cameraDistance * Math.cos(elevation) * Math.sin(currentAzimuthRef.current),
      cameraDistance * Math.sin(elevation),
      cameraDistance * Math.cos(elevation) * Math.cos(currentAzimuthRef.current)
    );
    camera.lookAt(0, 2.7, 0.4);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Anatomy Four-Tone Studio Lighting (Neutral White, No Colored Tint)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(12, 20, 16);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    const d = 10;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // 4. Materials following the Anatomy craft rules
    // Procedural warm golden light brown wood grain texture for tabletop and desk shelf
    const woodCanvas = createLightBrownWoodCanvas();
    const woodTexture = new THREE.CanvasTexture(woodCanvas);
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(1.5, 1);

    const lightBrownWoodMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.42,
      metalness: 0.02,
    });
    // Classic Self-Healing Green Cutting Mat
    const matCanvas = createCuttingMatCanvas();
    const matTexture = new THREE.CanvasTexture(matCanvas);

    const deskMatMat = new THREE.MeshStandardMaterial({
      map: matTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const casterMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.9,
    });
    const steelLegMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b31,
      roughness: 0.3,
      metalness: 0.85,
    });
    const monitorMat = new THREE.MeshStandardMaterial({
      color: 0x222226, // Space Black / Matte Graphite (dark but not pure black)
      roughness: 0.35,
      metalness: 0.35,
    });
    const macMiniMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8de,
      roughness: 0.22,
      metalness: 0.9,
    });
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x242429,
      roughness: 0.5,
    });
    const keycapMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1e, // Matte dark charcoal mechanical keycaps
      roughness: 0.65,
    });
    const accentKeyMat = new THREE.MeshStandardMaterial({
      color: 0xe0e055,
      roughness: 0.35,
    });
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xb57b4f, // Anthony's natural tan skin tone
      roughness: 0.62,
      metalness: 0.02,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x171513, // Dark curly hair
      roughness: 0.9,
    });
    const tshirtMat = new THREE.MeshStandardMaterial({
      color: 0x18181b, // Matte studio black t-shirt
      roughness: 0.85,
      metalness: 0.02,
    });
    const tshirtTrimMat = new THREE.MeshStandardMaterial({
      color: 0x242428, // Ribbed collar & sleeve hem
      roughness: 0.8,
    });
    const shortsMat = new THREE.MeshStandardMaterial({
      color: 0x1d1d22, // Studio dark black/charcoal shorts
      roughness: 0.82,
      metalness: 0.03,
    });
    const sockMat = new THREE.MeshStandardMaterial({
      color: 0x161619, // Sleek studio matte black socks
      roughness: 0.82,
      metalness: 0.02,
    });
    const chairMeshMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c20,
      roughness: 0.8,
      metalness: 0.2,
    });
    const coffeeMugMat = new THREE.MeshStandardMaterial({
      color: 0xfafafa, // Crisp ceramic studio white
      roughness: 0.25,
      metalness: 0.02,
    });

    // 5. Workstation Root Group (Rotates in 3D around Y-axis)
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // --- A. THE DESK ---
    // Desktop Slab (7.2w x 0.22h x 3.8d) with Light Brown Wood Texture
    const deskGeo = new THREE.BoxGeometry(7.2, 0.22, 3.8);
    const deskMesh = new THREE.Mesh(deskGeo, lightBrownWoodMat);
    deskMesh.position.set(0, 3.0, 0);
    deskMesh.castShadow = true;
    deskMesh.receiveShadow = true;
    workstationGroup.add(deskMesh);

    // Desk Mat / Mousepad (4.8w x 0.02h x 2.2d)
    const matGeo = new THREE.BoxGeometry(4.8, 0.02, 2.2);
    const matMesh = new THREE.Mesh(matGeo, deskMatMat);
    matMesh.position.set(-0.2, 3.12, 0.5);
    matMesh.receiveShadow = true;
    workstationGroup.add(matMesh);

    // Steel Legs & Crossbar
    const legGeo = new THREE.BoxGeometry(0.25, 3.0, 0.5);
    const leftLeg = new THREE.Mesh(legGeo, steelLegMat);
    leftLeg.position.set(-3.1, 1.5, 0);
    leftLeg.castShadow = true;
    workstationGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, steelLegMat);
    rightLeg.position.set(3.1, 1.5, 0);
    rightLeg.castShadow = true;
    workstationGroup.add(rightLeg);

    const footGeo = new THREE.BoxGeometry(0.3, 0.1, 2.8);
    const leftFoot = new THREE.Mesh(footGeo, steelLegMat);
    leftFoot.position.set(-3.1, 0.05, 0);
    leftFoot.receiveShadow = true;
    workstationGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, steelLegMat);
    rightFoot.position.set(3.1, 0.05, 0);
    rightFoot.receiveShadow = true;
    workstationGroup.add(rightFoot);

    // Structural Crossbar connecting table legs (firmly anchored at Z = 0)
    const crossbarGeo = new THREE.BoxGeometry(6.1, 0.14, 0.16);
    const crossbar = new THREE.Mesh(crossbarGeo, steelLegMat);
    crossbar.position.set(0, 1.5, 0);
    crossbar.castShadow = true;
    crossbar.receiveShadow = true;
    workstationGroup.add(crossbar);

    // --- B. DESK SHELF & MAC MINI ---
    // Desk Shelf Foot / Risers Material (Matte black)
    const shelfLegMat = new THREE.MeshStandardMaterial({
      color: 0x111113, // Solid matte black for desk shelf feet
      roughness: 0.5,
      metalness: 0.2,
    });

    // Elevated Shelf Slab (6.2w x 0.06h x 1.3d) using matching light brown wood texture
    const shelfGeo = new THREE.BoxGeometry(6.2, 0.06, 1.3);
    const shelfMesh = new THREE.Mesh(shelfGeo, lightBrownWoodMat);
    shelfMesh.position.set(0.1, 3.40, -0.6);
    shelfMesh.castShadow = true;
    shelfMesh.receiveShadow = true;
    workstationGroup.add(shelfMesh);

    // Shelf Riser Legs (Matte black feet filling gap from desk to shelf)
    const riserGeo = new THREE.BoxGeometry(0.14, 0.26, 1.2);
    const leftRiser = new THREE.Mesh(riserGeo, shelfLegMat);
    leftRiser.position.set(-2.8, 3.24, -0.6);
    leftRiser.castShadow = true;
    workstationGroup.add(leftRiser);

    const centerRiser = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.26, 1.2), shelfLegMat);
    centerRiser.position.set(0.1, 3.24, -0.6);
    centerRiser.castShadow = true;
    workstationGroup.add(centerRiser);

    const rightRiser = new THREE.Mesh(riserGeo, shelfLegMat);
    rightRiser.position.set(2.8, 3.24, -0.6);
    rightRiser.castShadow = true;
    workstationGroup.add(rightRiser);

    // Aluminum Unibody Mac Mini docked neatly in the left shelf cubby
    const macMiniGeo = new THREE.BoxGeometry(1.3, 0.24, 1.3);
    const macMini = new THREE.Mesh(macMiniGeo, macMiniMat);
    macMini.position.set(-1.8, 3.23, -0.6);
    macMini.castShadow = true;
    macMini.receiveShadow = true;
    workstationGroup.add(macMini);

    // Tiny LED power light on front
    const ledGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-1.8, 3.23, 0.06);
    workstationGroup.add(led);

    // Cables running cleanly behind the desk shelf
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 3.23, -1.15),
      new THREE.Vector3(-1.4, 3.2, -1.25),
      new THREE.Vector3(-0.6, 3.2, -1.15),
      new THREE.Vector3(-0.6, 3.9, -1.0),
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.025, 8, false);
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.8 });
    const cableMesh = new THREE.Mesh(cableGeo, cableMat);
    workstationGroup.add(cableMesh);

    // --- C. SPACE BLACK 32-INCH MAIN LANDSCAPE MONITOR (Center-Left) ---
    // Monitor Stand / Arm clamped to rear of desk
    const standPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.6, 16);
    const standPole = new THREE.Mesh(standPoleGeo, monitorMat);
    standPole.position.set(-0.6, 3.9, -1.1);
    standPole.castShadow = true;
    workstationGroup.add(standPole);

    const armGeo = new THREE.BoxGeometry(0.12, 0.12, 0.7);
    const arm = new THREE.Mesh(armGeo, monitorMat);
    arm.position.set(-0.6, 4.4, -0.75);
    arm.rotation.x = -0.2;
    workstationGroup.add(arm);

    // 32" Space Black Monitor Frame (3.8w x 2.3h x 0.15d) - Bottom at Y = 3.45
    const monitorFrameGeo = new THREE.BoxGeometry(3.8, 2.3, 0.14);
    const mainMonitorFrame = new THREE.Mesh(monitorFrameGeo, monitorMat);
    mainMonitorFrame.position.set(-0.6, 4.6, -0.45);
    mainMonitorFrame.rotation.y = 0.04; // Gentle ergonomic inward tilt
    mainMonitorFrame.castShadow = true;
    workstationGroup.add(mainMonitorFrame);

    // Main 32" Screen with Dynamic Canvas IDE Texture
    const mainCanvas = createMainScreenCanvas();
    const mainScreenTexture = new THREE.CanvasTexture(mainCanvas);
    mainScreenTextureRef.current = mainScreenTexture;

    const screenMat = new THREE.MeshBasicMaterial({ map: mainScreenTexture });
    const screenGeo = new THREE.PlaneGeometry(3.64, 2.14);
    const mainScreenMesh = new THREE.Mesh(screenGeo, screenMat);
    mainScreenMesh.position.set(-0.6, 4.6, -0.37);
    mainScreenMesh.rotation.y = 0.04;
    workstationGroup.add(mainScreenMesh);

    // Slim monitor light bar on top
    const lightBarGeo = new THREE.BoxGeometry(2.4, 0.06, 0.18);
    const lightBar = new THREE.Mesh(lightBarGeo, steelLegMat);
    lightBar.position.set(-0.6, 5.78, -0.42);
    workstationGroup.add(lightBar);

    // --- D. SECOND 27-INCH PORTRAIT MONITOR ON THE RIGHT ---
    // Clamped pole & arm elevated to align bottom gap with main monitor
    const portraitPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 16);
    const portraitPole = new THREE.Mesh(portraitPoleGeo, monitorMat);
    portraitPole.position.set(1.8, 4.1, -1.1);
    portraitPole.castShadow = true;
    workstationGroup.add(portraitPole);

    const portraitArm = new THREE.Mesh(armGeo, monitorMat);
    portraitArm.position.set(1.8, 4.8, -0.75);
    portraitArm.rotation.x = -0.15;
    portraitArm.rotation.y = -0.35;
    workstationGroup.add(portraitArm);

    // 27" Vertical Space Black Frame (1.7w x 3.1h x 0.14d) - Raised to Y = 5.0 so bottom aligns at Y = 3.45
    const portraitFrameGeo = new THREE.BoxGeometry(1.7, 3.1, 0.14);
    const portraitMonitorFrame = new THREE.Mesh(portraitFrameGeo, monitorMat);
    portraitMonitorFrame.position.set(2.0, 5.0, -0.35);
    portraitMonitorFrame.rotation.y = -0.35; // Inward tilt for dual-monitor ergonomics
    portraitMonitorFrame.castShadow = true;
    workstationGroup.add(portraitMonitorFrame);

    // Portrait Screen with Terminal Output (Raised to match)
    const portraitCanvas = createPortraitScreenCanvas();
    const portraitScreenTexture = new THREE.CanvasTexture(portraitCanvas);
    portraitScreenTextureRef.current = portraitScreenTexture;

    const portraitScreenMat = new THREE.MeshBasicMaterial({ map: portraitScreenTexture });
    const portraitScreenGeo = new THREE.PlaneGeometry(1.56, 2.94);
    const portraitScreenMesh = new THREE.Mesh(portraitScreenGeo, portraitScreenMat);
    portraitScreenMesh.position.set(2.0, 5.0, -0.27);
    portraitScreenMesh.rotation.y = -0.35;
    workstationGroup.add(portraitScreenMesh);

    // Helper to generate 2D rounded rectangle shape for smooth chamfered/rounded tech objects
    const createRoundedRectShape = (w: number, d: number, r: number) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -d / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + d - r);
      shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
      shape.lineTo(x + r, y + d);
      shape.quadraticCurveTo(x, y + d, x, y + d - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return shape;
    };

    // --- E. KEYBOARD & MOUSE (Custom CNC Aluminum Keyboard with Realistic Keycaps & Ergonomic Mouse) ---
    // Shifted closer to the desk shelf (front of shelf is at Z = 0.05)
    const kbCenterZ = 0.88;

    // 1. Keyboard Chassis with Smooth Corner Radius & Edge Bevel
    const kbShape = createRoundedRectShape(1.76, 0.68, 0.05);
    const kbBaseGeo = new THREE.ExtrudeGeometry(kbShape, {
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
      curveSegments: 6,
    });
    kbBaseGeo.rotateX(-Math.PI / 2);

    const kbBase = new THREE.Mesh(kbBaseGeo, keyboardMat);
    kbBase.position.set(-0.4, 3.125, kbCenterZ);
    kbBase.castShadow = true;
    workstationGroup.add(kbBase);

    // Recessed switch plate bed (matte dark foundation)
    const kbPlateGeo = new THREE.BoxGeometry(1.64, 0.01, 0.56);
    const kbPlate = new THREE.Mesh(kbPlateGeo, keycapMat);
    kbPlate.position.set(-0.4, 3.195, kbCenterZ);
    workstationGroup.add(kbPlate);

    // Realistic Mechanical Keycaps (Full Alphanumeric, Modifier, Spacebar & Nav Layout)
    const keyGeo = new THREE.BoxGeometry(0.088, 0.030, 0.088);
    const keyY = 3.212;

    const row1Z = kbCenterZ - 0.22;
    const row2Z = kbCenterZ - 0.11;
    const row3Z = kbCenterZ;
    const row4Z = kbCenterZ + 0.11;
    const row5Z = kbCenterZ + 0.22;

    const keyboardKeys: { x: number; z: number; w?: number; isAccent?: boolean }[] = [
      // Row 1 (Function / Number row)
      { x: -1.12, z: row1Z, w: 0.10, isAccent: true }, // Esc (Accent Yellow)
      { x: -0.99, z: row1Z }, { x: -0.88, z: row1Z }, { x: -0.77, z: row1Z },
      { x: -0.66, z: row1Z }, { x: -0.55, z: row1Z }, { x: -0.44, z: row1Z },
      { x: -0.33, z: row1Z }, { x: -0.22, z: row1Z }, { x: -0.11, z: row1Z },
      { x: 0.00, z: row1Z }, { x: 0.11, z: row1Z }, { x: 0.22, z: row1Z },
      { x: 0.31, z: row1Z, w: 0.14 }, // Backspace

      // Row 2 (QWERTY row)
      { x: -1.10, z: row2Z, w: 0.14 }, // Tab
      { x: -0.96, z: row2Z }, { x: -0.85, z: row2Z }, { x: -0.74, z: row2Z },
      { x: -0.63, z: row2Z }, { x: -0.52, z: row2Z }, { x: -0.41, z: row2Z },
      { x: -0.30, z: row2Z }, { x: -0.19, z: row2Z }, { x: -0.08, z: row2Z },
      { x: 0.03, z: row2Z }, { x: 0.14, z: row2Z }, { x: 0.25, z: row2Z },
      { x: 0.33, z: row2Z, w: 0.10 }, // Pipe / Slash

      // Row 3 (Home ASDF row)
      { x: -1.09, z: row3Z, w: 0.16 }, // Caps Lock
      { x: -0.94, z: row3Z }, { x: -0.83, z: row3Z }, { x: -0.72, z: row3Z },
      { x: -0.61, z: row3Z }, { x: -0.50, z: row3Z }, { x: -0.39, z: row3Z },
      { x: -0.28, z: row3Z }, { x: -0.17, z: row3Z }, { x: -0.06, z: row3Z },
      { x: 0.05, z: row3Z }, { x: 0.16, z: row3Z },
      { x: 0.28, z: row3Z, w: 0.20, isAccent: true }, // Enter Key (Accent Yellow)

      // Row 4 (ZXCV row)
      { x: -1.07, z: row4Z, w: 0.20 }, // Left Shift
      { x: -0.90, z: row4Z }, { x: -0.79, z: row4Z }, { x: -0.68, z: row4Z },
      { x: -0.57, z: row4Z }, { x: -0.46, z: row4Z }, { x: -0.35, z: row4Z },
      { x: -0.24, z: row4Z }, { x: -0.13, z: row4Z }, { x: -0.02, z: row4Z },
      { x: 0.09, z: row4Z },
      { x: 0.21, z: row4Z, w: 0.18 }, // Right Shift
      { x: 0.33, z: row4Z, w: 0.088 }, // Up Arrow

      // Row 5 (Spacebar / Nav row)
      { x: -1.12, z: row5Z, w: 0.10 }, // Ctrl
      { x: -1.00, z: row5Z, w: 0.10 }, // Win / Cmd
      { x: -0.88, z: row5Z, w: 0.10 }, // Alt
      { x: -0.42, z: row5Z, w: 0.58 }, // Broad Spacebar
      { x: 0.03, z: row5Z, w: 0.10 },  // Alt
      { x: 0.14, z: row5Z, w: 0.10 },  // Fn
      { x: 0.23, z: row5Z, w: 0.082 }, // Left Arrow
      { x: 0.33, z: row5Z, w: 0.082 }, // Down Arrow
      { x: 0.43, z: row5Z, w: 0.082 }, // Right Arrow
    ];

    keyboardKeys.forEach(({ x, z, w, isAccent }) => {
      const width = w ?? 0.088;
      const kGeo = width === 0.088 ? keyGeo : new THREE.BoxGeometry(width, 0.030, 0.088);
      const kMat = isAccent ? accentKeyMat : keycapMat;
      const keyMesh = new THREE.Mesh(kGeo, kMat);
      keyMesh.position.set(x, keyY, z);
      keyMesh.castShadow = true;
      workstationGroup.add(keyMesh);
    });

    // 2. Ergonomic Mouse with Smooth Edge Radius, Arched Palm Dome & Metallic Scroll Wheel
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(1.05, 3.12, kbCenterZ);
    workstationGroup.add(mouseGroup);

    // Ergonomic rounded mouse base outline (contoured lozenge with tapered front clickers)
    const mouseShape = new THREE.Shape();
    mouseShape.moveTo(-0.13, 0.22);
    mouseShape.quadraticCurveTo(-0.16, 0.0, -0.14, -0.20);
    mouseShape.quadraticCurveTo(-0.10, -0.27, 0.0, -0.27);
    mouseShape.quadraticCurveTo(0.10, -0.27, 0.14, -0.20);
    mouseShape.quadraticCurveTo(0.16, 0.0, 0.13, 0.22);
    mouseShape.quadraticCurveTo(0.08, 0.27, 0.0, 0.27);
    mouseShape.quadraticCurveTo(-0.08, 0.27, -0.13, 0.22);

    const mouseBaseGeo = new THREE.ExtrudeGeometry(mouseShape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.016,
      bevelThickness: 0.016,
      curveSegments: 8,
    });
    mouseBaseGeo.rotateX(-Math.PI / 2);

    const mouseBase = new THREE.Mesh(mouseBaseGeo, keyboardMat);
    mouseBase.castShadow = true;
    mouseGroup.add(mouseBase);

    // Arched Palm Dome (Curving smoothly from low front clickers up to palm crest and down to rear heel)
    const palmDomeGeo = new THREE.SphereGeometry(0.19, 16, 12);
    const palmDome = new THREE.Mesh(palmDomeGeo, keyboardMat);
    palmDome.scale.set(0.68, 0.40, 1.10);
    palmDome.position.set(0, 0.055, 0.02);
    palmDome.castShadow = true;
    mouseGroup.add(palmDome);

    // Left and Right Clicker Split Seam
    const clickerSplitGeo = new THREE.BoxGeometry(0.008, 0.018, 0.18);
    const clickerSplit = new THREE.Mesh(clickerSplitGeo, keycapMat);
    clickerSplit.position.set(0, 0.076, -0.16);
    mouseGroup.add(clickerSplit);

    // Metallic Textured Scroll Wheel
    const scrollWheelGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.022, 14);
    const scrollWheel = new THREE.Mesh(scrollWheelGeo, accentKeyMat);
    scrollWheel.rotation.z = Math.PI / 2;
    scrollWheel.position.set(0, 0.085, -0.12);
    scrollWheel.castShadow = true;
    mouseGroup.add(scrollWheel);

    // Ceramic Coffee Mug
    const mugGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.45, 16);
    const mug = new THREE.Mesh(mugGeo, coffeeMugMat);
    mug.position.set(2.0, 3.34, 0.9);
    mug.castShadow = true;
    workstationGroup.add(mug);

    // Coffee liquid inside
    const coffeeGeo = new THREE.CircleGeometry(0.18, 16);
    const coffeeMat = new THREE.MeshBasicMaterial({ color: 0x3d2314 });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.set(2.0, 3.54, 0.9);
    workstationGroup.add(coffee);

    // --- F. ERGONOMIC OFFICE CHAIR ---
    // Moved back comfortably from the front edge of the desk
    const chairGroup = new THREE.Group();
    chairGroup.position.set(-0.2, 0, 2.65);
    workstationGroup.add(chairGroup);

    // 5-Star Base
    const starCenterGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 12);
    const starCenter = new THREE.Mesh(starCenterGeo, steelLegMat);
    starCenter.position.set(0, 0.35, 0);
    chairGroup.add(starCenter);

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const legArmGeo = new THREE.BoxGeometry(0.1, 0.08, 1.1);
      const legArm = new THREE.Mesh(legArmGeo, steelLegMat);
      legArm.position.set(Math.sin(angle) * 0.55, 0.28, Math.cos(angle) * 0.55);
      legArm.rotation.y = angle;
      chairGroup.add(legArm);

      // Wheel Caster (Dark rubber)
      const casterGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const caster = new THREE.Mesh(casterGeo, casterMat);
      caster.position.set(Math.sin(angle) * 1.05, 0.1, Math.cos(angle) * 1.05);
      chairGroup.add(caster);
    }

    // Cylinder Lift (Elevated to match taller seated position)
    const liftGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.35, 16);
    const chairLift = new THREE.Mesh(liftGeo, steelLegMat);
    chairLift.position.set(0, 1.12, 0);
    chairGroup.add(chairLift);

    // Seat Cushion (1.6w x 0.24h x 1.6d) - Elevated
    const seatGeo = new THREE.BoxGeometry(1.6, 0.24, 1.6);
    const seat = new THREE.Mesh(seatGeo, chairMeshMat);
    seat.position.set(0, 2.1, 0);
    seat.castShadow = true;
    chairGroup.add(seat);

    // Curved Mesh Backrest - Ergonomic 100° posture (10° backward recline from upright)
    const backGeo = new THREE.BoxGeometry(1.5, 2.3, 0.14);
    const backRest = new THREE.Mesh(backGeo, chairMeshMat);
    backRest.position.set(0, 3.43, 0.98);
    backRest.rotation.x = 10 * (Math.PI / 180); // 100° angle relative to horizontal seat pan
    backRest.castShadow = true;
    chairGroup.add(backRest);

    // Adjustable Armrests - Wide ergonomic contour reduced to snug tabletop height
    const armPadGeo = new THREE.BoxGeometry(0.38, 0.08, 0.90);
    const leftArmPad = new THREE.Mesh(armPadGeo, chairMeshMat);
    leftArmPad.position.set(-0.94, 3.08, 0.05);
    chairGroup.add(leftArmPad);

    const rightArmPad = new THREE.Mesh(armPadGeo, chairMeshMat);
    rightArmPad.position.set(0.94, 3.08, 0.05);
    chairGroup.add(rightArmPad);

    // Armrest vertical support posts connecting to chair
    const armPostGeo = new THREE.BoxGeometry(0.10, 0.96, 0.14);
    const leftArmPost = new THREE.Mesh(armPostGeo, steelLegMat);
    leftArmPost.position.set(-0.94, 2.58, 0.05);
    chairGroup.add(leftArmPost);

    const rightArmPost = new THREE.Mesh(armPostGeo, steelLegMat);
    rightArmPost.position.set(0.94, 2.58, 0.05);
    chairGroup.add(rightArmPost);

    // --- G. YOUNG DEVELOPER WITH CURLY HAIR & TAN SKIN (ANTHONY) ---
    // Taller commanding stature with legs touching the ground and high shoulders
    const developerGroup = new THREE.Group();
    developerGroup.position.set(-0.2, 2.15, 2.5);
    workstationGroup.add(developerGroup);

    // --- 1. SHORTS & REALISTIC LEGS (Anatomical Quads, Knees & Calves) ---
    // Pelvis / Shorts Waist
    const pelvisGeo = new THREE.BoxGeometry(1.08, 0.42, 0.88);
    const pelvis = new THREE.Mesh(pelvisGeo, shortsMat);
    pelvis.position.set(0, 0.22, -0.05);
    pelvis.castShadow = true;
    developerGroup.add(pelvis);

    // Left & Right Shorts Legs (covering upper half of thighs)
    const shortsLegGeo = new THREE.CylinderGeometry(0.26, 0.24, 0.74, 16);
    const shortsHemGeo = new THREE.CylinderGeometry(0.252, 0.252, 0.06, 16);

    const leftShortsLeg = new THREE.Mesh(shortsLegGeo, shortsMat);
    leftShortsLeg.position.set(-0.36, 0.18, -0.42);
    leftShortsLeg.rotation.x = Math.PI / 2;
    leftShortsLeg.castShadow = true;
    developerGroup.add(leftShortsLeg);

    const leftShortsHem = new THREE.Mesh(shortsHemGeo, tshirtTrimMat);
    leftShortsHem.position.set(-0.36, 0.18, -0.78);
    leftShortsHem.rotation.x = Math.PI / 2;
    developerGroup.add(leftShortsHem);

    const rightShortsLeg = new THREE.Mesh(shortsLegGeo, shortsMat);
    rightShortsLeg.position.set(0.36, 0.18, -0.42);
    rightShortsLeg.rotation.x = Math.PI / 2;
    rightShortsLeg.castShadow = true;
    developerGroup.add(rightShortsLeg);

    const rightShortsHem = new THREE.Mesh(shortsHemGeo, tshirtTrimMat);
    rightShortsHem.position.set(0.36, 0.18, -0.78);
    rightShortsHem.rotation.x = Math.PI / 2;
    developerGroup.add(rightShortsHem);

    // Exposed Lower Thighs (Tan Skin with Quadriceps Taper)
    const lowerThighGeo = new THREE.CylinderGeometry(0.22, 0.185, 0.52, 14);

    const leftThighSkin = new THREE.Mesh(lowerThighGeo, skinMat);
    leftThighSkin.position.set(-0.36, 0.17, -0.96);
    leftThighSkin.rotation.x = Math.PI / 2;
    leftThighSkin.castShadow = true;
    developerGroup.add(leftThighSkin);

    const rightThighSkin = new THREE.Mesh(lowerThighGeo, skinMat);
    rightThighSkin.position.set(0.36, 0.17, -0.96);
    rightThighSkin.rotation.x = Math.PI / 2;
    rightThighSkin.castShadow = true;
    developerGroup.add(rightThighSkin);

    // Articulated Knee Geometries (Anatomical Capsule, Anterior Patella, Patellar Tendon, Tibial Tuberosity & Condyles)
    const kneeJointCoreGeo = new THREE.CylinderGeometry(0.172, 0.160, 0.28, 16);
    const patellaGeo = new THREE.SphereGeometry(0.115, 12, 10);
    const patellarTendonGeo = new THREE.BoxGeometry(0.082, 0.16, 0.045);
    const tibialTuberosityGeo = new THREE.SphereGeometry(0.065, 10, 8);
    const condyleGeo = new THREE.SphereGeometry(0.075, 8, 8);

    // Continuous Anatomical Shin / Lower Leg (Seamless tibia ridge with defined sub-patellar and supramalleolar waists)
    const shinGeo = new THREE.CylinderGeometry(0.158, 0.100, 1.86, 20);

    // Anatomical Gastrocnemius & Soleus (High muscular belly tapering gracefully downward toward the Achilles)
    const calfProfilePoints = [
      new THREE.Vector2(0.010, -0.65), // low insertion above ankle
      new THREE.Vector2(0.050, -0.50), // gentle soleus taper
      new THREE.Vector2(0.098, -0.32), // mid-lower calf tapering upward
      new THREE.Vector2(0.138, -0.12), // mid calf
      new THREE.Vector2(0.165, 0.08),  // peak gastrocnemius muscle belly
      new THREE.Vector2(0.158, 0.20),  // upper gastrocnemius belly
      new THREE.Vector2(0.118, 0.28),  // popliteal curve behind knee
      new THREE.Vector2(0.010, 0.33)   // top insertion behind knee
    ];
    const calfMuscleGeo = new THREE.LatheGeometry(calfProfilePoints, 18);

    // Articulated Ankle Geometries (Subtle, Natural Malleoli & Slender Achilles)
    const latMalleolusGeo = new THREE.SphereGeometry(0.045, 10, 8);
    const medMalleolusGeo = new THREE.SphereGeometry(0.048, 10, 8);
    const achillesTendonGeo = new THREE.CylinderGeometry(0.026, 0.034, 0.35, 10);
    const sockCollarGeo = new THREE.TorusGeometry(0.104, 0.016, 8, 20);

    // Helper to build fully articulated lower leg with distinct joint contours
    const buildLowerLeg = (isLeft: boolean) => {
      const sign = isLeft ? -1 : 1;
      const legX = sign * 0.36;

      // --- KNEE JOINT CONTOURS ---
      // 1. Joint capsule core (articulating thigh with tibia plateau)
      const kneeCore = new THREE.Mesh(kneeJointCoreGeo, skinMat);
      kneeCore.position.set(legX, 0.15, -1.22);
      kneeCore.castShadow = true;
      developerGroup.add(kneeCore);

      // 2. Anterior Patella (kneecap protruding prominently in front)
      const patella = new THREE.Mesh(patellaGeo, skinMat);
      patella.scale.set(0.85, 1.15, 0.60);
      patella.position.set(legX, 0.16, -1.33);
      patella.castShadow = true;
      developerGroup.add(patella);

      // 3. Patellar Tendon (vertical anatomical band bridging kneecap to shin)
      const patellarTendon = new THREE.Mesh(patellarTendonGeo, skinMat);
      patellarTendon.position.set(legX, 0.04, -1.30);
      developerGroup.add(patellarTendon);

      // 4. Tibial Tuberosity (anatomical bony bump at superior shin crest)
      const tuberosity = new THREE.Mesh(tibialTuberosityGeo, skinMat);
      tuberosity.scale.set(0.9, 1.2, 0.6);
      tuberosity.position.set(legX, -0.07, -1.32);
      developerGroup.add(tuberosity);

      // 5. Femoral Condyles (lateral & medial joint flares framing the knee)
      const latCondyle = new THREE.Mesh(condyleGeo, skinMat);
      latCondyle.scale.set(0.65, 1.1, 0.9);
      latCondyle.position.set(legX + sign * 0.11, 0.16, -1.22);
      developerGroup.add(latCondyle);

      const medCondyle = new THREE.Mesh(condyleGeo, skinMat);
      medCondyle.scale.set(0.65, 1.1, 0.9);
      medCondyle.position.set(legX - sign * 0.11, 0.16, -1.20);
      developerGroup.add(medCondyle);

      // --- SHIN & CALF ---
      // 6. Seamless Tibia / Shin Bone
      const shin = new THREE.Mesh(shinGeo, skinMat);
      shin.position.set(legX, -0.83, -1.24);
      shin.rotation.x = 0.021; // Smooth forward alignment from knee (-1.22) to sock (-1.26)
      shin.castShadow = true;
      developerGroup.add(shin);

      // 7. Elongated Calf Muscle Belly (Gastrocnemius & Soleus)
      const calf = new THREE.Mesh(calfMuscleGeo, skinMat);
      calf.position.set(legX, -0.55, -1.13);
      calf.scale.set(0.92, 1.0, 0.92);
      calf.rotation.x = 0.021;
      calf.castShadow = true;
      developerGroup.add(calf);

      // --- SUBTLE ANKLE JOINT CONTOURS (Gentle anatomical landmarks that do not protrude awkwardly) ---
      // 8. Lateral Malleolus (outer ankle bone: subtle landmark, slightly lower & posterior)
      const latAnkle = new THREE.Mesh(latMalleolusGeo, skinMat);
      latAnkle.scale.set(0.55, 0.85, 0.65);
      latAnkle.position.set(legX + sign * 0.045, -1.70, -1.24);
      developerGroup.add(latAnkle);

      // 9. Medial Malleolus (inner ankle bone: subtle landmark, slightly higher & anterior)
      const medAnkle = new THREE.Mesh(medMalleolusGeo, skinMat);
      medAnkle.scale.set(0.55, 0.90, 0.65);
      medAnkle.position.set(legX - sign * 0.040, -1.66, -1.22);
      developerGroup.add(medAnkle);

      // 10. Achilles Tendon (slender vertical cord on posterior ankle)
      const achilles = new THREE.Mesh(achillesTendonGeo, skinMat);
      achilles.scale.set(0.75, 1.0, 1.05);
      achilles.position.set(legX, -1.64, -1.16);
      developerGroup.add(achilles);
    };

    buildLowerLeg(true);  // Left Leg
    buildLowerLeg(false); // Right Leg

    // --- SOCKED FEET (Studio / Home Office Socks-Only Look, Resting Firmly on Floor at World Y = 0) ---
    const sockAnkleGeo = new THREE.CylinderGeometry(0.104, 0.108, 0.22, 16);
    const sockHeelGeo = new THREE.SphereGeometry(0.115, 14, 12);
    const sockFootGeo = new THREE.BoxGeometry(0.23, 0.15, 0.46);
    const sockToeGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.21, 14);
    const sockSoleGeo = new THREE.BoxGeometry(0.235, 0.03, 0.48);

    const buildSockedFoot = (isLeft: boolean) => {
      const sign = isLeft ? -1 : 1;
      const footX = sign * 0.36;

      // Ribbed Ankle Sock Collar (defining the ankle transition)
      const sockCollar = new THREE.Mesh(sockCollarGeo, sockMat);
      sockCollar.position.set(footX, -1.74, -1.25);
      sockCollar.rotation.x = Math.PI / 2;
      developerGroup.add(sockCollar);

      // Ankle Sleeve
      const sockAnkle = new THREE.Mesh(sockAnkleGeo, sockMat);
      sockAnkle.position.set(footX, -1.84, -1.25);
      sockAnkle.castShadow = true;
      developerGroup.add(sockAnkle);

      // Rounded Heel Cup
      const sockHeel = new THREE.Mesh(sockHeelGeo, sockMat);
      sockHeel.scale.set(0.92, 0.95, 1.05);
      sockHeel.position.set(footX, -2.03, -1.20);
      sockHeel.castShadow = true;
      developerGroup.add(sockHeel);

      // Main Foot Instep / Bridge
      const sockFoot = new THREE.Mesh(sockFootGeo, sockMat);
      sockFoot.position.set(footX, -2.06, -1.36);
      sockFoot.castShadow = true;
      developerGroup.add(sockFoot);

      // Soft Rounded Socked Toes
      const sockToe = new THREE.Mesh(sockToeGeo, sockMat);
      sockToe.rotation.z = Math.PI / 2;
      sockToe.scale.set(1.0, 0.68, 0.90);
      sockToe.position.set(footX, -2.06, -1.54);
      sockToe.castShadow = true;
      developerGroup.add(sockToe);

      // Sock Bottom resting squarely on the floor (local Y = -2.15, world Y = 0.00)
      const sockSole = new THREE.Mesh(sockSoleGeo, sockMat);
      sockSole.position.set(footX, -2.135, -1.37);
      sockSole.receiveShadow = true;
      developerGroup.add(sockSole);
    };

    buildSockedFoot(true);  // Left Socked Foot
    buildSockedFoot(false); // Right Socked Foot

    // --- 2. TORSO & BLACK T-SHIRT (Natural Human Torso with Crewneck) ---
    // Shaped Chest / Thorax in Black T-Shirt
    const chestGeo = new THREE.CylinderGeometry(0.66, 0.58, 1.45, 16);
    const chest = new THREE.Mesh(chestGeo, tshirtMat);
    chest.scale.set(1.06, 1.0, 0.74); // Flattened front-to-back for realistic thorax
    chest.position.set(0, 1.45, 0.02);
    chest.rotation.x = 0.06; // Forward focused coding lean
    chest.castShadow = true;
    developerGroup.add(chest);

    // Waist Hem draped naturally over hips
    const waistGeo = new THREE.CylinderGeometry(0.57, 0.60, 0.45, 16);
    const waist = new THREE.Mesh(waistGeo, tshirtMat);
    waist.scale.set(1.04, 1.0, 0.75);
    waist.position.set(0, 0.65, 0);
    developerGroup.add(waist);

    // Crewneck Ribbed Collar Trim
    const collarGeo = new THREE.TorusGeometry(0.24, 0.035, 8, 24);
    const collar = new THREE.Mesh(collarGeo, tshirtTrimMat);
    collar.position.set(0, 2.38, -0.05);
    collar.rotation.x = Math.PI / 2;
    developerGroup.add(collar);

    // Strong Tan Neck
    const neckGeo = new THREE.CylinderGeometry(0.23, 0.27, 0.44, 14);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 2.58, -0.05);
    developerGroup.add(neck);

    // Head - Elevated with commanding height in Tan Skin
    const headGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 3.15, -0.15);
    head.rotation.x = 0.1; // Looking toward monitors
    head.castShadow = true;
    developerGroup.add(head);

    // Sculpted Volumetric Curly Hair (Natural Curly Texture with Varied Curls)
    const hairGroup = new THREE.Group();
    hairGroup.position.set(0, 3.15, -0.15);
    developerGroup.add(hairGroup);

    // 1. Cranial Hair Mass (Smooth base dome over skull)
    const cranialBaseGeo = new THREE.SphereGeometry(0.55, 18, 16);
    const cranialBase = new THREE.Mesh(cranialBaseGeo, hairMat);
    cranialBase.position.set(0, 0.06, 0.06);
    cranialBase.scale.set(0.96, 0.98, 0.94);
    hairGroup.add(cranialBase);

    // 2. Sculpted Natural Curls (Organically distributed clumps with varied radii & scales)
    const curlSpecs = [
      // Forehead / Front Fringe Curls (framing face naturally)
      { pos: [0, 0.46, -0.26], r: 0.22, s: [1.1, 0.95, 1.0] },
      { pos: [-0.18, 0.44, -0.28], r: 0.20, s: [1.0, 0.9, 1.1] },
      { pos: [0.18, 0.44, -0.28], r: 0.20, s: [1.0, 0.9, 1.1] },
      { pos: [-0.32, 0.36, -0.22], r: 0.19, s: [1.05, 1.0, 0.95] },
      { pos: [0.32, 0.36, -0.22], r: 0.19, s: [1.05, 1.0, 0.95] },

      // Top Crown Curls (volumetric curly apex)
      { pos: [0, 0.54, -0.05], r: 0.24, s: [1.1, 1.0, 1.05] },
      { pos: [-0.22, 0.52, -0.08], r: 0.22, s: [1.05, 0.95, 1.0] },
      { pos: [0.22, 0.52, -0.08], r: 0.22, s: [1.05, 0.95, 1.0] },
      { pos: [0, 0.53, 0.16], r: 0.23, s: [1.1, 1.0, 1.0] },
      { pos: [-0.20, 0.49, 0.14], r: 0.21, s: [1.0, 1.0, 1.0] },
      { pos: [0.20, 0.49, 0.14], r: 0.21, s: [1.0, 1.0, 1.0] },

      // Side & Temple Curls
      { pos: [-0.38, 0.38, -0.02], r: 0.21, s: [1.0, 1.05, 1.0] },
      { pos: [0.38, 0.38, -0.02], r: 0.21, s: [1.0, 1.05, 1.0] },
      { pos: [-0.42, 0.24, 0.08], r: 0.20, s: [1.0, 1.0, 1.05] },
      { pos: [0.42, 0.24, 0.08], r: 0.20, s: [1.0, 1.0, 1.05] },
      { pos: [-0.40, 0.14, 0.22], r: 0.19, s: [1.0, 0.95, 1.0] },
      { pos: [0.40, 0.14, 0.22], r: 0.19, s: [1.0, 0.95, 1.0] },

      // Posterior / Back Curls (tapering down to nape)
      { pos: [0, 0.45, 0.34], r: 0.22, s: [1.1, 1.0, 0.95] },
      { pos: [-0.24, 0.40, 0.30], r: 0.21, s: [1.0, 1.0, 1.0] },
      { pos: [0.24, 0.40, 0.30], r: 0.21, s: [1.0, 1.0, 1.0] },
      { pos: [-0.18, 0.22, 0.42], r: 0.20, s: [1.0, 1.0, 0.95] },
      { pos: [0.18, 0.22, 0.42], r: 0.20, s: [1.0, 1.0, 0.95] },
      { pos: [0, 0.28, 0.42], r: 0.21, s: [1.1, 0.95, 1.0] },
      { pos: [0, 0.10, 0.46], r: 0.18, s: [1.05, 0.95, 0.95] },
      { pos: [-0.15, 0.06, 0.44], r: 0.16, s: [1.0, 0.9, 0.9] },
      { pos: [0.15, 0.06, 0.44], r: 0.16, s: [1.0, 0.9, 0.9] },
    ];

    curlSpecs.forEach(({ pos, r, s }) => {
      const curlGeo = new THREE.SphereGeometry(r, 10, 8);
      const curl = new THREE.Mesh(curlGeo, hairMat);
      curl.scale.set(s[0], s[1], s[2]);
      curl.position.set(pos[0], pos[1], pos[2]);
      curl.castShadow = true;
      hairGroup.add(curl);
    });

    // --- 3. SHOULDERS & BARE ARMS (Unified Co-Axial Deltoids, Sleeves, Biceps & Elbows) ---
    // Helper to construct seamless, co-axial upper arm with natural commanding proportions
    const createUpperArm = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // Shoulder Socket Pivot: anchored directly to the chest / clavicle (elevated for athletic posture)
      armGroup.position.set(sign * 0.72, 2.24, 0.02);

      // Subtle natural forward slope and outward roll toward armrest
      const pitchForward = 0.03; // ~1.7° natural drape
      const rollOutward = sign * 0.165; // ~9.5° outward
      armGroup.rotation.set(pitchForward, 0, rollOutward);

      // 1. Shoulder Deltoid Muscle Cap (Black T-shirt)
      const deltoidGeo = new THREE.SphereGeometry(0.23, 16, 14);
      const deltoid = new THREE.Mesh(deltoidGeo, tshirtMat);
      deltoid.position.set(0, 0, 0);
      deltoid.castShadow = true;
      armGroup.add(deltoid);

      // 2. Short T-Shirt Sleeve (Co-axial with arm)
      const sleeveLength = 0.46;
      const sleeveGeo = new THREE.CylinderGeometry(0.21, 0.19, sleeveLength, 16);
      const sleeve = new THREE.Mesh(sleeveGeo, tshirtMat);
      sleeve.position.set(0, -sleeveLength / 2, 0);
      sleeve.castShadow = true;
      armGroup.add(sleeve);

      // Ribbed Sleeve Hem Cuff
      const sleeveHemGeo = new THREE.CylinderGeometry(0.195, 0.195, 0.05, 16);
      const sleeveHem = new THREE.Mesh(sleeveHemGeo, tshirtTrimMat);
      sleeveHem.position.set(0, -sleeveLength, 0);
      armGroup.add(sleeveHem);

      // 3. Continuous Bicep & Tricep (Tan Skin) - Full athletic length
      const bicepLength = 1.05;
      const bicepGeo = new THREE.CylinderGeometry(0.168, 0.136, bicepLength, 16);
      const bicep = new THREE.Mesh(bicepGeo, skinMat);
      bicep.position.set(0, -0.15 - bicepLength / 2, 0);
      bicep.castShadow = true;
      armGroup.add(bicep);

      // Muscular bicep belly contour on the FRONT (anterior) of the arm in tan skin
      const bicepMuscleGeo = new THREE.SphereGeometry(0.174, 14, 12);
      const bicepMuscle = new THREE.Mesh(bicepMuscleGeo, skinMat);
      bicepMuscle.position.set(0, -0.62, -0.045); // Negative Z = front of arm (anterior) facing desk & keyboard
      bicepMuscle.scale.set(0.95, 1.25, 0.90);
      bicepMuscle.castShadow = true;
      armGroup.add(bicepMuscle);

      // 4. Anatomical Elbow Joint (Tan Skin - resting squarely on elevated chair armrest)
      const elbowGeo = new THREE.SphereGeometry(0.138, 14, 12);
      const elbow = new THREE.Mesh(elbowGeo, skinMat);
      elbow.position.set(0, -1.18, 0);
      elbow.castShadow = true;
      armGroup.add(elbow);

      return armGroup;
    };

    const leftUpperArm = createUpperArm(true);
    developerGroup.add(leftUpperArm);

    const rightUpperArm = createUpperArm(false);
    developerGroup.add(rightUpperArm);

    // --- 4. FOREARMS & ARTICULATED HANDS (Hands Group with Typing Motion) ---
    const handsGroup = new THREE.Group();
    developerHandsRef.current = handsGroup;
    developerGroup.add(handsGroup);

    // Athletic Full-Scale Forearms connecting elbow to keyboard naturally
    const forearmGeo = new THREE.CylinderGeometry(0.138, 0.096, 1.34, 16);

    // Left Forearm
    const leftForearm = new THREE.Mesh(forearmGeo, skinMat);
    leftForearm.position.set(-0.71, 1.12, -0.585);
    leftForearm.rotation.set(Math.PI / 2 + 0.078, 0, 0.32);
    leftForearm.castShadow = true;
    handsGroup.add(leftForearm);

    // Right Forearm
    const rightForearm = new THREE.Mesh(forearmGeo, skinMat);
    rightForearm.position.set(0.71, 1.12, -0.585);
    rightForearm.rotation.set(Math.PI / 2 + 0.078, 0, -0.32);
    rightForearm.castShadow = true;
    handsGroup.add(rightForearm);

    // Distinct Wrist Bones (Styloid Process in Tan Skin)
    const wristGeo = new THREE.SphereGeometry(0.095, 12, 10);

    const leftWrist = new THREE.Mesh(wristGeo, skinMat);
    leftWrist.position.set(-0.50, 1.16, -1.22);
    handsGroup.add(leftWrist);

    const rightWrist = new THREE.Mesh(wristGeo, skinMat);
    rightWrist.position.set(0.50, 1.16, -1.22);
    handsGroup.add(rightWrist);

    // Helper to construct realistic human typing hand (Palm, Articulated Thumb, Arched Fingers)
    const createTypingHand = (isLeft: boolean) => {
      const handGroup = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // 1. Palm (metacarpus)
      const palmGeo = new THREE.BoxGeometry(0.22, 0.075, 0.20);
      const palm = new THREE.Mesh(palmGeo, skinMat);
      palm.castShadow = true;
      handGroup.add(palm);

      // Thenar eminence (base of thumb muscle pad)
      const thenarGeo = new THREE.SphereGeometry(0.062, 10, 8);
      const thenar = new THREE.Mesh(thenarGeo, skinMat);
      thenar.position.set(sign * -0.09, -0.01, 0.03);
      handGroup.add(thenar);

      // 2. Articulated Thumb (pointing inward toward spacebar)
      const thumbProxGeo = new THREE.CylinderGeometry(0.042, 0.038, 0.12, 8);
      const thumbProx = new THREE.Mesh(thumbProxGeo, skinMat);
      thumbProx.position.set(sign * -0.12, -0.015, -0.04);
      thumbProx.rotation.set(0.18, 0, sign * 0.58);
      thumbProx.castShadow = true;
      handGroup.add(thumbProx);

      const thumbDistGeo = new THREE.CylinderGeometry(0.036, 0.032, 0.10, 8);
      const thumbDist = new THREE.Mesh(thumbDistGeo, skinMat);
      thumbDist.position.set(sign * -0.16, -0.02, -0.09);
      thumbDist.rotation.set(0.35, 0, sign * 0.35);
      thumbDist.castShadow = true;
      handGroup.add(thumbDist);

      const thumbTipGeo = new THREE.SphereGeometry(0.034, 8, 8);
      const thumbTip = new THREE.Mesh(thumbTipGeo, skinMat);
      thumbTip.position.set(sign * -0.18, -0.03, -0.13);
      handGroup.add(thumbTip);

      // 3. Knuckle Bridge
      const knuckleGeo = new THREE.BoxGeometry(0.20, 0.055, 0.05);
      const knuckle = new THREE.Mesh(knuckleGeo, skinMat);
      knuckle.position.set(0, 0.01, -0.10);
      handGroup.add(knuckle);

      // 4. Four Arched Typing Fingers (Index, Middle, Ring, Pinky)
      const fingerOffsets = [
        { x: sign * -0.07, len: 0.18, rad: 0.034, pitch: 0.38 }, // Index
        { x: sign * -0.02, len: 0.19, rad: 0.034, pitch: 0.40 }, // Middle
        { x: sign * 0.03, len: 0.175, rad: 0.032, pitch: 0.38 }, // Ring
        { x: sign * 0.08, len: 0.145, rad: 0.028, pitch: 0.34 }, // Pinky
      ];

      fingerOffsets.forEach(({ x, len, rad, pitch }) => {
        // Proximal phalanx (arched downward onto keyboard home row)
        const phalanxGeo = new THREE.CylinderGeometry(rad, rad * 0.9, len, 8);
        const phalanx = new THREE.Mesh(phalanxGeo, skinMat);
        phalanx.position.set(x, -0.02, -0.15);
        phalanx.rotation.x = Math.PI / 2 + pitch;
        phalanx.castShadow = true;
        handGroup.add(phalanx);

        // Rounded fingertip resting on mechanical keycaps
        const tipGeo = new THREE.SphereGeometry(rad * 0.95, 8, 8);
        const tip = new THREE.Mesh(tipGeo, skinMat);
        tip.position.set(x, -0.045, -0.15 - len * 0.7);
        handGroup.add(tip);
      });

      return handGroup;
    };

    // Instantiate Left & Right Hand (Directly connecting to wrists at natural human scale)
    const leftHand = createTypingHand(true);
    leftHand.position.set(-0.48, 1.16, -1.28);
    leftHand.rotation.y = 0.18; // Natural inward typing angle
    handsGroup.add(leftHand);

    const rightHand = createTypingHand(false);
    rightHand.position.set(0.48, 1.16, -1.28);
    rightHand.rotation.y = -0.18; // Natural inward typing angle
    handsGroup.add(rightHand);

    // --- H. RECTANGULAR FLOORING PLATFORM ---
    // White with subtle light blue tint architectural diorama plinth
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xeaf2fa, // Crisp white with a bit of light blue tint
      roughness: 0.35,
      metalness: 0.04,
    });

    // Rectangular Floor Slab (8.8w x 0.14h x 6.6d) centered under desk and chair
    const floorGeo = new THREE.BoxGeometry(8.8, 0.14, 6.6);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -0.07, 0.9);
    floorMesh.receiveShadow = true;
    floorMesh.castShadow = true;
    workstationGroup.add(floorMesh);

    // Subtle stepped base rim in cool light blue
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd6e5f5,
      roughness: 0.45,
    });
    const rimGeo = new THREE.BoxGeometry(8.88, 0.04, 6.68);
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.set(0, -0.14, 0.9);
    rimMesh.receiveShadow = true;
    workstationGroup.add(rimMesh);

    // 6. Animation Loop (60 FPS Calm Motion)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto-rotation when idle
      if (autoRotateRef.current) {
        // Serene, calm turntable float
        targetAzimuthRef.current += delta * 0.18;
      }

      // Smooth damped lerp for rotation
      currentAzimuthRef.current += (targetAzimuthRef.current - currentAzimuthRef.current) * 0.08;

      // Update camera position around isometric orbital cylinder
      const currentAz = currentAzimuthRef.current;
      camera.position.x = cameraDistance * Math.cos(elevation) * Math.sin(currentAz);
      camera.position.z = cameraDistance * Math.cos(elevation) * Math.cos(currentAz);
      camera.lookAt(0, 2.6, 0.5);

      // Subtle coding hand vibration/typing motion
      if (developerHandsRef.current) {
        const typingOffset = isTypingRef.current
          ? Math.sin(elapsedTime * 28) * 0.04
          : Math.sin(elapsedTime * 4) * 0.008;
        developerHandsRef.current.position.y = typingOffset;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Pointer Event Handlers for 360° Drag-to-Rotate
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      previousMouseXRef.current = e.clientX;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMouseXRef.current;
      previousMouseXRef.current = e.clientX;

      // Sensitivity factor
      targetAzimuthRef.current -= deltaX * 0.012;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      // Resume slow auto-rotate after 4.5 seconds of idle
      idleTimerRef.current = setTimeout(() => {
        autoRotateRef.current = true;
      }, 4500);
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = "none";
    domElement.style.display = "block";
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 8. Handle Window & Container Resize (with dynamic aspect containment)
    const updateDimensions = (w: number, h: number) => {
      const { frustumW, frustumH } = calculateFrustum(w, h);
      camera.left = -frustumW / 2;
      camera.right = frustumW / 2;
      camera.top = frustumH / 2;
      camera.bottom = -frustumH / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 460;
      updateDimensions(w, h);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          updateDimensions(w, h);
        }
      }
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (container && domElement && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
      woodTexture.dispose();
      matTexture.dispose();
      renderer.dispose();
    };
  }, [createMainScreenCanvas, createPortraitScreenCanvas, createLightBrownWoodCanvas, createCuttingMatCanvas]);

  // Click interaction: Trigger typing burst & tactile sound
  const handleCardClick = () => {
    sound.click(640, 0.03);
    isTypingRef.current = true;
    setTimeout(() => {
      isTypingRef.current = false;
    }, 1800);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div
        ref={mountRef}
        onClick={handleCardClick}
        className="w-full h-full bg-transparent flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      />

      {/* Fun Personal Desk Callout Badge */}
      <div className="absolute bottom-1 sm:bottom-2 z-10 flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#18181b]/85 border border-white/[0.08] backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-[#8e8e93] select-none pointer-events-none shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8ddd8d] animate-pulse flex-shrink-0" />
        <span className="text-white/80">
          Yes, this is basically 1:1 with my actual desk setup
        </span>
        <span className="hidden md:inline text-white/20">•</span>
        <span className="hidden md:inline text-white/40 text-[10px]">drag to inspect 360°</span>
      </div>
    </div>
  );
}
