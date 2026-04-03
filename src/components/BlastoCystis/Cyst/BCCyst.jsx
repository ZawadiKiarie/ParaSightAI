import React from "react";
import { useGLTF } from "@react-three/drei";
import { BCCystCytoplasmMaterial } from "../shaders/BCCystCytoplasmShader";
import {
  BCCystBodyMaterial,
  BCCystNucleusMaterial,
  BCStorageGranulesMaterial,
  BCMLOMaterial,
} from "../shaders/BCCystStructureMaterials";

export function BlastoCystisCyst(props) {
  const { nodes } = useGLTF("/models/BlastoCystisCyst-v1.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        name="CystMLO1"
        geometry={nodes.CystMLO1.geometry}
        position={[-3.833, 0.676, -0.349]}
        rotation={[-0.086, -0.468, -0.133]}
        scale={[0.082, 0.132, 0.066]}
      >
        <BCMLOMaterial />
      </mesh>

      <mesh
        name="CystMLO2"
        geometry={nodes.CystMLO2.geometry}
        position={[-3.324, 1.076, -0.355]}
        rotation={[-3.035, 0.767, 2.974]}
        scale={[0.082, 0.132, 0.066]}
      >
        <BCMLOMaterial />
      </mesh>

      <mesh
        name="CystMLO3"
        geometry={nodes.CystMLO3.geometry}
        position={[-3.706, 0.9, 0.311]}
        rotation={[-0.167, 0.06, -1.056]}
        scale={[0.082, 0.132, 0.066]}
      >
        <BCMLOMaterial />
      </mesh>

      <mesh
        name="CystBody"
        geometry={nodes.CystBody.geometry}
        position={[-3.819, 1, 0]}
      >
        <BCCystBodyMaterial />
      </mesh>

      <mesh
        name="Cytoplasm"
        geometry={nodes.Cytoplasm.geometry}
        position={[-3.819, 1, 0]}
        scale={0.832}
      >
        <BCCystCytoplasmMaterial
          uOpacity={0.56}
          uDensity={1.16}
          uBaseColor={"#d7c89e"}
          uCloudColor={"#e6d8b2"}
          uShadowColor={"#b49f77"}
          uWarmTint={"#cfb789"}
          uNoiseScale={4.1}
          uSoftness={0.84}
          uRimStrength={0.1}
          uMotionStrength={0.0025}
          uGranuleStrength={0.12}
          uRadialBias={0.24}
        />
      </mesh>

      <mesh
        name="CystNucleus1"
        geometry={nodes.CystNucleus1.geometry}
        position={[-3.652, 1.323, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.102, 0.099, 0.198]}
      >
        <BCCystNucleusMaterial />
      </mesh>

      <mesh
        name="CystNucleus3"
        geometry={nodes.CystNucleus3.geometry}
        position={[-4.251, 1.141, 0]}
        rotation={[-0.79, 0.183, -1.702]}
        scale={[0.102, 0.099, 0.198]}
      >
        <BCCystNucleusMaterial />
      </mesh>

      <mesh
        name="CystNucleus2"
        geometry={nodes.CystNucleus2.geometry}
        position={[-3.979, 1.505, 0.155]}
        rotation={[-1.758, 0.001, 0.056]}
        scale={[0.102, 0.099, 0.198]}
      >
        <BCCystNucleusMaterial />
      </mesh>

      <mesh
        name="CystNucleus4"
        geometry={nodes.CystNucleus4.geometry}
        position={[-3.975, 0.955, -0.125]}
        rotation={[0.828, -1.11, 0.631]}
        scale={[0.102, 0.099, 0.198]}
      >
        <BCCystNucleusMaterial />
      </mesh>

      <mesh
        name="StorageGranules"
        geometry={nodes.StorageGranules.geometry}
        position={[-3.809, 0.994, 0.013]}
        rotation={[0.333, 0.794, -Math.PI / 2]}
        scale={0.029}
      >
        <BCStorageGranulesMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/BlastoCystisCyst-v1.glb");
