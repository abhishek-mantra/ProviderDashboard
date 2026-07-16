# Fix: AI Scribe Sidebar Styling + Mantra Premium Placement & Popup

## FILE: `src/components/Layout.tsx`

---

## FIX 1 — AI Scribe sidebar: Match nav item style to Full EHR / Provider mode

In the `isTranscriberOnly` navigation branch, the nav items (Home, Clients, AI Transcriber, Session Notes, Prescriptions, Settings) currently use a mix of styles — some have cyan accent bars, `text-gray-800` instead of `text-[#64748b]`, and other inconsistencies.

**Change every nav item in the AI Scribe branch to use the exact same className pattern as the Full EHR nav items.** The standard pattern is:

```tsx
className={`flex items-center ${shouldShowCollapsed() ? 'md:justify-center' : 'justify-between'} py-[10px] px-3 rounded-xl transition-all relative overflow-hidden ${
  isActive("/PATH")
    ? "bg-[#00c0ff] text-white shadow-md"
    : "text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
}`}
```

Specifically, make these changes in the AI Scribe nav section:

**AI Transcriber item** — remove the cyan left accent bar div and the conditional `text-[#00c0ff]` on the icon. Make it match the standard pattern above.

**Session Notes item** — remove the cyan left accent bar div and the conditional `text-[#00c0ff]` on the icon. Change `text-gray-800` in the inactive state to `text-[#64748b]`. Use standard pattern.

**Prescriptions item** — same as Session Notes: remove accent bar, remove conditional icon color, fix inactive text to `text-[#64748b]`.

Remove the `"YOUR PLAN"` badge text that appears on AI Transcriber if it exists.

The Show More section items (Messages, Appointments, Billing, Mantra Premium, Other Tools) keep their current styling — no changes there.

---

## FIX 2 — Move "Mantra Premium / Elevate" button above the user profile in EHR and AI Scribe modes

Currently the Mantra Premium plain text button sits inside the `<nav>` section. **Move it out of `<nav>` entirely** and place it between `</nav>` and the User Profile `<div>` at the bottom of the sidebar.

The sidebar structure should become:

```
<aside>
  Logo
  <nav>          ← all navigation items, no Mantra Premium button here for EHR/AI Scribe
  </nav>
  [Mantra Premium elevated button — EHR and AI Scribe only]   ← NEW POSITION
  User Profile
</aside>
```

**In the Full EHR `!isTranscriberOnly` nav section:** Remove the Mantra Premium plain text button (`!isProviderMode` branch) from inside `<nav>`.

**In the AI Scribe `isTranscriberOnly` nav section:** The Mantra Premium button is currently inside Show More dropdown — leave it there AND also add it in the new bottom position (outside nav). The Show More one is fine as-is. The bottom one is the new elevated placement.

---

## FIX 3 — The elevated Mantra Premium button: new design and text

Place this block between `</nav>` and the User Profile div, visible for both EHR (`!isTranscriberOnly && !isProviderMode`) and AI Scribe (`isTranscriberOnly`) modes:

```tsx
{/* Elevate with Mantra Provider — shown for EHR and AI Scribe, not Provider */}
{(!isProviderMode) && !shouldShowCollapsed() && (
  <div className="px-3 pb-2">
    <button
      onClick={() => setShowPremiumUpgradePopup(true)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-gray-700 hover:border-[#00c0ff]/40 hover:bg-[#f8fbff] dark:hover:bg-gray-700/50 transition-all text-left group"
    >
      <div className="size-7 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform flex-shrink-0">
        <Crown className="size-3.5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#043570] dark:text-white truncate">Elevate with Mantra Provider</p>
        <p className="text-[10px] text-[#64748B] dark:text-gray-400 truncate leading-tight">Unlock growth & premium tools</p>
      </div>
      <ChevronRight className="size-3.5 text-[#64748B] flex-shrink-0 group-hover:text-[#043570] transition-colors" />
    </button>
  </div>
)}

{/* Collapsed state of the button */}
{(!isProviderMode) && shouldShowCollapsed() && (
  <div className="px-3 pb-2 flex justify-center">
    <button
      onClick={() => setShowPremiumUpgradePopup(true)}
      title="Elevate with Mantra Provider"
      className="size-9 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <Crown className="size-4 text-white" />
    </button>
  </div>
)}
```

---

## FIX 4 — Update the popup content for AI Scribe mode to include EHR benefits

The `MantraPremiumUpgradePopup` component currently shows only the 4 Mantra Premium / growth features. When triggered from AI Scribe mode, it should also show Full EHR plan benefits.

Pass a `mode` prop to the popup:

