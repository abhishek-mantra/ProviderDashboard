Two separate prompts below.

---

## Prompt 1 — `SettingsBilling.tsx`: Fix BASIC plan feature groups & session notes label

**File:** `SettingsBilling.tsx`
**Scope:** `ehrPlans` array, BASIC entry `featureGroups` only.

**Problem:** BASIC has 3 separate `featureGroups` with empty-label groups causing extra spacing. GROWTH has a single group with all features, which renders tighter. Fix by collapsing BASIC into a single featureGroup so spacing is identical to GROWTH/SCALER. Also strip `(SOAP · DAP · BIRP)` from the Session Notes feature string across all three plans.

---

### 1. Replace BASIC `featureGroups` entirely

```typescript
featureGroups: [
  {
    label: "OUR CORE FEATURES, AND",
    features: [
      "AI Transcriber",
      "AI Session Notes",
      "AI Prescription generator",
      "Credentialing & Enrollment Access",
      "5 free insurance claims/mo",
    ],
    sublabel: "All AI tools draw from your monthly credit balance",
    collapsible: false,
    defaultExpanded: true,
  },
],
```

---

### 2. Update Session Notes string in GROWTH featureGroups[0].features

Find:
```
"AI Session Notes (SOAP · DAP · BIRP)",
```
This string does not appear in GROWTH or SCALER currently (they use tier-anchor labels, no AI Tools list) — but search the full `ehrPlans` array and replace every occurrence of:

```typescript
"AI Session Notes (SOAP · DAP · BIRP)",
```

with:

```typescript
"AI Session Notes",
```

No other changes.

---

## Prompt 2 — `Layout.tsx` + new `MantraProviderPage.tsx`: Replace popup with a routed page

**Files:** `Layout.tsx` (one-line change), new file `MantraProviderPage.tsx`

---

### Change in `Layout.tsx`

Find the `onClick` on the "Become a Mantra Provider" sidebar button (both the expanded and collapsed variants). It currently calls `setShowPremiumUpgradePopup(true)`. Replace both calls with a `navigate("/mantra-provider")` call instead. The `MantraProviderUpgradePopup` component and `showPremiumUpgradePopup` state can remain in the file untouched — they're still used by `UnlockEHRPopup`'s `onGetListed` path.

Specifically, find:

```typescript
onClick={() => setShowPremiumUpgradePopup(true)}
```

— there are two instances (one for expanded sidebar, one for collapsed) — replace both with:

```typescript
onClick={() => navigate("/mantra-provider")}
```

Also add the route `/mantra-provider` to your router config pointing to the new `MantraProviderPage` component.

---

### New file: `MantraProviderPage.tsx`

