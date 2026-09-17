/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Compass,
  Navigation,
  SlidersHorizontal,
  MapPin,
  Heart,
  Sparkles,
  MessageSquare,
  BookOpen,
  Radio,
  Loader2,
  Undo2,
  LocateFixed,
  ChevronDown,
  ChevronUp,
  User,
  Ruler,
  Scale,
  Search,
  Check,
  RotateCcw
} from "lucide-react";
import { Profile, CompatibilityAnalysis } from "../types";

export const HEIGHT_OPTIONS = Array.from({ length: 23 }, (_, i) => 58 + i); // 58 to 80 inches (4'10" to 6'8")

export const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainderInches = inches % 12;
  const cm = Math.round(inches * 2.54);
  return `${feet}'${remainderInches}" (${cm} cm)`;
};

export const formatDistance = (miles?: number, km?: number) => {
  if (miles === undefined || miles === null) return "";
  if (miles < 1) return "< 1 mile (< 1.6 km)";
  return `${miles.toFixed(1)} miles (${km !== undefined ? km.toFixed(1) : (miles * 1.60934).toFixed(1)} km)`;
};

export const INTERESTS_PRESETS = [
  "Classical Music", "Museum Strolls", "Cozy Bookstores", "Organic Gardening",
  "Baking Sourdough", "Acoustic Folk", "Landscape Painting", "Historic Walking Tours",
  "Opera & Theatre", "Botanical Sanctuaries", "Tea Tasting", "Art History",
  "Foreign Film", "Nature Photography", "Bird Watching", "Chamber Orchestra",
  "French Pastries", "Symphony Hall", "Antiques & Markets", "Wine & Jazz",
  "Quiet Morning Walks", "Poetry Reading", "Scenic Cycling", "Philosophy Cafes",
  "Pottery Crafting", "Sailing & Harbors", "Ballroom Dancing", "Pickleball & Tennis", "Astronomy & Night Sky"
];

export const COMPASS_DIRECTIONS = [
  { id: "all", label: "Center (All)", desc: "All Compass Directions", icon: "🧭", color: "border-amber-400 bg-amber-50/90 text-amber-950" },
  { id: "intellectual", label: "North 🧭", desc: "Intellectual Depth (Art, Classical, Philosophy)", icon: "🏛️", color: "border-blue-400 bg-blue-50/90 text-blue-950" },
  { id: "sports", label: "East 🧭", desc: "Sports & Outings (Trails, Cycling, Dancing)", icon: "🎾", color: "border-emerald-400 bg-emerald-50/90 text-emerald-950" },
  { id: "cozy", label: "South 🧭", desc: "Cozy Quietude (Tea, Books, Gardening, Baking)", icon: "☕", color: "border-amber-400 bg-amber-50/90 text-amber-950" },
  { id: "romance", label: "West 🧭", desc: "Romance & Travel (Sunsets, Dinners, Travel)", icon: "🌅", color: "border-rose-400 bg-rose-50/90 text-rose-950" },
] as const;

