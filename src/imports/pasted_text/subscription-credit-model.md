MantraEHR Subscription Overview & Credit Usage — Communicate Model Through Product Design

Core Design Philosophy
Never explain the business model in words. Show it through hierarchy, visual separation, and progressive disclosure. The user should feel the difference between "what my subscription gives me" and "what my credits power" without reading a single explanatory sentence.

1. Subscription Overview Tab — Redesign Current Plan Card
The current plan card shows Essential + Active badge + trial progress. That's it. It needs to silently communicate what the subscription actually provides.
Replace the current plan card with a two-zone card.
Zone A — top half, background #F8FAFF, border-bottom #E5E7EB 1px:
Left side:

Plan name "Essential" 16px bold #111827
Active + Free Trial badges as before
"Monthly · $30/month · Renews June 1, 2026" in 13px #6B7280

Right side: Manage Plan button unchanged
Below the plan name row, add a horizontal icon strip — 4 items inline with a vertical divider #E5E7EB between each. Each item is an icon + label, no explanation text:
[Stethoscope icon]    [Users icon]      [Shield icon]       [Headphones icon]
EHR Platform Access   Up to 20 users    HIPAA Compliance    Priority Support
Icon size 16px, icon color #043570, label 11px #6B7280. This strip silently tells the user exactly what their monthly fee buys — platform access, seats, compliance, support. No paragraph needed.
Zone B — bottom half, white background, padding 16px:
Label row: "Included credits this cycle" on left in 12px #6B7280. "Resets Jun 4" on right in 12px #9CA3AF with Clock icon size 12px.
Single progress bar below: teal fill, #E5E7EB track, 6px height.
Below bar: "170 used · 830 remaining of 1,000 monthly credits" in 12px #6B7280
This zone silently communicates: credits are a separate thing that come with the subscription, not the subscription itself.
The two-zone card with a visible divider between them is the UI telling the user — these are two different things — without writing "subscription ≠ credits."

2. Subscription Overview Tab — Usage Alerts
No change to functionality. One visual change: rename the section header from "Usage Alerts" to "Credit Alerts" — aligns the language with what's actually being alerted on.

3. Subscription Overview Tab — Available Plans
Inside each plan card, split features into two visual groups separated by a subtle divider line inside the feature list.
Group 1 — no label, plain checkmarks (teal): These are the platform features the subscription unlocks. Patient records, appointments, telehealth, etc.
Group 2 — preceded by a micro-label "AI Credits included" in 10px #6B7280 uppercase tracking-wide: These are the credit-powered features. "AI Scribe · Prescriptions · Session Notes · CRM Calling (Essential+)"
The visual split inside the feature list communicates — some features are always on (subscription), some features consume credits (wallet) — without a word of explanation.
On the Essential and Plus plan cards only, add a single line below the price:
Includes 10,000 credits / mo  [at $0.010/credit]
12px #6B7280. The bracket text in 11px #9CA3AF. This sets the anchor price so when they see $0.012/credit in Buy More Credits it immediately registers as more expensive without you having to say "this is more expensive."

4. Manage Credit Usage Tab — Summary Cards
Card 1 — Total Org Credits: No change to layout. One addition only: below "Individually purchased: 830" add a single line in 11px with a Tag lucide icon in #14B8A6:
[Tag icon]  Plan rate: $0.010/credit
This is the only place the bundle price appears. It anchors the value of buying through a plan without explanation.
Card 2 — Credits Used in EHR: No change.

5. Manage Credit Usage Tab — Credit Usage Breakdown — Remove CRM Card
Remove the AI CRM card entirely from this breakdown grid.
The breakdown section should only show EHR-native tools: AI Transcriber, Session Notes, Prescription.
The grid goes from 2×2 to a cleaner 2+1 layout:

Row 1: AI Transcriber | Session Notes
Row 2: Prescription (half width, left-aligned, same card dimensions)