```typescript
import {
  Globe, Building2, BadgeCheck, TrendingUp, ShieldCheck,
  Crown, PlayCircle, ChevronDown, ChevronUp, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const benefits = [
  {
    icon: Globe,
    color: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
    label: "Session Requests from Mantra's Network",
    desc: "Only premium providers receive session requests from Mantra's network of 1M+ individuals and 20K+ corporate clients.",
  },
  {
    icon: Building2,
    color: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    label: "Access 2,000+ Organizations",
    desc: "Partner with MantraCare and reach employees across leading organizations worldwide.",
  },
  {
    icon: BadgeCheck,
    color: "bg-[#FFFBEB]",
    iconColor: "text-[#D97706]",
    label: "Premium Listing",
    desc: "Get featured as a verified premium provider above basic members in directory searches.",
  },
  {
    icon: TrendingUp,
    color: "bg-[#FDF2F8]",
    iconColor: "text-[#DB2777]",
    label: "Client Leads & Marketing",
    desc: "Increase visibility through client leads, marketing tools, and insurance credentialing support.",
  },
  {
    icon: ShieldCheck,
    color: "bg-[#F0FDF4]",
    iconColor: "text-[#16A34A]",
    label: "Insurance & Claims",
    desc: "Manage your Credential Status and Claims to expand your eligible client base.",
  },
  {
    icon: Crown,
    color: "bg-[#FFF7ED]",
    iconColor: "text-[#EA580C]",
    label: "Work on Your Terms",
    desc: "Offer services at listed rates, accept session requests, and get paid monthly — no lock-in.",
  },
];

const faqs = [
  {
    q: "Who can become a Mantra Provider?",
    a: "Any licensed mental health or wellness professional can apply. We verify credentials during onboarding to ensure quality for our network of clients.",
  },
  {
    q: "Is there a cost to get listed?",
    a: "Getting listed on the Mantra Care network is included with your existing Mantra EHR plan at no additional cost.",
  },
  {
    q: "How do session requests work?",
    a: "Once listed, you'll receive session requests from individuals and corporate clients in your area and specialty. You can accept or decline requests based on your availability.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most providers are approved within 3–5 business days after submitting their credentials and completing the onboarding form.",
  },
  {
    q: "Can I set my own rates?",
    a: "Yes. You set your own session rates. Mantra Care takes no commission — you keep 100% of what you earn from sessions booked through the platform.",
  },
  {
    q: "What happens to my existing EHR data?",
    a: "Nothing changes. Your client records, session notes, and all EHR data remain fully intact. Becoming a Mantra Provider simply adds network visibility on top of your existing plan.",
  },
];

export function MantraProviderPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) =>
    setExpandedFaq(prev => (prev === i ? null : i));

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6 space-y-6">

      {/* ── Section 1 — Hero banner ───────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
      >
        <div className="px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
              <Crown className="size-7 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                Become a Mantra Provider
              </h1>
              <p className="text-sm text-blue-100 leading-relaxed max-w-[520px]">
                Get listed on MantraCare and grow your practice with access to 1M+ individuals and 20K+ corporate clients.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/onboarding")}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-[#043570] rounded-xl font-bold text-sm transition-colors shadow-md whitespace-nowrap flex-shrink-0"
          >
            Get Listed Now
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ── Section 2 — Benefits + Video ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left — Benefits grid */}
        <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-base font-bold text-[#111827] dark:text-white mb-5">
            Why join the Mantra network?
          </h2>
          <div className="space-y-4">
            {benefits.map(({ icon: Icon, color, iconColor, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className={`size-9 ${color} dark:bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white dark:border-transparent shadow-sm`}>
                  <Icon className={`size-[18px] ${iconColor}`} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827] dark:text-white leading-tight">{label}</p>
                  <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 px-3 py-2.5 bg-[#F0F9FF] dark:bg-[#043570]/20 rounded-xl border border-[#BAE6FD] dark:border-[#043570]/40">
            <p className="text-xs font-medium text-[#0369A1] dark:text-blue-300 text-center">
              💼 Work on Your Terms — offer services at listed rates, accept requests & get paid monthly
            </p>
          </div>
        </div>

        {/* Right — Video placeholder */}
        <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6 flex flex-col">
          <h2 className="text-base font-bold text-[#111827] dark:text-white mb-4">
            See how it works
          </h2>
          <div
            className="flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-750"
            style={{ minHeight: "260px" }}
          >
            <div className="size-14 bg-[#043570] rounded-full flex items-center justify-center mb-3 shadow-md">
              <PlayCircle className="size-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#111827] dark:text-white mb-1">
              Provider onboarding walkthrough
            </p>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">
              Placeholder for embedded video player
            </p>
          </div>

          <button
            onClick={() => navigate("/onboarding")}
            className="mt-5 w-full py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors shadow-md"
          >
            Get Listed Now →
          </button>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 w-full py-2 text-[#64748B] hover:text-[#111827] dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>

      {/* ── Section 3 — FAQs ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-base font-bold text-[#111827] dark:text-white mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-5">
          Everything you need to know about joining the Mantra Provider network.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`pb-3 ${i < faqs.length - 1 ? "border-b border-[#E5E7EB] dark:border-gray-700" : ""}`}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="text-[14px] font-semibold text-[#111827] dark:text-white">
                  {faq.q}
                </span>
                {expandedFaq === i
                  ? <ChevronUp className="size-4 text-[#6B7280] flex-shrink-0" />
                  : <ChevronDown className="size-4 text-[#6B7280] flex-shrink-0" />
                }
              </button>
              {expandedFaq === i && (
                <p className="mt-2 text-[13px] text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
```

---

**Router registration** — in your routes config, add:

```typescript
{ path: "/mantra-provider", element: <MantraProviderPage /> }
```

wrapped inside the `Layout` route so the sidebar renders. The `MantraProviderUpgradePopup` component in `Layout.tsx` stays untouched — it's still reachable via the `onGetListed` callback in `UnlockEHRPopup`.