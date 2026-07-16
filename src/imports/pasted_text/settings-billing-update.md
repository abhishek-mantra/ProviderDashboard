Here's a detailed, precise prompt for Figma/AI to update the `SettingsBilling.tsx` file:

---

## Figma Prompt: Update SettingsBilling.tsx

### 1. TOP-LEVEL STRUCTURE FIX
Wrap the entire `SettingsBilling` return in the same layout shell as `SettingsAvailability`:
```
- Full page: bg-[#F8FAFC] dark:bg-gray-900 min-h-screen md:p-6
- Header section with SettingsIcon + "Settings" title + subtitle
- Horizontal tab bar (same as SettingsAvailability) covering FULL WIDTH equally spaced
  - Change tab bar from `w-fit` to `w-full` 
  - Each tab: `flex-1 justify-center` so all 5 tabs share equal width
  - Tabs: Availability, Practice Details, Team/Providers, Notifications, Subscription
- Below tabs: max-w-[1000px] content area
```

---

### 2. TAB BAR — FULL WIDTH EQUAL SPACING
```tsx
// Change this:
<div className="flex items-center gap-1.5 md:gap-2 bg-white ... w-fit ... min-w-max">

// To this:
<div className="flex items-center gap-1 md:gap-1.5 bg-white dark:bg-gray-800 p-1 md:p-1.5 rounded-xl w-full border border-gray-200 dark:border-gray-700">
  // Each Link gets: flex-1 justify-center (not whitespace-nowrap)
```

---

### 3. OVERVIEW TAB — SHOW ONLY 3 SECTIONS

Remove: Quick Stats, Recent Activity from Overview.

**Keep only:**

#### A. Current Plan Card
```
- White card with border, rounded-xl, p-5
- Left: Plan name "Professional" + green "Active" badge
         "Monthly · ₹299/month"
         "Renews on June 1, 2026"
- Right: "Manage Plan" button (bg-[#1E3A8A] text-white)
  → Clicking "Manage Plan" OPENS the Available Plans section 
    (sets isPlansExpanded = true and scrolls to it)
```

#### B. Usage Alerts — redesign to match image (toggles style)
```
White card, border, rounded-xl, p-5
Title: "Usage Alerts" with Bell icon
Subtitle: "Get notified when your credit usage reaches certain thresholds"

Three rows, each with toggle switch on the RIGHT:
  Row 1: "70% Usage Alert"     [toggle - default ON]
  Row 2: "90% Usage Alert"     [toggle - default ON]  
  Row 3: "Balance Exhausted Alert" [toggle - default ON]

Toggle style: 
  checked: bg-[#043570]
  unchecked: bg-gray-200
  Use: useState for each toggle
```

#### C. Available Plans — collapsible, with correct plans from mantraehr.com/pricing
```
Collapsible section (ChevronDown/Up toggle)
Monthly / Annual toggle (pill switcher, right-aligned)

Plans from mantraehr.com pricing page — 3 cards in a grid:

Plan 1: STARTER
  Price: Free (was $59/mo) — "50% OFF FOR 3 MONTHS" badge
  Subtitle: "For solo clinicians getting started with digital care"
  "Includes Upto 10 users"
  Features: Basic diagnostic & treatment plans, Online appointments,
            Basic EHR RCM (Claims management), AI CRM (Pay as you go),
            AI: Scribe Prescriptions Notes, Credentialing & Enrollment Access
  CTA: "Start free trial" (outlined teal border)

Plan 2: ESSENTIAL (highlight as current/popular)
  Price: $30/mo (was $54) — "50% OFF FOR 3 MONTHS" badge  
  Subtitle: "Everything a busy solo provider needs to grow"
  "Includes Upto 20 users"
  Features: Everything in Starter, plus: Automated appointment reminders,
            Calendar sync (Google & Outlook), Customizable treatment plans,
            Wiley Treatment Planners, 10 free insurance claims/mo,
            AI-assisted progress notes
  CTA: "Start free trial" (teal filled - current plan indicator)

Plan 3: PLUS
  Price: $60/mo (was $109) — "50% OFF FOR 3 MONTHS" badge
  Subtitle: "Built for group practices with multiple clinicians"
  "More than 30 users"
  Features: Everything in Essential, plus: Group appointments & telehealth,
            Premium support phone line, Automatic insurance status checks,
            35 free insurance claims/mo, Add additional clinicians,
            Advanced practice analytics
  CTA: "Start free trial" (outlined teal border)

Each card:
  - "50% OFF FOR 3 MONTHS" teal badge at top
  - Strikethrough original price in gray
  - Bold large current price
  - "/month · Billed monthly, cancel anytime"
  - Feature list with teal checkmark icons
  - CTA button full width at bottom
```

