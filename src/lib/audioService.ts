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
  private stateChangeListeners: ((state: PlaybackState) => void)[] = [];
  private audioContext: AudioContext | null = null;

  public state: PlaybackState = {
    isPlaying: false,
    activeProfileId: null,
    progress: 0,
    currentTime: 0,
    duration: 18,
  };

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

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
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
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
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
   * Play a profile's voice greeting using SpeechSynthesis
   */
  public playGreeting(profileId: string, transcript: string, durationSec: number = 18, gender: string = 'Neutral') {
    this.stop();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this device');
      return;
    }

    this.playGentleChime(528, 0.4);

    const utterance = new SpeechSynthesisUtterance(transcript);
    this.currentUtterance = utterance;

    // Pick warm, mature voice settings
    utterance.rate = 0.88; // Slightly leisurely, warm, mature pace
    utterance.pitch = gender.toLowerCase() === 'female' ? 1.05 : 0.82; // Deep and rich for male, gentle for female

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // Look for natural English voices like Google US English, Samantha, Daniel, Karen
      const preferred = voices.find((v) => 
        gender.toLowerCase() === 'female'
          ? /female|samantha|karen|victoria|zira|fiona/i.test(v.name)
          : /male|daniel|george|oliver|david|alex|fred/i.test(v.name)
      );
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
      this.playGentleChime(440, 0.5);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.stop();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Failed to speak greeting:', err);
      this.stop();
    }
  }

  public stop() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
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
