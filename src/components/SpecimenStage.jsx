import { useRef, useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  parasiteAtom,
  stageAtom,
  viewAtom,
  hoveredMarkerAtom,
} from "../store/store";
import { PARASITE_DATA } from "./ParasiteConfig";
import { Center, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { DiagnosticMarker } from "./DiagnosticMarker";

export const SpecimenStage = () => {
  const id = useAtomValue(parasiteAtom);
  const stage = useAtomValue(stageAtom);
  const view = useAtomValue(viewAtom);
  const setHoveredMarker = useSetAtom(hoveredMarkerAtom);

  const outerGroupRef = useRef();
  const modelPivotRef = useRef();
  const config = PARASITE_DATA[id][stage];

  const { gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    setHoveredMarker(null);
  }, [id, stage, view, setHoveredMarker]);

  useEffect(() => {
    if (!outerGroupRef.current || !modelPivotRef.current) return;

    const isHome = view === "HOME";
    const targetScale = isHome ? 2.0 : 1.9;

    gsap.killTweensOf(outerGroupRef.current.position);
    gsap.killTweensOf(outerGroupRef.current.scale);

    gsap.to(outerGroupRef.current.position, {
      x: isHome ? 0.2 : 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });

    gsap.to(outerGroupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1.2,
      ease: "power3.inOut",
    });

    modelPivotRef.current.rotation.set(0, 0, 0);
  }, [id, stage, view]);

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (view !== "LIST") return;
      setIsDragging(true);
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging || !modelPivotRef.current || view !== "LIST") return;

      const deltaX = e.clientX - dragState.current.lastX;
      const deltaY = e.clientY - dragState.current.lastY;

      modelPivotRef.current.rotation.y += deltaX * 0.01;
      modelPivotRef.current.rotation.x += deltaY * 0.005;

      modelPivotRef.current.rotation.x = THREE.MathUtils.clamp(
        modelPivotRef.current.rotation.x,
        -0.8,
        0.8,
      );

      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    const onWheel = (e) => {
      if (!outerGroupRef.current || view !== "LIST") return;

      e.preventDefault();

      const currentScale = outerGroupRef.current.scale.x;
      const nextScale = THREE.MathUtils.clamp(
        currentScale - e.deltaY * 0.0015,
        1.0,
        2.8,
      );

      outerGroupRef.current.scale.setScalar(nextScale);
    };

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("wheel", onWheel);
    };
  }, [gl, isDragging, view]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={view === "HOME" ? 1.2 : 0}
      floatIntensity={view === "HOME" ? 1.5 : 0.3}
    >
      <group ref={outerGroupRef}>
        <group ref={modelPivotRef}>
          <Center key={`${id}-${stage}`}>
            <group scale={config.scale ?? 1}>
              {config.Component}

              {view === "LIST" &&
                config.markers?.map((marker) => (
                  <DiagnosticMarker
                    key={marker.id}
                    markerId={marker.id}
                    position={marker.position}
                    label={marker.label}
                    onClick={() => {
                      console.log("clicked marker:", marker.label);
                    }}
                  />
                ))}
            </group>
          </Center>
        </group>
      </group>
    </Float>
  );
};
