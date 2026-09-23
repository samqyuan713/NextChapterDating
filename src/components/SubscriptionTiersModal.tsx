/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Crown,
  Heart,
  Volume2,
  Lock,
  Unlock,
  X,
  Compass,
  Loader2,
  Calendar
} from "lucide-react";
import { MembershipTier } from "../types";

interface SubscriptionTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: MembershipTier;
  onSelectTier: (tier: MembershipTier) => Promise<void> | void;
  promptReason?: string | null;
}

export const SubscriptionTiersModal: React.FC<SubscriptionTiersModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onSelectTier,
  promptReason,
}) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingTier, setLoadingTier] = useState<MembershipTier | null>(null);

  if (!isOpen) return null;

  const handleChoose = async (tier: MembershipTier) => {
    setLoadingTier(tier);
    try {
      await onSelectTier(tier);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-amber-950/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF8F5] border-2 border-amber-200/90 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up text-left">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white p-5 sm:p-6 flex items-start justify-between relative shrink-0">
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                <Crown className="w-5 h-5 text-amber-400 fill-amber-300" />
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
                NextChapter Salon Membership & Concierge
              </h2>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed max-w-2xl">
              Thoughtfully structured tiers for mature adults seeking genuine companionship, safety, discreet matching, and intentional connection.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 border border-white/10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Reason Alert (if triggered by a specific gated action) */}
        {promptReason && (
          <div className="bg-rose-50/90 border-b border-rose-200 px-5 py-3 text-xs text-rose-900 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{promptReason}</span>
          </div>
        )}

        {/* Billing Cycle Switcher */}
        <div className="p-4 bg-amber-50/60 border-b border-amber-200/70 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-amber-950" : "text-amber-700"}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            className="relative w-13 h-7 bg-amber-950 rounded-full p-1 transition-colors cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                billingCycle === "annual" ? "translate-x-6 bg-amber-200" : "translate-x-0"
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold ${billingCycle === "annual" ? "text-amber-950" : "text-amber-700"}`}>
              Annual Plan
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
              Save 25%
            </span>
          </div>
        </div>

        {/* Tiers Comparison Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
          {/* 1. Guest of the Salon (Free) */}
          <div
            className={`bg-white border-2 rounded-2xl p-5 flex flex-col justify-between transition-all ${
              currentTier === "free"
                ? "border-stone-400 shadow-sm ring-2 ring-stone-200"
                : "border-stone-200/90 hover:border-amber-300"
            }`}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">Basic Tier</span>
                <h3 className="font-serif font-bold text-lg text-stone-900">Guest of the Salon</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Explore local profiles and sample our dignified connection platform.
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-stone-900">$0</span>
                  <span className="text-xs text-stone-500">/ forever free</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-stone-700 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>Browse profile deck with distance & hobby filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>1 free mystery reveal in Salon Admirers Vault</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>Sample voice greetings (first 3 companions)</span>
                </li>
                <li className="flex items-start gap-2 text-stone-400">
                  <Lock className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                  <span>Limited message exchanges per day</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleChoose("free")}
                disabled={currentTier === "free" || loadingTier !== null}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentTier === "free"
                    ? "bg-stone-100 text-stone-600 border border-stone-300 cursor-default"
                    : "bg-stone-200 hover:bg-stone-300 text-stone-900"
                }`}
              >
                {currentTier === "free" ? "Current Plan" : "Switch to Free"}
              </button>
            </div>
          </div>

          {/* 2. Club Member (Most Popular) */}
          <div
            className={`bg-white border-2 rounded-2xl p-5 flex flex-col justify-between relative transition-all ${
              currentTier === "club"
                ? "border-emerald-600 shadow-md ring-2 ring-emerald-200"
                : "border-amber-300 shadow-sm hover:border-amber-500"
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-950 text-amber-200 border border-amber-700 text-[10px] font-bold uppercase tracking-wider shadow-xs">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Full Connection</span>
                <h3 className="font-serif font-bold text-lg text-amber-950 flex items-center gap-1.5">
                  <span>Club Member</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Full access to unblurred admirers, unlimited voice notes, and direct contact details.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-amber-950">
                    {billingCycle === "annual" ? "$14.99" : "$19.99"}
                  </span>
                  <span className="text-xs text-amber-700">
                    / mo {billingCycle === "annual" ? "(billed annually)" : ""}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-amber-900 pt-2">
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Full Admirers Vault:</strong> Unblur all who liked you & match instantly</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Unlimited Voice Greetings:</strong> Hear every profile's voice note</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Safe Contact Relay:</strong> Freely exchange emails, phone numbers & handles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited Dialogue Salon & Story Room journeys</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleChoose("club")}
                disabled={loadingTier !== null}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                  currentTier === "club"
                    ? "bg-emerald-800 text-white cursor-default"
                    : "bg-amber-950 hover:bg-amber-900 text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loadingTier === "club" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : currentTier === "club" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Current Active Plan</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-amber-300" />
                    <span>Upgrade to Club Member</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Concierge Patron (VIP) */}
          <div
            className={`bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] border-2 rounded-2xl p-5 flex flex-col justify-between transition-all ${
              currentTier === "patron"
                ? "border-amber-600 shadow-md ring-2 ring-amber-300"
                : "border-amber-300/90 shadow-sm hover:border-amber-500"
            }`}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">VIP Bespoke</span>
                <h3 className="font-serif font-bold text-lg text-amber-950 flex items-center gap-1.5">
                  <span>Concierge Patron</span>
                  <Crown className="w-4 h-4 text-amber-600 fill-amber-300" />
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Personal matchmaker introductions, date rendezvous planning, and priority placement.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-amber-950">
                    {billingCycle === "annual" ? "$39.99" : "$49.99"}
                  </span>
                  <span className="text-xs text-amber-700">
                    / mo {billingCycle === "annual" ? "(billed annually)" : ""}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-amber-900 pt-2">
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Curated Weekend Companions:</strong> Handpicked matches with personalized rationale</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Curated Date Rendezvous:</strong> Suggested low-pressure local itinerary & tea spots</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Silver Shield Verified Crest:</strong> Distinguished trust status on profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Priority placement at top of local card discovery deck</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleChoose("patron")}
                disabled={loadingTier !== null}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                  currentTier === "patron"
                    ? "bg-amber-950 text-amber-200 cursor-default"
                    : "bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loadingTier === "patron" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : currentTier === "patron" ? (
                  <>
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-300" />
                    <span>Current Active Patron</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Join as Concierge Patron</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Peace-of-Mind Guarantee */}
        <div className="px-6 py-4 bg-white border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted SSL transactions • Cancel or switch tiers at any time with 1 click</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-900 hover:text-amber-950 font-bold transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
