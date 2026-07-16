I'll analyze the code carefully before writing the fix prompts.After thoroughly analyzing both files, here are the precise fix prompts:

---

## FIX 1 — Duplicate items (ai-transcriber, session-notes, prescriptions)

**Root cause:** In `Layout.tsx`, these three items are hardcoded into `providerShowMoreResidents` / `transcriberShowMoreResidents` / `allShowMoreResidents` as permanent residents AND also exist in the order arrays (`ehrItemOrder`, `transcriberItemOrder`, `providerItemOrder`). So they render twice — once from the order array (main nav or after drag), and again from the hardcoded residents list in the Show More block. The Show More render never checks whether the item is already in the main nav order.

**Prompt:**

> In `Layout.tsx`, the Show More block (normal mode, not configure mode) renders items from `providerShowMoreResidents`, `transcriberShowMoreResidents`, and `ehrShowMoreResidents` without first checking if those items are already present in the current mode's order array (main nav). This causes duplicates.
>
> Fix: In the normal-mode Show More render for **all three modes**, filter out any key that already exists in the current mode's order array (i.e., it's already rendered in main nav). Specifically:
>
> **Provider mode** — change the `providerShowMoreKeys` filter to also exclude keys that are already in `visibleItems(providerItemOrder)`:
> ```
> const providerShowMoreKeys = [
>   ...providerDefaultResidents.filter(k =>
>     !hiddenItems.includes(k) &&
>     !showMorePromoted.includes(k) &&
>     !userShowMoreProvider.includes(k) &&
>     !visibleItems(providerItemOrder).includes(k)   // ADD THIS
>   ),
>   ...userShowMoreProvider.filter(k =>
>     !hiddenItems.includes(k) &&
>     !showMorePromoted.includes(k) &&
>     !visibleItems(providerItemOrder).includes(k)   // ADD THIS
>   ),
> ];
> ```
>
> **Transcriber mode** — same pattern: filter `transcriberShowMoreKeys` to exclude keys already in `visibleItems(transcriberItemOrder)`.
>
> **EHR mode** — same pattern: filter `ehrShowMoreKeys` to exclude keys already in `visibleItems(ehrItemOrder)`.
>
> Also in **configure mode**, the `showMoreConfigItems` builder for all three modes must skip any key that already appears in `mainConfigKeys` (i.e., is in the visible order array). Add a guard: `if (mainConfigKeys.includes(k)) return;` before pushing to `showMoreConfigItems`.

---

## FIX 2 — EHR & AI Scribe: onboarding goal selection controls sidebar order

**Root cause:** In `OnboardingEHRAIScribe.tsx`, `handleGetStarted` writes a `filteredOrder` to localStorage that only keeps items the user selected plus always-visible ones. But the default order arrays (`defaultEHROrderKeys`, `defaultTranscriberOrderKeys`) include `ai-transcriber`, `session-notes`, and `prescriptions` statically. Unselected ones are moved to `userShowMoreEhr`/`userShowMoreTranscriber`, but currently items like `billing`, `messages`, `appointments` are also in `defaultEHROrderKeys` and won't be filtered correctly for the "only show what user selected" logic.

**Prompt:**

> In `OnboardingEHRAIScribe.tsx`, fix `handleGetStarted` so that the sidebar order precisely reflects what the user selected in "What are your primary goals?":
>
> 1. **Default order for EHR mode** should be: `['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings']`. After filtering, the written `sidebar_ehr_order` must only contain: always-visible keys (`home`, `clients`, `refer-earn`, `settings`) + the sidebarKeys mapped from `selectedPurposes`. All other optional keys must be excluded from this array (they go to Show More via `userShowMoreEhr`).
>
> 2. **`toShowMore`** must be all optional keys NOT selected and NOT always-visible and NOT therapy-only-hidden. This is already partially correct but confirm `toShowMore` is derived as: `allOptionalKeys.filter(k => !selectedSidebarKeys.has(k) && !alwaysVisible.has(k))` (minus prescriptions if therapy-only).
>
> 3. **When `selectAll` is true for EHR mode**: write `sidebar_ehr_order` as `['home', 'clients', 'billing', 'messages', 'appointments', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings']` (identical to provider mode order) and clear `sidebar_user_show_more_ehr`. Do NOT put any optional item into Show More.
>
> 4. **When `selectAll` is true for AI Scribe mode**: write `sidebar_transcriber_order` as `['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings']` and write `sidebar_user_show_more_transcriber` as `['billing', 'messages', 'appointments', 'resources', 'ai-crm']` so those appear under Show More.

