# MantraCare — Sidebar Changes Across Plan Modes

## FILES TO EDIT
- `src/components/Layout.tsx` — all sidebar changes
- `src/pages/SettingsBilling.tsx` — accept `openPlans` state via location to auto-open Available Plans

---

## CHANGE 1 — Rename "Grow" to "Mantra Premium" everywhere in the sidebar

In `Layout.tsx`, find every instance of the label `"Grow"` in the sidebar navigation and replace with `"Mantra Premium"`.

This affects:
- The expandable section button label in Full EHR mode: `Grow` → `Mantra Premium`
- The `isActive` check string stays on `"/grow"` path — only the visible label changes
- The `TrendingUp` icon stays — no icon change

---

## CHANGE 2 — Create a shared `MantraPremiumUpgradePopup` component

Create this as a local component inside `Layout.tsx` (no new file needed). Place it near the top of the file, before the `Layout` function.

```tsx
function MantraPremiumUpgradePopup({ onClose, onManagePlans }: {
  onClose: () => void;
  onManagePlans: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="size-12 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-xl flex items-center justify-center flex-shrink-0">
            <Crown className="size-6 text-white" />
          </div>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="size-4 text-gray-500" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Unlock Mantra Premium
        </h2>
        <p className="text-sm text-[#64748B] dark:text-gray-400 mb-5">
          Switch to the Provider plan to access premium growth features for your practice.
        </p>

        {/* Feature list */}
        <div className="space-y-3 mb-6">
          {[
            { icon: UserPlus, label: "Client Leads", desc: "Get matched with new clients actively seeking care" },
            { icon: Crown, label: "Mantra Premium", desc: "Priority listing and premium badge on your profile" },
            { icon: Megaphone, label: "Marketing Tools", desc: "Promote your practice and grow your audience" },
            { icon: Gift, label: "Refer & Earn", desc: "Invite colleagues and earn rewards" },
          ].map(({ icon: Icon, label, desc }) => (
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

        {/* CTAs */}
        <div className="space-y-2">
          <button
            onClick={onManagePlans}
            className="w-full py-3 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-colors"
          >
            Manage Plans
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
```

Add `Crown, UserPlus, Megaphone, Gift` to the existing imports at the top of `Layout.tsx` if not already imported. `Crown`, `UserPlus`, `Megaphone`, `Gift` are already in the file — verify and add any missing ones.

---

## CHANGE 3 — Add popup state to Layout

Inside the `Layout` function, add this state near the top with the other `useState` declarations:

```tsx
const [showPremiumUpgradePopup, setShowPremiumUpgradePopup] = useState(false);
```

Add a handler for the Manage Plans CTA inside the popup:

```tsx
const handleManagePlans = () => {
  setShowPremiumUpgradePopup(false);
  navigate("/settings/billing", { state: { openAvailablePlans: true } });
};
```

Render the popup at the very bottom of the Layout return, just before the closing `</div>` of the root container, alongside the existing `<Toaster />`:

```tsx
{showPremiumUpgradePopup && (
  <MantraPremiumUpgradePopup
    onClose={() => setShowPremiumUpgradePopup(false)}
    onManagePlans={handleManagePlans}
  />
)}
```

---

## CHANGE 4 — Full EHR sidebar: Remove Grow dropdown, add Mantra Premium CTA card

### In the Full EHR navigation section (`!isTranscriberOnly` branch):

**Remove** the entire `Grow Section` expandable dropdown block. This is the block that starts with:
```tsx
{/* Grow Section */}
<div>
  <button onClick={() => { setIsGrowExpanded(!isGrowExpanded); ... }}>
    ...Mantra Premium...
  </button>
  {isGrowExpanded && !shouldShowCollapsed() && (
    <div className="mt-1 space-y-1">
      {/* Client Leads, Mantra Premium, Marketing, Refer n Earn links */}
    </div>
  )}
</div>
```

**Replace** the entire Grow section block with this Mantra Premium CTA card:

```tsx
{/* Mantra Premium CTA — Full EHR mode */}
{!shouldShowCollapsed() && (
  <div className="mt-2">
    <button
      onClick={() => setShowPremiumUpgradePopup(true)}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#043570]/8 to-[#00c0ff]/5 border border-[#00c0ff]/20 hover:from-[#043570]/12 hover:to-[#00c0ff]/8 transition-all text-left group"
    >
      <div className="size-8 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <Crown className="size-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#043570] dark:text-[#00c0ff] truncate">Mantra Premium</p>
        <p className="text-[10px] text-[#64748B] dark:text-gray-400 truncate leading-tight">Switch to Provider plan</p>
      </div>
      <ChevronRight className="size-3.5 text-[#64748B] flex-shrink-0" />
    </button>
  </div>
)}

{/* Collapsed state — just the icon */}
{shouldShowCollapsed() && (
  <button
    onClick={() => setShowPremiumUpgradePopup(true)}
    className="flex items-center justify-center py-[10px] px-3 rounded-xl text-[#64748b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
    title="Mantra Premium"
  >
    <Crown className="size-5 flex-shrink-0" />
  </button>
)}
```

---

