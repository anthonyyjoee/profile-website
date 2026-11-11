"use client";

import { personalData } from "@/data/portfolio";

export default function AboutSection() {
  const { about } = personalData;

  return (
    <div className="w-full h-full flex flex-col justify-between pt-8 sm:pt-20 2xl:pt-24 3xl:pt-28 pb-8 sm:pb-6 2xl:pb-8">
      {/* 13g Minimalist Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2 2xl:pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 2xl:mb-2">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#faaafa]" />
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#faaafa] tracking-widest uppercase">
              {about.sectionTag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold tracking-tight text-[#fbfbfb] uppercase leading-none">
            {about.sectionTitle}
          </h2>
        </div>
        <div className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93] text-left md:text-right">
          {about.locationStatus}
        </div>
      </div>

      {/* Main Editorial Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-14 2xl:gap-16 3xl:gap-20 4xl:gap-24 items-center my-auto py-2">
        {/* Left Column: Bold Editorial Narrative */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 2xl:space-y-8 3xl:space-y-10">
          {/* Confident Lead Statement */}
          <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-medium text-[#fbfbfb] leading-snug tracking-tight">
            {about.lead}
          </h3>

          {/* Clean Editorial Story Paragraphs */}
          <div className="space-y-3.5 2xl:space-y-4 text-[13px] sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl text-[#a1a1aa] leading-relaxed font-normal">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Clean 3-Pillar Minimalist Rhythms from TS Data */}
          <div className="pt-2 2xl:pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 3xl:gap-8 border-t border-white/[0.08]">
            {about.focusPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-4 sm:p-0 rounded-2xl sm:rounded-none bg-[#191919]/70 sm:bg-transparent border border-white/[0.06] sm:border-0 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: pillar.color }}
                  />
                  <span
                    className="text-[11px] 2xl:text-xs 3xl:text-sm font-mono tracking-wider uppercase font-semibold"
                    style={{ color: pillar.color }}
                  >
                    {pillar.number} • {pillar.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm 2xl:text-base text-[#fbfbfb] font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Clean Editorial Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center py-4 lg:py-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] 2xl:max-w-[420px] 3xl:max-w-[480px] 4xl:max-w-[540px] aspect-[3/4] rounded-2xl sm:rounded-3xl 3xl:rounded-[2.5rem] overflow-hidden bg-[#191919] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
            {/* Minimalist Corner Status Pill */}
            {Boolean(about.portrait.locationTag) && (
              <div className="absolute top-4 left-4 2xl:top-6 2xl:left-6 z-20 pointer-events-none">
                <div className="flex items-center gap-1.5 2xl:gap-2 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-full bg-[#131313]/80 backdrop-blur-md border border-white/[0.1] text-[10px] 2xl:text-xs 3xl:text-sm font-mono text-[#fbfbfb]">
                  <span
                    className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full"
                    style={{ backgroundColor: about.portrait.locationColor }}
                  />
                  <span>{about.portrait.locationTag}</span>
                </div>
              </div>
            )}

            {/* Portrait Image with graceful fallback */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.portrait.image}
              alt={about.portrait.alt}
              onError={(e) => {
                e.currentTarget.src = about.portrait.fallbackImage;
              }}
              style={{
                objectPosition: about.portrait.objectPosition || "center 38%",
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Minimalist Bottom Bar */}
            {Boolean(about.portrait.badgeName || about.portrait.badgeStatus) && (
              <div className="absolute bottom-4 inset-x-4 2xl:bottom-6 2xl:inset-x-6 z-20 pointer-events-none">
                <div className="flex items-center justify-between px-3.5 py-2 2xl:px-5 2xl:py-3 rounded-2xl bg-[#131313]/85 backdrop-blur-md border border-white/[0.08] text-[11px] 2xl:text-xs 3xl:text-sm font-mono">
                  <span className="text-[#fbfbfb] font-medium">{about.portrait.badgeName}</span>
                  <span
                    className="text-[10px] 2xl:text-xs uppercase tracking-wider font-medium"
                    style={{ color: about.portrait.badgeColor }}
                  >
                    {about.portrait.badgeStatus}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 13g Minimalist Bottom Status Bar (Desktop only >= md) */}
      <div className="hidden md:flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm font-mono text-[#8e8e93] pt-2 2xl:pt-4">
        <div className="flex items-center gap-2 2xl:gap-2.5">
          <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#e0e055]" />
          <span>{about.statusBar.text}</span>
        </div>
        <span className="text-[#727278]">{about.statusBar.hint}</span>
      </div>
    </div>
  );
}
