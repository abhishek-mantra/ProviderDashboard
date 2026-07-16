Looking at the screenshot, the Settings page still shows the old structure (Overview, Plans & Subscriptions, Payments, Credit Usage, Manage Credits as separate items) and the Usage Alerts still shows the old two-toggle system. Here's a sharp precise prompt to force these specific changes:

---

## Prompt: Force Settings Restructure + AI Transcriber in Appointments — Targeted Fix

### Context
The previous prompt was not implemented. This prompt targets exactly two areas that are unchanged: Settings → Subscription page structure, and the Appointments booking flow. All other previously built functionality must not be touched.

---

### Fix 1: Settings → Subscription — Left Sidebar Restructure

**Current state (wrong):**
Left sidebar shows 5 items:
- Overview
- Plans & Subscriptions
- Payments
- Credit Usage
- Manage Credits

**Required state:**
Replace those 5 items with exactly 3 items:

```
Overview
Payments
Manage Credit Usage
```

- Delete "Plans & Subscriptions" as a separate sidebar item — its content moves INTO Overview
- Delete "Credit Usage" as a separate sidebar item — its content moves into "Manage Credit Usage"
- Delete "Manage Credits" as a separate sidebar item — its content moves into "Manage Credit Usage"
- Rename the merged section to exactly **"Manage Credit Usage"** — not "Manage Credits", not "Credit Usage"
- The sidebar must show exactly these 3 items and nothing else under Subscription

---

### Fix 2: Settings → Overview Page — Replace Usage Alerts Section

**Current state (wrong):**
Usage Alerts section shows two separate toggle rows:
- "70% Usage Alert" with toggle
- "90% Usage Alert" with toggle

**Required state:**
Replace both toggles entirely with a single input field:

```
Usage Alerts
Get notified when your credit usage reaches certain thresholds

Alert me when credits remaining fall below  [ 10 ] %

You'll receive a notification and see a banner on your 
tools when credits are low.
```

- Single text/number input field showing "10" as default value
- Provider can type any number 1-100
- Helper text below: "You'll receive a notification and see a banner on your tools when credits are low."
- Remove both toggle rows completely — they must not exist

---

### Fix 3: Settings → Overview Page — Add Available Plans Collapsible Section

Below the Usage Alerts section and above Quick Stats, add a collapsible section:

**Collapsed state (default):**
```
Available Plans                                          ▾
```
Single row with chevron, clicking expands

**Expanded state:**
Show 4 plan cards horizontally — Starter, Professional (marked "Current Plan"), Clinic, Enterprise — matching the existing Plans & Subscriptions page design exactly. Monthly/Annual toggle top right. Copy the plan card content from the existing Plans & Subscriptions page — do not redesign, just embed it here.

---

### Fix 4: Settings → Payments Page — Full Replacement

**Current state:** Unknown / old content

**Required state:** Three distinct card sections stacked vertically:

**Card 1 — Payment Methods:**
```
Payment Methods                          + Add Payment Method

[VISA icon]  Visa ending in 4567    Default
             Expires 12/27                    Make Default  Remove
```

**Card 2 — Billing Address:**
```
Billing Address                                              Edit

Street Address                    City
123 Healthcare Ave, Suite 100    San Francisco

State / Province                  Postal Code
CA                                94102

Country
United States
```
- "Edit" click → all fields become editable inline → Edit button becomes "Save" and "Cancel"
- "Save" → fields return to read-only display mode
- "Cancel" → discard changes, return to read-only

**Card 3 — Transaction History:**
```
Transaction History

Date          Description                      Amount   Status   Invoice
May 1, 2026   Professional Plan (Annual)       ₹1,896   Paid     Download
Apr 1, 2026   Professional Plan (Monthly)      ₹158     Paid     Download
Mar 1, 2026   Professional Plan (Monthly)      ₹158     Paid     Download
Feb 10, 2026  Credits purchased (100 credits)  ₹149     Paid     Download
```
- Status as colored badge: Paid = green, Pending = yellow, Failed = red
- Download = text link (non-functional placeholder)
- Table has border, alternating row shading optional

---

### Fix 5: Settings → Manage Credit Usage Page — Full Content

This is a new merged page replacing both Credit Usage and Manage Credits. Build it with the following sections stacked vertically:

**Section A — Credit Summary (top):**
```
[Free Credits card]          [Purchased Credits card]
1                            28
Resets on Jun 4, 2026        Never expires

Total Credits Available: 29                    [Buy Credits button - teal]
```

**Section B — Free: What's Included:**
```
Free — What's Included                              Resets Jun 4
Each credit type can only be used for its own tool

AI Transcriber          0 of 1 free session used
AI CRM                  0 of 1 free session used
```

