# N S H D — Portfolio

Professional portfolio of **Ahammed Nishad K** — Android Developer & Designer, Kerala, India.

**Live:** GitHub Pages (auto-deployed from `main` by `.github/workflows/pages.yml`), or run it anywhere static files are served.

## Stack

- **React 19 + Vite 6** — fast build, tiny output
- **Design system:** Astryx-inspired neutral tokens — compact density (4px base unit, CSS-variable layout roles: `--layout-inset / --layout-section-gap / --layout-column-gap / --layout-card-padding`), one accent (`#bff747`), no gradients, accessible contrast
- **Fonts:** Space Grotesk (display) · Inter (body) · JetBrains Mono (labels/numbers)
- **Icons:** Lucide only — no emoji icons
- **Motion:** Framer Motion — transform/opacity only (60fps, no layout thrash), animated counters & skill bars, spotlight project cards, scroll progress, `prefers-reduced-motion` respected

## Sections

Hero with animated stat tiles → skills marquee → About → Skills → Projects (StudyFlow, JARVIS-2.0, DayLoop, NUR-M3, FreeLLM, EVOLVE) → Journey timeline → Contact with copy-email + socials.

Fully responsive: fluid `clamp()` type, bento grids collapse 4 → 2 → 1 columns, floating pill nav becomes a bottom-sheet style menu under 860px.

## Develop

```bash
npm install
npm run dev     # local preview
npm run build   # production build → dist/
```

## Follow me

- Instagram: https://www.instagram.com/__nshd.__
- WhatsApp: https://wa.me/+918590455801
- Telegram: https://t.me/nshd_0
- Email: nishadahammed081@gmail.com
- GitHub: https://github.com/whitesr09
