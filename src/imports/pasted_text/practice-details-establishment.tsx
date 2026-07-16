Prompt for FigMake / Lovable:

Build upon the existing MantraCare provider dashboard. Do not change anything in the sidebar, header, navigation, color scheme, typography, or any other section. Only modify the Settings → Practice Details tab.
Context on existing UI to preserve:
The dashboard has a white sidebar with dark navy background, teal/cyan active states (#00C2B2 range), light gray page background (#F4F6FA), white content cards with subtle borders, and the existing top tab navigation (Availability · Practice Details · Team/Providers · Notifications) with sub-tabs (Basic Information · Contact & Address · Billing & Additional).

What to change — Practice Details tab only:
Replace the entire content area of the Practice Details tab (all three sub-tabs: Basic Information, Contact & Address, Billing & Additional) with a new Establishments section. The sub-tab navigation bar itself should be replaced with a single heading area.

Empty state (default view — no establishment added yet):
Show a centered empty state card inside the content area. It should contain:

A subtle building/hospital icon (outline style, ~48px, in teal)
Heading: "No establishments added yet"
Subtext: "Add your clinic, hospital or diagnostic center to get listed on MantraCare's directory and reach more patients."
A prominent CTA button: "+ Create Establishment" in the same teal fill style as existing primary buttons in the dashboard

No other content. Keep the page background and card styling consistent with the rest of the settings page.

Clicking "Create Establishment" opens a multi-step wizard modal:
The modal overlays the dashboard (semi-transparent dark backdrop). The modal card should use the same white card style, border-radius, and font as the rest of the dashboard. Modal width: ~660px. It should not be full-screen.
The modal has:

A top bar with the current step title on the left and a close (×) button on the right
A horizontal step progress bar below the title showing 6 steps with labels
A scrollable body area for the step content
A sticky footer with a "Back" ghost button on the left and a teal "Continue" primary button on the right


Step 1 — Establishment Type
Title: "Choose establishment type"
Show a 3-column grid of selectable type cards. Each card has a centered icon, a bold label, and a short descriptor line below. Selecting a card highlights it with a teal border and light teal background fill. Cards:

🏥 Hospital — "Multi-specialty or single specialty hospital"
🏢 Clinic / OPD — "Outpatient clinic or doctor's office"
🔬 Diagnostic Center — "Labs, imaging and test facilities"
👶 Nursing Home — "Small inpatient nursing facility"
🦷 Dental Clinic — "Dental practice or orthodontics"
👁 Eye Care — "Ophthalmology or optometry center"

Default: first card selected.

Step 2 — Basic Information
Title: "Basic information"
Form fields (use the same input style as the rest of the dashboard — light border, rounded corners, teal focus ring):

Establishment Name (full width, required)
Two-column row: Primary Specialty (dropdown) | Years in Operation (number input)
About the Establishment (textarea, ~3 rows)
Two-column row: Bed Capacity (number, optional, label: "For inpatient facilities") | Accreditation (dropdown: Not accredited / NABH / JCI / NABH Entry Level)


Step 3 — Location & Hours
Title: "Location & hours"

Street Address (full width)
Three-column row: City | State | PIN Code
Section divider labeled "Visiting Hours"
A table-like row for each day of the week (Mon, Tue, Wed, Thu, Fri, Sat, Sun). Each row has: day label, a toggle/checkbox to mark as open, and if open — two time inputs (From / To) in the same input style. If closed, show "Closed" in muted text. Default: Mon–Sat open 9:00–19:00, Sunday closed.


Step 4 — Photos & Media
Title: "Photos & media"

Short helper text: "Upload photos of your facility — facade, reception, wards, equipment. Listings with photos get 3× more views."
An 4×2 grid of photo upload slots. Each slot is a dashed-border square with a + icon and "Add photo" label. The first slot is labeled "Cover photo" and is slightly larger or visually distinct.
Below the grid: a text input for an optional video tour URL (YouTube/Vimeo), labeled "Video tour link (optional)"


Step 5 — Services & Insurance
Title: "Services offered"

Helper text: "Select all procedures and specialties available at this establishment."
A wrap of pill/tag toggle buttons for services. Pre-populated list: Cataract Surgery, LASIK, General OPD, Radiology, Physiotherapy, Cardiology, Orthopaedics, Gynaecology, Pediatrics, Neurology, Dermatology, ENT, Psychiatry, Oncology, Nephrology, Emergency Care, ICU. Clicking a tag toggles it selected (teal fill) or unselected (border only).
Section below labeled "Insurance panels accepted" with the same tag-toggle style: Star Health, HDFC ERGO, Niva Bupa, Max Bupa, CGHS, ESI, Ayushman Bharat.


Step 6 — Review & Publish
Title: "Review & publish"
Show a clean read-only summary of all entered data organized into sections:

Establishment — Type, Name, Specialty, Accreditation
Location & Hours — Address, open days and times
Services — render selected tags as small teal pill badges
Insurance — same pill badge style

At the bottom of the body: a green-tinted info box that says: "✅ Your listing will be reviewed by our team and go live within 24 hours of submission."
The footer "Continue" button becomes "Publish Listing" on this step.

After clicking "Publish Listing":
Close the modal. Replace the empty state in the Practice Details content area with an establishment card row. The card shows:

The establishment type icon on the left
Establishment name and address as primary/secondary text
A status badge on the right: "Under Review" in an amber/orange style (consistent with existing badge styles in the dashboard)

A secondary dashed "Add another establishment" card appears below it for future additions.

Important constraints:

Do not touch the sidebar, top nav, any other settings tabs, or any other page in the dashboard
Keep all spacing, border radius, font sizes, and color tokens identical to the existing dashboard
The modal should close if the user clicks the backdrop or the × button, without saving
All form fields are optional except Establishment Name and Type — do not add validation errors for this prototype