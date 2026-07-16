MANTRACARE AI TRANSCRIBER — PREMIUM UI UPGRADE + WORKFLOW FIXES

1. HOME PAGE — QUICK RECORD CARD
The Quick Record card must be centered on the page, wider, and feel premium. Current card is too small and compact. Changes:
Card: max-width 640px, centered horizontally and vertically in the page content area. Add top margin so it sits in the visual center of the viewport, roughly 20vh from top. Background white, border 1px #E2E8F0, border-radius 20px, padding 32px. Subtle box-shadow: 0 4px 24px rgba(0,0,0,0.06).
Add a header section at the top of the card before the inputs:

Large mic icon, 48px, color #00c0ff, centered
Below icon: text "Start a new session" — 18px, semibold, centered, color #0F172A
Below that: "Select your client and note type to begin recording" — 13px, color #94A3B8, centered
20px gap below this header before the inputs row

Inputs row: two inputs side by side with 8px gap.

Left input (client selector): flex-1, height 44px, border 1.5px #E2E8F0, border-radius 12px, background #F8FAFC, placeholder "Search or select client", 14px text. On focus: border color #00c0ff with a soft glow shadow (0 0 0 3px rgba(0,192,255,0.12)). Left padding 14px, right padding 36px for the chevron icon.
Right input (note type): width 110px, height 44px, same styling. Shows SOAP / DAP / BIRP / PIRP options.

Start Recording button: full width, height 52px, background #043570, border-radius 14px, text "🎤 Start Recording" — 15px bold white. On hover: background #032a5a, slight scale 1.005. No recent sessions list below. Nothing else in the card.

2. CLIENT DROPDOWN — ADD NEW CLIENT OPTION
At the bottom of the client dropdown list, after all existing clients, add a divider line then a special row:
Row: "+ Add new client" — 14px, color #00c0ff, bold, with a Plus icon on the left (16px). Background transparent. On hover: background #f0fbff.
When this row is clicked, close the dropdown and open the Add Client modal — the exact same modal/slide panel that opens when clicking "Add Client" on the /clients page. Do not create a new modal. Reuse the existing AddClientModal component by lifting its open state or passing a trigger prop. After the client is created and saved, automatically select that new client in the Quick Record card dropdown and close the modal.

3. RECORDING SCREEN — NO CHANGES NEEDED
Waveform, timer, pause/stop buttons — keep as is. Workflow is correct.

