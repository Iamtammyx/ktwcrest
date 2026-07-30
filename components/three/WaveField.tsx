"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

/**
 * WaveField — a flowing dot-terrain (a grid of ~15k points displaced by
 * layered traveling waves in a custom shader), echoing the blue dot-landscape
 * reference art. Used as the interior-page background so the site feels alive
 * and each page reads distinctly while staying in the same visual language.
 *
 * It owns its own camera (elevated, looking across the terrain toward a
 * horizon) and reacts subtly to the cursor.
 */

const COLS = 170;
const ROWS = 120;
const WIDTH = 34;
const DEPTH = 28;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uAmp;
  uniform float uPixelRatio;

  attribute float aScale;

  varying float vH;
  varying float vFade;

  float terrain(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.x * 0.6 + t * 0.8) * 0.6;
    h += sin(p.y * 0.5 - t * 0.6) * 0.6;
    h += sin((p.x + p.y) * 0.35 + t * 0.5) * 0.4;
    h += sin((p.x * 0.9 - p.y * 0.7) + t * 0.9) * 0.25;
    return h;
  }

  void main() {
    vec3 pos = position;
    float h = terrain(position.xz, uTime);
    pos.y += h * uAmp;
    vH = h;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / dist);
    vFade = smoothstep(34.0, 3.0, dist); // fade toward the horizon
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vH;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.08, d);
    if (alpha <= 0.001) discard;

    vec3 col = mix(uColorA, uColorB, clamp(vH * 0.5 + 0.5, 0.0, 1.0));
    col *= (0.8 + vFade * 0.6);

    gl_FragColor = vec4(col, alpha * uOpacity * (0.4 + vFade * 0.6));
  }
`;

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
        a: new THREE.Color("#1e5fce"),
        b: new THREE.Color("#5fe0ff"),
        opacity: 1.15,
        blending: THREE.AdditiveBlending,
      }
    : {
        a: new THREE.Color("#6366f1"),
        b: new THREE.Color("#38bdf8"),
        opacity: 0.55,
        blending: THREE.NormalBlending,
      };
}

export function WaveField({
  dark,
  reduced,
}: {
  dark: boolean;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const { invalidate } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3);
    const scales = new Float32Array(COLS * ROWS);
    const rand = mulberry32(4242);
    let idx = 0;
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        positions[idx * 3] = (i / (COLS - 1) - 0.5) * WIDTH;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (j / (ROWS - 1) - 0.5) * DEPTH;
        scales[idx] = 0.6 + rand() * 1.0;
        idx++;
      }
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
      uSize: { value: 22 },
      uAmp: { value: 1.3 },
      uPixelRatio: {
        value:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.75)
            : 1,
      },
      uColorA: { value: p.a.clone() },
      uColorB: { value: p.b.clone() },
      uOpacity: { value: 0 }, // fade in
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

  const target = useRef(palette(dark));
  useEffect(() => {
    const p = palette(dark);
    target.current = p;
    material.blending = p.blending;
    material.needsUpdate = true;
    invalidate();
  }, [dark, material, invalidate]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useEffect(() => {
    camRef.current?.lookAt(0, 2.4, -16);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    const u = material.uniforms;
    if (!reduced) u.uTime.value += delta * 0.6;

    (u.uColorA.value as THREE.Color).lerp(target.current.a, 0.06);
    (u.uColorB.value as THREE.Color).lerp(target.current.b, 0.06);
    u.uOpacity.value += (target.current.opacity - u.uOpacity.value) * 0.1;

    const g = groupRef.current;
    if (g) {
      // gentle cursor parallax
      const ty = pointer.current.x * 0.12;
      const tx = pointer.current.y * 0.05;
      g.rotation.y += (ty - g.rotation.y) * 0.03;
      g.rotation.x += (tx - g.rotation.x) * 0.03;
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={camRef}
        makeDefault
        position={[0, 0.6, 6.5]}
        fov={60}
      />
      <group ref={groupRef} position={[0, -1.4, 0]}>
        <points geometry={geometry} material={material} />
      </group>
    </>
  );
}
