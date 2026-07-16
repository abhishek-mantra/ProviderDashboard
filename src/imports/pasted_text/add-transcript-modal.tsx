Here is the precise implementation prompt:

---

## Implementation Prompt: Three Fixes — Premium Add Transcript Modal UI, Client-First Flow, Provider Mode Sidebar Fix

---

### FIX 1 — Premium Add Transcript Modal UI in `AITranscriber.tsx`

The current modal is a flat form. Redesign it to match the premium design language already used in the app — gradient header, animated waveform during recording, proper hierarchy, no client name field (client is selected before opening per Fix 2).

**Step A — Replace the entire modal JSX** inside `{showAddTranscriptModal && (...)}`. The new modal structure:

```tsx
{showAddTranscriptModal && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={() => {
      setShowAddTranscriptModal(false);
      setTranscriptTab("record");
      setIsRecording(false);
      setRecordingTime(0);
      setRecordingSaved(false);
      setSavedRecordingDuration("");
      setUploadedFile(null);
      setTypedTranscript("");
      setBriefOverview("");
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Premium Gradient Header */}
      <div
        className="relative px-6 pt-6 pb-5"
        style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
      >
        <button
          onClick={() => {
            setShowAddTranscriptModal(false);
            setTranscriptTab("record");
            setIsRecording(false);
            setRecordingTime(0);
            setRecordingSaved(false);
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
        <p className="text-sm text-blue-100">
          {selectedClientForTranscript
            ? `Recording for ${selectedClientForTranscript.name}`
            : "Record, upload, or type your session transcript"}
        </p>
      </div>

      {/* Tab Selector */}
      <div className="px-6 pt-5 pb-0">
        <div className="bg-[#F1F5F9] p-1 rounded-[14px] flex gap-0">
          {[
            { key: "record", label: "Record", icon: <Mic className="size-4" /> },
            { key: "upload", label: "Upload", icon: <Upload className="size-4" /> },
            { key: "type",   label: "Type",   icon: <Type className="size-4" /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTranscriptTab(key as any)}
              className={`flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] font-semibold transition-all duration-200 ${
                transcriptTab === key
                  ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.10)] text-[#043570]"
                  : "text-[#94A3B8]"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-5 space-y-4">

        {/* ── RECORD TAB ── */}
        {transcriptTab === "record" && (
          <div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-2xl p-6 flex flex-col items-center">
            {!isRecording && !recordingSaved ? (
              <>
                <div className="size-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-100 dark:border-red-800/30">
                  <Mic className="size-8 text-red-500" strokeWidth={1.5} />
                </div>
                <button
                  onClick={() => setIsRecording(true)}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm mb-2 transition-all shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30"
                >
                  Start Recording
                </button>
                <p className="text-xs text-[#94A3B8]">Click to begin — your session will be transcribed automatically</p>
              </>
            ) : isRecording ? (
              <>
                {/* Animated mic with pulse */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="size-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-red-400/30"
                >
                  <Mic className="size-10 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Waveform bars — same effect as RecordingScreen */}
                <TranscriptWaveform active={true} />

                {/* Timer */}
                <div className="text-[28px] font-bold text-gray-900 dark:text-white tabular-nums my-3">
                  {formatRecordingTime(recordingTime)}
                </div>

                {/* Live recording badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-full border border-red-100 dark:border-red-800/30 mb-4">
                  <div className="size-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">Recording in progress</span>
                </div>

                <button
                  onClick={() => {
                    setIsRecording(false);
                    setSavedRecordingDuration(formatRecordingTime(recordingTime));
                    setRecordingSaved(true);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#032a57] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/25"
                >
                  <Square className="size-4 fill-white" />
                  Stop Recording
                </button>
              </>
            ) : (
              <>
                <div className="size-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 border border-green-100 dark:border-green-800/30">
                  <CheckCircle className="size-8 text-green-600 dark:text-green-500" strokeWidth={1.5} />
                </div>
                <p className="text-base font-bold text-green-600 dark:text-green-500 mb-1">Recording saved!</p>
                <p className="text-sm text-[#64748B] mb-4">{savedRecordingDuration} recorded</p>
                <button
                  onClick={() => { setRecordingSaved(false); setRecordingTime(0); setSavedRecordingDuration(""); }}
                  className="text-[#00c0ff] hover:text-[#00a8e6] font-semibold text-sm transition-colors"
                >
                  Record again
                </button>
              </>
            )}
          </div>
        )}

        {/* ── UPLOAD TAB ── */}
        {transcriptTab === "upload" && (
          !uploadedFile ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const validTypes = ["audio/mpeg","audio/mp3","audio/wav","audio/m4a","audio/ogg","audio/webm"];
                  if (validTypes.includes(file.type) || file.name.match(/\.(mp3|wav|m4a|ogg|webm)$/i)) setUploadedFile(file);
                }
              }}
              onClick={() => document.getElementById("ai-transcriber-upload")?.click()}
              className="border-2 border-dashed border-[#E2E8F0] dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center hover:border-[#00c0ff] transition-colors cursor-pointer bg-[#F8FAFC] dark:bg-gray-750"
            >
              <div className="size-14 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-800/30">
                <Upload className="size-7 text-[#2563EB]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Drop your audio file here</p>
              <p className="text-xs text-[#64748B] mb-2">or click to browse</p>
              <span className="text-[11px] px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-[#64748B] rounded-lg font-medium">
                MP3 · WAV · M4A · OGG · WEBM
              </span>
              <input id="ai-transcriber-upload" type="file" accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadedFile(file);
                }}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-[#F8FAFC] dark:bg-gray-750 rounded-2xl p-4 border border-[#E2E8F0] dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-[#EFF6FF] dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800/30">
                  <FileText className="size-5 text-[#2563EB]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-[#64748B]">{(uploadedFile.size / (1024*1024)).toFixed(1)} MB · Ready to process</p>
                </div>
                <button onClick={() => setUploadedFile(null)} className="size-7 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <X className="size-3.5 text-gray-500" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg w-fit border border-green-100 dark:border-green-800/30">
                <CheckCircle className="size-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">File ready</span>
              </div>
            </div>
          )
        )}

        {/* ── TYPE TAB ── */}
        {transcriptTab === "type" && (
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Transcript</label>
            <textarea
              value={typedTranscript}
              onChange={(e) => setTypedTranscript(e.target.value)}
              placeholder="Paste or type your session transcript here..."
              className="w-full h-32 px-4 py-3 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm resize-none focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:text-white placeholder-gray-400 transition-all"
            />
          </div>
        )}

        {/* ── SESSION META ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Session Date</label>
            <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:text-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Session Time</label>
            <input type="time" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)}
              className="w-full h-10 px-3 bg-white dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:text-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Brief Overview <span className="font-normal normal-case text-[#94A3B8]">(optional)</span></label>
          <textarea
            value={briefOverview}
            onChange={(e) => setBriefOverview(e.target.value)}
            placeholder="e.g., Anxiety management techniques, breathing exercises..."
            className="w-full h-16 px-4 py-2.5 bg-white dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm resize-none focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:text-white placeholder-gray-400 transition-all"
          />
        </div>

        {/* ── ACTIONS ── */}
        <div className="pt-1 border-t border-[#F1F5F9] dark:border-gray-700 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setShowAddTranscriptModal(false);
                setTranscriptTab("record");
                setIsRecording(false);
                setRecordingTime(0);
                setRecordingSaved(false);
                setUploadedFile(null);
                setTypedTranscript("");
                setBriefOverview("");
              }}
              className="px-4 py-2 text-[#64748B] hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!isFormValid}
              onClick={() => {
                setShowAddTranscriptModal(false);
                setTranscriptTab("record");
                setIsRecording(false);
                setRecordingTime(0);
                setRecordingSaved(false);
                setUploadedFile(null);
                setTypedTranscript("");
                setBriefOverview("");
              }}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                isFormValid
                  ? "bg-[#043570] hover:bg-[#032a57] text-white shadow-md shadow-blue-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save Transcript
            </button>
          </div>

          {/* Prescription-gated action buttons */}
          {(() => {
            const rxPref = localStorage.getItem("ai_scribe_prescription_pref");
            const showRx = rxPref === "yes" || rxPref === null;
            return (
              <div className={isFormValid ? (showRx ? "grid grid-cols-2 gap-2" : "grid grid-cols-1") : "hidden"}>
                <button
                  disabled={!isFormValid}
                  onClick={() => {
                    setShowAddTranscriptModal(false);
                    navigate(`/clients/1/notes/add?source=transcriber&sessionId=1`);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#EFF6FF] dark:bg-blue-900/20 hover:bg-[#DBEAFE] dark:hover:bg-blue-900/30 text-[#1D4ED8] dark:text-blue-400 border border-[#BFDBFE] dark:border-blue-700 rounded-xl font-bold text-sm transition-all"
                >
                  <ClipboardList className="size-4 flex-shrink-0" />
                  Prepare Session Notes
                </button>
                {showRx && (
                  <button
                    disabled={!isFormValid}
                    onClick={() => {
                      setShowAddTranscriptModal(false);
                      navigate(`/clients/1/prescriptions/create?source=transcriber&sessionId=1`);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#FDF2F8] dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-[#DB2777] dark:text-pink-400 border border-[#FBCFE8] dark:border-pink-700 rounded-xl font-bold text-sm transition-all"
                  >
                    <Pill className="size-4 flex-shrink-0" />
                    Prepare Prescription
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </motion.div>
  </div>
)}
```

**Step B — Add `TranscriptWaveform` component** at the top of `AITranscriber.tsx`, before the `AITranscriber` function. This reuses the same waveform animation logic as `RecordingScreen.tsx`:

```tsx
const WAVE_BAR_COUNT = 32;

function TranscriptWaveform({ active }: { active: boolean }) {
  const [bars, setBars] = useState<number[]>(Array(WAVE_BAR_COUNT).fill(20));
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setBars(Array(WAVE_BAR_COUNT).fill(20));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= 80) {
        lastUpdateRef.current = timestamp;
        setBars(Array.from({ length: WAVE_BAR_COUNT }, () => Math.random() * 80 + 10));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active]);

  return (
    <div className="flex items-center justify-center gap-[3px] h-10 w-full max-w-xs">
      {bars.map((h, i) => (
        <div key={i} className="rounded-full transition-all duration-75"
          style={{ width: "5px", height: `${h * 0.4}%`, backgroundColor: "#00c0ff" }}
        />
      ))}
    </div>
  );
}
```

Add `useRef` to the imports at the top if not present. Add `CheckCircle`, `Upload`, `FileText`, `Square`, `Type` to the lucide-react import if missing.

**Step C — Add `selectedClientForTranscript` state** at the top of the `AITranscriber` component:

```ts
const [selectedClientForTranscript, setSelectedClientForTranscript] = useState<{ id: string; name: string } | null>(null);
```

Also update `isFormValid` — since there is no more client name input field, change it to:

```ts
const isFormValid = selectedClientForTranscript !== null && hasContent;
```

---

### FIX 2 — Client Selection Before Add Transcript Modal

When the user clicks "Add Transcript" or "Add First Transcript", first show a client picker (matching the style of `AddSessionNoteModal`), then open the transcript modal.

**Step A — Add a new `showClientPickerModal` state** in `AITranscriber`:

```ts
const [showClientPickerModal, setShowClientPickerModal] = useState(false);
const [clientPickerSearch, setClientPickerSearch] = useState("");
```

**Step B — Change all "Add Transcript" and "Add First Transcript" button `onClick` handlers** from `setShowAddTranscriptModal(true)` to `setShowClientPickerModal(true)`.

Find every instance:
```tsx
onClick={() => setShowAddTranscriptModal(true)}
```
Replace with:
```tsx
onClick={() => { setShowClientPickerModal(true); setClientPickerSearch(""); }}
```

**Step C — Add the client picker modal** before the existing `{showAddTranscriptModal && (...)}` block:

```tsx
{showClientPickerModal && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={() => setShowClientPickerModal(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="relative px-6 pt-6 pb-5"
        style={{ background: "linear-gradient(135deg, #043570 0%, #0a5ca8 100%)" }}
      >
        <button
          onClick={() => setShowClientPickerModal(false)}
          className="absolute top-4 right-4 size-7 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="size-4 text-white" />
        </button>
        <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
          <Users className="size-7 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Select a Client</h2>
        <p className="text-sm text-blue-100">Choose the client for this transcript session</p>
      </div>

      {/* Search */}
      <div className="px-6 pt-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={clientPickerSearch}
            onChange={(e) => setClientPickerSearch(e.target.value)}
            autoFocus
            className="w-full h-11 pl-10 pr-4 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#00c0ff]/15 dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Client list */}
      <div className="px-6 pb-6 space-y-2 max-h-72 overflow-y-auto">
        {clients
          .filter(c => c.name.toLowerCase().includes(clientPickerSearch.toLowerCase()))
          .map((client) => (
            <button
              key={client.id}
              onClick={() => {
                setSelectedClientForTranscript({ id: client.id, name: client.name });
                setShowClientPickerModal(false);
                setShowAddTranscriptModal(true);
                setTranscriptTab("record");
                setRecordingSaved(false);
                setRecordingTime(0);
                setUploadedFile(null);
                setTypedTranscript("");
                setBriefOverview("");
              }}
              className="w-full flex items-center gap-3.5 p-3.5 bg-white dark:bg-gray-750 border-[1.5px] border-[#F1F5F9] dark:border-gray-700 rounded-2xl hover:border-[#00c0ff] hover:bg-[#F8FFFE] dark:hover:bg-gray-700 hover:shadow-[0_4px_16px_rgba(0,192,255,0.08)] transition-all group"
            >
              <div className="size-10 rounded-full bg-gradient-to-br from-[#00c0ff] to-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white font-bold text-sm">
                  {client.name.split(" ").map((n: string) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{client.name}</p>
              </div>
              <ChevronRight className="size-4 text-[#CBD5E1] group-hover:text-[#00c0ff] transition-colors flex-shrink-0" />
            </button>
          ))
        }
      </div>
    </motion.div>
  </div>
)}
```

Add `ChevronRight` and `Search` to the lucide-react import in `AITranscriber.tsx` if not present.

---

### FIX 3 — Provider mode: AI Transcriber and Session Notes in main nav instead of Show More

**Root cause:** `defaultProviderOrder` in `Layout.tsx` includes `'ai-transcriber'` and `'session-notes'` in the order array. Since these items are NOT in `sidebar_hidden_items` for provider mode (the onboarding never writes them there for provider signup), `visibleItems(order)` renders them in the main nav.

The fix: in `Layout.tsx`, add a `providerForcedHidden` check inside `visibleItems` for provider plan, or more cleanly, add them to `sidebar_hidden_items` default for provider mode at render time.

Find the line inside the nav IIFE:

```ts
const itemsToRender = isTranscriberOnly
  ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
  : visibleItems(order);
```

Replace with:

```ts
// In provider plan, ai-transcriber and session-notes are opt-in (go to Show More by default)
const providerOptInKeys = new Set(['ai-transcriber', 'session-notes', 'prescriptions']);

const itemsToRender = isTranscriberOnly
  ? order.filter(k => !hiddenItems.includes(k) || transciberForcedVisible.has(k))
  : isProviderPlan
    ? order.filter(k => !hiddenItems.includes(k) && !providerOptInKeys.has(k))
    : visibleItems(order);
```

This makes `ai-transcriber`, `session-notes`, and `prescriptions` invisible in the provider main nav unless the user explicitly moved them there via Configure Menu. They will appear in Show More via `hiddenFromOrder` since they are in `defaultProviderOrder` but filtered from the rendered items.

**However**, Show More uses `hiddenFromOrder(order)` which checks `hiddenItems.includes(k)`. Since these items are NOT in `hiddenItems`, they won't appear in Show More either with just the above change. We need to show them in Show More as available items without requiring them to be in `hiddenItems`.

Add a separate block in the Show More section for provider opt-in items. Find the Show More `{isShowMoreExpanded && (...)}` block and after the `hiddenFromOrder(order).filter(...).map(...)` block, add:

```tsx
{/* Provider opt-in items — shown in Show More in provider mode */}
{isProviderPlan && (
  <>
    {(['ai-transcriber', 'session-notes', 'prescriptions'] as const)
      .filter(key => !hiddenItems.includes(key)) // Only show if user hasn't explicitly added to main nav
      .map(key => {
        const meta = navItemMeta[key];
        if (!meta) return null;
        const paths: Record<string, string> = {
          'ai-transcriber': '/ai-transcriber',
          'session-notes': '/session-notes',
          'prescriptions': '/prescriptions',
        };
        return (
          <Link
            key={key}
            to={paths[key]}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive(paths[key])
                ? "bg-[#00c0ff]/10 text-[#00c0ff]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {meta.icon}
            <span className="ml-3 text-sm font-medium">{meta.label}</span>
          </Link>
        );
      })
    }
  </>
)}
```

This correctly shows them as navigable items in Show More for provider mode, without the "tap to show" restore mechanic (since they're always available, just not cluttering the main nav).

---

### Summary

| File | Change |
|---|---|
| `AITranscriber.tsx` | Add `TranscriptWaveform` component; replace modal with premium gradient header + animated recording + tabs; remove client name field; add `selectedClientForTranscript` state; update `isFormValid`; add client picker modal triggered by all "Add Transcript" buttons |
| `Layout.tsx` | Filter `ai-transcriber`, `session-notes`, `prescriptions` from provider main nav via `providerOptInKeys`; add Show More section for provider opt-in items as navigable links |