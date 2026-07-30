"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

/**
 * DotField — an abstract mesh of ~7k points arranged on a sphere and
 * displaced by layered trig "noise" in a custom shader, echoing the blue/violet
 * dot-cloud reference art. Fully GPU-animated for performance.
 *
 * Interaction:
 *  - rotates toward the cursor (tracked on window so it works even though the
 *    canvas has pointer-events:none)
 *  - drifts with vertical scroll for a parallax feel
 *
 * Theme:
 *  - colors + opacity + blend mode lerp between the light and dark palettes,
 *    producing the "hue shift to complement the active theme" effect.
 */

const COUNT = 7000;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uAmp;
  uniform float uPixelRatio;
  uniform vec3 uLight;

  attribute float aScale;

  varying float vMix;
  varying float vFade;
  varying float vLight;

  float wave(vec3 p, float t) {
    return (sin(p.x * 2.0 + t) + sin(p.y * 2.3 + t * 1.15) + sin(p.z * 1.7 + t * 0.9)) / 3.0;
  }

  void main() {
    vec3 dir = normalize(position);

    float w  = wave(position * 1.4, uTime);
    float w2 = wave(position * 3.1 + 5.0, uTime * 1.3) * 0.35;
    float disp = (w + w2) * uAmp;

    vec3 pos = position + dir * disp;

    vMix = clamp(0.5 + position.y * 0.5 + disp * 0.6, 0.0, 1.0);

    // dynamic point-light term so the orbiting light actually shapes the cloud
    vec3 toLight = normalize(uLight - pos);
    vLight = clamp(dot(dir, toLight), 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / dist);
    vFade = smoothstep(6.8, 2.4, dist); // fade the far side for depth
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vMix;
  varying float vFade;
  varying float vLight;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.08, d);
    if (alpha <= 0.001) discard;

    vec3 col = mix(uColorA, uColorB, vMix);
    col *= (0.72 + vLight * 0.6);

    gl_FragColor = vec4(col, alpha * uOpacity * (0.32 + vFade * 0.68));
  }
`;

// deterministic RNG so the cloud looks identical on every load
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Palette = {
  a: THREE.Color;
  b: THREE.Color;
  opacity: number;
  blending: THREE.Blending;
};

function palette(dark: boolean): Palette {
  return dark
    ? {
        a: new THREE.Color("#3b6fff"),
        b: new THREE.Color("#a06bff"),
        opacity: 0.95,
        blending: THREE.AdditiveBlending, // glow on the dark cosmic bg
      }
    : {
        a: new THREE.Color("#6366f1"),
        b: new THREE.Color("#e668a6"),
        opacity: 0.6,
        blending: THREE.NormalBlending, // legible over the pastel mesh
      };
}

export function DotField({
  dark,
  reduced,
}: {
  dark: boolean;
  reduced: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { invalidate } = useThree();

  // cursor + scroll, tracked on window (canvas is pointer-events:none)
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const rand = mulberry32(20240730);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      const jitter = 1 + (rand() - 0.5) * 0.06;
      positions[i * 3] = Math.cos(theta) * radius * jitter;
      positions[i * 3 + 1] = y * jitter;
      positions[i * 3 + 2] = Math.sin(theta) * radius * jitter;
      scales[i] = 0.55 + rand() * 1.15;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return g;
  }, []);

  const uniforms = useMemo(() => {
    const p = palette(dark);
    return {
      uTime: { value: 0 },
      uSize: { value: 26 },
      uAmp: { value: 0.34 },
      uPixelRatio: {
        value:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.75)
            : 1,
      },
      uLight: { value: new THREE.Vector3(3, 2, 4) },
      uColorA: { value: p.a.clone() },
      uColorB: { value: p.b.clone() },
      uOpacity: { value: p.opacity },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );

  // targets the useFrame loop lerps toward (smooth theme cross-fade)
  const target = useRef(palette(dark));
  useEffect(() => {
    const p = palette(dark);
    target.current = p;
    material.blending = p.blending;
    material.needsUpdate = true;
    invalidate(); // repaint even when the loop is paused (reduced motion)
  }, [dark, material, invalidate]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    const u = material.uniforms;
    if (!reduced) u.uTime.value += delta * 0.5;

    // orbiting point light
    const t = u.uTime.value;
    (u.uLight.value as THREE.Vector3).set(
      Math.cos(t * 0.4) * 4,
      Math.sin(t * 0.3) * 3,
      3.5,
    );

    // cross-fade colors + opacity toward the active theme
    (u.uColorA.value as THREE.Color).lerp(target.current.a, 0.06);
    (u.uColorB.value as THREE.Color).lerp(target.current.b, 0.06);
    u.uOpacity.value += (target.current.opacity - u.uOpacity.value) * 0.06;

    const pts = pointsRef.current;
    if (pts) {
      // ease rotation toward the cursor + a slow idle spin
      const targetRotY = pointer.current.x * 0.5 + (reduced ? 0 : t * 0.06);
      const targetRotX = pointer.current.y * 0.3 + scroll.current * 0.25;
      pts.rotation.y += (targetRotY - pts.rotation.y) * 0.04;
      pts.rotation.x += (targetRotX - pts.rotation.x) * 0.04;
      // subtle parallax drift with scroll
      pts.position.y = -scroll.current * 0.4;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4.6]} fov={45} />
      <points
        ref={pointsRef}
        geometry={geometry}
        material={material}
        scale={1.9}
      />
    </>
  );
}
