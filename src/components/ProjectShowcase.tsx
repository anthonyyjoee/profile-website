"use client";

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

  return (
    <div className="w-full h-full flex flex-col justify-between pt-16 sm:pt-20 2xl:pt-24 3xl:pt-28 pb-4 sm:pb-6 2xl:pb-8 3xl:pb-10">
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

        {/* Stepped Scroll Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full bg-[#191919] border border-white/[0.08] text-xs 2xl:text-sm font-mono select-none">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.click(650, 0.02);
                  onSelectProject(idx);
                }}
                className={`h-1.5 2xl:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeProjectIndex
                    ? "w-6 2xl:w-8 3xl:w-10"
                    : "w-2 2xl:w-2.5 3xl:w-3 bg-white/20 hover:bg-white/40"
                }`}
                style={{
                  backgroundColor: idx === activeProjectIndex ? activeAccent : undefined,
                }}
                title={`Jump to project 0${idx + 1}`}
                aria-label={`Project 0${idx + 1} of 0${projects.length}`}
              />
            ))}
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-[#8e8e93] ml-1.5 font-medium">
              0{activeProjectIndex + 1} / 0{projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Interactive Split View - Fluid ultra-wide spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24 items-center my-auto">
        {/* Left: Large Editorial Project List */}
        <div className="lg:col-span-7 space-y-2.5 2xl:space-y-4">
          {projects.map((project, idx) => {
            const isActive = idx === activeProjectIndex;
            const indexStr = String(idx + 1).padStart(2, "0");
            const accent = project.accentColor || "#e0e055";

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  sound.hover();
                }}
                onClick={() => {
                  sound.click(650, 0.02);
                  onSelectProject(idx);
                }}
                className={`group py-5 sm:py-6 2xl:py-8 3xl:py-10 4xl:py-12 px-6 sm:px-8 2xl:px-10 3xl:px-12 rounded-2xl 3xl:rounded-3xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                  isActive
                    ? "bg-[#191919] border-white/[0.1] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    : "border-transparent hover:bg-[#191919]/40 hover:border-white/[0.04]"
                }`}
              >
                <div className="flex items-baseline gap-5 sm:gap-7 2xl:gap-9 3xl:gap-11">
                  <span
                    className="font-mono text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg transition-colors duration-300"
                    style={{ color: isActive ? accent : "#727278" }}
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
                      <span style={{ color: isActive ? accent : "#8e8e93" }}>
                        {project.period}
                      </span>
                      <span>•</span>
                      <span>{project.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ArrowUpRight
                    className={`w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-all duration-300 ${
                      isActive
                        ? "translate-x-1 -translate-y-1"
                        : "text-[#727278] group-hover:text-[#fbfbfb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                    style={{ color: isActive ? accent : undefined }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Minimalist Case Card View - Rich, balanced proportions on 32" screens */}
        <div className="lg:col-span-5">
          <div
            key={selected.id}
            className="animate-project-switch p-6 sm:p-8 2xl:p-10 3xl:p-12 4xl:p-14 rounded-3xl 3xl:rounded-[2.5rem] bg-[#191919] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-4 2xl:space-y-6 3xl:space-y-7"
          >
            {/* Top Category Pill & Period */}
            <div className="flex items-center justify-between text-xs 2xl:text-sm font-mono">
              <span
                className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm uppercase tracking-wider font-semibold"
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
            <div>
              <h4 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-bold text-[#fbfbfb] tracking-tight mb-2 2xl:mb-3">
                {selected.title}
              </h4>
              <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl text-[#8e8e93] leading-relaxed">
                {selected.description}
              </p>
            </div>

            {/* Clean Outcomes List */}
            <div className="space-y-2 2xl:space-y-3.5 3xl:space-y-4 pt-1 2xl:pt-2 border-t border-white/[0.06]">
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
            <div className="pt-2 2xl:pt-3 flex flex-wrap gap-1.5 2xl:gap-2">
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

      {/* 13g Minimalist Bottom Status Bar */}
      <div className="flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93] pt-2 2xl:pt-3">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: activeAccent }}
          />
          <span>ACTIVE // {selected.title.toUpperCase()}</span>
        </div>
        <span className="text-[#727278] hidden sm:inline">
          {isLastProject
            ? "SCROLL DOWN TO ADVANCE TO CAPABILITIES"
            : `SCROLL DOWN FOR NEXT PROJECT (0${activeProjectIndex + 2} / 0${projects.length})`}
        </span>
      </div>
    </div>
  );
}
