Looking at all your screenshots carefully — the actual implemented design, the MantraAssist billing reference, and the credit management screens. Let me write a precise update prompt.

---

**FIGMA PROMPT — Updated Flow v2**
*Corrections to the implemented design + new screens to add*

---

## What to REMOVE / CHANGE from current implementation

**1. Remove the credit widget from the sidebar entirely.**
The "AI Credits / 28 of 100 credits remaining" bar at the bottom of the sidebar is gone. That real estate belongs to the nav. Credits live in Billing > Settings only (like MantraAssist's pattern).

**2. Move the "1 free session" / "Included in plan" badge from bottom of card to top-right corner.**
Currently the badge sits below the description text. Reposition it as an absolute-positioned pill in the **top-right corner** of each tool card, overlapping the card border slightly. Same styling as current — just repositioned. Think of it like a product tag on a shelf item.

**3. The "Try free" capsule on the Tools nav item stays exactly as implemented** — that's correct. No changes to the sidebar nav itself.

---

## Updated Flow: Step-by-Step

---

### Screen 1 — Tools Page (update existing frame)

Keep everything as-is except:

**Badge repositioning on each tool card:**
- Remove badge from below description text
- Add badge as `position: absolute`, `top: -1px`, `right: 16px`
- Badge floats at the top-right corner of the card, partially overlapping the top border
- For AI tools: green pill `"✦ 1 free session"` — background `#E1F5EE`, border `0.5px solid #5DCAA5`, text `#085041`, 11px weight 500, border-radius `20px`, padding `4px 12px`
- For included tools (Resources, Session Notes, Tasks, Prescriptions): blue pill `"Included in plan"` — background `#E6F1FB`, border `0.5px solid #85B7EB`, text `#185FA5`, same sizing

**Make the badge itself clickable** — tapping the green "1 free session" badge opens the Free Trial Pricing Popup (Screen 2 below). The whole card click still navigates into the tool. Only the badge triggers the popup.

---

### Screen 2 — Free Trial Pricing Popup (NEW — modal overlay on Tools page)

Triggered when user clicks the `"1 free session"` badge on any AI tool card.

**Modal overlay:** Full screen dim `rgba(0,0,0,0.4)` behind modal. Click outside to dismiss.

**Modal box:**
- Width `420px`, centered on screen, border-radius `16px`, background white, border `0.5px solid #E5E7EB`, padding `28px`
- No drop shadow — flat surface matching existing card style

**Modal contents top to bottom:**

**A. Header row** — flex row, space-between, align-items flex-start
- Left side:
  - Small tool identity chip: tool icon (e.g. microphone emoji in a 32×32 rounded square, background `#FEE9C7`) + tool name `"AI Transcriber / Notes"` — 13px weight 500 `#111827`. This should dynamically match whichever tool's badge was clicked.
  - Below chip: heading `"Begin your free trial"` — 20px weight 600 `#111827`, margin-top `10px`
  - Subtext: `"14 days free — no card required"` — 13px `#6B7280`
- Right side: `✕` close icon button, 20px, `#9CA3AF`

**B. Divider** — `0.5px solid #E5E7EB`, full width, margin `16px 0`

**C. "What's included in your trial" section**
- Section label: `"What's included"` — 11px uppercase weight 500 `#9CA3AF`, letter-spacing `0.06em`
- List of 4 feature rows, each row: checkmark icon (`✓` in `#0F6E56`) + feature text 13px `#374151`, vertical gap `10px` between rows
- For AI Transcriber specifically:
  - `"Unlimited session recordings for 14 days"`
  - `"AI-generated transcripts & session notes"`
  - `"Download and export transcripts"`
  - `"Access to session history"`

**D. Divider** — same as above

**E. "After your trial" section**
- Section label: `"After your trial ends"` — 11px uppercase weight 500 `#9CA3AF`
- Pricing explanation block — border-radius `10px`, background `#F9FAFB`, border `0.5px solid #E5E7EB`, padding `14px 16px`
- Inside: two rows
  - Row 1: `"Per session"` left (13px `#6B7280`) — `"10 credits"` right (13px weight 500 `#111827`)
  - `0.5px` divider between rows
  - Row 2: `"100 credits"` left (13px `#6B7280`) — `"₹99 / top-up"` right (13px weight 500 `#111827`)
- Below block: small text `"Or get credits included in a plan — starting ₹299/mo"` — 11px `#6B7280`, with `"See plans →"` as an inline link in `#1EAAE7`

**F. CTA buttons** — margin-top `20px`
- Primary button full width: `"Begin free trial"` — background `#1EAAE7`, white text, 14px weight 500, border-radius `10px`, padding `14px`, no border
- Ghost button full width below, margin-top `8px`: `"Maybe later"` — background transparent, border `0.5px solid #D1D5DB`, text `#6B7280`, 13px, same padding as primary

---

### Screen 3 — Settings Page: Add "Billing & Credits" Section (NEW)

This is a new sub-section inside the existing Settings page. Looking at the current Settings frame (which has tabs: Availability, Practice Details, Team/Providers, Notifications) — add a fifth tab:

**New tab: `"Billing & Credits"`**
- Same styling as existing tabs (dark navy pill for active state matching the existing `#1E3A8A` tab color, white text)
- Tab icon: credit card icon from existing icon set

**Billing & Credits tab content** — modeled directly on MantraAssist's Settings > Billing pattern (images 8–13). Left sidebar within the tab for sub-navigation, right panel for content.

**Left sub-nav** (inside the tab content, not the main sidebar):
- `Overview` 
- `Plans & Subscriptions`
- `Payments`
- `Credit Usage`
- `Manage Credits`

Style: plain text links, 13px `#374151`, active state gets left border `3px solid #1EAAE7` + text `#1EAAE7` + background `#EFF6FF`, border-radius `0 6px 6px 0`, matching MantraAssist's sub-nav style exactly.

---

### Sub-screen 3A — Overview (default active)

Right panel content:

**Section: Current Subscription**
- Label `"Current Subscription"` — 16px weight 600 `#111827`
- Subscription card: border `0.5px solid #E5E7EB`, border-radius `12px`, padding `20px`
  - Left: `"Professional"` 15px weight 600 + active badge (pill: background `#D1FAE5`, text `#065F46`, `"Active"`, 11px) — matching the MantraAssist green Active badge exactly
  - Below badge: `"Monthly · ₹299/month"` — 13px `#6B7280`
  - Below: `"Renews on June 1, 2026"` — 13px `#6B7280`
  - Right: `"Manage Subscription"` button — dark navy fill `#1E3A8A`, white text, border-radius `8px`, 13px weight 500, padding `10px 18px`

**Section: Usage Alerts** — margin-top `24px`
- Label + subtext matching MantraAssist pattern: `"Usage Alerts"` — 16px weight 600, below it `"Get notified when your credit usage reaches certain thresholds"` — 13px `#6B7280`
- Two toggle rows (matching the MantraAssist toggle style — dark pill toggle):
  - `"70% Usage Alert"` + toggle (on state)
  - `"90% Usage Alert"` + toggle (on state)
- Toggles: same dark navy/black active state as MantraAssist screenshots

---

### Sub-screen 3B — Plans & Subscriptions

Mirror the MantraAssist Plans page (image 9) adapted for MantraCare:

**User count adjuster:**
- `"How many providers do you have?"` — 15px weight 500
- Minus / number / Plus stepper, same style as MantraAssist
- `"Adjust team size to see updated pricing"` — 12px `#6B7280`

**Billing toggle:** Monthly / Annual with `"Save 20%"` badge — same pill toggle style

**Plan cards row** — 4 cards: Starter, Basic, Professional (current, highlighted with blue border `1.5px solid #1EAAE7`), Enterprise

Each card:
- `"Current Plan"` badge on Professional card — same small label as MantraAssist
- Plan name, price per month, per-user breakdown, annual billing note
- CTA: `"Choose [Plan]"` ghost button for others, `"Current Plan"` filled navy button for active

---

### Sub-screen 3C — Payments

Exact mirror of MantraAssist Payments screen (image 10):

- `"Payment Methods"` section heading
- Visa card row: Visa logo + `"Visa ending in 4567"` + `"Expires 12/27"` + `"Default"` label in `#1EAAE7`
- `"+ Add Payment Method"` outlined button — border `1px solid #1EAAE7`, text `#1EAAE7`, border-radius `8px`
- `"Billing Address"` section below with address pre-filled

---

### Sub-screen 3D — Credit Usage

Mirror of MantraAssist Credit Usage screen (images 11–12):

**Header area:**
- Title `"Credit Usage"`, subtitle `"Real-time overview of your AI credit consumption"`
- Three filter dropdowns right-aligned: `"This Month"` / `"All Types"` / `"All Users"` — matching MantraAssist dropdown style

**Credit Usage Over Time chart:**
- Line chart, single blue line (`#1EAAE7`), same axis style as MantraAssist
- Tooltip on hover: white card showing date + `"usage: 380"` in `#1EAAE7`
- X-axis: dates (May 1–May 10), Y-axis: credit numbers

**Usage by Type donut chart:**
- Center: total credits number + `"Total Usage"` label
- Segments: AI Transcriber (darkest blue `#1E3A8A`), AI CRM (mid blue `#1EAAE7`), Session Notes (lighter blue `#93C5FD`), Other (lightest `#BFDBFE`)
- Legend right of donut, matching MantraAssist legend style

**Transaction History table:**
- Same dark navy header row as MantraAssist (`#1E3A8A` fill, white text)
- Columns: Transaction ID, Tool, Type, Description, Credits, Date
- Credits column: red `-10` for usage (with coin icon matching MantraAssist's `🪙` style)
- Search bar top-right: `"Filter transactions..."` placeholder

---

### Sub-screen 3E — Manage Credits

Mirror MantraAssist's Manage Credits screen (image 13) adapted for AI tools:

**Top stat cards — two cards side by side:**
- Card 1: `"Free Credits"` label — large number `"1"` (remaining free sessions) — `"Resets on Jun 4, 2026"` in 12px `#6B7280` with clock icon
- Card 2: `"Purchased Credits"` label — large number `"28"` — `"Never expires"` with info icon

**Total Credits Available bar:**
- Full-width card: `"Total Credits Available"` label left + large `"29"` — `"Buy Credits"` button right (dark navy fill `#1E3A8A`, white, border-radius `20px`, matching MantraAssist's pill button exactly)

**"Free — What's Included" section:**
- Header row: `"Free — What's Included"` left + `"Resets Jun 4"` small text right
- Subtext: `"Each credit type can only be used for its own tool"`
- Feature rows with usage bars:
  - `"AI Transcriber"` — `"0 of 1 free session used"` — thin progress bar
  - `"AI CRM"` — `"0 of 1 free session used"`
- Each row: tool name left, usage fraction right, thin `#E5E7EB` track bar below spanning full width, fill in `#1EAAE7`

**"Purchased Credits" section below:**
- Same format but for paid credits by tool

---

## Prototype Connections to add

1. `Tools nav "Try free" badge` → Tools page (already done, keep)
2. `Any tool card "1 free session" badge click` → Free Trial Popup modal (Screen 2)
3. `Popup "Begin free trial" button` → Tool inner page with active trial state
4. `Popup "See plans →" link` → Settings > Billing > Plans & Subscriptions (Sub-screen 3B)
5. `Settings nav` → Settings page → `"Billing & Credits"` tab → Sub-screen 3A (Overview) as default
6. `Sub-nav "Manage Credits"` → Sub-screen 3E
7. `Sub-screen 3E "Buy Credits" button` → Credits top-up flow (simple modal: amount selector + payment confirmation reusing the card already saved in Payments)
8. `Popup "Maybe later"` → dismiss modal, stay on Tools page

---

## Design consistency rules for all new screens

- All font weights: 400 body, 500 labels, 600 headings only — never 700
- All borders: `0.5px solid #E5E7EB` default, `1.5px solid #1EAAE7` for active/highlighted cards
- Active nav/tab state: `#1E3A8A` fill (the dark navy already used in Settings tabs and Billing tabs in the screenshots) — NOT the cyan `#1EAAE7` which is for links and CTAs only
- Border-radius: `8px` inputs and small elements, `12px` cards, `16px` modals
- All new screens must be added as new frames to the same existing Figma page, labeled `[v2]` prefix
- Do not create a new Figma page — append all frames to the existing monetization flow frame sequence