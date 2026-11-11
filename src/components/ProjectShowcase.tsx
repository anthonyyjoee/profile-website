"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Project } from "@/data/portfolio";
import { sound } from "@/utils/sound";
import { GithubIcon } from "@/components/Icons";
import { ArrowUpRight, Globe } from "lucide-react";

interface ProjectShowcaseProps {
  projects: Project[];
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
}

export default function ProjectShowcase({
  projects,
  activeProjectIndex,
  onSelectProject,
}: ProjectShowcaseProps) {
  const selected = projects[activeProjectIndex] || projects[0];
  const activeAccent = selected.accentColor || "#e0e055";
  const isLastProject = activeProjectIndex === projects.length - 1;

  // Track item DOM positions to glide the active focus pill smoothly
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef(activeProjectIndex);
  const [slideDirection, setSlideDirection] = useState<"down" | "up">("down");
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
    ready: boolean;
  }>({
    top: 0,
    height: 0,
    ready: false,
  });

  // Determine slide direction when index changes
  useEffect(() => {
    if (activeProjectIndex > prevIndexRef.current) {
      setSlideDirection("down");
    } else if (activeProjectIndex < prevIndexRef.current) {
      setSlideDirection("up");
    }
    prevIndexRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

  // Measure and align the moving focus pill to the active item
  const updateIndicator = useCallback(() => {
    const el = itemRefs.current[activeProjectIndex];
    if (el) {
      setIndicatorStyle({
        top: el.offsetTop,
        height: el.offsetHeight,
        ready: true,
      });
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    updateIndicator();
    // Re-measure after font loading or window resize
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <div className="w-full h-full flex flex-col justify-between pt-8 sm:pt-20 2xl:pt-24 3xl:pt-28 pb-8 sm:pb-6 2xl:pb-8 3xl:pb-10">
      {/* 13g Minimalist Section Header - Scaled for 32" / Ultra-wide */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2 2xl:pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 2xl:mb-2">
            <span
              className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: activeAccent }}
            />
            <span
              className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono tracking-widest uppercase transition-colors duration-300"
              style={{ color: activeAccent }}
            >
              02 / SELECTED WORKS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
            Selected Works
          </h2>
        </div>

        {/* Stepped Scroll Indicator (Desktop only >= lg) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full bg-[#191919] border border-white/[0.08] text-xs 2xl:text-sm font-mono select-none">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.click(650, 0.02);
                  onSelectProject(idx);
                }}
                className={`h-1.5 2xl:h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  idx === activeProjectIndex
                    ? "w-8 2xl:w-10 3xl:w-12"
                    : "w-2 2xl:w-2.5 3xl:w-3 bg-white/20 hover:bg-white/40"
                }`}
                style={{
                  backgroundColor: idx === activeProjectIndex ? activeAccent : undefined,
                }}
                title={`Jump to project 0${idx + 1}`}
                aria-label={`Project 0${idx + 1} of 0${projects.length}`}
              />
            ))}
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-[#8e8e93] ml-1.5 font-medium transition-colors duration-300">
              0{activeProjectIndex + 1} / 0{projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE ONLY: All Project Cards Stacked Vertically (< lg)
          Pure vertical document flow with no slider/tab mechanism
          ========================================================= */}
      <div className="flex lg:hidden flex-col space-y-4 sm:space-y-6 my-3 w-full">
        {projects.map((project, idx) => {
          const accent = project.accentColor || "#e0e055";

          return (
            <div
              key={project.id}
              className="relative p-5 sm:p-7 rounded-2xl bg-[#191919] border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.4)] space-y-3.5"
            >
              {/* Top Meta: Role Pill + Case Index */}
              <div className="flex items-center justify-between gap-3 text-xs font-mono">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
                  style={{
                    backgroundColor: `${accent}18`,
                    color: accent,
                  }}
                >
                  {project.role}
                </span>
                <span
                  className="text-xs font-mono font-bold shrink-0"
                  style={{ color: accent }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Title, Period & Description */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#fbfbfb] tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-[#8e8e93] text-[11px] sm:text-xs font-mono">
                    {project.period}
                  </span>
                </div>
                <p className="text-[13px] sm:text-sm text-[#a1a1aa] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                {project.highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#fbfbfb]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="leading-relaxed text-[#d4d4d8]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-lg bg-[#131313] text-[#a1a1aa] border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Link & Case Number */}
              <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <a
                  href={project.demoUrl || project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click(600, 0.03)}
                  className="inline-flex items-center gap-2 py-1 text-xs sm:text-sm font-semibold text-[#fbfbfb] hover:underline transition-colors group"
                  style={{ color: accent }}
                >
                  {project.demoUrl ? (
                    <Globe className="w-4 h-4 shrink-0" />
                  ) : (
                    <GithubIcon className="w-4 h-4 shrink-0" />
                  )}
                  <span className="truncate sm:overflow-visible">
                    {project.actionLabel ||
                      (project.demoUrl ? "Visit Live Platform" : "Inspect Repository")}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <span className="text-[10px] font-mono text-[#727278] shrink-0">
                  CASE 0{idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          DESKTOP ONLY: Editorial Split View with Gliding Pill (>= lg)
          ========================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24 items-center my-auto">
        {/* Left: Large Editorial Project List with Physical Gliding Focus Pill */}
        <div className="lg:col-span-7 relative space-y-2.5 2xl:space-y-4">
          {/* THE GLIDING ACTIVE FOCUS PILL - Physically slides across rows without blinking */}
          <div
            className="absolute left-0 right-0 rounded-2xl 3xl:rounded-3xl bg-[#191919] border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0"
            style={{
              transform: `translate3d(0, ${indicatorStyle.top}px, 0)`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.ready ? 1 : 0,
            }}
          >
            {/* The traveling accent indicator bar on the left edge */}
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-8 sm:h-10 2xl:h-12 rounded-r-full transition-colors duration-500"
              style={{ backgroundColor: activeAccent }}
            />
          </div>

          {projects.map((project, idx) => {
            const isActive = idx === activeProjectIndex;
            const indexStr = String(idx + 1).padStart(2, "0");
            const accent = project.accentColor || "#e0e055";

            return (
              <div
                key={project.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onMouseEnter={() => {
                  sound.hover();
                }}
                onClick={() => {
                  sound.click(650, 0.02);
                  onSelectProject(idx);
                }}
                className={`group relative z-10 py-5 sm:py-6 2xl:py-8 3xl:py-10 4xl:py-12 px-6 sm:px-8 2xl:px-10 3xl:px-12 rounded-2xl 3xl:rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between border border-transparent ${
                  isActive
                    ? "translate-x-2.5 sm:translate-x-3.5 2xl:translate-x-4"
                    : "hover:bg-white/[0.02] translate-x-0"
                }`}
              >
                <div className="flex items-baseline gap-5 sm:gap-7 2xl:gap-9 3xl:gap-11 pl-1">
                  <span
                    className={`font-mono text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg transition-all duration-300 ${
                      isActive ? "scale-110 font-bold" : "text-[#727278]"
                    }`}
                    style={{ color: isActive ? accent : undefined }}
                  >
                    {indexStr}
                  </span>
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-semibold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-[#fbfbfb]"
                          : "text-[#8e8e93] group-hover:text-[#fbfbfb]"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2.5 2xl:gap-3.5 mt-1.5 2xl:mt-3 text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg font-mono text-[#8e8e93]">
                      <span
                        className="transition-colors duration-300 font-medium"
                        style={{ color: isActive ? accent : "#8e8e93" }}
                      >
                        {project.period}
                      </span>
                      <span>•</span>
                      <span>{project.role}</span>
                    </div>
                  </div>
                </div>

                {/* Vertically Centered Arrow Icon with Focus Right Margin */}
                <div
                  className={`flex items-center justify-center shrink-0 self-center transition-all duration-300 ${
                    isActive ? "mr-2 sm:mr-3 2xl:mr-4" : "mr-0"
                  }`}
                >
                  <ArrowUpRight
                    className={`w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-all duration-300 ${
                      isActive
                        ? "scale-110"
                        : "text-[#727278] group-hover:text-[#fbfbfb] group-hover:translate-x-0.5"
                    }`}
                    style={{ color: isActive ? accent : undefined }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Minimalist Case Card View with Directional Slide & Stagger */}
        <div className="w-full lg:col-span-5 relative">
          <div
            key={selected.id}
            className={`${
              slideDirection === "down"
                ? "animate-project-slide-down"
                : "animate-project-slide-up"
            } relative p-6 sm:p-8 2xl:p-10 3xl:p-12 4xl:p-14 rounded-3xl 3xl:rounded-[2.5rem] bg-[#191919] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-4 2xl:space-y-6 3xl:space-y-7`}
          >
            {/* Top Category Pill & Period */}
            <div className="flex items-center justify-between text-xs 2xl:text-sm font-mono animate-project-stagger-1">
              <span
                className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm uppercase tracking-wider font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: `${activeAccent}18`,
                  color: activeAccent,
                }}
              >
                {selected.role}
              </span>
              <span className="text-[#8e8e93] text-[11px] 2xl:text-xs 3xl:text-sm">
                {selected.period}
              </span>
            </div>

            {/* Project Title & Narrative */}
            <div className="animate-project-stagger-1">
              <h4 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-bold text-[#fbfbfb] tracking-tight mb-2 2xl:mb-3">
                {selected.title}
              </h4>
              <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl text-[#8e8e93] leading-relaxed">
                {selected.description}
              </p>
            </div>

            {/* Clean Outcomes List */}
            <div className="space-y-2 2xl:space-y-3.5 3xl:space-y-4 pt-1 2xl:pt-2 border-t border-white/[0.06] animate-project-stagger-2">
              {selected.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 2xl:gap-3.5 text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg text-[#fbfbfb]"
                >
                  <span
                    className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 3xl:w-2.5 3xl:h-2.5 rounded-full mt-1.5 2xl:mt-2 shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: activeAccent }}
                  />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Technology Tags */}
            <div className="pt-2 2xl:pt-3 flex flex-wrap gap-1.5 2xl:gap-2 animate-project-stagger-3">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 3xl:px-4 3xl:py-2 text-[10px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-mono rounded-lg 2xl:rounded-xl bg-[#131313] text-[#8e8e93] border border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action Link */}
            <div className="pt-2 2xl:pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={selected.demoUrl || selected.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click(600, 0.03)}
                className="inline-flex items-center gap-2 2xl:gap-3 text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg font-semibold text-[#fbfbfb] hover:underline transition-colors group"
                style={{ color: activeAccent }}
              >
                {selected.demoUrl ? (
                  <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5" />
                ) : (
                  <GithubIcon className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5" />
                )}
                <span>
                  {selected.actionLabel ||
                    (selected.demoUrl ? "Visit Live Platform" : "Inspect Repository")}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-[10px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-mono text-[#727278]">
                CASE 0{activeProjectIndex + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 13g Minimalist Bottom Status Bar (Desktop only >= lg) */}
      <div className="hidden lg:flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93] pt-2 2xl:pt-3">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: activeAccent }}
          />
          <span key={selected.id} className="animate-project-stagger-1 inline-block">
            ACTIVE // {selected.title.toUpperCase()}
          </span>
        </div>
        <span className="text-[#727278]">
          {isLastProject
            ? "SCROLL DOWN TO ADVANCE TO CAPABILITIES"
            : `SCROLL DOWN FOR NEXT PROJECT (0${activeProjectIndex + 2} / 0${projects.length})`}
        </span>
      </div>
    </div>
  );
}
