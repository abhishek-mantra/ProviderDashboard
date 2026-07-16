Here's the detailed, explicit prompt:

---

## Update `CredentialStatus.tsx` and `InsurancePage.tsx` to match the design language of `mantra_credentialing_explainer_page.html`

---

### Global design system to apply (from the HTML file)

All changes must adopt these tokens throughout both files:

- **Font sizes**: body 13px, labels/eyebrows 11px uppercase tracked, titles 14–16px at weight 500 (not 700/bold)
- **Borders**: `0.5px solid` using CSS-equivalent Tailwind `border border-gray-200 dark:border-gray-700` — replace all `border-2` and thick borders
- **Border radius**: `rounded-lg` (8px) for most elements, `rounded-xl` (12px) for cards — replace all `rounded-2xl`
- **Spacing**: tighter padding — cards use `p-4` to `p-5`, sections use `py-5 px-5`
- **Colors**: primary action color is `#1a3352` (not `#1E3A8A`) — update all CTA buttons and step numbers
- **Headings**: weight `font-medium` (500) not `font-bold` (700) — apply to all `h2`, `h3`, section titles
- **Section labels**: small uppercase tracked muted labels above each section, styled as: `text-[11px] font-medium uppercase tracking-[0.07em] text-gray-400 dark:text-gray-500 mb-3`
- **No gradients anywhere** — remove `bg-gradient-to-r` from the Dev Mode banner; replace with flat `bg-[#1a3352]`

---

### Changes to `CredentialStatus.tsx` — No Insurance state

**Remove:**
- The entire `bg-[#F0F6FF]` hero card (shield icon header + 3 feature pills grid). Replace with the new hero section below.
- The CTA + Stats white card (the one with Start Your Application button + 70%/95%/50+ stats row).
- The "Our Capabilities" section (6-card grid).

**Replace the entire no-insurance state content with these 6 sections in order:**

---

**Section 1 — Hero (no card wrapper, just padded div with bottom border)**

```
border-b border-gray-200 dark:border-gray-700 pb-5 mb-5
```

Contents:
- Eyebrow text: `"Insurance credentialing & enrollment"` — `text-[11px] font-medium uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400 mb-2`
- H2 title: `"Get paid by insurance — without the paperwork"` — `text-[22px] font-medium text-gray-900 dark:text-white leading-snug mb-2`
- Subtitle paragraph: `"Mantra handles your credentialing and payer enrollment end-to-end. Once complete, you can accept patients whose insurance you're now in-network with, directly through the platform."` — `text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl`
- Pills row (`flex flex-wrap gap-2 mt-4`), 4 pills each styled as `inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-3 py-1 text-[13px] text-gray-500 dark:text-gray-400`:
  - Clock icon + `"5–10 min to apply"`
  - ThumbsUp icon + `"95% approval rate"`
  - ShieldCheck icon + `"50+ payer networks"`
  - DollarSign icon + `"No upfront fees"`

---

**Section 2 — How it works**

Wrapper: `border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-0`

- Section label: `"How it works"`
- 4 steps, each `flex gap-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0`:
  - Step number circle: `size-7 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[13px] font-medium flex items-center justify-center flex-shrink-0 mt-0.5`
  - Step title `text-[14px] font-medium text-gray-900 dark:text-white mb-0.5`
  - Step desc `text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed`
  - Step 3 gets a badge after the desc: `inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400` with text `"Live tracking available"`

Step content:
1. Title: `"You fill out the application"` / Desc: `"Provide your license info, NPI, malpractice insurance, and work history. Takes about 5–10 minutes."`
2. Title: `"Mantra prepares and submits your credentials"` / Desc: `"We assemble your CAQH profile, verify your documents, and submit applications to your selected payers. No back-and-forth from you."`
3. Title: `"Payers review and approve"` / Desc: `"Insurance companies typically take 60–120 days to process. You can track your status in real time from your dashboard."` + green badge `"Live tracking available"`
4. Title: `"You're in-network — start seeing insured patients"` / Desc: `"Once approved, eligible patients can book with you using their insurance. Mantra also handles claims submission and follow-ups."`

---

**Section 3 — Video placeholder** *(restored from original)*

Wrapper: `border border-gray-200 dark:border-gray-700 rounded-xl p-5`

- Section label: `"Credentialing walkthrough"`
- A dashed placeholder div: `flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750 min-h-[200px] cursor-pointer hover:border-[#1a3352] dark:hover:border-blue-500 transition-colors`
  - Inside: a `size-10 bg-[#1a3352] rounded-full flex items-center justify-center mb-2 shadow` with a `PlayCircle` icon (white, size-6)
  - Below: `text-[13px] font-medium text-gray-900 dark:text-white mb-1` — `"Watch: How credentialing works"`
  - Below: `text-[11px] text-gray-400` — `"Placeholder for embedded video"`

---

**Section 4 — What this unlocks for you**

Wrapper: `border border-gray-200 dark:border-gray-700 rounded-xl p-5`

