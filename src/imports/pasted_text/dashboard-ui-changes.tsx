MANTRACARE AI TRANSCRIBER — COMPLETE UI + WORKFLOW REDESIGN PROMPT

SCREEN 1 — HOME PAGE (TRANSCRIBER-ONLY PLAN)
Remove the existing mic recorder widget that sits inside the Dashboard card. Do not show the "Dashboard" heading or "Welcome back! Here's what's happening with your practice today" subtitle when the user is on the Transcriber-only plan.
Instead show:

Heading: "Good morning, [First Name]"
Subtext: "Ready for your next session?"

Below that, render the Quick Record card directly (no wrapper section title). Remove the RECENT sessions list entirely — the three rows showing "Rachit · SOAP · Mar 12 → again", "Sarah · DAP · Mar 10 → again", "Michael · BIRP · Mar 8 → again" must be deleted.

SCREEN 2 — QUICK RECORD CARD (ON HOME PAGE)
White card, 1px border #E2E8F0, border-radius 16px, padding 24px, max-width 560px, centered on page.
Layout top to bottom:
Row 1 — two inputs side by side:

Left: "Search or select client" dropdown, flex-1, shows existing client list on click
Right: Note type selector, fixed width ~100px, options: SOAP / DAP / BIRP / PIRP

Row 2 — full-width primary button:

Label: "🎤 Start Recording"
Background: #043570
Text: white, bold, 15px
Height: 48px
Border-radius: 12px
On click: navigate to recording screen (see Screen 3)

No recent sessions list below this card.

SCREEN 3 — ACTIVE RECORDING SCREEN
New route: /record-session — receives clientName and noteType via route state.
Full page or large centered card. Background white.
Layout top to bottom:
Header strip (small, muted):

Left: "[Client Name] · [Note Type]" — 14px, gray
Right: "✕ Cancel" button — discards recording, navigates back to home

Microphone icon:

56px mic icon, color #00c0ff
Subtle pulse animation (scale 1.0 → 1.08 → 1.0, 1.2s infinite)

Waveform visualizer:

~40 vertical bars in a row
Heights animate randomly every 80ms using requestAnimationFrame
Active bars: #00c0ff
Inactive (when paused): #CBD5E1
Container: full width, height 64px
Bar width: ~6px, gap: 3px, border-radius: 3px

Timer:

Format: 00:00 (mm:ss)
Font size: 32px, font-weight bold, centered
Ticks every second using setInterval

Two buttons in a row:

Left: "⏸ Pause" — outlined style, gray border

On click: freeze waveform bars, freeze timer, change button label to "▶ Resume"


Right: "⏹ Stop" — outlined style, red border, red text

On click: stop timer, stop waveform, open the Review & Save modal




SCREEN 4 — REVIEW & SAVE MODAL
Appears after tapping Stop. Bottom sheet on mobile, centered modal on desktop. Overlay: black 50% opacity behind.
Modal content (white, border-radius 16px, padding 24px, max-width 480px):
Title row:

"✅ Recording complete" — 16px, semibold, green text
Subtitle: "[Client Name] · [mm:ss duration] · [Note Type]" — 13px, gray

Form fields:

"Session Date" — date input, pre-filled with today's date
"Session Time" — time input, pre-filled with current time
"Brief overview (optional)" — 3-line textarea, placeholder: "e.g. Discussion about anxiety management techniques"

Action buttons, two rows:
Row 1:

Left: "Cancel" — text button, gray — discards, navigates back to home
Right: "Save" — filled button, gray background — saves record, navigates to /ai-transcriber

Row 2 (full-width grid of 2):

Left: "📋 Prepare Session Notes" — blue tint button (bg #EEF2FF, text #2563EB, border #BFDBFE)

On click: save record + navigate to /clients/[id]/notes/add?source=transcriber


Right: "💊 Prepare Prescription" — pink tint button (bg #FDF2F8, text #DB2777, border #FBCFE8)

On click: save record + navigate to /clients/[id]/prescriptions/create?source=transcriber




SCREEN 5 — /ai-transcriber LIST PAGE
This page must show the transcription list for ALL plan types, including transcriber-only. Remove the condition that returns an empty array when isTranscriberOnly is true.
After saving a new recording, navigate here. The new record must appear at the TOP of the list.
Page layout (unchanged from current Full EHR design):
Header:

Title: "AI Transcriber"
Subtitle: "Record and transcribe sessions with AI-powered notes"
Top-right: "All Clients ▾" dropdown + "+ Add Transcript" button (teal)

Search bar: full width, "Search by client name..."
Stats row — 3 cards: Total | Completed | This Week
Transcription list rows, each row contains:

Client avatar (72px, border-radius 12px)
Client name (bold 16px) + status badge
Date · Duration · File size (small gray row)
Right side action buttons:

If status = "completed": "👁 View" button (teal) + download icon + delete icon
If status = "processing": spinning loader + "Processing..." text + delete icon



New record status flow:

Immediately after save: show "🔵 Processing…" badge with animated pulse dot
After AI processing completes (simulate 3–5s): badge changes to "🟢 Completed" and View button appears


CODE CHANGES REQUIRED
File: Dashboard.tsx

In the isTranscriberOnly block: change heading to "Good morning, [name]" and subtext to "Ready for your next session?"
Delete the entire RECENT sessions section (the border-top divider, "RECENT" label, and the three session rows below it)

File: AITranscriber.tsx

Line where filteredTranscriptions is defined: remove the isTranscriberOnly ? [] : condition so the list renders for all plan types

New file: RecordingScreen.tsx (or inline state in Dashboard)

States: idle → recording → paused → stopped → review
Waveform: array of 40 heights, updated every 80ms with Math.random() * 100, rendered as divs or canvas bars
Timer: useEffect with setInterval, increments recordingSeconds each second, displays as mm:ss
On save: prepend new record object to transcriptions list, navigate to /ai-transcriber


COMPETITOR REFERENCES FOR WAVEFORM + RECORDING UI
Heyberries (app.heyberries.com): clean two-column layout, client selector left, template selector right, single Start session button. Session list on left panel.
Commure Ambient (ambient.commure.com): full-screen blue recording view, large timer "00:01" centered, animated waveform dots row, Pause Recording + End Visit buttons. The waveform is the hero element.
Berries in-session widget (compact): shows waveform bars, microphone selector dropdown, End session primary button + pause + discard icon buttons in a row.
Use these as inspiration for the recording screen aesthetic. The waveform must feel alive and responsive — not static.

VISUAL TOKENS (consistent with existing MantraCare design system)
Primary navy: #043570
Accent cyan: #00c0ff
Success green: #15a65e
Error red: #EF4444
Background: #F8FAFC
Card border: #E2E8F0
Muted text: #64748B
Border radius cards: 16px
Border radius buttons: 12px
Border radius inputs: 10px
Font: Inter or system-ui