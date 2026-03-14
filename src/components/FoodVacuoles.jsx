import { useMemo } from "react";
import { FoodVacuoleFluidMaterial } from "./FoodVacuoleFluidMaterial";
import { IngestedRBC } from "./IngestedRBC";

const FoodVacuole = ({
  position,
  scale = 1,
  hasRBC = false,
  rbcPosition = [0, 0, 0],
  rbcScale = [1, 0.55, 1],
  rbcRotation = [0, 0, 0],
}) => {
  return (
    <group position={position} scale={scale}>
      {/* outer membrane */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#dfe6da"
          transparent
          opacity={0.18}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      {/* inner cloudy fluid */}
      <mesh scale={0.82}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <FoodVacuoleFluidMaterial />
      </mesh>

      {/* ingested RBC */}
      {hasRBC && (
        <IngestedRBC
          position={rbcPosition}
          scale={rbcScale}
          rotation={rbcRotation}
        />
      )}
    </group>
  );
};

export const FoodVacuoles = () => {
  const vacuoles = useMemo(
    () => [
      {
        position: [0.48, 0.96, 0.18],
        scale: 1.0,
        hasRBC: true,
        rbcPosition: [0.02, -0.01, 0.01],
        rbcScale: [2, 1.5, 1.9],
        rbcRotation: [0.4, 0.2, 0.1],
      },
      {
        position: [-0.42, 1.1, -0.12],
        scale: 0.85,
        hasRBC: false,
      },
      {
        position: [-0.02, 0.6, -0.12],
        scale: 0.85,
        hasRBC: false,
      },
      {
        position: [0.38, 0.78, -0.28],
        scale: 1.15,
        hasRBC: true,
        rbcPosition: [-0.03, 0.02, -0.01],
        rbcScale: [1.4, 1.05, 1.55],
        rbcRotation: [0.2, 0.6, -0.3],
      },
      {
        position: [-0.11, 0.78, -0.28],
        scale: 1.05,
        hasRBC: true,
        rbcPosition: [-0.03, 0.02, -0.01],
        rbcScale: [1.4, 1.05, 1.55],
        rbcRotation: [0.2, 0.6, -0.3],
      },
    ],
    [],
  );

  return (
    <group>
      {vacuoles.map((vacuole, i) => (
        <FoodVacuole key={i} {...vacuole} />
      ))}
    </group>
  );
};
