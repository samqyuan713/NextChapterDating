/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlaybackState {
  isPlaying: boolean;
  activeProfileId: string | null;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
}

class AudioVoiceService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private progressInterval: number | null = null;
  private fallbackTimeouts: number[] = [];
  private stateChangeListeners: ((state: PlaybackState) => void)[] = [];
  private audioContext: AudioContext | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  public state: PlaybackState = {
    isPlaying: false,
    activeProfileId: null,
    progress: 0,
    currentTime: 0,
    duration: 18,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          const v = window.speechSynthesis.getVoices();
          if (v && v.length > 0) {
            this.cachedVoices = v;
          }
        } catch {
          // ignore
        }
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  public subscribe(listener: (state: PlaybackState) => void) {
    this.stateChangeListeners.push(listener);
    listener(this.state);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    for (const listener of this.stateChangeListeners) {
      listener({ ...this.state });
    }
  }

  public getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  /**
   * Play a gentle acoustic chime to introduce or conclude the voice clip
   */
  public playGentleChime(frequency: number = 528, duration: number = 0.6) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  /**
   * Web Audio melodic voice simulation fallback: plays a warm, pleasant acoustic cadence
   * if SpeechSynthesis is blocked, unsupported, or silent on desktop computers.
   */
  private playSyntheticVoiceFallback(profileId: string, transcript: string, durationSec: number = 18, gender: string = 'Neutral') {
    this.clearAllTimers();
    const ctx = this.getAudioContext();
    const estimatedDuration = Math.min(22, Math.max(8, durationSec || 16));

    this.state = {
      isPlaying: true,
      activeProfileId: profileId,
      progress: 0,
      currentTime: 0,
      duration: estimatedDuration,
    };
    this.notify();

    // Generate melodious acoustic vocal tone sequence mirroring spoken syllables
    if (ctx) {
      const baseFreq = gender.toLowerCase() === 'female' ? 240 : 160;
      const notes = [1, 1.125, 1.25, 1.334, 1.5, 1.667, 1.875, 2];
      const words = transcript.split(/\s+/).filter(Boolean);
      const noteCount = Math.min(words.length, 30);
      const stepTime = (estimatedDuration * 0.85) / noteCount;

      for (let i = 0; i < noteCount; i++) {
        const toneTimeout = window.setTimeout(() => {
          if (!this.state.isPlaying || this.state.activeProfileId !== profileId) return;
          try {
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const noteMul = notes[i % notes.length];
            const freq = baseFreq * noteMul * (0.95 + Math.sin(i) * 0.1);
            osc.type = gender.toLowerCase() === 'female' ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + Math.min(stepTime * 0.9, 0.4));

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + Math.min(stepTime * 0.9, 0.4));
          } catch {
            // ignore
          }
        }, i * stepTime * 1000);

        this.fallbackTimeouts.push(toneTimeout);
      }
    }

    const startTime = Date.now();
    this.progressInterval = window.setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(100, (elapsed / estimatedDuration) * 100);
      this.state.currentTime = Math.min(estimatedDuration, Math.round(elapsed));
      this.state.progress = progress;
      this.notify();

      if (progress >= 100) {
        this.stop();
      }
    }, 200);
  }

  private clearAllTimers() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    for (const t of this.fallbackTimeouts) {
      clearTimeout(t);
    }
    this.fallbackTimeouts = [];
  }

  /**
   * Play a profile's voice greeting using SpeechSynthesis with robust desktop support & audio fallback
   */
  public playGreeting(profileId: string, transcript: string, durationSec: number = 18, gender: string = 'Neutral') {
    this.stop();

    // 1. Check if browser environment supports SpeechSynthesis
    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (!hasSpeech) {
      this.playSyntheticVoiceFallback(profileId, transcript, durationSec, gender);
      return;
    }

    // 2. Unlock AudioContext for acoustic chimes & feedback
    this.playGentleChime(528, 0.35);

    // 3. Desktop Chrome bug workaround: unpause SpeechSynthesis engine
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      // ignore
    }

    // Short tick delay prevents Chromium race-condition where immediate cancel cancels the new utterance
    window.setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(transcript);
        this.currentUtterance = utterance;

        // Pin to global window to avoid V8 garbage collection mid-speech on desktop Chrome
        if (typeof window !== 'undefined') {
          (window as any).__speechUtteranceRef = utterance;
        }

        utterance.rate = 0.88; // Calm, mature cadence
        utterance.pitch = gender.toLowerCase() === 'female' ? 1.08 : 0.82; // Natural pitch

        // Retrieve voices, checking both cached and fresh
        const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const preferred = voices.find((v) =>
            gender.toLowerCase() === 'female'
              ? /female|samantha|karen|victoria|zira|fiona|natural|google us/i.test(v.name)
              : /male|daniel|george|oliver|david|alex|fred|natural|google us/i.test(v.name)
          ) || voices.find((v) => v.lang.startsWith('en'));

          if (preferred) {
            utterance.voice = preferred;
          }
        }

        const estimatedDuration = durationSec || 18;
        this.state = {
          isPlaying: true,
          activeProfileId: profileId,
          progress: 0,
          currentTime: 0,
          duration: estimatedDuration,
        };
        this.notify();

        const startTime = Date.now();
        this.clearAllTimers();
        this.progressInterval = window.setInterval(() => {
          const elapsed = (Date.now() - startTime) / 1000;
          const progress = Math.min(100, (elapsed / estimatedDuration) * 100);
          this.state.currentTime = Math.min(estimatedDuration, Math.round(elapsed));
          this.state.progress = progress;
          this.notify();

          if (progress >= 100) {
            this.stop();
          }
        }, 200);

        utterance.onend = () => {
          this.stop();
          this.playGentleChime(440, 0.4);
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis encountered error on desktop, switching to audio fallback:', e);
          // If speech synthesis fails (e.g. no desktop audio permission or missing TTS pack), use our rich audio fallback
          this.playSyntheticVoiceFallback(profileId, transcript, durationSec, gender);
        };

        window.speechSynthesis.speak(utterance);

        // Desktop Chrome fix: in case speech is paused in background, trigger resume after speech starts
        window.setTimeout(() => {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 100);
      } catch (err) {
        console.warn('Failed to invoke SpeechSynthesis, switching to audio fallback:', err);
        this.playSyntheticVoiceFallback(profileId, transcript, durationSec, gender);
      }
    }, 40);
  }

  public stop() {
    this.clearAllTimers();
    if (typeof window !== 'undefined') {
      (window as any).__speechUtteranceRef = null;
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
    }
    this.currentUtterance = null;
    this.state = {
      isPlaying: false,
      activeProfileId: null,
      progress: 0,
      currentTime: 0,
      duration: 18,
    };
    this.notify();
  }
}

export const audioVoiceService = new AudioVoiceService();
