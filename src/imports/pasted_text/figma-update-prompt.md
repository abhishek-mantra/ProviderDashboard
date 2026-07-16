I'll analyze the current state and write a precise, detailed prompt for updating the Figma file with all the required changes.

---

## Figma Update Prompt

### Context
This is a **MantraCare EHR** product. We're redesigning the **"Add Session Notes"** and **"Add Prescription"** modal flows. Both flows need to be unified under a new pattern: **With Transcript / Without Transcript** toggle, with a premium SaaS UI inspired by the "Recording Complete" modal (dark navy gradient header, rounded-[24px] cards, shadow-heavy, clean white body).

---

### STEP 1 — New Modal Shell (applies to BOTH Session Notes + Prescription modals)

**Replace the existing flat modal header** with a premium two-section design:

**Top Section (gradient header):**
- Background: `linear-gradient(135deg, #043570 → #0a5ca8)`
- Border-radius top: `24px`
- Padding: `28px 32px 24px`
- Close button `✕` top-right, white/80 opacity
- Title: `"Add Session Notes"` or `"Add Prescription"` — white, 20px, font-weight 700
- Subtitle below: `"AI-powered documentation from your sessions"` — white/60, 13px

**Below the gradient header, immediately inside the white body, add a toggle row:**

```
┌─────────────────────────────────────────────────────────┐
│  [ 🎙 With Transcript ]  [ 📝 Without Transcript ]       │
└─────────────────────────────────────────────────────────┘
```

- Two buttons, **equal width**, each 50% of modal inner width
- Height: `48px`, border-radius: `12px`
- Container: `background: #F1F5F9`, padding: `4px`, border-radius: `14px`, margin: `20px 24px 0`
- **Active state** (With Transcript default):
  - `background: white`, `box-shadow: 0 2px 8px rgba(0,0,0,0.10)`, text color: `#043570`, font-weight: 700
  - Icon: `🎙` for With Transcript, `📝` for Without Transcript
- **Inactive state**: text `#94A3B8`, no background, font-weight: 500
- Animate the active pill sliding left↔right on toggle (200ms ease)

---

### STEP 2 — "WITH TRANSCRIPT" Flow (default selected)

This is a **2-sub-step** flow within the modal:

#### Sub-step A: Client List

**Header area (below toggle):**
- Label: `"Step 1 of 2 — Select a client"` in `#64748B`, 12px, font-weight 600, uppercase, letter-spacing 0.5px
- Search bar below: full-width, `border: 1.5px solid #E2E8F0`, `border-radius: 12px`, height `44px`, left icon `🔍` in gray, placeholder `"Search clients..."`

**Client List Cards** (premium redesign):

Each client row:
```
┌──────────────────────────────────────────────────────┐
│  [Avatar 48px round]  Name (bold 15px)               │
│                       Last session: Mar 14, 2026  →  │
│                       [● Active] [3 transcripts]     │
└──────────────────────────────────────────────────────┘
```
- Card: `background: white`, `border: 1.5px solid #F1F5F9`, `border-radius: 16px`, padding `14px 16px`
- Hover: `border-color: #00c0ff`, `background: #F8FFFE`, `box-shadow: 0 4px 16px rgba(0,192,255,0.08)`
- Avatar: circular, 48px, gradient fallback (`#00c0ff → #2563EB`) with initials in white
- Right chevron: `#CBD5E1` → `#00c0ff` on hover
- Transcript count badge: `background: #EFF6FF`, `color: #2563EB`, `border-radius: 20px`, `padding: 2px 8px`, `font-size: 11px`, `font-weight: 700`
- "No transcripts" badge: `background: #FEF3C7`, `color: #D97706`

**Sample client data to add:**
```
1. Sarah Johnson     — Last: Mar 14, 2026 — 4 transcripts  
2. Michael Chen      — Last: Mar 12, 2026 — 2 transcripts  
3. David Martinez    — Last: Mar 8, 2026  — 1 transcript  
4. Emily Watson      — Last: Mar 6, 2026  — 3 transcripts  
5. Priya Sharma      — Last: Feb 20, 2026 — 0 transcripts (show warning badge)
```

#### Sub-step B: Transcript List (after client selected)

**Back button row:**
- `← Back to clients` — `#64748B`, 13px, hover `#043570`, chevron left icon

**Selected client pill** (above list):
```
┌─────────────────────────────────────────────────────────┐
│  [SJ avatar 36px]  Sarah Johnson   ✓ 4 transcripts      │
└─────────────────────────────────────────────────────────┘
```
- `background: linear-gradient(135deg, #EFF6FF, #F0F9FF)`, `border: 1.5px solid #BFDBFE`, `border-radius: 12px`, padding `10px 14px`

