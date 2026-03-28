# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# MONARCHSOUTH — Project Documentation
> Men's Branded Fashion Shop · 3D Modern Website · Cinematic Luxury Aesthetic

**Brand Name:** MONARCHSOUTH
**Tagline:** "Wear Your Crown."
**Goal:** High-end, cinematic 3D branded e-commerce SPA for men's fashion. All 3D is procedural via React Three Fiber — no Blender assets.

---

## 1. COMMANDS

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

---

## 2. TECH STACK

```
Framework:     Vite 8 + React 19 + TypeScript
Styling:       Tailwind CSS v4 (@theme in index.css — NO tailwind.config.js)
3D:            React Three Fiber v9 + @react-three/drei + @react-three/postprocessing
Animation:     GSAP 3 + @gsap/react (useGSAP hook) + Framer Motion
Smooth Scroll: Lenis (via ReactLenis root wrapper in main.tsx)
Icons:         Lucide React
Merging:       clsx + tailwind-merge
```

---

## 3. PROJECT STRUCTURE

```
src/
├── index.css              ← Tailwind v4 @theme tokens + Google Fonts + base reset
├── main.tsx               ← React root + ReactLenis smooth scroll wrapper
├── App.tsx                ← SPA router (useState<PageId>) + GlowCursor + NoiseOverlay
├── lib/
│   └── transitions.ts     ← Framer Motion pageVariants (opacity+y+blur in/out)
├── pages/
│   ├── HomePage.tsx        ← Wraps MergedHero with pageVariants
│   ├── CollectionsPage.tsx
│   ├── LookbookPage.tsx
│   └── AboutPage.tsx
└── components/
    ├── ui/
    │   ├── GlowCursor.tsx      ← Custom gold cursor + glow trail
    │   ├── NoiseOverlay.tsx    ← Grain texture overlay (3–5% opacity)
    │   └── TextScramble.tsx    ← Text scramble/glitch reveal component
    ├── three/
    │   ├── HeroCanvas.tsx      ← R3F Canvas: particles + geometry + bloom
    │   ├── ParticleField.tsx   ← 3000 gold particles rotating slowly
    │   └── FloatingGeometry.tsx← Wireframe icosahedron + distort material
    └── sections/
        └── MergedHero.tsx      ← Full-screen hero: R3F canvas BG + nav + HUD + headline
```

---

## 4. ROUTING PATTERN

No React Router. Routing is a single `useState<PageId>` in `App.tsx`:

```tsx
export type PageId = 'home' | 'collections' | 'lookbook' | 'about'
```

- Pages receive a `navigate: (page: PageId) => void` prop
- `AnimatePresence mode="wait"` handles page transitions
- `pageVariants` from `src/lib/transitions.ts` applied to each page's root `<motion.div>`
- `PageId` type is imported from `App.tsx` throughout the codebase

---

## 5. TAILWIND V4 SETUP

No `tailwind.config.js`. All tokens live in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-mahogany: #150c05;   /* bg */
  --color-surface:  #1f1108;   /* card/section surfaces */
  --color-card:     #2d1a0a;   /* elevated cards */
  --color-gold:     #d4a017;   /* primary accent */
  --color-amber:    #c8731a;   /* secondary accent */
  --color-cream:    #f5e6c8;   /* body text */
  --color-muted:    #c9a96e;   /* secondary text */
  --font-display:   'Playfair Display', Georgia, serif;
  --font-body:      'Plus Jakarta Sans', sans-serif;
  --font-mono:      'Space Mono', monospace;
}
```

**Usage in JSX:** `bg-mahogany`, `text-gold`, `font-display`, `text-cream`, etc.

> **ABSOLUTE BANS:** NO pure black, NO pure white, NO purple/violet of any shade
> **BANNED FONTS:** Inter, Roboto, Arial, system-ui

---

## 6. DESIGN REFERENCE — PIXELVAULT.FIT AESTHETIC

The site is inspired by pixelvault.fit's terminal/sci-fi aesthetic adapted for luxury fashion:

| Element | Style |
|---|---|
| Logo | `[MONARCHSOUTH]` bracket-wrapped monospace |
| Text case | ALL CAPS in nav, HUD, labels |
| Font style | Monospace (`Space Mono`) for terminal UI elements |
| Status HUD | Live-updating terminal panel (session date, timestamp, etc.) |
| Decorators | `[X]` crosshairs, `---` dividers, `·` separators |
| Color | Dark mahogany + gold glow — no flat sections |
| Text effect | `TextScramble` component for glitch-resolve reveals |

---

## 7. CRITICAL ANIMATION RULES

### GSAP
1. Always use `useGSAP({ scope: ref })` — never `useEffect` — kills triggers on unmount
2. Never use CSS `transform` on GSAP-animated elements — GSAP overwrites it; use `top`/`left` instead
3. `will-change` only on actively animated elements, not globally
4. `pointer-events: none` on all Canvas/3D background elements

### Framer Motion
- `viewport={{ once: true }}` on ALL scroll animations — never re-trigger
- `stagger` on every section's children for cascade reveal
- Always add `-webkit-backdrop-filter` alongside `backdrop-filter`

---

## 8. SECTIONS ARCHITECTURE (Planned)

| # | Section | Key Elements |
|---|---|---|
| 1 | `MergedHero` | Nav + R3F canvas BG + terminal HUD + TextScramble headline |
| 2 | `Collections` | T-Shirts / Formal / Essentials — 3 TiltCards |
| 3 | `ProductShowcase` | 4-angle viewer: FRONT · BACK · SIDE · DETAIL |
| 4 | `BrandStory` | Craftsmanship features: material, fit, durability |
| 5 | `Metrics` | `10K+` customers · `100+` designs · `4.9★` · `48hr` delivery |
| 6 | `Testimonials` | Auto-scrolling marquee of glass-card reviews |
| 7 | `CTA` | Email signup + "Shop Now", mesh gradient BG |
| 8 | `Footer` | `[MONARCHSOUTH]` + 4-column links + social |

---

## 9. BRAND COPY

**T-Shirts:** The Icon Tee · The Atlas Tee · The Sovereign Tee
**Formal:** The Empire Blazer · The Throne Shirt · The Dynasty Trouser
**Marquee:** SUPIMA COTTON · MERINO WOOL · ITALIAN FABRIC · HAND STITCHED · ETHICAL SOURCING · MADE TO LAST

---

## 10. QUALITY CHECKLIST

- [ ] No black, white, or purple anywhere
- [ ] Hero has glow cursor + mouse spotlight
- [ ] Every section has MeshGradient or GlowBlob — no flat sections
- [ ] 3D canvas has bloom post-processing
- [ ] Noise/grain overlay at root level
- [ ] Hero H1 uses `clamp()` and gradient word in Playfair Display
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
