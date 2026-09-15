# VolunteerHub — Service Hours & Club Activity Tracker

> Offline-first volunteer & club activity tracker for high school students. Log service hours, manage clubs, get supervisor approval, and export a signed PDF for your counselor.

**Live:** https://flynntaggart26.github.io/volunteer-hub/ · **Stack:** Vanilla HTML/CSS/JS · **Storage:** `localStorage` (no account, no backend)

---

## Why it exists

Most schools require 80–120 service hours for graduation. Students track them in messy sheets, lose signatures, and scramble before deadlines. VolunteerHub gives you **one place to log, verify, and export** — exactly what counselors want to see.

## Features

### 📊 Dashboard
- **Progress ring** vs target hours (e.g., 100h) — approved vs pending
- KPIs: total logged / approved / pending / club count
- **Hours by category** (Community Service, Club, Competition, Leadership, Other)
- **6-month trend** (approved hours)
- Recent activities

### 📝 Log Hours
- Add activity: date, organization/club, category, hours (0.25 step), description, supervisor name/email, evidence filename, status (pending / approved / rejected)
- **Teacher workflow in one click:** Approve ✓ / Reject / Pending — mimics real sign-off
- Filters: search, category, status, date range
- Edit & delete

### 🏫 Clubs
- Add clubs with role & joined date, auto-calculates approved hours per club from the log
- Remove club

### 📄 Report & Signed PDF
- **Print / Save as PDF** — exact preview that prints. Includes header with school, verification code (`VOL-2026-XXXX`), period, student/advisor, table of filtered activities, summary, and **3 signature lines:** Student / Supervisor / Counselor.
- **Use Log filters to limit what appears in PDF** (e.g., only approved, only this semester)
- **Export CSV:** filtered or all

### Profile & Data
- Student profile: name, school, grade, ID, target hours, advisor
- All data stays in browser (`localStorage` keys `vh-activities`, `vh-clubs`, `vh-profile`)
- **Export JSON** backup & **Import** restore

---

## Getting started

```bash
git clone https://github.com/Flynntaggart26/volunteer-hub.git
cd volunteer-hub
# just open — no build
open index.html  # or double-click
```

Or use the live Pages site.

## How counselors use it

1. Student logs hours, sets status to `pending`
2. Supervisor clicks `Approve ✓` (or student shows evidence and teacher approves)
3. Student goes to **Report & PDF** → **Print / Save as PDF** → submits signed printout
4. Verification code on PDF lets counselor cross-check the JSON export if needed

## Project structure

```
volunteer-hub/
├── index.html   # app shell + sections
├── style.css    # light, print-ready styles
├── app.js       # data model, localStorage, render, PDF/CSV
└── README.md
```

## Tech

- No frameworks, no build, no dependencies — works offline after first load
- Print CSS (`@media print`) for perfect PDF from browser
- Vanilla SVG progress ring, div-based bar charts

## Roadmap

- Photo evidence preview (data URL) + drag & drop
- QR verification link
- Multi-student class view for teachers

## License

MIT — free to use, modify, and share.