4. RECORDING COMPLETE POPUP — PREMIUM REDESIGN
Current popup looks plain. Redesign it as a premium centered modal.
Modal container: max-width 520px, centered, border-radius 24px, background white, padding 0 (sections have their own padding), box-shadow 0 20px 60px rgba(0,0,0,0.15). No full-screen dark overlay — use backdrop-filter blur(4px) with rgba(0,0,0,0.3) instead for a premium frosted effect.
Top section: background linear-gradient(135deg, #043570 0%, #0a5ca8 100%), border-radius 24px 24px 0 0, padding 28px 32px 24px.

Top row: green checkmark circle icon (24px, white bg with green check) on left, "Recording complete" text 18px bold white next to it.
Below: "[Client Name] · [mm:ss] · [Note Type]" — 13px, white at 70% opacity.
If no client was selected, show "No client selected" in orange/amber to signal it.

Middle section: background white, padding 24px 32px.

"Session Date" and "Session Time" side by side — labels 12px gray above, inputs 44px height, border 1.5px #E2E8F0, border-radius 10px. Pre-filled with today's date and current time.
"Brief overview" label 12px gray, textarea 80px height, border 1.5px #E2E8F0, border-radius 10px, placeholder text.
16px gap between fields.

Bottom section: background #F8FAFC, border-radius 0 0 24px 24px, padding 20px 32px, border-top 1px #F1F5F9.
Row 1: two buttons side by side with space-between.

Left: "Cancel" — text button, 14px, color #94A3B8, no border, no background.
Right: "Save" — 44px height, background #F1F5F9, border 1.5px #E2E8F0, border-radius 10px, color #374151, 14px semibold. On hover: background #E2E8F0.

Row 2: two full-width tinted action buttons side by side, 8px gap, margin-top 10px.

Left: "📋 Prepare Session Notes" — height 48px, background #EEF2FF, border 1.5px #C7D2FE, border-radius 12px, color #2563EB, 13px bold. Icon on left 16px. On hover: background #E0E7FF.
Right: "💊 Prepare Prescription" — height 48px, background #FDF2F8, border 1.5px #FBCFE8, border-radius 12px, color #DB2777, 13px bold. Icon on left 16px. On hover: background #FCE7F3.

Both buttons must be visually equal in weight. They are the primary CTAs.

5. SESSION NOTES FORM — PRE-FILLED AFTER CLICKING "PREPARE SESSION NOTES"
When the user clicks "Prepare Session Notes" from the Recording Complete popup, navigate to /clients/[id]/notes/add with the session data passed via route state:
navigate("/clients/1/notes/add", {
  state: {
    source: "transcriber",
    sessionId: "new-session-id",
    clientName: selectedClient,
    sessionDate: sessionDate,
    sessionTime: sessionTime,
    noteType: noteType,
    briefOverview: briefOverview,
    prefilled: true
  }
})
On the Session Notes add form, check for location.state.prefilled === true. If true:

Pre-fill the client field with clientName from state
Pre-fill the date field with sessionDate from state
Pre-fill the note type selector with noteType from state (SOAP/DAP/BIRP/PIRP)
Pre-fill the brief overview / presenting problem field with briefOverview from state
Show a teal info banner at the top of the form: "Session data pre-filled from your AI recording. Click Generate with AI to create the full note." — with a small microphone icon on the left.
The "Generate with AI" button must be visually prominent — large, full width, primary blue, with a sparkles icon. It should NOT auto-generate. The user must click it deliberately to trigger generation. Only after clicking does the AI start filling the SOAP/DAP/BIRP sections.


6. PRESCRIPTION FORM — PRE-FILLED AFTER CLICKING "PREPARE PRESCRIPTION"
Same pattern as Session Notes. Navigate to /clients/[id]/prescriptions/create with route state:
navigate("/clients/1/prescriptions/create", {
  state: {
    source: "transcriber",
    sessionId: "new-session-id",
    clientName: selectedClient,
    sessionDate: sessionDate,
    noteType: noteType,
    briefOverview: briefOverview,
    prefilled: true
  }
})
On the prescription form, check for location.state.prefilled. If true:

Pre-fill client name
Pre-fill date
Pre-fill diagnosis/notes field with briefOverview
Show a pink/rose info banner: "Session data pre-filled from your AI recording. Review and click Generate with AI to create the prescription."
The medication fields, dosage, instructions must remain empty. Only the metadata fields are pre-filled.
"Generate with AI" button: large, full width, primary action, must be clicked by user — does not auto-trigger.


7. VISUAL TOKENS FOR PREMIUM FEEL
All modals and cards throughout the transcriber workflow should use these tokens consistently:
Border radius — cards: 20px, modals: 24px, inputs: 10–12px, buttons: 12–14px
Shadows — cards: 0 4px 24px rgba(0,0,0,0.06), modals: 0 20px 60px rgba(0,0,0,0.15), buttons (primary): 0 4px 12px rgba(4,53,112,0.25)
Input focus ring: 0 0 0 3px rgba(0,192,255,0.15) with border-color #00c0ff
Font weights — headings: 600, labels: 500, body: 400, muted: 400 color #94A3B8
Primary navy: #043570, Primary cyan: #00c0ff, Success: #10b981, Warning: #F59E0B
Backdrop for modals: backdrop-filter blur(4px), background rgba(15,23,42,0.3) — NOT solid black.

8. AI TRANSCRIBER LIST PAGE — NO CHANGES
After save, new record appears at top with Processing badge. Existing design is correct. No changes needed here.