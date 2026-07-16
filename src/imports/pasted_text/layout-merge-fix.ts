Looking at the screenshots carefully, I can see exactly what's happening:

**Image 2/4:** AI Transcriber appears in Show More section AND again as an active item AND again in Hidden — 3 copies.

**Image 3:** At the bottom of the configure list, AI Transcriber appears TWICE in the main nav area.

**Image 7:** After onboarding with "Appointment Scheduling + Billing & Invoicing" selected, the sidebar still shows ALL items (Home, Clients, Billing, Appointments, Messages, AI Transcriber, Session Notes, Prescriptions, Refer & Earn, Settings) — the onboarding selection has zero effect.

Let me trace the exact root causes in the updated code:

---

## ROOT CAUSE ANALYSIS

### Bug 1 — Duplicates in configure mode Show More

In the updated `Layout.tsx`, the configure-mode `showMoreConfigItems` builder for EHR mode does this:

```js
ehrShowMoreResidents.forEach(k => { ... showMoreConfigItems.push(...) });
userShowMoreEhr.forEach(k => { ... showMoreConfigItems.push(...) });
```

`ehrShowMoreResidents` is `new Set(['resources', 'ai-crm'])` — so those two only. But the **normal mode** Show More for EHR renders `userShowMoreEhr`, which after onboarding from `OnboardingEHRAIScribe` contains `['billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'resources', 'ai-crm']` (all unselected items). These items are ALSO still present in `ehrItemOrder` (because `mergeOrderWithDefaults` adds them back!). So they render in both main nav AND Show More.

### Bug 1b — `mergeOrderWithDefaults` undoes onboarding

This is the **real killer for Fix 2**. In `Layout.tsx`:

```js
const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(() => {
  const saved = JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null');
  return mergeOrderWithDefaults(saved, defaultEHROrder); // ← THIS ADDS BACK ALL MISSING KEYS
});
```

`defaultEHROrder` = `['home','clients','billing','messages','appointments','ai-transcriber','session-notes','prescriptions','refer-earn','settings']`

So even if onboarding writes `sidebar_ehr_order` as `['home','clients','appointments','refer-earn','settings']`, on load `mergeOrderWithDefaults` sees `billing`, `messages`, etc. are "missing" and inserts them back before `refer-earn`. The saved onboarding personalization is **completely overwritten on every load**.

### Bug 1c — Duplicate in configure main nav (Image 3)

When an item is in `userShowMoreEhr` AND also got re-inserted into `ehrItemOrder` by `mergeOrderWithDefaults`, it renders in `itemsToRender` (main nav) AND the configure Show More loop adds it again from `userShowMoreEhr`.

---

## THE PRECISE FIX PROMPTS

---

### FIX A — Stop `mergeOrderWithDefaults` from re-injecting Show More items into the order array

**Prompt:**

> In `Layout.tsx`, the `mergeOrderWithDefaults` function blindly inserts any key from `defaults` that's missing from `saved` back into the order array. This breaks onboarding personalization because items the user intentionally moved to Show More (stored in `sidebar_user_show_more_ehr` / `sidebar_user_show_more_transcriber`) get re-added to the main nav order on every page load.
>
> Fix: Change `mergeOrderWithDefaults` to accept a third parameter `showMoreKeys: string[]` and skip inserting any key that exists in `showMoreKeys`:
>
> ```ts
> function mergeOrderWithDefaults(
>   saved: string[] | null,
>   defaults: string[],
>   showMoreKeys: string[] = []
> ): string[] {
>   if (!saved) return defaults.filter(k => !showMoreKeys.includes(k));
>   const showMoreSet = new Set(showMoreKeys);
>   const missing = defaults.filter(k => !saved.includes(k) && !showMoreSet.has(k));
>   if (missing.length === 0) return saved;
>   const insertBefore = 'refer-earn';
>   const idx = saved.indexOf(insertBefore);
>   const result = [...saved];
>   result.splice(idx === -1 ? result.length - 1 : idx, 0, ...missing);
>   return result;
> }
> ```
>
> Then update the two `useState` calls that use it to pass the corresponding Show More list:
>
> ```ts
> const [ehrItemOrder, setEHRItemOrder] = useState<string[]>(() => {
>   const saved = JSON.parse(localStorage.getItem('sidebar_ehr_order') || 'null');
>   const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_ehr') || '[]');
>   return mergeOrderWithDefaults(saved, defaultEHROrder, showMore);
> });
>
> const [transcriberItemOrder, setTranscriberItemOrder] = useState<string[]>(() => {
>   const saved = JSON.parse(localStorage.getItem('sidebar_transcriber_order') || 'null');
>   const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_transcriber') || '[]');
>   return mergeOrderWithDefaults(saved, defaultTranscriberOrder, showMore);
> });
>
> const [providerItemOrder, setProviderItemOrder] = useState<string[]>(() => {
>   const saved = JSON.parse(localStorage.getItem('sidebar_provider_order') || 'null');
>   const showMore = JSON.parse(localStorage.getItem('sidebar_user_show_more_provider') || '[]');
>   return mergeOrderWithDefaults(saved, defaultProviderOrder, showMore);
> });
> ```
>
> This ensures that when onboarding writes `appointments` into `sidebar_user_show_more_ehr`, it will never be re-injected into `ehrItemOrder` by the merge function.

