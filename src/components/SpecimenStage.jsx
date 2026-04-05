import { useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import { parasiteAtom, stageAtom, viewAtom } from "../store/store";
import { PARASITE_DATA } from "./ParasiteConfig";
import { Center, Float } from "@react-three/drei";
import gsap from "gsap";

export const SpecimenStage = () => {
  const id = useAtomValue(parasiteAtom);
  const stage = useAtomValue(stageAtom);
  const view = useAtomValue(viewAtom);

  const groupRef = useRef();
  const config = PARASITE_DATA[id][stage];

  useEffect(() => {
    if (groupRef.current) {
      // Transition settings based on view
      const isHome = view === "HOME";

      gsap.to(groupRef.current.position, {
        x: isHome ? 1 : 0,
        duration: 1.5,
        ease: "power3.inOut",
      });

      gsap.to(groupRef.current.scale, {
        x: isHome ? 2.0 : 1.5,
        y: isHome ? 2.0 : 1.5,
        z: isHome ? 2.0 : 1.5,
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  }, [view]); // Runs when switching from HOME to LIST

  return (
    <Float
      speed={1.5}
      rotationIntensity={view === "HOME" ? 1.2 : 0.5}
      floatIntensity={1.5}
    >
      <Center>
        {/* Using a standard group with a ref for GSAP manipulation */}
        <group ref={groupRef}>
          {/* Key on the inner wrapper ensures the model itself swaps 
              smoothly when the parasite/stage changes */}
          <group key={`${id}-${stage}`}>{config.Component}</group>
        </group>
      </Center>
    </Float>
  );
};
