# Inimitable Tech

**Founder-led digital studio for distinctive, high-performance business websites.**

> Strategy, design and development — engineered into one clear, fast and memorable digital presence.

🔗 **Live Site:** [ps-15.github.io/inimitable-tech](https://ps-15.github.io/inimitable-tech/)

---

## What's Inside

A single-page landing experience built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies. Every effect is hand-coded.

---

## Features

### Loading Screen (Lando Norris-inspired)
- **Split text reveal** — each character of "INIMITABLE" animates in with a staggered wave
- **Procedural typewriter clicks** via Web Audio API (one per character)
- **Deep bass sweep** on preloader start
- **Progress bar** with real-time percentage counter
- **Ambient pad** (sine wave chord) during progress fill
- **Two-note chime** on completion
- **Noise whoosh** at curtain reveal
- **Curtain wipe** transition (CSS clip-path) revealing main content
- **Sound toggle** button (top-left corner)
- Grid background texture + Swiss Design corner marks

### Robot Face Reveal (Lando Norris hover effect)
- **Base layer:** grayscale robot face with scanline overlay + circuit board canvas
- **Reveal layer:** real portrait revealed through a **circular mask following the cursor**
- Smooth lerp interpolation (0.12 factor) for buttery cursor tracking
- **Glowing cursor ring** with crosshair and double border
- **Corner bracket** decorations
- **Scanning sound** (sawtooth oscillator + LFO modulation) on hover
- Status label: "HOVER TO REVEAL"

### Hero Section
- **Swiss Design grid overlay** (subtle accent-colored lines)
- **Wabi Sabi morphing blob** (CSS border-radius animation, 20s cycle)
- **Glitch text effect** on outline heading (RGB split + clip-path animation)
- **Periodic glitch sound** (digital square-wave burst every 3.2s)
- **CSS floating particles** (20 randomized with varying speed, delay, and drift)
- **Parallax scroll** on title, portrait, and tags
- **Text scramble** effect on accent headings (character-by-character decode)

### Custom Cursor
- **Dot + ring** with mix-blend-mode difference
- **Lerp smoothing** (0.15 factor) for fluid motion
- **Hover labels** — shows contextual text ("view", "explore", "open", "go", "read")
- **Click state** ring collapse animation

### Work Section
- **3D perspective tilt** on project card (6° max rotation)
- **Shine/light sweep** overlay following mouse position
- **Image distortion slice** sweep with **rising bandpass sound**
- **Inspector tabs** (Direction / Experience / Build) with smooth panel switching
- **Staggered reveal** on scroll

### Capabilities Section
- **Animated number counters** — count from 00 to target on scroll-in
- **Counter tick sound** (micro sine click per increment)
- **Fill-up hover** — accent color rises from bottom (0.6s ease)
- **Mouse spotlight** — radial gradient follows cursor with **filtered noise ambient**
- Decorative orbital circles (nested box-shadows)

### Method Section
- **Sticky sidebar** that stays in view while scrolling through steps
- **Step-line decorations** with accent-colored endpoints
- **Section swell sound** (deep sine pad) when scrolling into view

### About Section
- **Editorial layout** — asymmetric two-column grid
- **Signature block** with accent-colored initials

### Coming Soon Section
- **Diagram nodes** (circle + square with rotation)
- **Accent border** on status indicator

### Contact Section
- **Orbital decoration** rings (CSS box-shadows)
- **CTA pop sound** (ascending sine blip) on button hover
- **Pulse ring** animation on buttons

### General Effects
- **Film grain overlay** — animated SVG noise texture (6-frame steps)
- **Mesh gradient background** — 4 animated blobs following cursor
- **Magnetic buttons** — follow mouse with 0.12/0.14 factor
- **Smooth anchor scrolling** (reduced-motion aware)
- **Nav auto-hide** on scroll down, show on scroll up
- **Reveal on scroll** — IntersectionObserver with 0.08 threshold

---

## Design System

### 60-30-10 Color Rule
| Role | Dark Theme | Light Theme |
|------|-----------|-------------|
| **60% Dominant** | `#0c0c0c` (deep warm black) | `#f5f2eb` (warm parchment) |
| **30% Secondary** | `#1c1a17` (warm charcoal) | `#e2ddd3` (warm stone) |
| **10% Accent** | `#d4ff00` (electric chartreuse) | `#0a6e3a` (deep forest) |

### Typography
| Role | Font |
|------|------|
| Display headings | Space Grotesk (800 weight) |
| Monospace labels | Space Mono (700 weight) |
| Body text | Inter (400 weight) |

### Design Style Blends
- **Swiss Design** — clean grid system, typographic focus, grid overlays
- **Brutalism / Neo-Brutalism** — bold raw edges, 2px accent borders, high contrast
- **Editorial Design** — magazine-like asymmetric layouts
- **Luxury Typography** — premium font pairing, generous spacing
- **Dark Mode UI** — deep backgrounds with light foreground
- **Wabi Sabi** — organic morphing shapes, embracing imperfection

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 (custom properties, @property, clip-path, mask) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Audio | Web Audio API (procedural, zero external files) |
| Animation | CSS keyframes + requestAnimationFrame |
| Rendering | Canvas 2D (circuit patterns, mesh gradient) |
| Fonts | Google Fonts (Space Grotesk, Space Mono, Inter) |

### No External Dependencies
- No React, Vue, or Angular
- No GSAP, Three.js, or animation libraries
- No Tailwind, Bootstrap, or CSS frameworks
- No npm packages
- Pure vanilla — loads fast, zero bundle

---

## Accessibility

- **Skip link** for keyboard navigation
- **Semantic HTML** — proper headings, landmarks, ARIA attributes
- **prefers-reduced-motion** — all animations and sounds disabled
- **Focus-visible** outlines on interactive elements
- **Sound toggle** — users can mute all audio
- **Mobile menu** — trapped focus, Escape to close

---

## Performance

- **No build step** — files served as-is
- **Preloaded critical assets** (portrait image)
- **Lazy loading** on below-fold images
- **Passive event listeners** for scroll/pointer events
- **requestAnimationFrame** for all animations (no layout thrashing)
- **IntersectionObserver** for scroll-triggered effects (no scroll listeners)
- **Device pixel ratio capping** at 1.5x for canvas

---

## File Structure

```
inimitable-tech/
├── index.html          # Main landing page (semantic HTML)
├── styles.css          # All styles (~2000 lines)
├── app.js              # All interactivity (~870 lines)
├── sahil-portrait-blue-v4.webp  # Portrait image
├── og.png              # Open Graph social card
├── 404.html            # Custom 404 page
├── .nojekyll           # GitHub Pages config
└── README.md           # This file
```

---

## Running Locally

```bash
git clone https://github.com/PS-15/inimitable-tech.git
cd inimitable-tech
# Open index.html in any browser — no server needed
```

---

## Credits

- **Sahil Kanojiya** — Founder / Creative Developer
- **Design inspiration** — Lando Norris website (OFF+BRAND), ThreeUI (Meng To), Awwwards editorial sites
- **Audio** — All procedurally generated via Web Audio API

---

## License

© 2026 Inimitable Tech. All rights reserved.
