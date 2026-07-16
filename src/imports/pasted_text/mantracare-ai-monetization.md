Here's a comprehensive Figma prompt you can paste directly into Figma AI or hand to your designer:

---

**FIGMA DESIGN PROMPT — MantraCare AI Tools Monetization Layer**
*Implement as new frames/components layered onto the existing Partner Dashboard without modifying existing screens*

---

## Global Design Tokens (match existing dashboard)

Use the existing MantraCare design system throughout. Key references:
- Primary blue: `#1EAAE7` (matches the active nav/CTA color already in the dashboard)
- Sidebar width: 248px, white background
- Card border: `0.5px solid #E5E7EB`, border-radius `12px`
- Body font: Inter or the existing dashboard font
- Nav active state: `#1EAAE7` fill, white text, border-radius `8px`
- All new components should feel native — no drop shadows, no gradients, flat surfaces only

---

## Frame 1 — Home Page with Discovery Banner

**Canvas size:** 1440 × 900 (desktop)

Duplicate the existing Home screen frame. Add one new component at the top of the main content area, above "Your day" stats:

**Component: AI Tools Discovery Banner**
- Container: full content width, border-radius `10px`, background `#E6F1FB`, border `0.5px solid #B5D4F4`, padding `16px 20px`
- Left side: Icon — use a ✦ or sparkle SVG, 20×20, color `#185FA5`
- Title text: `"New: AI tools — try free, pay only if you love them"` — Inter 14px, weight 500, color `#0C447C`
- Subtitle text: `"AI Transcriber, AI CRM, and more — one free session each, no card needed"` — Inter 12px, weight 400, color `#185FA5`, margin-top `4px`
- Button row, margin-top `12px`, gap `8px`:
  - Primary CTA: `"Explore tools"` — `#1EAAE7` fill, white text, 12px weight 500, padding `8px 16px`, border-radius `8px`
  - Ghost button: `"Dismiss"` — transparent fill, `0.5px solid #D1D5DB` border, `#6B7280` text, same sizing
- Entire banner has an auto-layout column, hug height
- Create as component named `Banner/AI-Discovery` with a boolean property `isVisible`

---

## Frame 2 — Tools Page with Free Trial Badges

**Canvas size:** 1440 × 900

Duplicate the existing Tools page frame. Apply the following to AI-powered tool cards only (AI Transcriber, AI CRM). Do NOT modify Resources, Session Notes (which stays as "Included in plan"), Tasks, or Prescriptions cards.

**Modification to AI tool cards:**

Each existing tool card gets one new badge component placed in the bottom-left of the card, below the description text:

**Component: Badge/FreeTrial**
- Pill shape: background `#E1F5EE`, border `0.5px solid #9FE1CB`, border-radius `20px`, padding `4px 10px`
- Left icon: Gift icon (Feather/Tabler outline), 11×11, color `#0F6E56`
- Text: `"1 free session"` — Inter 11px, weight 500, color `#0F6E56`
- Gap between icon and text: `4px`
- Auto-layout row, hug width

**Component: Badge/PlanIncluded** (for Session Notes, Resources)
- Same pill shape but background `#E6F1FB`, border `0.5px solid #B5D4F4`
- Text: `"Included in plan"` — color `#185FA5`
- No icon

Also add a subtle `"Try free →"` label as a hover state overlay on AI tool cards — bottom-right corner, appears on hover, `#1EAAE7` color, 11px.

---

## Frame 3 — AI Transcriber: Pre-Session State

**Canvas size:** 1440 × 900

