Here is the precise implementation prompt:

---

## Implementation Prompt: Premiumize AI Transcript Popup + Prescription Visibility Gating Across All AI Scribe Surfaces

### Context & Product Logic

Two changes needed:

**Change 1 — Premiumize "Add Transcript" popup in all three plan modes.** Currently the `showAddTranscriptModal` in `AITranscriber.tsx` renders a plain modal. In all three modes (full-ehr, provider, transcriber-only), when the user clicks "Add Transcript" or "Add First Transcript", the same premium-styled popup used in the Dashboard must appear — with the same gradient header, icon, and card-based design language.

**Change 2 — Prescription visibility gating across all AI Scribe surfaces.** The `ai_scribe_prescription_pref` localStorage key (`"yes"`, `"maybe"`, `"no"`, `null`) already gates the sidebar and dashboard. It must now also gate every surface where "Create Prescription" or "Prepare Prescription" appears as an action in transcriber-only mode. The rule: if `pref === "maybe"` or `pref === "no"`, hide all prescription CTAs. Only `"yes"` or `null` (default) shows them.

The surfaces to gate:
- `RecordingScreen.tsx` — `ReviewModal` bottom action buttons ("Prepare Prescription" button)
- `AITranscriber.tsx` — "Prepare Prescription" button in the Add Transcript modal footer
- `Dashboard.tsx` — Quick Action Banner "Create Prescription" button (already done — confirm it's reading from localStorage correctly)

---

### FILE 1: `AITranscriber.tsx`

**Change 1A — Replace the plain Add Transcript modal header with the premium-styled gradient header.**

Find the existing modal header block inside `{showAddTranscriptModal && (...)}`:

```tsx
{/* Modal Header */}
<div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
    Add New Transcript
  </h2>
  <button
    onClick={() => { setShowAddTranscriptModal(false); ... }}
    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  >
    <X className="size-5 md:size-6" />
  </button>
</div>
```

Replace with:

```tsx
{/* Premium Gradient Header */}
<div
  className="relative px-6 pt-6 pb-5 rounded-t-2xl"
  style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
>
  <button
    onClick={() => {
      setShowAddTranscriptModal(false);
      setClientName("");
      setTranscriptTab("record");
      setRecordingSaved(false);
      setRecordingTime(0);
      setSavedRecordingDuration("");
      setUploadedFile(null);
      setTypedTranscript("");
      setBriefOverview("");
    }}
    className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
  >
    <X className="size-4 text-white" />
  </button>
  <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
    <Mic className="size-7 text-white" strokeWidth={1.5} />
  </div>
  <h2 className="text-xl font-bold text-white mb-1">Add New Transcript</h2>
  <p className="text-sm text-blue-100 leading-relaxed">
    Record, upload, or type your session transcript
  </p>
</div>
```

**Change 1B — Prescription gating in the Add Transcript modal footer.**

Find the "Prepare Prescription" button in the modal's action button grid (Row 2):

```tsx
<button
  disabled={!isFormValid}
  onClick={() => {
    setShowAddTranscriptModal(false);
    setClientName("");
    navigate(`/clients/1/prescriptions/create?source=transcriber&sessionId=1`);
  }}
  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-xl transition-all font-semibold text-sm ${
    isFormValid
      ? "bg-pink-50 ... text-pink-700 ... border-pink-200 ..."
      : "bg-gray-100 ... text-gray-400 ... cursor-not-allowed opacity-50"
  }`}
>
  <Pill className="size-4 flex-shrink-0" />
  <span>Prepare Prescription</span>
