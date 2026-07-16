# Figma Prompt — Client Profile Actions: AI Transcriber Plan Redesign

---

## CONTEXT

On the **Client Profile page** (`/clients/1`), the **Actions section** currently shows all 11 action buttons equally regardless of plan. When the active plan is **AI Transcriber Only**, the actions grid must be completely restructured — removing locked actions, reordering to prioritize AI plan tools, and adding a new **"Transcripts"** action button that doesn't exist in the current Full EHR grid.

---

## WHAT TO REMOVE (AI Transcriber Plan — Actions Grid)

Remove these buttons entirely from the visible grid. Do **not** show them grayed out or locked — just omit them completely to avoid cognitive clutter:

- ❌ Appointments
- ❌ Insurance
- ❌ Pathway
- ❌ Insights
- ❌ Orders
- ❌ Request Feedback
- ❌ Earnings
- ❌ Invoicing
- ❌ Resources

---

## WHAT TO KEEP + ADD (AI Transcriber Plan — Actions Grid)

The final actions grid for AI Transcriber plan should contain exactly **4 buttons** in this order:

| Position | Label | Icon | Color |
|---|---|---|---|
| 1st | **Transcripts** | `FileAudio` or `Mic` | `text-[#00c0ff]` cyan |
| 2nd | **Session Notes** | `StickyNote` | `text-amber-600` |
| 3rd | **Prescriptions** | `Pill` | `text-pink-600` |
| 4th | **Clients** → relabel as just nav back | Remove — not needed | — |

So the final 3 action buttons are: **Transcripts, Session Notes, Prescriptions**

---

## TRANSCRIPTS BUTTON — DESIGN SPEC

This is a **new button** that doesn't exist in the Full EHR plan. Design it as:

- Icon: `Mic` or `FileAudio` (lucide-react)
- Icon color: `text-[#00c0ff]`
- Label: `"Transcripts"` — `text-sm font-medium text-gray-900`
- Border: `border border-[#00c0ff]/30`
- Background: `bg-white` default → `hover:bg-[#00c0ff]/5` on hover
- Hover border: `hover:border-[#00c0ff]/60`
- Add a small **"NEW"** pill badge at top-right corner of this card:
  - `absolute top-2 right-2`
  - `bg-[#00c0ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full`
  - Text: `"NEW"`
- On click: navigate to `/clients/{id}/transcripts`

---

## ACTIONS GRID LAYOUT — AI TRANSCRIBER PLAN

**Desktop (`md:grid-cols-3`)** — 3 columns, 1 row with 3 cards:

```
[ Transcripts 🆕 ]  [ Session Notes ]  [ Prescriptions ]
```

**Mobile (`grid-cols-2`)** — 2 columns:

```
[ Transcripts 🆕 ]  [ Session Notes ]
[ Prescriptions  ]
```

Cards sizing: same as current — `p-3 md:p-6`, `rounded-xl md:rounded-2xl`

---

## ACTIONS SECTION HEADER — AI TRANSCRIBER PLAN

Change the section header area:

**Before:** Plain `"Actions"` heading

**After:**
- Heading: `"Actions"` — keep same style
- Add a subtitle below: `"Your AI Transcriber tools"` in `text-sm text-gray-500`, `font-normal`
- Add a small cyan dot `●` `bg-[#00c0ff]` `size-2` before the heading — matching the Summary section's dot style for visual consistency

---

## WHAT CHANGES PER CLIENT TYPE (AI Transcriber Plan)

| Client Type | Actions shown |
|---|---|
| Mantra Active Client | Transcripts, Session Notes, Prescriptions |
| Non-Mantra Client | Transcripts, Session Notes, Prescriptions |
| Non-Onboarded / Inactive | Session Notes, Prescriptions only (no Transcripts — no active session history) |

For **Non-Onboarded / Inactive clients** specifically: show only Session Notes + Prescriptions in a `grid-cols-2` layout, no Transcripts button.

---

## FULL EHR PLAN — NO CHANGES

The Full EHR plan Actions grid remains **exactly as it is** — all 11 buttons, same order, same layout. Zero changes.

---

## FIGMA IMPLEMENTATION STEPS

**Step 1 — Duplicate the Actions component**
- Duplicate existing `Actions` frame/component
- Rename original: `Actions / Full EHR`
- Rename duplicate: `Actions / AI Transcriber Plan`

**Step 2 — In `Actions / AI Transcriber Plan`:**
- Delete frames: Appointments, Insurance, Pathway, Insights, Orders, Request Feedback, Earnings, Invoicing, Resources
- Keep: Notes (rename label to `Session Notes`), Prescriptions
- Reorder remaining frames in auto-layout: Transcripts → Session Notes → Prescriptions

**Step 3 — Create new Transcripts card:**
- Duplicate any existing action card frame
- Replace icon with `Mic` icon, color `#00c0ff`
- Update label text to `"Transcripts"`
- Change border color to `#00c0ff` at 30% opacity
- Add `"NEW"` badge: rectangle `bg #00c0ff`, corner radius `100`, positioned `absolute top-right`, text `"NEW"` white 9px bold
- Place this card as first in auto-layout order

**Step 4 — Update grid auto-layout:**
- Set columns to `3` (desktop frame)
- Remove extra empty cells
- Adjust frame height to fit single row

**Step 5 — Update section heading:**
- Below `"Actions"` H3 text, add auto-layout row: cyan dot `size-8` circle `fill #00c0ff` + subtitle text `"Your AI Transcriber tools"` `#64748B` `14px` regular

**Step 6 — Apply plan-mode variant logic:**
- In the client profile page frame set to `AI Transcriber Only` plan mode: swap `Actions / Full EHR` component with `Actions / AI Transcriber Plan`
- In the client profile page frame set to `Full EHR Plan`: keep `Actions / Full EHR` unchanged

---

## STORYTELLING PRINCIPLE

> "When an AI Transcriber plan user opens a client profile, they should see exactly 3 powerful tools waiting for them — clean, focused, purposeful. No crossed-out buttons. No visual noise. Just: record, note, prescribe. The Transcripts button leads with 'NEW' because it's the crown jewel of what they paid for. The experience should feel complete — not limited."