Duplicate the AI Transcriber tool inner page (create as new inner screen if it doesn't exist). Layout: sidebar on left (unchanged), main content area.

**Main content area layout (top to bottom):**

**A. Page header**
- Back chevron + `"AI Transcriber / Notes"` — Inter 16px, weight 500
- Below: `"Record and transcribe sessions with AI-powered notes"` — 13px, `#6B7280`

**B. Free Trial Inline Banner** — place directly below header, margin-top `16px`
- Container: full content width, border-radius `8px`, background `#E1F5EE`, border `0.5px solid #9FE1CB`, padding `12px 16px`
- Auto-layout row, align-items flex-start, gap `10px`
- Left: Gift icon, 16×16, color `#0F6E56`, margin-top `2px`
- Right column (auto-layout, column):
  - Title: `"You have 1 free session"` — 13px, weight 500, color `#085041`
  - Body: `"Record this session at no cost. After your free session, each recording uses 10 credits (~₹12)."` followed by an underlined link `"See pricing"` — 11px, weight 400, color `#0F6E56`
- Create as component `Banner/FreeTrialNotice` with variant `State=Active`

**C. Session Card** — margin-top `16px`
- Container: full width, border-radius `10px`, border `0.5px solid #E5E7EB`, background white, padding `16px 20px`
- Auto-layout row, space-between, align-items center
- Left:
  - `"Ready to record"` — 14px, weight 500, `#111827`
  - `"Session with Priya Mehta · Today 2:00 PM"` — 12px, `#6B7280`, margin-top `4px`
- Right: Primary CTA button with microphone icon + `"Start recording"` — `#1EAAE7` fill, white, 13px weight 500, padding `10px 18px`, border-radius `8px`, gap `6px`

---

## Frame 4 — AI Transcriber: Session In Progress

**Canvas size:** 1440 × 900

Show the active recording state.

**A. Session status bar** — full width, border-radius `8px`, background `#F9FAFB`, border `0.5px solid #E5E7EB`, padding `10px 16px`
- Auto-layout row, space-between
- Left: `"Free session active"` — 12px, `#6B7280`
- Right: Clock icon (14px, `#0F6E56`) + `"32:14"` — 13px, weight 500, `#0F6E56`, gap `5px`

**B. Live transcript area** — margin-top `12px`
- Container: full width, min-height `160px`, border-radius `8px`, background `#F9FAFB`, border `0.5px solid #E5E7EB`, padding `16px`
- Transcript text in progress: `"...and I think the anxiety really peaks around Sunday evenings, before the work week..."` — 13px, `#374151`, line-height `1.8`
- Blinking cursor: 2×16px rectangle, `#1EAAE7` fill, placed immediately after last word

**C. Controls row** — margin-top `10px`, gap `8px`
- Pause button: ghost style (transparent bg, `0.5px solid #D1D5DB`, `#6B7280` text), Pause icon + `"Pause"`, 12px, padding `8px 14px`, border-radius `8px`
- End session button: ghost style but border `0.5px solid #F5C4B3`, text `#993C1D`, Stop icon + `"End session"`

---

## Frame 5 — Post-Session Paywall Modal

**Canvas size:** 1440 × 900 (show the transcript page dimmed in background)

**Background:** Existing transcript result screen at 40% opacity (use a rectangle overlay: full screen, `rgba(0,0,0,0.35)`)

**Modal box** — centered on screen:
- Width: `360px`, auto height, border-radius `14px`, background white, border `0.5px solid #E5E7EB`, padding `24px`
- Drop no shadow — flat surface only

**Modal contents (top to bottom):**

**A. Tool identity row** — auto-layout row, gap `10px`, margin-bottom `14px`
- Icon container: 40×40, border-radius `10px`, background `#FEE9C7`, centered microphone emoji or icon
- Right:
  - `"Session transcribed"` — 14px, weight 500, `#111827`
  - `"47 min · 3,200 words generated"` — 12px, `#6B7280`, margin-top `2px`

**B. Inline nudge banner** — margin-bottom `16px`
- Background `#FAEEDA`, border `0.5px solid #FAC775`, border-radius `8px`, padding `10px 14px`
- Sparkle icon, 14px, `#633806` + text: `"Your free session is used. Add credits to keep transcribing — or upgrade your plan to get 200 credits/month included."` — 11px, `#633806`, line-height `1.6`

**C. Plan option cards** — auto-layout row, gap `8px`, margin-bottom `16px`

Card 1 — Pay as you go:
- Width: `50%`, border-radius `10px`, border `0.5px solid #E5E7EB`, padding `12px`, text-align center
- `"Pay as you go"` — 12px, weight 500, `#111827`
- `"₹99"` — 16px, weight 500, `#111827`, margin `4px 0`
- `"100 credits (~10 sessions)"` — 10px, `#6B7280`

Card 2 — Monthly (recommended):
- Same width, but border `1.5px solid #1EAAE7`
- Badge above name: `"Best value"` pill — background `#E6F1FB`, color `#185FA5`, 9px weight 500, padding `2px 8px`, border-radius `10px`
- `"Monthly"` — 12px, weight 500
- `"₹299/mo"` — 16px, weight 500
- `"300 credits + priority"` — 10px, `#6B7280`

**D. CTA buttons** — full width, stacked, gap `8px`
- Primary: `"Add credits"` — `#1EAAE7` fill, white, 13px weight 500, full width, border-radius `8px`, padding `12px`
- Secondary ghost: `"Maybe later — see my transcript first"` — transparent, `0.5px solid #D1D5DB`, `#6B7280`, 11px, full width, same padding

---

## Frame 6 — Sidebar with Credit Balance Widget

**Canvas size:** 248 × 600 (sidebar only, for component documentation)

Add to the bottom of the existing sidebar, above the user avatar/name row:

**Component: Sidebar/CreditWidget**
- Container: `220px` wide (sidebar padding 14px each side), border-radius `8px`, background `#F9FAFB`, border `0.5px solid #E5E7EB`, padding `12px`
- Top row: `"AI Credits"` — 11px, weight 500, `#6B7280` on left | `"Add more"` — 11px, `#1EAAE7`, underlined, on right
- Credit bar, margin-top `8px`:
  - Track: full width, height `6px`, background `#E5E7EB`, border-radius `3px`
  - Fill: width proportional to balance (e.g. 28% for 28/100 credits), background `#1EAAE7`, border-radius `3px`
- Below bar: `"28 of 100 credits remaining"` — 10px, `#9CA3AF`, margin-top `4px`
- Create with variants for states: `State=Healthy` (blue bar), `State=Low` (bar color `#EF9F27`, amber), `State=Empty` (bar color `#E24B4A`, red)

Also add a `"Try free"` amber badge to the Tools nav item in the sidebar:
- Pill: background `#FAEEDA`, color `#633806`, 9px weight 500, padding `2px 7px`, border-radius `8px`, positioned `margin-left: auto` in the nav row

---

## Frame 7 — Billing Page: AI Credits Tab

**Canvas size:** 1440 × 900

Duplicate the existing Billing page. Add a new tab `"AI Credits"` to the tab row (after "Plan", before "History"). Active state: bottom border `2px solid #1EAAE7`, text `#1EAAE7`.

**Tab content:**

**A. Stat cards row** — two cards, gap `10px`, margin-bottom `16px`
- Card 1: label `"Balance"`, value `"28"`, subtext `"credits"` — background `#F9FAFB`, border `0.5px solid #E5E7EB`, border-radius `8px`, padding `12px`
- Card 2: label `"Used this month"`, value `"72"`, subtext `"credits"` — same styling

**B. Credit rates table** — label `"Credit rates"` in 10px uppercase `#9CA3AF`, then rows:
- Each row: auto-layout row, space-between, `5px` top/bottom padding, `0.5px solid #E5E7EB` bottom divider
- Columns: left text 12px `#6B7280` | right text 12px weight 500 `#111827`
- Rows: `"AI Transcriber (per session)" → "10 credits"` / `"AI CRM (per workflow)" → "5 credits"` / `"Top-up: 100 credits" → "₹99"` / `"Monthly: 300 credits" → "₹299/mo"`

**C. Top-up CTA** — margin-top `14px`
- `"Top up credits"` button — `#1EAAE7` fill, white, 13px weight 500, `hug width`, padding `10px 20px`, border-radius `8px`

---

## Low Credit Warning — Inline Component

**Component: Banner/LowCreditWarning**
*(Used inline inside tools, not as a modal)*
- Full content width, border-radius `8px`, background `#FAEEDA`, border `0.5px solid #FAC775`, padding `10px 14px`
- Auto-layout row, gap `8px`
- Warning icon, 14px, `#633806`
- Text: `"You have 8 credits left — enough for 1 more session."` + inline link `"Top up"` — `#1EAAE7`, underlined
- Font: 11px, `#633806`, line-height `1.6`

---

## Prototype Connections

Wire the following flows in Figma Prototype mode:

1. `Home Banner "Explore tools"` → **Frame 2** (Tools page with badges)
2. `Any AI tool card click` → **Frame 3** (Pre-session state)
3. `"Start recording" button` → **Frame 4** (Session in progress)
4. `"End session" button` → **Frame 5** (Post-session modal with overlay)
5. `Modal "Add credits"` → **Frame 7** (Billing / AI Credits tab)
6. `Modal "Maybe later"` → Dismiss overlay, show transcript underneath
7. `Sidebar "Add more" link` → **Frame 7**

Use **Smart Animate** for modal appear/dismiss. All other transitions: **Instant**.

---

## Component Organization in Figma

Create a new page in the file called `💰 Monetization Layer`. Group all new components under:
- `Banners/` — Discovery, FreeTrialNotice, LowCreditWarning
- `Badges/` — FreeTrial, PlanIncluded
- `Modals/` — PostSessionPaywall
- `Sidebar/` — CreditWidget
- `Billing/` — CreditsTab

All frames go on the existing design page, appended after the current flow, labeled `[NEW] Home - Discovery`, `[NEW] Tools - Badges`, etc.