Here's the single final consolidated prompt:

---

## Final Prompt: Wire New Premium Modals to All Trigger Points (Both Plan Modes)

### Overview
The new `AddSessionNoteModal` and `AddPrescriptionModal` components exist in `/src/components/` but are not wired to any trigger points. The old modal flows are still opening. Replace all old modal triggers across 3 files with the new premium modals. These changes apply to **both Full EHR Plan and AI Transcriber Only modes** — no mode-gating at trigger points, the modal handles its own internal flow via `usePlanMode()`.

---

### File 1 — `Dashboard.tsx`

**Step 1:** Add imports at the top:
```tsx
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";
```

**Step 2:** Add two state variables inside `Dashboard()` function alongside existing state:
```tsx
const [isSessionNoteModalOpen, setIsSessionNoteModalOpen] = useState(false);
const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
```

**Step 3:** Find the Quick Action Banner (inside `{isTranscriberOnly && (...)}` block). Replace the two button `onClick` handlers:
```tsx
// REPLACE this:
onClick={() => navigate("/session-notes", { state: { openAddNotes: true } })}
// WITH:
onClick={() => setIsSessionNoteModalOpen(true)}

// REPLACE this:
onClick={() => navigate("/prescriptions", { state: { openAddPrescription: true } })}
// WITH:
onClick={() => setIsPrescriptionModalOpen(true)}
```

**Step 4:** Add both modals at the very bottom of the Dashboard return statement, just before the final closing `</div>`, outside any mode condition block:
```tsx
<AddSessionNoteModal
  isOpen={isSessionNoteModalOpen}
  onClose={() => setIsSessionNoteModalOpen(false)}
/>
<AddPrescriptionModal
  isOpen={isPrescriptionModalOpen}
  onClose={() => setIsPrescriptionModalOpen(false)}
/>
```

---

### File 2 — `SessionNotesList.tsx`

**Step 1:** Add import at the top:
```tsx
import { AddSessionNoteModal } from "../components/AddSessionNoteModal";
```

**Step 2:** Remove old state, add new state:
```tsx
// REMOVE:
const [showAddNotesFlow, setShowAddNotesFlow] = useState(false);
const [selectedClientForNotes, setSelectedClientForNotes] = useState<string | null>(null);
const [clientSearchQuery, setClientSearchQuery] = useState("");

// ADD:
const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
```

**Step 3:** Update the `useEffect` that watches `location.state`:
```tsx
// REPLACE:
useEffect(() => {
  if (location.state?.openAddNotes) {
    setShowAddNotesFlow(true);
  }
}, [location.state]);

// WITH:
useEffect(() => {
  if (location.state?.openAddNotes) {
    setIsAddNoteModalOpen(true);
  }
}, [location.state]);
```

**Step 4:** Find and update every button that previously called `setShowAddNotesFlow(true)`. There are 2 of them:
```tsx
// Header "+ Add Notes" button — REPLACE onClick:
onClick={() => setIsAddNoteModalOpen(true)}

// Empty state "Add First Note" button — REPLACE onClick:
onClick={() => setIsAddNoteModalOpen(true)}
```

**Step 5:** Delete the entire old modal JSX block. Find the comment `{/* Add Notes Flow Modal */}` and delete everything from that line to its closing `)}` — this is the large `{showAddNotesFlow && (<div className="fixed inset-0 ...">...</div>)}` block.

**Step 6:** Add new modal just before the final closing `</div>` of the return:
```tsx
<AddSessionNoteModal
  isOpen={isAddNoteModalOpen}
  onClose={() => setIsAddNoteModalOpen(false)}
/>
```

---

### File 3 — `Prescriptions.tsx`

**Step 1:** Add import at the top:
```tsx
import { AddPrescriptionModal } from "../components/AddPrescriptionModal";
```

**Step 2:** Remove old state, add new state:
```tsx
// REMOVE:
const [showSelectClientModal, setShowSelectClientModal] = useState(false);
const [clientModalSearchQuery, setClientModalSearchQuery] = useState("");

// ADD:
const [isAddPrescriptionModalOpen, setIsAddPrescriptionModalOpen] = useState(false);
```

**Step 3:** Update the `useEffect` that watches `location.state`:
```tsx
// REPLACE:
useEffect(() => {
  if (location.state?.openAddPrescription) {
    setShowSelectClientModal(true);
  }
}, [location.state]);

// WITH:
useEffect(() => {
  if (location.state?.openAddPrescription) {
    setIsAddPrescriptionModalOpen(true);
  }
}, [location.state]);
```

**Step 4:** Find and update every button that previously called `setShowSelectClientModal(true)`. There are 2 of them:
```tsx
// Header "+ Add" button — REPLACE onClick:
onClick={() => setIsAddPrescriptionModalOpen(true)}

// Empty state "Add First Prescription" button — REPLACE onClick:
onClick={() => setIsAddPrescriptionModalOpen(true)}
```

**Step 5:** Delete the entire old modal JSX block. Find the comment `{/* Select Client Modal */}` and delete everything from that line to its closing `)}`.

**Step 6:** Add new modal just before the final closing `</div>` of the return:
```tsx
<AddPrescriptionModal
  isOpen={isAddPrescriptionModalOpen}
  onClose={() => setIsAddPrescriptionModalOpen(false)}
/>
```

**Step 7:** Remove `clientFilterSearchQuery` cleanup — keep it as it's used by the existing client filter dropdown, not the modal.

---

### Verification Checklist After Changes

| Trigger Point | File Changed | Expected Result |
|---|---|---|
| `/home` → "Create Session Note" button | `Dashboard.tsx` | Opens `AddSessionNoteModal` |
| `/home` → "Create Prescription" button | `Dashboard.tsx` | Opens `AddPrescriptionModal` |
| `/session-notes` → "+ Add Notes" button | `SessionNotesList.tsx` | Opens `AddSessionNoteModal` |
| `/session-notes` → "Add First Note" empty state | `SessionNotesList.tsx` | Opens `AddSessionNoteModal` |
| `/prescriptions` → "+ Add" button | `Prescriptions.tsx` | Opens `AddPrescriptionModal` |
| `/prescriptions` → "Add First Prescription" empty state | `Prescriptions.tsx` | Opens `AddPrescriptionModal` |

All 6 trigger points open the new premium modal. Modal internally reads `usePlanMode()` and renders the correct flow. No mode-gating needed at trigger level.