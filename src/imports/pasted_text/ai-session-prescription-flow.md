Here's the precise prompt:

Prompt: Sync AI Transcriber → Session Notes → Prescriptions Flow
Context
This is a healthcare provider dashboard (MantraCare). There are three interlinked tools: AI Transcriber, Session Notes, and Prescriptions. The goal is to create a guided flow connecting all three tools sequentially, with individual free trial popups per tool. Do not break or modify any existing functionality.

Change 1: Individual Free Trial Popups Per Tool
Currently one generic popup exists (Image 7). Replace with three separate popups, one for each tool:
AI Transcriber / Notes popup — triggered when clicking the AI Transcriber card on Tools page:

Title: "AI Transcriber / Notes"
Header: "Begin your free trial" + "14 days free — no card required"
What you get:

1 full session recording
AI-generated session notes
Full transcript export
Session history access


Buttons: "Begin free trial" (primary) | "View plans" (secondary)

Session Notes popup — triggered when clicking Session Notes card on Tools page:

Title: "Session Notes"
Header: "Begin your free trial" + "14 days free — no card required"
What you get:

Unlimited session note templates
SOAP, Progress, and custom note formats
Notes linked to client sessions
Edit and export notes anytime


Buttons: "Begin free trial" (primary) | "View plans" (secondary)

Prescriptions popup — triggered when clicking Prescriptions card on Tools page:

Title: "Prescriptions"
Header: "Begin your free trial" + "14 days free — no card required"
What you get:

Create and manage prescriptions
AI-assisted form filling from transcript
Email prescription to client
Full prescription history


Buttons: "Begin free trial" (primary) | "View plans" (secondary)

All three popups follow the same visual design as the existing popup in Image 7. "Begin free trial" proceeds to the respective tool. "View plans" redirects to Settings → Subscription.

Change 2: Post-Save Flow in AI Transcriber
Currently after saving a transcript, nothing additional happens. Update the save action as follows:
When a provider saves a transcript in the AI Transcriber tool, instead of just saving, show three action buttons on the save confirmation screen or as a bottom action bar:

Save — saves transcript only, stays on current page (existing behavior)
Prepare Session Notes — saves transcript AND navigates to Session Notes for that specific patient
Prepare Prescription — saves transcript AND navigates to Create Prescription for that specific patient

The patient context (client ID, session date, session time) must be carried forward automatically in both cases so the correct patient is pre-selected.

Change 3: Free Trial Popup Intercept on "Prepare Session Notes"
When the provider clicks "Prepare Session Notes" from the post-save flow:

Show the Session Notes free trial popup (defined in Change 1)
On clicking "Begin free trial" → navigate to the Session Notes tool for that specific patient (equivalent to clicking "+ Add Notes" from Image 5, with the patient already selected)
On clicking "View plans" → redirect to Settings → Subscription


Change 4: Free Trial Popup Intercept on "Prepare Prescription"
When the provider clicks "Prepare Prescription" from the post-save flow:

Show the Prescriptions free trial popup (defined in Change 1)
On clicking "Begin free trial" → navigate to the Create Prescription page for that specific patient (Image 14), with the patient already pre-selected and the session transcript visible in the right panel
On clicking "View plans" → redirect to Settings → Subscription


Change 5: "Try free" Capsule on Tool Cards (Already Exists — Verify)
Confirm the "Try free" capsule exists on the sidebar (Tools menu item) and on each individual tool card on the Tools page (Image 1). These capsules are already present — do not remove or modify them. They remain the entry point triggering the respective popup per Change 1.

Complete User Journey Summary
Tools page
  └─> Click AI Transcriber card
        └─> AI Transcriber free trial popup
              └─> "Begin free trial"
                    └─> AI Transcriber tool (Image 8)
                          └─> Add Transcript → Record/Upload/Type (Image 16)
                                └─> Save Transcript
                                      ├─> [Save only] → stays on AI Transcriber
                                      ├─> [Prepare Session Notes]
                                      │     └─> Session Notes free trial popup
                                      │           └─> "Begin free trial"
                                      │                 └─> Add Notes for that patient (Image 5)
                                      └─> [Prepare Prescription]
                                            └─> Prescriptions free trial popup
                                                  └─> "Begin free trial"
                                                        └─> Create Prescription for that patient (Image 14)
                                                              └─> Session transcript visible in right panel

Constraints

Do not modify any existing page layouts, navigation, or data flows
Do not change the existing "Select Client" modal on Prescriptions (Image 13) — it is only used when creating a prescription directly from the Prescriptions tool, not from this new flow
Do not change how Session Notes or Prescriptions work internally
The right panel transcript view on Session Notes (Image 6) and Prescriptions (Image 14) already exists — just ensure the correct session is auto-loaded when arriving from this flow
All existing tool cards (Resources, Tasks, AI CRM) remain unchanged