- Section label: `"What this unlocks for you"`
- 4-column auto-fit grid `grid grid-cols-2 md:grid-cols-4 gap-3`:
  - Each card: `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3`
  - Icon: lucide icon at `size-5 text-blue-600 dark:text-blue-400 mb-2`
  - Title: `text-[13px] font-medium text-gray-900 dark:text-white mb-0.5`
  - Desc: `text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed`

4 cards:
- `Users` icon / `"Larger patient pool"` / `"Reach patients who can only see in-network providers."`
- `Receipt` icon / `"Faster, predictable pay"` / `"Insurance reimbursements are processed directly — no chasing payments."`
- `FileX` icon / `"Zero admin burden"` / `"We own all paperwork, follow-ups, and re-credentialing."`
- `BadgeCheck` icon / `"Credibility signal"` / `"Being in-network builds patient trust and visibility."`

---

**Section 5 — What you'll need to apply**

Wrapper: `border border-gray-200 dark:border-gray-700 rounded-xl p-5`

- Section label: `"What you'll need to apply"`
- Inner container: `bg-gray-50 dark:bg-gray-750 rounded-lg p-4`
- Checklist `flex flex-col gap-2`, each item `flex items-start gap-2 text-[13px] text-gray-500 dark:text-gray-400`:
  - `CheckCircle` icon `size-4 text-green-500 flex-shrink-0 mt-0.5`
  - 6 items:
    1. `"Active state license (in each state you practice)"`
    2. `"Individual NPI number (Type 1)"`
    3. `"Malpractice insurance certificate"`
    4. `"CAQH profile (we can help set one up if you don't have it)"`
    5. `"Work history for the past 5 years"`
    6. `"DEA certificate (if applicable)"`

---

**Section 6 — Common questions (FAQ)**

Wrapper: `border border-gray-200 dark:border-gray-700 rounded-xl p-5`

- Section label: `"Common questions"`
- 4 FAQ items, each `py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0`:
  - Question: `text-[13px] font-medium text-gray-900 dark:text-white mb-1`
  - Answer: `text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed`

FAQ content:
1. Q: `"Is there a cost to get credentialed through Mantra?"` / A: `"No. Credentialing and enrollment are included as part of your Mantra provider agreement."`
2. Q: `"Which insurance payers do you work with?"` / A: `"We work with 50+ major payers including Aetna, Cigna, UnitedHealth, BCBS, and Medicaid plans depending on your state."`
3. Q: `"How long does the process take?"` / A: `"The application itself takes 5–10 minutes. Payer approval typically takes 60–120 days. You can track status at any point."`
4. Q: `"What if I'm already credentialed with some payers?"` / A: `"Tell us in the application. We'll transfer or update your existing credentials rather than starting from scratch."`

---

**Section 7 — CTA box (bottom)**

Wrapper: `bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3`

- Title: `"Ready? Start your application"` — `text-[16px] font-medium text-gray-900 dark:text-white mb-1`
- Subtitle: `"You'll be redirected to Mantra Comply to fill in your details. Save progress and return anytime."` — `text-[13px] text-gray-500 dark:text-gray-400`
- Meta row `flex flex-wrap gap-4 text-[12px] text-gray-500 dark:text-gray-400`:
  - `CheckCircle` size-3.5 `text-green-500` + `"Takes 5–10 minutes"`
  - `CheckCircle` size-3.5 `text-green-500` + `"Save & resume anytime"`
  - `CheckCircle` size-3.5 `text-green-500` + `"No commitment to complete today"`
- CTA button as `<a href="https://pin-net-47185039.figma.site/" target="_blank" rel="noopener noreferrer"` styled as: `inline-flex items-center gap-2 bg-[#1a3352] hover:bg-[#243f66] text-white rounded-lg px-5 py-2.5 text-[14px] font-medium transition-colors w-fit`
  - `ShieldCheck` icon size-4 on left
  - Text: `"Start your application"`
  - `ExternalLink` icon size-3.5 on right

---

**Add to lucide imports:** `PlayCircle`, `CheckCircle`, `Users`, `Receipt`, `FileX`, `BadgeCheck`, `ShieldCheck`, `ThumbsUp`, `DollarSign`

**Remove from lucide imports** (no longer used): `Zap`, `Database`, `Bell`, `FolderLock`, `ClipboardCheck`, `LayoutDashboard`, `motion` import

**Keep all state variables and the hasInsurance toggle and the entire Insurance (hasInsurance = true) table section completely unchanged.**

---

### Changes to `InsurancePage.tsx`

**Dev Mode banner:** Change `bg-gradient-to-r from-orange-500 to-red-500 border-2 border-orange-600` to flat `bg-[#1a3352] border border-[#243f66]`. Update `text-orange-600` on the active toggle button to `text-[#1a3352]`. Keep all toggle logic identical.

**Page header:** Change the `h1` from `text-3xl` to `text-[22px] font-medium`. Change subtitle to `text-[14px]`.

**Tab bar:** Change `bg-gray-50 dark:bg-gray-700` pill container to `bg-gray-100 dark:bg-gray-800`. Change active tab from `bg-white dark:bg-gray-600` to `bg-white dark:bg-gray-700`. Tab text size to `text-[14px]`. Keep all tab logic and Claims section completely unchanged.