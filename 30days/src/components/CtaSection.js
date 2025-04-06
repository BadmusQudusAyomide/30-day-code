import React from "react";
import { Link } from "react-router-dom";
const CtaSection = () => {
  return (
    <section className="cta-section" id="join">
      <h2>Ready to Take the Challenge?</h2>
      <p>
        Join thousands of developers in this exciting 30-day journey to improve
        your coding skills, build an impressive portfolio, and connect with a
        vibrant community.
      </p>
      <a href="#" className="btn btn-primary">
        Register Now
      </a>
    </section>
  );
};

export default CtaSection;
