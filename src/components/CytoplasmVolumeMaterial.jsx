import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const LavaMaterialImpl = shaderMaterial(
  {
    time: 0,
    fogDensity: 0.0,
    fogColor: new THREE.Color("#000000"),
    texture1: null, // Cloud texture (noise)
    texture2: null, // This is still the original lava texture
    uvScale: new THREE.Vector2(1.0, 1.0),
    uOpacity: 0.5,
  },
  // Vertex Shader (Unchanged)
  /* glsl */ `
    uniform vec2 uvScale;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uvScale * uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader (MODIFIED)
  /* glsl */ `
    uniform float time;
    uniform float uOpacity;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec4 noise = texture2D(texture1, vUv);
      vec2 T1 = vUv + vec2(1.5, -1.5) * time * 0.01;
      vec2 T2 = vUv + vec2(-0.5, 2.0) * time * 0.01;

      T1.x += noise.x * 2.0;
      T1.y += noise.y * 2.0;
      T2.x -= noise.y * 0.2;
      T2.y += noise.z * 0.2;

      float p = texture2D(texture1, T1 * 2.0).a;
      vec4 color = texture2D(texture2, T2 * 2.0);
      
      // Calculate original lava color
      vec4 temp = color * (vec4(p, p, p, p) * 2.0) + (color * color - 0.1);

      // --- GREENISH COLOR ADJUSTMENT START ---
      
      // Use the luminance (brightness) of the final color
      float luminosity = dot(temp.rgb, vec3(0.299, 0.587, 0.114));
      
      // Define a "healthy green" to mix toward
      vec3 targetGreen = vec3(0.2, 0.7, 0.5); // Adjust this green as needed

      // Define a "pale green" for darker/cooler spots
      vec3 paleGreen = vec3(0.5, 0.6, 0.5);

      // Mix the output toward green based on luminosity.
      // Bright areas get more pure green; dark areas get paler green
      vec3 finalRGB = mix(paleGreen, targetGreen, luminosity);
      
      // If there are specific "hot" red highlights we want to turn cyan/greenish
      // we can do a broad color shift on the whole texture
      vec3 colorShift = vec3(0.5, 1.2, 0.8); // Less Red, more Green and Blue
      finalRGB *= colorShift;
      
      // Ensure color doesn't explode too brightly
      finalRGB = clamp(finalRGB, 0.0, 1.0);

      // Simple Fresnel for rim lighting
      float fresnel = pow(1.0 - dot(vNormal, normalize(vViewPosition)), 3.0);
      
      gl_FragColor = vec4(finalRGB.rgb, uOpacity + (fresnel * 0.5));
    }
  `,
);

extend({ LavaMaterialImpl });

export function LavaCytoplasmMaterial() {
  const ref = useRef();

  // Load textures (assuming original lava textures are still used)
  const [cloudTex, lavaTex] = useTexture([
    "/textures/lava/cloud.png",
    "/textures/lava/lavatile.jpg",
  ]);

  cloudTex.wrapS = cloudTex.wrapT = THREE.RepeatWrapping;
  lavaTex.wrapS = lavaTex.wrapT = THREE.RepeatWrapping;

  useFrame((state) => {
    if (ref.current) {
      ref.current.time = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <lavaMaterialImpl
      ref={ref}
      texture1={cloudTex}
      texture2={lavaTex}
      transparent
      depthWrite={false}
      // Increased opacity slightly for the green effect to show better
      uOpacity={0.5}
      uvScale={[2, 2]}
    />
  );
}
