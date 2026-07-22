# Partner Dashboard — Full Audit Report

## 1. Content Audit

### What's Good
- Rich mock data — sample clients, providers, establishments, intake forms, flows, entries, responses
- Description textareas beneath fields in Practice Details just added
- Field-level descriptions give providers a way to write profile content

### What's Missing / Weak

| Issue | Location | Severity |
|-------|----------|----------|
| No empty/onboarding states — most pages show blank tables when no data | All list pages | High |
| No tooltips or help text on complex fields | PracticeDetails, Onboarding | Medium |
| Inconsistent placeholder text across all forms | All forms | Low |
| No character limits or validation messages on text fields | All forms | Medium |
| "About" field too small (3 rows) for meaningful profile description | PracticeDetails | Medium |
| Therapy Modalities only shown when "Therapy" selected, but CBT/DBT apply beyond | PracticeDetails | Low |
| "Description for listing" label duplicated on every field | PracticeDetails | Low |
| No preview of how descriptions render on public listing | PracticeDetails | Med-High |

---

## 2. UI Audit

### What's Good
- Consistent color scheme — `#043570` primary, `#00c0ff` accent
- Card-based layout with consistent border/rounded/shadow patterns
- Dark mode support throughout
- Tailwind + MUI + Radix combo with smooth framer-motion transitions
- Responsive design with collapsible sidebar

### What Needs Improvement

| Issue | Location | Severity |
|-------|----------|----------|
| Sidebar is 1469 lines — monolithic Layout.tsx | Layout.tsx | High |
| Settings sidebar only shows 5 of ~15 available items | Settings.tsx | **Critical** |
| Sessions (1751), Onboarding (1470), PracticeDetails (2306) — impossible to navigate | Multiple | High |
| No loading skeletons on any page | All pages | Medium |
| Inconsistent button sizes (py-1.5 vs py-2.5 vs py-3) | Across codebase | Medium |
| No sticky headers on long tables | IntakeForms, Clients, Sessions | Medium |
| Inconsistent focus ring colors on form fields | Across forms | Low |
| No print styles outside of FormResponseViewer | Multiple | Low |

---

## 3. UX Audit

### What's Good
- 5-step wizard for establishment creation is well-paced
- Tab navigation in IntakeForms (Forms / Flows / Entries)
- Action buttons with tooltips in tables
- Back navigation with breadcrumbs and buttons
- Toast notifications for feedback
- Responsive collapsible sidebar with drag-reorder

### What Needs Improvement

| Issue | Location | Severity |
|-------|----------|----------|
| **No unsaved changes warning** — navigating away silently loses data | PracticeDetails, FormBuilder, Onboarding | **Critical** |
| **No auto-save / draft saving** — browser crash loses all progress | All forms | **Critical** |
| **No validation summary on publish** — errors show field-by-field | PracticeDetails Step 5 | High |
| **No confirmation dialogs on delete** — archive/delete happens immediately | IntakeForms, IntakeFlows, PracticeDetails | High |
| **Form Builder has no preview mode** | FormBuilder | High |
| **No keyboard shortcuts** for power users | All | Medium |
| **Long flat dropdowns** — 20+ specialties, 18 modalities with no categories | MultiSelect | Medium |
| **"Years in Operation" is free-text** — should be a select with ranges | PracticeDetails | Medium |
| **No drag-to-reorder in EditFormModal** | IntakeForms | Medium |
| **No search debounce** — fires on every keystroke | IntakeForms, Clients | Medium |
| **No recent items** — re-accessing same clients/forms | All | Low |
| **Edit vs View confusion** — "View" means different things per context | IntakeForms | Medium |

### Flow Issues

