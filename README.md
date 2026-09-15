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
- **Export CSV:** filtered or all (now includes Reflection)
- **QR verification:** each report shows a QR (generated offline via `qrcodejs` MIT) encoding `https://…/?verify=VOL-…&h=...` — counselor can scan to cross-check hours
- **Photos embedded:** if you added a photo, it appears as 48px thumb in the PDF table — proof without external upload

### 🏅 Service Certificate (NEW)
- One-click **Generate Certificate** — original design (double border, seal “VOLUNTEER HUB”, not a government diploma copy). Shows name, school, total **approved** hours, period, date, verification code + QR + supervisor signature image. Landscape A4, print-ready. Clearly labeled “Not an official government document.”

### 🖼️ Photo Evidence — Your Own Photos Only (NEW)
- File input `accept="image/*"` in Add/Edit — stores as **data URL in localStorage only**, never uploaded. Max 800KB (checked client-side). Preview + thumbnail in Dashboard recent list and PDF. Shows in table as `📷 photo`. You must own the photo; for faces get consent — no stock-photo copying.

### ✍️ Digital Signature Pad (NEW)
- Canvas pad (400×140) in Add/Edit — draw with mouse/finger (original code, no library). **Save signature** stores PNG data URL with the activity, embedded in PDF table and certificate. “Clear” to redo. Legal basis: user-drawn consent image, stored locally — not a forged official seal.

### 💭 Reflection Journal — For University Essays (NEW)
- New field `Reflection — What did you learn?` per activity. Shown as left-bordered quote in Log table, recent Dashboard cards, and in PDF under Description. Exported in CSV/JSON. Designed for Common App / motivation letters — your original words, your copyright.

### Profile & Data
- Student profile: name, school, grade, ID, target hours, advisor
- All data stays in browser (`localStorage` keys `vh-activities`, `vh-clubs`, `vh-profile`)
- **Export JSON** backup & **Import** restore — now includes `reflection, photoDataUrl, signatureDataUrl`

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

- Vanilla HTML/CSS/JS — no build, no backend, works offline after first load
- Print CSS (`@media print`) for perfect PDF from browser
- Vanilla SVG progress ring, div-based bar charts
- **QR:** `qrcodejs 1.0.0` via cdnjs (MIT — https://github.com/davidshimjs/qrcodejs) — only external lib, MIT allows commercial/private use with attribution (credited here)
- **Signature pad:** original canvas code (no library) — your drawing, your data
- **Fonts:** Inter + Fraunces (OFL)

## 🔒 Legal & Copyright — Deep Check (Why These 5 Features Are Safe)

We researched each new feature to avoid any copyright / legal risk:

| # | Feature | Why it’s safe |
|---|---------|---------------|
| 1 | **Photo evidence (local data URL)** | You upload **only photos you took yourself** — you own the copyright. App never uploads to a server; `FileReader` stores a data URL in `localStorage` only. No stock photos are bundled. No third-party copyright is distributed. For photos with people, you must have their consent (GDPR/KVKK: data stays on device, not processed). File size limit prevents abuse. |
| 2 | **QR verification (qrcodejs MIT)** | Library is **MIT licensed** (permissive, no copyleft). CDN link is credited here + in code comment. QR encodes only a verification URL with hours (`VOL-…`). No trademark — QR is a standard, not a logo. Offline generation, no Google API, no external tracking. |
| 3 | **Digital signature pad** | **100% original code** (`canvas` + mouse/touch). No `signature_pad` library. The image is **user-drawn**, stored as `image/png` data URL locally. It’s an e-consent mark, not a forgery of an official seal or someone else’s signature. No seal of state is copied. |
| 4 | **Service certificate** | **Original design** — double border + centered text + “VOLUNTEER HUB” text seal (CSS). **Not a copy** of MEB/Ministry or any university diploma template, no emblem, no Atatürk silhouette, no state coat-of-arms. Explicit footer: “Not an official government document.” So no forgery/impersonation under TCK 204. Your hours are factual, your template is yours. |
| 5 | **Reflection journal** | Content is **your original writing** — you hold the copyright automatically. App only stores and prints it. No AI-generated or copied essay text is bundled. Helps with authentic Common App essays without plagiarism risk. |

**General:** No background music, no stock icons, no scraped data. All code is yours (MIT). Student personal data (name, photos, signatures) **never leaves the browser** — no DPA needed, no data-controller risk. If you fork for a school, add a privacy note that photos need consent.

## Roadmap

- Drag & drop photo + compress to WebP
- Multi-student class view for teachers (still local)
- PWA installable + offline cache

## License

MIT — free to use, modify, and share. QR lib remains MIT (retain notice if you vendor it).
