import React, { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const containerRef = useRef();

  // Animation for the progress bar
  useEffect(() => {
    gsap.to(".progress-bar-inner", {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [progress]);

  // Transition out when 'started' becomes true
  useEffect(() => {
    if (started) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          // You could add a 'display: none' here if needed
        },
      });
    }
  }, [started]);

  return (
    <div ref={containerRef} className="loader-container">
      <div className="loader-content">
        <h2 className="loader-title">ParaSightAI</h2>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-inner"></div>
        </div>
        <p className="loader-percentage">{Math.round(progress)}%</p>

        {/* Smoothly fade in the button when ready */}
        {progress === 100 && (
          <button className="enter-btn" onClick={onStarted}>
            Initialize Specimen
          </button>
        )}
      </div>
    </div>
  );
};
