import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLCystProtoplastMaterial } from "../Shaders/GLCystProtoplastShader";
import {
  GLCystWallMaterial,
  GLCystNucleusMaterial,
  GLCystKaryosomeMaterial,
  GLCystFibrilMaterial,
  GLCystMedianBodyMaterial,
} from "../Shaders/GLCystStructureMaterials";

export function GLCystModel(props) {
  const { nodes } = useGLTF("/models/GardiaLambliaCyst-v1.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        name="fibril5"
        geometry={nodes.fibril5.geometry}
        position={[0.076, 1.691, 2.652]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril8"
        geometry={nodes.fibril8.geometry}
        position={[0.077, 1.691, 2.76]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril2"
        geometry={nodes.fibril2.geometry}
        position={[0.077, 1.697, 2.543]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril17"
        geometry={nodes.fibril17.geometry}
        position={[-0.014, 1.699, 2.768]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril1"
        geometry={nodes.fibril1.geometry}
        position={[0, 1.694, 2.491]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril3"
        geometry={nodes.fibril3.geometry}
        position={[-0.015, 1.7, 2.572]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril4"
        geometry={nodes.fibril4.geometry}
        position={[-0.025, 1.695, 2.634]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="fibril6"
        geometry={nodes.fibril6.geometry}
        position={[-0.039, 1.7, 2.696]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <GLCystFibrilMaterial />
      </mesh>

      <mesh
        name="medianbody2001"
        geometry={nodes.medianbody2001.geometry}
        position={[0, 1.381, 2.359]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      >
        <GLCystMedianBodyMaterial />
      </mesh>

      <mesh
        name="medianbody2002"
        geometry={nodes.medianbody2002.geometry}
        position={[0, 1.381, 2.88]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <GLCystMedianBodyMaterial />
      </mesh>

      <mesh
        name="cystkaryosome1"
        geometry={nodes.cystkaryosome1.geometry}
        position={[0, 2.898, 2.321]}
      >
        <GLCystKaryosomeMaterial />
      </mesh>

      <mesh
        name="cystkaryosome2"
        geometry={nodes.cystkaryosome2.geometry}
        position={[0, 2.452, 2.321]}
      >
        <GLCystKaryosomeMaterial />
      </mesh>

      <mesh
        name="cystkaryosome3"
        geometry={nodes.cystkaryosome3.geometry}
        position={[0, 2.898, 3.021]}
      >
        <GLCystKaryosomeMaterial />
      </mesh>

      <mesh
        name="cystkaryosome4"
        geometry={nodes.cystkaryosome4.geometry}
        position={[0, 2.452, 3.021]}
      >
        <GLCystKaryosomeMaterial />
      </mesh>

      <mesh
        name="cystnucleus1"
        geometry={nodes.cystnucleus1.geometry}
        position={[0, 2.898, 2.321]}
      >
        <GLCystNucleusMaterial opacity={0.84} />
      </mesh>

      <mesh
        name="cystnucleus2"
        geometry={nodes.cystnucleus2.geometry}
        position={[0, 2.452, 2.321]}
      >
        <GLCystNucleusMaterial opacity={0.84} />
      </mesh>

      <mesh
        name="cystnucleus3"
        geometry={nodes.cystnucleus3.geometry}
        position={[0, 2.898, 3.021]}
      >
        <GLCystNucleusMaterial opacity={0.84} />
      </mesh>

      <mesh
        name="cystnucleus4"
        geometry={nodes.cystnucleus4.geometry}
        position={[0, 2.452, 3.021]}
      >
        <GLCystNucleusMaterial opacity={0.84} />
      </mesh>

      <mesh
        name="cystwall"
        geometry={nodes.cystwall.geometry}
        position={[0, 2.149, 2.638]}
      >
        <GLCystWallMaterial transmission={0.03} roughness={0.9} />
      </mesh>

      <mesh
        name="protoplast"
        geometry={nodes.protoplast.geometry}
        position={[0, 2.149, 2.638]}
      >
        <GLCystProtoplastMaterial
          uOpacity={0.58}
          uDensity={1.18}
          uBaseColor={"#cfd7b6"}
          uCloudColor={"#dde5c8"}
          uShadowColor={"#9eaa88"}
          uCoreTint={"#b8c59c"}
          uNoiseScale={4.8}
          uSoftness={0.86}
          uRimStrength={0.12}
          uMotionStrength={0.003}
          uGranuleStrength={0.14}
          uCoreBias={0.22}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/GardiaLambliaCyst-v1.glb");
