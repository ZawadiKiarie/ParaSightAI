import React from "react";
import { useGLTF } from "@react-three/drei";
import { EColiCystCytoplasmMaterial } from "../shaders/EColiCystCytoplasmShader";
import {
  EColiOuterCystWallMaterial,
  EColiNuclearEnvelopeMaterial,
  EColiChromatinLayerMaterial,
  EColiKaryosomeMaterial,
  EColiChromatoidBodyMaterial,
  EColiGlycogenMaterial,
} from "../shaders/EColiCystStructureMaterials";

export function EColiCystModel(props) {
  const { nodes } = useGLTF("/models/EColiCyst-v1.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        name="inner_cyst_membrane001"
        geometry={nodes.inner_cyst_membrane001.geometry}
        position={[0, 0, -2.576]}
      >
        <EColiCystCytoplasmMaterial
          uOpacity={0.66}
          uDensity={1.32}
          uBaseColor={"#b8b18f"}
          uCloudColor={"#c8c09e"}
          uShadowColor={"#7f7a60"}
          uDirtyColor={"#8c8667"}
          uNoiseScale={3.2}
          uSoftness={0.62}
          uRimStrength={0.12}
          uMotionStrength={0.004}
          uGranuleStrength={0.34}
          uMottleStrength={0.28}
        />
      </mesh>

      <mesh
        name="outer_cyst_membrane001"
        geometry={nodes.outer_cyst_membrane001.geometry}
        position={[0, 1, -2.576]}
      >
        <EColiOuterCystWallMaterial />
      </mesh>

      <mesh
        name="chromatin_layer004"
        geometry={nodes.chromatin_layer004.geometry}
        position={[0, 0.772, -2.033]}
      >
        <EColiChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer005"
        geometry={nodes.chromatin_layer005.geometry}
        position={[0.094, 1.45, -2.305]}
      >
        <EColiChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer006"
        geometry={nodes.chromatin_layer006.geometry}
        position={[0, 1.415, -3.053]}
      >
        <EColiChromatinLayerMaterial />
      </mesh>

      <mesh
        name="chromatin_layer007"
        geometry={nodes.chromatin_layer007.geometry}
        position={[0.015, 0.747, -3.004]}
      >
        <EColiChromatinLayerMaterial />
      </mesh>

      <mesh
        name="karyosome004"
        geometry={nodes.karyosome004.geometry}
        position={[0, 0.706, -2.079]}
      >
        <EColiKaryosomeMaterial color="#494033" />
      </mesh>

      <mesh
        name="karyosome005"
        geometry={nodes.karyosome005.geometry}
        position={[0.094, 1.491, -2.367]}
      >
        <EColiKaryosomeMaterial color="#494033" />
      </mesh>

      <mesh
        name="karyosome006"
        geometry={nodes.karyosome006.geometry}
        position={[0, 1.365, -2.973]}
      >
        <EColiKaryosomeMaterial color="#494033" />
      </mesh>

      <mesh
        name="karyosome007"
        geometry={nodes.karyosome007.geometry}
        position={[0.015, 0.755, -2.954]}
      >
        <EColiKaryosomeMaterial color="#494033" />
      </mesh>

      <mesh
        name="nuclear_envelope004"
        geometry={nodes.nuclear_envelope004.geometry}
        position={[0, 0.772, -2.033]}
      >
        <EColiNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope005"
        geometry={nodes.nuclear_envelope005.geometry}
        position={[0.094, 1.45, -2.305]}
      >
        <EColiNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope006"
        geometry={nodes.nuclear_envelope006.geometry}
        position={[0, 1.415, -3.053]}
      >
        <EColiNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="nuclear_envelope007"
        geometry={nodes.nuclear_envelope007.geometry}
        position={[0.015, 0.747, -3.004]}
      >
        <EColiNuclearEnvelopeMaterial />
      </mesh>

      <mesh
        name="Chromatoid1"
        geometry={nodes.Chromatoid1.geometry}
        position={[0.321, 0.974, -2.693]}
        rotation={[0.322, -0.051, -0.078]}
      >
        <EColiChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="Chromatoid2"
        geometry={nodes.Chromatoid2.geometry}
        position={[0.321, 0.974, -2.38]}
        rotation={[-0.338, 0.156, 0.144]}
      >
        <EColiChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="Chromatoid3"
        geometry={nodes.Chromatoid3.geometry}
        position={[0.28, 1.53, -2.43]}
        rotation={[-0.961, 0.36, 0.329]}
      >
        <EColiChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="Chromatoid4"
        geometry={nodes.Chromatoid4.geometry}
        position={[-0.315, 1.214, -2.812]}
        rotation={[1.132, -0.121, 0.718]}
      >
        <EColiChromatoidBodyMaterial />
      </mesh>

      <mesh
        name="Glycogen"
        geometry={nodes.Glycogen.geometry}
        position={[0, 0.995, -2.576]}
      >
        <EColiGlycogenMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/EColiCyst-v1.glb");
