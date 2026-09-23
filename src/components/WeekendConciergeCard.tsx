/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Calendar,
  Compass,
  Volume2,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  Briefcase,
  Lock,
  Crown
} from "lucide-react";
import { Profile, CuratedIntroduction, MembershipTier } from "../types";
import { audioVoiceService } from "../lib/audioService";

interface WeekendConciergeCardProps {
  curatedIntro: CuratedIntroduction;
  companion: Profile;
  membershipTier: MembershipTier;
  onUpgradeToPatron: () => void;
  onConnect: (companion: Profile, initialMessage?: string) => void;
}

export const WeekendConciergeCard: React.FC<WeekendConciergeCardProps> = ({
  curatedIntro,
  companion,
  membershipTier,
  onUpgradeToPatron,
  onConnect,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  const isPatron = membershipTier === "patron";
  const isClub = membershipTier === "club";

  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      audioVoiceService.stop();
      setIsPlayingVoice(false);
    } else {
      if (companion.voiceGreeting) {
        setIsPlayingVoice(true);
        audioVoiceService.playGreeting(
          companion.id,
          companion.voiceGreeting.transcript,
          companion.voiceGreeting.durationSeconds,
          companion.gender || "Neutral"
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6] border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden transition-all text-left">
      {/* Top Gold Foil Bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600"></div>

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300/80 shadow-2xs">
            <Crown className="w-4 h-4 text-amber-700 fill-amber-300" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950">
                NextChapter Concierge • Weekend Handpicked Introduction
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-200 text-[10px] font-bold uppercase tracking-wider">
                {curatedIntro.handpickedDate}
              </span>
            </div>
            <p className="text-xs text-amber-800 font-medium">
              Curated introduction based on high harmony alignment & comfortable driving distance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-200" />
            <span>{curatedIntro.matchScore}% Harmony Match</span>
          </span>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100/70 transition-colors cursor-pointer"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isExpanded && (
        <div className="space-y-4 animate-fade-in pt-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/85 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
            {/* Companion Portrait Photo */}
            <div className="md:col-span-4 flex items-center gap-3.5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-200 shadow-sm bg-stone-100">
                <img
                  src={companion.photoUrl}
                  alt={companion.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-1 right-1 p-1 bg-white/90 rounded-full shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="font-serif font-bold text-lg text-amber-950 truncate flex items-center gap-1.5">
                  <span>{companion.name}</span>
                  <span className="text-sm font-sans font-semibold text-amber-700">({companion.age})</span>
                </h4>
                <p className="text-xs text-amber-850 font-medium truncate flex items-center gap-1 mt-0.5">
                  <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{companion.occupation}</span>
                </p>
                <p className="text-xs text-amber-700 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{companion.location}</span>
                  {companion.distanceMiles !== undefined && (
                    <span className="font-semibold text-emerald-800">
                      • {companion.distanceMiles.toFixed(0)} mi away
                    </span>
                  )}
                </p>

                {companion.voiceGreeting && (
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? "text-emerald-600 animate-pulse" : "text-amber-700"}`} />
                    <span>{isPlayingVoice ? "Pause Greeting" : "Play Voice (0:18)"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Matchmaker Rationale & Suggested Rendezvous */}
            <div className="md:col-span-8 space-y-3 md:border-l md:border-amber-200/80 md:pl-5">
              <div>
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>Concierge Matchmaker Rationale</span>
                </p>
                <p className="text-xs sm:text-sm text-amber-950 italic leading-relaxed bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                  "{curatedIntro.conciergeRationale}"
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Suggested Weekend Rendezvous</span>
                </p>
                <p className="text-xs text-amber-900 font-medium">
                  {curatedIntro.suggestedRendezvous}
                </p>
              </div>

              {/* Highlight Themes */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {curatedIntro.highlightThemes.map((theme) => (
                  <span
                    key={theme}
                    className="text-[10px] px-2.5 py-0.5 rounded-md bg-amber-100/70 border border-amber-200/90 text-amber-900 font-semibold"
                  >
                    ✦ {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-xs text-amber-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Identity Verified by NextChapter Silver Shield</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isPatron || isClub ? (
                <button
                  type="button"
                  onClick={() =>
                    onConnect(
                      companion,
                      `Hello ${companion.name}, our NextChapter Concierge introduced us for this weekend. I read about your ${companion.chapterTheme} and would love to take a leisurely stroll or chat over tea!`
                    )
                  }
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 text-rose-300" />
                  <span>Accept Introduction & Open Dialogue</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onUpgradeToPatron}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-950 hover:to-stone-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Unlock Weekly Concierge Introductions ($49.99/mo)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
