"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * ParticleText — renders a word as a cloud of floating dots that share the
 * site's particle language. The glyphs are sampled from an offscreen 2D canvas,
 * then each point drifts in 3D (a gentle per-point wave) so the word "floats"
 * like the background field.
 *
 * It is billboarded to face the active camera every frame, so it stays readable
 * on interior pages regardless of the wave-field camera angle, and draws on top
 * of the field (depthTest off + high renderOrder) — i.e. *above* the floating
 * background, not replacing it.
 */

const DIST = 7; // distance in front of the camera
const OFFSET_Y = 0.45; // nudge up so it sits behind the page header

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uAmp;
  uniform float uPixelRatio;

  attribute float aRand;
  varying float vR;

  void main() {
    vec3 pos = position;
    float ph = aRand * 6.2831853;
    pos.z += sin(uTime * 1.05 + ph + position.x * 1.4) * uAmp;
    pos.y += sin(uTime * 0.8 + ph) * uAmp * 0.16;
    pos.x += cos(uTime * 0.7 + ph) * uAmp * 0.1;
    vR = aRand;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vR;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.1, d);
    if (alpha <= 0.001) discard;
    vec3 col = mix(uColorA, uColorB, vR);
    gl_FragColor = vec4(col, alpha * uOpacity);
  }
`;

type Palette = {
  a: THREE.Color;
  b: THREE.Color;
  opacity: number;
  blending: THREE.Blending;
};

function palette(dark: boolean): Palette {
  return dark
    ? {
        a: new THREE.Color("#5b82ff"),
        b: new THREE.Color("#7fe0ff"),
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      }
    : {
        a: new THREE.Color("#6366f1"),
        b: new THREE.Color("#8b5cf6"),
        opacity: 0.32,
        blending: THREE.NormalBlending,
      };
}

function buildGeometry(text: string) {
  const W = 1200;
  const H = 300;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const positions: number[] = [];
  const rands: number[] = [];

  if (ctx) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '600 170px Georgia, "Times New Roman", serif';
    ctx.fillText(text, W / 2, H / 2 + 6);

    const data = ctx.getImageData(0, 0, W, H).data;
    const step = 4;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) {
          const jx = (Math.random() - 0.5) * step;
          const jy = (Math.random() - 0.5) * step;
          // normalise by height so the glyphs are ~1 unit tall
          positions.push(
            (x + jx - W / 2) / H,
            -(y + jy - H / 2) / H,
            (Math.random() - 0.5) * 0.12,
          );
          rands.push(Math.random());
        }
      }
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("aRand", new THREE.Float32BufferAttribute(rands, 1));
  return g;
}

export function ParticleText({
  text,
  dark,
  reduced,
}: {
  text: string;
  dark: boolean;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => buildGeometry(text), [text]);

  const uniforms = useMemo(() => {
    const p = palette(dark);
    return {
      uTime: { value: 0 },
      uSize: { value: 30 },
      uAmp: { value: 0.06 },
      uPixelRatio: {
        value:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.75)
            : 1,
      },
      uColorA: { value: p.a.clone() },
      uColorB: { value: p.b.clone() },
      uOpacity: { value: p.opacity },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false, // always draw above the field
      blending: THREE.AdditiveBlending,
    });
    return m;
  }, [uniforms]);

  const target = useRef(palette(dark));
  useEffect(() => {
    const p = palette(dark);
    target.current = p;
    material.blending = p.blending;
    material.needsUpdate = true;
  }, [dark, material]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  const fwd = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const u = material.uniforms;
    if (!reduced) u.uTime.value += delta;

    (u.uColorA.value as THREE.Color).lerp(target.current.a, 0.06);
    (u.uColorB.value as THREE.Color).lerp(target.current.b, 0.06);
    u.uOpacity.value += (target.current.opacity - u.uOpacity.value) * 0.05;

    // Billboard: sit a fixed distance in front of the active camera, facing it.
    const g = groupRef.current;
    if (g) {
      const cam = state.camera;
      cam.getWorldDirection(fwd);
      g.position.copy(cam.position).addScaledVector(fwd, DIST);
      g.quaternion.copy(cam.quaternion);
      // offsets in view space (+ gentle cursor parallax)
      g.translateY(OFFSET_Y - pointer.current.y * 0.12);
      g.translateX(pointer.current.x * 0.18);
    }
  });

  return (
    <group ref={groupRef}>
      <points
        ref={pointsRef}
        geometry={geometry}
        material={material}
        renderOrder={10}
        scale={2.3}
      />
    </group>
  );
}
