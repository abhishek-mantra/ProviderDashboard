## Product Thinking First

The AI Transcriber user lands on the dashboard and sees... almost nothing. That's a **dead screen problem**. The Action Center and Boost Your Profile exist because Full EHR users have appointments, messages, and leads flowing in. The AI Transcriber user has none of that activity — so we can't just remove sections and leave a skeleton.

**The solution:** Replace the activity-based sections with value-delivery sections relevant to the AI Transcriber workflow.

---

## Figma Prompt — Dashboard Redesign for AI Transcriber Plan

---

### REMOVE (AI Transcriber Plan Only)

- ❌ **Action Center** block — entirely (appointments, messages, leads are locked features)
- ❌ **"Boost Your Profile. Get More Clients."** banner — routes to Tasks which is a locked feature
- ❌ **"Grow with insurance"** banner — Insurance is a locked/Full EHR feature

---

### KEEP

- ✅ Dashboard header (`"Dashboard"` + welcome subtitle)
- ✅ `"Your AI Plan Tools"` quick access section (already implemented correctly)

---

### ADD — New sections to fill the dashboard meaningfully

**SECTION 1: Welcome / Onboarding Strip**

Place this directly below the Dashboard header, above "Your AI Plan Tools":

- Background: gradient `from-[#043570] to-[#065ba8]`
- Border radius: `rounded-2xl`
- Padding: `px-6 py-5 md:px-8 md:py-6`
- Layout: horizontal flex, `items-center justify-between`
- Left:
  - Icon: `Mic` in a `size-12 bg-[#00c0ff]/20 rounded-xl` container, icon color `#00c0ff`
  - Headline: `"Welcome to AI Transcriber"` — white, `18px`, `font-bold`
  - Subtext: `"Start recording your first session in seconds"` — `#93C5FD`, `13px`
- Right: `"Start Recording →"` button — `bg-[#00c0ff] text-white rounded-xl px-5 py-2.5 font-bold text-sm`
- Routes to: `/ai-transcriber`

---

**SECTION 2: Recent Activity (replaces Action Center)**

Label: `"Recent Transcriptions"` — `18px font-semibold text-gray-900` with a cyan dot `●` prefix

Container: `bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6`

**Empty state** (shown when no transcriptions exist yet):

- Center-aligned vertical layout
- Icon: `Mic` in `size-16 bg-[#00c0ff]/10 rounded-2xl` — icon color `#00c0ff`
- Headline: `"No transcriptions yet"` — `text-gray-900 font-semibold text-base`
- Subtext: `"Add a client and start your first session to see transcriptions here"` — `text-gray-500 text-sm text-center max-w-xs`
- CTA button: `"Record First Session"` — `bg-[#00c0ff] text-white rounded-xl px-5 py-2.5 font-semibold text-sm` — routes to `/ai-transcriber`

**Populated state** (shown when transcriptions exist — use mock data for Figma):

Show 3 recent transcription rows, each row containing:
- Left: client avatar `size-10 rounded-lg` + client name `font-semibold text-gray-900 text-sm` + session type `text-gray-500 text-xs`
- Center: date chip `bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md` + duration chip same style
- Right: `"View"` button — `bg-[#00c0ff]/10 text-[#00c0ff] border border-[#00c0ff]/20 rounded-lg px-3 py-1.5 text-xs font-semibold`
- Rows separated by `border-b border-gray-50`

Below rows: `"View All Transcriptions →"` text link in `text-[#00c0ff] text-sm font-medium`, right-aligned

---

**SECTION 3: Quick Stats Row (replaces the 3 summary pills in Action Center)**

A horizontal row of 3 stat cards between the Welcome strip and Recent Transcriptions:

Layout: `grid grid-cols-3 gap-3 md:gap-4`

Card style: `bg-white rounded-xl border border-gray-100 shadow-sm p-4`

| Stat | Icon | Color | Label |
|---|---|---|---|
| Total Clients | `Users` | `#06B6D4` cyan | `"Total Clients"` |
| Sessions This Week | `Mic` | `#00c0ff` | `"Sessions This Week"` |
| Notes Created | `FileText` | `#8B5CF6` | `"Notes Created"` |

Each card:
- Icon: `size-8 rounded-lg` icon container in `bg-{color}/10` + icon `text-{color} size-4`
- Number: `text-2xl font-bold text-gray-900` — use `"0"` as default/mock
- Label: `text-xs text-gray-500 font-medium mt-1`

---

**SECTION 4: Replace "Boost Your Profile" with AI Transcriber Tips**

Instead of the Tasks-linked green banner, show a contextual tip card:

- Background: `bg-white` with left border accent `border-l-4 border-[#00c0ff]`
- Full border: `border border-gray-100 rounded-2xl shadow-sm`
- Padding: `px-5 py-4`
- Layout: horizontal, `items-start gap-4`
- Left: `Sparkles` icon in `size-10 bg-[#00c0ff]/10 rounded-xl` — icon `text-[#00c0ff]`
- Right:
  - Headline: `"Get the most out of AI Transcriber"` — `text-gray-900 font-bold text-[15px]`
  - Subtext: `"Record a session → Notes are auto-generated → Review and save"` — `text-gray-500 text-sm`
  - Link: `"See how it works →"` — `text-[#00c0ff] text-sm font-semibold mt-2` — routes to `/ai-transcriber`

---

### FINAL PAGE ORDER (AI Transcriber Plan Dashboard)

```
Dashboard Header
  ↓
Welcome / Start Recording Banner        ← NEW
  ↓
Quick Stats Row (3 cards)               ← NEW
  ↓
Recent Transcriptions                   ← NEW (replaces Action Center)
  ↓
AI Transcriber Tips Banner              ← NEW (replaces Boost Your Profile)
  ↓
Your AI Plan Tools                      ← EXISTING (keep as-is)
```

---

### FULL EHR PLAN — ZERO CHANGES

Everything on the Full EHR dashboard remains exactly as implemented. No modifications.

---

### STORYTELLING PRINCIPLE

> "An AI Transcriber user's dashboard should feel like a focused clinical workspace — not an empty room. Even on day one with zero sessions, they should see exactly what to do next. The screen earns its space by guiding action, not reflecting absence."