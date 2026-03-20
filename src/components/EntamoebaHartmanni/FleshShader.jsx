// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.78,
    uScale: 1.25,
    uFocusDistance: 35.0,
    uDepthRadius: 7.0,
    uBlurStrength: 1.0,
    uBrightness: 1.05,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 transformed = position;

      #include <morphtarget_vertex>

      vLocalPosition = transformed;
      vNormal = normalize(normalMatrix * normal);

      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      vViewPosition = mvPosition.xyz;

      vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    uniform float uScale;
    uniform float uFocusDistance;
    uniform float uDepthRadius;
    uniform float uBlurStrength;
    uniform float uBrightness;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;
    varying vec3 vViewPosition;

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

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      mat2 m = mat2(1.6, 1.2, -1.2, 1.6);

      for (int i = 0; i < 5; i++) {
        value += amplitude * noise2(p);
        p = m * p;
        amplitude *= 0.5;
      }

      return value;
    }

    vec3 GammaCorrection(vec3 inColor) {
      const vec3 gammaExp = vec3(1.0 / 2.2);
      return pow(max(inColor, 0.0), gammaExp);
    }

    vec3 cytoplasmBase(vec3 p) {
      vec2 uv1 = p.xy * 2.4 + vec2(iTime * 0.06, -iTime * 0.03);
      vec2 uv2 = p.yz * 2.0 - vec2(iTime * 0.04, iTime * 0.05);
      vec2 uv3 = p.xz * 2.2 + vec2(-iTime * 0.05, iTime * 0.02);

      float n1 = fbm(uv1);
      float n2 = fbm(uv2);
      float n3 = fbm(uv3);

      float density = (n1 + n2 + n3) / 3.0;
      float grain = smoothstep(0.42, 0.92, density);
      float soft = smoothstep(0.20, 0.78, density);

      vec3 darkCol = vec3(0.12, 0.16, 0.13);
      vec3 midCol  = vec3(0.57, 0.70, 0.56);
      vec3 highCol = vec3(0.86, 0.94, 0.77);

      vec3 col = mix(darkCol, midCol, soft);
      col = mix(col, highCol, grain);

      return col;
    }

    vec3 dofColor(vec3 p, float distanceOfFocus) {
      vec3 finalColor = vec3(0.0);
      const float squareEdge = 2.0;
      const float iters = 25.0;

      float localDepth = length(vViewPosition);
      float l = abs(distanceOfFocus - localDepth);
      float dofLevel = clamp((l - uDepthRadius) * 0.1, 0.0, 1.0) * uBlurStrength;

      for (float i = -squareEdge; i <= squareEdge; i++) {
        for (float j = -squareEdge; j <= squareEdge; j++) {
          vec3 offsetP = p + vec3(i, j, i - j) * 0.045 * dofLevel;
          finalColor += cytoplasmBase(offsetP);
        }
      }

      finalColor /= iters;
      return finalColor;
    }

    void main() {
      vec3 p = vLocalPosition * uScale;

      vec3 col = dofColor(p, uFocusDistance);

      float centerFade = smoothstep(1.35, 0.05, length(vLocalPosition));
      col *= (0.78 + 0.35 * centerFade);

      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);

      col += vec3(0.05, 0.07, 0.05) * fresnel;
      col *= uBrightness;

      col = GammaCorrection(col);

      float alphaBase = smoothstep(1.25, 0.15, length(vLocalPosition));
      float alpha = mix(0.42, 0.88, alphaBase) * uOpacity;

      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function FleshParasiteMaterial({
  opacity = 0.78,
  scale = 1.25,
  focusDistance = 35.0,
  depthRadius = 7.0,
  blurStrength = 1.0,
  brightness = 1.05,
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
      uFocusDistance={focusDistance}
      uDepthRadius={depthRadius}
      uBlurStrength={blurStrength}
      uBrightness={brightness}
    />
  );
}
