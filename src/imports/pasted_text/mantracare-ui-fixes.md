MANTRACARE AI TRANSCRIBER — PREMIUM UI FIXES PROMPT (PLAIN TEXT)

---

**1. CLIENT DROPDOWN — OPEN ABOVE, NO PAGE SCROLL**

The client dropdown must open upward (dropup), not downward. This prevents the page from scrolling when the dropdown opens.

On the QuickRecordCard component, change the dropdown positioning from top-full to bottom-full so it appears above the input field, not below it.

CSS change on the dropdown container div:
- Remove: top: calc(100% + 4px)
- Add: bottom: calc(100% + 4px)
- Keep: left 0, right 0, position absolute, z-index 50

The dropdown max-height stays 200px with overflow-y auto. It must never push page content downward. The card itself must not grow in height when the dropdown opens.

Also add a search input at the top of the dropdown list:
- Full-width input inside the dropdown, placeholder "Search clients...", 12px font, 36px height, border-bottom 1px #F1F5F9, no outer border, padding 8px 12px, background white.
- Filters the list live as the user types.
- Below the filtered list, always show the "+ Add new client" row pinned at the bottom with a top divider.

---

**2. RECORDING COMPLETE POPUP — REMOVE CANCEL AND SAVE BUTTONS**

Remove the "Cancel" text button and the "Save" button entirely from the Recording Complete popup. The only actions available are "Prepare Session Notes" and "Prepare Prescription".

These two buttons become the full-width primary actions and must be redesigned as premium large buttons:

"Prepare Session Notes" button:
- Full width
- Height 56px
- Background: linear-gradient from #2563EB to #1d4ed8
- Border-radius 14px
- Text: "✦ Prepare Session Notes" — 15px bold white
- Left icon: clipboard-list icon 18px white
- Box-shadow: 0 4px 16px rgba(37,99,235,0.30)
- On hover: background shifts to #1d4ed8, shadow deepens, slight scale 1.01

"Prepare Prescription" button:
- Full width
- Height 56px
- Background: linear-gradient from #DB2777 to #be185d
- Border-radius 14px
- Text: "✦ Prepare Prescription" — 15px bold white
- Left icon: pill icon 18px white
- Box-shadow: 0 4px 16px rgba(219,39,119,0.28)
- On hover: background shifts to #be185d, shadow deepens, slight scale 1.01

8px gap between the two buttons. No cancel button. No save button. The user exits by clicking either action button or pressing Escape. Clicking either button saves the session automatically before navigating.

The popup must also have a small "✕" icon in the top-right corner of the dark header section (white, 20px, positioned absolute top-12px right-16px) that closes the popup and discards the session without saving. This replaces the Cancel button functionality.

---

**3. RECORDING SCREEN — PREMIUM PAUSE AND SAVE BUTTONS**

Rename the "Stop" button to "Save". Remove the "Cancel" text/button from the recording screen header area entirely.

The header strip at the top of /record-session now shows:
- Left: "[Client Name] · [Note Type]" in 14px medium gray
- Right: nothing (no cancel button)

If the user navigates away using the browser back button or sidebar, the recording continues in the background state but does NOT keep a live timer running. On unmount of the RecordingScreen component, call a cleanup function that stops the MediaRecorder, clears the setInterval timer, and releases the microphone stream via stream.getTracks().forEach(track => track.stop()). This ensures no background audio capture or timer leak.

Pause button — premium redesign:
- Width 160px, height 52px
- Background white
- Border: 2px solid #043570
- Border-radius 14px
- Text: "⏸ Pause" — 15px semibold color #043570
- Icon: pause icon 18px color #043570
- On hover: background #EFF6FF, border-color #2563EB, text color #2563EB
- On click (when already paused): label and icon change to "▶ Resume", border becomes #10b981, text becomes #10b981, background #F0FDF4

Save button — premium redesign:
- Width 160px, height 52px
- Background #043570
- Border: none
- Border-radius 14px
- Text: "⏹ Save" — 15px bold white
- Icon: stop square icon 18px white
- Box-shadow: 0 4px 14px rgba(4,53,112,0.30)
- On hover: background #032a5a, shadow deepens
- On click: stop MediaRecorder, clear timer, release mic stream, then open the Recording Complete popup

