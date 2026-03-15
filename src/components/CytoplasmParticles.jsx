/* eslint-disable react-hooks/purity */
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function generateEllipsoidPositions(count, radii) {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * radii[0] * Math.sin(phi) * Math.cos(theta);
    const y = r * radii[1] * Math.sin(phi) * Math.sin(theta);
    const z = r * radii[2] * Math.cos(phi);

    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }

  return arr;
}

function ParticleLayer({
  texture,
  positions,
  size,
  opacity,
  color,
  rotationSpeedY = 0.04,
  rotationSpeedX = 0.02,
}) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.layers.set(1);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y =
      Math.sin(clock.elapsedTime * rotationSpeedY) * 0.08;
    ref.current.rotation.x =
      Math.cos(clock.elapsedTime * rotationSpeedX) * 0.04;
  });

  return (
    <points ref={ref} castShadow={false} receiveShadow={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        alphaMap={texture}
        color={color}
        size={size}
        transparent
        opacity={opacity}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export const CytoplasmParticles = ({ position = [0, 1.0, 0.05] }) => {
  const particleTexture = useTexture("/textures/circle_05.png");

  // soft misty density layer
  const hazePositions = useMemo(
    () => generateEllipsoidPositions(360, [0.85, 0.7, 0.55]),
    [],
  );

  // finer granular layer
  const granulePositions = useMemo(
    () => generateEllipsoidPositions(320, [0.75, 0.58, 0.55]),
    [],
  );

  return (
    <group position={position}>
      {/* diffuse cytoplasmic haze */}
      <ParticleLayer
        texture={particleTexture}
        positions={hazePositions}
        size={0.14}
        opacity={0.15}
        color="#d7dfcf"
        rotationSpeedY={0.03}
        rotationSpeedX={0.018}
      />

      {/* finer ground-glass granules */}
      <ParticleLayer
        texture={particleTexture}
        positions={granulePositions}
        size={0.145}
        opacity={0.31}
        color="#cfd8c8"
        rotationSpeedY={0.06}
        rotationSpeedX={0.03}
      />
    </group>
  );
};

useTexture.preload("/textures/circle_05.png");
