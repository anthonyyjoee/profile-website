"use client";

import { useState } from "react";
import { sound } from "@/utils/sound";
import { Volume2, VolumeX } from "lucide-react";

interface StudioHeaderProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

export default function StudioHeader({ currentSection, onNavigate }: StudioHeaderProps) {
  const [audioActive, setAudioActive] = useState(false);

  const toggleAudio = () => {
    const newState = sound.toggle();
    setAudioActive(newState);
  };

  return (
    // Floating island navigation bar: shorter in width, centered, and elevated
    <header className="fixed top-5 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <nav
        aria-label="Primary portfolio navigation"
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#141417]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-xs font-mono tracking-wider select-none"
      >
        {/* Scene Index Tracker - Clean & Unobtrusive */}
        <button
          onClick={() => {
            sound.click(500, 0.02);
            onNavigate(0);
          }}
          className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-[11px] font-mono text-[#d4ff00] font-bold tracking-wider transition-colors cursor-pointer mr-0.5"
          title="Current scene (Click to return to Home)"
          aria-label={`Current scene 0${currentSection + 1} of 05. Click to jump to Home.`}
        >
          0{currentSection + 1} / 05
        </button>

        {/* About Section Link */}
        <button
          onClick={() => {
            sound.hover();
            onNavigate(1);
          }}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            currentSection === 1
              ? "text-[#d4ff00] font-bold bg-white/[0.06]"
              : "text-[#87878d] hover:text-[#fbfbfb] hover:bg-white/[0.03]"
          }`}
        >
          ABOUT
        </button>

        {/* Works Section Link */}
        <button
          onClick={() => {
            sound.hover();
            onNavigate(2);
          }}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            currentSection === 2
              ? "text-[#d4ff00] font-bold bg-white/[0.06]"
              : "text-[#87878d] hover:text-[#fbfbfb] hover:bg-white/[0.03]"
          }`}
        >
          WORKS
        </button>

        {/* Capabilities Section Link */}
        <button
          onClick={() => {
            sound.hover();
            onNavigate(3);
          }}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            currentSection === 3
              ? "text-[#d4ff00] font-bold bg-white/[0.06]"
              : "text-[#87878d] hover:text-[#fbfbfb] hover:bg-white/[0.03]"
          }`}
        >
          CAPABILITIES
        </button>

        {/* Contact Section Link */}
        <button
          onClick={() => {
            sound.hover();
            onNavigate(4);
          }}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            currentSection === 4
              ? "text-[#d4ff00] font-bold bg-white/[0.06]"
              : "text-[#87878d] hover:text-[#fbfbfb] hover:bg-white/[0.03]"
          }`}
        >
          CONTACT
        </button>

        <div className="h-3.5 w-[1px] bg-white/[0.1] mx-0.5 sm:mx-1" />

        {/* Tactile Audio Effects Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer ${
            audioActive
              ? "text-[#d4ff00] bg-zinc-800"
              : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
          aria-label="Toggle interface sound effects"
          title={audioActive ? "Mute interface audio" : "Enable interface audio"}
        >
          {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </nav>
    </header>
  );
}
