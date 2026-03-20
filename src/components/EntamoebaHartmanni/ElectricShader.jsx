// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.72,
    uScale: 1.35,
    uBrightness: 1.1,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    uniform float iTime;

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
    uniform float uBrightness;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    #define NUM_RAYS 13.0
    #define VOLUMETRIC_STEPS 19
    #define MAX_ITER 35
    #define FAR 6.0
    #define time (iTime * 1.1)

    mat2 mm2(in float a) {
      float c = cos(a), s = sin(a);
      return mat2(c, -s, s, c);
    }

    float hash(float n) {
      return fract(sin(n) * 43758.5453);
    }

    float hash13(vec3 p) {
      p = fract(p * 0.1031);
      p += dot(p, p.yzx + 33.33);
      return fract((p.x + p.y) * p.z);
    }

    float noise(in vec3 p) {
      vec3 ip = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float n000 = hash13(ip + vec3(0.0, 0.0, 0.0));
      float n100 = hash13(ip + vec3(1.0, 0.0, 0.0));
      float n010 = hash13(ip + vec3(0.0, 1.0, 0.0));
      float n110 = hash13(ip + vec3(1.0, 1.0, 0.0));
      float n001 = hash13(ip + vec3(0.0, 0.0, 1.0));
      float n101 = hash13(ip + vec3(1.0, 0.0, 1.0));
      float n011 = hash13(ip + vec3(0.0, 1.0, 1.0));
      float n111 = hash13(ip + vec3(1.0, 1.0, 1.0));

      float nx00 = mix(n000, n100, f.x);
      float nx10 = mix(n010, n110, f.x);
      float nx01 = mix(n001, n101, f.x);
      float nx11 = mix(n011, n111, f.x);

      float nxy0 = mix(nx00, nx10, f.y);
      float nxy1 = mix(nx01, nx11, f.y);

      return mix(nxy0, nxy1, f.z);
    }

    mat3 m3 = mat3(
       0.00,  0.80,  0.60,
      -0.80,  0.36, -0.48,
      -0.60, -0.48,  0.64
    );

    float flow(in vec3 p, in float t) {
      float z = 2.0;
      float rz = 0.0;
      vec3 bp = p;

      for (float i = 1.0; i < 5.0; i++) {
        p += time * 0.1;
        rz += (sin(noise(p + t * 0.8) * 6.0) * 0.5 + 0.5) / z;
        p = mix(bp, p, 0.6);
        z *= 2.0;
        p *= 2.01;
        p *= m3;
      }

      return rz;
    }

    float sins(in float x) {
      float rz = 0.0;
      float z = 2.0;

      for (float i = 0.0; i < 3.0; i++) {
        rz += abs(fract(x * 1.4) - 0.5) / z;
        x *= 1.3;
        z *= 1.15;
        x -= time * 0.65 * z;
      }

      return rz;
    }

    float segm(vec3 p, vec3 a, vec3 b) {
      vec3 pa = p - a;
      vec3 ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return length(pa - ba * h) * 0.5;
    }

    vec3 path(in float i, in float d) {
      vec3 en = vec3(0.0, 0.0, 1.0);
      float sns2 = sins(d + i * 0.5) * 0.22;
      float sns = sins(d + i * 0.6) * 0.21;
      en.xz *= mm2((hash(i * 10.569) - 0.5) * 6.2 + sns2);
      en.xy *= mm2((hash(i * 4.732) - 0.5) * 6.2 + sns);
      return en;
    }

    vec2 mapField(vec3 p, float i) {
      float lp = length(p);
      vec3 bg = vec3(0.0);
      vec3 en = path(i, lp);

      float ins = smoothstep(0.11, 0.46, lp);
      float outs = 0.15 + smoothstep(0.0, 0.15, abs(lp - 1.0));
      p *= ins * outs;
      float id = ins * outs;

      float rz = segm(p, bg, en) - 0.011;
      return vec2(rz, id);
    }

    float march(vec3 ro, vec3 rd, float startf, float maxd, float j) {
      float precis = 0.001;
      float h = 0.5;
      float d = startf;

      for (int i = 0; i < MAX_ITER; i++) {
        if (abs(h) < precis || d > maxd) break;
        d += h * 1.2;
        float res = mapField(ro + rd * d, j).x;
        h = res;
      }

      return d;
    }

    vec3 vmarch(vec3 ro, vec3 rd, float j, vec3 orig) {
      vec3 p = ro;
      vec2 r = vec2(0.0);
      vec3 sum = vec3(0.0);

      for (int i = 0; i < VOLUMETRIC_STEPS; i++) {
        r = mapField(p, j);
        p += rd * 0.03;
        float lp = length(p);

        vec3 col = sin(vec3(1.02, 2.5, 1.52) * 3.94 + r.y) * 0.85 + 0.4;
        col *= smoothstep(1.0, 2.09, -r.x);
        col *= smoothstep(0.02, 0.2, abs(lp - 1.1));
        col *= smoothstep(0.1, 0.34, lp);

        float denom = max(log(max(distance(p, orig) - 2.0, 0.05)) + 0.75, 0.15);
        sum += abs(col) * 5.0 * (1.2 - noise(vec3(lp * 2.0 + j * 13.0 + time * 5.0)) * 1.1) / denom;
      }

      return sum;
    }

    vec2 iSphere2(vec3 ro, vec3 rd) {
      vec3 oc = ro;
      float b = dot(oc, rd);
      float c = dot(oc, oc) - 1.0;
      float h = b * b - c;
      if (h < 0.0) return vec2(-1.0);
      return vec2(-b - sqrt(h), -b + sqrt(h));
    }

    void main() {
      vec3 local = vLocalPosition * uScale;

      vec3 ro = vec3(0.0, 0.0, 5.0);
      vec3 rd = normalize(local - ro);

      vec3 bro = ro;
      vec3 brd = rd;

      vec3 col = vec3(0.02, 0.03, 0.04);

      for (float j = 1.0; j < NUM_RAYS + 1.0; j++) {
        ro = bro;
        rd = brd;

        mat2 mm = mm2((time * 0.1 + ((j + 1.0) * 5.1)) * j * 0.25);
        ro.xy *= mm; rd.xy *= mm;
        ro.xz *= mm; rd.xz *= mm;

        float rz = march(ro, rd, 2.5, FAR, j);
        if (rz >= FAR) continue;

        vec3 pos = ro + rz * rd;
        col = max(col, vmarch(pos, rd, j, bro));
      }

      ro = bro;
      rd = brd;
      vec2 sph = iSphere2(ro, rd);

      if (sph.x > 0.0) {
        vec3 pos = ro + rd * sph.x;
        vec3 pos2 = ro + rd * sph.y;
        vec3 rf = reflect(rd, normalize(pos));
        vec3 rf2 = reflect(rd, normalize(pos2));

        float nz = -log(max(abs(flow(rf * 1.2, time) - 0.01), 0.001));
        float nz2 = -log(max(abs(flow(rf2 * 1.2, -time) - 0.01), 0.001));

        col += (0.1 * nz * nz * vec3(0.12, 0.20, 0.45) +
                0.05 * nz2 * nz2 * vec3(0.52, 0.68, 0.38)) * 0.7;
      }

      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.0);

      vec3 cytoplasmTint = vec3(0.78, 0.90, 0.70);
      col *= cytoplasmTint;
      col *= uBrightness;
      col += fresnel * vec3(0.06, 0.08, 0.05);

      float density = clamp(length(col) * 0.22, 0.0, 1.0);
      float alpha = mix(0.42, 0.86, density) * uOpacity;

      gl_FragColor = vec4(col * 1.15, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function ElectricParasiteMaterial({
  opacity = 0.72,
  scale = 1.35,
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
      uBrightness={brightness}
    />
  );
}