**Section C — Set Credit Limits Per Tool:**
```
Set Credit Limits Per Tool
Control how much of your total credits each tool can use. 
Leave blank for no limit.

AI Transcriber    [ 10 ] % of total credits  (= 30 of 300 credits)
AI CRM            [    ] % of total credits  No limit
```
- When a percentage is entered, show a progress bar below that tool row
- Progress bar shows current usage vs limit in teal

**Section D — Per Tool Credit Usage Cards:**
One card per tool laid out in a 2-column grid:

Each card:
```
[Tool icon]  AI Transcriber                              (i)
72 credits used this month
[████████████░░░░] 72 of 100 credits (limit)
Resets Jun 4, 2026
```
- (i) on hover shows: "AI Transcriber uses 1 credit per 10 words transcribed. A typical 45-min session uses approximately 600 credits."
- AI CRM card (i): "AI CRM uses 1 credit per outreach action or automated workflow step."
- If no limit set: show just the number, no bar

**Section E — Credit Activity History:**
```
Credit Activity                    [Filter: All Tools ▾]

TXN ID    Tool            Type              Description                    Credits      Date & Time
TXN-001   AI Transcriber  Session Usage     Transcription by John Wilson   −5 credits   May 15, 2026 2:30 PM
TXN-002   AI Transcriber  Session Usage     Transcription by John Wilson   −5 credits   May 14, 2026 11:00 AM
TXN-003   Credits         Top-up            Purchased 100 AI Transcriber   +100 credits May 10, 2026 9:00 AM
TXN-004   AI CRM          Session Usage     CRM session by John Wilson     −1 credit    May 8, 2026 3:15 PM
```
- Negative credits in red, positive in green
- Filter dropdown: All Tools / AI Transcriber / AI CRM

**Section F — Buy Credits (Lever/Slider):**
```
Buy More Credits
Credits never expire and can be used across all tools

         500 credits                              ₹749
|──────────────●──────────────────────────────|
50    100    250    500    1000    2500    5000

[    Buy 500 Credits for ₹749    ]

Credits are added instantly to your account and never expire.
```
- Slider is interactive — dragging updates credit amount and price in real time
- Price formula: ₹1.50 per credit (example — adjust to actual pricing)

**Section G — Auto-reload:**
```
Auto-reload                                    [toggle OFF]

(when toggled ON, show:)
Reload when credits fall below:  [ 10 ] credits
Add automatically:               [50 credits (₹149)  ▾]

Ensure you never run out of credits mid-session.
```

---

### Fix 6: AI Transcriber Checkbox in Appointments Booking Flow

**Route:** `/sessions` — the Appointments page

**Where exactly to add:**

In the Schedule Appointment modal, on the step that shows date/time/session type selection (Image 12 — showing calendar, time slots, Video/Chat toggle, Location dropdown), add below the Location dropdown and above the "Confirm Appointment" button:

```
─────────────────────────────────────────────────────
☐  Add AI Transcriber to this session        [AI]
   Automatically transcribe and generate 
   session notes after the session ends
─────────────────────────────────────────────────────
```

- Checkbox unchecked by default
- Label bold: "Add AI Transcriber to this session"
- AI badge icon (teal, same as in Messages flow Image 16)
- Subtext in grey: "Automatically transcribe and generate session notes after the session ends"
- Appears for both Video and Chat session types

**On the confirmation summary screen (Image 13 — showing provider ↔ client with service/time/duration):**
- If AI Transcriber checkbox was checked: add line "AI Transcriber: Enabled" below Duration line
- If unchecked: this line does not appear

**On "Appointment Request Sent" screen (Image 14):**
- If AI Transcriber was enabled: add to Next Steps list:
  - "Your AI Transcriber will automatically join and transcribe this session"

**For the "Record" button on existing appointment cards (Image 10 — David Miller card):**
- Clicking "Record" → opens Start Video Session modal (same as Messages flow, Image 16) with:
  - "Add AI notetaker in the meeting" checkbox pre-checked by default
  - All other fields same as Messages flow

---

### Constraints
- Do not change any page outside of Settings → Subscription and Appointments (`/sessions`)
- Do not change the Messages → Start Video Session flow — it already has the AI notetaker checkbox
- Do not change any tool pages, client pages, or other settings tabs
- The sidebar restructure must update the active state highlighting correctly — clicking Overview highlights Overview, clicking Payments highlights Payments, clicking Manage Credit Usage highlights Manage Credit Usage
- The Buy Credits slider must be built as an interactive HTML range input — not a static image
- Inline editing on Billing Address must work — clicking Edit enables inputs, Save/Cancel buttons appear