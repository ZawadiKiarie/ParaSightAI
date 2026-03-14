import * as THREE from "three";

export const Nucleus = ({ position = [0, 1.05, 0.1] }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial
          color="#c7d6c3"
          transparent
          opacity={0.75}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* peripheral chromatin ring */}
      <mesh scale={1.03}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshBasicMaterial
          color="#7f8f7b"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Central karyosome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.045, 24, 24]} />
        <meshStandardMaterial color="#152b0b" roughness={1} metalness={1} />
      </mesh>
    </group>
  );
};
