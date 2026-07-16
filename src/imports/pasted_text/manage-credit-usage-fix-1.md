Here's the Figma prompt:

---

**FIGMA PROMPT — Manage Credit Usage — Summary Cards Data & Logic Fix**

---

## Update Demo Data Constants

Replace all data values at the top of `ManageCreditUsageContent` with this case study:

```javascript
const totalOrgCredits = 30000;      // bought from plan
const totalCreditsUsed = 20000;     // used across all platforms
const ehrCreditsUsed = 13000;       // of those 20k, EHR used 13k
const otherPlatformCreditsUsed = totalCreditsUsed - ehrCreditsUsed; // 7k CRM etc
const orgCreditsRemaining = totalOrgCredits - totalCreditsUsed;     // 10,000
```

All percentage calculations must derive from these:
```javascript
const percentTotalUsed = ((totalCreditsUsed / totalOrgCredits) * 100).toFixed(1);   // 66.7%
const percentEHRofUsed = ((ehrCreditsUsed / totalCreditsUsed) * 100).toFixed(1);    // 65.0%
```

---

## Card 1 — Org Credits — Remove Legend, Show Only % Used

**Left cluster — no change to structure:**
- Label: "ORG CREDITS" unchanged
- Number: `orgCreditsRemaining.toLocaleString()` → **10,000**
- Sub-label: "remaining" unchanged

**Right cluster — replace entirely:**

Remove:
- The stacked two-color bar (teal + purple segments)
- The EHR / Other platforms legend row entirely

Replace with:

Top line: `{percentTotalUsed}%` in **20px bold `#111827`** — the big number that matters

Below that: "of total credits used" in 12px `#6B7280`

Below that: a single-color bar, full width, height 8px, rounded-full
- Fill color: `#14B8A6` teal
- Fill width: `percentTotalUsed`% of bar width
- Track: `#E5E7EB`

Below bar: "20,000 of 30,000 credits used" in 11px `#9CA3AF`

No legend. No EHR/other platform split on this card. This card is purely about total org wallet consumption.

---

## Card 2 — EHR Usage — Show EHR Share of Total Used Credits

**Left cluster — update number:**
- Label: "EHR USAGE" unchanged
- Number: `ehrCreditsUsed.toLocaleString()` → **13,000**
- Sub-label: "credits used in EHR" unchanged

**Right cluster — replace bar logic and labels:**

Remove:
- "X% of org credits used by EHR" (this was EHR vs total org — misleading)
- "of 30,830 total org credits"

Replace with:

Top line: `{percentEHRofUsed}%` in **20px bold `#111827`**

Below that: "of total credits used" in 12px `#6B7280`

Below that: a single bar, full width, height 8px, rounded-full
- Fill color: `#14B8A6` teal
- Fill width: `percentEHRofUsed`% — EHR's share of total credits used (not of total org credits)
- Track: `#E5E7EB`

Below bar: "13,000 of 20,000 credits used by EHR" in 11px `#9CA3AF`

This card now answers: "of everything that was spent, how much did EHR spend?" — which is the meaningful question.

---

## Fix Tool Breakdown Cards — Update Numbers to Match Case Study

Total EHR used = 13,000. Distribute across three tools realistically:

```javascript
const transcriberUsed = 7800;   // 60% of EHR usage
const sessionNotesUsed = 3510;  // 27% of EHR usage
const prescriptionUsed = 1690;  // 13% of EHR usage
// total = 13,000 ✓
```

**AI Transcriber card:**
- Primary number: **7,800** credits
- Bar width: `(7800 / 13000) * 100` = 60%
- Percentage label: **60%** of EHR usage

**Session Notes card:**
- Primary number: **3,510** credits
- Bar width: `(3510 / 13000) * 100` = 27%
- Percentage label: **27%** of EHR usage

**Prescription card:**
- Primary number: **1,690** credits
- Bar width: `(1690 / 13000) * 100` = 13%
- Percentage label: **13%** of EHR usage

The three bars now visually show a meaningful spread — 60/27/13 — that makes the breakdown readable and useful.

---

## Credit History — Update Rows to Match Case Study Scale

The current history shows tiny deductions (−1, −2, −10) which don't match a 13,000 credit EHR usage story. Update sample rows to reflect realistic session-level usage:

```javascript
const historyRows = [
  { tool: "AI Transcriber", platform: "EHR", activity: "Session transcription completed", credits: -420, date: "Jun 1, 2026 · 9:14 AM" },
  { tool: "Session Notes", platform: "EHR", activity: "AI-assisted note generated", credits: -180, date: "May 31, 2026 · 4:45 PM" },
  { tool: "AI Transcriber", platform: "EHR", activity: "Session transcription completed", credits: -390, date: "May 31, 2026 · 2:30 PM" },
  { tool: "Prescription", platform: "EHR", activity: "AI prescription generated", credits: -210, date: "May 30, 2026 · 11:00 AM" },
  { tool: "AI Reminder", platform: "CRM", activity: "Reminder calling batch sent", credits: -850, date: "May 29, 2026 · 3:00 PM" },
  { tool: "Session Notes", platform: "EHR", activity: "Manual note created", credits: -90, date: "May 28, 2026 · 10:20 AM" },
  { tool: "AI Transcriber", platform: "EHR", activity: "Session transcription completed", credits: -460, date: "May 27, 2026 · 2:15 PM" },
  { tool: "Prescription", platform: "EHR", activity: "Manual prescription created", credits: -95, date: "May 26, 2026 · 9:30 AM" },
];
```

Credits column shows these as `−420`, `−180` etc. — numbers that feel proportionate to a 13,000 credit EHR usage.

---

## Everything Else — No Change

- Card layout, dimensions, dividers, fonts — unchanged
- Buy More Credits — unchanged
- Overview tab — unchanged
- Payments tab — unchanged
- How it works tab — unchanged