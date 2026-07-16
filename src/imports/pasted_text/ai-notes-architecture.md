# MantraCare — AI Notes Architecture: The Right Way

---

## What the industry figured out (and we need to match)

Heidi Health, SimplePractice Note Taker, Freed, Blueprint — none of them create a separate "AI Notes" section or a separate note type. Every one of them does the same thing:

> A session has a recording, or it doesn't. If it does, the doctor's normal note-writing workflow gets a "fill with AI" button. That's it.

The note is always a SOAP note, or a DAP note, or whatever template the doctor uses. AI is just the thing that pre-fills the fields. The doctor reviews, edits, signs. There's no such thing as an "AI note" — there are only notes that were drafted faster.

The current implementation broke this by making AI notes a separate parallel track. That's what felt unprofessional. It adds cognitive overhead, creates two places to look for notes, and signals that AI is a bolted-on feature rather than a natural part of the workflow.

---

## The mental model shift

**Before:** Two types of notes (Manual | AI Generated)
**After:** One type of note. Sessions either have a transcript or they don't. Transcripts make filling the note faster.

---

## Revised Architecture

---

### 1. Appointments list / Session cards

**Change:** Sessions where a recording exists get a small "🎙 Transcript" chip on the session card. Nothing else changes.

This is purely informational. It tells the doctor "when you go to write notes for this one, AI can help." No new section, no new flow yet.

---

### 2. Session detail page

**Change:** The "Add Notes" button gets a subtle indicator when a transcript is available — a small waveform/sparkle icon next to it, or a secondary line: "Transcript available — AI can help fill this note."

The "Session Notes & Details" table stays exactly as is. Notes in the table are just notes — no AI/Manual column. Optionally a small "AI-assisted" chip can appear in the Template Name column for notes that were filled using AI, but it's low-key, not a primary label.

---

### 3. Session Note page (the core change)

This is the existing page: Template Configuration (Template selector, Language, Country) → Template Content (the blank fields).

**What changes when a transcript exists for this session:**

A banner appears at the top of the Template Content section:

```
┌─────────────────────────────────────────────────────┐
│  🎙 Transcript available for this session            │
│  AI can draft this note based on what was discussed. │
│  [  ✨ Fill with AI  ]  [  View Transcript  ]         │
└─────────────────────────────────────────────────────┘
```

Clicking "Fill with AI":
- Each template field gets a loading shimmer (1-2 seconds)
- Fields populate with AI-drafted content
- A small "AI draft" chip appears on each pre-filled field
- Doctor reads, edits directly in the same fields, removes the chip as they accept each section
- Same "Save Note" button at the end — no new flow

If no transcript exists:
- Banner doesn't appear
- Everything is identical to today — zero change

This is the entire product change for the note-writing flow. One banner. One button. Same everything else.

---

### 4. Tools → AI Notes / Scribe page (repurposed)

This page stops being a "list of AI notes." It becomes the **Transcript & Recording Library** — every session that has a recording, regardless of whether a note was made.

**Columns:**
- Client Name + Duration
- Session Date
- Recording Status (Available / Processing / Failed)
- Note Status (Not started / Draft / Complete)
- Actions: View Transcript | Open Note

**Why this is better:**
Doctors can come here to see which sessions they still need to document, and for which ones AI is available to help. It's a task management view, not a "type of notes" view.

The "AI Generated" badge on every single row (current implementation) is noise — it says nothing useful because everything in this list has a recording.

---

### 5. Recording entry points (where transcripts come from)

There are three places a recording can be started. All three feed the same transcript library. None of them create a different "type" of note.

**Entry point A — During a Video Session (Messages flow)**
Already exists in Image 2: the Video Session modal has "Add AI Notetaker in the meeting" toggle. Keep this exactly as is. When the session ends, a transcript is created and attached to the appointment. The session card gets the "🎙 Transcript" chip.

**Entry point B — Post-session upload (Session detail or Scribe page)**
Doctor had a face-to-face session or used an external tool. They can upload an audio file (MP3/MP4/WAV/M4A) directly from the session detail page or from the Scribe library. Same processing → same transcript → same "Fill with AI" button in the note flow.

**Entry point C — Live record from browser (Session detail or Scribe page)**
For in-person sessions. Doctor opens a recording modal directly. Waveform animation, live timer, pause/stop/done. Same outcome as above.

Entry points B and C don't need to be prominent everywhere — they can both live inside a single "Add Recording" button on the session detail page, and as a "New Recording" button on the Scribe library page.

---

### 6. Template fields: how AI fill actually works

When "Fill with AI" is triggered, the system populates each field of the selected template. The behavior per field:

- **Populated fields** — show AI-drafted text. A small "AI draft — review before saving" line appears below. Doctor edits inline. Field styling returns to normal on first edit (the chip disappears).
- **Fields AI couldn't populate** (no relevant content in transcript) — remain empty with a note: "Nothing found in transcript for this section."
- **Doctor-added content** — anything the doctor types from scratch is just their text, no chip.

When the doctor saves, the note is just a note. No permanent AI label in the record beyond a small optional footnote: "Drafted with AI assistance."

---

### 7. Transcript viewer (accessible from multiple places)

A standalone view that can be opened from:
- The "View Transcript" button in the banner on the note page
- The Scribe library Actions column

Layout: simple two-column. Left: transcript with speaker labels (Doctor / Client) and timestamps. Right: a Noteworthy panel (Conditions, Themes, Risk Flags, Medications, Procedures) as clickable tags that scroll to the relevant line in the transcript.

This is purely a reading view. It doesn't generate a note by itself — that always happens through the template flow.

---

## What disappears

- The "AI Notes / Scribe" page as a list of a separate note type → replaced by Transcript Library
- The "AI Generated" badge on every row in the notes table → removed or made subtle
- The Note Type Selection Modal (Manual vs AI) → doesn't need to exist. The choice is implicit: go to Add Notes as normal, and if a transcript is there, use it or don't
- Any separate "AI Note Viewer" screen → the note is just a note, viewed and edited in the same note editor everyone already uses

---

## Summary of what gets built

| What | Where | What it does |
|------|-------|--------------|
| 🎙 Transcript chip | Appointment cards | Visual indicator only |
| "Transcript available" banner + Fill with AI button | Session Note page (template content area) | Core AI interaction |
| AI draft chips on pre-filled fields | Template fields after fill | Review signal for doctor |
| View Transcript link | Session Note page + Scribe library | Opens transcript viewer |
| Transcript viewer | Standalone page | Read transcript + Noteworthy tags |
| Scribe library (repurposed) | Tools → AI Notes/Scribe | Transcript + note status per session |
| Add Recording button | Session detail page | Upload or live record → creates transcript |
| AI Notetaker toggle | Video Session modal (already exists) | Kept as is |

---

## What this prompt does NOT include

- Messages flow (Prompt 2 — same transcript viewer, same note fill behavior, just triggered from a different place)
- Multi-session pattern analysis across clients
- Billing/coding suggestions from transcripts
- Client-facing summaries or homework generation