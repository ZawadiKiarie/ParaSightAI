import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AnimatedBodyMaterial() {
  const shaderRef = useRef();

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#a8c79a"),
      transparent: true,
      opacity: 0.5,
      roughness: 1,
      metalness: 0,
      transmission: 0,
      depthWrite: false,
    });

    mat.onBeforeCompile = (shader) => {
      shaderRef.current = shader;

      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uCloudColor = { value: new THREE.Color("#abce99") };
      shader.uniforms.uCloudOpacity = { value: 0.5 };
      shader.uniforms.uNoiseScale = { value: 1.8 };
      shader.uniforms.uFresnelStrength = { value: 0.08 };

      shader.vertexShader =
        `
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <worldpos_vertex>",
        `
        #include <worldpos_vertex>
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        `,
      );

      shader.fragmentShader =
        `
        uniform float uTime;
        uniform vec3 uCloudColor;
        uniform float uCloudOpacity;
        uniform float uNoiseScale;
        uniform float uFresnelStrength;

        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;

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
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `
        #include <color_fragment>

        vec3 noisePos = vWorldPosition * uNoiseScale + vec3(0.0, uTime * 0.08, uTime * 0.04);
        float n1 = noise(noisePos);
        float n2 = noise(noisePos * 2.0) * 0.5;
        float cloud = smoothstep(0.15, 0.75, n1 + n2);

        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDir), 0.0), 2.2);
        fresnel *= uFresnelStrength;

        vec3 baseBody = diffuseColor.rgb;
        vec3 cloudyBody = mix(baseBody, uCloudColor, cloud * 0.95);
        cloudyBody *= mix(1.0, 1.18, cloud);
        cloudyBody += vec3(fresnel);

        diffuseColor.rgb = cloudyBody;

        float finalAlpha = uCloudOpacity + cloud * 0.12 + fresnel * 0.10;
        diffuseColor.a *= clamp(finalAlpha, 0.22, 0.58);
        `,
      );
    };

    return mat;
  }, []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return <primitive object={material} attach="material" />;
}
