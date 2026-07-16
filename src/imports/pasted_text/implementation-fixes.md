Looking at the screenshot and your code, I can identify exactly what needs fixing. Here is the precise implementation prompt:

---

## Implementation Prompt: Three Fixes

### FIX 1 — Rename "Tools" to "Other Tools" in EHR/Provider sidebar, remove Tasks submenu item, fix Resources route

**In `Layout.tsx`, find `renderToolsSection`** and make three changes:

**Change the button label** from `Tools` to `Other Tools`:
```tsx
// BEFORE
<span className={`ml-3 text-sm font-medium whitespace-nowrap ...`}>Tools</span>

// AFTER
<span className={`ml-3 text-sm font-medium whitespace-nowrap ...`}>Other Tools</span>
```

**Remove the Tasks submenu item** from the array inside `renderToolsSection`. The array currently has three items — delete the Tasks entry entirely:
```ts
// BEFORE
{ to: "/tools",  icon: <Wrench .../>, label: "Resources" },
{ to: "/tasks",  icon: <CheckSquare .../>, label: "Tasks" },
{ to: "/ai-crm", icon: <Brain .../>, label: "AI CRM" },

// AFTER
{ to: "/other-tools", icon: <Wrench .../>, label: "Resources" },
{ to: "/ai-crm",      icon: <Brain .../>, label: "AI CRM" },
```

Note: also fix the Resources route from `/tools` to `/other-tools` to match the router which has `{ path: "other-tools", element: <OtherTools /> }`.

**Also update `navItemMeta`** — the `tools` entry label should read `Other Tools`:
```ts
'tools': { icon: <Wrench className="size-5 flex-shrink-0" />, label: 'Other Tools' },
```

**Also update the active check in `renderToolsSection`** button to remove `/tasks`:
```tsx
// BEFORE
isActive("/tools") || isActive("/tasks") || isActive("/ai-crm")

// AFTER
isActive("/other-tools") || isActive("/ai-crm")
```

---

### FIX 2 — "Everything sounds useful" is incorrectly hiding Session Notes from the sidebar

**Root cause:** When `selectAll` is checked, `handleSelectAll` calls `setSelectedPurposes(new Set(purposes.map(p => p.label)))` which sets all purposes selected. But then `handleGetStarted` runs the sidebar hidden logic block first — and because `selectedPurposes.size > 0` is true and `selectAll` is also true, the existing code still enters the sidebar hiding block and writes `sidebar_hidden_items`. The fix is to **skip the entire sidebar hidden logic when `selectAll` is true**, and also **clear any previously written hidden items**.

In `OnboardingEHRAIScribe.tsx`, find `handleGetStarted` and replace the entire sidebar personalization block:

```ts
// BEFORE
if (selectedPurposes.size > 0) {
  const selectedSidebarKeys = new Set<string>();
  purposes.forEach(p => { ... });
  ...
  if (toHide.length > 0) {
    const existing = JSON.parse(...);
    const merged = Array.from(new Set([...existing, ...toHide]));
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(merged));
  }
}
```

```ts
// AFTER
if (selectAll) {
  // User wants everything — clear any previously saved hidden sidebar items
  localStorage.removeItem("sidebar_hidden_items");
} else if (selectedPurposes.size > 0) {
  const selectedSidebarKeys = new Set<string>();
  purposes.forEach(p => {
    if (p.sidebarKey && selectedPurposes.has(p.label)) {
      selectedSidebarKeys.add(p.sidebarKey);
    }
  });

  const transcriberProtectedKeys = new Set(
    signupMode === "ai-scribe"
      ? ['ai-transcriber', 'session-notes', 'prescriptions']
      : []
  );

  const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];
  const toHide = allOptionalKeys.filter(k =>
    !selectedSidebarKeys.has(k) &&
    !alwaysVisible.has(k) &&
    !transcriberProtectedKeys.has(k)
  );

  if (toHide.length > 0) {
    const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
    const merged = Array.from(new Set([...existing, ...toHide]));
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(merged));
  } else {
    // User selected all optional items manually — clear hidden items
    localStorage.removeItem("sidebar_hidden_items");
  }
}
// If selectedPurposes.size === 0 and not selectAll: preserve defaults, don't write anything
```

---

### FIX 3 — AI Scribe mode: AI Transcriber / Session Notes / Prescriptions appear in both main nav AND Show More dropdown

**Root cause:** In `Layout.tsx`, the Show More `hiddenFromOrder(order)` call shows items that are in `hiddenItems`. In transcriber mode, `transciberForcedVisible` forces those three keys to render in the main nav even when they're in `hiddenItems`. But the `hiddenFromOrder` call in Show More doesn't know about `transciberForcedVisible`, so it still shows them there too.

**Also:** The "YOUR PLAN" badge on the AI Transcriber item in transcriber mode is correct — do NOT remove it. The prompt says to remove the "your plan" text but looking at the code it's only shown in the transcriber-specific renderer where it makes sense. Leave it.

**Fix the Show More dropdown** to exclude transcriber-forced-visible items when in transcriber mode. Find the `hiddenFromOrder(order).map(key => {...})` block inside the Show More section and add a filter:

```tsx
// BEFORE
{hiddenFromOrder(order).map(key => {
  const meta = navItemMeta[key];
  if (!meta) return null;
  return (
    <button key={key} onClick={() => toggleHideItem(key)} ...>
      ...
    </button>
  );
})}
```

```tsx
// AFTER
{hiddenFromOrder(order)
  .filter(key => {
    // In transcriber mode, ai-transcriber / session-notes / prescriptions
    // are force-shown in the main nav — don't also show them in Show More
    if (isTranscriberOnly && (
      key === 'ai-transcriber' ||
      key === 'session-notes' ||
      key === 'prescriptions'
    )) return false;
    return true;
  })
  .map(key => {
    const meta = navItemMeta[key];
    if (!meta) return null;
    return (
      <button key={key} onClick={() => toggleHideItem(key)} ...>
        ...
      </button>
    );
  })
}
```

**Also remove the "YOUR PLAN" badge text** from the AI Transcriber case in `renderTranscriberItem`. Find this in the `case 'ai-transcriber':` block:

```tsx
// REMOVE this span entirely from renderTranscriberItem case 'ai-transcriber'
{!shouldShowCollapsed() && (
  <span className="ml-2 text-[10px] font-medium text-[#00c0ff] tracking-wide">YOUR PLAN</span>
)}
```

The user specifically asked to remove this "your plan" text from the AI Scribe mode main menu.

---

### Summary of all file changes

| File | Change |
|---|---|
| `Layout.tsx` | Rename Tools → Other Tools label; fix Resources route to `/other-tools`; remove Tasks from submenu; update active path check; update `navItemMeta` label; filter transcriber-forced items from Show More |
| `OnboardingEHRAIScribe.tsx` | Guard sidebar hidden logic with `selectAll` check at the top — if `selectAll` is true, `removeItem("sidebar_hidden_items")` and skip the hide logic entirely |