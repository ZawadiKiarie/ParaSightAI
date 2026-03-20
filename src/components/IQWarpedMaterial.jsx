import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const IQWarpedMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.5,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      
      // 1. Initialize 'transformed' with the base position
      #include <begin_vertex>
      
      // 2. Apply Morph Targets to 'transformed'
      #include <morphtarget_vertex>
      
      // 3. Use 'transformed' instead of 'position'
      vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
      vWorldPosition = worldPosition.xyz;
      
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

    float hash( vec2 p ) {
      float h = dot(p,vec2(127.1,311.7));
      return -1.0 + 2.0*fract(sin(h)*43758.5453123);
    }

    float noise( in vec2 p ) {
      vec2 i = floor( p );
      vec2 f = fract( p );
      vec2 u = f*f*(3.0-2.0*f);
      return mix( mix( hash( i + vec2(0.0,0.0) ), 
                       hash( i + vec2(1.0,0.0) ), u.x),
                  mix( hash( i + vec2(0.0,1.0) ), 
                       hash( i + vec2(1.0,1.0) ), u.x), u.y);
    }

    float fbm( vec2 p ) {
      float f = 0.0;
      f += 0.5000*noise( p ); p = m*p*2.02;
      f += 0.2500*noise( p ); p = m*p*2.03;
      f += 0.1250*noise( p ); p = m*p*2.01;
      f += 0.0625*noise( p );
      return f/0.9375;
    }

    vec2 fbm2( in vec2 p ) {
      return vec2( fbm(p.xy), fbm(p.yx) );
    }

    vec3 map( vec2 p ) {   
      p *= 0.7;
      float f = dot( fbm2( 1.0*(0.05*iTime + p + fbm2(-0.05*iTime+2.0*(p + fbm2(4.0*p)))) ), vec2(1.0,-1.0) );
      float bl = smoothstep( -0.8, 0.8, f );
      float ti = smoothstep( -1.0, 1.0, fbm(p) );

      // BLUISH-PURPLE PALETTE
      vec3 col1 = vec3(0.15, 0.1, 0.35);  // Deep Royal Purple (Shadows)
      vec3 col2 = vec3(0.5, 0.7, 1.0);   // Pale Ice Blue (Highlights/Cytoplasm)
      vec3 col3 = vec3(0.02, 0.01, 0.05); // Near black-purple for depth

      return mix( mix( col1, col2, ti ), col3, bl );
    }

    void main() {
      vec2 p = vWorldPosition.xz * 1.5; 
      float e = 0.0045;

      vec3 colc = map( p ); 
      float gc = dot(colc, vec3(0.333));
      vec3 cola = map( p + vec2(e,0.0) ); 
      float ga = dot(cola, vec3(0.333));
      vec3 colb = map( p + vec2(0.0,e) ); 
      float gb = dot(colb, vec3(0.333));
      
      vec3 nor = normalize( vec3(ga-gc, e, gb-gc ) );

      vec3 col = colc;
      
      // Changed Highlight Color to a bright Violet-Cyan for the "ridges"
      col += vec3(0.6, 0.5, 1.0) * 4.0 * abs(2.0*gc-ga-gb);
      
      col *= 1.0 + 0.2 * nor.y * nor.y;
      col += 0.05 * nor.y * nor.y * nor.y;
      
      float alpha = clamp(gc * 2.0, 0.2, 1.0) * uOpacity;
      
      gl_FragColor = vec4( col, alpha );
    }
  `,
);

extend({ IQWarpedMaterialImpl });

export function IQWarpedMaterial() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.iTime = state.clock.elapsedTime;
    }
  });

  return (
    <iQWarpedMaterialImpl
      ref={ref}
      key={IQWarpedMaterialImpl.key}
      transparent
      depthWrite={false}
      uOpacity={0.6}
      // morphTargets={true}
      onBeforeCompile={() => {
        ref.current.morphTargets = true;
      }}
    />
  );
}
