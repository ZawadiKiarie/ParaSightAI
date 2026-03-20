// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.78,
    uScale: 1.2,
    uGlowStrength: 1.0,
    uNoiseScale: 1.0,
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
    uniform float uScale;
    uniform float uGlowStrength;
    uniform float uNoiseScale;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    vec3 rotateY(vec3 v, float t) {
      float cost = cos(t);
      float sint = sin(t);
      return vec3(
        v.x * cost + v.z * sint,
        v.y,
        -v.x * sint + v.z * cost
      );
    }

    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float sample2DNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = hash12(i + vec2(0.0, 0.0));
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float noise(vec3 p) {
      float t = iTime;
      vec3 np = normalize(p);

      vec2 uvA = t / 20.0 + np.xy * (2.6 * uNoiseScale);
      vec2 uvB = t / 20.0 + 0.77 + np.yz * (2.6 * uNoiseScale);

      float a = sample2DNoise(uvA);
      float b = sample2DNoise(uvB);

      a = mix(a, 0.5, abs(np.x));
      b = mix(b, 0.5, abs(np.z));

      float n = a + b - 0.4;
      n = mix(n, 0.5, abs(np.y) / 2.0);

      return n;
    }

    float mapShape(vec3 p) {
      float d = (-1.0 * length(p) + 3.0) + 1.5 * noise(p);
      d = min(d, (length(p) - 1.5) + 1.5 * noise(p));

      float m = 1.5;
      float s = 0.03;

      d = smin(d, max(abs(p.x) - s, abs(p.y + p.z * 0.2) - 0.07), m);
      d = smin(d, max(abs(p.z) - s, abs(p.x + p.y / 2.0) - 0.07), m);
      d = smin(d, max(abs(p.z - p.y * 0.4) - s, abs(p.x - p.y * 0.2) - 0.07), m);
      d = smin(d, max(abs(p.z * 0.2 - p.y) - s, abs(p.x + p.z) - 0.07), m);
      d = smin(d, max(abs(p.z * -0.2 + p.y) - s, abs(-p.x + p.z) - 0.07), m);

      return d;
    }

    void main() {
      vec3 ray = normalize(vLocalPosition * uScale + vec3(0.0, 0.0, 1.0));

      vec3 color = vec3(0.0);
      const int rayCount = 160;
      float t = 0.0;

      for (int r = 1; r <= rayCount; r++) {
        vec3 p = vec3(0.0, 0.0, -3.0) + ray * t;

        p = rotateY(p, iTime / 3.0);

        float mask = max(0.0, (1.0 - length(p / 3.0)));
        p = rotateY(p, mask * sin(iTime / 2.0) * 1.2);
        p.y += sin(iTime + p.x) * mask * 0.5;
        p *= 1.1 + (sin(iTime / 2.0) * mask * 0.3);

        float d = mapShape(p);

        if (d < 0.01 || r == rayCount) {
          float iter = float(r) / float(rayCount);
          float ao = (1.0 - iter);
          ao *= ao;
          ao = 1.0 - ao;

          float innerMask = max(0.0, (1.0 - length(p / 2.0)));
          innerMask *= abs(sin(iTime * -1.5 + length(p) + p.x) - 0.2);

          color += 2.0 * vec3(0.10, 0.70, 0.58) * max(0.0, (noise(p) * 4.0 - 2.6)) * innerMask * uGlowStrength;
          color += vec3(0.15, 0.48, 0.42) * ao * 3.8;
          color += vec3(0.18, 0.23, 0.16) * (t / 8.0);

          color *= 1.55;
          color -= 0.08;
          break;
        }

        t += d * 0.5;
      }

      float shellFade = smoothstep(1.35, 0.05, length(vLocalPosition));
      color *= (0.78 + 0.36 * shellFade);

      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.1);

      color += vec3(0.04, 0.09, 0.07) * fresnel;

      vec2 uv = gl_FragCoord.xy / vec2(1920.0, 1080.0);
      uv *= 1.0 - uv.yx;
      float vig = uv.x * uv.y * 20.0;
      vig = pow(max(vig, 0.0), 0.25);
      color *= mix(0.82, 1.0, vig);

      color.y *= 0.88;
      color.x *= 0.92;

      float density = clamp(length(color) * 0.35 + shellFade * 0.25, 0.0, 1.0);
      float alpha = mix(0.38, 0.88, density) * uOpacity;

      gl_FragColor = vec4(color, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function AlienParasiteMaterial({
  opacity = 0.78,
  scale = 1.2,
  glowStrength = 1.0,
  noiseScale = 1.0,
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
      uScale={scale}
      uGlowStrength={glowStrength}
      uNoiseScale={noiseScale}
    />
  );
}
