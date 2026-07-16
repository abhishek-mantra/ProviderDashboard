Here's the detailed prompt:

---

## Prompt: Build Complete Monetization Journey — Subscription & Credits Flow for MantraCare EHR

---

### Context

This is the **MantraCare EHR platform** (different from MantraAssist). The Settings page has a **Subscription tab** with a left sub-navigation: Overview, Plans & Subscriptions, Payments, Credit Usage, Manage Credits. Build out each sub-section completely with real, functional UI — no "Coming Soon" placeholders.

---

### Sub-section 1 — Overview (already partially built, enhance it)

Keep existing: Professional plan card + Usage Alerts toggles.

**Add below Usage Alerts:**

**Quick Stats row** — three equal cards side by side:
- **Credits Remaining** — large number **"29"**, sub-label *"Resets Jun 4, 2026"*, small teal/blue credit icon
- **Plan Renewal** — large text **"Jun 1, 2026"**, sub-label *"Monthly · ₹299/month"*, calendar icon
- **Active Tools** — large number **"2 / 5"**, sub-label *"AI Transcriber, AI CRM"*, tools icon

**Recent Activity** section below stats:
- Section title "Recent Activity" with "View All →" link right-aligned
- List of 3 recent items with icon + description + date + amount:
  - 🔵 AI Transcriber credit used — 72 credits — May 15, 2026
  - 🟢 Credits purchased — 100 credits — May 10, 2026
  - 🔵 Plan renewed — ₹299 — May 1, 2026

---

### Sub-section 2 — Plans & Subscriptions (replace "Coming Soon")

Replace the placeholder with a full plan comparison UI:

**Monthly/Annual toggle** at top right — pill toggle: "Monthly" | "Annual (Save 20%)" — default Monthly

**Four plan cards** in a 2×2 grid (or horizontal scroll row):

**Starter — Free**
- Price: ₹0/month
- Features: 1 provider, 10 clients, Basic AI Transcriber (1 free session), Basic AI CRM (1 free session), Email support
- CTA: "Current Plan" gray disabled (if on this plan) or "Downgrade"

**Professional — ₹299/month** ← current plan, highlighted
- Dark navy border + **"Current Plan"** teal badge top-right
- Features: 5 providers, 100 clients, AI Transcriber (100 credits), AI CRM (50 credits), Priority support, Custom fields, Integrations
- CTA: green **"Current Plan"** button

**Clinic — ₹799/month**
- Features: 20 providers, Unlimited clients, AI Transcriber (500 credits), AI CRM (300 credits), Team analytics, White-label reports, Dedicated support
- CTA: dark navy **"Upgrade"** button

**Enterprise — Custom**
- Features: Unlimited providers, Unlimited everything, Custom integrations, SLA, Dedicated account manager, On-premise option
- CTA: **"Contact Sales"** outlined button

Each card: white bg, `border-radius: 12px`, shadow, feature list with green checkmarks, `font-size: 13px`.

**Below the cards:** a full-width feature comparison table — rows = features, columns = plan names, cells = ✓ or specific value or —

---

### Sub-section 3 — Payments (enhance existing)

Keep existing: Visa ending in 4567 card + Add Payment Method + Billing Address.

**Add below Billing Address:**

**Invoice History** section:
- Title: "Invoice History" + **"Download All"** outlined button right-aligned
- Table with columns: Invoice # | Date | Amount | Status | Action
- 4 rows of sample data:
  - INV-2026-05 | May 1, 2026 | ₹299 | **Paid** (green badge) | Download PDF icon
  - INV-2026-04 | Apr 1, 2026 | ₹299 | **Paid** (green badge) | Download PDF icon
  - INV-2026-03 | Mar 1, 2026 | ₹299 | **Paid** (green badge) | Download PDF icon
  - INV-2026-02 | Feb 1, 2026 | ₹399 | **Paid** (green badge) | Download PDF icon
- Table uses same style as other data tables in the platform — light header, row dividers, `font-size: 13px`

**Tax Information** section below invoices:
- GSTIN field (text input, pre-filled with placeholder "27AABCU9603R1ZX")
- Business Name field
- **"Save Tax Info"** button — outlined, right-aligned

---

### Sub-section 4 — Credit Usage (replace "Coming Soon")

Replace the placeholder with the full Credit Usage Overview from the MantraAssist Credit Transactions design:

**Filter bar** at top: "This Month" dropdown + "All Types" dropdown + "All Users" dropdown — same outlined select style

**Two side-by-side cards:**

Left (~60%) — **Credit Usage Over Time** line chart:
- X-axis: May 1–16, 2026 dates
- Y-axis: 0–100 range
- Two lines: AI Transcriber (teal) + AI CRM (blue)
- Clean minimal chart, subtle gridlines, legend below

Right (~38%) — **Usage by Type** donut chart:
- Center: **"72"** large bold, "Total Used" small muted
- Legend: AI Transcriber (teal dot) + AI CRM (blue dot)

**Transaction History table** below charts:
- Title "Transaction History" + search input right-aligned
- Columns: Transaction ID | Tool | Type | Description | Credits | Date
- 4 sample rows:
  - TXN-001 | AI Transcriber | Session Usage | Transcription session by John Wilson | -5 credits | May 15, 2026, 2:30 PM
  - TXN-002 | AI Transcriber | Session Usage | Transcription session by John Wilson | -5 credits | May 14, 2026, 11:00 AM
  - TXN-003 | Credits Purchase | Top-up | Purchased 100 AI Transcriber credits | +100 credits | May 10, 2026, 9:00 AM
  - TXN-004 | AI CRM | Session Usage | CRM session by John Wilson | -1 credit | May 8, 2026, 3:15 PM
- Credits column: negative values in red with minus icon, positive in green with plus icon
- Same dark header table style as MantraAssist credit transactions design

---

### Sub-section 5 — Manage Credits (enhance existing)

Keep existing: Free Credits (1) + Purchased Credits (28) top cards + Total Credits (29) + Buy Credits button + Free What's Included section + Purchased Credits progress bars.

**Enhance the Buy Credits flow:**

Add a **"Buy Credits"** modal (triggered by the Buy Credits button):

Modal title: "Purchase Credits" — `max-width: 480px`, centered

**Tool selector tabs:** AI Transcriber | AI CRM — pill tabs

**Credit packages grid** (2×2):
- **Starter Pack** — 50 credits — ₹149 — *"~10 sessions"* — outlined card
- **Popular Pack** — 100 credits — ₹249 — *"~20 sessions"* — dark navy border + **"Most Popular"** badge
- **Pro Pack** — 250 credits — ₹549 — *"~50 sessions"* — outlined card
- **Enterprise Pack** — 500 credits — ₹999 — *"~100 sessions"* — outlined card

Selected package gets dark navy border + checkmark.

**Order summary** below packages:
- Selected: 100 AI Transcriber credits
- Price: ₹249
- GST (18%): ₹44.82
- **Total: ₹293.82**

**"Proceed to Pay"** dark navy full-width button at bottom

**Add below the Manage Credits content — "Auto-reload Settings"** card:
- Title "Auto-reload" + toggle (on/off)
- When enabled: show threshold input ("Reload when below X credits") + reload amount selector ("Add Y credits automatically")
- Sub-text: *"Ensure you never run out of credits mid-session"*

---

### Individual Tool Purchase Flow

Add a **"Tools"** entry point — when user clicks on a tool name (AI Transcriber or AI CRM) anywhere in Manage Credits, open a **Tool Detail drawer/modal**:

- Tool name + icon at top
- Current balance: X free + Y purchased credits
- Usage history mini-chart (last 7 days bar chart)
- **"Buy More Credits"** button → opens Buy Credits modal pre-filtered to that tool
- **"View Full Usage"** link → navigates to Credit Usage tab filtered to that tool

---

### Design Consistency Rules

- Match MantraCare's existing color system: teal/cyan primary (`#0EA5E9` or equivalent), dark navy for CTAs, light gray backgrounds
- All cards: white bg, `border-radius: 12px`, `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`, `padding: 20px`
- Typography: same font sizes as existing pages — titles `18px 600`, body `14px`, labels `12px muted`
- Progress bars: teal fill on light gray track, `border-radius: 999px`, `height: 6px`
- Badges: Paid = green, Active = teal, Coming Soon = gray — all `border-radius: 999px`, `font-size: 11px`
- The "Buy Credits" and "Upgrade" CTAs must use the same dark navy filled button style as "Manage Subscription"
- Do not introduce new colors, fonts, or icon styles not already in the Figma file