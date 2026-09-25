/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  PenSquare,
  MapPin,
  ShieldCheck,
  Crown,
  Heart,
  Sparkles,
  Compass,
  Radio,
  FileText,
  Volume2,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  Coffee,
  User,
  SlidersHorizontal,
  Eye,
  BadgeAlert,
  Mail
} from "lucide-react";
import { MembershipTier, VoiceGreeting } from "../types";
import { VoiceGreetingPlayer } from "./VoiceGreetingPlayer";

interface UserProfilePreviewProps {
  userProfile: {
    name: string;
    age: number;
    location: string;
    interests: string[];
    bio: string;
    relationshipGoal: string;
    isSubscribed?: boolean;
    latitude?: number;
    longitude?: number;
    gpsEnabled?: boolean;
    searchRadiusMiles?: number;
    voiceGreeting?: VoiceGreeting;
    photoUrl?: string;
    gender?: string;
  };
  membershipTier: MembershipTier;
  emailVerified?: boolean;
  onEdit: () => void;
  onOpenSubscriptionModal: () => void;
  onOpenVault: () => void;
  onGoToDiscovery: () => void;
  userLocation?: {
    latitude: number;
    longitude: number;
    city?: string;
  } | null;
  admirerCount?: number;
}

export const UserProfilePreview: React.FC<UserProfilePreviewProps> = ({
  userProfile,
  membershipTier,
  emailVerified = true,
  onEdit,
  onOpenSubscriptionModal,
  onOpenVault,
  onGoToDiscovery,
  userLocation,
  admirerCount = 4,
}) => {
  const defaultVoiceGreeting: VoiceGreeting = userProfile.voiceGreeting || {
    profileId: "my-profile-greeting",
    transcript:
      userProfile.bio ||
      `Hello, I'm ${userProfile.name}. I believe the best chapters of life are ahead of us, filled with quiet walks, deep conversation, and genuine warmth.`,
    durationSeconds: 15,
    accent: "Authentic & Warm",
  };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-4xl mx-auto min-w-0 text-left">
      {/* Top Mode Bar & Edit Trigger */}
      <div className="bg-white/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-200">
              <Eye className="w-4 h-4 text-amber-800" />
            </span>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-amber-950">
              My Profile • Member Preview
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
              Active in Salon
            </span>
            {emailVerified ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified Account</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-300 flex items-center gap-1 shadow-2xs">
                <BadgeAlert className="w-3 h-3 text-amber-700" />
                <span>Verification Pending</span>
              </span>
            )}
          </div>
          <p className="text-xs text-amber-700 font-medium">
            This is how your dignified profile and story card appear to local companions in NextChapter.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Segmented Mode Indicator */}
          <div className="inline-flex rounded-xl bg-amber-100/70 p-1 border border-amber-200 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-white text-amber-950 shadow-2xs font-bold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              <span>Preview</span>
            </span>
            <button
              type="button"
              onClick={onEdit}
              className="px-3 py-1.5 rounded-lg text-amber-800 hover:text-amber-950 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <PenSquare className="w-3.5 h-3.5 text-amber-700" />
              <span>Edit</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PenSquare className="w-4 h-4 text-amber-300" />
            <span>Edit Profile & Story</span>
          </button>
        </div>
      </div>

      {/* Main Profile Presentation Card */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6] border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-6">
        {/* Top Gold Foil Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600" />

        {/* Hero Section: Avatar, Name, Location, Badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-amber-200/80 pb-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar / Photo */}
            <div className="relative shrink-0">
              {userProfile.photoUrl ? (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-stone-100">
                  <img
                    src={userProfile.photoUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-200 via-amber-100 to-rose-200 border-2 border-amber-300 shadow-md flex items-center justify-center text-3xl sm:text-4xl">
                  ☕
                </div>
              )}
              <div
                className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-2xs border border-emerald-200"
                title="Identity Verified by Silver Shield"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Name, Age, Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-amber-950">
                  {userProfile.name || "Companion"}
                </h1>
                <span className="font-serif font-semibold text-lg text-amber-800">
                  ({userProfile.age || 50})
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Member</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-800 flex-wrap">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{userProfile.location || "Singapore"}</span>
                </span>
                <span className="text-amber-400">•</span>
                <span className="text-amber-700">
                  Search Radius: {userProfile.searchRadiusMiles || 50} miles
                </span>
                {userLocation && (
                  <>
                    <span className="text-amber-400">•</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                      <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                      <span>GPS Active</span>
                    </span>
                  </>
                )}
              </div>

              {/* Relationship Focus Tag */}
              <div className="pt-1 flex items-center gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-300/80 shadow-2xs flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
                  <span>{userProfile.relationshipGoal || "Companionship & Shared Outings"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Membership Tier Crest & Switcher */}
          <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto bg-white/80 md:bg-transparent p-3.5 md:p-0 rounded-2xl border md:border-none border-amber-200/80">
            <div className="flex items-center gap-1.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-2xs ${
                membershipTier === "patron"
                  ? "bg-amber-950 text-amber-200 border-amber-800"
                  : membershipTier === "club"
                  ? "bg-emerald-950 text-emerald-200 border-emerald-800"
                  : "bg-amber-100 text-amber-900 border-amber-300"
              }`}>
                {membershipTier === "patron" ? (
                  <>
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
                    <span>👑 Concierge Patron ($49.99/mo)</span>
                  </>
                ) : membershipTier === "club" ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-emerald-300" />
                    <span>✨ Club Member ($19.99/mo)</span>
                  </>
                ) : (
                  <span>Guest of the Salon (Free)</span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenSubscriptionModal}
              className="text-[11px] font-bold text-amber-900 hover:text-amber-950 hover:underline transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{membershipTier === "free" ? "Upgrade Tier Privileges" : "Manage Membership"}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Voice of the Chapter Player */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>Voice of the Chapter • Audio Greeting</span>
            </h3>
            <button
              type="button"
              onClick={onEdit}
              className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 hover:underline transition-all cursor-pointer"
            >
              Change Voice Note ✏️
            </button>
          </div>
          <VoiceGreetingPlayer
            greeting={defaultVoiceGreeting}
            companionName={userProfile.name}
            gender={userProfile.gender || "Neutral"}
            accent={defaultVoiceGreeting.accent}
            isUnlocked={true}
          />
        </div>

        {/* Biography Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>About My Life Chapter & Reflections</span>
            </h3>
            <button
              type="button"
              onClick={onEdit}
              className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 hover:underline transition-all cursor-pointer"
            >
              Edit Story ✏️
            </button>
          </div>

          <div className="bg-white/90 border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs relative">
            <span className="text-4xl text-amber-300 font-serif leading-none select-none absolute top-3 left-4 opacity-50">
              “
            </span>
            <p className="text-sm sm:text-base text-amber-950 font-serif italic leading-relaxed pl-5 pr-2 pt-1">
              {userProfile.bio ||
                "A thoughtful companion who appreciates quiet morning walks, art galleries, and heartwarming conversation over Earl Grey."}
            </p>
          </div>
        </div>

        {/* Hobbies & Simple Pleasures */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Simple Pleasures & Hobbies ({userProfile.interests.length})</span>
            </h3>
            <button
              type="button"
              onClick={onEdit}
              className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 hover:underline transition-all cursor-pointer"
            >
              Add / Remove ✏️
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {userProfile.interests && userProfile.interests.length > 0 ? (
              userProfile.interests.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200/90 text-amber-950 text-xs font-medium shadow-2xs flex items-center gap-1.5"
                >
                  <span className="text-amber-600">✦</span>
                  <span>{hobby}</span>
                </span>
              ))
            ) : (
              <p className="text-xs text-amber-700 italic">No hobbies added yet. Click Edit to add some!</p>
            )}
          </div>
        </div>

        {/* Key Life Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/80 border border-amber-200/70 rounded-2xl p-3.5 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Life Chapter
            </span>
            <p className="font-bold text-xs sm:text-sm text-amber-950 mt-0.5 truncate">
              {userProfile.relationshipGoal || "Companionship"}
            </p>
          </div>

          <div className="bg-white/80 border border-amber-200/70 rounded-2xl p-3.5 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Proximity Range
            </span>
            <p className="font-bold text-xs sm:text-sm text-amber-950 mt-0.5">
              Within {userProfile.searchRadiusMiles || 50} mi
            </p>
          </div>

          <div className="bg-white/80 border border-amber-200/70 rounded-2xl p-3.5 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Salon Tier
            </span>
            <p className="font-bold text-xs sm:text-sm text-amber-950 mt-0.5 capitalize">
              {membershipTier} Member
            </p>
          </div>

          <div className="bg-white/80 border border-amber-200/70 rounded-2xl p-3.5 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Safety Verification
            </span>
            <p className="font-bold text-xs sm:text-sm text-emerald-800 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Silver Shield</span>
            </p>
          </div>
        </div>

        {/* Salon Admirers Vault Notification Card */}
        {admirerCount > 0 && (
          <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
              </span>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-amber-100">
                  {admirerCount} Local Companions Expressed Interest in You
                </h4>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  View who liked your story in the private Salon Admirers Vault.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenVault}
              className="px-4 py-2 bg-amber-200 hover:bg-white text-amber-950 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5 text-amber-800" />
              <span>Open Admirers Vault</span>
            </button>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-amber-800 font-medium">
            Changes saved will update in real time across the Salon deck and Cloud sync.
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onEdit}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <PenSquare className="w-4 h-4 text-amber-300" />
              <span>Edit Profile Details</span>
            </button>

            <button
              type="button"
              onClick={onGoToDiscovery}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <Compass className="w-4 h-4 text-emerald-200" />
              <span>Explore Companions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
