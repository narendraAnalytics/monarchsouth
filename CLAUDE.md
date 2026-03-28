# MONARCHSOUTH — Project Documentation
> Men's Branded Fashion Shop · 3D Modern Website · Cinematic Luxury Aesthetic

---

## 1. PROJECT OVERVIEW

**Brand Name:** MONARCHSOUTH
**Product Categories:** Men's T-Shirts + Formal Wear (Blazers, Dress Shirts, Trousers)
**Tagline:** "Engineered for the Bold. Worn by the Few."
**Goal:** A high-end, cinematic 3D branded e-commerce experience for men's fashion — inspired by pixelvault.fit's immersive terminal aesthetic. No Blender. All 3D is procedural via React Three Fiber.

---

## 2. PIXELVAULT.FIT — DESIGN ANALYSIS (via Playwright MCP)

### Site Examined: https://www.pixelvault.fit/
**Page Title:** PIXELVAULT – An Immersive Creative Marketplace from 2047

### Key Design Patterns Observed:

#### Navigation
- Logo styled as `[PIXELVAULT]` — bracket-wrapped monospace
- Sound toggle button: `SOUND [OFF]` / `SOUND [ON]`
- Nav links: `SHOP` | `PLAYGROUND` — minimal, all-caps
- Flat, no underlines — pure button style

#### Hero Section
- Concept: "An Immersive Creative Marketplace from 2047"
- Status HUD panel — live terminal readout:
  ```
  VAULT STATUS
  ------------
  SESSION : [28.03.2026]
  TIMESTAMP: [12:20:38]
  ASSETS : (LOADED)
  DISPLAY : (1034X613PX @ 75HZ)
  CLIENT : (GOOGLE CHROME)
  MARKET : (2047)
  ```
- `[X]` markers scattered as corner decorators / crosshair style UI accents
- Copy in all-caps monospace: `EXPERIENCE THE FUTURE BEFORE IT ARRIVES`
- Footer tagline: `3D ASSETS · SHADERS · VISUAL ART · CREATOR ECONOMY`

#### Text Scramble Effect
- All text (nav, heading, status data) starts scrambled/glitched — random characters cycling before resolving to real text
- Used on page load AND navigation transitions
- Implemented via GSAP targeting text nodes

#### GSAP + Three.js Warnings Observed
- `THREE.WebGLProgram: Program Info Log` — custom shader in use
- `GSAP target null not found` — scroll-triggered elements not yet mounted (normal with SPA routing)

#### Footer
- `© 2026 [PIXELVAULT]`
- One-line brand description
- `CONTACT` button styled like nav

#### Interaction Model
- Single-page feel with section transitions
- Sound toggle is a distinct feature
- Very minimal color scheme — predominantly dark with accent
- Terminal/sci-fi UI language throughout

### Aesthetic Summary
| Element | Pixelvault Style |
|---|---|
| Logo | `[BRAND]` bracket wrap |
| Text case | ALL CAPS everywhere |
| Font style | Monospace / terminal |
| Status indicators | HUD overlays with live-updating values |
| Decorators | `[X]` crosshairs, `---` dividers, `·` separators |
| Color feel | Dark cinematic, single accent glow |
| Transitions | Text scramble → resolve |
| GSAP | ScrollTrigger + text scramble tweens |
| Three.js | Custom shaders, WebGL programs |
| Sound | Ambient sound toggle |

---

## 3. SKILL — 3D LANDING PAGE (Loaded from `3d-landing-page.skill`)

### Stack Selection: **Option B — Vite + GSAP**
Chosen because:
- Portfolio/immersive SPA (no SSR needed)
- Canvas-heavy, complex scroll storytelling
- GSAP ScrollTrigger for cinematic scroll animations

### Visual Vibe: **ember-gold** (customized for luxury fashion)
| Token | Value | Usage |
|---|---|---|
| bg | `#150c05` | Page background (deep mahogany-brown) |
| surface | `#1f1108` | Card/section surfaces |
| card | `#2d1a0a` | Elevated card backgrounds |
| accent1 | `#d4a017` | Primary gold accent |
| accent2 | `#c8731a` | Amber-orange secondary accent |
| text | `#f5e6c8` | Body text (warm cream) |
| muted | `#c9a96e` | Muted/secondary text |

