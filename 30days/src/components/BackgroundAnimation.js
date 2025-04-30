import React, { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const createOrbs = () => {
      const orbCounts = [8, 6, 4]; // Different counts for each layer
      const layers = 3;

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < orbCounts[layer]; i++) {
          const orb = document.createElement("div");

          const size = Math.random() * (250 - layer * 50) + 50;
          const depth = layer + 1;
          const speed = 15 + layer * 5; // Slower for background, faster for foreground

          orb.classList.add("orb");
          orb.classList.add(`orb-layer-${layer}`);

          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.left = `${Math.random() * 100}%`;
          orb.style.top = `${Math.random() * 100}%`;
          orb.style.animationDuration = `${speed}s`;
          orb.style.animationDelay = `${Math.random() * 5}s`;
          orb.style.opacity = `${0.5 - layer * 0.15}`;
          orb.style.zIndex = `-${depth}`;

          const hueOffset = layer * 20;
          const gradientStart =
            layer % 2 === 0
              ? `hsla(${260 + hueOffset}, 100%, 60%, 0.2)`
              : `hsla(${320 + hueOffset}, 100%, 60%, 0.2)`;
          const gradientEnd =
            layer % 2 === 0
              ? `hsla(${320 - hueOffset}, 100%, 60%, 0.2)`
              : `hsla(${260 - hueOffset}, 100%, 60%, 0.2)`;

          orb.style.background = `radial-gradient(circle, ${gradientStart}, ${gradientEnd})`;

          const animationPath = Math.floor(Math.random() * 4);
          orb.classList.add(`path-${animationPath}`);

          container.appendChild(orb);
        }
      }
    };

    createOrbs();

    const handleResize = () => {
      container.innerHTML = "";
      createOrbs();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div className="background-animation" ref={containerRef}></div>;
};

export default BackgroundAnimation;