---

## FIX 3 — "Select Everything" behavior per mode

**Root cause:** The current `selectAll` path in `handleGetStarted` calls `localStorage.removeItem("dashboard_hidden_cards")` and removes hidden items, but doesn't differentiate the sidebar order written for EHR vs AI Scribe mode correctly. For EHR it should mirror provider mode (all items in main nav). For AI Scribe, `billing`, `messages`, `appointments` should go to Show More, not main nav.

**Prompt:**

> In `OnboardingEHRAIScribe.tsx` inside `handleGetStarted`, handle the `selectAll === true` branch explicitly before the general filtering logic:
>
> ```ts
> if (selectAll) {
>   if (isAiScribe) {
>     localStorage.setItem("sidebar_transcriber_order",
>       JSON.stringify(['home','clients','ai-transcriber','session-notes','prescriptions','refer-earn','settings'])
>     );
>     localStorage.setItem("sidebar_user_show_more_transcriber",
>       JSON.stringify(['billing','messages','appointments','resources','ai-crm'])
>     );
>   } else {
>     // EHR full access = same as provider mode
>     localStorage.setItem("sidebar_ehr_order",
>       JSON.stringify(['home','clients','billing','messages','appointments','ai-transcriber','session-notes','prescriptions','refer-earn','settings'])
>     );
>     localStorage.removeItem("sidebar_user_show_more_ehr");
>   }
>   // handle therapy-only prescription hiding
>   if (therapyOnly) {
>     localStorage.setItem("dashboard_hidden_cards", JSON.stringify(["prescriptions"]));
>     localStorage.setItem("ai_scribe_prescription_pref", "no");
>   } else {
>     localStorage.removeItem("dashboard_hidden_cards");
>     localStorage.setItem("ai_scribe_prescription_pref", "yes");
>   }
>   // set plan mode and navigate
>   if (isAiScribe) setPlanMode("transcriber-only"); else setPlanMode("full-ehr");
>   localStorage.setItem("mantra_logged_in", "true");
>   navigate("/");
>   return; // skip the rest of handleGetStarted
> }
> ```
>
> Place this block at the very top of `handleGetStarted` (after clearing stale state) so it short-circuits before the general purpose-based logic.

---

## FIX 4 — Configure menu drag in/out of Show More

**Root cause:** In `Layout.tsx` configure mode, `handleDropToShowMore` adds the dragged item to `userShowMoreEhr/Transcriber/Provider` but the order array removal (`setter(prev => prev.filter(...))`) only fires for the current mode. Also, dragging from Show More → main nav via `handleDrop` correctly calls `setShowMorePromoted` or `userShowMoreSetter`, but there's no guard preventing items that are already in the mode's order from being duplicated when `toIdx !== -1 && !order.includes(draggedItem)` check is missing for promoted items.

**Prompt:**

> In `Layout.tsx`, fix configure-mode drag-and-drop between main nav and Show More:
>
> 1. **Dragging main nav item → Show More section** (`handleDropToShowMore`): after removing from the order array, also remove the item from `showMorePromoted` (already done) — but also ensure it's added to the correct per-mode `userShowMore` setter. Currently the setter is derived correctly but confirm the `mode` parameter is threaded through from the `onDrop` handler on the Show More section container. The `onDrop` on the Show More droppable area must call `handleDropToShowMore(mode, null)` where `mode` is the current computed mode variable in the render closure.
>
> 2. **Dragging Show More item → main nav** (`handleDrop` with `draggedSection === 'showMore'`): after inserting into the order array, the item must be removed from `userShowMoreEhr`/`userShowMoreTranscriber`/`userShowMoreProvider` for the current mode AND from `showMorePromoted`. Currently the code only handles one path (either userShowMore or showMorePromoted), but not both if an item was in userShowMore and also in showMorePromoted. Add: remove from both `userShowMore[mode]` setter AND `showMorePromoted` regardless.
>
> 3. In configure mode's Show More section header container, set `onDragLeave` to also clear `dragOverItem` when leaving the section entirely (not just individual items). This prevents ghost highlights.

---

## FIX 5 — Rename label in EHR/AI Scribe modes

**Prompt:**

> In `Layout.tsx`, find the button that renders `"Elevate with Mantra Provider"` inside the `{!isProviderPlan && (...)}` block (both the expanded and collapsed variants). Change the label text from `"Elevate with Mantra Provider"` to `"Become a Mantra Provider"` in both the visible text `<span>` and the `title` attribute on the collapsed button.