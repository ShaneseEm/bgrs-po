# Benishangul Gumuz Regional State - Office of the President Web Portal
### የቤኒሻንጉል ጉሙዝ ክልላዊ መንግሥት የርዕሰ መስተዳድር (ፕሬዝዳንት) ጽሕፈት ቤት ይፋዊ ፖርታል

Official government portal for the **Office of the President of Benishangul Gumuz Regional State (BGRS)**, Assosa, Ethiopia. Designed and architected following the visual standards and functional structure of the Prime Minister's Office of Ethiopia ([pmo.gov.et](https://www.pmo.gov.et/)).

---

## 🏛️ Key Features

- **Governmental & Presidential Identity**:
  - Ethiopian National Tricolor top and bottom bands.
  - Official Regional Emblem and bilingual authority header.
  - Gregorian and Ethiopian Calendar toggle (`G.C.` / `E.C.`).
  - Accessibility controls: Font size scaler (`A-` / `A+`) and High Contrast Mode.
  - Bilingual localization: Full **English** and **Amharic (አማርኛ)** content toggled with 1-click.

- **Sections Modeled on PMO Ethiopia**:
  1. **Executive Hero Carousel**: Highlighting regional leadership, GERD in Guba woreda, and agricultural/mineral development.
  2. **Breaking News Marquee Ticker**: Real-time cabinet announcements and regional updates.
  3. **President's Official Vision**: Portrait showcase of H.E. President Ashadli Hassan, executive quote, biography, and directives count.
  4. **Key Statistics & Indicators**: Real-time metrics on clean energy (GERD 5,150+ MW), regional territory (50,380 km²), administrative zones, and Green Legacy seedlings.
  5. **Strategic Flagship Initiatives**:
     - *GERD Socio-Economic Corridor* (Guba Woreda, Benishangul-Gumuz)
     - *Gold & Mineral Resource Stewardship*
     - *Agricultural Mechanization & Bamboo Industry*
     - *Peace, Social Cohesion & Reconciliation*
  6. **News & Media Hub**: Filter by *All*, *Press Releases*, *Cabinet Decisions*, *Speeches*, and *Development*. Includes modal reader with print and social sharing.
  7. **Governance Architecture**: Directory of Zonal Administrations (Assosa, Metekel, Kamashi, Mao-Komo) and Regional Sectoral Bureaus.
  8. **Citizen Portal ("Message the President's Office")**: Direct petition and feedback submission with automatic reference ID generator (e.g. `BGRS-123456`).
  9. **Executive Headquarters & Map**: Assosa Executive State House details, official emergency lines (`8181`), telephone, and email.
  10. **Federal Links Directory**: Fast access to PMO Ethiopia, MFA, MoWE, ENA, and NBE.

---

## 🖼️ How to Add or Replace Images

The site comes pre-loaded with official vector illustrations and placeholders in `public/images/`.

When you have your real photos, you can simply save or overwrite files in the **`public/images/`** directory:

| Image Purpose | Filename in `public/images/` | Recommended Size | Notes |
|---|---|---|---|
| **President Portrait** | `president-portrait.svg` (or `.jpg`/`.png`) | `600 x 750 px` | Formal executive portrait of H.E. President Ashadli Hassan |
| **Official Seal / Emblem** | `emblem.svg` (or `.png`) | `500 x 500 px` | Regional state crest / shield (transparent background) |
| **GERD Dam Panorama** | `gerd-banner.svg` (or `.jpg`/`.png`) | `1200 x 600 px` | Grand Ethiopian Renaissance Dam in Guba woreda |
| **Assosa State House** | `assosa-hq.svg` (or `.jpg`/`.png`) | `1200 x 800 px` | Regional Executive Office building in Assosa |
| **Agriculture & Farmland** | `agriculture.svg` (or `.jpg`/`.png`) | `800 x 500 px` | Metekel / Kamashi agriculture, bamboo, or model farms |
| **Gold & Mineral Wealth** | `mining.svg` (or `.jpg`/`.png`) | `800 x 500 px` | Gold extraction, processing centers, or mineral reserves |

> 💡 **Built-in Image Guide:** Click the **"Image Manager"** button on the top right bar of the website at any time to inspect every image slot and its recommended specifications!

---

## 🚀 Running the Project

### 1. Development Mode
To launch the site locally on your computer with hot-reloading:
```bash
npm run dev
```
Open your browser to `http://localhost:5173/`.

### 2. Production Build
To create an optimized production build:
```bash
npm run build
```
The deployable assets will be in the `dist/` directory, ready to upload to any web host (Apache, Nginx, Vercel, Netlify, cPanel, or government server).

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```
bgrs-po/
├── public/
│   └── images/                <-- Place your images here
│       ├── emblem.svg
│       ├── president-portrait.svg
│       ├── gerd-banner.svg
│       ├── assosa-hq.svg
│       ├── agriculture.svg
│       └── mining.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx         <-- Authority banner, calendar toggle, language switcher
│   │   ├── Navigation.jsx     <-- Sticky navbar & mobile drawer
│   │   ├── HeroBanner.jsx     <-- Slide carousel & breaking news ticker
│   │   ├── PresidentSection.jsx <-- President profile, quote & bio
│   │   ├── StatisticsSection.jsx <-- Regional impact numbers
│   │   ├── InitiativesSection.jsx <-- Flagship projects (GERD, Gold, Agriculture)
│   │   ├── NewsHub.jsx        <-- Filterable newsroom
│   │   ├── NewsModal.jsx      <-- Full article reader modal with print/share
│   │   ├── AdministrationSection.jsx <-- Zones & Sectoral Bureaus
│   │   ├── CitizenPortal.jsx  <-- Message President form & public services
│   │   ├── ContactSection.jsx <-- Assosa HQ coordinates & contacts
│   │   ├── Footer.jsx         <-- Federal links, newsletter & credits
│   │   ├── ImageGuideModal.jsx <-- In-app guide for replacing images
│   │   └── SearchModal.jsx    <-- Real-time global search
│   ├── data/
│   │   └── content.js         <-- All English & Amharic text, news, and data
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🇪🇹 Government & Regional Attribution
- **Institution**: Office of the Regional President, Benishangul Gumuz Regional State
- **Seat**: Assosa, Federal Democratic Republic of Ethiopia
- **Reference**: Structure and visual identity modeled upon [Office of the Prime Minister - Ethiopia (PMO)](https://www.pmo.gov.et/)
