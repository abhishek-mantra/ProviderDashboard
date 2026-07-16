This prompt defines two distinct UI states across Session Notes, Prescriptions, and AI Transcriber — Pre-Trial (free user, no subscription) and Post-Trial/Subscribed (active trial or paid plan). All changes must be visible in the current prototype so the flow is detectable when demoing.

Global State Definitions
State A — Pre-Trial (Free User):
User has not started any free trial and has no subscription. They can use Session Notes and Prescriptions manually. AI Transcriber does not exist for them functionally.
State B — Post-Trial (Active Trial or Paid):
User has started free trial OR has active subscription. AI Transcriber is fully active. Transcript panel visible. Auto-fill available. Import available.

Change 1: AI Transcriber Tool Card on Tools Page
State A (Pre-Trial):

Card shows "1 free session" capsule as currently exists
On click → show AI Transcriber free trial popup (as already built)
No other change

State B (Post-Trial):

Card shows "Try free" or plan badge as currently exists
On click → goes directly to AI Transcriber listing page
No change to existing behavior


Change 2: AI Transcriber Page
State A (Pre-Trial):

The entire AI Transcriber page (/ai-transcriber) is accessible but shows a locked empty state instead of the transcript list
Empty state design:

Icon: microphone or recording icon, greyed out
Heading: "Record & Transcribe Your Sessions with AI"
Subtext: "Join sessions automatically, get full transcripts, and auto-generate clinical notes and prescriptions — all in one flow."
Primary CTA button: "Start Free Trial" (teal, full width of content area)
Below button: "Already subscribed? View plans" as a text link


The stats bar (Total, Completed, This Week) is hidden in State A
The "+ Add Transcript" button is hidden in State A

State B (Post-Trial):

Full page as currently exists — stats bar, transcript list, "+ Add Transcript" button, search bar, free trial banner
No change to existing behavior


Change 3: Session Notes Page — Right Panel
The right panel (transcript panel) currently shows alongside Session Notes view and add pages.
State A (Pre-Trial):

Right panel is NOT fully hidden — it exists as a slim locked sidebar
Locked sidebar design:

Width: same as current right panel width
Background: light grey (#F5F5F5)
Content (vertically centered):

Lock icon at top
Text: "AI Transcript" (bold, small heading)
Subtext: "Start a free trial to unlock AI-powered transcripts alongside your session notes."
CTA button: "Start Free Trial" (teal, fits within panel width)


No transcript content visible, no session selector dropdown, no Transcript/Noteworthy tabs


This locked state appears on:

Session Notes list page (/session-notes) — right panel locked
Session Note view page (/clients/1/notes/view/1) — right panel locked
Session Note add page (/clients/1/notes/add) — right panel locked
"Fill with AI" button is hidden in State A on the add page



State B (Post-Trial):

Right panel fully visible as currently exists
Session selector dropdown, Transcript tab, Noteworthy tab all visible
"Fill with AI" button behavior unchanged (shown when direct, hidden when from transcriber)


Change 4: Prescriptions Page — Right Panel
Same locked panel logic as Session Notes.
State A (Pre-Trial):

Right panel shows locked state:

Lock icon
Text: "AI Transcript"
Subtext: "Start a free trial to use AI-assisted prescription filling from your session transcripts."
CTA: "Start Free Trial"


"Fill with AI" button hidden on Create Prescription page
Form is fully functional for manual entry — no restriction on manual prescription creation
"Submit Prescription" button active when form is manually filled

State B (Post-Trial):

Right panel fully visible
Auto-fill from transcript works as built
All existing behavior unchanged


Change 5: Import Flow as Trial Conversion Surface
On Session Notes add page (/clients/1/notes/add) — State A only:

Below the template selector, add a subtle secondary option row:

Icon: upload/import icon
Text: "Have a session recording? Import to auto-fill notes"
Style: light grey background row, not a primary button — looks like a helper option
On click → show AI Transcriber free trial popup
This row is hidden in State B (not needed, they have live transcriber)



On Create Prescription page — State A only:

Same import row below Chief Complaints field:

Text: "Have a session recording? Import to auto-fill this prescription"
On click → show AI Transcriber free trial popup
Hidden in State B




Change 6: Free Trial Popup — "Start Free Trial" CTA from Locked Panel
When "Start Free Trial" is clicked from the locked right panel inside Session Notes or Prescriptions:

Show the AI Transcriber free trial popup (not the Session Notes or Prescription popup)
Reason: the transcriber is the core product being sold — Session Notes and Prescription AI features are downstream of it
On "Begin free trial" → activate trial → right panel unlocks immediately on the same page without navigation
On "View plans" → redirect to Settings → Subscription


Change 7: Post-Trial Unlock — Visual Transition
When trial is activated (from any "Start Free Trial" CTA):

The locked right panel animates/transitions to the full transcript panel
The session selector dropdown appears
The most recent session transcript loads automatically if available
If no transcript exists yet (no sessions recorded), show an empty state inside the now-unlocked panel:

Text: "No transcripts yet. Start a session to record your first transcript."
CTA: "Go to AI Transcriber" → navigates to /ai-transcriber




Change 8: AI Transcriber Joining Sessions — State Visibility
State A (Pre-Trial):

On the Appointments page or any session start flow, there is NO "Start AI Transcriber" button or join option visible
AI Transcriber joining is not offered, not shown, not mentioned on appointment pages

State B (Post-Trial):

On the Appointments page or session start flow, show "Start AI Transcriber" option for the session
On click → AI Transcriber joins and begins recording
This surfaces the transcriber at the natural moment (when a session is about to start) rather than requiring the provider to go to the Tools page first


Change 9: Free Trial Banner — State A Hidden, State B Visible

The collapsible free trial banner (already built) must only appear in State B
In State A, no banner is shown on any tool page — the locked empty states and locked panels already communicate the trial prompt
Do not show both the banner AND the locked state simultaneously — that would be redundant


Summary State Table
UI ElementState A (Free)State B (Trial/Paid)AI Transcriber cardShows trial popup on clickOpens tool directlyAI Transcriber pageLocked empty state with CTAFull page as builtRight panel (Notes/Rx)Slim locked panel with CTAFull transcript panelFill with AI buttonHiddenShown (direct only)Import row (Notes/Rx)Visible as trial hookHiddenFree trial bannerHiddenVisible and collapsibleStart AI Transcriber (Appointments)HiddenVisible

Constraints

Manual Session Notes creation — fully free, no restriction, no change in State A
Manual Prescription creation — fully free, no restriction, no change in State A
Do not change Resources tool in any way
Do not change Messages, Billing, Clients, or Appointments pages beyond the "Start AI Transcriber" addition in Change 8
Do not change any existing State B flows — all previously built functionality remains intact
All locked states must use consistent visual language: lock icon + descriptive text + single teal CTA button