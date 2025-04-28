import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import robotImage from '../assets/images/2.png';

const Hero = () => {
  const robotRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      },
      { threshold: 0.1 }
    );

    if (robotRef.current) {
      observer.observe(robotRef.current);
    }

    return () => {
      if (robotRef.current) {
        observer.unobserve(robotRef.current);
      }
    };
  }, []);

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">30 Days</span> of Code Challenge
          </h1>
          <h2 className="hero-subtitle">With VickyJay</h2>
          <p className="hero-description">
            An engaging and intensive programming journey designed to foster
            continuous learning and project development through daily coding
            challenges and community feedback.
          </p>
          <div className="hero-cta">
            <Link to="/login?signup=true" className="btn btn-primary btn-large">
              Join the Challenge
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="hero-visual" ref={robotRef}>
          <div className="robot-container">
            <div className="robot-glow"></div>
            <img
              src={robotImage}
              alt="Robot Coding Illustration"
              className="robot-image"
            />
            <div className="code-particles">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className={`code-particle particle-${i + 1}`}
                  >{`</>`}</div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;
