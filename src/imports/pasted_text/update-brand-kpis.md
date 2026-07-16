Here's the complete prompt:

---

**Prompt: Rename "Mantra" → "Mantra Practice" + Replace KPI cards across AI Transcriber, Session Notes, and Prescriptions**

---

### 1. Rename "Mantra" to "Mantra Practice" everywhere

In `GetStarted.tsx`, `Layout.tsx`, and any other component where the brand name appears as plain text "Mantra" (in logos, headers, footers, sidebar), change every instance to "Mantra Practice". This includes:

- Sidebar logo text: `<span>MantraCare</span>` → keep as-is if it's "MantraCare" but change standalone "Mantra" text labels to "Mantra Practice"
- Left panel of GetStarted: `<span className="text-white font-semibold text-lg">Mantra</span>` → `Mantra Practice`
- Footer copyright: `© 2026 Mantra` → `© 2026 Mantra Practice`
- Any other `>Mantra<` text nodes that aren't part of "MantraCare" or "MantraProvider"

---

### 2. AI Transcriber — Remove old 3 KPI cards, add new 3

**Remove entirely** the existing stats grid:
```jsx
// DELETE this whole block:
<div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
  {/* Total / Completed / This Week cards */}
</div>
```

**Replace with** these 3 new KPI cards in the same `grid grid-cols-3` layout:

```jsx
const totalTranscriptions = transcriptions.length;
const totalMinutes = transcriptions.reduce((sum, t) => {
  const [m, s] = t.duration.split(":").map(Number);
  return sum + m + s / 60;
}, 0);
const totalHours = Math.floor(totalMinutes / 60);
const remainingMins = Math.round(totalMinutes % 60);

const completedCount = transcriptions.filter(t => t.status === "completed").length;
const totalSizeMB = transcriptions.reduce((sum, t) => sum + parseFloat(t.fileSize), 0);
```

**Card 1 — Total Sessions:**
```
Icon: Mic (teal)
Label: "Total Sessions"
Value: {totalTranscriptions}
Sub: "transcriptions"
```

**Card 2 — Hours Recorded:**
```
Icon: Clock (blue)
Label: "Hours Recorded"  
Value: {totalHours}h {remainingMins}m
Sub: "total audio"
```

**Card 3 — Storage Used:**
```
Icon: FileText (purple)
Label: "Storage Used"
Value: {totalSizeMB.toFixed(0)} MB
Sub: "across all sessions"
```

---

### 3. Session Notes — Add 3 KPI cards

In `SessionNotesList`, add a new KPI grid **between the search bar and the notes list**, same `grid grid-cols-3` pattern:

```jsx
const totalNotes = sessionNotes.length;
const uniqueClientsCount = new Set(sessionNotes.map(n => n.clientId)).size;
const thisWeekCount = sessionNotes.filter(note => {
  const noteDate = new Date(note.addedDate);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return noteDate >= weekAgo;
}).length;
```

**Card 1 — Total Notes:**
```
Icon: FileText (blue)
Label: "Total Notes"
Value: {totalNotes}
Sub: "session notes"
```

**Card 2 — Clients Documented:**
```
Icon: Users (teal)
Label: "Clients Documented"
Value: {uniqueClientsCount}
Sub: "unique clients"
```

**Card 3 — Added This Week:**
```
Icon: Calendar (amber/orange)
Label: "Added This Week"
Value: {thisWeekCount}
Sub: "this week"
```

---

### 4. Prescriptions — Add 3 KPI cards

In the Prescriptions list page, add a KPI grid in the same position (between header/search and the list):

```jsx
const totalPrescriptions = prescriptions.length;
const uniquePrescriptionClients = new Set(prescriptions.map(p => p.patientId)).size;
const thisMonthCount = prescriptions.filter(p => {
  const d = new Date(p.date);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}).length;
```

**Card 1 — Total Prescriptions:**
```
Icon: Pill (green)
Label: "Total Prescriptions"
Value: {totalPrescriptions}
Sub: "prescriptions"
```

**Card 2 — Patients:**
```
Icon: Users (blue)
Label: "Patients"
Value: {uniquePrescriptionClients}
Sub: "unique patients"
```

**Card 3 — This Month:**
```
Icon: Calendar (purple)
Label: "This Month"
Value: {thisMonthCount}
Sub: "issued this month"
```

---

### 5. KPI Card component — shared style

All KPI cards across all three pages use this exact structure and styling (matching the existing AI Transcriber card style):

```jsx
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 md:p-5">
  <div className="flex flex-col md:flex-row items-center md:justify-between gap-1 md:gap-0">
    <div className="size-8 md:size-12 bg-{color}-50 dark:bg-{color}-900/20 rounded-xl flex items-center justify-center order-first md:order-last">
      <Icon className="size-4 md:size-6 text-{color}-600 dark:text-{color}-400" />
    </div>
    <div className="text-center md:text-left">
      <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1">{label}</p>
      <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{sub}</p>
    </div>
  </div>
</div>
```

Add `mb-4 md:mb-8` to the grid wrapper to match spacing with the rest of the page.