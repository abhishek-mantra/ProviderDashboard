## Implementation Brief: EHR Quick Access Personalization, Sidebar Visibility & Configure Menu Enhancements

---

### CONTEXT

Files in scope: `Dashboard.tsx`, `Layout.tsx`, `OnboardingEHRAIScribe.tsx`. The app uses React + TypeScript + Tailwind CSS + lucide-react. Plan modes: `"full-ehr" | "transcriber-only" | "provider"`. localStorage keys: `sidebar_hidden_items`, `sidebar_ehr_order`, `onboarding_selected_purposes`.

---

### CHANGE 1 — Persist Selected Purposes from Onboarding for Dashboard Use

In `OnboardingEHRAIScribe.tsx`, before calling `navigate("/")`, save the selected purpose sidebar keys to localStorage so `Dashboard.tsx` can read them:

In `handleGetStarted`, after the hidden items logic and before `navigate("/")`, add:

```typescript
// Persist selected sidebar keys for dashboard quick access personalization
const selectedSidebarKeys = new Set<string>();
purposes.forEach(p => {
  if (p.sidebarKey && selectedPurposes.has(p.label)) {
    selectedSidebarKeys.add(p.sidebarKey);
  }
});
if (selectedPurposes.size > 0) {
  localStorage.setItem("onboarding_selected_purposes", JSON.stringify(Array.from(selectedSidebarKeys)));
} else {
  // No selection = full access, clear any prior personalization
  localStorage.removeItem("onboarding_selected_purposes");
}
```

---

### CHANGE 2 — Quick Access Cards Driven by Onboarding Selection (EHR mode only)

In `Dashboard.tsx`, the `visibleCards` state currently initializes with all card IDs. Change this so that in `full-ehr` mode the initial value is derived from `onboarding_selected_purposes` in localStorage. If no saved selection exists (user skipped), fall back to all cards visible.

**Step 1:** Add a helper to compute the initial visible cards, placed above the `Dashboard` component function:

```typescript
const purposeKeyToCardId: Record<string, string> = {
  'clients':        'clients',
  'appointments':   'appointments',
  'billing':        'billing',
  'messages':       'messages',        // no card exists currently — skip
  'ai-transcriber': 'ai-transcriber',  // new card — add below
  'session-notes':  'session-notes',   // new card — add below
  'prescriptions':  'prescriptions',   // new card — add below
};

function getInitialVisibleCards(planMode: string, allCardIds: string[]): string[] {
  if (planMode !== "full-ehr") return allCardIds;
  const saved = localStorage.getItem("onboarding_selected_purposes");
  if (!saved) return allCardIds; // no selection = show all
  const selectedKeys: string[] = JSON.parse(saved);
  // Map purpose sidebar keys → card IDs, then include always-visible base cards
  const alwaysShowCards = new Set(['profile', 'availability', 'refer', 'marketing', 'premium']);
  const purposeCards = new Set(selectedKeys.map(k => purposeKeyToCardId[k]).filter(Boolean));
  return allCardIds.filter(id => alwaysShowCards.has(id) || purposeCards.has(id));
}
```

**Step 2:** Update `cardOptions` to include the three new cards:

```typescript
const cardOptions = [
  { id: 'clients',        label: 'Clients' },
  { id: 'leads',          label: 'Client Leads' },
  { id: 'appointments',   label: 'Appointments' },
  { id: 'ai-transcriber', label: 'AI Transcriber' },
  { id: 'session-notes',  label: 'Session Notes' },
  { id: 'prescriptions',  label: 'Prescriptions' },
  { id: 'profile',        label: 'Profile' },
  { id: 'billing',        label: 'Billing' },
  { id: 'availability',   label: 'Availability' },
  { id: 'marketing',      label: 'Marketing' },
  { id: 'premium',        label: 'Premium' },
  { id: 'refer',          label: 'Refer & Earn' },
];
```

**Step 3:** Change the `visibleCards` initial state:

```typescript
// BEFORE:
const [visibleCards, setVisibleCards] = useState<string[]>(
  cardOptions.map(card => card.id)
);

// AFTER:
const [visibleCards, setVisibleCards] = useState<string[]>(
  () => getInitialVisibleCards(planMode, cardOptions.map(c => c.id))
);
```

**Step 4:** Add the three new quick access cards to the grid JSX, placed after the existing `appointments` card. Each follows the exact same pattern as existing cards:

```tsx
{/* AI Transcriber card */}
{visibleCards.includes('ai-transcriber') && (
  <Link to="/ai-transcriber">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-cyan-200 dark:hover:border-cyan-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-400/25 flex-shrink-0">
          <Mic className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold md:font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">AI Transcriber</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">Record & transcribe sessions</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}

{/* Session Notes card */}
{visibleCards.includes('session-notes') && (
  <Link to="/session-notes">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/25 flex-shrink-0">
          <StickyNote className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold md:font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">Session Notes</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">SOAP, DAP & BIRP notes</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}

{/* Prescriptions card */}
{visibleCards.includes('prescriptions') && (
  <Link to="/prescriptions">
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-750 rounded-2xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-700 transition-all cursor-pointer overflow-hidden min-h-[110px] md:min-h-0"
    >
      <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full -mr-10 -mt-10 md:-mr-12 md:-mt-12" />
      <div className="relative flex flex-col md:flex-row items-center md:items-center gap-2.5 md:gap-4">
        <div className="size-12 md:size-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/25 flex-shrink-0">
          <Pill className="size-6 md:size-7 text-white" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="text-[13px] md:text-base font-bold md:font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">Prescriptions</h3>
          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight px-1 md:px-0">Manage prescriptions</p>
        </div>
      </div>
    </motion.div>
  </Link>
)}
```

Add `StickyNote` to the import from `lucide-react` at the top of `Dashboard.tsx`.

---

### CHANGE 3 — EHR Sidebar: AI Transcriber, Session Notes, Prescriptions in Main Nav When Selected

In `Layout.tsx`, the EHR sidebar currently shows these three only in the Show More dropdown as static extras. They need to appear in the main nav when selected during onboarding.

**Step 1:** Add a helper to read selected purposes at the top of the `Layout` component function body (after existing state declarations):

```typescript
const onboardingSelectedKeys: string[] = (() => {
  try {
    return JSON.parse(localStorage.getItem("onboarding_selected_purposes") || "[]");
  } catch { return []; }
})();

const ehrShowInMainNav = new Set(onboardingSelectedKeys);
```

**Step 2:** Update `defaultEHROrder` to conditionally include the three tool keys based on onboarding selection. Change the static declaration to a computed value:

```typescript
// BEFORE:
const defaultEHROrder = ['home', 'clients', 'billing', 'messages', 'appointments', 'tools', 'refer-earn', 'settings'];

// AFTER:
const defaultEHROrder = [
  'home',
  'clients',
  ...(onboardingSelectedKeys.includes('billing') ? ['billing'] : []),
  ...(onboardingSelectedKeys.includes('messages') ? ['messages'] : []),
  ...(onboardingSelectedKeys.includes('appointments') ? ['appointments'] : []),
  ...(onboardingSelectedKeys.includes('ai-transcriber') ? ['ai-transcriber'] : []),
  ...(onboardingSelectedKeys.includes('session-notes') ? ['session-notes'] : []),
  ...(onboardingSelectedKeys.includes('prescriptions') ? ['prescriptions'] : []),
  'tools',
  'refer-earn',
  'settings',
].filter((v, i, a) => a.indexOf(v) === i); // deduplicate
// If no onboarding selection was made, fall back to full default:
// (onboardingSelectedKeys.length === 0 means all features, use full list)
const effectiveEHROrder = onboardingSelectedKeys.length === 0
  ? ['home', 'clients', 'billing', 'messages', 'appointments', 'tools', 'refer-earn', 'settings']
  : defaultEHROrder;
```