## CHANGE 5 — AI Scribe (transcriber-only) sidebar changes

### 5a — Remove Grow dropdown from Show More section

In the AI Scribe navigation block (`isTranscriberOnly` branch), inside the `isShowMoreExpanded` dropdown, find and **remove** the "For Mantra Provider" locked button:

```tsx
{/* For Mantra Provider - Locked — REMOVE THIS ENTIRE BLOCK */}
<button
  onClick={(e) => handleLockedNavClick(e, "/grow")}
  className="w-full flex items-center justify-between px-3 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed"
>
  <div className="flex items-center">
    <Crown className="size-5 flex-shrink-0 text-gray-300 dark:text-gray-600" />
    <span className="ml-3 text-sm">For Mantra Provider</span>
  </div>
  <Lock className="size-3.5 text-gray-300 dark:text-gray-600" />
</button>
```

**Replace** it with the Mantra Premium CTA button (same popup trigger):

```tsx
{/* Mantra Premium CTA — AI Scribe mode, inside Show More */}
<button
  onClick={() => setShowPremiumUpgradePopup(true)}
  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#043570]/8 to-[#00c0ff]/5 border border-[#00c0ff]/20 hover:from-[#043570]/12 hover:to-[#00c0ff]/8 transition-all mt-1"
>
  <div className="flex items-center gap-2">
    <Crown className="size-4 text-[#043570] dark:text-[#00c0ff]" />
    <span className="text-sm font-semibold text-[#043570] dark:text-[#00c0ff]">Mantra Premium</span>
  </div>
  <ChevronRight className="size-3.5 text-[#64748B]" />
</button>
```

### 5b — Unlock Messages, Appointments, Billing in AI Scribe Show More

In the AI Scribe Show More dropdown, find the three locked buttons for Messages, Appointments, and For Mantra Provider. Messages and Appointments currently call `handleLockedNavClick`. 

**Change** the Messages and Appointments buttons from locked to navigable, but instead of `handleLockedNavClick`, they now trigger the premium upgrade popup. Replace their `onClick` handlers:

**Messages** — change from:
```tsx
onClick={(e) => handleLockedNavClick(e, "/chat")}
className="w-full flex items-center justify-between px-3 py-2 text-gray-400 cursor-not-allowed"
```
To:
```tsx
onClick={() => setShowPremiumUpgradePopup(true)}
className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
```
Remove the `<Lock />` icon. Change text color from `text-gray-400` to `text-gray-600 dark:text-gray-400`.

**Appointments** — same change as Messages above.

**Billing** — if present in the Show More list as locked, apply the same change: remove lock, change onClick to `() => setShowPremiumUpgradePopup(true)`, restore normal text color.

The result: clicking Messages, Appointments, or Billing in AI Scribe mode opens the Mantra Premium upgrade popup instead of showing a toast.

---

## CHANGE 6 — SettingsBilling.tsx: Auto-open Available Plans when navigated with state

In `src/pages/SettingsBilling.tsx`, import `useLocation` from `react-router` if not already imported:

```tsx
import { useLocation } from "react-router";
```

Inside the `SettingsBilling` function (or inside `OverviewContent` — wherever `isPlansExpanded` state lives), initialize the state from location:

```tsx
// In SettingsBilling function:
const location = useLocation();

// Pass to OverviewContent:
<OverviewContent autoOpenPlans={!!(location.state as any)?.openAvailablePlans} />
```

In `OverviewContent`, accept the prop and use it to initialize:

```tsx
function OverviewContent({ autoOpenPlans = false }: { autoOpenPlans?: boolean }) {
  const [isPlansExpanded, setIsPlansExpanded] = useState(autoOpenPlans);
  
  // Scroll into view on mount if auto-opened
  useEffect(() => {
    if (autoOpenPlans) {
      setTimeout(() => {
        document.getElementById('available-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [autoOpenPlans]);
  
  // ...rest of existing code unchanged
}
```

Add `useEffect` to the `OverviewContent` imports if not already there.

---

## SUMMARY TABLE

| Mode | Grow/Premium section | Show More locked items | Behavior |
|---|---|---|---|
| **Provider** | Expandable "Mantra Premium" dropdown — no change | N/A | Unchanged |
| **Full EHR** | Grow dropdown removed → replaced with compact CTA card | N/A | CTA opens upgrade popup |
| **AI Scribe** | "For Mantra Provider" locked item removed → replaced with CTA button inside Show More | Messages, Appointments, Billing: lock removed, click opens upgrade popup | CTA + all locked items open upgrade popup |

**Popup CTA "Manage Plans"** → navigates to `/settings/billing` with `{ state: { openAvailablePlans: true } }` which auto-opens and scrolls to the Available Plans section in `SettingsBilling.tsx`.

---

## NEW IMPORTS NEEDED IN Layout.tsx

Verify these are present, add if missing:
```tsx
import { ..., Crown, UserPlus, Megaphone, Gift, ChevronRight } from "lucide-react";
```
`ChevronRight` is already imported. `Crown`, `UserPlus`, `Megaphone`, `Gift` are already in the file from the Grow dropdown links — they remain available after that section is removed only in Full EHR; keep the imports.