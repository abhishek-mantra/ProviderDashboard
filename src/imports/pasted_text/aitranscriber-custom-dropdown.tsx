Here's the precise prompt:

---

**Prompt:**

In `AITranscriber.tsx`, find the "Select Session" field inside the Add Transcript modal (the `<select>` element with `value={selectedSession ?? ""}` and options from `mockSessions`). Replace the native `<select>` element entirely with a custom-styled dropdown that matches the design language of the rest of the modal. Make the following exact changes:

---

**CHANGE 1 — Replace native select with custom dropdown component:**

Add a new state variable `const [showSessionDropdown, setShowSessionDropdown] = useState(false)` at the top of `AITranscriber`.

Remove the native `<select>` element and replace it with the following custom dropdown structure:

The trigger button should be a `<div className="relative">` wrapper containing:

```tsx
<button
  type="button"
  onClick={() => setShowSessionDropdown(!showSessionDropdown)}
  className={`w-full h-11 px-4 flex items-center justify-between bg-white dark:bg-gray-700 border-[1.5px] rounded-xl text-sm transition-all ${
    showSessionDropdown
      ? "border-[#00c0ff] ring-2 ring-[#00c0ff]/15"
      : "border-[#E2E8F0] dark:border-gray-600 hover:border-[#00c0ff]"
  }`}
>
  <span className={selectedSession ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
    {selectedSession
      ? mockSessions.find(s => s.id === selectedSession)?.label
      : "— Choose a session —"}
  </span>
  <ChevronDown className={`size-4 text-gray-400 transition-transform duration-200 ${showSessionDropdown ? "rotate-180" : ""}`} />
</button>
```

Below the trigger button, render the dropdown panel conditionally when `showSessionDropdown === true`:

```tsx
{showSessionDropdown && (
  <>
    <div className="fixed inset-0 z-10" onClick={() => setShowSessionDropdown(false)} />
    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden">
      {/* Session options */}
      <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
        {mockSessions.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSelectedSession(s.id);
              setShowSessionDropdown(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
              selectedSession === s.id
                ? "bg-[#EFF6FF] dark:bg-blue-900/20 text-[#043570] dark:text-[#00c0ff]"
                : "text-gray-700 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`size-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedSession === s.id
                  ? "bg-[#043570]/10 dark:bg-[#00c0ff]/10"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <Calendar className={`size-3.5 ${
                  selectedSession === s.id
                    ? "text-[#043570] dark:text-[#00c0ff]"
                    : "text-gray-500 dark:text-gray-400"
                }`} />
              </div>
              <span>{s.label}</span>
            </div>
            {selectedSession === s.id && (
              <CheckCircle className="size-4 text-[#043570] dark:text-[#00c0ff] flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#F1F5F9] dark:border-gray-700 mx-2" />

      {/* Create without a session button */}
      <div className="p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedSession("no-session");
            setShowSessionDropdown(false);
          }}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2.5 ${
            selectedSession === "no-session"
              ? "bg-[#F0FDF4] dark:bg-green-900/20 text-green-700 dark:text-green-400"
              : "text-[#64748B] dark:text-gray-400 hover:bg-[#F8FAFC] dark:hover:bg-gray-700 hover:text-gray-700"
          }`}
        >
          <div className={`size-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
            selectedSession === "no-session"
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-gray-100 dark:bg-gray-700"
          }`}>
            <Plus className={`size-3.5 ${
              selectedSession === "no-session"
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`} />
          </div>
          <div>
            <p className="font-semibold leading-tight">Create without a session</p>
            <p className="text-[11px] font-normal text-[#94A3B8] dark:text-gray-500 mt-0.5">Transcript won't be linked to any session</p>
          </div>
          {selectedSession === "no-session" && (
            <CheckCircle className="size-4 text-green-600 dark:text-green-400 flex-shrink-0 ml-auto" />
          )}
        </button>
      </div>
    </div>
  </>
)}
```

---

**CHANGE 2 — Update form validation to accept "no-session" as a valid session selection:**

The `isFormValid` check currently requires `selectedSession !== null`. This already works correctly since `"no-session"` is a non-null string. No change needed here — it will work automatically.

**CHANGE 3 — Close the session dropdown when the modal closes:**

In every place where `setShowAddTranscriptModal(false)` is called (the close button and the backdrop click handler), also add `setShowSessionDropdown(false)` to reset the dropdown state cleanly.

---

**Do not change anything else** — all other elements of the modal (the Record/Upload tabs, the Brief Overview textarea, the Save button, the header, the Client Picker modal, or the transcriptions list) remain exactly as they are.