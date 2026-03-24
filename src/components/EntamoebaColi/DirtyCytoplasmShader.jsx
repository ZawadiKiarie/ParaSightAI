import * as THREE from "three";
import React, { forwardRef, useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const DirtyCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uColor: new THREE.Color("#9a8862"),
    uOpacity: 0.88,
    uScale: 3.4,
    uContrast: 1.25,
    uBrightness: 1.0,
    uWobble: 0.012,
    uRimStrength: 0.35,
    uDarkness: 0.45,
  },

  // vertex shader
  /* glsl */ `
    varying vec3 vLocalPosition;
    varying vec3 vWorldPosition;
    varying vec3 vNormalW;

    uniform float iTime;
    uniform float uWobble;

    void main() {
      vec3 pos = position;
      vec3 n = normal;

      // subtle organic wobble
      pos += n * (
        sin(pos.x * 5.0 + iTime * 1.2) *
        sin(pos.y * 4.0 + iTime * 0.9) *
        sin(pos.z * 6.0 + iTime * 1.1)
      ) * uWobble;

      vLocalPosition = pos;
      vNormalW = normalize(mat3(modelMatrix) * n);

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  // fragment shader
  /* glsl */ `
    varying vec3 vLocalPosition;
    varying vec3 vWorldPosition;
    varying vec3 vNormalW;

    uniform float iTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uScale;
    uniform float uContrast;
    uniform float uBrightness;
    uniform float uRimStrength;
    uniform float uDarkness;

    float hash(vec3 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float n000 = hash(i + vec3(0.0, 0.0, 0.0));
      float n100 = hash(i + vec3(1.0, 0.0, 0.0));
      float n010 = hash(i + vec3(0.0, 1.0, 0.0));
      float n110 = hash(i + vec3(1.0, 1.0, 0.0));
      float n001 = hash(i + vec3(0.0, 0.0, 1.0));
      float n101 = hash(i + vec3(1.0, 0.0, 1.0));
      float n011 = hash(i + vec3(0.0, 1.0, 1.0));
      float n111 = hash(i + vec3(1.0, 1.0, 1.0));

      float nx00 = mix(n000, n100, f.x);
      float nx10 = mix(n010, n110, f.x);
      float nx01 = mix(n001, n101, f.x);
      float nx11 = mix(n011, n111, f.x);

      float nxy0 = mix(nx00, nx10, f.y);
      float nxy1 = mix(nx01, nx11, f.y);

      return mix(nxy0, nxy1, f.z);
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amp = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 normal = normalize(vNormalW);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);

      vec3 p = vLocalPosition * uScale;

      float n1 = fbm(p + vec3(0.0, iTime * 0.18, 0.0));
      float n2 = fbm(p * 2.2 - vec3(iTime * 0.12, 0.0, iTime * 0.08));
      float n3 = noise(p * 4.5 + vec3(2.0, iTime * 0.2, 7.0));

      float pattern = mix(n1, n2, 0.55);
      pattern = mix(pattern, n3, 0.2);
      pattern = pow(pattern, uContrast);
      pattern *= uBrightness;

      float darkPockets = smoothstep(0.45, 0.85, n2);

      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0);

      vec3 base = uColor;
      vec3 darker = base * (1.0 - uDarkness);
      vec3 lighter = base * 1.12;

      vec3 color = mix(darker, lighter, pattern);
      color = mix(color, darker * 0.82, darkPockets * 0.45);
      color += fresnel * uRimStrength * 0.22;

      float alpha = uOpacity * mix(0.72, 1.0, pattern);

      gl_FragColor = vec4(color, alpha);
    }
  `,
);

extend({ DirtyCytoplasmMaterialImpl });

export const DirtyCytoplasmMaterial = forwardRef(
  function DirtyCytoplasmMaterial(
    {
      color = "#9a8862",
      opacity = 0.88,
      scale = 3.4,
      contrast = 1.25,
      brightness = 1.0,
      wobble = 0.012,
      rimStrength = 0.35,
      darkness = 0.45,
      side = THREE.DoubleSide,
      transparent = true,
      depthWrite = false,
      ...props
    },
    ref,
  ) {
    const localRef = useRef();
    const materialRef = ref || localRef;

    useFrame((_, delta) => {
      if (materialRef.current) {
        materialRef.current.iTime += delta;
      }
    });

    const uniforms = useMemo(
      () => ({
        uColor: new THREE.Color(color),
        uOpacity: opacity,
        uScale: scale,
        uContrast: contrast,
        uBrightness: brightness,
        uWobble: wobble,
        uRimStrength: rimStrength,
        uDarkness: darkness,
      }),
      [
        color,
        opacity,
        scale,
        contrast,
        brightness,
        wobble,
        rimStrength,
        darkness,
      ],
    );

    return (
      <dirtyCytoplasmMaterialImpl
        ref={materialRef}
        transparent={transparent}
        depthWrite={depthWrite}
        side={side}
        {...uniforms}
        {...props}
      />
    );
  },
);
