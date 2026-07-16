Here is the precise fix prompt:

---

## Fix Prompt: Prescription Preference Logic + Single Session Note Button in AI Scribe Dashboard

### Root Cause Analysis

**Bug 1 — "Maybe" preference not moving prescriptions to Show More:** The `transciberForcedVisible` set in `Layout.tsx` unconditionally pins `prescriptions` to the main nav unless the pref is exactly `"no"`. But for `"maybe"`, prescriptions IS written to `sidebar_hidden_items` by onboarding — the problem is `transciberForcedVisible` overrides `hiddenItems` completely, so even when `prescriptions` is in `hiddenItems`, the forced-visible set wins and renders it in the main nav anyway. The fix: `transciberForcedVisible` must exclude `prescriptions` for both `"maybe"` AND `"no"`.

**Bug 2 — "Create Prescription" button shows even when pref is "maybe" or "no":** In `Dashboard.tsx`, the Quick Action Banner renders both buttons unconditionally inside the `{isTranscriberOnly && (...)}` block. It doesn't read from `dashboard_hidden_cards` or `ai_scribe_prescription_pref`. The fix: read the pref from localStorage and conditionally render the prescription button. When hidden, show only the "Create Session Note" button with width matching the parent container.

---

### FILE 1: `Layout.tsx`

Find this block inside the nav IIFE:

```ts
// BEFORE
const transciberForcedVisible = new Set(
  aiScribePrescriptionPref === "no"
    ? ['ai-transcriber', 'session-notes']
    : ['ai-transcriber', 'session-notes', 'prescriptions']
);
```

Replace with:

```ts
// AFTER — "maybe" also removes prescriptions from forced-visible so hiddenItems takes effect
const transciberForcedVisible = new Set(
  aiScribePrescriptionPref === "no" || aiScribePrescriptionPref === "maybe"
    ? ['ai-transcriber', 'session-notes']
    : ['ai-transcriber', 'session-notes', 'prescriptions']
);
```

This single change makes "maybe" work correctly: prescriptions exits `transciberForcedVisible`, so `hiddenItems` takes effect, so it falls into `hiddenFromOrder(order)`, so it appears in Show More as "tap to show."

Then confirm the Show More filter already has this (from the previous prompt — verify it's present, add if missing):

```tsx
.filter(key => {
  if (isTranscriberOnly && (
    key === 'ai-transcriber' ||
    key === 'session-notes'
  )) return false;
  if (isTranscriberOnly && key === 'prescriptions' && aiScribePrescriptionPref === 'no') return false;
  return true;
})
```

This ensures: "maybe" → prescriptions appears in Show More as "tap to show". "no" → prescriptions is fully absent from Show More. "yes"/null → prescriptions is in main nav via `transciberForcedVisible`.

---

### FILE 2: `Dashboard.tsx`

**Fix the Quick Action Banner to conditionally show the prescription button and resize the session note button accordingly.**

Find the entire Quick Action Banner block:

```tsx
{/* Quick Action Banner */}
<div className="max-w-[640px] mx-auto mt-4 flex gap-3">
  <button onClick={() => navigate("/session-notes", { state: { openAddNotes: true } })}
    className="flex-1 flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#C7D2FE] dark:border-blue-700 rounded-[12px] text-[13px] font-semibold text-[#2563EB] dark:text-blue-400 hover:bg-[#EEF2FF] dark:hover:bg-blue-900/20 hover:border-[#818CF8] transition-all active:scale-95"
  >
    <ClipboardList className="size-4" />
    Create Session Note
  </button>
  <button onClick={() => navigate("/prescriptions", { state: { openAddPrescription: true } })}
    className="flex-1 flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#FBCFE8] dark:border-pink-700 rounded-[12px] text-[13px] font-semibold text-[#DB2777] dark:text-pink-400 hover:bg-[#FDF2F8] dark:hover:bg-pink-900/20 hover:border-[#F9A8D4] transition-all active:scale-95"
  >
    <Pill className="size-4" />
    Create Prescription
  </button>
</div>
```

Replace it with:

```tsx
{/* Quick Action Banner */}
{(() => {
  const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
  const showPrescriptionButton = rxPref === "yes" || rxPref === null;
  return (
    <div className="max-w-[640px] mx-auto mt-4 flex gap-3">
      <button
        onClick={() => navigate("/session-notes", { state: { openAddNotes: true } })}
        className={`${showPrescriptionButton ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#C7D2FE] dark:border-blue-700 rounded-[12px] text-[13px] font-semibold text-[#2563EB] dark:text-blue-400 hover:bg-[#EEF2FF] dark:hover:bg-blue-900/20 hover:border-[#818CF8] transition-all active:scale-95`}
      >
        <ClipboardList className="size-4" />
        Create Session Note
      </button>
      {showPrescriptionButton && (
        <button
          onClick={() => navigate("/prescriptions", { state: { openAddPrescription: true } })}
          className="flex-1 flex items-center justify-center gap-2 h-11 bg-white dark:bg-gray-800 border-[1.5px] border-[#FBCFE8] dark:border-pink-700 rounded-[12px] text-[13px] font-semibold text-[#DB2777] dark:text-pink-400 hover:bg-[#FDF2F8] dark:hover:bg-pink-900/20 hover:border-[#F9A8D4] transition-all active:scale-95"
        >
          <Pill className="size-4" />
          Create Prescription
        </button>
      )}
    </div>
  );
})()}
```

**How this works:** When `rxPref` is `"maybe"` or `"no"`, `showPrescriptionButton` is `false`. The prescription button is not rendered. The session note button switches from `flex-1` (50% width) to `w-full` (100% width), matching the exact width of the parent `max-w-[640px]` container — identical to the QuickRecordCard and Start Recording button above it.

---

### Verification Table

| Prescription pref | Main nav | Show More | Dashboard prescription button | Session note button width |
|---|---|---|---|---|
| `"yes"` or `null` | ✅ Prescriptions | ❌ | ✅ Shown | 50% (flex-1) |
| `"maybe"` | ❌ | ✅ "tap to show" | ❌ Hidden | 100% (w-full) |
| `"no"` | ❌ | ❌ Fully absent | ❌ Hidden | 100% (w-full) |

---

### Summary

| File | Change |
|---|---|
| `Layout.tsx` | Add `aiScribePrescriptionPref === "maybe"` to the condition that removes `prescriptions` from `transciberForcedVisible` |
| `Dashboard.tsx` | Wrap Quick Action Banner in an IIFE that reads `ai_scribe_prescription_pref`; conditionally render prescription button; switch session note button to `w-full` when prescription button is absent |