export interface UnifiedCompassExplorerProps {
  matches: Profile[];
  deckCompanions: Profile[];
  loadingMatches: boolean;
  swipeIndex: number;
  setSwipeIndex: (idx: number | ((prev: number) => number)) => void;
  swipeDirection: "left" | "right" | "super" | null;
  handleSwipeAction: (dir: "left" | "right" | "super") => void;
  handleSwipeRewind: () => void;
  userLocation: { latitude: number; longitude: number; city: string; source: "gps" | "preset" } | null;
  onDetectLocation: () => void;
  isLocating: boolean;
  locationStatus: string | null;
  nearbyRadiusMiles: number;
  setNearbyRadiusMiles: (miles: number) => void;
  onlyShowNearby: boolean;
  setOnlyShowNearby: (show: boolean) => void;
  sortByDistance: boolean;
  setSortByDistance: (sort: boolean) => void;
  onSelectPresetCity: (city: string) => void;
  locationPresetData: {
    regionLabel: string;
    regionShortBadge: string;
    regionalPresets: Array<{ name: string; label: string; flag: string; latitude: number; longitude: number }>;
    otherPresets: Array<{ name: string; label: string; flag: string; latitude: number; longitude: number }>;
  };
  compassFocus: "all" | "intellectual" | "sports" | "cozy" | "romance";
  setCompassFocus: (focus: "all" | "intellectual" | "sports" | "cozy" | "romance") => void;
  searchGender: string;
  setSearchGender: (g: string) => void;
  searchAgeMin: number;
  setSearchAgeMin: (min: number) => void;
  searchAgeMax: number;
  setSearchAgeMax: (max: number) => void;
  searchHeightMin: number;
  setSearchHeightMin: (min: number) => void;
  searchHeightMax: number;
  setSearchHeightMax: (max: number) => void;
  searchWeightMin: number;
  setSearchWeightMin: (min: number) => void;
  searchWeightMax: number;
  setSearchWeightMax: (max: number) => void;
  searchSelectedHobbies: string[];
  setSearchSelectedHobbies: React.Dispatch<React.SetStateAction<string[]>>;
  searchKeyword: string;
  setSearchKeyword: (kw: string) => void;
  userProfile: any;
  compatibilityReports: Record<string, CompatibilityAnalysis>;
  quizAnswers: Record<string, Record<string, string>>;
  handleSelectQuizOption: (matchId: string, qId: string, val: string) => void;
  handleSubmitQuiz: (matchId: string) => void;
  isAnalyzingCompatibility: boolean;
  compatibilityError: string;
  isBioExpanded: boolean;
  setIsBioExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isQuizExpanded: boolean;
  setIsQuizExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMatch: (match: Profile | null) => void;
  setActiveTab: (tab: any) => void;
  onAlignWithMyProfile: () => void;
  onResetAllFilters: () => void;
  viewMode: "grid" | "deck";
  setViewMode: (mode: "grid" | "deck") => void;
  hasActiveCompassFilters: boolean;
  COMPATIBILITY_QUIZ_QUESTIONS: any[];
}

