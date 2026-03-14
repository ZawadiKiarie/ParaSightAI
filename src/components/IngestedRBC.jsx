import { useMemo } from "react";

export function IngestedRBC({
  position = [0, 0, 0],
  scale = [1, 0.45, 0.85],
  rotation = [0, 0, 0],
}) {
  const color = useMemo(() => "#8b2f2f", []);

  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <sphereGeometry args={[0.07, 24, 24]} />
      <meshStandardMaterial color={color} roughness={1} metalness={0} />
    </mesh>
  );
}