Both buttons centered horizontally, 16px gap between them, displayed as a row.

---

**4. RECORDING SCREEN — CLIENT INFO BANNER**

When a recording is active on /record-session, show a small info banner directly below the header strip and above the mic icon. This banner displays the session context.

Banner design:
- Full width of the content area
- Background #EFF6FF (light blue)
- Border: 1px solid #BFDBFE
- Border-radius 10px
- Padding 10px 16px
- Display: flex, align-items center, justify-content space-between

Left side content:
- Small blue mic icon 14px
- Text: "[Client Name]" — 13px semibold #1E40AF
- Separator dot "·"
- Text: "[Note Type]" — 13px regular #3B82F6

Right side content:
- Text: "[Current Date] · [Current Time updating live]" — 12px regular #64748B

If no client was selected (user went directly to record without selecting a client), show:
- Left text in orange: "No client selected" — 13px semibold #D97706
- Background #FFFBEB, border #FDE68A

This banner must be visible throughout recording and paused states. It disappears when the Recording Complete popup opens.

---

**5. RECORDING — CLEANUP ON NAVIGATION AWAY**

In RecordingScreen.tsx, add a useEffect cleanup on component unmount:

```
useEffect(() => {
  return () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);
```

This ensures that if the user navigates to Session Notes or Prescription and then presses back, the recording is fully stopped and the microphone is released. The session data (duration, client name, note type) is stored in a ref or context before navigation so the Recording Complete popup can still display the correct info when the user returns. However, the audio stream is not resumed — the user must start a new recording.

---

**6. SESSION NOTES FORM — REMOVE THE PRE-FILL BANNER**

On /clients/[id]/notes/add, if the page was reached via route state from the transcriber (location.state.source === "transcriber"), do NOT show any info banner. Remove the teal banner that reads "Session data pre-filled from your AI recording / Click Generate with AI to create the full note from your session transcript / Client: Sarah Jenkins · Date: 2026-06-04 at 16:32 · Type: BIRP".

The form fields should simply be pre-filled silently. The user sees the client name, date, and note type already populated without any explanatory banner. The pre-fill is self-evident from the data being present in the fields.

The right-side transcript panel (showing Dr. Smith and Rachit's conversation) must be visible and the "Fill with AI" button at the bottom stays as is. No changes to the transcript panel or Fill with AI button.

---

**7. PRESCRIPTION FORM — REMOVE THE PRE-FILL BANNER**

Same as above. On /clients/[id]/prescriptions/create, if reached from transcriber route state, remove any info banner. Pre-fill fields silently. No banner, no explanatory text. The form just opens with the relevant fields already populated.

---

**8. RECORDING COMPLETE POPUP — FINAL LAYOUT**

After removing Cancel and Save, the popup structure is:

Top section (dark navy header, border-radius 24px 24px 0 0, background linear-gradient #043570 to #0a5ca8, padding 28px 32px):
- Row: green check circle icon + "Recording complete" text 18px bold white
- Row below: "[Client Name] · [mm:ss] · [Note Type]" — 13px white 70% opacity
- Small ✕ button top-right (white, closes popup without saving)

Middle section (white, padding 24px 32px):
- Session Date and Session Time inputs side by side (pre-filled)
- Brief overview textarea (optional)

Bottom section (background #F8FAFC, border-radius 0 0 24px 24px, padding 20px 32px, border-top 1px #F1F5F9):
- "Prepare Session Notes" button — full width, 56px, blue gradient, bold white
- 8px gap
- "Prepare Prescription" button — full width, 56px, pink gradient, bold white

No other buttons. No cancel. No save. The ✕ in the header is the only exit without action.

---

**9. VISUAL TOKENS**

Button border-radius throughout: 14px
Input border-radius: 10px
Card border-radius: 20px
Modal border-radius: 24px
Primary shadow (blue buttons): 0 4px 16px rgba(37,99,235,0.30)
Primary shadow (pink buttons): 0 4px 16px rgba(219,39,119,0.28)
Primary shadow (navy buttons): 0 4px 14px rgba(4,53,112,0.30)
Focus ring on all inputs: 0 0 0 3px rgba(0,192,255,0.15) with border-color #00c0ff
Backdrop for modals: backdrop-filter blur(4px) with background rgba(15,23,42,0.35)