```tsx
function MantraPremiumUpgradePopup({ onClose, onManagePlans, mode }: {
  onClose: () => void;
  onManagePlans: () => void;
  mode: "ehr" | "ai-scribe";
}) {
```

Inside the popup, show different feature lists based on `mode`:

```tsx
const growFeatures = [
  { icon: UserPlus, label: "Client Leads", desc: "Get matched with new clients actively seeking care" },
  { icon: Crown, label: "Mantra Premium", desc: "Priority listing and premium badge on your profile" },
  { icon: Megaphone, label: "Marketing Tools", desc: "Promote your practice and grow your audience" },
  { icon: Gift, label: "Refer & Earn", desc: "Invite colleagues and earn rewards" },
];

const ehrFeatures = [
  { icon: Calendar, label: "Appointments", desc: "Full scheduling, telehealth & calendar management" },
  { icon: CreditCard, label: "Billing & Invoicing", desc: "Invoices, earnings tracking & insurance claims" },
  { icon: MessageSquare, label: "Messages", desc: "Secure client messaging & communication" },
  { icon: CheckSquare, label: "Tasks & Workflows", desc: "Manage to-dos and practice workflows" },
];

const featuresToShow = mode === "ai-scribe"
  ? [...ehrFeatures, ...growFeatures]
  : growFeatures;
```

Update the title and subtitle for AI Scribe mode:

```tsx
<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
  {mode === "ai-scribe" ? "Upgrade to Provider Plan" : "Unlock Mantra Premium"}
</h2>
<p className="text-sm text-[#64748B] dark:text-gray-400 mb-5">
  {mode === "ai-scribe"
    ? "Get full EHR tools and premium growth features for your practice."
    : "Switch to the Provider plan to access premium growth features for your practice."
  }
</p>
```

For AI Scribe mode, add a section divider between EHR features and growth features:

```tsx
{mode === "ai-scribe" ? (
  <div className="space-y-4 mb-6">
    {/* EHR Benefits */}
    <div>
      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Full EHR Tools</p>
      <div className="space-y-3">
        {ehrFeatures.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="size-8 bg-[#E3F2FD] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="size-4 text-[#043570]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
              <p className="text-xs text-[#64748B] dark:text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Growth & Premium</p>
      <div className="space-y-3">
        {growFeatures.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="size-8 bg-[#FFF3CD] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="size-4 text-[#B45309]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
              <p className="text-xs text-[#64748B] dark:text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
) : (
  /* EHR mode — original 4-item list */
  <div className="space-y-3 mb-6">
    {growFeatures.map(({ icon: Icon, label, desc }) => (
      <div key={label} className="flex items-start gap-3">
        <div className="size-8 bg-[#E3F2FD] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="size-4 text-[#043570]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-xs text-[#64748B] dark:text-gray-400">{desc}</p>
        </div>
      </div>
    ))}
  </div>
)}
```

Since the AI Scribe popup is taller (8 items), make it scrollable:

```tsx
{/* Inside the modal card, wrap the feature section: */}
<div className="max-h-[50vh] overflow-y-auto pr-1">
  {/* ...feature content above... */}
</div>
```

Update the popup render call to pass `mode`:

```tsx
{showPremiumUpgradePopup && (
  <MantraPremiumUpgradePopup
    onClose={() => setShowPremiumUpgradePopup(false)}
    onManagePlans={handleManagePlans}
    mode={isTranscriberOnly ? "ai-scribe" : "ehr"}
  />
)}
```

Also add `CheckSquare` to the imports at the top of `Layout.tsx` if not already imported:
```tsx
import { ..., CheckSquare, ... } from "lucide-react";
```
`CheckSquare` is already imported — verify it's in the list.

---

## SUMMARY

| Change | Where | What |
|---|---|---|
| AI Scribe nav items | `isTranscriberOnly` nav branch | Remove cyan accent bars, conditional icon colors, and `text-gray-800` — use standard `text-[#64748b]` + `bg-[#00c0ff]` active pattern |
| Mantra Premium button | Moved out of `<nav>` | Now sits between `</nav>` and User Profile for EHR and AI Scribe modes |
| Button design | New elevated button | Small gradient Crown icon + "Elevate with Mantra Provider" bold + "Unlock growth & premium tools" subtitle + ChevronRight. Border style (not filled card). |
| Popup — EHR mode | `mode="ehr"` | Shows 4 growth features, same as before |
| Popup — AI Scribe mode | `mode="ai-scribe"` | Shows 8 features in two sections: "Full EHR Tools" (Appointments, Billing, Messages, Tasks) + "Growth & Premium" (Client Leads, Mantra Premium, Marketing, Refer & Earn). Scrollable. Title changes to "Upgrade to Provider Plan". |