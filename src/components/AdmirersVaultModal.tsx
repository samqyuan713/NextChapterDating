/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Heart,
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  MessageSquare,
  Volume2,
  X,
  CheckCircle2,
  MapPin,
  Briefcase,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { Profile, MembershipTier } from "../types";
import { audioVoiceService } from "../lib/audioService";

interface AdmirersVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  admirers: Profile[];
  userProfile: any;
  membershipTier: MembershipTier;
  onUpgradeToClub: () => void;
  onUpgradeToPatron: () => void;
  onMatchBack: (companion: Profile) => void;
}

export const AdmirersVaultModal: React.FC<AdmirersVaultModalProps> = ({
  isOpen,
  onClose,
  admirers,
  userProfile,
  membershipTier,
  onUpgradeToClub,
  onUpgradeToPatron,
  onMatchBack
}) => {
  const [revealedSampleId, setRevealedSampleId] = useState<string | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isPaidMember = membershipTier === "club" || membershipTier === "patron";

  const handlePlayVoice = (companion: Profile) => {
    if (playingVoiceId === companion.id) {
      audioVoiceService.stop();
      setPlayingVoiceId(null);
    } else {
      if (companion.voiceGreeting) {
        setPlayingVoiceId(companion.id);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-amber-950/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F5] border-2 border-amber-200/90 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white p-5 sm:p-6 flex items-start justify-between relative shrink-0">
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
                Salon Admirers Vault
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-bold">
                {admirers.length} Interested Hearts
              </span>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed max-w-xl">
              These mature companions have thoughtfully reviewed your life story, chapter themes, and passions, and expressed interest in connecting.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 border border-white/10"
            title="Close Vault"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tier Status Ribbon */}
        <div className="px-5 py-3 bg-amber-100/60 border-b border-amber-200/70 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-950">Your Membership Tier:</span>
            {membershipTier === "patron" ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-200 border border-amber-700 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Concierge Patron</span>
              </span>
            ) : membershipTier === "club" ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-100 border border-emerald-700 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Club Member (Full Access)</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 border border-stone-300 font-bold uppercase text-[10px] tracking-wider">
                Guest of the Salon (Free Tier)
              </span>
            )}
          </div>

          {!isPaidMember ? (
            <button
              type="button"
              onClick={onUpgradeToClub}
              className="px-3 py-1 rounded-xl bg-amber-950 hover:bg-amber-900 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5 text-amber-300" />
              <span>Unlock All with Club Pass ($19.99/mo)</span>
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All portraits unblurred & instant matching active</span>
            </span>
          )}
        </div>

        {/* Admirers List Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {admirers.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
                <Heart className="w-8 h-8 text-amber-600/50" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-950">Your Vault Is Gathering Admirers</h3>
              <p className="text-xs text-amber-800 max-w-sm mx-auto leading-relaxed">
                As local companions explore your profile card, incoming interest signals will arrive here in your private Salon Vault.
              </p>
            </div>
          ) : (
            admirers.map((admirer, index) => {
              const isSampleRevealed = revealedSampleId === admirer.id;
              const isRevealed = isPaidMember || isSampleRevealed;
              const sharedInterests = (admirer.interests || []).filter((i) =>
                (userProfile?.interests || []).some((ui: string) => ui.toLowerCase() === i.toLowerCase())
              );

              return (
                <div
                  key={admirer.id}
                  className="bg-white border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden group"
                >
                  {/* Left: Avatar + Details */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    {/* Portrait Photo (Clear vs Frosted/Blurred) */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-100 shadow-sm bg-stone-100">
                      <img
                        src={admirer.photoUrl}
                        alt={isRevealed ? admirer.name : "Admirer silhouette"}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isRevealed ? "filter-none" : "filter blur-md scale-110 select-none"
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      {!isRevealed && (
                        <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-xs flex flex-col items-center justify-center text-white p-1 text-center">
                          <Lock className="w-5 h-5 text-amber-300 drop-shadow" />
                          <span className="text-[9px] font-bold mt-0.5 uppercase tracking-wider text-amber-100">
                            Blurred
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bio Snippet & Demographic Highlights */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-lg text-amber-950 truncate">
                          {isRevealed ? `${admirer.name}, ${admirer.age}` : `${admirer.name.charAt(0)}***, ${admirer.age}`}
                        </h3>
                        {isRevealed && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-bold border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified Mature Member</span>
                          </span>
                        )}
                        <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          Expressed interest recently
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-amber-850 flex-wrap">
                        <span className="flex items-center gap-1 font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>{admirer.occupation}</span>
                        </span>
                        <span className="flex items-center gap-1 text-amber-700">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{admirer.location}</span>
                          {admirer.distanceMiles !== undefined && (
                            <span className="text-amber-500">({admirer.distanceMiles.toFixed(0)} mi)</span>
                          )}
                        </span>
                      </div>

                      {/* Shared Passions Hook */}
                      <div className="flex items-center gap-1 flex-wrap pt-0.5">
                        {sharedInterests.length > 0 ? (
                          <>
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                              Shared Passions:
                            </span>
                            {sharedInterests.map((interest) => (
                              <span
                                key={interest}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold"
                              >
                                ★ {interest}
                              </span>
                            ))}
                          </>
                        ) : (
                          <span className="text-xs italic text-amber-800/80 line-clamp-1">
                            "{admirer.chapterTheme}"
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0 border-t md:border-t-0 border-amber-100 pt-3 md:pt-0">
                    {isRevealed ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onMatchBack(admirer)}
                          className="flex-1 md:flex-initial py-2 px-4 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-rose-300" />
                          <span>Match Back & Chat</span>
                        </button>

                        {admirer.voiceGreeting && (
                          <button
                            type="button"
                            onClick={() => handlePlayVoice(admirer)}
                            className="py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${playingVoiceId === admirer.id ? "text-emerald-600 animate-pulse" : "text-amber-700"}`} />
                            <span>{playingVoiceId === admirer.id ? "Pause Voice" : "Voice Note"}</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {index === 0 && !revealedSampleId ? (
                          <button
                            type="button"
                            onClick={() => setRevealedSampleId(admirer.id)}
                            className="py-2 px-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                            <span>Reveal 1 Free Teaser</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={onUpgradeToClub}
                            className="py-2 px-3.5 bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-950 hover:to-stone-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <Lock className="w-3.5 h-3.5 text-amber-300" />
                            <span>Unlock with Club Pass</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Subscription Upsell Banner (for free users) */}
        {!isPaidMember && (
          <div className="bg-amber-50/90 border-t border-amber-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="space-y-0.5 text-left">
              <p className="font-serif font-bold text-sm text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-300" />
                <span>NextChapter Club Membership & Concierge Tiers</span>
              </p>
              <p className="text-xs text-amber-800">
                Unlock all blurred admirers, listen to full voice greetings, and receive curated weekend companion introductions.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onUpgradeToClub}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-950 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                Join Club ($19.99/mo)
              </button>
              <button
                type="button"
                onClick={onUpgradeToPatron}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-100 hover:bg-amber-200/80 text-amber-950 border border-amber-300 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                Patron ($49.99/mo)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
