# MantraCare — Sidebar Logout & Default Route Prompt

## CONTEXT

Files involved:
- `src/components/Layout.tsx` — sidebar with user profile button at bottom
- `src/router.tsx` — app routing config
- `src/pages/GetStarted.tsx` — signup page (already exists)
- `src/pages/OTPVerify.tsx` — OTP page (already exists)

---

## CHANGE 1 — Default Route = `/get-started` not `/home`

### In `src/router.tsx`

The browser router currently loads `Layout` (with Dashboard) at path `/`. Change the **initial entry point** so unauthenticated users always land on `/get-started` first.

Since there is no real auth system yet, simulate it with a simple `localStorage` flag:

```ts
// In router.tsx, add a loader to the root "/" route:
{
  path: "/",
  element: <Layout />,
  loader: () => {
    const isLoggedIn = localStorage.getItem("mantra_logged_in");
    if (!isLoggedIn) {
      throw new Response("", { status: 302, headers: { Location: "/get-started" } });
    }
    return null;
  },
  // ...rest of children unchanged
}
```

No other route changes needed. `/get-started` and `/verify` remain outside the Layout wrapper (they already are).

---

## CHANGE 2 — Set `mantra_logged_in` flag on successful OTP verify

### In `src/pages/OTPVerify.tsx`

Inside the `handleVerify` function, **before** calling `navigate(...)`, set the flag:

```ts
const handleVerify = (e: React.FormEvent) => {
  e.preventDefault();
  // Set logged-in flag
  localStorage.setItem("mantra_logged_in", "true");

  if (signupMode === "provider") {
    navigate("/onboarding");
  } else {
    if (signupMode === "ai-scribe") setPlanMode("transcriber-only");
    else setPlanMode("full-ehr");
    navigate("/", { state: { showWelcomePopup: true } });
  }
};
```

---

## CHANGE 3 — Logout clears flag and routes to `/get-started`

### In `src/components/Layout.tsx`

Find the logout button in the profile popup section. It currently does:
```ts
onClick={() => {
  console.log("Logging out...");
  setIsProfileMenuOpen(false);
}}
```

Replace with:
```ts
onClick={() => {
  localStorage.removeItem("mantra_logged_in");
  setIsProfileMenuOpen(false);
  navigate("/get-started");
}}
```

`navigate` is already imported and used in this file (`useNavigate` hook at top). No new imports needed.

---

## CHANGE 4 — Sidebar Profile Popup (visual fix, no logic change needed)

The existing profile popup in `Layout.tsx` already shows Profile + Logout. The current markup is:

```tsx
{isProfileMenuOpen && !shouldShowCollapsed() && (
  <div className="absolute bottom-full left-3 right-3 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <Link to="/profile" ...>
      <User /> Profile
    </Link>
    <button onClick={...}>
      <LogOut /> Logout
    </button>
  </div>
)}
```

**No structural changes needed.** Only the `onClick` on the logout button changes (covered in Change 3 above).

If you want to also add the user's name/avatar at the top of the popup for context (optional polish), insert this block as the first child inside the popup div, before the Profile link:

```tsx
{/* User info header inside popup */}
<div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
  <div className="size-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
    JW
  </div>
  <div className="min-w-0">
    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Wilson</p>
    <p className="text-xs text-[#64748B] truncate">john@mantracare.com</p>
  </div>
</div>
```

---

## SUMMARY OF ALL CHANGES

| File | What changes |
|---|---|
| `router.tsx` | Add loader to `/` route that redirects to `/get-started` if not logged in |
| `OTPVerify.tsx` | Set `localStorage.setItem("mantra_logged_in", "true")` before navigate |
| `Layout.tsx` | Logout button: clear localStorage flag + `navigate("/get-started")` |
| `Layout.tsx` | (Optional) Add user name/email header row inside profile popup |

**No new files, no new imports, no new components.** All four changes are surgical one-liners inside existing functions.

---

## FIGMA NOTES (for design spec)

In the Figma sidebar component frame:

1. **Profile popup** — already designed with Profile + Logout rows. Add the optional user info header row at the top (avatar circle + name + email, separated by a bottom border from the action rows).

2. **Logout row** — keep the red `LogOut` icon + red "Logout" text as-is. No visual change.

3. **Default frame** — mark `/get-started` as the **Starting Frame** in the prototype settings (Prototype tab → Flow starting point). Remove `/home` (Dashboard) as the default starting frame.

4. **Prototype connection** — add a connection from the Logout button in the sidebar popup → `/get-started` screen with interaction: On Click, Navigate to, Instant transition.