Then replace all references to `defaultEHROrder` in the `ehrItemOrder` useState initializer with `effectiveEHROrder`:

```typescript
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null') ?? effectiveEHROrder
);
```

**Step 3:** Add renderers for the three new EHR nav keys in `renderEHRItem`. Add these three cases to the switch statement:

```typescript
case 'ai-transcriber':
  return renderNavItem("/ai-transcriber", <Mic className="size-5 flex-shrink-0" />, "AI Transcriber");
case 'session-notes':
  return renderNavItem("/session-notes", <StickyNote className="size-5 flex-shrink-0" />, "Session Notes");
case 'prescriptions':
  return renderNavItem("/prescriptions", <Pill className="size-5 flex-shrink-0" />, "Prescriptions");
```

**Step 4:** In the unified Show More block, update the static extras filter to exclude items already in the main nav order (not just `visibleItems`):

```typescript
// BEFORE:
.filter(item => !visibleItems(order).some(k => k === item.to.replace('/', '')))

// AFTER:
.filter(item => {
  const key = item.to.replace('/', '');
  return !order.includes(key); // if in order at all (visible or hidden), don't duplicate in Show More
})
```

---

### CHANGE 4 — Configure Menu: Show More Items Promotable to Main Nav

Currently, the Show More dropdown items (both user-hidden items and static extras) are only navigable links — they can't be moved to the main nav. Add a "+" button next to each Show More item that restores it to the main nav order.

In the unified Show More block in `Layout.tsx`, for **user-hidden items** (the `hiddenFromOrder(order).map(...)` section), replace the current button with one that includes both a "tap to show" label and a `+` promote button:

```tsx
{hiddenFromOrder(order).map(key => {
  const meta = navItemMeta[key];
  if (!meta) return null;
  return (
    <div key={key} className="flex items-center gap-1">
      <button
        onClick={() => toggleHideItem(key)}
        className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <div className="flex items-center">
          {meta.icon}
          <span className="ml-3 text-sm">{meta.label}</span>
        </div>
        <span className="text-[10px] font-medium text-gray-400">tap to show</span>
      </button>
    </div>
  );
})}
```

This behavior is already correct — clicking the button calls `toggleHideItem` which removes the key from `hiddenItems` and moves it back into the visible main nav. No additional changes needed for this path; the existing `toggleHideItem` already handles promotion back to main nav since `visibleItems(order)` simply re-includes it.

For **static extras** (AI Transcriber, Session Notes, Prescriptions in EHR/Provider Show More), add a `+` button that pushes the item's key into the order array so it becomes a permanent main nav item:

```tsx
.map(({ to, icon, label }) => {
  const key = to.replace('/', '');
  return (
    <div key={to} className="flex items-center gap-1">
      <Link
        to={to}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex-1 flex items-center px-3 py-2 rounded-lg transition-all ${
          isActive(to)
            ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        {icon}
        <span className="ml-3 text-sm font-medium">{label}</span>
      </Link>
      {/* Promote to main nav button */}
      <button
        onClick={() => {
          const setter = isProviderPlan ? setProviderItemOrder : setEHRItemOrder;
          const currentOrder = isProviderPlan ? providerItemOrder : ehrItemOrder;
          if (!currentOrder.includes(key)) {
            // Insert before 'refer-earn' for a sensible default position
            const insertIdx = currentOrder.indexOf('refer-earn');
            const newOrder = [...currentOrder];
            newOrder.splice(insertIdx === -1 ? newOrder.length - 1 : insertIdx, 0, key);
            setter(newOrder);
          }
        }}
        className="size-6 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-[#00c0ff]/10 hover:text-[#00c0ff] text-gray-400 transition-colors flex-shrink-0"
        title={`Add ${label} to main menu`}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
})
```

Add `Plus` to the lucide-react imports in `Layout.tsx` if not already present (it is already imported per the existing code).

---

### CHANGE 5 — Fix Resources Route to `/other-tools`

