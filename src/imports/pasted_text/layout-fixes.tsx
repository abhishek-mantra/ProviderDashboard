## Implementation Brief: AI Scribe Sidebar — Remove Locks & Fix Item Visibility

---

### CONTEXT

File in scope: `Layout.tsx`. The transcriber-only sidebar (`isTranscriberOnly === true`) needs two targeted fixes: remove all lock/dim treatment from Messages, Appointments, and Billing in the Show More section; and ensure AI Transcriber, Session Notes, and Prescriptions always render in the main nav (never hidden to Show More) regardless of what was selected during onboarding.

---

### CHANGE 1 — Remove Lock, Opacity, and Lock Icon from Messages, Appointments, Billing in Transcriber Show More

In `Layout.tsx`, locate the `{isTranscriberOnly && (...)}` block inside the unified Show More section. It currently renders Messages, Appointments, and Billing as dimmed buttons with a `<Lock />` icon and `opacity-40` class, triggering `setShowPremiumUpgradePopup(true)` on click.

**Keep** the popup trigger behavior. **Remove** all visual lock treatment — no `opacity-40`, no `<Lock />` icon. The items must look identical to normal nav items in their resting state.

Find and replace this entire block:

```tsx
{[
  { icon: <MessageSquare className="size-5 flex-shrink-0 text-gray-500" />, label: 'Messages' },
  { icon: <Calendar className="size-5 flex-shrink-0 text-gray-500" />, label: 'Appointments' },
  { icon: <CreditCard className="size-5 flex-shrink-0 text-gray-500" />, label: 'Billing' },
].map(({ icon, label }) => (
  <button key={label} onClick={() => setShowPremiumUpgradePopup(true)}
    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-40"
  >
    <div className="flex items-center">{icon}<span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{label}</span></div>
    <Lock className="size-3.5 flex-shrink-0" />
  </button>
))}
```

Replace with:

```tsx
{[
  { icon: <MessageSquare className="size-5 flex-shrink-0" />, label: 'Messages' },
  { icon: <Calendar className="size-5 flex-shrink-0" />, label: 'Appointments' },
  { icon: <CreditCard className="size-5 flex-shrink-0" />, label: 'Billing' },
].map(({ icon, label }) => (
  <button
    key={label}
    onClick={() => setShowPremiumUpgradePopup(true)}
    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
  >
    {icon}
    <span className="ml-3 text-sm font-medium">{label}</span>
  </button>
))}
```

No other change to this block — popup still fires on click, no lock icon, no opacity reduction.

---

### CHANGE 2 — Remove Lock/Opacity from `renderNavItem` for Transcriber-Locked Paths

The `renderNavItem` helper also applies `opacity-40 cursor-not-allowed` and renders a `<Lock />` icon for any path where `isPathLocked()` returns true. Since Messages, Appointments, and Billing no longer appear in the main transcriber nav (they're in Show More), this change primarily future-proofs the helper and cleans up the EHR `renderNavItem` calls that could accidentally inherit lock styling.

In the `renderNavItem` function, make these two removals:

**Remove the locked opacity/cursor from the className:**
```tsx
// BEFORE — remove this conditional entirely from the className string:
${locked ? 'opacity-40 cursor-not-allowed' : ''}

// AFTER — delete that line, keep everything else in className unchanged
```

**Remove the Lock icon JSX at the bottom of renderNavItem:**
```tsx
// BEFORE — delete this entire block:
{locked && (
  <Lock className={`size-3.5 flex-shrink-0 transition-opacity duration-300 ${collapsed ? 'md:opacity-0 md:absolute' : 'opacity-100'}`} />
)}
```

The `handleLockedNavClick` toast behavior on the `onClick` handler remains completely untouched.

---

### CHANGE 3 — AI Transcriber, Session Notes, Prescriptions Always in Main Nav (Never Hidden to Show More)

Currently, `transcriberItemOrder` is `['home', 'clients', 'ai-transcriber', 'session-notes', 'prescriptions', 'refer-earn', 'settings']` and `hiddenItems` written during `OnboardingEHRAIScribe.tsx` can include `'ai-transcriber'`, `'session-notes'`, or `'prescriptions'` if the user didn't select those purposes. This incorrectly moves them out of the main nav.

**Fix in `Layout.tsx`:** When computing `itemsToRender` for transcriber mode, force these three keys to always be treated as visible regardless of `hiddenItems`.

Locate this line inside the nav render IIFE:

```tsx
const itemsToRender = visibleItems(order);
```

Replace it with a conditional that applies forced-visible overrides only in transcriber mode:

```tsx
const transciberForcedVisible = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);

const itemsToRender = isTranscriberOnly
  ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
  : visibleItems(order);
```

This ensures that for transcriber mode, even if `hiddenItems` contains `'ai-transcriber'`, `'session-notes'`, or `'prescriptions'`, they still render in the main nav. For EHR and provider modes, `visibleItems(order)` behavior is unchanged.

**Fix in `OnboardingEHRAIScribe.tsx`:** Additionally guard the write side. In `handleGetStarted`, when computing `toHide`, exclude these three keys for AI Scribe mode:

```typescript
const handleGetStarted = () => {
  if (selectedPurposes.size > 0) {
    const selectedSidebarKeys = new Set<string>();
    purposes.forEach(p => {
      if (p.sidebarKey && selectedPurposes.has(p.label)) {
        selectedSidebarKeys.add(p.sidebarKey);
      }
    });

    // Keys that must never be hidden in AI Scribe mode
    const transcriberProtectedKeys = new Set(
      signupMode === "ai-scribe"
        ? ['ai-transcriber', 'session-notes', 'prescriptions']
        : []
    );

    const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];
    const toHide = allOptionalKeys.filter(k =>
      !selectedSidebarKeys.has(k) &&
      !alwaysVisible.has(k) &&
      !transcriberProtectedKeys.has(k)   // ← new guard
    );

    if (toHide.length > 0) {
      const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
      const merged = Array.from(new Set([...existing, ...toHide]));
      localStorage.setItem("sidebar_hidden_items", JSON.stringify(merged));
    }
  }

  if (signupMode === "ai-scribe") setPlanMode("transcriber-only");
  else setPlanMode("full-ehr");

  localStorage.setItem("mantra_logged_in", "true");
  navigate("/");
};
```

---

### SUMMARY OF CHANGES

| File | Location | Change |
|---|---|---|
| `Layout.tsx` | `{isTranscriberOnly && (...)}` in Show More | Remove `opacity-40` and `<Lock />` from Messages, Appointments, Billing buttons; keep `onClick={() => setShowPremiumUpgradePopup(true)}` |
| `Layout.tsx` | `renderNavItem` function | Remove `${locked ? 'opacity-40 cursor-not-allowed' : ''}` from className; delete the `{locked && <Lock ... />}` JSX block |
| `Layout.tsx` | `itemsToRender` assignment in nav IIFE | Replace `visibleItems(order)` with conditional that forces `ai-transcriber`, `session-notes`, `prescriptions` visible in transcriber mode regardless of `hiddenItems` |
| `OnboardingEHRAIScribe.tsx` | `handleGetStarted` function | Add `transcriberProtectedKeys` set that guards `ai-transcriber`, `session-notes`, `prescriptions` from being written to `sidebar_hidden_items` when `signupMode === "ai-scribe"` |