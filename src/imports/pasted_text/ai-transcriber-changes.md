Here's the complete precise prompt:

---

## Prompt: AI Transcriber Monetization Journey — Accurate Pre-Trial and Post-Trial States

### Core Mental Model
AI Transcriber is the product being sold. Session Notes and Prescriptions are free tools that contain an AI-powered layer inside them. That AI layer is locked until the provider activates an AI Transcriber free trial or paid plan. Session Notes and Prescriptions themselves are never sold separately — they are always free for manual use.

---

### Change 1: Tools Page — Fix Capsule Badges

**Session Notes card:**
- Remove "1 free session" capsule
- Replace with "Free" badge — same capsule style, same position, just label changes to "Free"
- Clicking the card opens Session Notes directly — no popup, no trial intercept

**Prescriptions card:**
- Remove "1 free session" capsule
- Replace with "Free" badge — same capsule style, same position
- Clicking the card opens Prescriptions directly — no popup, no trial intercept

**AI Transcriber card:**
- Keep "1 free session" capsule as is
- Clicking the card → shows AI Transcriber free trial popup (existing behavior)

**All other cards (Resources, Tasks, AI CRM):**
- No change

---

### Change 2: Remove Free Trial Popups for Session Notes and Prescriptions

- Delete the Session Notes free trial popup entirely — it must never appear anywhere in the flow
- Delete the Prescriptions free trial popup entirely — it must never appear anywhere in the flow
- The only free trial popup that exists in this entire product is the **AI Transcriber free trial popup**
- Any existing trigger that showed Session Notes or Prescription popups must now either do nothing or redirect directly to the tool

---

### Change 3: Session Notes — Right Panel Pre-Trial Locked State

The right panel inside Session Notes (visible on the note view page and note add page) contains the AI Transcriber layer. In Pre-Trial state this panel must show a locked empty state.

