Here's the detailed prompt:

---

## Premiumise `CredentialStatus.tsx` — wrap content in structured, layered storytelling divs

The goal is to make the no-insurance state feel like a polished product landing page embedded inside a dashboard. Every section should feel intentional, breathing, and layered — not a flat list of cards stacked on top of each other.

---

### Overall structural wrapper

Wrap the entire no-insurance `<div className="space-y-5">` in a new outer container:

```
<div className="max-w-2xl mx-auto space-y-8 py-2">
```

This centres and constrains the content width so it never stretches uncomfortably wide on large screens.

---

### Section 1 — Hero: add visual weight and breathing room

Current: bare div with `border-b pb-5 mb-5`

Replace with a proper hero block — no card, no border, just generous vertical space that anchors the page:

```
<div className="pt-4 pb-8 border-b border-gray-200 dark:border-gray-700">
```

- Add `mb-1` between the eyebrow and the h2
- Increase h2 to `text-[26px]` — it is the headline of the whole page, it needs presence
- Add `mt-1` below h2 before the subtitle paragraph
- Pills row: change `mt-4` to `mt-5`
- Wrap everything in a subtle left accent: add `pl-0` — no indent, keep it flush, the hierarchy creates the layering

---

### Section 2 — How it works: add a two-column layout hint on desktop

Current: single column card

Change the card wrapper to:

```
<div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
```

Add a tinted header strip above the steps inside the card:

```
<div className="bg-gray-50 dark:bg-gray-800/60 px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
  <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500">How it works</p>
  <span className="text-[11px] text-gray-400 dark:text-gray-500">4 steps</span>
</div>
```

Move the section label into this header strip (remove the old standalone label). Steps list sits in `<div className="divide-y divide-gray-200 dark:divide-gray-700">` — remove `space-y-0`, replace individual `border-b` on each step with `divide-y` on the parent. Each step gets `px-5 py-4` padding instead of `py-3`.

---

### Section 3 — Video placeholder: elevate with aspect ratio and inner glow hint

Change the outer card wrapper to:

```
<div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
```

Add the same tinted header strip pattern as Section 2:

```
<div className="bg-gray-50 dark:bg-gray-800/60 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
  <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500">Credentialing walkthrough</p>
</div>
```

Move section label into the strip. Video placeholder sits in `<div className="p-5">`.

Change the dashed placeholder to use `aspect-video` instead of `min-h-[200px]` so it holds a proper 16:9 ratio:

```
className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750 aspect-video cursor-pointer hover:border-[#1a3352] dark:hover:border-blue-500 transition-colors"
```

---

### Section 4 — What this unlocks: group into a "value proposition" narrative block

Wrap Section 4 and Section 5 together inside a single outer grouping div with a subtle background tint to create a visual "mid-page chapter":

```
<div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
```

Inside this wrapper, Section 4 sits as:

```
<div className="p-5">
  <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500 mb-4">What this unlocks for you</p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> ... </div>
</div>
```

Section 5 sits directly below inside the same wrapper (the `divide-y` creates the divider automatically):

```
<div className="p-5">
  <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500 mb-3">What you'll need to apply</p>
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"> ... checklist ... </div>
</div>
```

Change the checklist inner container from `bg-gray-50` to `bg-white dark:bg-gray-800` with `border border-gray-200 dark:border-gray-700` so it lifts off the tinted section background.

---

### Section 6 — FAQ: add accordion-style visual structure without JS

Current: flat div list

Change wrapper to:

```
<div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
```

Add the tinted header strip (same pattern as Sections 2 and 3):

```
<div className="bg-gray-50 dark:bg-gray-800/60 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
  <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500">Common questions</p>
</div>
```

FAQ items sit in `<div className="divide-y divide-gray-200 dark:divide-gray-700">`. Each item: `px-5 py-4` instead of `py-3`. Add a right-arrow chevron icon (`ChevronRight`, size-4, `text-gray-300 dark:text-gray-600`) floated to the right of each question using `flex items-start justify-between gap-3` on the question row — purely decorative, gives a polished "expandable" feel without needing actual accordion state.

---

### Section 7 — CTA box: make it the visual climax of the page

This is the last thing the user sees. It should feel like a destination, not just another card.

Replace current `bg-gray-50` wrapper with:

```
<div className="rounded-xl border border-[#1a3352]/20 dark:border-[#243f66] bg-[#f8fafd] dark:bg-[#1a3352]/20 p-6 flex flex-col gap-4">
```

Change the title to `text-[18px] font-medium` — it should feel like a section heading, not body text.

Add a thin decorative top accent bar above the title using:

```
<div className="w-8 h-0.5 bg-[#1a3352] dark:bg-blue-400 rounded-full mb-1" />
```

Place this immediately before the `<p>` title element, inside the CTA box.

Meta row: add `mt-1` spacing. Keep the 3 checkmark items unchanged.

CTA button: change to full-width on mobile, auto-width on desktop:

```
className="w-full md:w-fit inline-flex items-center justify-center gap-2 bg-[#1a3352] hover:bg-[#243f66] text-white rounded-lg px-6 py-3 text-[14px] font-medium transition-colors"
```

Increase vertical padding from `py-2.5` to `py-3` to give the button more presence.

---

### New lucide import to add

Add `ChevronRight` to the import list (used in FAQ items).

---

### `InsurancePage.tsx` — no changes needed

The `InsurancePage.tsx` file as provided is already correctly updated from the previous prompt. Make no changes to it.

---

### What must NOT change

- All state variables and toggle logic in `CredentialStatus.tsx`
- The entire `hasInsurance = true` table section (search, filters, table, empty state)
- All text content — every word stays exactly as written
- All existing Tailwind class logic for dark mode, responsive breakpoints, and status badge colors in the table