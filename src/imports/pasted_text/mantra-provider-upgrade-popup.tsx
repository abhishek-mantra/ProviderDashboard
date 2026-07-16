Looking at the screenshot, here is the precise implementation prompt:

---

## Implementation Prompt: Redesign "Elevate with Mantra Provider" Popup

### FILE: `Layout.tsx`

**Replace the entire `MantraPremiumUpgradePopup` component** with a new component called `MantraProviderUpgradePopup`. The old popup had generic premium features — the new one must specifically pitch getting listed as a Mantra Provider with the exact benefits described.

Replace the entire function from `function MantraPremiumUpgradePopup(...)` to its closing `}` with this new component:

```tsx
function MantraProviderUpgradePopup({ onClose, onGetListed }: {
  onClose: () => void;
  onGetListed: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Hero Header */}
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

          <div className="size-12 bg-white/15 rounded-xl flex items-center justify-center mb-3 border border-white/20">
            <Crown className="size-6 text-white" />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            Become a Mantra Provider
          </h2>
          <p className="text-sm text-blue-100 leading-relaxed">
            Get listed on MantraCare and grow your practice with access to 1M+ individuals and 20K+ corporate clients.
          </p>
        </div>

        {/* Benefits List */}
        <div className="px-6 py-4 space-y-3">
          {[
            {
              icon: Users,
              color: "bg-blue-50 dark:bg-blue-900/20",
              iconColor: "text-blue-600 dark:text-blue-400",
              label: "Session Requests from Mantra's Network",
              desc: "Only premium providers receive session requests from Mantra's network of 1M+ individuals and 20K+ corporate clients.",
            },
            {
              icon: Building2,
              color: "bg-indigo-50 dark:bg-indigo-900/20",
              iconColor: "text-indigo-600 dark:text-indigo-400",
              label: "Access 2,000+ Organizations",
              desc: "Partner with MantraCare and reach employees across leading organizations.",
            },
            {
              icon: Sparkles,
              color: "bg-amber-50 dark:bg-amber-900/20",
              iconColor: "text-amber-600 dark:text-amber-400",
              label: "Premium Listing",
              desc: "Get featured as a verified premium provider above basic members.",
            },
            {
              icon: Megaphone,
              color: "bg-pink-50 dark:bg-pink-900/20",
              iconColor: "text-pink-600 dark:text-pink-400",
              label: "Client Leads & Marketing",
              desc: "Increase visibility through client leads, marketing tools, and insurance credentialing.",
            },
            {
              icon: Shield,
              color: "bg-emerald-50 dark:bg-emerald-900/20",
              iconColor: "text-emerald-600 dark:text-emerald-400",
              label: "Insurance & Claims",
              desc: "Manage your Credential Status and Claims to expand your eligible client base.",
            },
          ].map(({ icon: Icon, color, iconColor, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className={`size-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`size-4 ${iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{label}</p>
                <p className="text-xs text-[#64748B] dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Work on Your Terms note */}
        <div className="mx-6 mb-4 px-3 py-2.5 bg-[#F0F9FF] dark:bg-[#043570]/20 rounded-xl border border-[#BAE6FD] dark:border-[#043570]/40">
          <p className="text-xs font-medium text-[#0369A1] dark:text-blue-300 text-center">
            💼 Work on Your Terms — offer services at listed rates, accept requests & get paid monthly
          </p>
        </div>

        {/* CTAs */}
        <div className="px-6 pb-6 space-y-2">
          <button
            onClick={onGetListed}
            className="w-full py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-blue-900/20"
          >
            Get Listed Now →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Add `Building2` to the lucide-react import** at the top of the file. The current import line has many icons — add `Building2` to it:

```tsx
import { Home, Users, Calendar, FileText, CreditCard, User, Menu, MessageSquare, Gift, LogOut, CheckSquare, TrendingUp, Crown, ChevronDown, Megaphone, Wrench, Settings, UserPlus, X, Lock, Brain, Mic, Pill, Sparkles, StickyNote, ChevronRight, Shield, Building2 } from "lucide-react";
```

**Update the popup rendering at the bottom of the `Layout` return** — find this block near the end of the JSX:

```tsx
// BEFORE
{showPremiumUpgradePopup && (
  <MantraPremiumUpgradePopup
    onClose={() => setShowPremiumUpgradePopup(false)}
    onManagePlans={handleManagePlans}
    isTranscriberOnly={isTranscriberOnly}
  />
)}
```

Replace with:

```tsx
// AFTER
{showPremiumUpgradePopup && (
  <MantraProviderUpgradePopup
    onClose={() => setShowPremiumUpgradePopup(false)}
    onGetListed={() => {
      setShowPremiumUpgradePopup(false);
      navigate("/onboarding");
    }}
  />
)}
```

**Remove `handleManagePlans`** — it is no longer used. Delete this function:

```ts
// DELETE this entire function
const handleManagePlans = () => {
  setShowPremiumUpgradePopup(false);
  navigate("/settings/billing", { state: { openAvailablePlans: true } });
};
```

No other changes needed. The `showPremiumUpgradePopup` state, the "Elevate with Mantra Provider" button, and the Show More locked-items upgrade trigger all already call `setShowPremiumUpgradePopup(true)` — they will now render the new popup automatically. The popup only renders when `!isProviderPlan` so it correctly never shows in Provider mode.