**Transcript Cards:**
```
┌──────────────────────────────────────────────────────────┐
│  [🎙 icon in blue circle 40px]                           │
│  Mar 14, 2026 · 10:00 AM                    50 min  →   │
│  "Discussion about anxiety management..."               │
│  [📄 Has Notes badge]  [🎙 Transcript badge]            │
└──────────────────────────────────────────────────────────┘
```
- Card border-radius: `16px`, border: `1.5px solid #F1F5F9`
- Hover: `border-color: #00c0ff` (for Session Notes) or `border-color: #EC4899` (for Prescription)
- Duration badge: `background: #F8FAFC`, `border: 1px solid #E2E8F0`, `color: #475569`, `border-radius: 8px`, `padding: 2px 8px`, `font-size: 11px`
- "Has Notes" badge: `background: #F0FDF4`, `color: #16A34A`, with FileText icon 10px
- "Transcript" badge: `background: #EFF6FF`, `color: #2563EB`, with Mic icon 10px

**Sample transcript data per client (Sarah Johnson):**
```
1. Mar 14, 2026 · 10:00 AM — Video Call — 50min — Has Notes · Transcript
2. Mar 7, 2026  · 10:00 AM — Video Call — 50min — Has Notes · Transcript  
3. Feb 28, 2026 · 02:30 PM — In-Person  — 45min — Transcript only
4. Feb 21, 2026 · 11:00 AM — Video Call — 50min — No notes, no transcript
```

---

### STEP 3 — "WITHOUT TRANSCRIPT" Flow

On toggle to "Without Transcript":

#### Sub-step A: Client List
**Identical to above** — same premium client cards, same search. Same 5 clients.

#### Sub-step B: Session Details Form (replaces transcript list)

After selecting a client, show this form instead of transcript list:

**Form layout** (all inside white body, padding `0 24px`):

```
┌────────────────────────────────────────────────────┐
│  [← Sarah Johnson]    "Step 2 of 2 — Session Info" │
├────────────────────────────────────────────────────┤
│  Session Date         Session Time                  │
│  [05-06-2026    📅]   [10:00 AM    🕐]             │
├────────────────────────────────────────────────────┤
│  Session Mode                                       │
│  ◉ Video Call    ○ In-Person    ○ Phone Call        │
├────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐  │
│  │  📎 Add Transcript (Optional)                │  │
│  │  Upload or record audio for AI assistance    │  │
│  │  [  Upload File  ]  [  Record Now  ]         │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Date/Time fields:**
- Height `44px`, `border: 1.5px solid #E2E8F0`, `border-radius: 12px`, focus ring `#00c0ff`
- Grid: 2 columns with `gap: 12px`

**Session Mode selector:**
- Three pill buttons in a row
- Selected: `background: #EFF6FF`, `border: 1.5px solid #2563EB`, `color: #1E40AF`, font-weight 700
- Unselected: `background: white`, `border: 1.5px solid #E2E8F0`, `color: #64748B`
- Border-radius: `10px`, padding: `8px 16px`

**"Add Transcript" optional box:**
- `background: #FAFAFA`, `border: 1.5px dashed #CBD5E1`, `border-radius: 16px`, padding `16px`
- Header: `"📎 Add Transcript"` — `#374151`, 14px bold + `"(Optional)"` badge in `#94A3B8`
- Subtext: `"Upload or record audio for AI-assisted filling"` — `#94A3B8`, 12px
- Two buttons side by side:
  - `[↑ Upload File]` — `border: 1.5px solid #E2E8F0`, white bg, `#374151`, radius `10px`, height `40px`
  - `[🎙 Record Now]` — `border: 1.5px solid #BFDBFE`, `background: #EFF6FF`, `#2563EB`, radius `10px`, height `40px`
- On file uploaded / recorded: replace dashed box with a green confirmation pill: `✓ transcript_session.mp3 · 4:32` with remove `×`

**CTA Button (bottom of modal):**
- Full width, height `52px`, `border-radius: 14px`
- Session Notes: `background: linear-gradient(135deg, #2563EB, #1d4ed8)`, shadow `0 4px 16px rgba(37,99,235,0.30)`
- Prescription: `background: linear-gradient(135deg, #DB2777, #be185d)`, shadow `0 4px 16px rgba(219,39,119,0.28)`
- Label: `"Continue to Session Notes →"` or `"Continue to Prescription →"`
- Always enabled (transcript is optional — user can proceed without it)

---

### STEP 4 — Destination: AddSessionNote / AddPrescription page changes

**Right sidebar — Transcript panel** — when arriving via "Without Transcript" flow with NO transcript:

