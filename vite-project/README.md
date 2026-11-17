# Velvet Pour

Landing page for a cocktail bar. React 19, Vite, Tailwind CSS 4, and GSAP scroll and text animations.

The live screen is a sticky nav and a hero. Menu, about, art, and contact copy lives in `constants/index.js` and is not rendered yet.

## Stack

- React 19 and Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- GSAP with `ScrollTrigger`, `SplitText`, and `@gsap/react`
- Playwright end-to-end tests (installed Chrome)

## Prerequisites

- Node.js with npm
- Google Chrome (Playwright uses the `chrome` channel)

## Setup

```bash
cd vite-project
npm install
npx playwright install
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Build, then Playwright against preview on port 4173 |
| `npm run test:e2e:headed` | Same tests with a visible browser |

## Project layout

```
vite-project/
  constants/index.js     nav links, drinks, hours, store info
  e2e/app.spec.js        brand, nav, and hero checks
  src/App.jsx            page shell
  src/components/Navbar.jsx
  src/components/Hero.jsx
  playwright.config.js   preview server on http://127.0.0.1:4173
```

## What’s on screen

- **Navbar** — brand “Velvet Pour” plus links to Cocktails, About Us, The Art, and Contact. Background blurs as you scroll.
- **Hero** — “MOJITO” headline, leaf parallax, and a link to `#cocktails`.

Nav targets other than the hero are not built yet. A full-viewport black block sits under the hero so the scroll animation has room to run.
