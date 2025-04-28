import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section className="cta-section" id="join" ref={ctaRef}>
      <div className="container">
        <div className="cta-content">
          <h2 className="section-title">
            Ready to <span className="gradient-text">Take the Challenge?</span>
          </h2>
          <p className="cta-description">
            Join thousands of developers in this exciting 30-day journey to
            improve your coding skills, build an impressive portfolio, and
            connect with a vibrant community.
          </p>
          <Link to="/login?signup=true" className="btn btn-primary btn-large">
            Register Now
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="cta-decoration">
          <div className="code-block">
            <div className="code-line">
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">joinChallenge</span>() {"{"}
            </div>
            <div className="code-line">
              {" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-variable">coder</span> ={" "}
              <span className="code-string">'you'</span>;
            </div>
            <div className="code-line">
              {" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-variable">days</span> ={" "}
              <span className="code-number">30</span>;
            </div>
            <div className="code-line">
              {" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-variable">projects</span> = [];
            </div>
            <div className="code-line">
              {" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-variable">skills</span> ={" "}
              <span className="code-string">'leveling up'</span>;
            </div>
            <div className="code-line"> </div>
            <div className="code-line">
              {" "}
              <span className="code-keyword">return</span>{" "}
              <span className="code-string">'Amazing portfolio'</span>;
            </div>
            <div className="code-line">{"}"}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
