import React, { useEffect } from "react";

const BackgroundAnimation = () => {
  useEffect(() => {
    const createCircles = (count) => {
      const animationContainer = document.getElementById("animation-container");

      // Clear any existing circles
      if (animationContainer) {
        animationContainer.innerHTML = "";

        for (let i = 0; i < count; i++) {
          const circle = document.createElement("div");
          circle.classList.add("circle");

          // Random size between 50px and 300px
          const size = Math.random() * 250 + 50;
          circle.style.width = `${size}px`;
          circle.style.height = `${size}px`;

          // Random position
          circle.style.left = `${Math.random() * 100}%`;
          circle.style.top = `${Math.random() * 100}%`;

          // Random animation delay
          circle.style.animationDelay = `${Math.random() * 5}s`;

          animationContainer.appendChild(circle);
        }
      }
    };

    createCircles(8);

    // Cleanup function
    return () => {
      const animationContainer = document.getElementById("animation-container");
      if (animationContainer) {
        animationContainer.innerHTML = "";
      }
    };
  }, []);

  return <div className="background-animation" id="animation-container"></div>;
};

export default BackgroundAnimation;
