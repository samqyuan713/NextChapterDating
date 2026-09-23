/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, Sparkles, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { VoiceGreeting } from "../types";
import { audioVoiceService, PlaybackState } from "../lib/audioService";

interface VoiceGreetingPlayerProps {
  greeting: VoiceGreeting;
  companionName: string;
  gender?: string;
  accent?: string;
  isUnlocked?: boolean;
  onLockedClick?: () => void;
}

export const VoiceGreetingPlayer: React.FC<VoiceGreetingPlayerProps> = ({
  greeting,
  companionName,
  gender = "Neutral",
  accent,
  isUnlocked = true,
  onLockedClick,
}) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(audioVoiceService.state);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioVoiceService.subscribe((state) => {
      setPlaybackState(state);
    });
    return () => unsubscribe();
  }, []);

  const isCurrentActive = playbackState.activeProfileId === greeting.profileId;
  const isPlaying = isCurrentActive && playbackState.isPlaying;

  const handleToggle = () => {
    if (!isUnlocked && onLockedClick) {
      onLockedClick();
      return;
    }

    if (isPlaying) {
      audioVoiceService.stop();
    } else {
      audioVoiceService.playGreeting(
        greeting.profileId,
        greeting.transcript,
        greeting.durationSeconds || 18,
        gender
      );
    }
  };

  const formattedTime = isPlaying
    ? `0:${playbackState.currentTime.toString().padStart(2, "0")}`
    : `0:${(greeting.durationSeconds || 18).toString().padStart(2, "0")}`;

  return (
    <div className="bg-gradient-to-r from-amber-50/90 via-[#FBF8F3] to-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-2.5 text-left transition-all">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300/80">
            <Volume2 className={`w-4 h-4 ${isPlaying ? "text-emerald-700 animate-pulse" : "text-amber-800"}`} />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs sm:text-sm text-amber-950">
                Voice of the Chapter • {companionName}'s Greeting
              </span>
              <span className="inline-flex items-center gap-0.5 text-[9px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                <Sparkles className="w-2.5 h-2.5 text-emerald-600 fill-emerald-200" />
                <span>Verified Audio</span>
              </span>
            </div>
            <p className="text-[10px] text-amber-700/90 font-medium">
              {accent ? `${accent} • ` : ""}Hear authentic warmth, cadence, and laughter
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-bold text-amber-900 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200/60 shadow-2xs">
          {formattedTime}
        </span>
      </div>

      {/* Interactive Play Bar & Equalizer */}
      <div className="flex items-center gap-3 bg-white/90 border border-amber-200/70 rounded-xl p-2.5 shadow-2xs">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs ${
            isPlaying
              ? "bg-amber-950 text-amber-200 hover:bg-stone-900 scale-102"
              : "bg-amber-900 hover:bg-amber-950 text-white hover:scale-105 active:scale-95"
          }`}
          title={isPlaying ? "Pause Greeting" : `Listen to ${companionName}`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-amber-200" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Animated Equalizer Waveform */}
        <div className="flex-1 flex items-center gap-1 sm:gap-1.5 h-8 px-2 overflow-hidden">
          {[40, 65, 85, 50, 95, 75, 45, 90, 60, 80, 55, 70, 90, 60, 45, 75].map((heightPct, idx) => {
            const activeHeight = isPlaying
              ? Math.max(20, Math.min(100, heightPct * ((idx % 3 === 0 ? 1.2 : 0.8) + Math.sin(Date.now() / 300 + idx) * 0.4)))
              : 25;
            const isPassed = isCurrentActive && (idx / 16) * 100 <= playbackState.progress;

            return (
              <span
                key={idx}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                  isPassed
                    ? "bg-amber-950"
                    : isPlaying
                    ? "bg-amber-600"
                    : "bg-amber-200"
                }`}
                style={{
                  height: `${activeHeight}%`,
                }}
              />
            );
          })}
        </div>

        {/* Transcript Toggle Button */}
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 shrink-0"
          title="Toggle Written Transcript"
        >
          <FileText className="w-3.5 h-3.5 text-amber-700" />
          <span className="hidden sm:inline">Transcript</span>
          {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Transcript Collapsible Drawer */}
      {showTranscript && (
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 italic leading-relaxed animate-fade-in font-serif">
          "{greeting.transcript}"
        </div>
      )}
    </div>
  );
};
