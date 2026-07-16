Add this to the Figma prompt:

---

**FIGMA PROMPT ADDITION — Billing & Credits accessible from Settings nav directly**

---

## Settings page: add Billing & Credits as a permanent tab

Open the existing Settings page frame. It currently has four tabs: Availability, Practice Details, Team/Providers, Notifications.

**Add a fifth tab: `"Billing & Credits"`**

Tab styling — match existing Settings tabs exactly:
- Inactive state: same as Availability/Practice Details inactive style
- Active state: dark navy pill `#1E3A8A` fill, white text, same border-radius as existing active tab
- Tab label: `"Billing & Credits"` — same font size and weight as other tabs
- Tab icon: use the same icon style as other tabs — billing/card icon matching existing icon set, placed left of label with same gap

Position: fifth tab, placed after Notifications in the tab row. If the tab row wraps on smaller viewports, that is acceptable — do not compress existing tabs to fit.

---

## Billing & Credits tab: full content

When `"Billing & Credits"` tab is active, the right panel shows a two-column layout matching the MantraAssist Settings > Billing pattern:

**Left sub-navigation panel** — width `200px`, sits inside the tab content area, not the main sidebar
- Items (top to bottom):
  - `Overview`
  - `Plans & Subscriptions`
  - `Payments`
  - `Credit Usage`
  - `Manage Credits`
- Styling for each item: 13px `#374151`, padding `8px 12px`
- Active item: left border `3px solid #1EAAE7`, text `#1EAAE7`, background `#EFF6FF`, border-radius `0 6px 6px 0`
- Inactive item: no background, no border, text `#374151`
- Default active sub-item when tab is first opened: `Overview`

**Right content panel** — takes remaining width, padding `24px`

---

### Sub-screen: Overview (default)

**Section: Current Subscription**
- Heading: `"Current Subscription"` — 16px weight 600 `#111827`
- Card: border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`, margin-top `12px`
  - Left column: `"Professional"` — 15px weight 600 `#111827` + `"Active"` badge inline (background `#D1FAE5`, text `#065F46`, 11px weight 500, padding `3px 10px`, border-radius `20px`, margin-left `8px`)
  - Below: `"Monthly · ₹299/month"` — 13px `#6B7280`, margin-top `4px`
  - Below: `"Renews on June 1, 2026"` — 13px `#6B7280`, margin-top `2px`
  - Right column: `"Manage Subscription"` button — background `#1E3A8A`, white text, 13px weight 500, border-radius `8px`, padding `10px 18px`

**Section: Usage Alerts** — margin-top `28px`
- Heading: `"Usage Alerts"` — 16px weight 600 `#111827`
- Subtext: `"Get notified when your credit usage reaches certain thresholds"` — 13px `#6B7280`, margin-top `4px`
- Two toggle rows, margin-top `16px`, each row: label left + toggle right
  - Row 1: `"70% Usage Alert"` — toggle on
  - Row 2: `"90% Usage Alert"` — toggle on
- Toggle style: match existing toggle components in the dashboard — dark navy/black active state, gray inactive

---

### Sub-screen: Plans & Subscriptions

**User count adjuster** — full width card, border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`
- `"How many providers do you have?"` — 15px weight 500 `#111827`
- `"Adjust your team size to see updated pricing"` — 12px `#6B7280`, margin-top `4px`
- Stepper right-aligned: minus button `−` + number `2` + plus button `+` — same stepper style as MantraAssist, buttons `28×28`, border `0.5px solid #E5E7EB`, border-radius `6px`

**Billing toggle** — margin-top `16px`, right-aligned
- Two-option pill toggle: `"Monthly"` / `"Annual"` 
- `"Annual"` option has `"Save 20%"` badge inline — background `#FEF3C7`, text `#92400E`, 10px weight 500, padding `2px 8px`, border-radius `10px`
- Active option: dark navy `#1E3A8A` fill, white text
- Inactive option: white fill, `#6B7280` text

**Plan cards** — 4 cards in a row, gap `12px`, margin-top `20px`

Card structure (same for all 4, vary content):
- Border-radius `12px`, border `0.5px solid #E5E7EB`, padding `20px`
- Professional card only: border `1.5px solid #1EAAE7` + `"Current Plan"` label above card name (11px `#1EAAE7` weight 500)

Card 1 — Starter:
- Name: `"Starter"` — 15px weight 600
- Description: `"For small teams getting started"` — 12px `#6B7280`
- Price: `"₹99/mo"` — 22px weight 600, below `"₹49/user/mo × 2 users"` — 11px `#6B7280`
- CTA: `"Choose Starter"` — ghost button, full width, border `0.5px solid #D1D5DB`, `#111827` text

Card 2 — Basic:
- Name: `"Basic"`, description `"For growing teams"`, price `"₹499/mo"`, sub `"₹249/user/mo × 2 users"`
- CTA: `"Choose Basic"` — ghost button

Card 3 — Professional (current):
- `"Current Plan"` label above in `#1EAAE7`, 11px weight 500
- Name: `"Professional"`, description `"For teams scaling their operations"`, price `"₹999/mo"`, sub `"₹499/user/mo × 2 users"`
- CTA: `"Current Plan"` — filled `#1EAAE7`, white text, full width

Card 4 — Enterprise:
- Name: `"Enterprise"`, description `"For large organizations"`, price: `"Custom pricing"` — 18px weight 600 `#1EAAE7`
- CTA: `"Contact Sales"` — filled `#111827`, white text, full width

---

### Sub-screen: Payments