In `Layout.tsx`, inside `renderToolsSection`, the Resources sub-item links to `/tools`. Change it to `/other-tools`:

```tsx
// BEFORE:
{ to: "/tools", icon: <Wrench className="size-5 flex-shrink-0" />, label: "Resources" },

// AFTER:
{ to: "/other-tools", icon: <Wrench className="size-5 flex-shrink-0" />, label: "Resources" },
```

Also update the `isActive` check in the `renderToolsSection` button's className — the parent Tools button highlights when any child is active:

```tsx
// BEFORE:
isActive("/tools") || isActive("/tasks") || isActive("/ai-crm")

// AFTER:
isActive("/other-tools") || isActive("/tasks") || isActive("/ai-crm")
```

---

### CHANGE 6 — AI Scribe: Other Tools as Expandable Dropdown with Popup Gating

In `Layout.tsx`, in the unified Show More block, inside the `{isTranscriberOnly && (...)}` section, replace the plain `<Link to="/tools">` Other Tools link with a collapsible dropdown. Add state at the top of the Layout component:

```typescript
const [isOtherToolsExpanded, setIsOtherToolsExpanded] = useState(false);
```

Then replace:

```tsx
<Link to="/tools" onClick={() => setIsMobileMenuOpen(false)}
  className={`flex items-center px-3 py-2 rounded-lg transition-all ${isActive("/tools") ? "..." : "..."}`}
>
  <Wrench className="size-5 flex-shrink-0 text-gray-500" />
  <span className="ml-3 text-sm font-medium">Other Tools</span>
</Link>
```

With:

```tsx
<div>
  <button
    onClick={() => setIsOtherToolsExpanded(!isOtherToolsExpanded)}
    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
  >
    <div className="flex items-center">
      <Wrench className="size-5 flex-shrink-0" />
      <span className="ml-3 text-sm font-medium">Other Tools</span>
    </div>
    <ChevronDown className={`size-4 transition-transform duration-200 ${isOtherToolsExpanded ? 'rotate-180' : ''}`} />
  </button>

  {isOtherToolsExpanded && (
    <div className="mt-0.5 space-y-0.5 ml-2">
      {/* Resources → /other-tools, no gating */}
      <Link
        to="/other-tools"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center px-3 py-2 rounded-lg transition-all pl-8 ${
          isActive("/other-tools")
            ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        <Wrench className="size-5 flex-shrink-0" />
        <span className="ml-3 text-sm font-medium">Resources</span>
      </Link>

      {/* Tasks and AI CRM → popup gated */}
      {[
        { icon: <CheckSquare className="size-5 flex-shrink-0" />, label: "Tasks" },
        { icon: <Brain className="size-5 flex-shrink-0" />, label: "AI CRM" },
      ].map(({ icon, label }) => (
        <button
          key={label}
          onClick={() => setShowPremiumUpgradePopup(true)}
          className="w-full flex items-center px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 pl-8"
        >
          {icon}
          <span className="ml-3 text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  )}
</div>
```

---

### SUMMARY OF CHANGES

| File | Change |
|---|---|
| `OnboardingEHRAIScribe.tsx` | In `handleGetStarted`, write `onboarding_selected_purposes` array to localStorage before navigating |
| `Dashboard.tsx` | Add `purposeKeyToCardId` map and `getInitialVisibleCards` helper; add `ai-transcriber`, `session-notes`, `prescriptions` to `cardOptions`; initialize `visibleCards` from localStorage; add three new quick access card JSX blocks; add `StickyNote` import |
| `Layout.tsx` | Read `onboarding_selected_purposes` to compute `effectiveEHROrder`; add `ai-transcriber`, `session-notes`, `prescriptions` cases to `renderEHRItem`; filter Show More static extras to exclude keys already in order; add `+` promote button to static Show More items; fix Resources route to `/other-tools`; add `isOtherToolsExpanded` state; replace plain Other Tools link in transcriber Show More with collapsible dropdown |