Here is a detailed, precise implementation prompt for your developer to apply all fixes across the three files:

---

## Implementation Prompt: Onboarding → Sidebar + Dashboard Personalization Fix

### Context
Three files need changes: `OnboardingEHRAIScribe.tsx`, `Layout.tsx`, `Dashboard.tsx`. Two bugs to fix:
1. Sidebar items selected in onboarding (AI Transcriber, Session Notes, Prescriptions) never appear because stale localStorage order arrays are missing these keys
2. Quick Access dashboard cards (Profile, Availability, Marketing, Premium, Refer & Earn) always show regardless of onboarding choices because they have no sidebar key mapping

The fix introduces a clean two-key architecture:
- `sidebar_hidden_items` — controls sidebar nav visibility
- `dashboard_hidden_cards` — controls Quick Access grid visibility (new key, written by onboarding)

---

### FILE 1: `OnboardingEHRAIScribe.tsx`

**Change 1 — Add `purposeToCardIds` mapping.** Place this constant directly above the `alwaysVisible` set that already exists in the file:

```ts
const purposeToCardIds: Record<string, string[]> = {
  "Patient Management":              ["clients"],
  "Appointment Scheduling":          ["appointments"],
  "Billing & Invoicing":             ["billing"],
  "AI Session Transcription":        ["ai-transcriber"],
  "Session Notes (SOAP/DAP/BIRP)":   ["session-notes"],
  "Prescription Management":         ["prescriptions"],
};

const alwaysVisibleCards = new Set(["clients", "profile", "availability"]);

const allDashboardCardIds = [
  'clients', 'leads', 'appointments', 'profile', 'billing',
  'availability', 'ai-transcriber', 'session-notes', 'prescriptions',
  'marketing', 'premium', 'refer'
];
```

**Change 2 — Extend `handleGetStarted`.** Find the existing `handleGetStarted` function. After the existing sidebar hidden logic block (the block ending with `localStorage.setItem("sidebar_hidden_items", ...)`), and before the `setPlanMode` call, insert this new block:

```ts
// ── Dashboard card personalization ──────────────────────────────
if (selectAll) {
  // User wants everything — clear any previously saved hidden cards
  localStorage.removeItem("dashboard_hidden_cards");
} else if (selectedPurposes.size > 0) {
  // Build the set of card IDs the user explicitly selected
  const selectedCardIds = new Set<string>();
  purposes.forEach(p => {
    if (selectedPurposes.has(p.label)) {
      const cards = purposeToCardIds[p.label];
      if (cards) cards.forEach(c => selectedCardIds.add(c));
    }
  });

  // Profile and Availability are always visible regardless of selection
  alwaysVisibleCards.forEach(id => selectedCardIds.add(id));

  // Cards with no corresponding purpose (leads, marketing, premium, refer)
  // are hidden unless the user ticked "Everything"
  const cardsToHide = allDashboardCardIds.filter(id => !selectedCardIds.has(id));

  if (cardsToHide.length > 0) {
    localStorage.setItem("dashboard_hidden_cards", JSON.stringify(cardsToHide));
  } else {
    localStorage.removeItem("dashboard_hidden_cards");
  }
} else {
  // User selected nothing — show all cards (default full access)
  localStorage.removeItem("dashboard_hidden_cards");
}
// ────────────────────────────────────────────────────────────────
```

No other changes needed in this file.

---

### FILE 2: `Layout.tsx`

**Change 1 — Add `mergeOrderWithDefaults` helper.** Place this function immediately before the `Layout` component export declaration (before `export function Layout()`):

```ts
function mergeOrderWithDefaults(saved: string[] | null, defaults: string[]): string[] {
  if (!saved) return defaults;
  const missing = defaults.filter(k => !saved.includes(k));
  if (missing.length === 0) return saved;
  // Insert missing keys before 'refer-earn' so they land in a sensible position
  const insertBefore = 'refer-earn';
  const idx = saved.indexOf(insertBefore);
  const result = [...saved];
  result.splice(idx === -1 ? result.length - 1 : idx, 0, ...missing);
  return result;
}
```

**Change 2 — Fix `ehrItemOrder` initializer.** Find this exact code:

```ts
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null') ?? defaultEHROrder
);
```

Replace it with:

```ts
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(() => {
  const saved = JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null');
  return mergeOrderWithDefaults(saved, defaultEHROrder);
});
```

**Change 3 — Fix `providerItemOrder` initializer.** Find this exact code:

```ts
const [providerItemOrder, setProviderItemOrder] = useState<string[]>(
  () => JSON.parse(localStorage.getItem('sidebar_provider_order') || 'null') ?? defaultProviderOrder
);
```

Replace it with:

```ts
const [providerItemOrder, setProviderItemOrder] = useState<string[]>(() => {
  const saved = JSON.parse(localStorage.getItem('sidebar_provider_order') || 'null');
  return mergeOrderWithDefaults(saved, defaultProviderOrder);
});
```

No other changes needed in this file. The `defaultEHROrder` and `defaultProviderOrder` arrays already contain `ai-transcriber`, `session-notes`, `prescriptions` from the previous fix round — confirm they read exactly:

```ts
const defaultEHROrder = ['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'tools', 'refer-earn', 'settings'];
const defaultProviderOrder = ['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'tools', 'for-mantra-provider', 'refer-earn', 'settings'];
```

If they are missing those three keys, add them now before the `tools` entry.

---

### FILE 3: `Dashboard.tsx`

**Change 1 — Remove `sidebarKeyToCardId`.** Delete this entire block:

```ts
const sidebarKeyToCardId: Record<string, string> = {
  'clients': 'clients',
  'appointments': 'appointments',
  'billing': 'billing',
  'ai-transcriber': 'ai-transcriber',
  'session-notes': 'session-notes',
  'prescriptions': 'prescriptions',
};
```

**Change 2 — Replace `visibleCards` initializer.** Find this block:

```ts
const [visibleCards, setVisibleCards] = useState<string[]>(() => {
  const hidden: string[] = JSON.parse(localStorage.getItem('sidebar_hidden_items') || '[]');
  const hiddenCardIds = new Set(hidden.map(key => sidebarKeyToCardId[key]).filter(Boolean));
  return cardOptions.map(c => c.id).filter(id => !hiddenCardIds.has(id));
});
```

Replace it with:

```ts
const [visibleCards, setVisibleCards] = useState<string[]>(() => {
  const hiddenCards: string[] = JSON.parse(
    localStorage.getItem('dashboard_hidden_cards') || '[]'
  );
  const hiddenSet = new Set(hiddenCards);
  return cardOptions.map(c => c.id).filter(id => !hiddenSet.has(id));
});
```

No other changes needed in this file. The `cardOptions` array and all twelve grid card JSX blocks are already correct from the previous round.

---

### Verification checklist after applying

| Scenario | Expected sidebar | Expected Quick Access |
|---|---|---|
| User selects only "AI Session Transcription" + "Session Notes" | AI Transcriber + Session Notes visible in main nav. Billing, Appointments, Messages, Prescriptions in Show More as "tap to show" | AI Transcriber + Session Notes cards visible. Clients + Profile + Availability also visible (always-on). Leads, Appointments, Billing, Prescriptions, Marketing, Premium, Refer & Earn hidden |
| User ticks "Everything sounds useful" | All items visible in sidebar | All 12 cards visible |
| User selects nothing and clicks Get Started | Full default sidebar | All 12 cards visible |
| Existing user whose localStorage has old order without new keys | New keys (ai-transcriber, session-notes, prescriptions) auto-inserted before refer-earn | Reads from dashboard_hidden_cards, unaffected by sidebar migration |