---

### FIX B — Onboarding must also remove Show More items from the order array it writes

**Prompt:**

> In `OnboardingEHRAIScribe.tsx`, `handleGetStarted` writes `sidebar_ehr_order` / `sidebar_transcriber_order` but the `filteredOrder` computation must explicitly exclude any key that is being placed into `toShowMore`. Currently the filter is `order.filter(k => toMainNav.has(k) || !allOptionalKeys.includes(k))` which is correct in intent but `allOptionalKeys` must include ALL keys that can go to Show More including `billing`, `messages`, `appointments`.
>
> Confirm `allOptionalKeys` is defined as:
> ```ts
> const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];
> // = ['clients','appointments','billing','messages','ai-transcriber','session-notes','prescriptions']
> // Note: 'clients' maps to EHR purpose but is always-visible, so it won't be in toShowMore
> ```
>
> The `toMainNav` set must ONLY contain `alwaysVisible` keys + `selectedSidebarKeys`. The `filteredOrder` must exclude any key in `toShowMore`. Double-check by replacing the filter with an explicit allowlist:
>
> ```ts
> const allowedInOrder = new Set([...alwaysVisible, ...selectedSidebarKeys]);
> const filteredOrder = (isAiScribe ? defaultTranscriberOrderKeys : defaultEHROrderKeys)
>   .filter(k => allowedInOrder.has(k));
> ```
>
> This guarantees only selected + always-visible items appear in the written order, and everything else goes to `sidebar_user_show_more_ehr` / `sidebar_user_show_more_transcriber`.

---

### FIX C — Configure mode Show More section must not show items already in main nav

**Prompt:**

> In `Layout.tsx` configure mode, the `showMoreConfigItems` builder for all three modes pushes items from the Show More resident sets and `userShowMore*` arrays without checking if those items already appear in `mainConfigKeys` (the visible main nav).
>
> For the **EHR mode** block, the existing guard `if (mainConfigKeys.includes(k)) return;` is already present in the updated code — verify it is present on BOTH the `ehrShowMoreResidents.forEach` loop AND the `userShowMoreEhr.forEach` loop.
>
> For the **Provider mode** block, verify the guard `if (mainConfigKeys.includes(k)) return;` is present on BOTH the `(['ai-transcriber','session-notes','prescriptions','resources','ai-crm']).forEach` loop AND the `userShowMoreProvider.forEach` loop.
>
> For the **Transcriber mode** block, verify the guard `if (mainConfigKeys.includes(k)) return;` is present on BOTH the `transcriberShowMoreResidents.forEach` loop AND the `userShowMoreTranscriber.forEach` loop.
>
> Also add a deduplication guard at the point of pushing: before `showMoreConfigItems.push({ key: k, type: 'opt-in' })`, check `if (showMoreConfigItems.some(item => item.key === k)) return;` to prevent any key from being added twice even across the two loops.

---

### FIX D — Normal mode Show More must not show items already rendered in main nav

**Prompt:**

> In `Layout.tsx` normal mode (non-configure), the Show More expanded section renders items from `userShowMoreEhr`, `userShowMoreTranscriber`, and `userShowMoreProvider`. These filters must ALL include a check that the key is not already in the current mode's visible main nav order. The updated code already adds `!ehrMainNavKeys.includes(k)` / `!providerMainNavKeys.includes(k)` / `!transcriberMainNavKeys.includes(k)` to each filter.
>
> Verify the exact filter for each mode reads like this (using EHR as example):
> ```ts
> const ehrMainNavKeys = visibleItems(ehrItemOrder);
> const ehrShowMoreKeys = [
>   ...(['resources', 'ai-crm'].filter(k =>
>     !hiddenItems.includes(k) &&
>     !showMorePromoted.includes(k) &&
>     !userShowMoreEhr.includes(k) &&
>     !ehrMainNavKeys.includes(k)   // ← must be present
>   )),
>   ...userShowMoreEhr.filter(k =>
>     !hiddenItems.includes(k) &&
>     !showMorePromoted.includes(k) &&
>     !ehrMainNavKeys.includes(k)   // ← must be present
>   ),
> ];
> ```
>
> Additionally add a final deduplication step before rendering to guarantee no key appears twice even if the two arrays somehow overlap:
> ```ts
> const dedupedEhrShowMoreKeys = [...new Set(ehrShowMoreKeys)];
> return dedupedEhrShowMoreKeys.map(k => <div key={k}>{renderEHRItem(k)}</div>);
> ```
> Apply the same deduplication to the provider and transcriber Show More arrays.