Replace the Dr. Smith / Rachit chat transcript with:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│         [🎙 icon 48px, color: #CBD5E1]           │
│                                                  │
│      No transcript added                         │
│   (subtitle, #94A3B8, 13px)                      │
│                                                  │
│   Add a transcript to unlock                     │
│   AI-powered auto-fill                           │
│                                                  │
│   ┌──────────────────────────────────────────┐  │
│   │  ↑ Upload Transcript                     │  │
│   └──────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────┐  │
│   │  🎙 Record Session                       │  │
│   └──────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Container: centered vertically in the scrollable transcript area
- Icon: `#CBD5E1`, 48px
- Title: `"No transcript added"` — `#374151`, 16px, font-weight 700
- Subtitle: `"Add a transcript to unlock AI-powered auto-fill"` — `#94A3B8`, 13px, centered
- Upload button: `border: 1.5px solid #E2E8F0`, white bg, `#374151`, radius `12px`, full-width, height `44px`
- Record button: `border: 1.5px solid #BFDBFE`, `background: #EFF6FF`, `#2563EB`, radius `12px`, full-width, height `44px`

**"Fill with AI" button — BLURRED/DISABLED state:**
- When no transcript: `background: #94A3B8` (flat gray), `opacity: 0.5`, `cursor: not-allowed`
- Add a tooltip on hover: `"Add a transcript to use AI fill"` — small dark pill tooltip above the button
- Remove the sparkles animation when disabled
- When transcript added (any method): button becomes `background: #00c0ff`, `opacity: 1`, normal interactive

---

### STEP 5 — Prescription Modal Specific Changes

The prescription modal ("Select Transcript" → now renamed **"Add Prescription"**) follows the **exact same shell** as Session Notes modal above, but with these color differences:

- Accent color throughout: `#EC4899` (pink) instead of `#00c0ff` (blue)
- CTA gradient: `linear-gradient(135deg, #DB2777, #be185d)`
- Hover states on transcript/client cards: `border-color: #EC4899`, `background: #FFF1F7`
- Transcript badge hover chevron: `#EC4899`
- Toggle active pill: same white pill, but active text `#9D174D`
- "Add Transcript" optional box record button: `background: #FFF1F7`, `border: 1.5px solid #FBCFE8`, `color: #9D174D`

---

### STEP 6 — Modal Footer (both flows, both modal types)

**Add a fixed bottom strip** inside the modal (above the scrollable list, pinned to bottom):

For "With Transcript" flow showing client list:
- No footer CTA needed (navigation is via card click)

For "Without Transcript" flow showing form:
- Sticky footer: `background: #F8FAFC`, `border-top: 1px solid #F1F5F9`, padding `16px 24px`
- Single full-width CTA button (as described in Step 3)

---

### STEP 7 — Animation & Interaction Notes (for Figma prototyping)

1. **Toggle switch**: Smart animate between With/Without states — the white pill slides horizontally
2. **Client → Transcript sub-step**: Push transition left (new content slides in from right)
3. **Back button**: Pull transition right (slides back)
4. **Card hover**: `scale(1.005)` + border color change — use component hover variant
5. **Modal open**: Scale from `0.95 → 1.0` + `opacity 0 → 1`, 200ms ease-out
6. **Transcript selected**: Brief green flash on card before navigating away

---

### STEP 8 — Edge Cases to Design

| Scenario | UI Behavior |
|---|---|
| Client has 0 transcripts (Priya Sharma) | Show `"No transcripts yet"` empty state in sub-step B with illustration, still show "Continue without transcript →" button |
| Search returns 0 clients | Empty state: magnifying glass icon + `"No clients match your search"` |
| No clients in system | Empty state with `"No clients added yet"` + `"Add Client →"` link button |
| Transcript upload fails | Red error state on dashed box: `"Upload failed. Try again."` with retry button |
| User tries to proceed without date | Shake animation on date field + red border `#EF4444` + tooltip `"Please select a session date"` |

---

### Component Names to Create/Update in Figma

```
Components to CREATE:
- Modal/Shell/Premium (reusable for both Notes + Rx)
- Modal/Toggle/WithWithout
- Card/Client/Premium
- Card/Transcript/Premium  
- Form/SessionDetails
- Form/TranscriptUpload/Optional
- State/NoTranscript/Empty
- Button/FillWithAI/Disabled
- Button/FillWithAI/Active

Components to UPDATE:
- Modal/SessionNotes/AddFlow → replace with above shell
- Modal/Prescriptions/SelectTranscript → replace with above shell
- Sidebar/Transcript/Panel → add NoTranscript state
- Button/FillWithAI → add disabled/blurred variant
```