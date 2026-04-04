import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { WarpedCytoplasmMaterial } from "../WarpedCytoplasmMaterial";
import * as THREE from "three";
import { IQWarpedMaterial } from "../IQWarpedMaterial";
import { EntHistNucleus } from "./EntHistNucleus";
import { FoodVacuole } from "./EmptyVacuole";
import { VacuolesWRBC } from "./EntHistVacuoleWRBC";
import { CytoplasmParticles } from "../CytoplasmParticles";
import { VolumetricParasiteMaterial } from "../EntamoebaHartmanni/FireShader";
import { useFrame } from "@react-three/fiber";

export function EntHistTrophModel(props) {
  const group = React.useRef();
  const { nodes, _materials, animations } = useGLTF(
    "/models/enthystbody-v1.glb",
  );
  const { actions } = useAnimations(animations, group);

  // --- MOUSE TRACKING LOGIC ---
  // useFrame((state) => {
  //   if (!group.current) return;

  //   const { pointer } = state;

  //   // Inside useFrame
  //   const time = state.clock.getElapsedTime();
  //   group.current.position.y = Math.sin(time * 0.5) * 0.1; // Gentle floating up/down

  //   // 1. Define target rotations based on mouse position (-1 to 1)
  //   // Vertical mouse (y) rotates the X-axis
  //   // Horizontal mouse (x) rotates the Y-axis
  //   const targetX = -pointer.y * 0.5; // Up/Down
  //   const targetY = pointer.x * 0.5; // Left/Right

  //   // 2. Smoothly interpolate to the target
  //   // 0.05 is the 'damping' factor. Lower = smoother/laggier.
  //   group.current.rotation.x = THREE.MathUtils.lerp(
  //     group.current.rotation.x,
  //     targetX,
  //     0.05,
  //   );
  //   group.current.rotation.y = THREE.MathUtils.lerp(
  //     group.current.rotation.y,
  //     targetY,
  //     0.05,
  //   );
  // });

  // Continuous Rotation Logic
  // useFrame((state, delta) => {
  //   if (group.current) {
  //     // Adjust '0.5' to make it spin faster or slower
  //     group.current.rotation.y += delta * 0.5;
  //   }
  // });

  useEffect(() => {
    const actionNames = ["Cube.002Action", "Cube.002Action.001"];

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
        <EntHistNucleus
          position={[0, 0, 0]}
          scale={0.2}
          rotation={[0, -Math.PI / 2, 0]}
        />

        {/* CYTOPLASM */}
        <mesh
          name="Cytoplasm"
          geometry={nodes.Cytoplasm.geometry}
          material={nodes.Cytoplasm.material}
          morphTargetDictionary={nodes.Cytoplasm.morphTargetDictionary}
          morphTargetInfluences={nodes.Cytoplasm.morphTargetInfluences}
          scale={[1, 0.708, 1]}
        >
          {/* <LavaCytoplasmMaterial /> */}
          {/* <IQWarpedMaterial /> */}
          <VolumetricParasiteMaterial />
        </mesh>

        {/* OUTER MEMBRANE */}
        <mesh
          name="OuterMembrane"
          geometry={nodes.OuterMembrane.geometry}
          material={nodes.OuterMembrane.material}
          morphTargetDictionary={nodes.OuterMembrane.morphTargetDictionary}
          morphTargetInfluences={nodes.OuterMembrane.morphTargetInfluences}
          scale={[1.114, 0.789, 1.114]}
        >
          <WarpedCytoplasmMaterial />
        </mesh>

        {/* EMPTY FOOD VACUOLES */}
        <group name="Vacuoles">
          <FoodVacuole position={[0.5, 0.2, 0.3]} scale={0.15} />
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

        {/* INGESTED RBC */}
        <group name="VacuolesRBC">
          <VacuolesWRBC position={[0.65, 0.12, 0.13]} scale={0.11} />
          <VacuolesWRBC
            position={[-0.6, 0.01, -0.5]}
            scale={0.17}
            rotation={[1, 0, 0.5]}
          />
          <VacuolesWRBC position={[-0.51, 0.12, 0.42]} scale={0.14} />
          {/* <VacuolesWRBC position={[-0.17, -0.11, 0.5]} scale={0.12} /> */}
        </group>

        <CytoplasmParticles position={[-0.2, 0.1, 0.09]} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/enthystbody-v1.glb");