**Pre-Trial State — Right Panel:**
- Panel width: same as current
- Background: light grey (#F5F5F5) or subtle off-white
- Content vertically centered:
  - Lock icon (top)
  - Heading: "AI Transcriber" (bold)
  - Subtext: "Unlock AI Transcriber to view session transcripts alongside your notes and auto-fill them with one click."
  - CTA button: "Start Free Trial" (teal, full width of panel)
  - Below CTA: small text link — "Already subscribed? View plans"
- No session selector dropdown visible
- No Transcript / Noteworthy tabs visible
- No transcript content visible
- "Fill with AI" button on the note add page — hidden in Pre-Trial state

**Post-Trial State — Right Panel:**
- Full panel as currently built — session selector, Transcript tab, Noteworthy tab, transcript content, Fill with AI button
- No change to existing behavior

**"Start Free Trial" click behavior from this panel:**
- Opens AI Transcriber free trial popup
- On "Begin free trial" → activates trial → right panel unlocks and transitions to full panel state on the same page
- On "View plans" → redirects to Settings → Subscription

---

### Change 4: Prescriptions — Right Panel Pre-Trial Locked State

Same locked panel logic as Session Notes right panel.

**Pre-Trial State — Right Panel:**
- Lock icon
- Heading: "AI Transcriber" (bold)
- Subtext: "Unlock AI Transcriber to view session transcripts alongside prescriptions and auto-fill them instantly."
- CTA button: "Start Free Trial" (teal)
- Below CTA: "Already subscribed? View plans" text link
- No session selector, no transcript tabs, no transcript content visible
- "Fill with AI" button on Create Prescription page — hidden in Pre-Trial state

**Post-Trial State — Right Panel:**
- Full panel as currently built
- No change to existing behavior

**"Start Free Trial" click from this panel:**
- Opens AI Transcriber free trial popup
- Same behavior as Change 3

---

### Change 5: Client Session Page — Transcripts Tab Pre-Trial Locked State

On the client session detail page (`/clients/1/notes`) the page has two tabs: **Session Notes** and **Transcripts**.

**Pre-Trial State — Transcripts Tab:**
- Tab is visible and clickable — do not hide the tab
- When clicked, instead of showing transcript list, show a locked empty state inside the tab content area:
  - Lock icon (centered)
  - Heading: "Unlock AI Transcriber"
  - Subtext: "Record and transcribe your sessions with AI. Start a free trial to access transcripts for this client."
  - CTA button: "Start Free Trial" (teal) — opens AI Transcriber free trial popup on click
  - Below the CTA, a secondary outlined button: **"+ Import Recording"**
    - In Pre-Trial state: clicking "Import Recording" also opens the AI Transcriber free trial popup (import requires active trial/subscription)
    - In Post-Trial state: clicking "Import Recording" opens the Add New Transcript modal with Upload tab pre-selected
- No existing transcript entries visible in Pre-Trial state — even if transcripts exist in the system, do not show them here in Pre-Trial
- "Add Transcripts" button in the top right of the page header — hidden in Pre-Trial state, visible in Post-Trial state

**Post-Trial State — Transcripts Tab:**
- Full transcript list as currently exists
- "Add Transcripts" button visible and functional
- Import works normally
- No change to existing behavior

---

### Change 6: Import Flow as Conversion Surface on Session Notes and Prescriptions Add Pages

**On Session Notes add page (`/clients/1/notes/add`) — Pre-Trial state only:**
- Below the template selector, add a subtle helper row:
  - Upload/import icon
  - Text: "Have a session recording? Import to auto-fill your notes"
  - Style: light grey background, not a primary button
  - On click → opens AI Transcriber free trial popup
- Hidden in Post-Trial state

**On Create Prescription page — Pre-Trial state only:**
- Below Chief Complaints field, same helper row:
  - Text: "Have a session recording? Import to auto-fill this prescription"
  - On click → opens AI Transcriber free trial popup
- Hidden in Post-Trial state

---

### Change 7: AI Transcriber Page — Pre-Trial Locked Empty State

**Pre-Trial State:**
- Page is accessible but shows locked empty state replacing the transcript list and stats bar
- Empty state:
  - Microphone icon, greyed
  - Heading: "Record & Transcribe Your Sessions with AI"
  - Subtext: "Join sessions automatically, get full transcripts, and auto-generate clinical notes and prescriptions — all in one flow."
  - CTA: "Start Free Trial" (teal, centered)
  - Below: "Already subscribed? View plans" text link
- Stats bar (Total, Completed, This Week) — hidden
- "+ Add Transcript" button — hidden
- Search bar — hidden
- Free trial banner — hidden (locked empty state already communicates the trial prompt)

**Post-Trial State:**
- Full page as currently built
- Stats bar, transcript list, search bar, "+ Add Transcript" button all visible
- Free trial banner visible and collapsible above search bar

---

### Change 8: Demo State Toggle — Update Labels

The demo state toggle at the bottom left currently shows "Pre-Trial" and "Post-Trial". No change to its position or behavior. Ensure switching between states correctly reflects all the changes above across all pages in real time:

- Pre-Trial → all locked states active, all AI layers hidden, right panels locked, Transcripts tab locked
- Post-Trial → all locked states removed, full AI functionality visible, right panels unlocked, free trial banner visible

---

### Summary Table

| UI Element | Pre-Trial | Post-Trial |
|---|---|---|
| Session Notes card badge | "Free" | "Free" |
| Prescriptions card badge | "Free" | "Free" |
| Session Notes/Prescription free trial popup | Deleted — never shown | Deleted — never shown |
| AI Transcriber card | "1 free session" → trial popup | Opens tool directly |
| Right panel in Session Notes | Locked — AI Transcriber CTA | Full transcript panel |
| Right panel in Prescriptions | Locked — AI Transcriber CTA | Full transcript panel |
| Fill with AI button | Hidden | Shown (direct only) |
| Transcripts tab on client session page | Locked empty state + Import button (locked) | Full transcript list |
| Add Transcripts button on client session page | Hidden | Visible |
| Import helper row on Notes/Rx add pages | Visible — opens trial popup | Hidden |
| AI Transcriber page | Locked empty state | Full page |
| Free trial banner | Hidden | Visible and collapsible |

---

### Constraints
- Manual Session Notes creation — fully free, no restriction, no gating in any state
- Manual Prescription creation — fully free, no restriction, no gating in any state
- Do not change Resources tool in any way
- Do not change Messages, Billing, or Clients pages
- Do not change any Post-Trial flows — all previously built functionality remains intact
- All locked states use consistent visual language: lock icon + descriptive text + single teal CTA + optional secondary link
- The only free trial popup in the entire product is the AI Transcriber free trial popup