> **ABSOLUTE BANS (from skill):** NO pure black, NO pure white, NO purple/violet of any shade

### Typography
| Role | Font | Weights |
|---|---|---|
| Display | Playfair Display | 400, 600, 700 |
| Body | Plus Jakarta Sans | 300, 400, 500, 600 |
| Mono | Space Mono | 400, 700 |

Loaded via Google Fonts `@import` in `src/index.css` (Vite version — no `next/font`).

> **BANNED FONTS:** Inter, Roboto, Arial, system-ui

### Signature Details (Applied)
1. Custom glow cursor with gold trail
2. Cinematic mouse spotlight on hero section
3. 3D product cards with multi-angle view (CSS perspective + Framer Motion)
4. Noise/grain texture overlay at 3–5% opacity (premium feel)
5. Text scramble reveal on hero headline (pixelvault-inspired)

---

## 4. TECH STACK

```
Framework:   Vite + React 19 + TypeScript
Styling:     Tailwind CSS v4 (@theme block in index.css — NO tailwind.config.js)
3D:          React Three Fiber v9 + @react-three/drei
Animation:   GSAP 3 + @gsap/react (useGSAP hook) + Framer Motion
Smooth Scroll: Lenis
Icons:       Lucide React
Merging:     clsx + tailwind-merge
```

### Key Package Versions (from package.json)
```json
{
  "gsap": "^3.14.2",
  "@gsap/react": "^2.1.2",
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "@react-three/postprocessing": "^3.0.4",
  "three": "^0.183.2",
  "framer-motion": "^12.38.0",
  "lenis": "^1.3.21",
  "tailwindcss": "^4.2.2",
  "@tailwindcss/vite": "^4.2.2"
}
```

---

## 5. PROJECT STRUCTURE

```
monarchsouth/
├── CLAUDE.md                    ← This file
├── package.json
├── vite.config.ts
├── tsconfig.app.json
├── index.html
├── public/
│   └── favicon.svg
└── src/
    ├── index.css                ← Tailwind v4 @theme, Google Fonts, base styles
    ├── main.tsx                 ← React root + Lenis smooth scroll init
    ├── App.tsx                  ← Root: assembles all sections
    ├── components/
    │   ├── ui/
    │   │   ├── GlowCursor.tsx       ← Custom gold cursor + glow trail
    │   │   ├── NoiseOverlay.tsx     ← Grain texture (3–5% opacity)
    │   │   ├── GlassCard.tsx        ← Glassmorphism card base
    │   │   ├── TiltCard.tsx         ← 3D mouse-tracking tilt card
    │   │   ├── MagneticButton.tsx   ← Magnetic spring button wrapper
    │   │   ├── GradientButton.tsx   ← Gold gradient CTA button
    │   │   └── AnimatedCounter.tsx  ← Count-up number on scroll entry
    │   ├── three/
    │   │   ├── HeroCanvas.tsx       ← R3F Canvas: particles + geometry + bloom
    │   │   ├── ParticleField.tsx    ← 3000 gold particles rotating slowly
    │   │   └── FloatingGeometry.tsx ← Wireframe icosahedron + distort material
    │   └── sections/
    │       ├── FloatingNav.tsx      ← Fixed pill nav, glass on scroll
    │       ├── Hero.tsx             ← 3D canvas BG + terminal HUD + headline
    │       ├── Collections.tsx      ← 3-column tilt card collection grid
    │       ├── ProductShowcase.tsx  ← Multi-angle viewer (FRONT/BACK/SIDE/DETAIL)
    │       ├── BrandStory.tsx       ← Craftsmanship section with feature cards
    │       ├── Metrics.tsx          ← Animated counters horizontal strip
    │       ├── Testimonials.tsx     ← Glass card testimonials with marquee
    │       ├── CTA.tsx              ← Mesh gradient CTA with email input
    │       └── Footer.tsx           ← 4-col footer with social links
```

---

## 6. CRITICAL ANIMATION RULES (from 3d-landing-page skill)

### GSAP Rules
1. **GSAP + CSS transform conflict:** Never use `transform` CSS on GSAP-animated elements — GSAP overwrites it. Use layout props (`top`, `left`) instead.
2. **Always `useGSAP` with `{ scope: ref }`** — NOT `useEffect`. Kills triggers on unmount.
3. **`will-change`** only on actively animated elements — not globally.
4. **`pointer-events: none`** on all Canvas/3D background elements — prevents click capture.
5. **Backdrop filter:** Always add `-webkit-backdrop-filter` prefix alongside `backdrop-filter`.