</button>
```

Wrap it with a prescription pref check:

```tsx
{(() => {
  const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
  const showRx = rxPref === "yes" || rxPref === null;
  if (!showRx) return null;
  return (
    <button
      disabled={!isFormValid}
      onClick={() => {
        setShowAddTranscriptModal(false);
        setClientName("");
        navigate(`/clients/1/prescriptions/create?source=transcriber&sessionId=1`);
      }}
      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-xl transition-all font-semibold text-sm ${
        isFormValid
          ? "bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-700"
          : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-50"
      }`}
    >
      <Pill className="size-4 flex-shrink-0" />
      <span>Prepare Prescription</span>
    </button>
  );
})()}
```

Also update the grid wrapper: when the prescription button is hidden, the "Prepare Session Notes" button should span full width. Change the grid div:

```tsx
{/* BEFORE */}
<div className="grid grid-cols-2 gap-2">
  {/* Prepare Session Notes button */}
  {/* Prepare Prescription button (now conditionally shown) */}
</div>

{/* AFTER */}
{(() => {
  const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
  const showRx = rxPref === "yes" || rxPref === null;
  return (
    <div className={showRx ? "grid grid-cols-2 gap-2" : "grid grid-cols-1 gap-2"}>
      <button
        disabled={!isFormValid}
        onClick={() => {
          setShowAddTranscriptModal(false);
          setClientName("");
          navigate(`/clients/1/notes/add?source=transcriber&sessionId=1`);
        }}
        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-xl transition-all font-semibold text-sm ${
          isFormValid
            ? "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700"
            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-50"
        }`}
      >
        <ClipboardList className="size-4 flex-shrink-0" />
        <span>Prepare Session Notes</span>
      </button>
      {showRx && (
        <button
          disabled={!isFormValid}
          onClick={() => {
            setShowAddTranscriptModal(false);
            setClientName("");
            navigate(`/clients/1/prescriptions/create?source=transcriber&sessionId=1`);
          }}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-xl transition-all font-semibold text-sm ${
            isFormValid
              ? "bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-700"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-50"
          }`}
        >
          <Pill className="size-4 flex-shrink-0" />
          <span>Prepare Prescription</span>
        </button>
      )}
    </div>
  );
})()}
```

---

### FILE 2: `RecordingScreen.tsx`

**Change 2A — Gate "Prepare Prescription" button in `ReviewModal`.**

The `ReviewModal` component currently always renders both "Prepare Session Notes" and "Prepare Prescription" buttons in its bottom section. The prescription button must be hidden when `ai_scribe_prescription_pref` is `"maybe"` or `"no"`.

The `ReviewModal` component is called from `RecordingScreen` — the pref value needs to be read and passed as a prop. 

Step A — Add `showPrescription` prop to the `ReviewModalProps` interface:

```ts
interface ReviewModalProps {
  clientName: string;
  noteType: string;
  duration: string;
  sessionDate: string;
  sessionTime: string;
  overview: string;
  showPrescription: boolean;   // NEW
  onClose: () => void;
  onPrepareNotes: (...) => void;
  onPreparePrescription: (...) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onOverviewChange: (overview: string) => void;
}
```

Step B — Inside `ReviewModal`, wrap the "Prepare Prescription" button and conditionally adjust the bottom section layout:

Find the `{/* Bottom Section - Action Buttons */}` div. Replace it:

```tsx
{/* Bottom Section - Action Buttons */}
<div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-b-[24px] px-8 py-5 border-t border-[#F1F5F9] dark:border-gray-700 flex flex-col gap-2">
  <button
    onClick={() => onPrepareNotes({ sessionDate, sessionTime, overview })}
    className="w-full h-14 flex items-center justify-center gap-2.5 rounded-[14px] text-[15px] font-bold text-white transition-all hover:scale-[1.01]"
    style={{
      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
      boxShadow: '0 4px 16px rgba(37,99,235,0.30)',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
    onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB, #1d4ed8)')}
  >
    <ClipboardList className="size-[18px]" />
    Prepare Session Notes
  </button>
  {showPrescription && (
    <button
      onClick={() => onPreparePrescription({ sessionDate, sessionTime, overview })}
      className="w-full h-14 flex items-center justify-center gap-2.5 rounded-[14px] text-[15px] font-bold text-white transition-all hover:scale-[1.01]"
      style={{
        background: 'linear-gradient(135deg, #DB2777, #be185d)',
        boxShadow: '0 4px 16px rgba(219,39,119,0.28)',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#be185d')}
      onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #DB2777, #be185d)')}
    >
      <Pill className="size-[18px]" />
      Prepare Prescription
    </button>
  )}
</div>
```

Step C — In `RecordingScreen`, read `ai_scribe_prescription_pref` and pass `showPrescription` to `ReviewModal`. Find the `<ReviewModal>` usage:

```tsx
{/* BEFORE */}
<ReviewModal
  clientName={clientName}
  noteType={noteType}
  duration={finalDuration}
  sessionDate={sessionDate}
  sessionTime={sessionTime}
  overview={overview}
  onClose={handleCloseModal}
  onPrepareNotes={handlePrepareNotes}
  onPreparePrescription={handlePreparePrescription}
  onDateChange={setSessionDate}
  onTimeChange={setSessionTime}
  onOverviewChange={setOverview}
/>
```

```tsx
{/* AFTER */}
{(() => {
  const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
  const showRx = rxPref === "yes" || rxPref === null;
  return (
    <ReviewModal
      clientName={clientName}
      noteType={noteType}
      duration={finalDuration}
      sessionDate={sessionDate}
      sessionTime={sessionTime}
      overview={overview}
      showPrescription={showRx}
      onClose={handleCloseModal}
      onPrepareNotes={handlePrepareNotes}
      onPreparePrescription={handlePreparePrescription}
      onDateChange={setSessionDate}
      onTimeChange={setSessionTime}
      onOverviewChange={setOverview}
    />
  );
})()}
```

---

### FILE 3: `Dashboard.tsx` — Verify existing gating is correct

The Quick Action Banner already reads `ai_scribe_prescription_pref` and gates the "Create Prescription" button. Confirm the IIFE reads `localStorage.getItem("ai_scribe_prescription_pref")` and that `showPrescriptionButton` is `rxPref === "yes" || rxPref === null`. No change needed if this is already in place from the previous fix.

---

### Prescription Gating Summary Table

| Surface | File | Gated? After Fix |
|---|---|---|
| Dashboard Quick Action Banner | `Dashboard.tsx` | ✅ Already done |
| Sidebar main nav / Show More | `Layout.tsx` | ✅ Already done |
| Add Transcript modal footer | `AITranscriber.tsx` | ✅ Fixed here |
| Recording complete modal | `RecordingScreen.tsx` | ✅ Fixed here |

### Pref → Prescription visibility rule (all surfaces)

| `ai_scribe_prescription_pref` | Show prescription CTAs? |
|---|---|
| `"yes"` | ✅ Yes |
| `null` (not set / default) | ✅ Yes |
| `"maybe"` | ❌ No |
| `"no"` | ❌ No |

---

### Summary of all file changes

| File | Change |
|---|---|
| `AITranscriber.tsx` | Replace plain modal header with premium gradient header (Mic icon, blue gradient, styled close button); gate "Prepare Prescription" button and grid layout based on `ai_scribe_prescription_pref` |
| `RecordingScreen.tsx` | Add `showPrescription` prop to `ReviewModalProps`; conditionally render prescription button in `ReviewModal` bottom section; read pref and pass prop at `ReviewModal` call site |
| `Dashboard.tsx` | Verify existing gating — no new changes needed |