Here's the complete detailed prompt:

---

## Prompt: Complete Settings Restructure + Credit System + Appointment AI Transcriber + Remove Trial Gating

### Core Context
We are replacing the free trial popup gating system with a unified credit-based subscription model. Credits are shared across all tools. Each tool consumes credits at its own rate. Providers can buy additional credits (top-up) at any time. All free trial popups and gating are removed. The banner only appears when credits are at or below the alert threshold (default 10% remaining).

---

### Change 1: Remove All Free Trial Gating Everywhere

- Remove the AI Transcriber free trial popup entirely from the codebase — it must not appear anywhere
- Remove all locked states from Session Notes right panel, Prescriptions right panel, Transcripts tab on client session page
- Remove all "Start Free Trial" CTAs from locked panels
- Remove import helper rows added for Pre-Trial state on Session Notes and Prescription add pages
- Remove the "Fill with AI" button visibility condition tied to trial state — show "Fill with AI" button always on Session Notes add page and Prescription add page regardless of state
- All tools are now accessible directly — no popup, no gating, no locked state
- The right panel (transcript panel) in Session Notes and Prescriptions is always visible and functional
- The Transcripts tab on client session page is always visible and functional
- The "+ Add Transcript" button on client session page is always visible
- The AI Transcriber page shows the full page with stats bar, transcript list, search bar, "+ Add Transcript" button — always, no locked empty state
- The free trial banner (collapsible teal banner above search bar) is hidden by default — it only appears when credits remaining fall at or below the alert threshold (default 10% of total monthly credits)
- "Try free" capsule on Tools sidebar menu item — remove it, replace with no badge or a neutral style
- Tool cards on Tools page — AI Transcriber keeps "1 free session" capsule for now until credit system is live; Session Notes and Prescriptions keep "Free" badge

---

### Change 2: Settings → Subscription Page Full Restructure

The Subscription tab currently has four sub-sections in the left sidebar: Overview, Plans & Subscriptions, Payments, Credit Usage, Manage Credits. Restructure as follows:

**New left sidebar sections (replace existing):**
1. Overview ← merged from Overview + Plans & Subscriptions
2. Payments ← updated with new content
3. Manage Credit Usage ← merged from Credit Usage + Manage Credits, renamed

---

#### Section 1: Overview (Merged Overview + Plans & Subscriptions)

**Top area — Current Plan card:**
- Plan name + Active badge (e.g. "Professional — Active")
- Billing cycle + amount (e.g. "Monthly · ₹299/month")
- Renewal date (e.g. "Renews on June 1, 2026")
- "Manage Subscription" button (right aligned)

**Below Current Plan — Usage Alerts:**
- Section title: "Usage Alerts"
- Subtitle: "Get notified when your credit usage reaches certain thresholds"
- Alert threshold input: "Alert me when credits remaining fall below X%" — default value 10%
- This is a single editable number input (not two separate toggles like currently)
- Below input: small helper text — "You'll receive a notification and see a banner on your tools when credits are low"

**Below Usage Alerts — Quick Stats row (3 cards):**
- Card 1: Credits Remaining (number) + "Resets [date]" below
- Card 2: Plan Renewal date + billing info below
- Card 3: Active Tools count (X / total) + tool names below

**Below Quick Stats — Available Plans (collapsible dropdown section):**
- Section title: "Available Plans" with a chevron to expand/collapse
- Default state: collapsed
- When expanded: show all plan cards in a horizontal row — Starter (₹0/Free), Professional (₹299/month — highlighted as Current Plan), Clinic (₹799/month), Enterprise (Custom)
- Each plan card shows: plan name, price, user/provider limit, key features list, action button (Downgrade / Current Plan / Upgrade / Contact Sales)
- Monthly / Annual toggle at the top right of this section
- This replaces the separate Plans & Subscriptions sub-section entirely

**Below Available Plans — Recent Activity:**
- Section title: "Recent Activity" with "View All →" link
- List of last 3-5 credit transactions: tool name, action, credits consumed/added, date
- Same format as currently exists

---

#### Section 2: Payments (Updated)

Three clearly separated divs/cards stacked vertically:

**Div 1 — Payment Methods:**
- Title: "Payment Methods" (left) + "+ Add Payment Method" button (right)
- Below: each saved payment method as a row:
  - Card brand icon (VISA/Mastercard etc.)
  - Card description: "Visa ending in 4567"
  - Expiry: "Expires 12/27"
  - "Default" badge on the default card
  - Action options: "Make Default" | "Remove" (as small text links on the right)
