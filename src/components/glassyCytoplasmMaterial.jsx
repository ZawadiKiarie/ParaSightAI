import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const GlassyMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector3(1, 1, 1),
    iChannel0: null, // Texture for bumps
    iChannel1: null, // Texture for environment/reflections
    uColorBase: new THREE.Color("#2ecc71"), // Green base
    uOpacity: 0.5,
  },
  // Vertex Shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  // Fragment Shader (Ported & Adjusted from ShaderToy)
  /* glsl */ `
    uniform float iTime;
    uniform vec3 iResolution;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform vec3 uColorBase;
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    #define FAR 10. 

    // Helper functions from the original shader
    float n3D(vec3 p){
      const vec3 s = vec3(7, 157, 113);
      vec3 ip = floor(p); p -= ip; 
      vec4 h = vec4(0., s.yz, s.y + s.z) + dot(ip, s);
      p = p*p*(3. - 2.*p);
      h = mix(fract(sin(mod(h, 6.231589))*43758.5453), 
              fract(sin(mod(h + s.x, 6.231589))*43758.5453), p.x);
      h.xy = mix(h.xz, h.yw, p.y);
      return mix(h.x, h.y, p.z);
    }

    float map(vec3 p){
      const float TAU = 6.2831853;
      // We use iTime to animate the "churning" of the blobs
      p += sin(p.zxy * 1.5 + iTime * 0.5); 
      vec3 q = cos(mod(p * .315 * 1.25 + sin(mod(p.zxy * .875 * 1.25, TAU)), TAU));
      return (length(q) - 1.025) * 1.33;
    }

    void main() {
      // Use world position as the seed for the raymarching
      vec3 ro = vWorldPosition; 
      vec3 rd = normalize(vWorldPosition - cameraPosition);
      
      float t = 0.0, h;
      float accum = 0.0;
      
      // Short raymarch to see "inside"
      for(int i = 0; i < 32; i++){
        h = map(ro + rd * t);
        if(abs(h) < .001 || t > FAR) break;
        t += h;
        if(abs(h) < .35) accum += (.35 - abs(h)) / 24.0;
      }

      // Fresnel for that glassy edge
      float fr = clamp(1.0 + dot(rd, vNormal), 0.0, 1.0);
      
      // Create a "biological" color palette
      vec3 col = uColorBase * (accum * 8.0);
      col += vec3(0.1, 0.4, 0.2) * pow(fr, 4.0); // Rim glow
      
      // Electric charge effect (switched to green/cyan)
      float hi = abs(mod(t/1. + iTime/3., 8.) - 4.) * 2.;
      vec3 cCol = vec3(0.1, 1.0, 0.6) * col * 1. / (.001 + hi * hi * .2);
      col += cCol * 0.2;

      gl_FragColor = vec4(col, uOpacity + (fr * 0.3));
    }
  `,
);

extend({ GlassyMaterialImpl });

export function GlassyCytoplasmMaterial() {
  const ref = useRef();

  // Reuse textures or provide specific noise textures
  const [tex0, tex1] = useTexture([
    "/textures/lava/cloud.png",
    "/textures/lava/lavatile.jpg",
  ]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.iTime = state.clock.elapsedTime;
    }
  });

  return (
    <glassyMaterialImpl
      ref={ref}
      iChannel0={tex0}
      iChannel1={tex1}
      transparent
      depthWrite={false}
      uOpacity={0.3}
    />
  );
}
