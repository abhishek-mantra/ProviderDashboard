Fix Session Notes Template Default + Prescription Auto-Fill + Share Button + Free Trial Banner
Context
These fixes apply only when the user arrives from AI Transcriber (i.e. URL contains ?source=transcriber&sessionId=X) unless stated otherwise. Do not change any behavior for direct navigation unless explicitly mentioned.

Fix 1: Session Notes — Default to Basic Template When Coming from AI Transcriber
Problem: When routed from AI Transcriber, the session note form opens with SOAP Template selected by default, but it should open with Basic Template as the default.
Fix:

When source=transcriber is present in the URL, auto-select Basic Template as the active template on page load
Auto-fill the Basic Template fields using the transcript content from the session
When the user switches to a different template (e.g. SOAP, Diagnosis and Treatment, Brief Progress Note) from the dropdown:

Re-map and re-fill the same transcript content into the fields of the newly selected template
Do not clear the content — always carry the transcript data forward and populate whatever fields the new template has
The content mapping logic: use the transcript to intelligently populate whichever fields exist in the selected template


The template dropdown remains fully functional and user can switch freely


Fix 2: Prescription Form — Auto-Fill All Fields When Coming from AI Transcriber
Problem: When routed from AI Transcriber to the Create Prescription page, the form fields are not being fully pre-filled. Currently only some fields populate (Chief Complaints, Provisional Diagnosis partially). All fillable fields must be populated from the transcript.
Fix: On page load when source=transcriber is present, auto-fill the following fields from the transcript:

Chief Complaints — extract symptoms/complaints mentioned by patient in transcript
Medical History — extract any past conditions, history mentioned in transcript; if none mentioned default to "No chronic conditions"
Allergies — extract if mentioned in transcript; if not mentioned leave blank (do not default)
Provisional Diagnosis — extract or infer diagnosis from the clinical discussion in transcript
Diagnostic Tests — extract if doctor recommends any tests in transcript
Medicine — extract if any medicines are mentioned or recommended in transcript

All fields that can be filled from the transcript must be filled on page load — no manual trigger needed.

Fix 3: Prescription — "Submit Prescription" Button Must Be Active
Problem: The "Submit Prescription" button is greyed out/disabled even when the form is auto-filled from the transcript.
Fix:

When the form arrives pre-filled via source=transcriber, the Submit Prescription button must be active on page load
The button becomes active as long as at least Chief Complaints and Provisional Diagnosis are filled


Fix 4: Add "Share to Patient" Option After Submit Prescription
Fix: After clicking Submit Prescription, show a "Share to Patient" button as a post-submit action:

Label: "Share Prescription to Patient" (secondary/outline style)
On click: sends the prescription as a message to the patient in the Messages section
The message contains: patient name, date, chief complaints, diagnosis, medicines
This button appears in both the AI Transcriber flow AND direct prescription creation — it is a permanent addition to the post-submit flow


Fix 5: Free Trial Banner on All Three Tools
Applies to: AI Transcriber page, Session Notes page, Prescriptions page — placed above the search bar on each tool's main listing page.
Visual Design:
┌─────────────────────────────────────────────────────────────────┐
│  Your free trial is active — make the most of it while it lasts      Upgrade Plan →  │
│                                                                  │
│  06/05/26  ████████████████████░░░░░░░░░░░░░░░░░░░░░░  20/05/26 │
│            (filled portion = days elapsed)                       │
└─────────────────────────────────────────────────────────────────┘
Detailed specs:

Top row left: Text — "Your free trial is active — make the most of it while it lasts" (or similarly encouraging copy)
Top row right: Button — "Upgrade Plan →" in a small outlined or text-link style
Bottom row: A horizontal progress bar spanning full width of the banner

Left end label: trial start date (e.g. 06/05/26)
Right end label: trial end date (e.g. 20/05/26)
The filled/colored portion of the bar represents days elapsed since trial started
The unfilled/grey portion represents remaining trial days
The bar updates dynamically based on current date relative to start and end date


Banner background: Subtle light blue or light teal tint to distinguish it from the page background, with a thin border or soft shadow — consistent with MantraCare's existing color system
Placement: Directly above the search bar on each tool's main listing page:

AI Transcriber: above the "Search by client name..." bar (Image 8)
Session Notes: above the "Search by client name or template..." bar (Image 4)
Prescriptions: above the "Search Prescriptions..." bar (Image 10)


"Upgrade Plan" click behavior: Redirects to Settings → Subscription tab
The banner is shown only when the provider is on an active free trial for that specific tool. It is not shown if the tool is included in their paid plan or if the trial has ended.


Constraints

Do not change template dropdown functionality
Do not change how manual prescription creation works (without source=transcriber)
Do not change the right panel transcript display
Do not modify the Messages page or chat UI — only trigger sending a message programmatically to the existing conversation with that patient
Do not change any existing page layouts — the banner is an addition above the search bar, not a replacement of any element
The banner must not appear on the Tools hub page (Image 1) — only on individual tool pages
All existing flows remain unchanged