- If no payment method added: show empty state with "+ Add Payment Method" CTA centered

**Div 2 — Billing Address:**
- Title: "Billing Address" (left) + "Edit" link (right)
- On clicking "Edit" → inline editing activates, all fields become editable inputs, Edit button changes to "Save" and "Cancel"
- Fields displayed in a 2-column grid:
  - Row 1: Street Address | City
  - Row 2: State / Province | Postal Code
  - Row 3: Country (full width)
- Sample data:
  - Street Address: 123 Healthcare Ave, Suite 100
  - City: San Francisco
  - State: CA
  - Postal Code: 94102
  - Country: United States
- When not in edit mode: fields display as read-only text

**Div 3 — Transaction History:**
- Title: "Transaction History"
- Table with columns: Date | Description | Amount | Status | Invoice
- Status shown as colored badge: "Paid" (green), "Pending" (yellow), "Failed" (red)
- Invoice column: "Download" link for each row
- Sample data:
  - May 1, 2026 | Professional Plan (Annual) | ₹1,896 | Paid | Download
  - Apr 1, 2026 | Professional Plan (Monthly) | ₹158 | Paid | Download
  - Mar 1, 2026 | Professional Plan (Monthly) | ₹158 | Paid | Download
  - Feb 10, 2026 | Credits purchased (100 credits) | ₹149 | Paid | Download
- Table is paginated or has "Load more" if more than 10 rows

---

#### Section 3: Manage Credit Usage (Merged Credit Usage + Manage Credits, Renamed)

**Top stats row (2 cards side by side):**
- Card 1 — Free Credits: number + "Resets on [date]" below
- Card 2 — Purchased Credits: number + "Never expires" below
- Below the two cards: "Total Credits Available: [number]" in larger text + "Buy Credits" button (right aligned, teal)

**Below total — Free: What's Included section:**
- Title: "Free — What's Included" + "Resets [date]" (right)
- Subtitle: "Each credit type can only be used for its own tool"
- Rows for each tool with free credits: e.g. "AI Transcriber — 0 of 1 free session used"

**Below — Tool Credit Allocation section:**
- Title: "Set Credit Limits Per Tool"
- Subtitle: "Control how much of your total credits each tool can use. Leave blank for no limit."
- For each tool (AI Transcriber, AI CRM, and any other credit-consuming tools):
  - Tool name row with a percentage input field on the right
  - Placeholder: "No limit" when empty
  - Example: AI Transcriber [___10___] % of total credits
  - Below input: shows calculated absolute value — "(= 30 of 300 credits)"
  - When a limit is set, a progress bar appears below showing current usage vs limit

**Below — Per Tool Credit Usage Cards:**
- One card per credit-consuming tool
- Each card contains:
  - Tool icon + Tool name (bold)
  - (i) icon on the top right — on hover shows tooltip: e.g. "AI Transcriber uses 1 credit per 10 words transcribed"
  - Credits used this month: "72 credits used"
  - If limit is set: progress bar showing "72 of 100 credits (limit)" with percentage filled in teal
  - If no limit set: just the number, no bar
  - Small text below: "Resets [date]"

**Below — Transaction/Activity History:**
- Title: "Credit Activity"
- Filter dropdown top right: "All Tools" | "AI Transcriber" | "AI CRM" etc.
- Table columns: Transaction ID | Tool | Type | Description | Credits | Date & Time
- Credits column: negative in red (e.g. "−5 credits") for usage, positive in green (e.g. "+100 credits") for top-ups
- Sample rows as currently shown in Credit Usage page (Images 7)
- Paginated

