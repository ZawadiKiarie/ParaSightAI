// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.78,
    uScale: 1.35,
    uBrightness: 1.15,
    uContrast: 1.1,
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
    uniform float uBrightness;
    uniform float uContrast;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    float bayer8x8(vec2 fragCoord) {
      int x = int(mod(floor(fragCoord.x), 8.0));
      int y = int(mod(floor(fragCoord.y), 8.0));
      int idx = x + y * 8;

      float m[64];
      m[0]=0.;   m[1]=48.;  m[2]=12.;  m[3]=60.;  m[4]=3.;   m[5]=51.;  m[6]=15.;  m[7]=63.;
      m[8]=32.;  m[9]=16.;  m[10]=44.; m[11]=28.; m[12]=35.; m[13]=19.; m[14]=47.; m[15]=31.;
      m[16]=8.;  m[17]=56.; m[18]=4.;  m[19]=52.; m[20]=11.; m[21]=59.; m[22]=7.;  m[23]=55.;
      m[24]=40.; m[25]=24.; m[26]=36.; m[27]=20.; m[28]=43.; m[29]=27.; m[30]=39.; m[31]=23.;
      m[32]=2.;  m[33]=50.; m[34]=14.; m[35]=62.; m[36]=1.;  m[37]=49.; m[38]=13.; m[39]=61.;
      m[40]=34.; m[41]=18.; m[42]=46.; m[43]=30.; m[44]=33.; m[45]=17.; m[46]=45.; m[47]=29.;
      m[48]=10.; m[49]=58.; m[50]=6.;  m[51]=54.; m[52]=9.;  m[53]=57.; m[54]=5.;  m[55]=53.;
      m[56]=42.; m[57]=26.; m[58]=38.; m[59]=22.; m[60]=41.; m[61]=25.; m[62]=37.; m[63]=21.;

      return m[idx] / 64.0;
    }

    #define FK(k) floatBitsToInt(cos(k)) ^ floatBitsToInt(k)

    float hash(vec2 k) {
      int x = FK(k.x);
      int y = FK(k.y);
      return fract(float((x * x - y) * (y * y + x)) / 2140000000.0);
    }

    float hash3(vec3 k) {
      float h1 = hash(k.xy);
      return hash(vec2(h1, k.z));
    }

    vec3 hash33(vec3 k) {
      float h1 = hash3(k);
      float h2 = hash3(k * max(h1, 0.001));
      float h3 = hash3(k * max(h2, 0.001));
      return vec3(h1, h2, h3);
    }

    float smin(float a, float b, float k) {
      float h = max(k - abs(a - b), 0.0) / k;
      return min(a, b) - h * h * h * k * (1.0 / 6.0);
    }

    vec3 sphercoord(vec2 p) {
      float l1 = acos(clamp(p.x, -1.0, 1.0));
      float l2 = 3.141592653589793 * p.y;
      return vec3(cos(l1), sin(l1) * sin(l2), sin(l1) * cos(l2));
    }

    vec3 erot(vec3 p, vec3 ax, float ro) {
      return mix(dot(p, ax) * ax, p, cos(ro)) + sin(ro) * cross(p, ax);
    }

    float comp(vec3 p, vec3 ro, float t) {
      vec3 ax = sphercoord(ro.xy * 2.0 - 1.0);
      p.z -= t;
      p = erot(p, ax, ro.z * 3.141592653589793);
      float scale = 4.0 + hash(ro.xz) * 0.5 + 0.5;
      p = (fract(p / scale) - 0.5) * scale;
      return length(p) - 0.8;
    }

    float scene(vec3 p) {
      float rad = 3.0 + p.z + sin(p.y / 2.0 + iTime) + cos(p.x / 3.0 + iTime * 0.9);
      float dist = 10000.0;

      for (int i = 0; i < 4; i++) {
        float fi = float(i + 1);
        vec3 rot = hash33(vec3(fi, cos(float(i)), sin(float(i))));
        float d = comp(p, rot, iTime / 2.0 * fi);
        dist = smin(dist, d, 1.0);
      }

      return mix(dist, rad, mix(0.3, 0.8 + sin(iTime) * 0.2, 0.1));
    }

    vec3 norm(vec3 p) {
      vec2 e = vec2(0.08, 0.0);
      return normalize(vec3(
        scene(p + e.xyy) - scene(p - e.xyy),
        scene(p + e.yxy) - scene(p - e.yxy),
        scene(p + e.yyx) - scene(p - e.yyx)
      ));
    }

    float marchAO(vec3 p, vec3 bias, float seed) {
      for (int i = 0; i < 10; i++) {
        vec3 jitter = tan(hash33(vec3(float(i), seed, 2.0)) * 1.7 - 0.85);
        p += normalize(bias + jitter) * scene(p);
      }
      return sqrt(smoothstep(0.0, 2.0, scene(p)));
    }

    void main() {
      vec3 q = vLocalPosition * uScale;

      vec3 cam = normalize(q - vec3(-4.0, 0.0, 2.6));
      vec3 init = vec3(-5.0, 0.0, sin(iTime * 0.37) * 1.1);

      cam = erot(cam, vec3(0.0, 1.0, 0.0), -0.5);
      init = erot(init, vec3(0.0, 1.0, 0.0), -0.5);

      vec3 p = init;
      bool hit = false;
      bool trig = false;
      bool outline = false;

      for (int i = 0; i < 120; i++) {
        if (hit) break;

        float dist = scene(p);

        if (dist < 0.08) trig = true;

        if (trig) {
          float odist = 0.09 - dist;
          outline = odist < dist;
          dist = min(dist, odist);
        }

        hit = dist * dist < 0.000001;
        p += dist * cam;
      }

      vec3 n = norm(p);
      vec3 r = reflect(cam, n);

      vec2 ao = vec2(0.0);
      vec2 fragLike = gl_FragCoord.xy + vLocalPosition.xy * 13.0;

      for (int i = 0; i < 8; i++) {
        float seed = bayer8x8(fragLike + float(i) + vec2(float(i / 4), 0.0) + vec2(iTime * 12.0, iTime * 18.0));
        ao += vec2(marchAO(p + n * 0.1, r, seed), 1.0);
      }

      ao.x /= max(ao.y, 1.0);

      float baseMask = hit && !outline ? 1.0 : 0.0;
      float tone = pow(
        smoothstep(0.0, 1.0, sqrt(clamp(ao.x, 0.0, 1.0))),
        1.6
      );

      float bodyFade = smoothstep(1.45, 0.1, length(vLocalPosition));
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(cameraPosition - vWorldPosition)), 0.0), 2.0);

      vec3 darkCol = vec3(0.10, 0.14, 0.11);
      vec3 midCol  = vec3(0.60, 0.72, 0.58);
      vec3 highCol = vec3(0.88, 0.95, 0.78);

      vec3 col = mix(darkCol, midCol, tone);
      col = mix(col, highCol, smoothstep(0.62, 1.0, tone));
      col *= (0.8 + 0.35 * bodyFade);
      col *= uBrightness;
      col = pow(col, vec3(0.95 * uContrast));
      col += fresnel * vec3(0.05, 0.07, 0.05);

      float density = clamp(tone * 0.9 + bodyFade * 0.35, 0.0, 1.0);
      float alpha = mix(0.38, 0.9, density) * uOpacity;

      gl_FragColor = vec4(col * baseMask, alpha * baseMask);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function ComicParasiteMaterial({
  opacity = 0.78,
  scale = 1.35,
  brightness = 1.15,
  contrast = 1.1,
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
      uContrast={contrast}
    />
  );
}
