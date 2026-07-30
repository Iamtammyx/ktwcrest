# KTW Crest — Consulting Website

A premium, minimalist marketing site for **KTW Crest** ("Strategy-led technology. Built to perform."), built with glassmorphism, light/dark theming, and an interactive WebGL background.

Copy and structure are lifted from the original `reference/KTW Crest Home (standalone).html`; the light theme takes its bright-pastel visual cues from the KidsGPT screenshots.

## Stack

| Concern    | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19              |
| Language   | TypeScript                                      |
| Styling    | Tailwind CSS v4 (+ `clsx` / `tailwind-merge`)   |
| Theming    | `next-themes` (class strategy, persisted)       |
| Animation  | Framer Motion (scroll reveal + page transitions)|
| 3D         | `@react-three/fiber` + `@react-three/drei` + `three` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (typecheck + lint + static export)
```

## Project structure

```
app/
  layout.tsx        Fonts, ThemeProvider, fixed 3D Scene, grain overlay, metadata
  page.tsx          Section composition
  globals.css       Tailwind v4 tokens, dark variant, theme-aware gradient mesh
components/
  three/
    Scene.tsx       Fixed WebGL canvas (mount-guarded, frameloop-managed)
    DotField.tsx    Custom-shader particle sphere (mouse + scroll interactive)
  ui/               GlassCard, Button, ThemeToggle, Reveal, Icon, Logo, SectionHeading
  layout/           Navbar (sticky/blur, mobile menu), Footer
  sections/         Hero, Services, Problems, Process, Expertise, Contact
lib/
  content.ts        All site copy/data, typed
  utils.ts          cn() class merger
```

## Key implementation notes

### 3D background (`components/three/`)

- A ~7,000-point sphere is displaced by layered trig "noise" entirely in a
  **custom GLSL shader** (one draw call) for smooth 60fps motion.
- It **rotates toward the cursor** (tracked on `window`, since the canvas is
  `pointer-events:none`) and **drifts with scroll** for parallax.
- Colors, opacity and blend mode **cross-fade between themes** — additive blue/
  violet glow on the dark cosmic background, softer indigo/pink over the pastel
  light mesh.
- A dynamic in-shader point light shapes the cloud; `<ambientLight>` /
  `<pointLight>` are also present for any lit geometry added later. A commented
  slot in `Scene.tsx` shows where a client-supplied `.glb` (e.g. the robot hero
  model) would load via `useGLTF`.
- **Performance:** dpr is capped at 1.75; `frameloop` is `"always"` while
  visible, `"never"` when the tab is hidden, and `"demand"` under
  `prefers-reduced-motion` (renders a static frame, repainting only on theme
  change).

### Theming

`next-themes` toggles a `.dark` class on `<html>`. Tailwind v4 reads it via a
`@custom-variant` in `globals.css`, and the page background is a theme-aware
CSS `--mesh` gradient that transitions smoothly on toggle.

### Glassmorphism

`<GlassCard>` is the reusable frosted surface — translucent white + indigo
shadow in light mode, translucent navy + blue glow in dark mode, with a
top-edge sheen and optional `interactive` hover lift.

## Notes

- The contact form runs in **demo mode** (client-side validation only, no data
  is transmitted). Wire the `onSubmit` in `components/sections/Contact.tsx` to a
  secure server endpoint for production.
- Product-screenshot frames are intentional placeholders — drop KTW Crest
  exports in where marked.
