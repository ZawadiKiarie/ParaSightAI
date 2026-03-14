import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const VacuoleFluidMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#d7dfd1"),
    uOpacity: 0.35,
    uNoiseScale: 6.0,
  },
  // vertex shader
  /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vNormal = normalize(normalMatrix * normal);

      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  // fragment shader
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uNoiseScale;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
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

    void main() {
        vec3 p = vWorldPosition * uNoiseScale + vec3(0.0, uTime * 0.05, uTime * 0.03);

        float n1 = noise(p);
        float n2 = noise(p * 2.0) * 0.5;
        float cloud = smoothstep(0.2, 0.8, n1 + n2);

        vec3 color = uColor * mix(0.75, 1.25, cloud);
        float alpha = uOpacity + cloud * 0.25;
        alpha = clamp(alpha, 0.2, 0.55);

        gl_FragColor = vec4(color, alpha);
}
  `,
);

extend({ VacuoleFluidMaterialImpl });

export function FoodVacuoleFluidMaterial(props) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.uTime = state.clock.elapsedTime;
  });

  return (
    <vacuoleFluidMaterialImpl
      ref={ref}
      transparent
      depthWrite={false}
      {...props}
    />
  );
}