export const UnifiedCompassExplorer: React.FC<UnifiedCompassExplorerProps> = ({
  matches,
  deckCompanions,
  loadingMatches,
  swipeIndex,
  setSwipeIndex,
  swipeDirection,
  handleSwipeAction,
  handleSwipeRewind,
  userLocation,
  onDetectLocation,
  isLocating,
  locationStatus,
  nearbyRadiusMiles,
  setNearbyRadiusMiles,
  onlyShowNearby,
  setOnlyShowNearby,
  sortByDistance,
  setSortByDistance,
  onSelectPresetCity,
  locationPresetData,
  compassFocus,
  setCompassFocus,
  searchGender,
  setSearchGender,
  searchAgeMin,
  setSearchAgeMin,
  searchAgeMax,
  setSearchAgeMax,
  searchHeightMin,
  setSearchHeightMin,
  searchHeightMax,
  setSearchHeightMax,
  searchWeightMin,
  setSearchWeightMin,
  searchWeightMax,
  setSearchWeightMax,
  searchSelectedHobbies,
  setSearchSelectedHobbies,
  searchKeyword,
  setSearchKeyword,
  userProfile,
  compatibilityReports,
  quizAnswers,
  handleSelectQuizOption,
  handleSubmitQuiz,
  isAnalyzingCompatibility,
  compatibilityError,
  isBioExpanded,
  setIsBioExpanded,
  isQuizExpanded,
  setIsQuizExpanded,
  setSelectedMatch,
  setActiveTab,
  onAlignWithMyProfile,
  onResetAllFilters,
  viewMode,
  setViewMode,
  hasActiveCompassFilters,
  COMPATIBILITY_QUIZ_QUESTIONS
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  // Active filter count for badge
  const activeFiltersCount =
    (searchGender !== "All" ? 1 : 0) +
    (searchKeyword.trim() ? 1 : 0) +
    (searchAgeMin > 35 || searchAgeMax < 85 ? 1 : 0) +
    (searchHeightMin > 54 || searchHeightMax < 78 ? 1 : 0) +
    (searchWeightMin > 100 || searchWeightMax < 240 ? 1 : 0) +
    (searchSelectedHobbies.length > 0 ? 1 : 0) +
    (compassFocus !== "all" ? 1 : 0) +
    (onlyShowNearby ? 1 : 0);

  const toggleHobby = (hobby: string) => {
    setSearchSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  return (
    <div id="unified-compass-pane" className="animate-fade-in space-y-5 w-full max-w-full min-w-0">
      {/* 1. UNIFIED HERO HEADER WITH VIEW SWITCHER */}
      <div className="bg-white border border-amber-200/90 rounded-3xl p-4 sm:p-5 md:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-950">
              Companion Discovery & Compass
            </h2>
          </div>
          <p className="text-xs text-amber-700 font-medium">
            Align with mature companions by location proximity, lifestyle direction, and shared values.
          </p>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          {/* Align with My Profile CTA */}
          <button
            type="button"
            onClick={onAlignWithMyProfile}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="Auto-filter by your personal hobbies, age, and nearby location"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            <span>Align with My Profile</span>
          </button>

          {/* Reset Filters */}
          {hasActiveCompassFilters && (
            <button
              type="button"
              onClick={onResetAllFilters}
              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Reset all filters to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Toggle Filter Drawer */}
          <button
            type="button"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              isFiltersExpanded
                ? "bg-amber-100 border-amber-300 text-amber-950"
                : "bg-white border-amber-200 text-amber-900 hover:bg-amber-50"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
            <span>Filters & Dial</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-900 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
            {isFiltersExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* View Mode Switcher: Grid vs Deck */}
          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-amber-950 text-white shadow-xs"
                  : "text-amber-900 hover:bg-white/60"
              }`}
            >
              <span>▦ Browse Grid ({deckCompanions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("deck")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "deck"
                  ? "bg-amber-950 text-white shadow-xs"
                  : "text-amber-900 hover:bg-white/60"
              }`}
            >
              <span>🎴 Card Deck</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. COLLAPSIBLE COMPASS DIAL & RADAR CONTROLS */}
      {isFiltersExpanded && (
        <div className="bg-white border border-amber-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 animate-fade-in">
          {/* Compass Alignment Dial Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>Life Alignment Compass Dial</span>
              </span>
              <span className="text-[10px] text-amber-700 font-medium">Click a direction to filter matching companions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COMPASS_DIRECTIONS.map((dir) => {
                const isSelected = compassFocus === dir.id;
                return (
                  <button
                    key={dir.id}
                    type="button"
                    onClick={() => {
                      setCompassFocus(dir.id as any);
                      setSwipeIndex(0);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                      isSelected
                        ? "bg-amber-950 border-amber-950 text-white shadow-xs"
                        : "bg-amber-50/40 border-amber-100 hover:bg-amber-50 text-amber-900"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{dir.icon}</span>
                      {isSelected && <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold">Active</span>}
                    </div>
                    <span className="text-xs font-bold">{dir.label}</span>
                    <span className={`text-[10px] line-clamp-1 ${isSelected ? "text-amber-200" : "text-amber-700"}`}>
                      {dir.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tinder-style GPS Nearby Radar & Location Presets */}
          <div className="pt-3 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <Navigation className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-amber-950">Proximity Radar</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-850 font-bold border border-emerald-200">
                    {userLocation?.city || "Singapore"}
                  </span>
                </div>
                <p className="text-[10px] text-amber-700 font-medium truncate">
                  {userLocation?.latitude && userLocation?.longitude
                    ? `GPS: ${userLocation.latitude.toFixed(2)}°, ${userLocation.longitude.toFixed(2)}° • ${deckCompanions.length} companions found`
                    : "Acquire GPS or choose a city preset"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 shadow-xs flex-1 sm:flex-initial"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
                    <span>Acquire GPS 📡</span>
                  </>
                )}
              </button>

              <select
                value={userLocation?.city || "Singapore"}
                onChange={(e) => {
                  if (e.target.value) onSelectPresetCity(e.target.value);
                }}
                className="bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-amber-900 focus:outline-none cursor-pointer flex-1 sm:flex-initial max-w-[170px] truncate"
              >
                <option value="" disabled>Presets ({locationPresetData.regionShortBadge})</option>
                <optgroup label={`📍 ${locationPresetData.regionLabel}`}>
                  {locationPresetData.regionalPresets.map((preset) => (
                    <option key={preset.name} value={preset.name}>
                      {preset.flag ? `${preset.flag} ` : ""}{preset.label}
                    </option>
                  ))}
                </optgroup>
                {locationPresetData.otherPresets.length > 0 && (
                  <optgroup label="🌐 Other World Regions">
                    {locationPresetData.otherPresets.map((preset) => (
                      <option key={preset.name} value={preset.name}>
                        {preset.flag ? `${preset.flag} ` : ""}{preset.label}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>
          </div>

          {/* Radius Buttons & Closest Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-amber-100/60">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] font-bold text-amber-850 uppercase tracking-wider mr-1">Radius:</span>
              <button
                type="button"
                onClick={() => {
                  setOnlyShowNearby(false);
                  setSwipeIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  !onlyShowNearby
                    ? "bg-amber-950 text-white shadow-xs"
                    : "bg-amber-50 text-amber-850 hover:bg-amber-100 border border-amber-200/60"
                }`}
              >
                All Distances
              </button>
              {[15, 30, 50, 100].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  onClick={() => {
                    setNearbyRadiusMiles(radius);
                    setOnlyShowNearby(true);
                    setSwipeIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    onlyShowNearby && nearbyRadiusMiles === radius
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-amber-50 text-amber-850 hover:bg-amber-100 border border-amber-200/60"
                  }`}
                >
                  &lt; {radius} mi
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setSortByDistance(!sortByDistance);
                setSwipeIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 self-start sm:self-auto ${
                sortByDistance
                  ? "bg-amber-800 text-white shadow-xs"
                  : "bg-amber-50 text-amber-850 hover:bg-amber-100 border border-amber-200/60"
              }`}
            >
              <LocateFixed className="w-3 h-3" />
              <span>{sortByDistance ? "Closest First (Active)" : "Sort: Closest 📍"}</span>
            </button>
          </div>

          {/* Detailed Criteria: Search, Gender, Age, Height, Weight */}
          <div className="pt-3 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Keyword Search */}
            <div>
              <label className="block text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Search Name or Bio
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setSwipeIndex(0);
                  }}
                  placeholder="e.g. Architect, Yoga..."
                  className="w-full bg-amber-50/40 border border-amber-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-amber-950 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Gender Select */}
            <div>
              <label className="block text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Looking For
              </label>
              <select
                value={searchGender}
                onChange={(e) => {
                  setSearchGender(e.target.value);
                  setSwipeIndex(0);
                }}
                className="w-full bg-amber-50/40 border border-amber-200 rounded-xl px-3 py-1.5 text-xs text-amber-950 focus:outline-none focus:bg-white cursor-pointer"
              >
                <option value="All">All Gentlefolk</option>
                <option value="Female">Gentlewoman</option>
                <option value="Male">Gentleman</option>
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Age Range ({searchAgeMin} – {searchAgeMax})
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={35}
                  max={searchAgeMax}
                  value={searchAgeMin}
                  onChange={(e) => setSearchAgeMin(Number(e.target.value))}
                  className="w-1/2 bg-amber-50/40 border border-amber-200 rounded-xl px-2 py-1 text-xs text-center text-amber-950"
                />
                <span className="text-amber-500 text-xs">to</span>
                <input
                  type="number"
                  min={searchAgeMin}
                  max={85}
                  value={searchAgeMax}
                  onChange={(e) => setSearchAgeMax(Number(e.target.value))}
                  className="w-1/2 bg-amber-50/40 border border-amber-200 rounded-xl px-2 py-1 text-xs text-center text-amber-950"
                />
              </div>
            </div>

            {/* Height Range */}
            <div>
              <label className="block text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                Height Range
              </label>
              <div className="flex items-center gap-1.5">
                <select
                  value={searchHeightMin}
                  onChange={(e) => setSearchHeightMin(Number(e.target.value))}
                  className="w-1/2 bg-amber-50/40 border border-amber-200 rounded-xl px-1.5 py-1 text-[11px] text-amber-950"
                >
                  {HEIGHT_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      ≥ {formatHeight(h).split(" ")[0]}
                    </option>
                  ))}
                </select>
                <span className="text-amber-500 text-xs">to</span>
                <select
                  value={searchHeightMax}
                  onChange={(e) => setSearchHeightMax(Number(e.target.value))}
                  className="w-1/2 bg-amber-50/40 border border-amber-200 rounded-xl px-1.5 py-1 text-[11px] text-amber-950"
                >
                  {HEIGHT_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      ≤ {formatHeight(h).split(" ")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Hobbies Quick Tags */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                Filter by Passions & Hobbies ({searchSelectedHobbies.length} selected)
              </span>
              {searchSelectedHobbies.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchSelectedHobbies([])}
                  className="text-[10px] text-rose-700 font-bold hover:underline cursor-pointer"
                >
                  Clear Hobbies ✕
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1 max-h-[85px] overflow-y-auto p-1.5 bg-amber-50/30 rounded-xl border border-amber-100">
              {INTERESTS_PRESETS.map((hobby) => {
                const isSelected = searchSelectedHobbies.includes(hobby);
                return (
                  <button
                    key={hobby}
                    type="button"
                    onClick={() => toggleHobby(hobby)}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-950 border-amber-950 text-white font-medium shadow-2xs"
                        : "bg-white border-amber-150 text-amber-900 hover:bg-amber-50"
                    }`}
                  >
                    {isSelected ? `✓ ${hobby}` : `+ ${hobby}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. ACTIVE FILTERS SUMMARY BAR */}
      {hasActiveCompassFilters && (
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="inline-flex items-center gap-1 font-bold text-amber-950 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span>Active:</span>
            </span>
            {searchGender !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200">
                {searchGender}
              </span>
            )}
            {(searchAgeMin > 35 || searchAgeMax < 85) && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200">
                Age {searchAgeMin}–{searchAgeMax}
              </span>
            )}
            {compassFocus !== "all" && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold border border-emerald-200">
                🧭 {compassFocus}
              </span>
            )}
            {searchSelectedHobbies.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200">
                {searchSelectedHobbies.length} {searchSelectedHobbies.length === 1 ? "hobby" : "hobbies"}
              </span>
            )}
            {searchKeyword.trim() && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200 max-w-[120px] truncate">
                "{searchKeyword}"
              </span>
            )}
            <span className="text-[11px] text-amber-800 font-bold ml-1">
              ({deckCompanions.length} matching of {matches.length} companions)
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={onResetAllFilters}
              className="px-2.5 py-1 text-[11px] font-bold bg-white text-amber-900 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              Reset Filters ✕
            </button>
          </div>
        </div>
      )}

      {/* 4. RESULTS SECTION: GRID OR DECK */}
      {loadingMatches ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
          <p className="text-xs text-amber-700 font-medium">Tending to companion profiles...</p>
        </div>
      ) : deckCompanions.length === 0 ? (
        <div className="py-16 text-center text-amber-900 bg-white border border-amber-150 rounded-3xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto border border-amber-200">
            <LocateFixed className="w-7 h-7 text-amber-700" />
          </div>
          <h3 className="font-serif font-bold text-lg text-amber-950">
            {onlyShowNearby
              ? `No Companions Found Within ${nearbyRadiusMiles} Miles`
              : "No Companions Match Your Active Criteria"}
          </h3>
          <p className="text-xs text-amber-700 max-w-sm mx-auto">
            Try expanding your search radius, selecting another city preset, or resetting filters.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={onResetAllFilters}
              className="px-4 py-2 bg-amber-950 text-white rounded-xl text-xs font-bold hover:bg-amber-900 transition-all cursor-pointer shadow-xs"
            >
              Reset All Filters ✕
            </button>
            {onlyShowNearby && (
              <button
                type="button"
                onClick={() => {
                  setNearbyRadiusMiles(100);
                  setOnlyShowNearby(true);
                  setSwipeIndex(0);
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all cursor-pointer shadow-xs"
              >
                Expand to &lt; 100 mi
              </button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        /* ======================== BROWSE GRID VIEW ======================== */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deckCompanions.map((companion, idx) => {
            const companionReport = compatibilityReports[companion.id];
            // Check if companion shares any hobbies with userProfile
            const userHobbies = userProfile && Array.isArray(userProfile.interests) ? userProfile.interests : [];
            const sharedHobbies = (companion.interests || []).filter((i) =>
              userHobbies.some((uh: string) => uh.toLowerCase() === i.toLowerCase())
            );

            return (
              <div
                key={companion.id}
                className="bg-white border border-amber-200/90 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all hover:border-amber-300 relative group"
              >
                <div>
                  {/* Top Bar: Proximity Badge + Match Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {companion.distanceMiles !== undefined ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-[11px]">
                        📍 {formatDistance(companion.distanceMiles, companion.distanceKm)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-medium">
                        📍 {companion.location}
                      </span>
                    )}

                    {companionReport?.matchScore ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200">
                        <Sparkles className="w-3 h-3 text-amber-600 fill-amber-300" />
                        <span>{companionReport.matchScore}% Align</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-bold">Mature Match</span>
                    )}
                  </div>

                  {/* Avatar + Basic Details */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${companion.avatarColor} flex items-center justify-center text-2xl shadow-xs border-2 border-white shrink-0`}
                    >
                      {companion.avatarEmoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif font-bold text-lg text-amber-950 truncate flex items-center gap-1.5">
                        <span>{companion.name}</span>
                        <span className="text-sm font-sans font-semibold text-amber-700">({companion.age})</span>
                      </h3>
                      <p className="text-xs text-amber-850 font-medium truncate">{companion.occupation}</p>
                      <p className="text-[11px] text-amber-600 font-medium truncate">{companion.chapterTheme}</p>
                    </div>
                  </div>

                  {/* Physical metrics */}
                  {(companion.height || companion.weight) && (
                    <div className="flex items-center gap-2 text-[11px] text-amber-750 font-medium mb-3">
                      {companion.height && (
                        <span className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-amber-600" />
                          <span>{formatHeight(companion.height).split(" ")[0]}</span>
                        </span>
                      )}
                      {companion.weight && (
                        <span className="flex items-center gap-1">
                          <Scale className="w-3 h-3 text-amber-600" />
                          <span>{companion.weight} lbs</span>
                        </span>
                      )}
                      <span className="text-amber-200">•</span>
                      <span className="text-rose-600 font-semibold">{companion.relationshipGoal}</span>
                    </div>
                  )}

                  {/* Bio snippet */}
                  <p className="text-xs text-amber-900 line-clamp-2 leading-relaxed italic bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60 mb-3">
                    "{companion.bio}"
                  </p>

                  {/* Passions & Hobbies */}
                  <div className="space-y-1 mb-4">
                    <div className="flex flex-wrap gap-1">
                      {(companion.interests || []).slice(0, 4).map((interest) => {
                        const isShared = sharedHobbies.includes(interest);
                        return (
                          <span
                            key={interest}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                              isShared
                                ? "bg-emerald-100 border-emerald-300 text-emerald-950 font-bold"
                                : "bg-amber-50/50 border-amber-100 text-amber-800"
                            }`}
                          >
                            {isShared ? `★ ${interest}` : interest}
                          </span>
                        );
                      })}
                      {(companion.interests || []).length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-amber-600 font-semibold">
                          +{(companion.interests || []).length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-amber-100/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMatch(companion);
                      setActiveTab("conversations");
                    }}
                    className="flex-1 py-2 px-3 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-rose-300" />
                    <span>Connect & Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMatch(companion);
                      setActiveTab("storyroom");
                    }}
                    className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    title="Read & Create Story"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSwipeIndex(idx);
                      setViewMode("deck");
                    }}
                    className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    title="Focus in 3D Card Deck"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ======================== 3D CARD DECK VIEW ======================== */
        swipeIndex >= deckCompanions.length ? (
          <div className="bg-white border border-amber-150/40 rounded-3xl p-8 text-center shadow-md animate-fade-in my-6">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Compass className="w-8 h-8 text-amber-700 animate-pulse-subtle" />
            </div>
            <h3 className="font-serif font-bold text-xl text-amber-950 mb-2">
              You Have Reviewed All Companions in This Range
            </h3>
            <p className="text-sm text-amber-900 leading-relaxed mb-6">
              You have explored all {deckCompanions.length} matching cards. Restart your deck or open the Dialogue Salon to message!
            </p>
            <div className="space-y-2.5 max-w-sm mx-auto">
              <button
                onClick={() => setSwipeIndex(0)}
                className="w-full py-3.5 bg-amber-950 text-white rounded-2xl font-bold hover:bg-amber-900 transition-all cursor-pointer text-xs uppercase tracking-wider shadow-sm"
              >
                Restart Discovery Deck 🔄
              </button>
              <button
                onClick={() => setActiveTab("conversations")}
                className="w-full py-3.5 bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl font-bold hover:bg-amber-100 transition-all cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-rose-500" />
                <span>Open Dialogue Salon 💬</span>
              </button>
            </div>
          </div>
        ) : (
          (() => {
            const currentCompanion = deckCompanions[swipeIndex];
            const companionReport = compatibilityReports[currentCompanion.id];
            const currentMatchQuizAnswers = quizAnswers[currentCompanion.id] || {};

            return (
              <div className="relative w-full max-w-full min-w-0">
                {/* 3D Depth Card Stacks */}
                {swipeIndex + 1 < deckCompanions.length && (
                  <div className="absolute inset-x-2 sm:inset-x-4 top-2 h-full bg-white/70 border border-amber-100 rounded-3xl shadow-sm translate-y-3 scale-95 pointer-events-none z-0"></div>
                )}
                {swipeIndex + 2 < deckCompanions.length && (
                  <div className="absolute inset-x-4 sm:inset-x-8 top-4 h-full bg-white/45 border border-amber-50 rounded-3xl shadow-xs translate-y-6 scale-90 pointer-events-none z-[-1]"></div>
                )}

                {/* Swipe Card Main Container */}
                <div className="bg-[#FAF8F5] border-2 border-amber-100/85 rounded-3xl p-4 sm:p-6 md:p-7 shadow-md relative overflow-hidden z-10 animate-fade-in">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-200 to-emerald-600"></div>

                  {/* Swipe Stamp Overlay */}
                  {swipeDirection && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-xs z-30 transition-all duration-200 animate-fade-in">
                      {swipeDirection === "right" && (
                        <div className="border-4 border-emerald-600 text-emerald-600 font-bold uppercase text-2xl px-5 py-2.5 rounded-xl rotate-[-12deg] tracking-widest bg-white/95 shadow-md">
                          CONNECT ❤️
                        </div>
                      )}
                      {swipeDirection === "left" && (
                        <div className="border-4 border-amber-700 text-amber-700 font-bold uppercase text-2xl px-5 py-2.5 rounded-xl rotate-[12deg] tracking-widest bg-white/95 shadow-md">
                          PASS ✕
                        </div>
                      )}
                      {swipeDirection === "super" && (
                        <div className="border-4 border-amber-500 text-amber-500 font-bold uppercase text-2xl px-5 py-2.5 rounded-xl rotate-[-6deg] tracking-widest bg-white/95 shadow-md">
                          SUPER ALIGN ✨
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-850 uppercase tracking-widest flex-wrap gap-1">
                    <span>Card {swipeIndex + 1} of {deckCompanions.length}</span>
                    <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 font-bold">
                      Mature Companion Match
                    </span>
                  </div>

                  {/* Avatar Frame */}
                  <div className="relative mx-auto my-5 flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-rose-200 rounded-full blur-xl opacity-30 animate-pulse-subtle"></div>
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr ${currentCompanion.avatarColor} flex items-center justify-center text-4xl sm:text-5xl shadow-lg border-4 border-white relative z-10`}>
                      {currentCompanion.avatarEmoji}
                    </div>
                  </div>

                  {/* Header Info */}
                  <div className="text-center">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-amber-950 flex items-center justify-center gap-2">
                      {currentCompanion.name}, <span className="font-sans text-lg sm:text-xl font-semibold">{currentCompanion.age}</span>
                    </h3>

                    <p className="text-xs font-semibold text-amber-850 mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                      <span>{currentCompanion.occupation}</span>
                      <span className="text-amber-200">•</span>
                      <span className="text-[10px] text-amber-700 font-medium tracking-wider">{currentCompanion.chapterTheme}</span>
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-2.5 text-xs font-semibold text-amber-700 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {currentCompanion.location}
                      </span>
                      {currentCompanion.distanceMiles !== undefined && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px] shadow-2xs">
                          📍 {formatDistance(currentCompanion.distanceMiles, currentCompanion.distanceKm)} away
                        </span>
                      )}
                      <span className="text-amber-200 hidden sm:inline">|</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-50" />
                        Goal: {currentCompanion.relationshipGoal}
                      </span>
                    </div>

                    {/* Direct Conversation CTA Button on Card */}
                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMatch(currentCompanion);
                          setActiveTab("conversations");
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.98] text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                        <span className="truncate">Start Conversation in Dialogue</span>
                      </button>
                    </div>
                  </div>

                  {/* EXPANDABLE SECTION 1: BIO & PASSIONS */}
                  <div className="mt-5 pt-4 border-t border-amber-100/60">
                    <button
                      type="button"
                      onClick={() => setIsBioExpanded(!isBioExpanded)}
                      className="w-full flex items-center justify-between text-xs font-bold text-amber-900 hover:text-amber-950 transition-colors cursor-pointer"
                    >
                      <span>{isBioExpanded ? "Hide Introduction & Passions" : "View Introduction & Passions"}</span>
                      <span className="text-[10px] transition-transform duration-200" style={{ transform: isBioExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ▼
                      </span>
                    </button>

                    {isBioExpanded && (
                      <div className="mt-3 text-left space-y-3 animate-fade-in max-h-48 overflow-y-auto">
                        <p className="text-xs text-amber-900 leading-relaxed italic bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100/50 break-words">
                          "{currentCompanion.bio}"
                        </p>
                        <div>
                          <h4 className="text-[9px] font-bold text-amber-950 uppercase tracking-widest mb-1.5">Passions & Hobbies</h4>
                          <div className="flex flex-wrap gap-1">
                            {currentCompanion.interests.map((interest) => (
                              <span key={interest} className="text-[10px] px-2.5 py-1 bg-white border border-amber-100/60 text-amber-800 rounded-lg font-medium">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* EXPANDABLE SECTION 2: AI HARMONY COMPATIBILITY */}
                  <div className="mt-3 pt-3 border-t border-amber-100/60">
                    <button
                      type="button"
                      onClick={() => setIsQuizExpanded(!isQuizExpanded)}
                      className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        {companionReport ? `AI Harmony Alignment (${companionReport.matchScore}%)` : "Assess AI Harmony & Compatibility"}
                      </span>
                      <span className="text-[10px] transition-transform duration-200" style={{ transform: isQuizExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ▼
                      </span>
                    </button>

                    {isQuizExpanded && (
                      <div className="mt-3 text-left space-y-4 animate-fade-in bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100/60">
                        {companionReport ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif font-bold text-sm text-emerald-950">
                                Harmony Report ({companionReport.matchScore}% Match)
                              </h4>
                            </div>
                            <p className="text-xs text-amber-900 italic font-medium leading-relaxed break-words">
                              "{companionReport.summary}"
                            </p>
                            <div>
                              <h5 className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider mb-1">Shared Strengths</h5>
                              <ul className="space-y-1">
                                {companionReport.sharedStrengths.map((str, idx) => (
                                  <li key={idx} className="text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-xs text-amber-900 font-medium">
                              Answer 3 lifestyle questions to evaluate compatibility with {currentCompanion.name}:
                            </p>
                            {COMPATIBILITY_QUIZ_QUESTIONS.map((q) => {
                              const chosenVal = currentMatchQuizAnswers[q.id];
                              return (
                                <div key={q.id} className="p-3 rounded-xl bg-white border border-amber-100">
                                  <h5 className="text-xs font-semibold text-amber-950 mb-2">{q.question}</h5>
                                  <div className="grid grid-cols-1 gap-1.5">
                                    {q.options.map((opt: any) => {
                                      const isChecked = chosenVal === opt.value;
                                      return (
                                        <button
                                          key={opt.value}
                                          type="button"
                                          onClick={() => handleSelectQuizOption(currentCompanion.id, q.id, opt.value)}
                                          className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                                            isChecked
                                              ? "bg-amber-950 border-amber-950 text-white font-bold"
                                              : "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100/50"
                                          }`}
                                        >
                                          <span className="font-semibold">{opt.label}: </span>
                                          <span>{opt.text}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}

                            <button
                              type="button"
                              onClick={() => handleSubmitQuiz(currentCompanion.id)}
                              disabled={isAnalyzingCompatibility}
                              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              {isAnalyzingCompatibility ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Evaluating Harmony...</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3.5 h-3.5 fill-emerald-100" />
                                  <span>Evaluate Compatibility</span>
                                </>
                              )}
                            </button>
                            {compatibilityError && (
                              <p className="text-[10px] text-red-600 font-medium">{compatibilityError}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls Below Card */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
                  {/* Rewind */}
                  <button
                    onClick={handleSwipeRewind}
                    disabled={swipeIndex === 0}
                    className={`p-3 sm:p-3.5 rounded-full border transition-all ${
                      swipeIndex === 0
                        ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    }`}
                    title="Rewind Last Swipe"
                  >
                    <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Pass / Dislike */}
                  <button
                    onClick={() => handleSwipeAction("left")}
                    className="p-4 sm:p-5 rounded-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 hover:text-amber-950 hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-md flex items-center justify-center"
                    title="Pass (Swipe Left)"
                  >
                    <span className="text-lg sm:text-xl font-bold leading-none">✕</span>
                  </button>

                  {/* Super Match */}
                  <button
                    onClick={() => handleSwipeAction("super")}
                    className="p-3 sm:p-3.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                    title="Super Connect! (Sparkles)"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 fill-emerald-100" />
                  </button>

                  {/* Connect / Like */}
                  <button
                    onClick={() => handleSwipeAction("right")}
                    className="p-4 sm:p-5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-md flex items-center justify-center"
                    title="Connect & Chat! (Swipe Right)"
                  >
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-100" />
                  </button>
                </div>
              </div>
            );
          })()
        )
      )}
    </div>
  );
};
