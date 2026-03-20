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
    uFogStrength: 1.0,
    uBrightness: 1.1,
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
    uniform float uFogStrength;
    uniform float uBrightness;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    #define PI 3.14159265359

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(.1031, .1030, .0973));
      p3 += dot(p3, p3.yxz + 19.19);
      return fract((p3.xxy + p3.yxx) * p3.zyx);
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise2(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = hash12(i + vec2(0.0, 0.0));
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float snoise(vec3 p) {
      float n1 = noise2(p.xy * 1.6);
      float n2 = noise2(p.yz * 1.6);
      float n3 = noise2(p.xz * 1.6);
      return (n1 + n2 + n3) / 3.0;
    }

    float de(vec3 p) {
      float n = snoise(p * 0.25 + vec3(iTime * 0.04)) - 0.5;
      return length(p) - 1.0 + n * 0.4;
    }

    vec3 getNormal(vec3 p) {
      float e = 0.03;
      return normalize(vec3(
        de(p + vec3(e, 0.0, 0.0)) - de(p - vec3(e, 0.0, 0.0)),
        de(p + vec3(0.0, e, 0.0)) - de(p - vec3(0.0, e, 0.0)),
        de(p + vec3(0.0, 0.0, e)) - de(p - vec3(0.0, 0.0, e))
      ));
    }

    float erf(float x) {
      float sign_x = sign(x);
      float t = 1.0 / (1.0 + 0.47047 * abs(x));
      float result = 1.0 - t * (0.3480242 + t * (-0.0958798 + t * 0.7478556)) * exp(-(x * x));
      return result * sign_x;
    }

    float getFog(vec3 start, vec3 dir, float dist) {
      const float a = 7.0;
      const float b = 1.0;
      const float c = 200.0;

      float d = dot(start, dir);

      float res = exp(b - a * dot(start, start));
      res *= erf(sqrt(a) * (d + dist)) - erf(sqrt(a) * d);
      res *= (0.5 / sqrt(a)) * sqrt(PI) * c;

      return res;
    }

    void main() {
      vec3 from = vec3(0.0, 0.0, -3.5);
      vec3 dir = normalize(vLocalPosition * uScale + vec3(0.0, 0.0, 1.0));

      float totdist = 0.0;

      for (int i = 0; i < 120; i++) {
        vec3 p = from + totdist * dir;
        float dist = de(p);
        if (dist < 0.001) break;
        totdist += min(dist * 0.25, 0.8);
      }

      vec3 p = from + totdist * dir;

      vec3 col = vec3(0.0);

      if (length(p) < 2.0) {
        vec3 n = getNormal(p);

        float base = snoise(p * 1.2 + vec3(iTime * 0.05));
        float grain = snoise(p * 3.0 - vec3(iTime * 0.04));

        vec3 darkCol = vec3(0.10, 0.14, 0.12);
        vec3 midCol  = vec3(0.58, 0.70, 0.56);
        vec3 highCol = vec3(0.88, 0.95, 0.78);

        col = mix(darkCol, midCol, smoothstep(0.2, 0.7, base));
        col = mix(col, highCol, smoothstep(0.6, 1.0, grain));

        vec3 light1 = normalize(vec3(7.0, 10.0, -3.0));
        vec3 light2 = normalize(vec3(-7.0, -4.0, 2.0));

        col *= (0.5 + 0.8 * max(0.0, dot(n, light1)));
        col += vec3(0.12, 0.22, 0.25) * max(0.0, dot(n, light2));
      } else {
        col = vec3(0.02);
      }

      float fog = getFog(from, dir, totdist) * uFogStrength;
      fog = 1.0 - exp(-fog);

      col = mix(col, vec3(0.55, 0.65, 0.7), fog);

      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(cameraPosition - vWorldPosition)), 0.0), 2.0);
      col += fresnel * vec3(0.06, 0.08, 0.06);

      col *= uBrightness;
      col = pow(col, vec3(1.0 / 2.2));

      col += (hash33(vec3(gl_FragCoord.xy, iTime)) - 0.5) * 0.02;

      float centerFade = smoothstep(1.3, 0.1, length(vLocalPosition));
      float alpha = mix(0.4, 0.9, centerFade) * uOpacity;

      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function FogParasiteMaterial({
  opacity = 0.78,
  scale = 1.2,
  fogStrength = 1.0,
  brightness = 1.1,
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
      uFogStrength={fogStrength}
      uBrightness={brightness}
    />
  );
}