### Framer Motion Rules
- `viewport={{ once: true }}` on ALL scroll animations — never re-trigger
- `stagger` on every section's children for cascade reveal

---

## 7. SECTIONS ARCHITECTURE

| # | Section | Key Elements |
|---|---|---|
| 1 | `FloatingNav` | Pill nav, transparent → glass on 80px scroll, logo `[MONARCHSOUTH]` |
| 2 | `Hero` | R3F canvas BG, terminal HUD overlay, headline in Playfair, glow cursor |
| 3 | `Collections` | T-Shirts / Formal / Essentials — 3 TiltCards with product images |
| 4 | `ProductShowcase` | 4-angle viewer: FRONT · BACK · SIDE · DETAIL + product metadata |
| 5 | `BrandStory` | Craftsmanship features: material, fit, durability, sustainability |
| 6 | `Metrics` | `10K+` customers · `100+` designs · `4.9★` rating · `48hr` delivery |
| 7 | `Testimonials` | Auto-scrolling marquee of 6 glass-card reviews |
| 8 | `CTA` | Email signup + "Shop Now" button, mesh gradient BG |
| 9 | `Footer` | `[MONARCHSOUTH]` brand + 4-column links + social |

---

## 8. BRAND COPY

### Products
**T-Shirts**
- "The Icon Tee" — 280gsm heavyweight premium cotton, boxy oversized
- "The Atlas Tee" — Enzyme-washed vintage feel, longline cut
- "The Sovereign Tee" — Embroidered chest logo, slim athletic fit

**Formal Wear**
- "The Empire Blazer" — Italian wool blend, notch lapel, structured shoulders
- "The Throne Shirt" — Egyptian cotton poplin, spread collar
- "The Dynasty Trouser" — Slim tapered, pleated front, side adjusters

### Marquee Brands/Materials
SUPIMA COTTON · MERINO WOOL · ITALIAN FABRIC · HAND STITCHED · ETHICAL SOURCING · MADE TO LAST

---

## 9. VITE CONFIG NOTE

The existing `vite.config.ts` uses `@vitejs/plugin-react`. The `@tailwindcss/vite` plugin from `package.json` must also be added to `vite.config.ts` plugins array for Tailwind v4 to work:

```ts
import tailwindcss from '@tailwindcss/vite'
// add to plugins: [react(), tailwindcss()]
```

---

## 10. TAILWIND v4 SETUP

No `tailwind.config.js`. All configuration lives in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-mahogany: #150c05;
  --color-surface:  #1f1108;
  --color-card:     #2d1a0a;
  --color-gold:     #d4a017;
  --color-amber:    #c8731a;
  --color-cream:    #f5e6c8;
  --color-muted:    #c9a96e;
  --font-display:   'Playfair Display', Georgia, serif;
  --font-body:      'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono:      'Space Mono', monospace;
}
```

**Usage in JSX:** `bg-mahogany`, `text-gold`, `font-display`, `text-cream`, etc.

---

## 11. QUALITY CHECKLIST

- [ ] No black, white, or purple anywhere
- [ ] Hero has signature detail (cursor glow + spotlight)
- [ ] Every section has MeshGradient or GlowBlob — no flat sections
- [ ] 3D canvas has bloom post-processing
- [ ] Noise/grain overlay at root level
- [ ] Playfair Display + Plus Jakarta Sans loaded
- [ ] Hero H1 uses `clamp()` and gradient word
- [ ] All product cards use TiltCard
- [ ] Framer Motion stagger on all section children
- [ ] Nav transparent → glass on scroll
- [ ] CTA buttons use MagneticButton
- [ ] Mobile responsive: hamburger, stacked grids, readable fonts
- [ ] `pointer-events: none` on all canvas/3D elements
- [ ] All backdrop-filter has `-webkit-` prefix
- [ ] GSAP uses `useGSAP({ scope: ref })` not `useEffect`
- [ ] No CSS `transform` on GSAP-animated elements
- [ ] `viewport={{ once: true }}` on Framer Motion scroll animations
