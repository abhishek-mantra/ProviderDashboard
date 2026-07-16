# Figma Prompt — AI Transcriber Sidebar Redesign

---

## FINAL SIDEBAR STRUCTURE (AI Transcriber Plan — Exact Order)

```
┌─────────────────────────────┐
│  🏠 Home                    │
│  👥 Clients                 │
│  🎙️ AI Transcriber    ←cyan │
│  📋 Session Notes     ←cyan │
│  💊 Prescriptions     ←cyan │
│  ⚙️ Settings                │
│                             │
│  Show more ▼                │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  💬 Messages        🔒      │
│  📅 Appointments    🔒      │
│  👑 For Mantra Provider 🔒  │
│  🔧 Other Tools             │
│                             │
│  ┌─────────────────────┐    │
│  │ ✦ Unlock Full EHR   │    │
│  │ Appointments,       │    │
│  │ Billing & more      │    │
│  │ [  Upgrade  ]       │    │
│  └─────────────────────┘    │
│                             │
│  JW  John Wilson            │
└─────────────────────────────┘
```

---

## STEP-BY-STEP FIGMA INSTRUCTIONS

### STEP 1 — Remove These Elements Entirely

- ❌ Delete the `"AI Transcriber Plan"` pill/capsule at the top of sidebar
- ❌ Delete the `"Upgrade"` hyperlink text next to the capsule
- ❌ Delete `"YOUR PLAN"` text badges from all nav items
- ❌ Delete the `"UPGRADE TO UNLOCK"` section divider label
- ❌ Delete the existing `"Dashboard"` label — replace with `"Home"`

---

### STEP 2 — Reorder Navigation Items (Top Section)

Rebuild the top nav as a vertical auto-layout stack with `gap: 4px`, in this exact order:

**1. Home**
- Icon: `Home` (lucide)
- Label: `"Home"`
- Route: `/home`
- Style: default nav item — `text-gray-700`, icon `text-gray-500`

**2. Clients**
- Icon: `Users` (lucide)
- Label: `"Clients"`
- Route: `/clients`
- Style: default nav item

**3. AI Transcriber**
- Icon: `Mic` (lucide)
- Label: `"AI Transcriber"`
- Route: `/ai-transcriber`
- Style: **Active/Featured** — full cyan fill `bg-[#00c0ff]`, white icon + white text, `rounded-xl`
- Left accent bar: `3px` width, `bg-[#00c0ff]`, full height of row, `rounded-r-full` — sits flush against left sidebar edge

**4. Session Notes**
- Icon: `FileText` or `StickyNote` (lucide)
- Label: `"Session Notes"`
- Route: `/session-notes`
- Style: **Featured** — left accent bar `3px bg-[#00c0ff]/60`, label `text-gray-800 font-medium`, icon `text-[#00c0ff]`

**5. Prescriptions**
- Icon: `Pill` (lucide)
- Label: `"Prescriptions"`
- Route: `/prescriptions`
- Style: **Featured** — left accent bar `3px bg-[#00c0ff]/60`, label `text-gray-800 font-medium`, icon `text-[#00c0ff]`

**6. Settings**
- Icon: `Settings` (lucide)
- Label: `"Settings"`
- Route: `/settings`
- Style: default nav item

---

### STEP 3 — "Show More" Collapsed Dropdown

Directly below Settings, add a collapsible section trigger row:

**Trigger row:**
- Label: `"Show more"` — `text-[13px] font-semibold text-gray-500`
- Icon: `ChevronDown` on the right — `size-4 text-gray-400`
- On click: toggles the dropdown items below (collapsed by default)
- Full row padding: `px-4 py-2.5`
- No background, no border
- Hover: `text-gray-700`

**Dropdown items (shown when expanded — "Show more ▲"):**

Add a thin horizontal rule `border-t border-gray-100` above dropdown items.

**a. Messages**
- Icon: `MessageSquare` (lucide) — `text-gray-300`
- Label: `"Messages"` — `text-gray-400`
- Lock icon: `Lock` (lucide) `size-3.5 text-gray-300` — positioned right-aligned
- `cursor: not-allowed`
- Hover: no hover effect (locked)

