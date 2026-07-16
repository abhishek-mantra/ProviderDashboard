Looking at the code carefully, I can see the exact bug. In `handleGetStarted`, the `else if (selectedPurposes.size > 0)` branch does this:

```ts
const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
const merged = Array.from(new Set([...existing, ...toHide]));
```

**The bug:** It merges with `existing` hidden items, but if the user previously had items hidden from a prior onboarding session, those old hidden items persist and override the new selections. More critically, the `ehrOptInKeys` are always added to `toHide` unless explicitly selected — but when the user DOES select them, they still get blocked because `ehrOptInKeys.filter(k => !selectedSidebarKeys.has(k))` correctly excludes them. So that part is fine.

**The real bug** is actually in `Layout.tsx`. Look at this new code that was added:

```ts
const providerForcedHidden = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);
const itemsToRender = isTranscriberOnly
  ? order.filter(...)
  : isProviderPlan
    ? order.filter(k => !hiddenItems.includes(k) && !providerForcedHidden.has(k))
    : visibleItems(order);
```

**`providerForcedHidden` is hardcoded to always hide those three keys in EHR mode too** — because `isProviderPlan` is false in EHR mode, so it falls through to `visibleItems(order)` which correctly reads `hiddenItems`. But the `effectiveHiddenFromOrder` function used in Show More DOES include `providerForcedHidden` which corrupts the Show More display.

Wait — re-reading more carefully, the actual issue is simpler: **`localStorage.removeItem("sidebar_hidden_items")` is never called before writing new hidden items** when the user re-onboards. The `merged` strategy accumulates old hidden items on top of new ones. If the user previously hid `billing` and now selects Billing, `billing` is NOT in `toHide`, but it's still in `existing`, so it stays hidden.

Here is the precise fix prompt:

---

## Fix Prompt: EHR Onboarding Selections Not Showing in Sidebar

### Root cause

In `OnboardingEHRAIScribe.tsx`, the `handleGetStarted` function merges new hidden items with **existing** `sidebar_hidden_items` from localStorage:

```ts
const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
const merged = Array.from(new Set([...existing, ...toHide]));
```

This is wrong. If the user previously completed onboarding with different selections, the old hidden items persist and block newly selected features from appearing. The fix is to **always write a fresh list** — never merge with existing. The onboarding is the source of truth; it should overwrite completely.

**Second bug:** In `Layout.tsx`, the `effectiveHiddenFromOrder` function was added that includes `providerForcedHidden` keys in Show More even in EHR mode, which can cause those items to appear as "tap to show" when they shouldn't be. The `providerForcedHidden` set should only apply to actual provider plan mode.

---

### FILE 1: `OnboardingEHRAIScribe.tsx`

**In `handleGetStarted`, find the `else if (selectedPurposes.size > 0)` branch.** Replace the final write block — the part that merges with existing:

```ts
// REMOVE these three lines
const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
const merged = Array.from(new Set([...existing, ...toHide]));
localStorage.setItem("sidebar_hidden_items", JSON.stringify(merged));
```

Replace with a clean overwrite:

```ts
// REPLACE with this single line — always overwrite, never merge
localStorage.setItem("sidebar_hidden_items", JSON.stringify(toHide));
```

This ensures that every time the user goes through onboarding, the hidden items list is set fresh based purely on their current selections, with no contamination from previous sessions.

**Also clear stale order arrays** at the top of `handleGetStarted`, before any other localStorage writes. This forces the sidebar to use the updated `defaultEHROrder` which includes the new keys, eliminating the stale order bug:

```ts
const handleGetStarted = () => {
  // Always clear stale sidebar order so mergeOrderWithDefaults runs fresh
  localStorage.removeItem("sidebar_ehr_order");
  localStorage.removeItem("sidebar_provider_order");
  localStorage.removeItem("sidebar_transcriber_order");

  // ... rest of existing handleGetStarted logic unchanged
```

---

### FILE 2: `Layout.tsx`

**Fix `effectiveHiddenFromOrder`** — it currently includes `providerForcedHidden` items in Show More even for EHR mode. The function needs to be scoped correctly. Find this block inside the nav IIFE:

```ts
// REMOVE this entire effectiveHiddenFromOrder function definition
const effectiveHiddenFromOrder = (o: string[]) =>
  isProviderPlan
    ? o.filter(k => hiddenItems.includes(k) || providerForcedHidden.has(k))
    : hiddenFromOrder(o);
```

And in the Show More section, **replace `effectiveHiddenFromOrder(order)` with `hiddenFromOrder(order)`**:

```tsx
// BEFORE
{effectiveHiddenFromOrder(order)
  .filter(key => { ... })
  .map(key => { ... })
}

// AFTER
{hiddenFromOrder(order)
  .filter(key => { ... })
  .map(key => { ... })
}
```

**Also remove `providerForcedHidden`** entirely — it is causing more harm than good. The sidebar visibility for all modes should be driven purely by `hiddenItems` (which is written by onboarding) and `transciberForcedVisible` (which correctly pins the three keys for AI Scribe mode). Find and delete these two lines:

```ts
// DELETE both of these lines
const providerForcedHidden = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);

// And in itemsToRender, remove the isProviderPlan branch:
// BEFORE
const itemsToRender = isTranscriberOnly
  ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
  : isProviderPlan
    ? order.filter(k => !hiddenItems.includes(k) && !providerForcedHidden.has(k))
    : visibleItems(order);

// AFTER
const itemsToRender = isTranscriberOnly
  ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
  : visibleItems(order);
```

---

### Why this fully fixes it

After these changes the data flow is clean and unidirectional:

1. User selects features in onboarding → `handleGetStarted` writes a **fresh** `sidebar_hidden_items` array (no merging with stale data) and clears stale order arrays
2. `Layout.tsx` reads `hiddenItems` from localStorage on mount → `visibleItems(order)` filters the order array → only selected features appear in main nav
3. `hiddenFromOrder(order)` shows unselected features in Show More as "tap to show"
4. AI Scribe mode: `transciberForcedVisible` pins the three keys regardless of `hiddenItems`
5. No `providerForcedHidden` — Provider mode also reads purely from `hiddenItems` written by onboarding