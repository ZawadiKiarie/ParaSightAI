import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { ParasiteMaterial } from "./OpalShader";
import { HartManniNucleus } from "./HartmanniNucleus";
import { FoodVacuole } from "../EntamoebaHystolytica/EmptyVacuole";

export function HartmanniModel(props) {
  const group = React.useRef();
  const { nodes, _materials, animations } = useGLTF(
    "/models/Hartmannitrophozoitebody-v1.glb",
  );
  const { actions } = useAnimations(animations, group);
  // console.log(actions);

  useEffect(() => {
    const actionNames = ["MeshAction", "MeshAction.001"];

    actionNames.forEach((name) => {
      const action = actions?.[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      } else {
        console.warn(`Animation not found: ${name}`);
      }
    });

    return () => {
      actionNames.forEach((name) => actions?.[name]?.fadeOut(0.5));
    };
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* NUCLEUS */}
        <HartManniNucleus
          position={[0, 1, 0]}
          scale={0.25}
          rotation={[0, -Math.PI / 2, 0]}
        />
        {/* OUTER MEMBRANE */}
        <mesh
          name="outermembrane"
          renderOrder={2}
          geometry={nodes.outermembrane.geometry}
          // material={nodes.outermembrane.material}
          morphTargetDictionary={nodes.outermembrane.morphTargetDictionary}
          morphTargetInfluences={nodes.outermembrane.morphTargetInfluences}
          position={[0.124, 0.972, -0.651]}
        >
          <meshPhysicalMaterial
            color={"#cceed3"}
            transparent={true}
            opacity={0.8}
            transmission={0.1}
            thickness={1.0}
            roughness={0.2}
            metalness={0}
            ior={1.33}
            depthWrite={false}
          />
        </mesh>
        {/* INNER MEMBRANE */}
        <mesh
          name="innermembrane"
          renderOrder={1}
          geometry={nodes.innermembrane.geometry}
          // material={nodes.innermembrane.material}
          morphTargetDictionary={nodes.innermembrane.morphTargetDictionary}
          morphTargetInfluences={nodes.innermembrane.morphTargetInfluences}
          position={[0.124, 0.972, -0.651]}
        >
          <ParasiteMaterial />
        </mesh>

        {/* EMPTY FOOD VACUOLES */}
        <group name="Vacuoles">
          <FoodVacuole position={[1.5, 1.2, 0.3]} scale={0.15} />
          <FoodVacuole
            position={[-0.4, -0.1, 0.2]}
            scale={0.12}
            rotation={[1, 0, 0.5]}
          />
          <FoodVacuole position={[0.1, -0.2, 0.2]} scale={0.18} />
          <FoodVacuole position={[-0.7, -0.1, 0.7]} scale={0.11} />
          <FoodVacuole position={[-0.5, 0.2, 1.0]} scale={0.05} />
          <FoodVacuole
            position={[0.4, -0.1, -0.2]}
            scale={0.02}
            rotation={[1, 0, 0.5]}
          />
          <FoodVacuole position={[0.1, 0.2, -0.2]} scale={0.04} />
          <FoodVacuole position={[0.1, 0.1, 0.7]} scale={0.08} />
          <FoodVacuole
            position={[0.24, -0.1, 0.02]}
            scale={0.03}
            rotation={[1, 0, 0.5]}
          />
          <FoodVacuole
            position={[0.24, -0.1, -0.22]}
            scale={0.04}
            rotation={[1, 0, 0.5]}
          />
          <FoodVacuole
            position={[0.24, -0.1, -0.22]}
            scale={0.03}
            rotation={[1, 0, 0.5]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Hartmannitrophozoitebody-v1.glb");
