"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sound } from "@/utils/sound";

export default function CodeIdeaCanvas({ currentSection = 0 }: { currentSection?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(currentSection);

  useEffect(() => {
    sectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    // Initial camera distance - will be dynamically calibrated by fitCameraToObject
    camera.position.z = 9.5;

    // 2. Renderer with transparent background (Seamless Blending)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // LAYER 1: Faceted Obsidian Core with Glowing Inner Acid-Lime Wireframe
    // -------------------------------------------------------------
    const coreGeometry = new THREE.IcosahedronGeometry(1.25, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141417, // Deep luxury anthracite (13g background match)
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Inner wireframe energy octahedron (13g electric lime #d4ff00)
    const innerWireGeo = new THREE.OctahedronGeometry(0.85, 1);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat);
    coreMesh.add(innerWire);

    // -------------------------------------------------------------
    // LAYER 2: Geodesic Code Matrix with Intersection Spheres
    // -------------------------------------------------------------
    const latticeGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x52525b,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    rootGroup.add(latticeMesh);

    // Physical nodes on every vertex of the geodesic cage
    const latticePositions = latticeGeo.attributes.position;
    const nodeGeometry = new THREE.SphereGeometry(0.035, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf4f4f5 });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < latticePositions.count; i += 3) {
      const vx = latticePositions.getX(i);
      const vy = latticePositions.getY(i);
      const vz = latticePositions.getZ(i);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(vx, vy, vz);
      nodesGroup.add(node);
    }
    latticeMesh.add(nodesGroup);

    // -------------------------------------------------------------
    // LAYER 3: 3 Mechanical Calibrated Gyro Rings with Tick Scales
    // -------------------------------------------------------------
    const createPrecisionRing = (radius: number, tube: number, color: number, opacity: number) => {
      const ringGroup = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringGroup.add(ringMesh);

      // Engraved mechanical tick marks along the ring
      const markerCount = 28;
      const markerGeo = new THREE.BoxGeometry(0.018, 0.085, 0.018);
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: opacity * 1.6,
      });

      for (let i = 0; i < markerCount; i++) {
        const angle = (i / markerCount) * Math.PI * 2;
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        marker.rotation.z = angle;
        ringGroup.add(marker);
      }

      return ringGroup;
    };

    // Scaled radii so all rings and satellites remain 100% round and unclipped within view
    const ring1 = createPrecisionRing(2.1, 0.012, 0x71717a, 0.35);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ring2 = createPrecisionRing(2.42, 0.01, 0xa1a1aa, 0.28);
    ring2.rotation.x = -Math.PI / 3.4;
    ring2.rotation.y = Math.PI / 4;
    rootGroup.add(ring2);

    const ring3 = createPrecisionRing(1.9, 0.014, 0xd4ff00, 0.45);
    ring3.rotation.y = Math.PI / 2.2;
    rootGroup.add(ring3);

    // -------------------------------------------------------------
    // LAYER 4: 3 Orbiting Faceted Satellites
    // -------------------------------------------------------------
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satGeo = new THREE.DodecahedronGeometry(0.08, 0);
    const satMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.95,
      flatShading: true,
    });

    const satellites: THREE.Mesh[] = [];
    const satRadii = [2.0, 2.25, 2.45];
    const satAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];

    satAngles.forEach((angle, idx) => {
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(
        Math.cos(angle) * satRadii[idx],
        (Math.random() - 0.5) * 1.0,
        Math.sin(angle) * satRadii[idx]
      );
      satelliteGroup.add(sat);
      satellites.push(sat);
    });

    // -------------------------------------------------------------
    // LAYER 5: 280+ Floating Stardust Particles
    // -------------------------------------------------------------
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.6 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4d4d8,
      size: 0.028,
      transparent: true,
      opacity: 0.5,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleField);

    // -------------------------------------------------------------
    // Studio Lighting (13g Style: Crisp White + Subtle Lime & Lavender)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const limeRim = new THREE.DirectionalLight(0xd4ff00, 1.6);
    limeRim.position.set(-5, -4, -4);
    scene.add(limeRim);

    const lavenderFill = new THREE.DirectionalLight(0xa78bfa, 1.0);
    lavenderFill.position.set(0, -5, 3);
    scene.add(lavenderFill);

    // -------------------------------------------------------------
    // Scroll Parallax & Mouse Inertia Interaction
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let scrollYOffset = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      sound.click(650, 0.02);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = clientX - prevMouse.x;
        const dy = clientY - prevMouse.y;
        dragVelocity = { x: dx * 0.005, y: dy * 0.005 };
        rootGroup.rotation.y += dragVelocity.x;
        rootGroup.rotation.x += dragVelocity.y;
        prevMouse = { x: clientX, y: clientY };
      } else {
        // Fluid parallax tilt
        targetRotation.y = (clientX / window.innerWidth - 0.5) * 0.8;
        targetRotation.x = (clientY / window.innerHeight - 0.5) * 0.6;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const onScroll = () => {
      scrollYOffset = window.scrollY * 0.0012;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    domElement.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // Outermost geometry radius (ring2 has radius 2.42, satellites up to 2.45)
    const MAX_SCULPTURE_RADIUS = 2.48;

    const fitCameraToObject = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;

      const aspect = w / h;
      camera.aspect = aspect;

      const vFovRad = (camera.fov * Math.PI) / 180;
      const distH = MAX_SCULPTURE_RADIUS / Math.tan(vFovRad / 2);
      const distW = MAX_SCULPTURE_RADIUS / (Math.tan(vFovRad / 2) * aspect);

      // 25% safety margin ensures outer rings NEVER touch or cut off at canvas edges
      camera.position.z = Math.max(distH, distW) * 1.25;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    fitCameraToObject();
    window.addEventListener("resize", fitCameraToObject);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia decay
      if (!isDragging) {
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
        rootGroup.rotation.y += dragVelocity.x;
        rootGroup.rotation.x += dragVelocity.y;

        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.04;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.04;

        rootGroup.rotation.x += currentRotation.x * 0.015;
        rootGroup.rotation.y += currentRotation.y * 0.015;
      }

      // Continuous subtle mechanical drift & section progression
      scrollYOffset += (sectionRef.current * 0.6 - scrollYOffset) * 0.05;
      coreMesh.rotation.y = elapsed * 0.16 + scrollYOffset;
      coreMesh.rotation.z = elapsed * 0.08;
      innerWire.rotation.x = -elapsed * 0.28;

      latticeMesh.rotation.y = -elapsed * 0.1 + scrollYOffset * 0.5;
      latticeMesh.rotation.x = elapsed * 0.06;

      ring1.rotation.z = elapsed * 0.2 + scrollYOffset * 0.8;
      ring2.rotation.z = -elapsed * 0.15;
      ring3.rotation.x = elapsed * 0.18;

      satelliteGroup.rotation.y = elapsed * 0.13 + scrollYOffset * 0.4;
      satellites.forEach((sat, i) => {
        sat.rotation.x = elapsed * (0.35 + i * 0.15);
        sat.rotation.y = elapsed * (0.25 + i * 0.1);
      });

      particleField.rotation.y = elapsed * 0.03;

      // Soft breathing
      const scale = 1 + Math.sin(elapsed * 1.3) * 0.02;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElement.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("scroll", onScroll);
      domElement.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("resize", fitCameraToObject);

      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerWireGeo.dispose();
      innerWireMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    // 100% Seamless Canvas - NO box, NO border, full-height scaling with viewport, ZERO clipping
    <div
      ref={mountRef}
      className="w-full h-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[75vh] cursor-grab active:cursor-grabbing select-none relative flex items-center justify-center overflow-visible"
      aria-label="Interactive 3D procedural kinetic architecture"
    />
  );
}
