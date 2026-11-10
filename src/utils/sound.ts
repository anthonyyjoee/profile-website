// Lightweight Web Audio API synthesizer for tactile UI micro-sounds (zero external audio files)
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        this.init();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("wheel", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
      window.addEventListener("wheel", unlockAudio, { passive: true });
      window.addEventListener("touchstart", unlockAudio, { passive: true });
    }
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.click(480, 0.08);
    }
    return this.enabled;
  }

  public click(freq = 420, duration = 0.09) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Soft, smooth acoustic tone using warm filtered sine synthesis
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm low-pass filter to eliminate harsh clicks/transients
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, now);

      osc.type = "sine";
      // Gentle, subtle pitch descent (warm harmonic tone instead of sharp laser drop)
      const baseFreq = Math.min(Math.max(freq * 0.72, 260), 520);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.88, now + duration);

      // Smooth attack and cushioned exponential decay
      const attackTime = 0.012; // 12ms gentle fade-in to prevent any abrupt pops
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.042, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public hover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.04);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.016, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignored
    }
  }
}

export const sound = new SoundFX();

