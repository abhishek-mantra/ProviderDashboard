Here is the precise implementation prompt:

---

## Implementation Prompt: Replace Note Type Dropdown with Session Mode Selector in AI Scribe Dashboard

### Context & Product Logic

The QuickRecordCard currently lets providers pick a note template type (SOAP, DAP, BIRP, PIRP) from a dropdown before starting a recording. This is a secondary configuration decision that belongs in the recording flow itself, not the launch surface.

What actually matters at session start is **how the session is happening** — online (virtual) or in-person. For online sessions, the provider needs to attach a meeting link so the AI can transcribe from the right source. This is a more meaningful, session-defining signal that should be captured upfront.

---

### FILE: `Dashboard.tsx`

**Step 1 — Replace the `NOTE_TYPES` constant and `noteType` state with session mode state.**

Remove:
```ts
const NOTE_TYPES = ["SOAP", "DAP", "BIRP", "PIRP"] as const;
type NoteType = typeof NOTE_TYPES[number];
```

Add:
```ts
type SessionMode = "online" | "in-person";
```

Inside `QuickRecordCard`, remove:
```ts
const [noteType, setNoteType] = useState<NoteType>("SOAP");
const [showNoteDropdown, setShowNoteDropdown] = useState(false);
const noteRef = useRef<HTMLDivElement>(null);
```

Add:
```ts
const [sessionMode, setSessionMode] = useState<SessionMode>("online");
const [meetLink, setMeetLink] = useState("");
const [showModeDropdown, setShowModeDropdown] = useState(false);
const modeRef = useRef<HTMLDivElement>(null);
```

**Step 2 — Update the `useEffect` outside-click handler** to replace `noteRef` with `modeRef`:

```ts
useEffect(() => {
  const handler = (e: MouseEvent) => {
    if (clientRef.current && !clientRef.current.contains(e.target as Node)) setShowClientDropdown(false);
    if (modeRef.current && !modeRef.current.contains(e.target as Node)) setShowModeDropdown(false);
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);
```

**Step 3 — Replace the Note Type dropdown JSX** with the Session Mode selector. Find the entire `{/* Note Type */}` div block and replace it:

```tsx
{/* Session Mode */}
<div ref={modeRef} className="relative w-[130px]">
  <button
    onClick={() => { setShowModeDropdown(!showModeDropdown); setShowClientDropdown(false); }}
    className="w-full h-11 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl px-3 text-sm flex items-center justify-between hover:border-[#00c0ff] transition-colors text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#00c0ff] focus:shadow-[0_0_0_3px_rgba(0,192,255,0.12)]"
  >
    <div className="flex items-center gap-1.5">
      {sessionMode === "online"
        ? <Video className="size-3.5 text-[#00c0ff] flex-shrink-0" />
        : <Users className="size-3.5 text-[#64748B] flex-shrink-0" />
      }
      <span className="text-[13px]">
        {sessionMode === "online" ? "Online" : "In-Person"}
      </span>
    </div>
    <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
  </button>
  {showModeDropdown && (
    <div className="absolute top-full right-0 mt-1 w-[140px] bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
      {([
        { value: "online" as const,    label: "Online",    icon: <Video className="size-4 text-[#00c0ff]" /> },
        { value: "in-person" as const, label: "In-Person", icon: <Users className="size-4 text-[#64748B]" /> },
      ]).map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => { setSessionMode(value); setShowModeDropdown(false); }}
          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
            sessionMode === value
              ? "text-[#043570] bg-[#f3faff] dark:bg-gray-700 dark:text-[#00c0ff]"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  )}
</div>
```

**Step 4 — Add the Meet Link input field** between the Inputs Row and the Start Recording button, conditionally shown only when `sessionMode === "online"`. Insert this block after the closing `</div>` of the `{/* Inputs Row */}` div and before `{/* Start Recording Button */}`:

```tsx
{/* Meet Link — shown only for online sessions */}
{sessionMode === "online" && (
  <div className="mb-4">
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
        <Video className="size-4 text-[#00c0ff]" />
      </div>
      <input
        type="url"
        value={meetLink}
        onChange={(e) => setMeetLink(e.target.value)}
        placeholder="Paste meeting link (Google Meet, Zoom, Teams...)"
        className="w-full h-11 bg-[#F8FAFC] dark:bg-gray-700 border-[1.5px] border-[#E2E8F0] dark:border-gray-600 rounded-xl pl-9 pr-4 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 hover:border-[#00c0ff] focus:outline-none focus:border-[#00c0ff] focus:shadow-[0_0_0_3px_rgba(0,192,255,0.12)] transition-colors"
      />
      {meetLink && (
        <button
          onClick={() => setMeetLink("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center hover:text-gray-600 text-gray-400 transition-colors"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
    {meetLink && !meetLink.startsWith("http") && (
      <p className="text-[11px] text-amber-500 mt-1.5 px-1">Please paste a valid link starting with https://</p>
    )}
  </div>
)}
```

**Step 5 — Update the Start Recording button** to pass `sessionMode` and `meetLink` to the navigation state, replacing the old `noteType`:

```tsx
{/* Start Recording Button */}
<button
  onClick={() => navigate("/record-session", { 
    state: { 
      clientName: selectedClient, 
      sessionMode,
      meetLink: sessionMode === "online" ? meetLink : undefined,
    } 
  })}
  className="w-full h-[52px] bg-[#043570] hover:bg-[#032a5a] hover:scale-[1.005] text-white font-bold rounded-[14px] transition-all flex items-center justify-center gap-2 text-[15px]"
>
  {sessionMode === "online" ? "🎤 Start Recording" : "📝 Start Session"}
</button>
```

**Step 6 — Confirm `Video` and `Users` are already imported** in the `Dashboard.tsx` lucide-react import line. Both are present in the existing import — no change needed. `X` is also already imported.

---

### What changes and what stays the same

| Element | Before | After |
|---|---|---|
| Right dropdown in inputs row | SOAP / DAP / BIRP / PIRP note type | Online / In-Person session mode |
| Field below inputs row | None | Meet link input (online sessions only) |
| Start Recording CTA | Always "🎤 Start Recording" | "🎤 Start Recording" (online) / "📝 Start Session" (in-person) |
| Navigation state passed | `{ clientName, noteType }` | `{ clientName, sessionMode, meetLink }` |
| `QuickRecordCard` internal refs | `noteRef` | `modeRef` |

No changes needed to `Layout.tsx`, `OnboardingEHRAIScribe.tsx`, or any other file.