Or optionally render all three in a single row if screen width allows.
Why removing the CRM card communicates the model:
When a user opens Credit Usage Breakdown and sees only EHR tools, they intuitively understand — this section shows what my EHR plan covers. CRM is a different thing. No explanation needed. If they want CRM calling they'll find it naturally when they try to use it inside EHR and see the threshold gate.

6. Manage Credit Usage Tab — Credit History Table
Add one column: Platform
Tool | Platform | Activity | Credits | Date
Platform column shows a small colored badge:

"EHR" — #CCFBF1 background #0F766E text
"CRM" — #EDE9FE background #6D28D9 text

When user sees AI CRM rows showing "CRM" platform badge inside their EHR billing screen, they understand cross-platform billing without it being explained. The data itself communicates it.
History filter dropdown: add Platform filter above tool filter — "All Platforms | EHR | CRM". Tool filter sits below it. This two-level filter reinforces the platform separation visually.

7. Manage Credit Usage Tab — Buy More Credits Section
The pricing callout banner — rewrite the copy to communicate through contrast, not explanation:
Remove: "Credits bought here are priced higher than bundle credits. Buy a plan bundle to get credits at a discounted rate."
Replace with a two-column comparison inside the banner, no prose:
[Banner background #FEF3C7 border #FDE68A]

  Via your plan          Standalone (this purchase)
  $0.010 / credit        $0.012 / credit
  [Checkmark green]      [ArrowUp red +20%]
  Best rate              Higher rate
Two columns, center-aligned numbers, color-coded. User sees the difference immediately. No sentence needed.
Below the comparison, one 11px line in #92400E: "Switch to bundle to lock in plan pricing →" as a text link.

8. Cross-Platform Feature Threshold — Communicate Through Feature Gating, Not Text
This is the most important invisible communication in the product.
When a user tries to use CRM Calling inside EHR (the cross-licensed feature), they should NOT see a generic locked state. They should see a specific threshold state.
Design a threshold gate component to be used wherever cross-platform features appear in EHR:
Threshold gate card — appears inline where the CRM calling button would be:
Background #FFFBEB, border 1px solid #FDE68A, rounded-xl, padding 16px.
Top row: Bell icon in #F59E0B size 20px. Next to it "Reminder Calling" in 15px semibold #111827. No lock icon — lock implies permanent block. This is temporary.
Middle row — the threshold visual. A small horizontal meter, not a progress bar. Two zones:
[████████████░░░░░░░░░░░░░░░░░░]
 Your wallet: 800          Required: 1,000
Left label: "Your wallet" with current amount in #111827. Right label: "Required to unlock" with threshold amount in #F59E0B. The gap between current and required is filled with a dashed line in #FDE68A. This single visual communicates: you're close, it's not locked forever, it's a balance problem not a permission problem.
Bottom row: Single CTA button "Add 200 credits to unlock" — pre-calculated exact deficit, not generic "buy credits." Background #14B8A6 text white. Next to it in 12px #6B7280: "or unlock full CRM →" as a text link.
This component communicates the entire threshold model in one glance. User understands: I have credits, I need more of them specifically for this feature, here's exactly how many.

9. Free Trial — Communicate Through What They Can Try, Not What's Free
In the trial progress card on Overview, below the progress bar add a single row of tool pills showing what the trial credit pack covers:
[Zap icon] AI Transcriber  [FileText icon] Session Notes  [Pill icon] Prescription  [Bell icon] CRM Calling
Each pill: white background, #E5E7EB border, rounded-full, 11px text, icon size 12px. No "free" label on them. They just appear as accessible.
This communicates: your trial lets you touch every feature at least once — without writing "try every feature for free."

What Must Not Change

Left navigation — untouched
Settings parent tab row — untouched
Payments tab — untouched
How it works tab — untouched
All existing interactive states (toggles, modals, dropdowns) — untouched
Dark mode support — maintain throughout