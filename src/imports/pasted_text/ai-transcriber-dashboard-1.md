## Product Thinking First

Looking at the reference (Ambient/Commure), the home page **IS** the recording interface. The user lands and immediately sees: pick a template → pick visit type → hit record. Zero navigation friction. That's the core insight.

For MantraCare AI Transcriber, the home dashboard should function as a **quick-start transcription launcher** — not a metrics page with a banner. The user opens the app, sees their clients, selects one, picks a template, and starts recording. All in one flow, right on the home screen.

---

## Figma Prompt — AI Transcriber Dashboard: Quick-Start Recording Flow

---

### REMOVE

- ❌ `"Welcome to AI Transcriber"` blue banner entirely
- ❌ The 3 stats cards row (Total Clients / Sessions This Week / Notes Created) — too early for a new user, adds no action value

---

### REPLACE WITH — Quick Start Transcription Card

This becomes the **hero element** of the AI Transcriber dashboard, sitting directly below the Dashboard header.

---

**Container:**
- Background: `bg-white`
- Border: `border border-gray-200`
- Border radius: `rounded-2xl`
- Shadow: `shadow-sm`
- Padding: `p-5 md:p-8`
- Full width

---

**Header row inside card:**
- Left: cyan dot `●` `size-2 bg-[#00c0ff]` + label `"New Session"` — `text-[16px] md:text-[18px] font-bold text-gray-900`
- Right: small text `"Quick start a transcription"` — `text-sm text-gray-400`

---

**Step 1 — Client Selector:**

Label: `"Select Client"` — `text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2`

Dropdown button:
- Full width
- `bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3`
- Left: `Users` icon `size-4 text-gray-400` + text `"Choose a client..."` `text-sm text-gray-400`
- Right: `ChevronDown` `size-4 text-gray-400`
- On click: opens client search dropdown with avatar + name rows

---

**Step 2 — Session Template + Visit Type (side by side):**

Layout: `grid grid-cols-2 gap-3 mt-4`

**Left — Template:**
- Label: `"Template"` — `text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2`
- Dropdown: `bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium`
- Default value: `"SOAP Note"`
- Options: SOAP Note, DAP Note, BIRP Note, Progress Note, Intake Note
- Right: `ChevronDown size-4 text-gray-400`

**Right — Visit Type:**
- Label: `"Visit Type"` — `text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2`
- Toggle pill group — two options side by side:
  - `"In-Person"` + `"Virtual"`
  - Selected state: `bg-[#00c0ff] text-white rounded-lg px-4 py-2.5 text-sm font-semibold`
  - Unselected: `bg-[#F8FAFC] text-gray-500 rounded-lg px-4 py-2.5 text-sm font-medium border border-gray-200`
  - Default selected: `"In-Person"`

---

**Step 3 — Start Recording Button:**

Full width, `mt-4`:
- Background: `bg-[#043570]`
- Hover: `hover:bg-[#032a5a]`
- Border radius: `rounded-xl`
- Padding: `py-4`
- Layout: `flex items-center justify-center gap-3`
- Left: `Mic` icon `size-5 text-white`
- Text: `"Start Recording"` — `text-white text-[15px] font-bold`
- Add a subtle pulse animation on the mic icon: `animate-pulse` in cyan `text-[#00c0ff]` when no client selected → white when client is selected
- Active/hover: slight scale `hover:scale-[1.01]` transition

---

**Below button — helper text:**
- `"You have 1 free session left"` — `text-xs text-gray-400 text-center mt-2`
- Followed by: `"Get Unlimited →"` — `text-[#00c0ff] text-xs font-semibold` inline link to `/settings`

---

### KEEP BELOW — Recent Transcriptions Section

Keep the `"Recent Transcriptions"` section exactly as-is with the empty state. It now sits naturally below the quick-start card as a history feed.

- Keep: cyan dot `●` + `"Recent Transcriptions"` heading
- Keep: empty state (mic icon + `"No transcriptions yet"` + `"Record First Session"` button)
- Keep: populated state design for when sessions exist

---

### REMOVE BELOW RECENT TRANSCRIPTIONS

- ❌ `"Get the most out of AI Transcriber"` tips banner — redundant now that the recording flow is the hero
- ❌ `"Your AI Plan Tools"` quick access grid — the sidebar already shows AI Transcriber, Session Notes, Prescriptions. Duplicating them on the home screen adds noise, not value.

---

### FINAL PAGE ORDER (AI Transcriber Dashboard)

```
Dashboard Header
  ↓
┌─────────────────────────────────────┐
│  ● New Session                      │
│                                     │
│  Select Client ▼                    │
│                                     │
│  Template ▼        Visit Type       │
│  SOAP Note         [In-Person][Vir] │
│                                     │
│  🎙 Start Recording                 │
│  You have 1 free session · Upgrade  │
└─────────────────────────────────────┘
  ↓
● Recent Transcriptions
  [ Empty state / populated rows ]
```

---

### STORYTELLING PRINCIPLE

> "The AI Transcriber home page is not a dashboard — it's a launchpad. A provider opens the app between patients, taps their client's name, hits record, and walks into the session. Everything else is secondary. Design for that 10-second workflow."