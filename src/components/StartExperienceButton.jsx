import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const StartButton = () => {
  const buttonRef = useRef();
  const textRef = useRef();

  // GSAP Text Splitting and Hover Logic
  useEffect(() => {
    // 1. Manually Split Text (because 'SplitText' plugin is GSAP Club Only)
    // We break "Start Experience" into individual characters
    const textStr = textRef.current.innerText;
    textRef.current.innerHTML = textStr
      .split("")
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");

    const chars = textRef.current.querySelectorAll(".char");

    // 2. Set initial state of characters (hidden and slightly shifted)
    gsap.set(chars, { y: "100%", opacity: 0 });

    // 3. Initial "Appear" animation (Seamlessly on load)
    gsap.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.02, // Delayed delay for each char
      ease: "power3.out",
      delay: 0.1, // Start after UI renders
    });

    // 4. Hover Interactions
    const onEnter = () => {
      // Out animation first, quickly
      gsap.to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.01,
        stagger: 0.01,
        ease: "power3.in",
        onComplete: () => {
          // Then, "Appear again" from the bottom seamlessly
          gsap.fromTo(
            chars,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.01,
              stagger: 0.01,
              ease: "power3.out",
            },
          );
        },
      });
    };

    const onLeave = () => {
      // Same text effect on hover out
      gsap.to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.01,
        stagger: 0.01,
        ease: "power3.in",
        onComplete: () => {
          gsap.fromTo(
            chars,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.01,
              stagger: 0.01,
              ease: "power3.out",
            },
          );
        },
      });
    };

    // Add event listeners
    const button = buttonRef.current;
    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    // Cleanup listeners on unmount
    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className="start-btn-container">
      {/* 1. Constant Ripple Background Layer */}
      <div className="ripple-background">
        <span className="ripple"></span>
        <span className="ripple"></span>
        <span className="ripple"></span>
      </div>

      {/* 2. Actual Button Content */}
      <div className="btn-content">
        <span ref={textRef} className="btn-text">
          Start Experience
        </span>
      </div>
    </button>
  );
};
