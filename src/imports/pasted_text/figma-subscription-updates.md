Here's the Figma prompt:

FIGMA PROMPT — MantraEHR Subscription & Credit Usage — Targeted Updates

1. Overview Tab — Current Plan Card
Remove from the top of the card:

"Essential" heading
"Active" badge
"Free Trial Active" badge
"Monthly · $30/month" line
"Renews on June 1, 2026" line

The card now starts directly with the plan details table. No header row at all.
Move Manage Plan button from top-right of card to bottom-right, sitting flush below the last table row (Billing row). Align it to the right. Style unchanged — navy #1E3A8A background, white text, rounded-lg.
Final card structure:
┌─────────────────────────────────────────────────────┐
│ Plan                    EHR Essential · $30/month   │
│─────────────────────────────────────────────────────│
│ Credits included        30,000 credits / month      │
│─────────────────────────────────────────────────────│
│ EHR tools               AI Transcriber · Session    │
│                         Notes · Prescription ·      │
│                         Appointments · Records      │
│─────────────────────────────────────────────────────│
│ Cross-platform access   AI Reminder Calling (CRM)   │
│                         Requires 1,000 credits      │
│                         minimum · EHR tools are     │
│                         prioritised below threshold │
│─────────────────────────────────────────────────────│
│ Billing                 Monthly · renews June 1,    │
│                         2026 · cancel anytime       │
│─────────────────────────────────────────────────────│
│                                      [Manage Plan]  │
└─────────────────────────────────────────────────────┘

2. Overview Tab — Available Plans
Remove the Free plan card entirely. The grid now shows only three cards: Essential ($30) · Plus ($60) · Pro ($120).
Remove "Start free trial" button from every plan card. Replace with a single CTA button per card labeled "Get Started" — same styling as before (outlined teal for non-active plans, solid teal for current plan).
Inside each plan card — Credits included row:
Remove the sub-line "at $0.010/credit (bundle rate)" from beneath the credits count.
Credits included line now reads simply:
Includes 30,000 credits / mo
12px #6B7280. Nothing beneath it. Clean single line.

3. Manage Credit Usage — Two Summary Cards Redesign to Square
Replace the current capsule/wide cards with two equal square cards side by side. Square means: equal width and height, approximately 200×200px each, or use a 1:1 aspect ratio enforced by padding. Border #E5E7EB 1px, rounded-2xl, white background.

Square Card 1 — Org Credits
Remove entirely:

"From EHR Essential plan: 30,000"
"Individually purchased: 830"
"Plan rate: $0.010/credit"
"Purchased credits never expire"

Card content — centered vertically and horizontally inside the square:
Top label:
"Org Credits" in 11px #6B7280 uppercase tracking-wide, centered
Primary number:
"30,660" in 32px bold #111827, centered
Sub-label beneath number:
"remaining" in 12px #9CA3AF, centered
Divider line: full-width #E5E7EB 1px, 12px margin above and below
Usage bar section:

Single line above bar: "X% of total org credits used" in 11px #6B7280, centered. X = (credits used across all platforms / total org credits) × 100. Example: (170 / 30,830) × 100 = 0.6%
Bar below that line: full width of card content area, height 6px, rounded-full
Bar has two segments rendered as a stacked/split bar:

Left segment: EHR usage — teal #14B8A6
Right of that: other platform usage (CRM etc.) — purple #7C3AED
Remaining track: #E5E7EB


Below bar: two inline legend items, centered, 10px #6B7280:

Small teal square 8×8px + "EHR"
Small purple square 8×8px + "Other platforms"
Separated by 12px gap




Square Card 2 — EHR Credits
Remove entirely:

"Credits Used in EHR" label
"170" large number
"this cycle" sub-label
"170 of 30,830 total org credits" line
The existing progress bar and its labels

Card content — centered vertically and horizontally inside the square:
Top label:
"EHR Usage" in 11px #6B7280 uppercase tracking-wide, centered
Primary number:
"170" in 32px bold #111827, centered
Sub-label beneath number:
"credits used in EHR" in 12px #9CA3AF, centered
Divider line: full-width #E5E7EB 1px, 12px margin above and below
Usage bar section:

Single line above bar: "X% of org credits used by EHR" in 11px #6B7280, centered. X = (EHR credits used / total org credits) × 100. Example: (170 / 30,830) × 100 = 0.6%
Bar below: full width of card content area, height 6px, rounded-full
Teal fill #14B8A6 representing EHR's share of total org credits
Remaining track #E5E7EB
Below bar: one inline label, centered, 10px #6B7280: "of 30,830 total org credits"


4. Everything Else — No Change

Credit usage breakdown cards — unchanged
Credit history table — unchanged
Buy more credits — unchanged
Payments tab — unchanged
How it works tab — unchanged
Left navigation — unchanged
Parent tab row — unchanged
Dark mode support — maintain throughout
