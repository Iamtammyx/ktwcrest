"use client";

import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DotField } from "./DotField";
import { WaveField } from "./WaveField";

/**
 * Fixed, full-viewport WebGL background that sits behind all content
 * (`-z-10`, `pointer-events-none` so the UI stays fully interactive).
 *
 * The scene lives in the root layout, so the canvas persists across client-side
 * navigation and only the *object* swaps — giving each area of the site a
 * distinct-but-cohesive backdrop:
 *   - Home ("/")        → interactive dot sphere (DotField)
 *   - Interior pages    → flowing dot-terrain (WaveField)
 *
 * Performance notes:
 *  - dpr is capped at 1.75 and each field animates in a single draw call,
 *    holding 60fps on standard laptops.
 *  - frameloop is "always" while visible (the fields animate continuously),
 *    "never" when the tab is hidden (saves battery), and "demand" under
 *    prefers-reduced-motion (renders a static frame, repainting only on theme
 *    change). The spec's `frameloop="demand"` is used for that reduced case;
 *    continuous motion requires "always".
 */
export function Scene() {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion() ?? false;
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Avoid rendering WebGL during SSR/first paint; the CSS mesh covers the gap.
  if (!mounted) return null;

  const dark = resolvedTheme === "dark";
  const isHome = pathname === "/";
  const frameloop: "always" | "demand" | "never" = hidden
    ? "never"
    : reduced
      ? "demand"
      : "always";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Soft scene lighting. Each field is lit in-shader; these also
            illuminate any lit geometry (e.g. a future GLTF model) added later. */}
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 4, 6]} intensity={40} color="#78a7ff" />
        <pointLight position={[-6, -3, 2]} intensity={22} color="#a06bff" />

        {isHome ? (
          <DotField dark={dark} reduced={reduced} />
        ) : (
          <WaveField dark={dark} reduced={reduced} />
        )}

        {/*
          FUTURE: drop a client-supplied hero model here, e.g.
            const { scene } = useGLTF("/models/ktw-robot.glb")
            <primitive object={scene} />
          Wrap in <Suspense> and preload with useGLTF.preload(url).
        */}
      </Canvas>
    </div>
  );
}
