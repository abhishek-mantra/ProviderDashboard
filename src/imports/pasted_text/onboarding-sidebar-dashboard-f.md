Looking at your code, I need to understand the full data flow before writing the fix prompt.

**The core issue:**

1. `OnboardingEHRAIScribe.tsx` saves hidden sidebar items to `localStorage` (`sidebar_hidden_items`) but the mapping between purpose labels and sidebar keys is only partial
2. The sidebar's "Show More" section hardcodes AI Transcriber, Session Notes, Prescriptions instead of reading from the user's choices
3. The Dashboard's Quick Access grid has no cards for AI Transcriber, Session Notes, or Prescriptions, and doesn't filter based on onboarding selections

Here's the detailed, precise prompt to fix everything:

---

## Fix Prompt

### Context
The app has three files to modify: `OnboardingEHRAIScribe.tsx`, `Layout.tsx` (sidebar), and `Dashboard.tsx`. User feature selections during onboarding must drive both what appears in the sidebar main nav and what Quick Access cards appear on the dashboard.

---

### Problem 1 — Onboarding → Sidebar key mapping is incomplete

In `OnboardingEHRAIScribe.tsx`, the `purposes` array maps labels to `sidebarKey` values. Currently `ai-transcriber`, `session-notes`, and `prescriptions` are missing from this array entirely. Add them:

```ts
const purposes: { label: string; sidebarKey: string | null }[] = [
  { label: "Patient Management",          sidebarKey: "clients" },
  { label: "Appointment Scheduling",      sidebarKey: "appointments" },
  { label: "Billing & Invoicing",         sidebarKey: "billing" },
  { label: "Secure Messaging",            sidebarKey: "messages" },
  { label: "AI Session Transcription",    sidebarKey: "ai-transcriber" },
  { label: "Session Notes (SOAP/DAP/BIRP)", sidebarKey: "session-notes" },
  { label: "Prescription Management",     sidebarKey: "prescriptions" },
  { label: "Insurance & Claims",          sidebarKey: null },
];
```

The existing `handleGetStarted` logic already writes un-selected keys to `sidebar_hidden_items`. This will now correctly hide/show `ai-transcriber`, `session-notes`, and `prescriptions` based on user choice. No other change needed in this file.

**One edge case to preserve:** for `signupMode === "ai-scribe"`, the `transcriberProtectedKeys` set (`ai-transcriber`, `session-notes`, `prescriptions`) already prevents those from being hidden. Keep that logic unchanged.

---

### Problem 2 — Sidebar "Show More" hardcodes AI Transcriber / Session Notes / Prescriptions

In `Layout.tsx`, inside the `{isShowMoreExpanded && ...}` block, there is this static section:

```tsx
{/* Static extras for EHR and Provider mode */}
{(isProviderPlan || (!isTranscriberOnly && !isProviderPlan)) && (
  [
    { to: '/ai-transcriber', icon: <Mic .../>, label: 'AI Transcriber' },
    { to: '/session-notes',  icon: <StickyNote .../>, label: 'Session Notes' },
    { to: '/prescriptions',  icon: <Pill .../>, label: 'Prescriptions' },
  ]
  .filter(item => !visibleItems(order).some(k => k === item.to.replace('/', '')))
  .map(...)
)}
```

**Remove this entire static block.** It is now redundant because:
- If the user selected these features in onboarding, the keys will NOT be in `sidebar_hidden_items`, so they appear in the main nav already
- If the user did NOT select them, they are in `sidebar_hidden_items` and will already appear under "Show More" via the existing `hiddenFromOrder(order)` map (the "tap to show" restore mechanism)

This makes the Show More section fully dynamic — it only shows items the user personally hid, nothing hardcoded.

---

### Problem 3 — EHR sidebar item order doesn't include ai-transcriber / session-notes / prescriptions

In `Layout.tsx`, `defaultEHROrder` and `defaultProviderOrder` do not contain `ai-transcriber`, `session-notes`, or `prescriptions`. These keys need to exist in the order arrays so drag-and-drop and hide/show works for them. Update:

```ts
const defaultEHROrder = [
  'home', 'clients', 'billing', 'messages', 'appointments',
  'ai-transcriber', 'session-notes', 'prescriptions',
  'tools', 'refer-earn', 'settings'
];

const defaultProviderOrder = [
  'home', 'clients', 'billing', 'messages', 'appointments',
  'ai-transcriber', 'session-notes', 'prescriptions',
  'tools', 'for-mantra-provider', 'refer-earn', 'settings'
];
```

Then add renderers for these three keys inside `renderEHRItem`:

```ts
case 'ai-transcriber':
  return renderNavItem("/ai-transcriber", <Mic className="size-5 flex-shrink-0" />, "AI Transcriber");
case 'session-notes':
  return renderNavItem("/session-notes", <StickyNote className="size-5 flex-shrink-0" />, "Session Notes");
case 'prescriptions':
  return renderNavItem("/prescriptions", <Pill className="size-5 flex-shrink-0" />, "Prescriptions");
```

These items will be hidden on first render for users who didn't select them (because `handleGetStarted` wrote them to `sidebar_hidden_items`). Users who selected them will see them in the main nav. Select-all users see everything.

---

### Problem 4 — Dashboard Quick Access has no cards for AI Transcriber, Session Notes, Prescriptions

In `Dashboard.tsx`, the `cardOptions` array and the grid below it need three new entries.

**Step A — Add to cardOptions:**

```ts
const cardOptions = [
  { id: 'clients',        label: 'Clients' },
  { id: 'leads',          label: 'Client Leads' },
  { id: 'appointments',   label: 'Appointments' },
  { id: 'profile',        label: 'Profile' },
  { id: 'billing',        label: 'Billing' },
  { id: 'availability',   label: 'Availability' },
  { id: 'ai-transcriber', label: 'AI Transcriber' },   // NEW
  { id: 'session-notes',  label: 'Session Notes' },     // NEW
  { id: 'prescriptions',  label: 'Prescriptions' },     // NEW
  { id: 'marketing',      label: 'Marketing' },
  { id: 'premium',        label: 'Premium' },
  { id: 'refer',          label: 'Refer & Earn' },
];
```

**Step B — Initialize `visibleCards` from onboarding choices instead of showing all:**

Replace the current hardcoded `useState`:

```ts
// BEFORE
const [visibleCards, setVisibleCards] = useState<string[]>(
  cardOptions.map(card => card.id)
);
```

With a lazy initializer that reads `sidebar_hidden_items` and removes the corresponding cards:

```ts
// sidebarKey → cardId mapping (only entries that differ or need mapping)
const sidebarKeyToCardId: Record<string, string> = {
  'clients':        'clients',
  'appointments':   'appointments',
  'billing':        'billing',
  'messages':       'messages',        // no card, safe to ignore
  'ai-transcriber': 'ai-transcriber',
  'session-notes':  'session-notes',
  'prescriptions':  'prescriptions',
};

const [visibleCards, setVisibleCards] = useState<string[]>(() => {
  const hidden: string[] = JSON.parse(
    localStorage.getItem('sidebar_hidden_items') || '[]'
  );
  const hiddenCardIds = new Set(
    hidden.map(key => sidebarKeyToCardId[key]).filter(Boolean)
  );
  return cardOptions
    .map(c => c.id)
    .filter(id => !hiddenCardIds.has(id));
});
```

This means: if the user didn't select "AI Session Transcription" in onboarding, `ai-transcriber` is in `sidebar_hidden_items`, so the AI Transcriber card is hidden from Quick Access by default. If they selected it, the card is visible. Select-all keeps everything visible.

**Step C — Add the three new grid cards** inside the Quick Access grid (the `{!isTranscriberOnly && ...}` section), after the Availability card and before the Marketing card:

```tsx
{visibleCards.includes('ai-transcriber') && (
  <Link to="/ai-transcriber">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-cyan-200 dark:hover:border-cyan-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-[#00c0ff] to-[#0099cc] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-400/25 flex-shrink-0">
          <Mic className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">AI Transcriber</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">Record & transcribe sessions</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}

{visibleCards.includes('session-notes') && (
  <Link to="/session-notes">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25 flex-shrink-0">
          <StickyNote className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">Session Notes</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">SOAP, DAP & BIRP notes</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}

{visibleCards.includes('prescriptions') && (
  <Link to="/prescriptions">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-400/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/25 flex-shrink-0">
          <Pill className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">Prescriptions</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">Manage prescriptions</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}
```

Make sure `StickyNote` and `Pill` are added to the `Dashboard.tsx` import from `lucide-react` if not already present. `Mic` is already imported.

---

### Summary of what changes where

| File | Change |
|---|---|
| `OnboardingEHRAIScribe.tsx` | Add `ai-transcriber`, `session-notes`, `prescriptions` sidebarKeys to `purposes` array |
| `Layout.tsx` | Add these 3 keys to `defaultEHROrder` and `defaultProviderOrder`; add their `case` blocks in `renderEHRItem`; delete the hardcoded static extras block in Show More |
| `Dashboard.tsx` | Add 3 entries to `cardOptions`; change `visibleCards` initializer to read from `sidebar_hidden_items`; add 3 new grid card JSX blocks |

No changes to `PlanModeContext` or the transcriber-only flow are needed — those already work correctly.