---

### 4. PAYMENTS TAB

#### Payment Methods section
```
Keep existing card (Visa ending 4567)
"+ Add Payment Method" button → opens a MODAL/POPUP:

Modal: "Add Payment Method"
  Fields:
    - Card Provider: dropdown (Visa ✓, Mastercard, Amex, Discover)
    - Cardholder Name: text input, placeholder "Full name on card"
    - Card Number: text input, placeholder "1234 5678 9012 3456"
    - Expiry Date: text input, placeholder "MM/YY" (half width)
    - CVV: text input, placeholder "•••" (half width)
    - Checkbox: "Set as default payment method"
  Buttons: "Cancel" (outlined) | "Add Card" (bg-[#1E3A8A] text-white)
  
  useState: const [showAddCardModal, setShowAddCardModal] = useState(false)
  Modal overlay: fixed inset-0 bg-black/50 z-50, centered white card w-[480px]
```

Keep: Billing Address (editable), Transaction History table — no changes.

---

### 5. MANAGE CREDIT USAGE TAB — Redesign to match reference image

#### Layout (3 cards in a row at top):
```
Card 1: Free Credits
  Big number: 830
  "Resets on Jun 4, 2026" with clock icon

Card 2: Purchased Credits  
  Big number: 0
  "Never expires" with info icon

Card 3: Total Credits Available
  Big number: 830
  "Buy Credits" button (bg-[#14B8A6] teal)
```

#### Credit Usage Breakdown (collapsible, default collapsed)
```
Header row: "Credit usage breakdown" + ChevronDown/Up

When expanded — 2-column grid of cards, each card:
  Icon (colored), Tool name, Big usage number, "of X total", progress bar, percentage

Cards:
  - AI Transcriber: Zap icon (teal), 72 credits used / 100 total, 72%
  - AI CRM: TrendingUp icon (purple), 0 credits used / 50 total, 0%

Each card also has:
  - Info (i) circular button top-right → tooltip on hover
  - Below progress bar: "Set limit" input field
    Label: "Credit limit for this tool"  
    Input: number, placeholder "No limit", suffix "% of total credits"
    Helper: "(= X of Y credits)" calculated dynamically
```

#### Extra Credits (collapsible, default collapsed)
```
Header row: "Extra Credits" + ChevronDown/Up

When expanded:
  Title: "Extra Credits"
  Subtitle: "Extra credits are shared across users. Select how many extra credits 
             you would like for your team below."
  
  Current display: "240K (Current plan) + 0 credits/yr    $0/yr"
  
  Slider (horizontal range input):
    Min: 0/yr, steps: 10K/yr, 25K/yr, 50K/yr, 100K/yr, 250K/yr, 500K/yr, 
                      1M/yr, 2.5M/yr, 5M/yr, 7.5M/yr, 10M/yr, 20M/yr, Custom
    Track color: teal (#14B8A6)
    Below slider: tick labels for each step
  
  As slider moves, update the "240K + X credits/yr  $Y/yr" display
  
  useState: const [extraCredits, setExtraCredits] = useState(0)
  Pricing: $10/yr per 10K extra credits (example rate)
```

Remove from this tab: Auto-reload section, old credit activity table, old buy credits slider.

---

### 6. GENERAL WRAPPER FOR ALL TAB CONTENT
```
Every sub-tab content section must be wrapped like Availability:
<div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] 
                dark:border-gray-700 rounded-xl p-5 md:p-6">
  {/* content */}
</div>

Each logical section (Current Plan, Usage Alerts, Available Plans, 
Payment Methods, Credit Breakdown, Extra Credits) = its own white 
bordered rounded-xl card with p-5, separated by space-y-6
```

---

### 7. IMPORTS REQUIRED
```tsx
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, Coins, CreditCard, Calendar, Wrench, 
  TrendingUp, ArrowRight, Check, Plus, Minus, ChevronDown, 
  ChevronUp, Info, Edit2, X, Zap, Clock, Bell,
  Settings as SettingsIcon, Building2, Users
} from "lucide-react";
import { useState } from "react";
```