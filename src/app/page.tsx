"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import StudioHeader from "@/components/StudioHeader";
import AboutSection from "@/components/AboutSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import { personalData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";
import { sound } from "@/utils/sound";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
} from "lucide-react";

const TOTAL_SECTIONS = 5;
const WORKS_SECTION_INDEX = 2;

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const projectCooldownRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  const totalProjects = personalData.featuredProjects.length;

  const goToSection = useCallback((index: number, targetProjectIndex?: number) => {
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setCurrentSection(index);

    if (index === WORKS_SECTION_INDEX) {
      if (typeof targetProjectIndex === "number") {
        setActiveProjectIndex(targetProjectIndex);
      } else if (currentSection < WORKS_SECTION_INDEX) {
        setActiveProjectIndex(0);
      } else if (currentSection > WORKS_SECTION_INDEX) {
        setActiveProjectIndex(totalProjects - 1);
      }
    }

    sound.click(580, 0.02);

    // Lock window during the 900ms luxury ease transition
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 950);
  }, [currentSection, totalProjects]);

  // -------------------------------------------------------------
  // 13g Butter-Smooth Wheel Controller (Zero Drift, Exact Snapping)
  // Stepped scroll inside Selected Works section
  // -------------------------------------------------------------
  useEffect(() => {
    let accumulatedDelta = 0;
    let deltaResetTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Allow browser shortcuts (zoom, inspect)
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();

      if (isAnimatingRef.current || projectCooldownRef.current) return;

      accumulatedDelta += e.deltaY;

      clearTimeout(deltaResetTimer);
      deltaResetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 140);

      // Threshold calibrated for both Mac trackpad inertia and mouse wheel notches
      const threshold = 32;

      if (accumulatedDelta > threshold) {
        accumulatedDelta = 0;

        // In Selected Works, step through project items before advancing section
        if (currentSection === WORKS_SECTION_INDEX) {
          if (activeProjectIndex < totalProjects - 1) {
            projectCooldownRef.current = true;
            setActiveProjectIndex((prev) => prev + 1);
            sound.click(650, 0.02);
            setTimeout(() => {
              projectCooldownRef.current = false;
            }, 380);
            return;
          }
        }

        goToSection(currentSection + 1);
      } else if (accumulatedDelta < -threshold) {
        accumulatedDelta = 0;

        // In Selected Works, step backward through project items before retreating section
        if (currentSection === WORKS_SECTION_INDEX) {
          if (activeProjectIndex > 0) {
            projectCooldownRef.current = true;
            setActiveProjectIndex((prev) => prev - 1);
            sound.click(650, 0.02);
            setTimeout(() => {
              projectCooldownRef.current = false;
            }, 380);
            return;
          }
        }

        goToSection(currentSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(deltaResetTimer);
    };
  }, [currentSection, activeProjectIndex, totalProjects, goToSection]);

  // -------------------------------------------------------------
  // Keyboard Navigation (Arrow Keys, PageUp/Down, Space, Home/End)
  // Stepped keyboard arrow navigation in Selected Works
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        if (isAnimatingRef.current || projectCooldownRef.current) return;

        if (currentSection === WORKS_SECTION_INDEX) {
          if (activeProjectIndex < totalProjects - 1) {
            projectCooldownRef.current = true;
            setActiveProjectIndex((prev) => prev + 1);
            sound.click(650, 0.02);
            setTimeout(() => {
              projectCooldownRef.current = false;
            }, 300);
            return;
          }
        }
        goToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (isAnimatingRef.current || projectCooldownRef.current) return;

        if (currentSection === WORKS_SECTION_INDEX) {
          if (activeProjectIndex > 0) {
            projectCooldownRef.current = true;
            setActiveProjectIndex((prev) => prev - 1);
            sound.click(650, 0.02);
            setTimeout(() => {
              projectCooldownRef.current = false;
            }, 300);
            return;
          }
        }
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
  }, [currentSection, activeProjectIndex, totalProjects, goToSection]);

  // -------------------------------------------------------------
  // Touch Swipe Controller for Mobile & Tablet
  // Stepped swipe gestures in Selected Works
  // -------------------------------------------------------------
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current || projectCooldownRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - touchEndY;
      const diffX = touchStartXRef.current - touchEndX;

      // Vertical swipe threshold
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 42) {
        if (diffY > 0) {
          if (currentSection === WORKS_SECTION_INDEX) {
            if (activeProjectIndex < totalProjects - 1) {
              projectCooldownRef.current = true;
              setActiveProjectIndex((prev) => prev + 1);
              sound.click(650, 0.02);
              setTimeout(() => {
                projectCooldownRef.current = false;
              }, 350);
              return;
            }
          }
          goToSection(currentSection + 1);
        } else {
          if (currentSection === WORKS_SECTION_INDEX) {
            if (activeProjectIndex > 0) {
              projectCooldownRef.current = true;
              setActiveProjectIndex((prev) => prev - 1);
              sound.click(650, 0.02);
              setTimeout(() => {
                projectCooldownRef.current = false;
              }, 350);
              return;
            }
          }
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
  }, [currentSection, activeProjectIndex, totalProjects, goToSection]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-[#131313] text-[#fbfbfb] select-none font-sans">
      {/* 13g Floating Studio Header Bar (NO dividing border line) */}
      <StudioHeader
        currentSection={currentSection}
        onNavigate={goToSection}
      />

      {/* Ambient Top Hairline Progress Bar with 13g user palette */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
        style={{
          width: `${((currentSection + 1) / TOTAL_SECTIONS) * 100}%`,
          background: "linear-gradient(90deg, #8ddd8d, #6066ee, #e0e055, #faaafa)",
        }}
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
            SCREEN 0: MONUMENTAL HERO
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-36 pt-20 sm:pt-24 2xl:pt-28 pb-4 sm:pb-6 2xl:pb-8 relative">
          {/* Centerpiece: Monumental Typography */}
          <div className="my-auto relative z-10 max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl flex flex-col justify-center space-y-4 sm:space-y-5 2xl:space-y-7">
            <div className="space-y-0.5">
              {/* Line 1 Mask Reveal */}
              <div className="reveal-mask">
                <h1 className="reveal-item delay-1 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-bold uppercase tracking-tighter text-[#fbfbfb] leading-[0.92]">
                  {personalData.hero.greeting}
                </h1>
              </div>

              {/* Line 2 Mask Reveal */}
              <div className="reveal-mask">
                <span className="reveal-item delay-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-bold uppercase tracking-tighter text-[#8e8e93] leading-[0.92] hover:text-[#e0e055] transition-colors duration-500">
                  {personalData.hero.title}
                </span>
              </div>
            </div>

            {/* Subtext Reveal - Friendly, Passionate & Coffee-Fueled */}
            <div className="reveal-mask">
              <p className="reveal-item delay-3 max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-[#8e8e93] font-normal leading-relaxed">
                {personalData.hero.description}
              </p>
            </div>

            {/* Action Buttons & Social Icons */}
            <div className="reveal-mask pt-2 2xl:pt-4">
              <div className="reveal-item delay-4 w-full space-y-4 2xl:space-y-6">
                {/* Primary Row: Explore Works + Get in Touch */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 2xl:gap-6">
                  <button
                    onClick={() => goToSection(2)}
                    className="px-6 2xl:px-8 py-3.5 2xl:py-4 rounded-xl 2xl:rounded-2xl bg-[#fbfbfb] hover:bg-[#e0e055] text-black font-bold text-xs 2xl:text-sm uppercase font-mono tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2.5 2xl:gap-3 group cursor-pointer"
                  >
                    <span>{personalData.hero.exploreButtonText}</span>
                    <ArrowDown className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => goToSection(4)}
                    className="px-6 2xl:px-8 py-3.5 2xl:py-4 rounded-xl 2xl:rounded-2xl bg-[#191919] hover:bg-[#222222] text-[#8e8e93] hover:text-[#fbfbfb] border border-white/[0.08] hover:border-white/[0.2] text-xs 2xl:text-sm uppercase font-mono tracking-wider transition-colors inline-flex items-center gap-2.5 2xl:gap-3 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    <span>{personalData.hero.contactButtonText}</span>
                  </button>
                </div>

                {/* Social Platform Icons Row - Driven by TS Data */}
                <div className="flex items-center gap-5 2xl:gap-7 pt-2 2xl:pt-3">
                  {personalData.socials.map((social) => {
                    const hoverColor =
                      social.platform === "github"
                        ? "hover:text-[#8ddd8d]"
                        : social.platform === "linkedin"
                        ? "hover:text-[#6066ee]"
                        : "hover:text-[#faaafa]";

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[#8e8e93] ${hoverColor} transition-colors duration-200 inline-flex items-center justify-center group cursor-pointer`}
                        aria-label={`${social.label} Profile`}
                        title={`${social.label} Profile`}
                      >
                        {social.platform === "github" && (
                          <GithubIcon className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-transform group-hover:scale-110" />
                        )}
                        {social.platform === "linkedin" && (
                          <LinkedinIcon className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-transform group-hover:scale-110" />
                        )}
                        {social.platform === "instagram" && (
                          <InstagramIcon className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-transform group-hover:scale-110" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom of Screen 0: Integrated Ethos Marquee from TS Data */}
          <div className="w-full py-1 overflow-hidden select-none opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-10 2xl:gap-14 whitespace-nowrap animate-marquee text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#87878d] uppercase tracking-widest">
              {personalData.hero.marqueeItems.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SCREEN 1: ABOUT ME & ENGINEERING ARCHITECTURE
            ========================================================= */}
        <section className="w-full h-[100dvh] px-6 sm:px-12 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-36 flex flex-col justify-center relative overflow-hidden">
          <AboutSection />
        </section>

        {/* =========================================================
            SCREEN 2: SELECTED WORKS SHOWCASE
            ========================================================= */}
        <section className="w-full h-[100dvh] px-6 sm:px-12 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-36 flex flex-col justify-center relative overflow-hidden">
          <ProjectShowcase
            projects={personalData.featuredProjects}
            activeProjectIndex={activeProjectIndex}
            onSelectProject={setActiveProjectIndex}
          />
        </section>

        {/* =========================================================
            SCREEN 3: CAPABILITIES & TECHNICAL MATRIX
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-36 pt-18 sm:pt-22 2xl:pt-24 3xl:pt-28 pb-4 sm:pb-6 2xl:pb-8 3xl:pb-10 relative overflow-hidden">
          {/* 13g Minimalist Section Header - Scaled for 32" / Ultra-wide */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2 2xl:pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1 2xl:mb-2">
                <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#8ddd8d]" />
                <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8ddd8d] tracking-widest uppercase">
                  {personalData.capabilities.sectionTag}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
                {personalData.capabilities.sectionTitle}
              </h2>
            </div>
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93]">
              {personalData.capabilities.sectionSubtitle}
            </span>
          </div>

          {/* 3 Airy, Minimalist Columns - Driven by TS Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-10 3xl:gap-14 4xl:gap-16 my-auto">
            {personalData.capabilities.columns.map((col) => (
              <div
                key={col.id}
                className="p-6 sm:p-8 2xl:p-10 3xl:p-12 4xl:p-14 rounded-3xl 3xl:rounded-[2.5rem] bg-[#191919] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-6 2xl:space-y-8 3xl:space-y-10"
              >
                <div className="space-y-3 2xl:space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-mono tracking-widest uppercase font-bold"
                      style={{ color: col.color }}
                    >
                      {`${col.number} // ${col.tag}`}
                    </span>
                    <span
                      className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full"
                      style={{ backgroundColor: col.color }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-bold text-[#fbfbfb] tracking-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl text-[#8e8e93] leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="space-y-2 2xl:space-y-3 3xl:space-y-4 pt-4 2xl:pt-6 border-t border-white/[0.06]">
                  {col.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg font-mono flex items-center gap-2 2xl:gap-3 ${
                        skill.isKey ? "text-[#fbfbfb]" : "text-[#8e8e93]"
                      }`}
                    >
                      <span
                        className="w-1 h-1 2xl:w-1.5 2xl:h-1.5 3xl:w-2 3xl:h-2 rounded-full"
                        style={{
                          backgroundColor: skill.isKey ? col.color : "rgba(255, 255, 255, 0.2)",
                        }}
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 13g Minimalist Bottom Status Bar */}
          <div className="flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93] pt-2 2xl:pt-4">
            <div className="flex items-center gap-3 2xl:gap-4">
              {personalData.capabilities.legend.map((item, idx) => (
                <div key={item.label} className="flex items-center gap-3 2xl:gap-4">
                  {idx > 0 && <span>•</span>}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#fbfbfb]">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="text-[#727278] hidden sm:inline">
              {personalData.capabilities.hint}
            </span>
          </div>
        </section>

        {/* =========================================================
            SCREEN 4: MONUMENTAL STATEMENT & CLOSING
            ========================================================= */}
        <section className="w-full h-[100dvh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-36 pt-18 sm:pt-22 2xl:pt-28 pb-4 sm:pb-6 2xl:pb-8 relative overflow-hidden">
          {/* Top Tag */}
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#faaafa]" />
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#faaafa] tracking-widest uppercase">
              {personalData.contact.sectionTag}
            </span>
          </div>

          {/* Monumental Center Statement */}
          <div className="space-y-5 2xl:space-y-8 my-auto">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] font-bold uppercase tracking-tighter text-[#fbfbfb] leading-[0.9]">
              {personalData.contact.headingPrefix} <br />
              <span className="text-[#8e8e93] hover:text-[#e0e055] transition-colors duration-500">
                {personalData.contact.headingHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl text-[#8e8e93] max-w-xl 2xl:max-w-2xl 3xl:max-w-4xl leading-relaxed">
              {personalData.contact.description}
            </p>

            {/* Action Buttons from TS Data */}
            <div className="flex flex-wrap items-center gap-3 2xl:gap-4 pt-2 2xl:pt-4">
              {personalData.contact.actions.map((action) => {
                if (action.isPrimary) {
                  return (
                    <a
                      key={action.platform}
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 sm:px-7 2xl:px-9 py-3.5 2xl:py-4.5 rounded-xl 2xl:rounded-2xl bg-[#fbfbfb] hover:bg-[#e0e055] text-black font-bold text-xs 2xl:text-sm 3xl:text-base uppercase font-mono tracking-wider transition-all shadow-md inline-flex items-center gap-2.5 2xl:gap-3 group cursor-pointer"
                    >
                      <LinkedinIcon className="w-4 h-4 2xl:w-5 2xl:h-5" />
                      <span>{action.label}</span>
                      <ArrowUpRight className="w-4 h-4 2xl:w-5 2xl:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  );
                }

                const hoverColor =
                  action.platform === "github"
                    ? "hover:text-[#8ddd8d]"
                    : "hover:text-[#faaafa]";

                return (
                  <a
                    key={action.platform}
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 sm:px-7 2xl:px-9 py-3.5 2xl:py-4.5 rounded-xl 2xl:rounded-2xl bg-[#191919] hover:bg-[#222222] text-[#8e8e93] ${hoverColor} font-bold text-xs 2xl:text-sm 3xl:text-base uppercase font-mono tracking-wider transition-all inline-flex items-center gap-2.5 2xl:gap-3 group cursor-pointer`}
                  >
                    {action.platform === "github" ? (
                      <GithubIcon className="w-4 h-4 2xl:w-5 2xl:h-5 transition-colors" />
                    ) : (
                      <InstagramIcon className="w-4 h-4 2xl:w-5 2xl:h-5 transition-colors" />
                    )}
                    <span>{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Minimalist Colophon Line */}
          <footer className="pt-2 2xl:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93]">
            <div className="flex items-center gap-2.5 2xl:gap-3">
              <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#8ddd8d]" />
              <span>{personalData.contact.colophon.copyright}</span>
            </div>

            <div className="text-[#727278]">
              {personalData.contact.colophon.tagline}
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