**Below — Buy Credits (Lever System):**
- Title: "Buy More Credits"
- Subtitle: "Credits never expire and can be used across all tools"
- A horizontal slider (like Apollo's add credits slider — Image 3):
  - Slider range: 50 credits → 5000 credits in steps
  - Above slider left: selected amount label — e.g. "500 credits"
  - Above slider right: price — e.g. "₹749"
  - Tick marks below slider at key values: 50 / 100 / 250 / 500 / 1000 / 2500 / 5000
- Below slider: "Buy [X] Credits for ₹[Y]" button (teal, full width of the section)
- Below button: small text — "Credits are added instantly to your account and never expire"

**Auto-reload section (below Buy Credits):**
- Toggle: "Auto-reload" on/off
- When toggled on, show two fields:
  - "Reload when credits fall below: [___] credits" input
  - "Add automatically: [dropdown — 50 credits (₹149) / 100 credits (₹249) / 250 credits (₹499)]"
- Helper text: "Ensure you never run out of credits mid-session"

---

### Change 3: Free Trial Banner — Credit-Based Trigger

The collapsible free trial banner that was previously always visible on tool pages must now behave as follows:

- **Hidden by default** — does not appear when credits are healthy
- **Appears automatically** when credits remaining fall at or below the alert threshold (default 10% of total monthly credits, configurable in Overview → Usage Alerts)
- Banner content update — replace "free trial" language with credit-warning language:
  - Left text: **"You're running low on credits — top up to keep your sessions uninterrupted"** (bold)
  - Right button: "Buy Credits →" — clicking redirects to Settings → Subscription → Manage Credit Usage (scrolled to Buy Credits section)
- Collapsed state shows only the label row + chevron
- Expanded state shows a credit usage bar:
  - Left label: "0 credits"
  - Right label: "[total] credits"
  - Filled portion: credits used (red/orange when low)
  - Remaining portion: grey
- This banner appears on: AI Transcriber page, Session Notes page, Prescriptions page — same placement above search bar

---

### Change 4: Add AI Transcriber Option in Appointment Booking Flow

Currently the "Add AI notetaker in the meeting" checkbox exists only in the Messages → Start Video Session flow (Image 16). It must also appear in the Appointments → Book Session flow.

**Where to add it:**

In the appointment booking flow (Images 10-13), after the provider selects session type (Video/Chat) and before the final "Confirm Appointment" button on the Schedule Appointment modal (Image 12):

Add a new section below the Location dropdown and above the Confirm button:

```
─────────────────────────────────────────────
☑  Add AI Transcriber to this session    [AI]
   Automatically transcribe and generate 
   session notes after the session ends
─────────────────────────────────────────────
```

- Checkbox style matching the existing "Add AI notetaker" checkbox in Image 16
- Default state: unchecked
- Label: "Add AI Transcriber to this session" with the teal AI badge icon
- Subtext: "Automatically transcribe and generate session notes after the session ends"
- This checkbox appears on both Video and Chat session types
- On the confirmation screen (Image 13 — showing Dr. Michael Brown ↔ Sarah Jenkins summary), if AI Transcriber was checked, add a small line: "AI Transcriber: Enabled" below the Duration line
- On the "Appointment Request Sent" confirmation (Image 14): if AI Transcriber was enabled, add it to the Next Steps:
  - Add step: "Your AI Transcriber will automatically join and transcribe this session"

**Also add to the "Record" button flow on existing appointments (Image 10 — David Miller card with "Record" button):**
- Clicking "Record" on an existing appointment card → opens the same Start Video Session modal as in Messages flow (Image 16) with the "Add AI notetaker in the meeting" checkbox already shown and pre-checked by default

---

### Change 5: How Credits Work — Tooltip/Info System

Add an (i) info icon next to "Credits" wherever credits are mentioned across the product. On hover the tooltip shows:

- On AI Transcriber page: "1 credit = 10 words transcribed. A typical 45-min session uses approximately 600 credits."
- On Session Notes page: "Session notes created manually are free. AI-assisted auto-fill from transcript uses credits from your AI Transcriber balance."
- On Prescriptions page: "Prescriptions created manually are free. AI-assisted auto-fill from transcript uses credits from your AI Transcriber balance."
- On Manage Credit Usage cards: tool-specific tooltip as defined in Change 2

---

### Constraints
- Do not change any existing page layouts outside of Settings → Subscription
- Do not change the Messages flow — "Add AI notetaker" checkbox there remains unchanged
- Do not change Resources tool in any way
- Do not change Clients, Billing (separate from Settings), or Home pages
- All existing appointment booking functionality remains intact — only the AI Transcriber checkbox is added
- The credit slider in Buy Credits must be interactive — dragging it updates the credit amount and price in real time
- All sample data shown in this prompt must be reflected in the UI as placeholder/demo data
- Inline editing on Billing Address must validate inputs before saving
- Transaction History Download links can be non-functional placeholders for now
- Auto-reload toggle must show/hide the sub-fields dynamically on toggle