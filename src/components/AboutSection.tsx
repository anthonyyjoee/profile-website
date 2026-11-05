"use client";

import { Award, Cloud, Database, Activity, CheckCircle2, Server } from "lucide-react";
import { personalData } from "@/data/portfolio";

export default function AboutSection() {
  const { about } = personalData;

  return (
    <div className="w-full h-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2">
        <div>
          <span className="text-[11px] font-mono text-[#d4ff00] tracking-widest uppercase block mb-1">
            01 / ABOUT ME &amp; ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
            Engineering Profile
          </h2>
        </div>
        <div className="text-[11px] font-mono text-[#87878d] text-left md:text-right">
          [BACKEND SYSTEMS • CLOUD INFRASTRUCTURE • AWS SAA]
        </div>
      </div>

      {/* Main Content Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto overflow-y-auto lg:overflow-visible max-h-[76vh] lg:max-h-none pr-1">
        {/* Left Column: Biography, Pillars & Tech Stack */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* Primary Lead Statement */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#fbfbfb] leading-snug tracking-tight">
              {about.lead}
            </h3>
            <p className="text-xs sm:text-sm text-[#87878d] leading-relaxed">
              {about.body}
            </p>
          </div>

          {/* AWS Certification Badge Callout */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#141417] border border-white/[0.08] flex items-center justify-between gap-3 group hover:border-[#d4ff00]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1f1f26] flex items-center justify-center text-[#d4ff00] shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#fbfbfb] tracking-tight">
                    {about.certification}
                  </span>
                  <Award className="w-3.5 h-3.5 text-[#d4ff00]" />
                </div>
                <p className="text-[11px] font-mono text-[#87878d]">
                  Cloud architecture, highly available distributed systems &amp; security best practices
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4ff00]/10 text-[#d4ff00] text-[10px] font-mono uppercase tracking-wider shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              <span>Certified</span>
            </div>
          </div>

          {/* Three Architecture Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {about.focusPillars.map((pillar) => (
              <div
                key={pillar.label}
                className="p-3 rounded-xl bg-[#141417] border border-white/[0.05] hover:border-white/[0.15] transition-all"
              >
                <div className="flex items-center gap-1.5 mb-1 text-[#d4ff00]">
                  {pillar.label === "Reliability" && <Server className="w-3.5 h-3.5" />}
                  {pillar.label === "Data Consistency" && <Database className="w-3.5 h-3.5" />}
                  {pillar.label === "Observability" && <Activity className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    {pillar.label}
                  </span>
                </div>
                <p className="text-[11px] text-[#87878d] leading-snug">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack Matrix Overview */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-mono text-[#87878d] uppercase tracking-wider block">
              Core Technical Stack &amp; Infrastructure:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {about.techCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="p-2.5 rounded-lg bg-[#141417]/80 border border-white/[0.04] flex flex-col justify-center"
                >
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">
                    {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-1.5 py-0.5 rounded bg-[#0e0e10] text-[#fbfbfb] text-[10px] border border-white/[0.06]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Portrait Frame */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#141417] border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6)] group">
            {/* Top HUD Overlay */}
            <div className="absolute top-0 inset-x-0 p-3.5 flex items-center justify-between z-20 pointer-events-none bg-gradient-to-b from-[#0e0e10]/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                <span className="text-[10px] font-mono text-[#fbfbfb] uppercase tracking-wider">
                  SYS_PORTRAIT // ID-0492
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#d4ff00] border border-[#d4ff00]/30 uppercase tracking-widest">
                AWS CERTIFIED
              </span>
            </div>

            {/* Portrait Image with graceful fallback to custom SVG avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="Anthony — Software Engineer"
              onError={(e) => {
                // Seamlessly falls back to our bespoke architectural silhouette avatar SVG
                e.currentTarget.src = "/avatar.svg";
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom Editorial Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/90 to-transparent z-20">
              <div className="p-2.5 rounded-xl bg-[#141417]/90 backdrop-blur-md border border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#fbfbfb] uppercase tracking-tight">
                    {personalData.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#d4ff00] font-semibold">
                    {about.experience}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[#87878d] leading-none truncate">
                  RUBY ON RAILS • AWS SAA • SYSTEM DESIGN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#87878d] pt-2">
        <span>CORE SPECIALIZATION // BACKEND DISTRIBUTED SYSTEMS &amp; AWS CLOUD</span>
        <span className="text-zinc-600 hidden sm:inline">SCROLL DOWN TO EXPLORE SELECTED WORKS</span>
      </div>
    </div>
  );
}
