import { useGLTF } from "@react-three/drei";
import { Nucleus } from "./Nucleus";
import { useControls } from "leva";

export function Model(props) {
  const { nodes, _materials } = useGLTF("/models/enthyst-v1.glb");
  const { nucleusposition } = useControls({
    nucleusposition: {
      x: 0.08,
      y: 1.0,
      z: 0.05,
    },
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        name="enthyst"
        geometry={nodes.enthyst.geometry}
        // material={nodes.enthyst.material}
        position={[0, 0.839, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          metalness={0}
          roughness={0}
          transmission={1}
          ior={1}
          opacity={1}
          color={0xffffff}
          depthWrite={false}
        />
        {/* <meshPhysicalMaterial
          color="#d9e6d5"
          metalness={0}
          roughness={0.85}
          transmission={0.9}
          ior={1.15}
          transparent
          opacity={0.55}
        /> */}
      </mesh>

      <Nucleus
        position={[nucleusposition.x, nucleusposition.y, nucleusposition.z]}
      />
    </group>
  );
}

useGLTF.preload("/models/enthyst-v1.glb");
