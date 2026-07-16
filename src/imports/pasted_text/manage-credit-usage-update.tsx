Here's the complete prompt:

---

**Prompt: Update `ManageCreditUsageContent` — Buy More Credits & Credit Breakdown Cards**

---

### 1. Remove "EHR Native" Badge from All Breakdown Cards

In the `Credit usage breakdown` accordion, inside each of the three tool cards (AI Transcriber, Session Notes, Prescription), **delete** this line entirely:

```jsx
// DELETE from all three cards:
<span className="inline-block px-2 py-1 rounded-full text-[10px] font-bold w-fit" style={{ background: "#CCFBF1", color: "#0F766E" }}>EHR Native</span>
// (and the equivalent styled versions for Session Notes and Prescription)
```

No replacement — just remove it. The card should go straight from the header row (icon + name + info button) to the primary metric number.

---

### 2. Replace Buy More Credits — Monthly Pricing + Simple Buy Now

**Remove entirely:**
- The `planCreditsPerMonth`, `planCreditsPerYear`, `planCreditsK`, `extraCreditsK`, `totalOrgWalletK` variables
- The slider (`<input type="range" ...>`)
- The tick labels row beneath the slider (`0/yr · 10K · 25K ...`)
- The 3-column breakdown box (Plan credits / Buying now / New total)
- The `creditTiers` array and `formatCredits` / `calculatePrice` functions
- The `creditTierIndex` state

**Replace the entire inner content of `{isBuyCreditsExpanded && (...)}` with this:**

```jsx
// New state at top of ManageCreditUsageContent:
const [creditQty, setCreditQty] = useState(10000);
const CREDIT_PRICE_PER_1000 = 0.40; // $0.40 per 1,000 credits/month
const monthlyPrice = ((creditQty / 1000) * CREDIT_PRICE_PER_1000).toFixed(2);

// Preset options
const presets = [
  { label: "10K",  value: 10000 },
  { label: "25K",  value: 25000 },
  { label: "50K",  value: 50000 },
  { label: "100K", value: 100000 },
  { label: "250K", value: 250000 },
  { label: "500K", value: 500000 },
];
```

**UI inside the accordion:**

```jsx
{isBuyCreditsExpanded && (
  <div className="mt-5 space-y-5">

    {/* Preset pill buttons */}
    <div>
      <p className="text-[13px] font-medium text-[#374151] dark:text-gray-300 mb-3">
        Select credits to add per month
      </p>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => setCreditQty(p.value)}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold border-2 transition-all ${
              creditQty === p.value
                ? "border-[#14B8A6] bg-[#CCFBF1] text-[#0F766E]"
                : "border-[#E5E7EB] text-[#6B7280] hover:border-[#14B8A6] hover:text-[#0F766E]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>

    {/* Custom input */}
    <div className="flex items-center gap-3">
      <label className="text-[13px] text-[#6B7280] whitespace-nowrap">Custom amount:</label>
      <div className="flex items-center border border-[#D1D5DB] rounded-lg overflow-hidden">
        <input
          type="number"
          min={1000}
          step={1000}
          value={creditQty}
          onChange={(e) => setCreditQty(Math.max(1000, Number(e.target.value)))}
          className="w-32 px-3 py-2 text-[13px] text-[#111827] dark:text-white bg-white dark:bg-gray-700 focus:outline-none"
        />
        <span className="px-3 py-2 bg-[#F9FAFB] text-[#6B7280] text-[13px] border-l border-[#D1D5DB]">
          credits
        </span>
      </div>
    </div>

    {/* Price summary card */}
    <div className="bg-[#F9FAFB] dark:bg-gray-750 rounded-xl p-4 flex items-center justify-between">
      <div>
        <div className="text-[12px] text-[#6B7280] mb-1">Monthly add-on</div>
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-bold text-[#111827] dark:text-white">${monthlyPrice}</span>
          <span className="text-[13px] text-[#6B7280]">/ month</span>
        </div>
        <div className="text-[11px] text-[#9CA3AF] mt-0.5">
          {creditQty.toLocaleString()} credits · billed monthly · cancel anytime
        </div>
      </div>
      <button
        onClick={() => {/* handle purchase */}}
        className="px-6 py-3 bg-[#14B8A6] hover:bg-[#0d9488] text-white text-[14px] font-bold rounded-xl transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
      >
        Buy Now
      </button>
    </div>

    {/* Fine print */}
    <p className="text-[11px] text-[#9CA3AF]">
      Credits are added to your org wallet immediately after purchase and never expire. Charged to your default payment method on file.
    </p>

  </div>
)}
```

---

### Summary of all changes
- Remove `EHR Native` badge from AI Transcriber, Session Notes, and Prescription cards in the breakdown section
- Remove the slider, tick labels, 3-column summary box, `creditTiers` array, and related state/functions from Buy More Credits
- Replace with: preset pill buttons (10K–500K), a custom number input, a price summary card showing monthly cost + credit count, and a single "Buy Now" CTA button
- Pricing formula: `$0.40 per 1,000 credits/month` (adjust the constant as needed)