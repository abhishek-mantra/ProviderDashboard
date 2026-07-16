Here is the precise implementation prompt:

---

## Implementation Prompt: Prescription Preference Question in AI Scribe Onboarding

### Context & Product Logic

In AI Scribe mode, providers come from diverse specialties — therapists, counselors, and coaches never prescribe, while psychiatrists and physicians do. Currently, Prescriptions is force-shown in the sidebar for all AI Scribe users regardless of clinical need. This creates noise for the majority who don't need it.

The fix introduces a single contextual question in the AI Scribe onboarding right panel, asked after profession selection, that lets the user declare their relationship with prescriptions. The answer drives sidebar visibility and dashboard card visibility for that user's session.

---

### The Three States

| User Choice | Sidebar | Dashboard Quick Access |
|---|---|---|
| **Yes, I prescribe** | Prescriptions shown in main nav | Prescriptions card visible |
| **Keep it available, I may need it** | Prescriptions in Show More ("tap to show") | Prescriptions card hidden |
| **No, I don't prescribe** | Prescriptions removed entirely (not in Show More either) | Prescriptions card hidden |

---

### FILE 1: `OnboardingEHRAIScribe.tsx`

**Step 1 — Add state for the prescription preference.**

Add this state variable with the profession states:

```ts
type PrescriptionPreference = "yes" | "maybe" | "no" | null;
const [prescriptionPreference, setPrescriptionPreference] = useState<PrescriptionPreference>(null);
```

**Step 2 — Add the UI question block in the right panel, after the profession selector div and before the Get Started button, but only when `isAiScribe` is true.**

Find the closing `</div>` of the profession selector block (the one with `mb-12` in AI Scribe mode) and insert this immediately after it:

```tsx
{/* Prescription preference — AI Scribe mode only */}
{isAiScribe && (
  <div className="mb-10">
    <label className="block text-[#0F172A] mb-1" style={{ fontSize: 14, fontWeight: 600 }}>
      Do you write prescriptions in your practice?
    </label>
    <p className="text-[#64748B] mb-4" style={{ fontSize: 12 }}>
      This helps us tailor your workspace. You can always change this in settings.
    </p>
    <div className="space-y-3">
      {[
        {
          value: "yes" as const,
          title: "Yes, I prescribe",
          desc: "I'm a psychiatrist, physician, or clinician who regularly writes prescriptions.",
        },
        {
          value: "maybe" as const,
          title: "Keep it available — I may need it occasionally",
          desc: "I don't prescribe often but want the option accessible.",
        },
        {
          value: "no" as const,
          title: "No, I don't prescribe",
          desc: "I'm a therapist, counselor, or coach. Remove this from my workspace.",
        },
      ].map(({ value, title, desc }) => (
        <button
          key={value}
          type="button"
          onClick={() => setPrescriptionPreference(value)}
          className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all ${
            prescriptionPreference === value
              ? "border-[#043570] bg-[#f0f6ff]"
              : "border-[#e5e7eb] bg-white hover:border-[#043570]/40"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`size-4 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              prescriptionPreference === value
                ? "border-[#043570] bg-[#043570]"
                : "border-[#CBD5E1]"
            }`}>
              {prescriptionPreference === value && (
                <div className="size-1.5 rounded-full bg-white" />
              )}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#0F172A] leading-tight mb-0.5">{title}</p>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{desc}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
)}
```

**Step 3 — Update `handleGetStarted` to write prescription preference into localStorage for the AI Scribe path.**

The existing `handleGetStarted` for `ai-scribe` sets `ehrOptInKeys` to `[]` so nothing gets written to `sidebar_hidden_items`. We need to write prescription-specific hidden state after that block.

Find the line:

```ts
if (signupMode === "ai-scribe") setPlanMode("transcriber-only");
```

Insert this block immediately **before** that line:

```ts
// ── AI Scribe: prescription preference ──────────────────────────
if (signupMode === "ai-scribe") {
  const pref = prescriptionPreference;

  if (pref === "yes" || pref === null) {
    // Show prescriptions in main nav — ensure it's NOT in hidden items
    const current: string[] = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]");
    const filtered = current.filter(k => k !== "prescriptions");
    if (filtered.length > 0) {
      localStorage.setItem("sidebar_hidden_items", JSON.stringify(filtered));
    } else {
      localStorage.removeItem("sidebar_hidden_items");
    }
    // Dashboard: make prescriptions card visible
    const hiddenCards: string[] = JSON.parse(localStorage.getItem("dashboard_hidden_cards") || "[]");
    const filteredCards = hiddenCards.filter(id => id !== "prescriptions");
    if (filteredCards.length > 0) {
      localStorage.setItem("dashboard_hidden_cards", JSON.stringify(filteredCards));
    } else {
      localStorage.removeItem("dashboard_hidden_cards");
    }
    localStorage.setItem("ai_scribe_prescription_pref", "yes");

  } else if (pref === "maybe") {
    // Move prescriptions to Show More — add to sidebar_hidden_items
    const current: string[] = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]");
    const updated = Array.from(new Set([...current, "prescriptions"]));
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(updated));
    // Dashboard: hide prescriptions card
    const hiddenCards: string[] = JSON.parse(localStorage.getItem("dashboard_hidden_cards") || "[]");
    const updatedCards = Array.from(new Set([...hiddenCards, "prescriptions"]));
    localStorage.setItem("dashboard_hidden_cards", JSON.stringify(updatedCards));
    localStorage.setItem("ai_scribe_prescription_pref", "maybe");

  } else if (pref === "no") {
    // Remove prescriptions entirely from sidebar AND dashboard
    // In Layout.tsx, transciberForcedVisible pins prescriptions to main nav.
    // We need a separate flag to override that behavior.
    const current: string[] = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]");
    const updated = Array.from(new Set([...current, "prescriptions"]));
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(updated));
    // Dashboard: hide prescriptions card
    const hiddenCards: string[] = JSON.parse(localStorage.getItem("dashboard_hidden_cards") || "[]");
    const updatedCards = Array.from(new Set([...hiddenCards, "prescriptions"]));
    localStorage.setItem("dashboard_hidden_cards", JSON.stringify(updatedCards));
    localStorage.setItem("ai_scribe_prescription_pref", "no");
  }
}
// ────────────────────────────────────────────────────────────────
```

**Step 4 — Shorten the "Create Session Note" button width in AI Scribe mode.** The Quick Action Banner in `Dashboard.tsx` has two buttons in a `flex gap-3` row. When prescriptions preference is `"no"`, the prescription button is hidden and the session note button stretches full width. Since this is driven by `dashboard_hidden_cards` at render time and not by a prop, no Dashboard change is needed — the `flex-1` on each button already handles layout correctly when one is removed.

However, to prevent the session note button from feeling too wide when it's the sole button, wrap the banner in a `max-w` constraint. In `Dashboard.tsx`, find:

```tsx
<div className="max-w-[640px] mx-auto mt-4 flex gap-3">
```

No change needed here — `flex-1` distributes space naturally. The buttons will be equal width when both present and full width when alone, which is correct product behavior.

---

### FILE 2: `Layout.tsx`

**The `transciberForcedVisible` set currently force-renders prescriptions in the AI Scribe main nav regardless of `hiddenItems`. We need to respect the `"no"` preference.**

Find this line inside the nav IIFE:

```ts
const transciberForcedVisible = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);
```

Replace it with:

```ts
const aiScribePrescriptionPref = localStorage.getItem("ai_scribe_prescription_pref");
const transciberForcedVisible = new Set(
  aiScribePrescriptionPref === "no"
    ? ['ai-transcriber', 'session-notes']           // prescriptions fully excluded
    : ['ai-transcriber', 'session-notes', 'prescriptions']
);
```

Then find the `hiddenFromOrder(order).filter(...)` block inside Show More and add the `"no"` exclusion alongside the existing transcriber filter:

```tsx
.filter(key => {
  if (isTranscriberOnly && (
    key === 'ai-transcriber' ||
    key === 'session-notes'
  )) return false;
  // If user said "no" to prescriptions, hide from Show More entirely
  if (isTranscriberOnly && key === 'prescriptions' && aiScribePrescriptionPref === 'no') return false;
  // If user said "maybe", allow prescriptions in Show More (it will appear as "tap to show")
  // If user said "yes" or null, prescriptions is in main nav via transciberForcedVisible, so not in hiddenFromOrder anyway
  return true;
})
```

---

### Verification Table

| Profession selected | Prescription preference | Main nav | Show More | Dashboard card |
|---|---|---|---|---|
| Psychiatrist | Yes, I prescribe | ✅ Prescriptions | ❌ | ✅ Visible |
| Therapist | No, I don't prescribe | ❌ | ❌ (fully removed) | ❌ Hidden |
| Counselor | Keep available | ❌ | ✅ "tap to show" | ❌ Hidden |
| Any | No answer (null) | ✅ Default shown | ❌ | ✅ Visible |

---

### Summary of Changes

| File | Change |
|---|---|
| `OnboardingEHRAIScribe.tsx` | Add `prescriptionPreference` state; add 3-option radio card UI block; write `ai_scribe_prescription_pref` + update `sidebar_hidden_items` and `dashboard_hidden_cards` based on choice |
| `Layout.tsx` | Read `ai_scribe_prescription_pref` from localStorage; conditionally exclude `prescriptions` from `transciberForcedVisible`; exclude from Show More filter when pref is `"no"` |
| `Dashboard.tsx` | No structural changes needed — existing `visibleCards` reads from `dashboard_hidden_cards` which is already written correctly by onboarding |