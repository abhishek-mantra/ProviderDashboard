Revamp the /Client Requests Screen

We need to redesign the Client Requests screen in the provider dashboard.

1. UI Consistency

To maintain consistency across the dashboard:

Replicate the UI structure used in the /Sessions screen for the following components:

Page heading

Subtext/description

Search bar

Card layout and spacing

Overall page structure

The goal is to ensure visual consistency across the provider dashboard.

2. Tabs Structure

The /Client Requests page should have the following three tabs:

Pending

Accepted

Declined / Missed

Each tab should display requests based on their current status.

3. Client Request Cards

All request cards should have a consistent fixed size across the screen.

The information shown on the cards should match the structure shown in the attached screenshot.

4. Long Therapy Specialization Text Handling

The line showing therapy areas (for example):

Therapy for ADHD, Anxiety, Bipolar, Child Or Teen, Depression, Family, Insomnia, LGBTQ+, OCD

can become very long in some cases.

To handle this:

Always limit the display to a single line

If the text exceeds the width of the card, truncate it with ...

On hover, show the full text in a tooltip

Example tooltip content:

Therapy for Hypertension, ADHD, Abuse, Addiction, Anger, Anxiety, Bipolar, Child Or Teen, Depression, Family, Insomnia, LGBTQ+, OCD, Panic Attacks, Relationship/Couple, Sex Therapy, Spiritual, Stress Management, Trauma And PTSD, Workplace Issues, Employee Mental Health / EAP, Marriage, Divorce, Online Therapy

5. Accepted Tab Behavior

In the Accepted tab:

The client has already been accepted

Therefore do NOT show Accept or Reject buttons

Only show the request information and current status

6. Declined / Missed Tab Behavior

In the Declined / Missed tab:

Do not show Accept or Reject buttons

Only display the request details along with a label indicating whether the request was:

Declined

Missed

7. Goal

The objective of this update is to:

Improve UI consistency

Ensure cards remain clean even with long therapy descriptions

Prevent unnecessary actions in tabs where decisions have already been made