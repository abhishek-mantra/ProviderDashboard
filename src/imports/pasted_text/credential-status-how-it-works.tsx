Here's the precise prompt:

---

## Add "How it works" section in `CredentialStatus.tsx` — insert between Hero card and Our Capabilities card

---

### Where to insert

Inside `{!hasInsurance && (...)}`, between the closing `</div>` of the Hero card (the one containing the Metrics Row) and the opening `<div>` of the Feature Grid Section (the one with `Our Capabilities` heading). Insert exactly one new card there.

---

### New section to insert — exact JSX

Add `PlayCircle` to the lucide-react import line first:

```tsx
import { Shield, ExternalLink, FileCheck, Code2, ToggleLeft, ToggleRight, Search, Filter, X, Clock, CheckCircle, Globe, Lock, FileText, TrendingUp, Eye, PlayCircle } from "lucide-react";
```

Then insert this entire block between the Hero card and the Capabilities card:

```tsx
{/* How it works */}
<div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-8">
  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 text-center">
    How it works
  </h2>
  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center mb-6 md:mb-8">
    Follow these steps to get credentialed and start accepting insurance
  </p>

  <div className="flex flex-col md:flex-row gap-8 md:gap-12">

    {/* Left — Steps tracker */}
    <div className="flex-1 relative">

      {/* Vertical connecting line — positioned behind the circles */}
      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-[2px] bg-gray-200 dark:bg-gray-700 z-0" />

      <div className="relative z-10 flex flex-col gap-0">

        {/* Step 1 */}
        <div className="flex gap-4 pb-7">
          <div className="size-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
            1
          </div>
          <div className="pt-0.5">
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
              You fill out the application
            </p>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Provide your license info, NPI, malpractice insurance, and work history. Takes about 5–10 minutes.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 pb-7">
          <div className="size-7 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
            2
          </div>
          <div className="pt-0.5">
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
              Mantra prepares and submits your credentials
            </p>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
              We assemble your CAQH profile, verify your documents, and submit applications to your selected payers. No back-and-forth from you.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 pb-7">
          <div className="size-7 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
            3
          </div>
          <div className="pt-0.5">
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
              Payers review and approve
            </p>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Insurance companies typically take 60–120 days to process. You can track your status in real time from your dashboard.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 font-medium">
              <CheckCircle className="size-3" />
              Live tracking available
            </span>
          </div>
        </div>

        {/* Step 4 — no pb so line doesn't extend below last circle */}
        <div className="flex gap-4">
          <div className="size-7 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[13px] font-semibold flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800">
            4
          </div>
          <div className="pt-0.5">
            <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-0.5">
              You're in-network — start seeing insured patients
            </p>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Once approved, eligible patients can book with you using their insurance. Mantra also handles claims submission and follow-ups.
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* Right — Video placeholder */}
    <div className="flex-1 flex flex-col justify-center min-h-[280px] md:min-h-0">
      <div className="flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gradient-to-br from-[#f0f7ff] to-white dark:from-gray-750 dark:to-gray-800 aspect-video cursor-pointer group hover:border-[#043570] dark:hover:border-blue-500 transition-all duration-200">
        <div className="inline-flex items-center justify-center size-14 bg-gradient-to-br from-[#043570] to-[#00c0ff] rounded-full shadow-lg mb-3 group-hover:scale-105 transition-transform duration-200">
          <PlayCircle className="size-7 text-white" />
        </div>
        <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">
          Watch: How credentialing works
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Placeholder for embedded video
        </p>
      </div>
    </div>

  </div>
</div>
```

---

### Rules

- Insert only between the Hero card and the Capabilities card — do not move, delete, or alter any other JSX anywhere in the file
- The vertical line (`absolute left-[13px]`) runs from `top-[14px]` to `bottom-[14px]` so it starts and ends at the center of the first and last circles respectively — do not change these values
- Each step circle uses `ring-2 ring-white dark:ring-gray-800` to visually cut through the line behind it, creating the connected tracker look
- Step 4 has no `pb-7` — this keeps the line from extending below the last circle
- The video placeholder uses `aspect-video` for 16:9 ratio — do not use `min-h` as the primary sizing on desktop
- `PlayCircle` must be added to the existing lucide import line — do not create a second import statement
- Every other part of the file — imports (except adding `PlayCircle`), all state, `globalContent`, `applications`, `getStatusBadge`, `filteredApplications`, Dev Mode banner, Header block, all of the Capabilities card, CTA card, and the entire Insurance table state — remains completely unchanged