import { useMemo } from "react";
import * as THREE from "three";

export function MembraneMaterial() {
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c8d9bf"),
      transparent: true,
      opacity: 0.22,
      roughness: 0.95,
      metalness: 0,
      transmission: 0.08,
      thickness: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  return <primitive object={material} attach="material" />;
}
