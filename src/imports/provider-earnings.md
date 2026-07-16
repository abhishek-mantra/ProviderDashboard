Revamp Provider Billing Section → Earnings

Revamp the current Billing section in the Provider Dashboard and rename it to Earnings.

This screen is used by providers (therapists, dietitians, yoga experts etc.) to track how much they have earned from completed sessions and when they will receive payouts.

Important Product Logic

MantraCare bills the clients directly

Providers do not generate invoices

Providers earn a pre-defined session fee

Earnings are credited after a session is completed

It may take up to 2 hours after session completion for Google Meet API to confirm the session

Once confirmed, the session automatically becomes Eligible for Payout

Payouts happen monthly via bank transfer

Refunds do not impact provider earnings

Because of this model, the screen should focus on earnings and payouts, not billing.

Page Layout

The visual structure, spacing, typography, and theme must strictly follow the style used in the attached client Billing screens.

Reuse the same:

Page header layout

Tab style

Search bar design

Card design

Table styling

Colors

Font sizes

Rounded cards

Spacing and padding

The goal is UI consistency across the platform.

Page Header

Title:
Earnings

Subtext:
Track your session earnings and monthly payouts.

Top Earnings Summary Cards

Show 4 summary cards at the top.

1. Total Earnings

Total amount earned from all completed sessions.

2. This Month Earnings

Total earnings from sessions completed in the current month.

3. Pending Processing

Sessions completed but still waiting for system confirmation (Google Meet verification may take up to 2 hours).

4. Next Payout

Amount scheduled for the next monthly payout.

Example:

Total Earnings
₹ 24,500

This Month
₹ 3,200

Pending Processing
₹ 600

Next Payout
₹ 3,800
Paid on: 1 April 2026

Cards should visually match the style used in the client dashboard cards.

Tabs Section

Below the summary cards, add three tabs.

1. Earnings

Shows all sessions that have successfully generated earnings.

2. Processing

Shows sessions that have been completed but are still waiting for Google Meet verification (can take up to 2 hours).

3. Payout History

Shows monthly payouts that have already been transferred to the provider.

Earnings Tab

Use a table layout consistent with the Orders table design in the client Billing page.

Columns:

Session ID
Client Name
Service Type (Therapy / Nutrition / Yoga etc.)
Session Date
Session Duration
Earning Amount
Status

Status examples:

Processing
Eligible for Payout
Paid

Rows should be clean and easily scannable.

Processing Tab

Shows sessions completed but waiting for confirmation.

Columns:

Session ID
Client Name
Service Type
Session Date
Expected Earnings
Status

Status badge:

Processing

Add helper text above the table:

Session confirmation may take up to 2 hours after completion.

Payout History Tab

Shows monthly payouts sent to the provider.

Columns:

Payout ID
Month
Sessions Included
Total Amount
Payout Date
Status

Status examples:

Paid
Processing

Each payout row should also allow the provider to expand to see sessions included in the payout.

Search and Filters

Add a search bar similar to the one used in the Orders page.

Search by:

Session ID
Client name

Optional filters:

Month
Service type

Empty States

If no earnings exist yet, show an empty state message:

You haven't completed any sessions yet.
Your earnings will appear here after your first session.

Important UI Requirements

Must match the visual design from the attached screenshots including:

Typography

Button styling

Card radius

Table header design

Badge styling

Hover states

Spacing

Icon style

Do not introduce new visual styles.

The Earnings module should feel like a natural extension of the existing Billing UI used in the client dashboard.