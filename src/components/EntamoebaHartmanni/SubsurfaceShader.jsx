// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.82,
    uBlobScale: 1.0,
    uMotionSpeed: 0.45,
    uInnerGlow: 0.9,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    void main() {
      vec3 transformed = position;

      #include <morphtarget_vertex>

      vLocalPosition = transformed;
      vNormal = normalize(normalMatrix * normal);

      vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    uniform float uBlobScale;
    uniform float uMotionSpeed;
    uniform float uInnerGlow;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    #define PI 3.14159265

    const int Iterations = 7;
    const float Wavelength = 0.5;
    const float Scale = 1.5;
    const float Amplitude = 0.1;
    const float Speed = 0.3;

    const vec3 fore = vec3(170.0, 205.0, 170.0) / 255.0;
    const vec3 back = vec3(35.0, 48.0, 40.0) / 255.0;
    const vec3 innards = vec3(220.0, 245.0, 205.0) / 255.0;
    const float detail = 0.04;

    const vec3 lightdir = -vec3(-1.0, 0.5, -0.5);

    vec3 z;

    mat2 rot2D(float angle) {
      float a = radians(angle);
      return mat2(cos(a), sin(a), -sin(a), cos(a));
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float rnd(vec2 co) {
      return fract(sin(iTime * 0.1 + dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float de(vec3 pos) {
      float time = iTime * uMotionSpeed;
      z = pos;

      // Stretch the jelly field so it feels more trophozoite-like than spherical
      z.x *= 1.12;
      z.y *= 0.92;
      z.z *= 0.78;

      // Amoebic directional drift
      z.x += sin(time * 1.7 + z.y * 0.8) * 0.18;
      z.y += cos(time * 1.25 + z.x * 0.65) * 0.14;
      z.z += sin(time * 1.45 + z.x * 0.55 + z.y * 0.35) * 0.11;

      float O = 7.0;
      float sc = 1.0;
      float tsc = pow(Scale, float(Iterations));
      float t = time * Speed * 10.0 / tsc + 100.0;
      float amp1 = Amplitude;
      float amp2 = amp1 * 1.1256;
      float amp3 = amp1 * 1.0586;
      float amp4 = amp1 * 0.9565;

      float l1 = length(z.xy - vec2(O * 1.1586, 0.0));
      float l2 = length(z.xy + vec2(O * 0.98586, 0.0));
      float l3 = length(z.xy + vec2(0.0, O * 1.13685));
      float l4 = length(z.xy - vec2(0.0, O));

      for (int n = 0; n < Iterations; n++) {
        z += sin(length(z.xy) * sc * Wavelength - t) * amp1 / sc * 2.0;
        z += sin(l1 * sc * Wavelength - t) * amp1 / sc;
        z += sin(l2 * sc * Wavelength - t) * amp2 / sc;
        z += sin(l3 * sc * Wavelength - t) * amp3 / sc;
        z += sin(l4 * sc * Wavelength - t) * amp4 / sc;
        t = t * Scale * Scale;
        sc *= Scale;
      }

      // Amoebic protrusion / pseudopod bias
      float protrusion = sin(pos.x * 1.4 + time * 1.8) * 0.22;
      float sideBulge = cos(pos.y * 1.6 - time * 1.2) * 0.18;

      vec3 q = z;
      q.x *= 0.92 + protrusion * 0.08;
      q.y *= 1.05 + sideBulge * 0.05;
      q.z *= 0.72;

      return length(q) - 6.0;
    }

    vec3 normalFn(vec3 p) {
      vec3 e = vec3(0.0, detail, 0.0);
      return normalize(vec3(
        de(p + e.yxx) - de(p - e.yxx),
        de(p + e.xyx) - de(p - e.xyx),
        de(p + e.xxy) - de(p - e.xxy)
      ));
    }

    float kaliset(vec3 p) {
      p.x += 0.23;
      p.z += 0.18;
      p *= 0.5;
      p.y += iTime * 0.9;
      p.y = abs(2.0 - mod(p.y, 4.0));
      for (int i = 0; i < 6; i++) {
        p = abs(p) / dot(p, p) - 0.8;
      }
      return p.y;
    }

    vec3 lightFn(vec3 p, vec3 dir) {
      vec3 ldir = normalize(lightdir);
      vec3 n = normalFn(p);
      float diff = max(0.0, dot(ldir, -n));
      vec3 r = reflect(ldir, n);
      float spec = max(0.0, dot(dir, -r));

      // parasite-like palette
      vec3 shellCol = vec3(0.58, 0.74, 0.58);
      vec3 midCol = vec3(0.68, 0.83, 0.64);

      return diff * shellCol + pow(spec, 32.0) * 0.25 + midCol * 0.18 + back * 0.25;
    }

    vec3 raymarch(vec3 from, vec3 dir) {
      vec3 odir = dir;
      float totdist = 0.0;
      float v = 0.0;
      vec3 col = vec3(0.0);
      vec3 p = vec3(0.0);
      float d = 9999.0;

      for (int i = 0; i < 80; i++) {
        if (d > detail && totdist < 50.0) {
          p = from + totdist * dir;
          d = de(p);
          totdist += d * 0.8;
          v += 1.0;

          dir = normalize(
            odir +
            pow(max(0.0, totdist * totdist - 9.0), 2.0) *
            0.0000003 *
            vec3(
              rnd(dir.xy * 5.21358),
              rnd(dir.yz * 3.12568),
              rnd(dir.zx * 2.12358)
            )
          );
        }
      }

      totdist = min(50.0, totdist);
      dir = normalize(
        odir + 0.1 *
        vec3(
          rnd(dir.xy * 5.21358),
          rnd(dir.yz * 3.12568),
          rnd(dir.zx * 2.12358)
        )
      );

      vec3 backg = back * (1.0 + pow(1.0 - dot(normalize(90.0 * dir), normalize(lightdir)), 2.5));

      if (d < detail) {
        float k = kaliset(p * 0.42);

        // inner granules / organelle suggestion
        float granules =
          smoothstep(0.15, 0.9, sin(p.x * 4.5 + iTime * 1.3) * 0.5 + 0.5) *
          smoothstep(0.1, 0.95, cos(p.y * 5.0 - iTime * 1.1) * 0.5 + 0.5);

        vec3 cytoplasmCol = lightFn(p - detail * dir, dir);
        vec3 granularTint = mix(vec3(0.70, 0.80, 0.64), innards, granules * 0.35);

        col = cytoplasmCol + k * 0.045 * granularTint;
        col += granules * 0.06 * vec3(0.82, 0.92, 0.76);
      } else {
        col = backg + v * 0.01 * pow(1.0 - dot(normalize(90.0 * dir), normalize(lightdir)), 2.5);
      }

      col = mix(col * 1.15, backg, 1.0 - exp(-0.0045 * totdist * totdist));
      return col;
    }

    void main() {
      vec3 p = vLocalPosition * (uBlobScale * 1.35);

      // camera aligned to local body space so the effect stays inside the trophozoite
      vec3 from = vec3(0.4, 0.0, -7.2);
      vec3 dir = normalize(vec3(p.xy * 0.72, 1.0));

      float time = iTime * 0.5 * uMotionSpeed;

      mat2 camrot1 = rot2D(32.0);
      mat2 camrot2 = rot2D(175.0 + sin(time * 0.5) * 20.0);
      mat2 camrot3 = rot2D(sin(time) * 8.0);

      from.xz = from.xz * camrot1;
      dir.xz = dir.xz * camrot1;
      from.xy = from.xy * camrot2;
      dir.xy = dir.xy * camrot2;
      dir.yz = dir.yz * camrot3;

      vec3 col = raymarch(from, dir);

      // make it biologically plausible for trophozoite cytoplasm
      vec3 parasiteBase = vec3(0.62, 0.80, 0.60);
      vec3 parasiteHigh = vec3(0.84, 0.93, 0.78);
      float localDensity = smoothstep(1.25, 0.05, length(vLocalPosition));

      col = mix(parasiteBase * 0.45, col, 0.82);
      col = mix(col, parasiteHigh, smoothstep(0.45, 1.0, length(col) * 0.6));

      float fresnel = pow(
        1.0 - max(dot(normalize(vNormal), normalize(cameraPosition - vWorldPosition)), 0.0),
        2.2
      );

      // soft membrane-edge glow
      col += vec3(0.05, 0.10, 0.07) * fresnel * uInnerGlow;

      // slightly denser center, softer edges
      col *= 0.78 + 0.35 * localDensity;

      float alpha = clamp(0.28 + length(col) * 0.42 + localDensity * 0.18, 0.0, 1.0) * uOpacity;

      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function SubSurfaceParasiteMaterial({
  opacity = 0.82,
  blobScale = 1.0,
  motionSpeed = 0.45,
  innerGlow = 0.9,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.iTime = state.clock.elapsedTime;
    }
  });

  return (
    <parasiteCytoplasmMaterialImpl
      ref={ref}
      key={ParasiteCytoplasmMaterialImpl.key}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      uOpacity={opacity}
      uBlobScale={blobScale}
      uMotionSpeed={motionSpeed}
      uInnerGlow={innerGlow}
    />
  );
}
