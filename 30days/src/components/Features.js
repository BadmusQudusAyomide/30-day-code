import React, { useEffect, useRef } from "react";

const Features = () => {
  const featuresList = [
    {
      icon: "📊",
      title: "Challenge Overview",
      description:
        "Create and submit diverse projects over thirty days, from websites to coding tools. Foster consistent coding practice and innovation through daily challenges.",
    },
    {
      icon: "📝",
      title: "Submission Platform",
      description:
        "Use our dedicated platform to showcase your work with project details, coding language, and more. A centralized hub for all participants' creations.",
    },
    {
      icon: "💬",
      title: "Community Interaction",
      description:
        "View and rate others' projects, exchange ideas, and celebrate achievements. Build connections with fellow coders throughout the challenge.",
    },
    {
      icon: "⭐",
      title: "Rating System",
      description:
        "Receive constructive feedback from challenge admins based on creativity, functionality, code quality, and theme adherence.",
    },
    {
      icon: "🎨",
      title: "Daily Themes",
      description:
        "Each day features a unique thematic prompt to inspire your creativity. Incorporate these themes into your projects for an extra challenge.",
    },
    {
      icon: "⚡",
      title: "Documentation",
      description:
        "Submit concise documentation with each project, sharing insights into your development process, key features, and learning experiences.",
    },
  ];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      cardsRef.current.forEach((card) => {
        if (card) observer.observe(card);
      });
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.forEach((card) => {
          if (card) observer.unobserve(card);
        });
      }
    };
  }, []);

  return (
    <section
      className="features section-padding"
      id="features"
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">
          Challenge <span className="gradient-text">Features</span>
        </h2>
        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
