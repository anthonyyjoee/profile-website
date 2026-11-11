"use client";

import { useState, useEffect } from "react";
import { sound } from "@/utils/sound";
import { personalData } from "@/data/portfolio";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";

interface StudioHeaderProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

const SECTION_METADATA = [
  { index: 0, label: "HOME", title: "Overview", color: "#fbfbfb" },
  { index: 1, label: "ABOUT", title: "About Me", color: "#faaafa" },
  { index: 2, label: "WORKS", title: "Selected Works", color: "#6066ee" },
  { index: 3, label: "STACK", title: "Capabilities", color: "#8ddd8d" },
  { index: 4, label: "CONTACT", title: "Get in Touch", color: "#e0e055" },
];

export default function StudioHeader({ currentSection, onNavigate }: StudioHeaderProps) {
  const [audioActive, setAudioActive] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalScenes = personalData.navigation.length + 1;

  const currentMeta = SECTION_METADATA[currentSection] || SECTION_METADATA[0];

  // Lock background scrolling on mobile when navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleAudio = () => {
    const newState = sound.toggle();
    setAudioActive(newState);
  };

  const handleMobileNav = (index: number) => {
    sound.click(580, 0.02);
    onNavigate(index);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating island navigation bar */}
      <header className="fixed top-4 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[calc(100%-2rem)] max-w-fit">
        {/* =========================================================
            DESKTOP / TABLET NAVIGATION PILL (>= md)
            ========================================================= */}
        <nav
          aria-label="Primary portfolio navigation"
          className="hidden md:flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#191919]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-xs font-mono tracking-wider select-none whitespace-nowrap"
        >
          {/* Scene Index Tracker - Clean & Unobtrusive */}
          <button
            onClick={() => {
              sound.click(500, 0.02);
              onNavigate(0);
            }}
            className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-[11px] font-mono text-[#e0e055] font-bold tracking-wider transition-colors cursor-pointer mr-0.5"
            title="Current scene (Click to return to Home)"
            aria-label={`Current scene 0${currentSection + 1} of 0${totalScenes}. Click to jump to Home.`}
          >
            0{currentSection + 1} / 0{totalScenes}
          </button>

          {/* Dynamic Navigation Links from TS Data */}
          {personalData.navigation.map((item) => {
            const isActive = currentSection === item.index;
            return (
              <button
                key={item.index}
                onClick={() => {
                  sound.hover();
                  onNavigate(item.index);
                }}
                style={{
                  color: isActive ? item.color : undefined,
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "font-bold bg-white/[0.06]"
                    : "text-[#8e8e93] hover:text-[#fbfbfb] hover:bg-white/[0.03]"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="h-3.5 w-[1px] bg-white/[0.1] mx-0.5 sm:mx-1" />

          {/* Tactile Audio Effects Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer ${
              audioActive
                ? "text-[#e0e055] bg-zinc-800"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
            aria-label="Toggle interface sound effects"
            title={audioActive ? "Mute interface audio" : "Enable interface audio"}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </nav>

        {/* =========================================================
            MOBILE SLEEK ISLAND BAR (< md)
            ========================================================= */}
        <div className="flex md:hidden items-center justify-between gap-2.5 px-3.5 py-2 rounded-full bg-[#191919]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-xs font-mono select-none w-full max-w-[340px] mx-auto">
          {/* Active Section Indicator */}
          <button
            onClick={() => handleMobileNav(0)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] text-[11px] font-mono tracking-wider cursor-pointer"
            aria-label="Jump to Home"
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: currentMeta.color }}
            />
            <span className="text-[#fbfbfb] font-bold">0{currentSection + 1}</span>
            <span className="text-white/30">•</span>
            <span
              className="font-medium uppercase tracking-wider text-[10px] transition-colors duration-300"
              style={{ color: currentMeta.color }}
            >
              {currentMeta.label}
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                audioActive ? "text-[#e0e055] bg-zinc-800" : "text-zinc-500"
              }`}
              aria-label="Toggle interface sound"
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Menu Drawer Toggle */}
            <button
              onClick={() => {
                sound.click(620, 0.02);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-full bg-white/[0.05] text-[#fbfbfb] hover:bg-white/[0.1] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE EXPANDABLE NAVIGATION DRAWER (< md)
          ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/90 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-10 px-6 sm:px-8 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-[#8e8e93] uppercase tracking-widest">
              <span>Index // Sections</span>
              <span>0{currentSection + 1} / 0{totalScenes}</span>
            </div>

            {/* Navigation Rows */}
            <div className="space-y-2">
              {SECTION_METADATA.map((meta) => {
                const isActive = currentSection === meta.index;
                return (
                  <button
                    key={meta.index}
                    onClick={() => handleMobileNav(meta.index)}
                    className={`w-full flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all cursor-pointer font-mono ${
                      isActive
                        ? "bg-white/[0.08] border border-white/[0.15]"
                        : "hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="text-xs text-[#8e8e93]">0{meta.index + 1}</span>
                      <span
                        className="text-sm font-semibold tracking-wide"
                        style={{ color: isActive ? meta.color : "#fbfbfb" }}
                      >
                        {meta.title}
                      </span>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-[#fbfbfb] translate-x-0.5" : "text-white/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer with Quick Platform Links & Audio Status */}
          <div className="pt-6 border-t border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8e8e93]">
              <span>AUDIO EFFECTS</span>
              <button
                onClick={toggleAudio}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] text-[#fbfbfb] cursor-pointer"
              >
                {audioActive ? <Volume2 className="w-3 h-3 text-[#e0e055]" /> : <VolumeX className="w-3 h-3" />}
                <span className="text-[10px]">{audioActive ? "ENABLED" : "MUTED"}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2">
              {personalData.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8e8e93] hover:text-[#fbfbfb] p-2 transition-colors cursor-pointer"
                  aria-label={s.label}
                >
                  {s.platform === "github" && <GithubIcon className="w-5 h-5" />}
                  {s.platform === "linkedin" && <LinkedinIcon className="w-5 h-5" />}
                  {s.platform === "instagram" && <InstagramIcon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
