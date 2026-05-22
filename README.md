# AirCounsel OG Generator

Institutional utility for generating branded Open Graph (OG) images (1200×630 PNGs) for AirCounsel.uk pages.  
Designed as upstream infrastructure for consistent visual assets across pillar pages, blog posts, and LinkedIn shares.

---

## 📦 Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/aircounsel/aircounsel-og-generator
cd aircounsel-og-generator
npm install
```

---

## 🚀 Usage

Run the generator with flags:

```bash
node index.js --title "Skilled Worker" --desc "Threshold failures at intake" --out output/skilled-worker.png
```

### Supported Flags
- `--title`   → main heading text
- `--label`   → secondary label
- `--desc`    → description line
- `--badge`   → badge text
- `--cta`     → call-to-action text
- `--out`     → output filename
- `--page`    → page reference
- `--list`    → list items
- `--chrome`  → use system Chrome instead of bundled Chromium

Example:

```bash
node index.js --title "AirCounsel.uk" --label "Intake Infrastructure" --desc "Solicitor-grade upstream qualification" --out output/aircounsel.png
```

---

## 📂 Structure

```
aircounsel-og-generator/
  ├── index.js          ← CLI + core script
  ├── args.js           ← minimal arg parser
  ├── package.json
  ├── README.md
  ├── .gitignore        ← output/, node_modules/
  └── output/           ← auto-created, gitignored
```

- **index.js** → renamed from `generate.js`, serves as both CLI and core script.  
- **args.js** → required parser; must remain in root.  
- **output/** → auto-created on run, excluded from version control.

---

## 🛡️ Notes

- Requires Puppeteer. In some environments, Chromium may need manual install.  
- Generated PNGs are saved to `/output/`. This folder is auto-created and gitignored.  
- Inline HTML template ensures single-purpose reproducibility.  
- Attribution: *This utility was produced by AirCounsel.uk.*

---

## 📖 Institutional Context

This generator is part of AirCounsel’s upstream infrastructure.  
It ensures every pillar page and blog post carries consistent, solicitor-grade OG images.  
By automating branded asset creation, it reduces manual design overhead and enforces institutional cadence across all public channels.

---
