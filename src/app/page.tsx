"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import StudioHeader from "@/components/StudioHeader";
import CodeIdeaCanvas from "@/components/CodeIdeaCanvas";
import AboutSection from "@/components/AboutSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import { personalData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";
import { sound } from "@/utils/sound";
import {
  ArrowDown,
  ArrowUpRight,
  Terminal,
  Cloud,
  ShieldCheck,
  Mail,
} from "lucide-react";

const TOTAL_SECTIONS = 5;

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setCurrentSection(index);
    sound.click(580, 0.02);

    // Lock window during the 900ms luxury ease transition
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 950);
  }, []);

  // -------------------------------------------------------------
  // 13g Butter-Smooth Wheel Controller (Zero Drift, Exact Snapping)
  // -------------------------------------------------------------
  useEffect(() => {
    let accumulatedDelta = 0;
    let deltaResetTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Allow browser shortcuts (zoom, inspect)
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();

      if (isAnimatingRef.current) return;

      accumulatedDelta += e.deltaY;

      clearTimeout(deltaResetTimer);
      deltaResetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 140);

      // Threshold calibrated for both Mac trackpad inertia and mouse wheel notches
      const threshold = 32;

      if (accumulatedDelta > threshold) {
        accumulatedDelta = 0;
        goToSection(currentSection + 1);
      } else if (accumulatedDelta < -threshold) {
        accumulatedDelta = 0;
        goToSection(currentSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(deltaResetTimer);
    };
  }, [currentSection, goToSection]);

  // -------------------------------------------------------------
  // Keyboard Navigation (Arrow Keys, PageUp/Down, Space, Home/End)
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        goToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        goToSection(currentSection - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(TOTAL_SECTIONS - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, goToSection]);

  // -------------------------------------------------------------
  // Touch Swipe Controller for Mobile & Tablet
  // -------------------------------------------------------------
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - touchEndY;
      const diffX = touchStartXRef.current - touchEndX;

      // Vertical swipe threshold
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 42) {
        if (diffY > 0) {
          goToSection(currentSection + 1);
        } else {
          goToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, goToSection]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-[#0e0e10] text-[#fbfbfb] select-none font-sans">
      {/* 13g Floating Studio Header Bar (NO dividing border line) */}
      <StudioHeader
        currentSection={currentSection}
        onNavigate={goToSection}
      />

      {/* Ambient Top Hairline Progress Bar (Zero Obstruction, Pure Precision) */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#d4ff00] z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
        style={{ width: `${((currentSection + 1) / TOTAL_SECTIONS) * 100}%` }}
      />

      {/* =========================================================
          THE FULL-VIEWPORT CONTINUOUS FILMSTRIP
          Hardware-accelerated translate3d with 13g luxury cubic ease
          ========================================================= */}
      <div
        className="w-full h-full transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: `translate3d(0, -${currentSection * 100}%, 0)`,
        }}
      >
        {/* =========================================================
            SCREEN 0: MONUMENTAL HERO & SEAMLESS 3D SCULPTURE
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-4 sm:pb-6 relative">
          {/* Centerpiece: Monumental Typography Blending with 3D Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center my-auto relative">
            {/* Left: 13g Massive Mask Revealing Typography */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center space-y-4 sm:space-y-5">
              <div className="space-y-0.5">
                {/* Line 1 Mask Reveal */}
                <div className="reveal-mask">
                  <h1 className="reveal-item delay-1 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-bold uppercase tracking-tighter text-[#fbfbfb] leading-[0.92]">
                    HI, I&apos;M ANTHONY.
                  </h1>
                </div>

                {/* Line 2 Mask Reveal */}
                <div className="reveal-mask">
                  <span className="reveal-item delay-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-bold uppercase tracking-tighter text-[#87878d] leading-[0.92] hover:text-[#d4ff00] transition-colors duration-500">
                    SOFTWARE ENGINEER.
                  </span>
                </div>
              </div>

              {/* Subtext Reveal - Friendly, Passionate & Confident without techstack buzzwords */}
              <div className="reveal-mask">
                <p className="reveal-item delay-3 max-w-xl text-sm sm:text-base text-[#87878d] font-normal leading-relaxed">
                  Deeply passionate about all things technology and the craft of digital building. Backed by 4 years of hands-on engineering experience, I take complex challenges and ambitious ideas, figure out every moving piece, and turn them into dependable, high-impact realities.
                </p>
              </div>

              {/* Action Buttons & Social Icons */}
              <div className="reveal-mask pt-2">
                <div className="reveal-item delay-4 w-full space-y-4">
                  {/* Primary Row: Explore Works + Get in Touch */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    <button
                      onClick={() => goToSection(2)}
                      className="px-6 py-3.5 rounded-xl bg-[#fbfbfb] hover:bg-[#d4ff00] text-black font-bold text-xs uppercase font-mono tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2.5 group cursor-pointer"
                    >
                      <span>Explore Works</span>
                      <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => goToSection(4)}
                      className="px-6 py-3.5 rounded-xl bg-[#141417] hover:bg-[#1e1e24] text-[#87878d] hover:text-[#fbfbfb] border border-white/[0.08] hover:border-white/[0.2] text-xs uppercase font-mono tracking-wider transition-colors inline-flex items-center gap-2.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Get in Touch</span>
                    </button>
                  </div>

                  {/* Social Platform Icons Row - Pure icons, NO background color */}
                  <div className="flex items-center gap-5 pt-2">
                    <a
                      href="https://github.com/anthonyyjoee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-[#d4ff00] transition-colors duration-200 inline-flex items-center justify-center group cursor-pointer"
                      aria-label="GitHub Profile"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/anthonyyjoee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-[#d4ff00] transition-colors duration-200 inline-flex items-center justify-center group cursor-pointer"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>

                    <a
                      href="https://www.instagram.com/anthonyyjoee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-[#d4ff00] transition-colors duration-200 inline-flex items-center justify-center group cursor-pointer"
                      aria-label="Instagram Profile"
                      title="Instagram Profile"
                    >
                      <InstagramIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Seamless Intricate 3D Kinetic Sculpture (ZERO Box, ZERO Border, ZERO Clipping) */}
            <div className="lg:col-span-5 relative flex items-center justify-center w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] overflow-visible">
              <CodeIdeaCanvas currentSection={currentSection} />
            </div>
          </div>

          {/* Bottom of Screen 0: Subtle Integrated Ethos Marquee */}
          <div className="w-full py-1 overflow-hidden select-none opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-10 whitespace-nowrap animate-marquee text-[11px] font-mono text-[#87878d] uppercase tracking-widest">
              <span>• PASSIONATE ABOUT TECHNOLOGY</span>
              <span>• 4 YEARS OF ENGINEERING CRAFT</span>
              <span>• TURNING AMBITIOUS IDEAS INTO REALITY</span>
              <span>• DEPENDABLE DIGITAL SYSTEMS</span>
              <span>• PASSIONATE ABOUT TECHNOLOGY</span>
              <span>• 4 YEARS OF ENGINEERING CRAFT</span>
              <span>• TURNING AMBITIOUS IDEAS INTO REALITY</span>
              <span>• DEPENDABLE DIGITAL SYSTEMS</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            SCREEN 1: ABOUT ME & ENGINEERING ARCHITECTURE
            ========================================================= */}
        <section className="w-full h-[100dvh] px-6 sm:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden">
          <AboutSection />
        </section>

        {/* =========================================================
            SCREEN 2: SELECTED WORKS SHOWCASE
            ========================================================= */}
        <section className="w-full h-[100dvh] px-6 sm:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden">
          <ProjectShowcase projects={personalData.featuredProjects} />
        </section>

        {/* =========================================================
            SCREEN 3: CAPABILITIES & TECHNICAL MATRIX
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-18 sm:pt-22 pb-4 sm:pb-6 relative overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2">
            <div>
              <span className="text-[11px] font-mono text-[#d4ff00] tracking-widest uppercase block mb-1">
                03 / CAPABILITIES &amp; METHODS
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
                Technical Stack
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#87878d]">
              [PROVEN PRODUCTION TOOLING &amp; SYSTEM METHODOLOGIES]
            </span>
          </div>

          {/* 3 Architectural Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 my-auto">
            {/* Stack Group 1: Backend & Rails */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141417] hover:bg-[#18181d] transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Terminal className="w-5 h-5 text-[#d4ff00]" />
                  <span className="text-[10px] font-mono text-zinc-500">01</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#fbfbfb] mb-2 group-hover:text-[#d4ff00] transition-colors">
                  Backend Systems &amp; Services
                </h3>
                <p className="text-xs sm:text-sm text-[#87878d] leading-relaxed mb-5">
                  Designing reliable services and high-throughput pipelines with Ruby on Rails, Go, and Node.js.
                </p>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Core Engines</span>
                  <span className="text-[#fbfbfb] font-medium">Ruby on Rails, Go</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Datastores &amp; Queues</span>
                  <span className="text-[#fbfbfb] font-medium">PostgreSQL, Redis, Sidekiq</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Protocols</span>
                  <span className="text-[#fbfbfb] font-medium">REST, gRPC, WebSockets</span>
                </div>
              </div>
            </div>

            {/* Stack Group 2: Cloud Infrastructure & AWS */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141417] hover:bg-[#18181d] transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Cloud className="w-5 h-5 text-[#d4ff00]" />
                  <span className="text-[10px] font-mono text-zinc-500">02</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#fbfbfb] mb-2 group-hover:text-[#d4ff00] transition-colors">
                  Cloud &amp; Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-[#87878d] leading-relaxed mb-5">
                  AWS Certified Solutions Architect engineering fault-tolerant architectures, containers, and automated delivery.
                </p>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Cloud Platform</span>
                  <span className="text-[#fbfbfb] font-medium">AWS (ECS, S3, RDS)</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Containers &amp; CI</span>
                  <span className="text-[#fbfbfb] font-medium">Docker, CI/CD Actions</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Credential</span>
                  <span className="text-[#d4ff00] font-medium">AWS SAA Certified</span>
                </div>
              </div>
            </div>

            {/* Stack Group 3: Architecture & Reliability */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141417] hover:bg-[#18181d] transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#d4ff00]" />
                  <span className="text-[10px] font-mono text-zinc-500">03</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#fbfbfb] mb-2 group-hover:text-[#d4ff00] transition-colors">
                  Reliability &amp; Observability
                </h3>
                <p className="text-xs sm:text-sm text-[#87878d] leading-relaxed mb-5">
                  Focusing on data consistency, zero-downtime operations, and deep production observability.
                </p>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Data Semantics</span>
                  <span className="text-[#fbfbfb] font-medium">ACID &amp; Idempotency</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Observability</span>
                  <span className="text-[#fbfbfb] font-medium">Telemetry, APM &amp; Logs</span>
                </div>
                <div className="p-2.5 rounded bg-[#0e0e10] flex items-center justify-between">
                  <span>Frontend &amp; Web</span>
                  <span className="text-[#fbfbfb] font-medium">Next.js 16, TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Matrix Status */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#87878d] pt-2">
            <span>BENCHMARKS: SUB-10MS P99 • ZERO MEMORY LEAKS • PRODUCTION OBSERVABILITY</span>
            <span className="text-zinc-600 hidden sm:inline">USE ARROW KEYS OR SCROLL TO ADVANCE</span>
          </div>
        </section>

        {/* =========================================================
            SCREEN 4: MONUMENTAL STATEMENT & CLOSING
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-18 sm:pt-22 pb-4 sm:pb-6 relative overflow-hidden">
          {/* Top Tag */}
          <div className="text-[11px] font-mono text-[#d4ff00] tracking-widest uppercase">
            04 / CONTACT &amp; CONNECT
          </div>

          {/* Monumental Center Statement */}
          <div className="space-y-5 my-auto">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] font-bold uppercase tracking-tighter text-[#fbfbfb] leading-[0.9]">
              LET&apos;S BUILD SOMETHING <br />
              <span className="text-[#87878d] hover:text-[#d4ff00] transition-colors duration-500">
                EXTRAORDINARY.
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-[#87878d] max-w-xl leading-relaxed">
              Open for full-stack engineering opportunities, technical advisory, and high-impact digital systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/anthonyyjoee/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#fbfbfb] hover:bg-[#d4ff00] text-black font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-md inline-flex items-center gap-2.5 group"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/anthonyyjoee"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#141417] hover:bg-[#1e1e24] text-zinc-200 hover:text-[#d4ff00] font-bold text-xs uppercase font-mono tracking-wider transition-all inline-flex items-center gap-2.5 group"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#d4ff00] transition-colors" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://www.instagram.com/anthonyyjoee/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#141417] hover:bg-[#1e1e24] text-zinc-200 hover:text-[#d4ff00] font-bold text-xs uppercase font-mono tracking-wider transition-all inline-flex items-center gap-2.5 group"
              >
                <InstagramIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#d4ff00] transition-colors" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Minimalist Colophon Line */}
          <footer className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#87878d]">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
              <span>ANTHONY — SOFTWARE ENGINEER © 2026</span>
            </div>

            <div className="text-zinc-500">
              EDITORIAL CRAFT • 13G FULL-VIEWPORT ARCHITECTURE
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