**Payment Methods section**
- Heading: `"Payment Methods"` — 16px weight 600 `#111827`
- Saved card row: border `0.5px solid #E5E7EB`, border-radius `10px`, padding `16px`, margin-top `12px`
  - Left: Visa logo block (dark navy rectangle `#1E3A8A`, `"VISA"` white text, 40×26, border-radius `4px`) + `"Visa ending in 4567"` 13px weight 500 `#111827` + `"Expires 12/27"` 12px `#6B7280` below
  - Right: `"Default"` label — 12px `#1EAAE7` weight 500
- `"+ Add Payment Method"` button — margin-top `12px`, border `1px solid #1EAAE7`, text `#1EAAE7`, background white, border-radius `8px`, padding `10px 18px`, 13px weight 500

**Billing Address section** — margin-top `24px`
- Heading: `"Billing Address"` — 16px weight 600 `#111827`
- Address block: border `0.5px solid #E5E7EB`, border-radius `10px`, padding `16px`, margin-top `12px`
- Pre-filled text: `"123 Healthcare Ave, Suite 100"` / `"Mumbai, MH 400001"` / `"India"` — 13px `#374151`, line-height `1.8`
- `"Edit"` link top-right of the block — 12px `#1EAAE7`

---

### Sub-screen: Credit Usage

**Header**
- Heading: `"Credit Usage"` — 20px weight 600 `#111827`
- Subtext: `"Real-time overview of your AI credit consumption"` — 13px `#6B7280`
- Three filter dropdowns right-aligned: `"This Month"` / `"All Types"` / `"All Users"` — border `0.5px solid #E5E7EB`, border-radius `8px`, 13px `#374151`, padding `8px 12px`, chevron right

**Credit Usage Over Time chart** — margin-top `20px`
- Container: border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`
- Heading inside: `"Credit Usage Over Time"` — 14px weight 500 `#111827`
- Line chart: single line, color `#1EAAE7`, smooth curve
- X-axis: dates (May 1–May 10), Y-axis: credit values (0, 95, 190, 285, 380)
- Hover tooltip: white card, border `0.5px solid #E5E7EB`, border-radius `8px`, `"May 4"` in 12px `#111827` + `"usage: 380"` in 12px `#1EAAE7`

**Usage by Type** — margin-top `16px`
- Container: same card style
- Heading: `"Usage by Type"` — 14px weight 500 `#111827`
- Donut chart center: total number large + `"Total Usage"` label 12px `#6B7280`
- Segments: AI Transcriber `#1E3A8A`, AI CRM `#1EAAE7`, Session Notes `#93C5FD`, Other `#BFDBFE`
- Legend right of donut: color dot + label, 13px `#374151`, gap `8px` between items

**Transaction History table** — margin-top `16px`
- Container: same card style
- Heading: `"Transaction History"` left + search input right (`"Filter transactions..."` placeholder, border `0.5px solid #E5E7EB`, border-radius `8px`, padding `8px 12px`)
- Table header row: background `#1E3A8A`, white text, 11px weight 500 uppercase, padding `12px 16px`
- Columns: Transaction ID / Tool / Type / Description / Credits / Date
- Body rows: alternating white / `#F9FAFB`, 13px `#374151`, padding `12px 16px`, bottom border `0.5px solid #E5E7EB`
- Credits column: red `-10` with coin icon for usage deductions

---

### Sub-screen: Manage Credits

**Two stat cards side by side** — gap `12px`

Card 1:
- Label: `"Free Credits"` — 13px `#6B7280`
- Value: `"1"` — 32px weight 600 `#111827`
- Below: clock icon + `"Resets on Jun 4, 2026"` — 12px `#6B7280`
- Border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`

Card 2:
- Label: `"Purchased Credits"` — 13px `#6B7280`
- Value: `"28"` — 32px weight 600 `#111827`
- Below: info icon + `"Never expires"` — 12px `#6B7280`
- Same border/radius/padding

**Total Credits Available** — full width card, margin-top `12px`
- Border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`
- Left: `"Total Credits Available"` — 13px `#6B7280` + `"29"` — 28px weight 600 `#111827`
- Right: `"Buy Credits"` button — background `#1E3A8A`, white text, 13px weight 500, border-radius `20px`, padding `10px 24px`

**Free — What's Included section** — margin-top `20px`
- Header row: `"Free — What's Included"` left (14px weight 500 `#111827`) + `"Resets Jun 4"` right (12px `#6B7280`)
- Subtext: `"Each credit type can only be used for its own tool"` — 12px `#6B7280`, margin-top `2px`
- Feature rows with usage, margin-top `16px`:
  - Each row: tool name left (13px `#374151`) + `"0 of 1 free session used"` right (12px `#6B7280`)
  - Below each row: full-width progress bar — track `#E5E7EB` 6px height, fill `#1EAAE7`, border-radius `3px`
  - Gap between rows: `12px`
  - Rows: AI Transcriber / AI CRM

**Purchased Credits section** — same format, margin-top `24px`, for paid credit balances by tool

---

## Prototype connections for Settings > Billing & Credits

| Trigger | Destination |
|---|---|
| Settings page `"Billing & Credits"` tab | Billing & Credits > Overview (default) |
| Sub-nav `"Plans & Subscriptions"` | Plans sub-screen |
| Sub-nav `"Payments"` | Payments sub-screen |
| Sub-nav `"Credit Usage"` | Credit Usage sub-screen |
| Sub-nav `"Manage Credits"` | Manage Credits sub-screen |
| Manage Credits `"Buy Credits"` button | Credits top-up modal |
| Plans card `"Manage Subscription"` | Overview sub-screen |
| Popup `"View plans"` anywhere in the app | Settings > Billing & Credits > Plans tab |
| Main sidebar `"Settings"` nav item | Settings page, `"Billing & Credits"` tab accessible as fifth tab alongside existing four |