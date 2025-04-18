import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, CheckCircle, XCircle } from "react-feather";
import "./styles.css";

const ProjectRating = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [criteria, setCriteria] = useState({
    functionality: 0,
    design: 0,
    creativity: 0,
    codeQuality: 0,
    usability: 0,
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    // Simulate API call to fetch project data
    const fetchProject = async () => {
      try {
        // In a real app, you would fetch from your API
        setTimeout(() => {
          const mockProject = {
            id: projectId,
            title: "Weather Dashboard",
            description:
              "A comprehensive weather application with real-time updates and 5-day forecasts.",
            studentName: "Alex Johnson",
            studentAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
            submissionDate: "2023-06-15",
            technologies: ["React", "Node.js", "MongoDB"],
            githubUrl: "https://github.com/example/weather-app",
            liveUrl: "https://weather-app.example.com",
            screenshot:
              "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          };
          setProject(mockProject);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCriteriaChange = (criterion, value) => {
    setCriteria({
      ...criteria,
      [criterion]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least one criteria is rated
    if (Object.values(criteria).every((val) => val === 0)) {
      setValidationError("Please rate at least one criteria");
      return;
    }

    // Calculate average rating if not explicitly set
    const finalRating =
      rating > 0
        ? rating
        : Object.values(criteria).reduce((a, b) => a + b, 0) /
          Object.keys(criteria).length;

    const ratingData = {
      projectId,
      rating: finalRating,
      criteria,
      feedback,
      ratedAt: new Date().toISOString(),
    };

    try {
      // In a real app, you would POST this to your API
      console.log("Submitting rating:", ratingData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setTimeout(() => navigate("/admin/submissions"), 2000);
    } catch (error) {
      console.error("Error submitting rating:", error);
      setValidationError("Failed to submit rating. Please try again.");
    }
  };

  const renderStars = (count, active, size = 20, onClick = null) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`star ${i < count ? "filled" : ""} ${
            onClick ? "clickable" : ""
          }`}
          onClick={() => onClick && onClick(i + 1)}
          onMouseEnter={() => active && setHover(i + 1)}
          onMouseLeave={() => active && setHover(0)}
          fill={i < count ? "currentColor" : "none"}
        />
      ));
  };

  if (loading) {
    return (
      <div className="rating-container glass-card">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rating-container glass-card">
        <XCircle size={48} className="error-icon" />
        <h2>Project Not Found</h2>
        <p>The requested project could not be loaded.</p>
        <button
          onClick={() => navigate("/admin/submissions")}
          className="btn btn-neumorphic"
        >
          <ArrowLeft size={16} /> Back to Submissions
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rating-container glass-card">
        <CheckCircle size={48} className="success-icon" />
        <h2>Rating Submitted</h2>
        <p>Thank you for rating this project!</p>
        <p>Redirecting back to submissions...</p>
      </div>
    );
  }

  return (
    <div className="rating-container glass-card">
      <div className="rating-header">
        <button
          onClick={() => navigate("/admin/submissions")}
          className="btn btn-neumorphic"
        >
          <ArrowLeft size={16} /> Back to Submissions
        </button>
        <h1>Rate Project</h1>
      </div>

      <div className="project-overview">
        <div className="project-image">
          <img src={project.screenshot} alt={project.title} />
        </div>
        <div className="project-details">
          <h2>{project.title}</h2>
          <div className="student-info">
            <img src={project.studentAvatar} alt={project.studentName} />
            <span>{project.studentName}</span>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-meta">
            <div className="meta-item">
              <strong>Submitted:</strong>{" "}
              {new Date(project.submissionDate).toLocaleDateString()}
            </div>
            <div className="meta-item">
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </div>
          </div>
          <div className="project-links">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neumorphic"
            >
              View Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <div className="rating-form">
        <h2>Project Evaluation</h2>

        <div className="overall-rating">
          <h3>Overall Rating</h3>
          <div className="stars-container">
            {renderStars(hover || rating, true, 28, handleRatingChange)}
          </div>
          <div className="rating-labels">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Very Good</span>
            <span>Excellent</span>
          </div>
        </div>

        <div className="criteria-ratings">
          <h3>Rate by Criteria</h3>
          {Object.entries({
            functionality: "Functionality",
            design: "Design & UI",
            creativity: "Creativity",
            codeQuality: "Code Quality",
            usability: "Usability",
          }).map(([key, label]) => (
            <div key={key} className="criteria-item">
              <label>{label}</label>
              <div className="stars-container">
                {renderStars(hover[key] || criteria[key], true, 20, (value) =>
                  handleCriteriaChange(key, value)
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="feedback-section">
          <h3>Feedback</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide constructive feedback..."
            rows="5"
          ></textarea>
        </div>

        {validationError && (
          <div className="validation-error">
            <XCircle size={16} /> {validationError}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary submit-rating"
          disabled={Object.values(criteria).every((val) => val === 0)}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default ProjectRating;
