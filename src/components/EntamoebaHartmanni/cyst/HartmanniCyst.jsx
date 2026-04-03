import React from "react";
import { useGLTF } from "@react-three/drei";
import { HartmanniCystCytoplasmMaterial } from "../shaders/HartmanniCystCytoplasmShader";
import {
  HartmanniOuterCystWallMaterial,
  HartmanniNuclearEnvelopeMaterial,
  HartmanniChromatinLayerMaterial,
  HartmanniKaryosomeMaterial,
  HartmanniChromatoidBodyMaterial,
} from "../shaders/HartmanniCystStructureMaterials";

export function HartmanniCystModel(props) {
  const { nodes } = useGLTF("/models/HartmanniCyst-v1.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        name="chromatoid_body_2"
        geometry={nodes.chromatoid_body_2.geometry}
        position={[0.299, 1.069, -0.046]}
      >
        <HartmanniChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="chromatoid_body_3"
        geometry={nodes.chromatoid_body_3.geometry}
        position={[0.169, 0.864, -0.286]}
      >
        <HartmanniChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="inner_cyst_membrane"
        geometry={nodes.inner_cyst_membrane.geometry}
      >
        <HartmanniCystCytoplasmMaterial
          uOpacity={0.62}
          uDensity={1.18}
          uBaseColor={"#d7d8b8"}
          uCloudColor={"#e4e5ca"}
          uShadowColor={"#aeb08d"}
          uNoiseScale={4.2}
          uSoftness={0.82}
          uRimStrength={0.14}
          uMotionStrength={0.006}
          uGranuleStrength={0.18}
        />
      </mesh>

      <mesh
        name="outer_cyst_membrane"
        geometry={nodes.outer_cyst_membrane.geometry}
        position={[0, 1, 0]}
      >
        <HartmanniOuterCystWallMaterial />
      </mesh>

      <mesh
        name="chromatin_layer"
        geometry={nodes.chromatin_layer.geometry}
        position={[0, 0.772, 0.4]}
      >
        <HartmanniChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer001"
        geometry={nodes.chromatin_layer001.geometry}
        position={[0.094, 1.45, 0.27]}
      >
        <HartmanniChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer002"
        geometry={nodes.chromatin_layer002.geometry}
        position={[0, 1.415, -0.478]}
      >
        <HartmanniChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer003"
        geometry={nodes.chromatin_layer003.geometry}
        position={[0.015, 0.747, -0.429]}
      >
        <HartmanniChromatinLayerMaterial />
      </mesh>

      <mesh
        name="karyosome"
        geometry={nodes.karyosome.geometry}
        position={[0, 0.772, 0.4]}
      >
        <HartmanniKaryosomeMaterial />
      </mesh>

      <mesh
        name="karyosome001"
        geometry={nodes.karyosome001.geometry}
        position={[0.094, 1.45, 0.27]}
      >
        <HartmanniKaryosomeMaterial />
      </mesh>

      <mesh
        name="karyosome002"
        geometry={nodes.karyosome002.geometry}
        position={[0, 1.415, -0.478]}
      >
        <HartmanniKaryosomeMaterial />
      </mesh>

      <mesh
        name="karyosome003"
        geometry={nodes.karyosome003.geometry}
        position={[0.015, 0.747, -0.429]}
      >
        <HartmanniKaryosomeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope"
        geometry={nodes.nuclear_envelope.geometry}
        position={[0, 0.772, 0.4]}
      >
        <HartmanniNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope001"
        geometry={nodes.nuclear_envelope001.geometry}
        position={[0.094, 1.45, 0.27]}
      >
        <HartmanniNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope002"
        geometry={nodes.nuclear_envelope002.geometry}
        position={[0, 1.415, -0.478]}
      >
        <HartmanniNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope003"
        geometry={nodes.nuclear_envelope003.geometry}
        position={[0.015, 0.747, -0.429]}
      >
        <HartmanniNuclearEnvelopeMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/HartmanniCyst-v1.glb");
