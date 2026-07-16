Implementation Prompt: EHR Mode — AI Transcriber / Session Notes / Prescriptions default to Show More
Core concept change
In EHR mode, ai-transcriber, session-notes, and prescriptions are opt-in main nav items. They should only appear in the main nav if the user explicitly selected them during onboarding. In all other cases — including "Everything sounds useful" / no selection / select-all — they live in Show More as "tap to show" items.
This means they must be hidden by default in EHR/Provider mode and only un-hidden when the user selects them. The current logic is inverted: it hides items the user did NOT select, but for these three items the correct behavior is to hide them unless selected.

FILE 1: OnboardingEHRAIScribe.tsx
Change — handleGetStarted sidebar logic.
Find the else if (selectedPurposes.size > 0) branch that builds toHide. Currently it hides keys the user did NOT select. Add a new step after this existing logic that also handles the EHR-specific default: if the user is in full-ehr signup mode and did NOT select AI Transcription / Session Notes / Prescription Management, ensure those three keys are in sidebar_hidden_items.
But more importantly, fix the selectAll branch and the zero-selection branch to explicitly hide these three keys in EHR mode:
Replace the entire sidebar personalization block with this:
ts// EHR-specific keys that are opt-in: only shown in main nav if explicitly selected
const ehrOptInKeys = signupMode !== "ai-scribe"
  ? ['ai-transcriber', 'session-notes', 'prescriptions']
  : [];

if (selectAll) {
  // "Everything" selected — clear any previous hidden items BUT
  // in EHR mode, ai-transcriber/session-notes/prescriptions still go to Show More
  // (they are opt-in features, not default main nav items in EHR mode)
  const hiddenInSelectAll = ehrOptInKeys; // hide opt-in keys even on select-all in EHR
  if (hiddenInSelectAll.length > 0) {
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(hiddenInSelectAll));
  } else {
    localStorage.removeItem("sidebar_hidden_items");
  }
} else if (selectedPurposes.size > 0) {
  // Build selected sidebar keys from purpose selections
  const selectedSidebarKeys = new Set<string>();
  purposes.forEach(p => {
    if (p.sidebarKey && selectedPurposes.has(p.label)) {
      selectedSidebarKeys.add(p.sidebarKey);
    }
  });

  const allOptionalKeys = purposes.map(p => p.sidebarKey).filter(Boolean) as string[];

  // Keys to hide = optional keys NOT selected + EHR opt-in keys NOT selected
  const toHide = Array.from(new Set([
    ...allOptionalKeys.filter(k =>
      !selectedSidebarKeys.has(k) &&
      !alwaysVisible.has(k)
    ),
    // Always hide EHR opt-in keys unless the user specifically selected them
    ...ehrOptInKeys.filter(k => !selectedSidebarKeys.has(k)),
  ]));

  if (toHide.length > 0) {
    const existing = JSON.parse(localStorage.getItem("sidebar_hidden_items") || "[]") as string[];
    const merged = Array.from(new Set([...existing, ...toHide]));
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(merged));
  } else {
    localStorage.removeItem("sidebar_hidden_items");
  }
} else {
  // User selected nothing — hide EHR opt-in keys so they land in Show More by default
  if (ehrOptInKeys.length > 0) {
    localStorage.setItem("sidebar_hidden_items", JSON.stringify(ehrOptInKeys));
  } else {
    localStorage.removeItem("sidebar_hidden_items");
  }
}
Note: remove the old transcriberProtectedKeys logic entirely — it is no longer needed because ehrOptInKeys is already empty for ai-scribe mode (the ternary above sets it to []), and transcriber mode has its own transciberForcedVisible set in Layout.tsx that always shows those three items regardless of hiddenItems.

FILE 2: Layout.tsx
No structural changes needed. The existing hiddenFromOrder(order).filter(...).map(...) block in Show More already correctly shows hidden items with "tap to show". Once the onboarding writes ai-transcriber, session-notes, prescriptions into sidebar_hidden_items for EHR mode, they will automatically appear in Show More.
However, one small fix is needed: the filter that removes transcriber-forced items from Show More must NOT apply in EHR mode. Confirm the filter reads exactly:
tsx.filter(key => {
  if (isTranscriberOnly && (
    key === 'ai-transcriber' ||
    key === 'session-notes' ||
    key === 'prescriptions'
  )) return false;
  return true;
})
This is already correct — it only filters in isTranscriberOnly mode, so EHR mode will correctly show them in Show More with "tap to show".

Verification table
User action in onboarding (EHR mode)ai-transcriber in main nav?ai-transcriber in Show More?Selects "AI Session Transcription"✅ Yes❌ NoSelects "Everything sounds useful"❌ No✅ Yes (tap to show)Selects nothing❌ No✅ Yes (tap to show)Selects other features but NOT AI Transcription❌ No✅ Yes (tap to show)
Same logic applies identically to session-notes and prescriptions.
AI Scribe mode is unaffected — ehrOptInKeys is [] for ai-scribe, and transciberForcedVisible in Layout.tsx keeps those three items pinned to the main nav regardless of hiddenItems.Sonnet 4.6 LowClaude is AI and can make mist