**b. Appointments**
- Icon: `Calendar` (lucide) — `text-gray-300`
- Label: `"Appointments"` — `text-gray-400`
- Lock icon: right-aligned `Lock size-3.5 text-gray-300`
- `cursor: not-allowed`

**c. For Mantra Provider** *(renamed from "Grow")*
- Icon: **`Crown`** (lucide) — `text-gray-300` *(replace the existing Grow/TrendingUp icon)*
- Label: `"For Mantra Provider"` — `text-gray-400` *(rename from "Grow")*
- Lock icon: right-aligned `Lock size-3.5 text-gray-300`
- `cursor: not-allowed`

**d. Other Tools**
- Icon: `Wrench` or `LayoutGrid` (lucide) — `text-gray-500`
- Label: `"Other Tools"` — `text-gray-600 font-medium`
- No lock icon — this is accessible
- Normal hover: `hover:bg-gray-50 hover:text-gray-900`

---

### STEP 4 — Upgrade CTA Card (Bottom of Sidebar)

Keep the existing dark card but update it:

- Background: `#043570` (keep existing dark blue)
- Icon: `Sparkles` — `text-[#00c0ff]` size-5, in a `size-9 rounded-xl bg-[#00c0ff]/20` container
- Headline: `"Unlock Full EHR"` — white, `13px`, `font-bold`
- Subtext: `"Appointments, Billing & more"` — `#93C5FD`, `11px`, `font-normal`
- Button: `"Upgrade"` — full width, `bg-transparent border border-[#00c0ff] text-[#00c0ff]`, `rounded-xl`, `12px font-bold`
- **Button click action: navigate to `/settings`** *(not an external link — internal route)*
- Card margin: `mx-3 mb-3`, `rounded-2xl`, `p-4`

---

### STEP 5 — User Profile Row (Bottom)

Keep `"JW John Wilson"` row exactly as-is — no changes.

---

### STEP 6 — Remove Leftover Elements

After reordering, do a final cleanup pass:

- ❌ Remove any remaining `"Billing"` standalone nav item (it's now locked inside Show More dropdown — actually Billing is not shown at all in dropdown since it's covered by the CTA card copy)
- ❌ Remove `"Grow"` nav item entirely — replaced by `"For Mantra Provider"` inside dropdown
- ❌ Remove `"Tools"` expandable nav item — replaced by `"Other Tools"` flat item inside dropdown
- ❌ Confirm zero instances of `"YOUR PLAN"` text anywhere in sidebar
- ❌ Confirm the `"AI Transcriber Plan"` + `"Upgrade"` capsule row at top is fully deleted

---

### STEP 7 — Spacing & Visual Rhythm

- Top nav items (Home → Settings): `gap: 2px`, `px-3 py-2.5 each`
- Show More trigger row: `mt-4 mb-0`
- Dropdown items: `gap: 0px`, `px-3 py-2` each — slightly tighter than top nav
- Gap between last dropdown item and Upgrade CTA card: `16px`
- Sidebar total width: unchanged from current (`240px`)
- Scrollable area: the region between the logo and the user profile row should scroll if content overflows — the Upgrade card and user profile row are **sticky/fixed** to bottom

---

## VISUAL SUMMARY

| Nav Item | Style | Lock | Route |
|---|---|---|---|
| Home | Default | — | `/home` |
| Clients | Default | — | `/clients` |
| AI Transcriber | Cyan filled active | — | `/ai-transcriber` |
| Session Notes | Cyan left bar | — | `/session-notes` |
| Prescriptions | Cyan left bar | — | `/prescriptions` |
| Settings | Default | — | `/settings` |
| — Show more ▼ — | Toggle trigger | — | — |
| Messages | Grayed | 🔒 | — |
| Appointments | Grayed | 🔒 | — |
| For Mantra Provider | Grayed + Crown icon | 🔒 | — |
| Other Tools | Default | — | `/other-tools` |