| Flow | Problem | Suggestion |
|------|---------|------------|
| Onboarding → Dashboard | 5 steps then blank dashboard with no guidance | Add getting-started checklist |
| Create Establishment → Publish | Success just closes form, no confirmation | Show success summary with view link |
| Create Form → Assign to Client | Builder→List→Share→Select client = 4 clicks deep | Inline "Send to client" in builder save |
| Intake Flow → Forms | No cross-linking between flows and form list | Form picker modal in flow editor |
| Edit Establishment | Must click through all 5 steps even to edit one field | Allow step skipping or inline editing |

---

## 4. Architecture & Code Health

| Issue | Location | Severity |
|-------|----------|----------|
| Files >1000 lines — Layout (1469), Sessions (1751), Onboarding (1470), PracticeDetails (2306) | Multiple | High |
| Mock data mixed with context imports (650+ lines) | Context + Data | Medium |
| No error boundaries — render crash kills entire layout | App | High |
| `any` types used scattered across files | Multiple | Medium |
| Only 1 unit test in entire project | Root | High |
| DevRoleSwitcher visible in production | Layout | Medium |
| Hardcoded strings throughout JSX | All | Medium |
| `communitiesServed` still in type but removed from UI | types/partnerDashboard.ts | Low |

---

## 5. Recommended Improvements (Priority-Ordered)

### P0 — Must Fix
1. **Unsaved changes warning** — beforeunload + route blocker on all forms
2. **Confirmation dialogs** on all delete/archive operations
3. **Error boundaries** — wrap each route
4. **Loading/skeleton states** on all list pages
5. **Hide DevRoleSwitcher** — conditional on `import.meta.env.DEV`

### P1 — Should Fix
6. **Settings sidebar** — add missing nav items (Organization, Security, AI Voices, etc.)
7. **Form Builder preview mode** — toggle between edit and client view
8. **Validation summary on publish** — "X fields need attention"
9. **Recent items** — recently viewed in sidebar or dashboard
10. **Break up Layout.tsx** — extract sidebar into own component

### P2 — Nice to Have
11. **Keyboard shortcuts** — Ctrl+N, Ctrl+S, `/` for search
12. **Debounced search** — 300ms delay
13. **Categorized dropdowns** — group specialties/modalities
14. **Drag-to-reorder in EditFormModal**
15. **Print styles** for prescriptions, invoices, notes
16. **Character counters** on description fields
17. **Auto-save drafts** — localStorage every 30s
18. **Sticky table headers** on scrollable tables
19. **Break up large files** — extract steps from PracticeDetails, wizard sections from Onboarding
20. **Onboarding checklist** on Dashboard for new users

### P3 — Future
21. **Internationalization (i18n)** — externalize all strings
22. **Accessibility audit** — ARIA labels, keyboard nav, focus management
23. **E2E tests** — Playwright/Cypress for critical flows
24. **Design system** — shared Button/Input/Card/Tabs components
25. **Performance** — code-split large pages, memoize heavy computations

---

## 6. Changes Made This Session

| Change | Files Modified |
|--------|---------------|
| Moved Intake Forms tab → Actions grid in ClientProfile | `ClientProfile.tsx` |
| Moved Archived inside Form Templates as sub-filter | `IntakeForms.tsx` |
| Locked templates (no Edit/Archive/Delete for premade forms) | `IntakeForms.tsx`, `FormBuilder.tsx` |
| Fixed eye icon error (FIELD_TYPE_LABELS undefined) | `partnerDashboard.ts`, `ClientProfile.tsx`, `IntakeForms.tsx` |
| Renamed sidebar "Intake Forms" → "Forms" | `Layout.tsx`, `IntakeForms.tsx` |
| Added global share link with copy button | `IntakeForms.tsx` |
| Added custom entry support to MultiSelect (allowAdd) | `MultiSelect.tsx` |
| Removed Communities Served from form and view | `PracticeDetails.tsx`, `EstablishmentViewMode.tsx` |
| Moved Therapy Modalities to Step 1 (conditional on Therapy) | `PracticeDetails.tsx` |
| Added description textareas beneath fields | `PracticeDetails.tsx` |
| Updated Establishment type with description fields | `partnerDashboard.ts` |
