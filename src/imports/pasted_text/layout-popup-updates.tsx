Here is the precise implementation prompt:

---

## Implementation Prompt: Two Popup Improvements

### FIX 1 — Improve `MantraProviderUpgradePopup` icons and colors

**In `Layout.tsx`**, replace the benefits array inside `MantraProviderUpgradePopup` with updated icons and a consistent white-on-blue-header / blue-on-white-body color scheme. The icons should use more fitting lucide icons for a premium SaaS feel.

**Update the benefits array** inside the popup component. Replace the entire `.map()` array:

```tsx
{[
  {
    icon: Globe,
    color: "bg-[#EFF6FF] dark:bg-blue-900/20",
    iconColor: "text-[#2563EB] dark:text-blue-400",
    label: "Session Requests from Mantra's Network",
    desc: "Only premium providers receive session requests from Mantra's network of 1M+ individuals and 20K+ corporate clients.",
  },
  {
    icon: Building2,
    color: "bg-[#EEF2FF] dark:bg-indigo-900/20",
    iconColor: "text-[#4F46E5] dark:text-indigo-400",
    label: "Access 2,000+ Organizations",
    desc: "Partner with MantraCare and reach employees across leading organizations.",
  },
  {
    icon: BadgeCheck,
    color: "bg-[#FFFBEB] dark:bg-amber-900/20",
    iconColor: "text-[#D97706] dark:text-amber-400",
    label: "Premium Listing",
    desc: "Get featured as a verified premium provider above basic members.",
  },
  {
    icon: TrendingUp,
    color: "bg-[#FDF2F8] dark:bg-pink-900/20",
    iconColor: "text-[#DB2777] dark:text-pink-400",
    label: "Client Leads & Marketing",
    desc: "Increase visibility through client leads, marketing tools, and insurance credentialing.",
  },
  {
    icon: ShieldCheck,
    color: "bg-[#F0FDF4] dark:bg-emerald-900/20",
    iconColor: "text-[#16A34A] dark:text-emerald-400",
    label: "Insurance & Claims",
    desc: "Manage your Credential Status and Claims to expand your eligible client base.",
  },
].map(({ icon: Icon, color, iconColor, label, desc }) => (
  <div key={label} className="flex items-start gap-3">
    <div className={`size-9 ${color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white dark:border-transparent shadow-sm`}>
      <Icon className={`size-[18px] ${iconColor}`} strokeWidth={1.75} />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{label}</p>
      <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
))}
```

**Add `BadgeCheck`, `Globe`, `ShieldCheck` to the lucide-react import.** Also keep `TrendingUp` which is already imported. Update the import line:

```tsx
import { Home, Users, Calendar, FileText, CreditCard, User, Menu, MessageSquare, Gift, LogOut, CheckSquare, TrendingUp, Crown, ChevronDown, Megaphone, Wrench, Settings, UserPlus, X, Lock, Brain, Mic, Pill, Sparkles, StickyNote, ChevronRight, Shield, Building2, Globe, BadgeCheck, ShieldCheck } from "lucide-react";
```

**Also update the hero header icon** in the popup — replace the plain `Crown` with a styled version that feels more premium. Update the icon container inside the blue header:

```tsx
// REPLACE the icon container div in the hero header
<div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
  <Crown className="size-7 text-white" strokeWidth={1.5} />
</div>
```

---

### FIX 2 — New `UnlockEHRPopup` for AI Scribe mode locked features (Messages, Appointments, Billing)

When `isTranscriberOnly` is true and the user clicks Messages, Appointments, or Billing in Show More, the current code calls `setShowPremiumUpgradePopup(true)` which shows the Provider popup. Instead, these clicks must show a **separate popup** with two upgrade paths: Full EHR plan OR get listed as a Mantra Provider.

**Step A — Add a new state variable** inside `Layout()`:

```ts
const [showEHRUpgradePopup, setShowEHRUpgradePopup] = useState(false);
```

**Step B — Add a new popup component** before `export function Layout()`, after `MantraProviderUpgradePopup`:

```tsx
function UnlockEHRPopup({ onClose, onGetListed, onUpgradeEHR }: {
  onClose: () => void;
  onGetListed: () => void;
  onUpgradeEHR: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-5"
          style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-4 text-white" />
          </button>
          <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
            <Lock className="size-6 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Unlock This Feature</h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            This feature is part of the Full EHR plan. Upgrade your plan or get listed as a Mantra Provider to access it.
          </p>
        </div>

        {/* Two paths */}
        <div className="px-6 py-5 space-y-3">

          {/* Path 1 — Full EHR */}
          <div className="rounded-2xl border-2 border-[#E2E8F0] dark:border-gray-700 p-4 hover:border-[#043570] dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-9 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white shadow-sm">
                <LayoutDashboard className="size-[18px] text-[#2563EB]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Full EHR Plan</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  Get complete access to Appointments, Billing, Secure Messaging, and all EHR tools for your independent practice.
                </p>
              </div>
            </div>
            <button
              onClick={onUpgradeEHR}
              className="w-full py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] rounded-xl font-bold text-sm transition-colors border border-[#BFDBFE]"
            >
              Upgrade to Full EHR
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Path 2 — Mantra Provider */}
          <div className="rounded-2xl border-2 border-[#E2E8F0] dark:border-gray-700 p-4 hover:border-[#043570] dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="size-9 bg-[#FFFBEB] dark:bg-amber-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white shadow-sm">
                <Crown className="size-[18px] text-[#D97706]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Get Listed as a Mantra Provider</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">
                  Access the full EHR suite plus client leads, premium listing, marketing tools, insurance & claims — and connect with 1M+ individuals.
                </p>
              </div>
            </div>
            <button
              onClick={onGetListed}
              className="w-full py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Get Listed Now →
            </button>
          </div>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Add `LayoutDashboard` to the lucide-react import:**

```tsx
import { ..., LayoutDashboard } from "lucide-react";
```

**Step C — Update the locked items in Show More** to use `setShowEHRUpgradePopup` instead of `setShowPremiumUpgradePopup`. Find this block inside the `{isTranscriberOnly && (...)}` section of Show More:

```tsx
// BEFORE
{[
  { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
  { icon: <Calendar className="size-5 flex-shrink-0" />, label: 'Appointments' },
  { icon: <CreditCard className="size-5 flex-shrink-0" />, label: 'Billing' },
].map(({ icon, label }) => (
  <button
    key={label}
    onClick={() => setShowPremiumUpgradePopup(true)}
    ...
  >
```

```tsx
// AFTER
{[
  { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
  { icon: <Calendar className="size-5 flex-shrink-0" />, label: 'Appointments' },
  { icon: <CreditCard className="size-5 flex-shrink-0" />, label: 'Billing' },
].map(({ icon, label }) => (
  <button
    key={label}
    onClick={() => setShowEHRUpgradePopup(true)}
    ...
  >
```

**Step D — Render the new popup** at the bottom of the Layout return, alongside the existing popup:

```tsx
{/* EHR Upgrade Popup — shown in transcriber mode when locked features are clicked */}
{showEHRUpgradePopup && (
  <UnlockEHRPopup
    onClose={() => setShowEHRUpgradePopup(false)}
    onUpgradeEHR={() => {
      setShowEHRUpgradePopup(false);
      navigate("/settings/billing", { state: { openAvailablePlans: true } });
    }}
    onGetListed={() => {
      setShowEHRUpgradePopup(false);
      navigate("/onboarding");
    }}
  />
)}
```

---

### Summary

| Trigger | Popup shown |
|---|---|
| "Elevate with Mantra Provider" button (EHR or AI Scribe mode) | `MantraProviderUpgradePopup` — pitch to get listed, CTA → `/onboarding` |
| Messages / Appointments / Billing clicked in Show More (AI Scribe mode only) | `UnlockEHRPopup` — two paths: Full EHR upgrade OR get listed as provider |