import {
  ContactShadows,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
// import { useControls } from "leva";
import { Model } from "./Enthyst";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Model2 } from "./Enthyst2";
import { EntHistTrophModel } from "./EntamoebaHystolytica/EntamoebaHistolyticaBody";
import { HartmanniModel } from "./EntamoebaHartmanni/HartmanniBody";
import { EColiModel } from "./EntamoebaColi/EColiBody";
import { EColiModel2 } from "./EntamoebaColi/EColiBody2";
import { GLTrophozoite } from "./GiardiaLamblia/GLTrophozoite";

export const Experience = () => {
  const cameraRef = useRef();
  // const { _modelposition, cameraposition } = useControls({
  //   modelposition: {
  //     x: 0.1,
  //     y: 0.1,
  //     z: 0.1,
  //   },
  //   cameraposition: {
  //     x: -4.8,
  //     y: 2.5,
  //     z: 6.7,
  //   },
  // });

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.layers.enable(1);
    }
  }, []);
  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[-4.8, 2.6, 6.7]}
      />
      <OrbitControls
        enablePan
        minPolarAngle={0}
        maxPolarAngle={THREE.MathUtils.degToRad(73)}
      />
      <Float
        position={[0, 1.0, 0]}
        speed={1}
        rotationIntensity={0}
        floatIntensity={1}
      >
        {/* <EntHistTrophModel /> */}
        {/* <HartmanniModel scale={0.5} position={[0, -1, 0]} /> */}
        {/* <EColiModel2 position={[0, -1, 0]} /> */}
        <GLTrophozoite rotation={[0, Math.PI / 2, 0]} position={[2, -1, 0]} />
      </Float>
      {/* <group position={[0, 1.0, 0]}>
        <EntHistTrophModel scale={2} />
      </group> */}
      <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />

      <Environment preset="city" />

      {/* Ground */}
      <mesh position={[0, -1.18, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </>
  );
};
