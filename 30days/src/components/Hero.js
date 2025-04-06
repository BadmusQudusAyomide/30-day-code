import React, { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const createRobotAnimation = () => {
      const robotContainer = document.getElementById("robot-animation");

      if (robotContainer) {
        robotContainer.innerHTML = "";

        const robot = document.createElement("div");
        robot.style.width = "100%";
        robot.style.height = "100%";
        robot.style.background =
          "url(/api/placeholder/800/300) center/contain no-repeat";
        robot.style.position = "relative";

        robotContainer.appendChild(robot);
      }
    };

    createRobotAnimation();

    // Cleanup function
    return () => {
      const robotContainer = document.getElementById("robot-animation");
      if (robotContainer) {
        robotContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="hero">
      <h1>30 Days of Code Challenge</h1>
      <h2>With VickyJay</h2>
      <p>
        The "30 Days of Code with VickyJay" challenge is an engaging and
        intensive programming contest designed to foster continuous learning and
        project development.
      </p>
      <a href="login.html" className="btn btn-primary">
        Join the Challenge
      </a>

      <div className="robot-illustration">
        <div id="robot-animation"></div>
      </div>
    </section>
  );
};

export default Hero;
