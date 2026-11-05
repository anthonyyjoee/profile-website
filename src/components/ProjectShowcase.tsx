"use client";

import { useState } from "react";
import { Project } from "@/data/portfolio";
import { sound } from "@/utils/sound";
import { GithubIcon } from "@/components/Icons";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || "");
  const selected = projects.find((p) => p.id === activeId) || projects[0];

  return (
    <div className="w-full h-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6">
      {/* 13g Monumental Section Header - NO border lines */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2">
        <div>
          <span className="text-[11px] font-mono text-[#d4ff00] tracking-widest uppercase block mb-1">
            02 / SELECTED WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
            Systems &amp; Architecture
          </h2>
        </div>
        <div className="text-[11px] font-mono text-[#87878d] text-left md:text-right">
          [DISTRIBUTED ENGINES • BENCHMARKS &amp; ARCHITECTURE]
        </div>
      </div>

      {/* Editorial Interactive Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto">
        {/* Left: Project List with 13g-style Hover States */}
        <div className="lg:col-span-7 space-y-1">
          {projects.map((project, idx) => {
            const isActive = project.id === activeId;
            const indexStr = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  sound.hover();
                  setActiveId(project.id);
                }}
                onClick={() => {
                  sound.click(650, 0.02);
                  setActiveId(project.id);
                }}
                className={`group py-4 sm:py-5 px-5 sm:px-7 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? "bg-[#141417] pl-8 border-l-2 border-[#d4ff00]"
                    : "hover:bg-[#141417]/50 hover:pl-8 text-zinc-400"
                }`}
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? "text-[#d4ff00] font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {indexStr}
                  </span>
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight transition-colors ${
                        isActive
                          ? "text-[#fbfbfb]"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-[#87878d]">
                      <span>{project.role}</span>
                      <span>—</span>
                      <span>{project.period}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1f24] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive
                        ? "text-[#d4ff00] translate-x-1 -translate-y-1"
                        : "text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Architectural Telemetry & Case Study View */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#141417] shadow-xl transition-all duration-300">
            {/* Top Spec Header */}
            <div className="flex items-center justify-between pb-3 mb-3 text-xs font-mono text-[#87878d]">
              <span className="text-[#d4ff00] font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                SYS_SPECIFICATION
              </span>
              <span className="text-zinc-400">{selected.period}</span>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xl sm:text-2xl font-bold text-[#fbfbfb] tracking-tight">
                {selected.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#87878d] leading-relaxed">
                {selected.description}
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#87878d] uppercase tracking-wider block">
                  Implementation Highlights:
                </span>
                {selected.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#0e0e10] text-[11px] text-zinc-300 flex items-start gap-2"
                  >
                    <span className="text-[#d4ff00] font-mono font-bold mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#1f1f24] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="pt-3 flex items-center justify-between">
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click(600, 0.03)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#fbfbfb] hover:text-[#d4ff00] transition-colors group"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="hover-underline-13g">Inspect Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <span className="text-[10px] font-mono text-[#87878d]">
                  {selected.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#87878d] pt-2">
        <span>ACTIVE SPECIFICATION // {selected.title.toUpperCase()}</span>
        <span className="text-zinc-600 hidden sm:inline">HOVER OR CLICK PROJECTS TO SWITCH PREVIEW</span>
      </div>
    </div>
  );
}
