import {
  ContactShadows,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Enthyst";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Model2 } from "./Enthyst2";
import { Model3 } from "./Enthystv2";

export const Experience = () => {
  const cameraRef = useRef();
  const { _modelposition, cameraposition } = useControls({
    modelposition: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
    cameraposition: {
      x: -4.8,
      y: 2.5,
      z: 6.7,
    },
  });

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
        position={[cameraposition.x, cameraposition.y, cameraposition.z]}
      />
      {/* <mesh position={[modelposition.x, modelposition.y, modelposition.z]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"red"} />
      </mesh> */}
      {/* <ambientLight intensity={1} /> */}
      {/* <directionalLight position={[0, 0, 5]} /> */}
      <OrbitControls
        enablePan
        minPolarAngle={0}
        maxPolarAngle={THREE.MathUtils.degToRad(73)}
      />
      <Float
        position={[0, 0.5, 0]}
        speed={2}
        rotationIntensity={2}
        floatIntensity={2}
      >
        <Model2 />
      </Float>
      <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />

      <Environment preset="city" />

      {/* Ground */}
      <mesh position={[0, -1.18, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        {/* <MeshReflectorMaterial
          color="#171720"
          resolution={1024}
          roughness={0.6}
          mixStrength={3}
        /> */}
        <meshStandardMaterial color="#171720" />
      </mesh>
    </>
  );
};
