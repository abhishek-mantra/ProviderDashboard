Here's the precise fix prompt:

---

## Fix Prompt: Two Corrections to Modal Flow

### Correction 1 — Dashboard "Create Session Note" & "Create Prescription" Buttons

**Problem:** Clicking these buttons on `/home` opens the modal directly on the home page. The correct behavior is to **navigate to the respective page first**, then the modal opens automatically on arrival.

**Fix in `Dashboard.tsx`:**

Remove the modal imports, state, and modal JSX that were added in the previous fix. Revert these two buttons back to navigation but keep the state-trigger pattern via `location.state`:

```tsx
// REMOVE these imports from Dashboard.tsx:
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";

// REMOVE these states from Dashboard():
const [isSessionNoteModalOpen, setIsSessionNoteModalOpen] = useState(false);
const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

// REMOVE the two modal JSX instances at bottom of return

// REVERT buttons back to navigate with state:
<button onClick={() => navigate("/session-notes", { state: { openAddNotes: true } })}>
  Create Session Note
</button>
<button onClick={() => navigate("/prescriptions", { state: { openAddPrescription: true } })}>
  Create Prescription
</button>
```

This way:
- Clicking "Create Session Note" → navigates to `/session-notes` → `useEffect` in `SessionNotesList.tsx` detects `location.state.openAddNotes === true` → sets `isAddNoteModalOpen(true)` → modal opens automatically on the session notes page
- Clicking "Create Prescription" → navigates to `/prescriptions` → `useEffect` in `Prescriptions.tsx` detects `location.state.openAddPrescription === true` → sets `isAddPrescriptionModalOpen(true)` → modal opens automatically on the prescriptions page

**No changes needed** to `SessionNotesList.tsx` or `Prescriptions.tsx` for this correction — the `useEffect` hooks already handle this correctly from the previous fix.

---

### Correction 2 — Remove "Add Transcript" Upload Box from "Without Transcript" Form Step

**Problem:** The "Without Transcript" form step shows a dashed upload box with `📎 Add Transcript Optional`, `Upload or record audio for AI-assisted filling`, `Upload File` and `Record Now` buttons. This entire section must be removed and replaced with a single simple CTA button that routes to `/ai-transcriber` with the add transcript modal in active/open state.

**Fix in `AddSessionNoteModal.tsx` AND `AddPrescriptionModal.tsx` — identical change in both files:**

In the `step === "form"` section, find and **delete** the entire optional transcript upload box:

```tsx
// DELETE this entire block in both modal files:
<div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#CBD5E1] rounded-2xl p-4">
  <div className="flex items-start justify-between mb-2">
    <div className="flex items-center gap-2">
      <span className="text-[14px] font-bold text-[#374151]">📎 Add Transcript</span>
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#94A3B8] font-medium">
        Optional
      </span>
    </div>
  </div>
  <p className="text-[12px] text-[#94A3B8] mb-3">
    Upload or record audio for AI-assisted filling
  </p>
  {!transcriptFile ? (
    <div className="grid grid-cols-2 gap-2">
      <button onClick={() => setTranscriptFile("uploaded_file.mp3")} ...>
        <Upload className="size-3.5" /> Upload File
      </button>
      <button onClick={() => setTranscriptFile("recorded_session.mp3")} ...>
        <Mic className="size-3.5" /> Record Now
      </button>
    </div>
  ) : (
    <div ...> {/* success state */} </div>
  )}
</div>
```

**Replace with a single CTA button:**

For `AddSessionNoteModal.tsx`:
```tsx
<button
  onClick={() => {
    onClose();
    navigate("/ai-transcriber", { state: { openAddTranscript: true } });
  }}
  className="w-full h-11 flex items-center justify-center gap-2 bg-[#EFF6FF] border-[1.5px] border-[#BFDBFE] rounded-xl text-[#2563EB] text-[14px] font-semibold hover:bg-[#DBEAFE] transition-all"
>
  <Mic className="size-4" />
  Add Transcript
</button>
```

For `AddPrescriptionModal.tsx`:
```tsx
<button
  onClick={() => {
    onClose();
    navigate("/ai-transcriber", { state: { openAddTranscript: true } });
  }}
  className="w-full h-11 flex items-center justify-center gap-2 bg-[#FFF1F7] border-[1.5px] border-[#FBCFE8] rounded-xl text-[#9D174D] text-[14px] font-semibold hover:bg-[#FCE7F3] transition-all"
>
  <Mic className="size-4" />
  Add Transcript
</button>
```

**Also remove now-unused state and imports in both modal files:**

```tsx
// REMOVE from both modal files:
const [transcriptFile, setTranscriptFile] = useState<string | null>(null);

// REMOVE Upload import from both modal files (no longer needed):
import { ..., Upload, ... } from "lucide-react";
// Keep Mic as it's still used in the button above
```

---

### Also remove the label text above the button in the form step

Currently there may be a label like `"📎 Add Transcript"` or a section header above the upload box. Since the box is gone, just the single button remains with no label above it — the button itself is self-descriptive.

---

### Summary of Changes

| File | Change |
|---|---|
| `Dashboard.tsx` | Revert modal open to `navigate()` with `location.state` — modal opens on destination page |
| `AddSessionNoteModal.tsx` | Remove dashed upload box, replace with single "Add Transcript" button → navigates to `/ai-transcriber` |
| `AddPrescriptionModal.tsx` | Same as above with pink accent colors |