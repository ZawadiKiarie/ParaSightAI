import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const WarpedMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.6,
  },
  // Vertex Shader
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;

      #include <begin_vertex>
      #include <morphtarget_vertex>
      #include <beginnormal_vertex>
      #include <defaultnormal_vertex>

      vNormal = normalize(normalMatrix * normal);
      
      // Use the 'transformed' variable which has morphing applied
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  // Fragment Shader
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vNormal; // Added for Fresnel effect

    // Pale Blue Biological Colormap
    vec3 colormap(float x) {
      vec3 colorA = vec3(0.1, 0.25, 0.4);  // Deep slate blue
      vec3 colorB = vec3(0.6, 0.85, 1.0);  // Bright sky blue
      vec3 colorC = vec3(0.9, 0.95, 1.0);  // Very pale, almost white blue
      
      if(x < 0.5) return mix(colorA, colorB, x * 2.0);
      return mix(colorB, colorC, (x - 0.5) * 2.0);
    }

    float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);
      float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
      return res*res;
    }

    const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

    float fbm( vec2 p ) {
      float f = 0.0;
      f += 0.500000*noise( p + iTime * 0.2 ); p = mtx*p*2.02;
      f += 0.031250*noise( p ); p = mtx*p*2.01;
      f += 0.250000*noise( p ); p = mtx*p*2.03;
      f += 0.125000*noise( p ); p = mtx*p*2.01;
      f += 0.062500*noise( p ); p = mtx*p*2.04;
      f += 0.015625*noise( p + sin(iTime * 0.5) );
      return f/0.96875;
    }

    float pattern( in vec2 p ) {
      vec2 q = vec2( fbm( p + vec2(0.0,0.0) ), fbm( p + vec2(5.2,1.3) ) );
      vec2 r = vec2( fbm( p + 4.0*q + vec2(1.7,9.2) ), fbm( p + 4.0*q + vec2(8.3,2.8) ) );
      return fbm( p + 4.0*r );
    }

    void main() {
      vec2 uv = vUv * 3.0; 
      float shade = pattern(uv);
      
      // Get our pale blue color based on noise
      vec3 finalColor = colormap(shade);
      
      // FRESNEL CALCULATION: Makes edges of the 3D model "pop"
      // Assuming a simple camera view vector
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      
      // Boost the brightness slightly based on the noise pattern
      finalColor += shade * 0.1; 

      // Apply Fresnel to color (edge glow) and opacity
      gl_FragColor = vec4(finalColor + (fresnel * 0.5), uOpacity + (fresnel * 0.4));
    }
  `,
);

extend({ WarpedMaterialImpl });

export function WarpedCytoplasmMaterial() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.iTime = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <warpedMaterialImpl
      ref={ref}
      transparent
      depthWrite={false}
      uOpacity={0.25}
      // morphTargets={true}
      onBeforeCompile={() => {
        ref.current.morphTargets = true;
      }}
    />
  );
}
