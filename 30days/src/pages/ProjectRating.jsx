// ProjectRating.jsx (continued)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectRating.css";
import {
  Star,
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Share2,
  Award,
} from "lucide-react";

const ProjectRating = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [criteria, setCriteria] = useState({
    functionality: 0,
    design: 0,
    creativity: 0,
    code: 0,
  });

  useEffect(() => {
    // Simulate fetching project data
    const fetchProject = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockProject = {
          id: parseInt(projectId),
          name: "Weather Dashboard",
          description:
            "A comprehensive weather application that displays current weather conditions, forecasts, and historical data for any location worldwide. Features include interactive maps, severe weather alerts, and customizable units.",
          day: 15,
          submittedBy: "Sarah Miller",
          submitterAvatar: "/api/placeholder/50/50",
          liveLink: "https://example.com/weather",
          repoLink: "https://github.com/sarahmiller/weather-app",
          screenshot: "/api/placeholder/800/450",
          frameworks: "React, TailwindCSS, Chart.js",
          languages: "JavaScript, HTML, CSS",
          currentRating: 4.7,
          ratingCount: 12,
          submittedDate: "2025-04-05",
        };
        setProject(mockProject);
        setLoading(false);
      }, 800);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate average rating from criteria
    const averageRating =
      Object.values(criteria).reduce((a, b) => a + b, 0) / 4;

    

    setSubmitted(true);

    // After submission, wait 2 seconds then navigate back to leaderboard
    setTimeout(() => {
      navigate("/leaderboard");
    }, 2000);
  };

  const goBack = () => {
    navigate("/leaderboard");
  };

  if (loading) {
    return (
      <div className="project-rating-container">
        <div className="project-loading">
          <div className="loading-spinner"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-rating-container">
        <div className="project-error">
          <h2>Project Not Found</h2>
          <p>
            The project you're looking for doesn't exist or may have been
            removed.
          </p>
          <button onClick={goBack} className="back-button">
            <ArrowLeft size={16} />
            Back to Leaderboard
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="project-rating-container">
        <div className="rating-success">
          <div className="success-animation">
            <Award size={48} className="success-icon" />
          </div>
          <h2>Thank You!</h2>
          <p>Your rating has been submitted successfully.</p>
          <p>Redirecting to leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-rating-container">
      <div className="rating-header">
        <button onClick={goBack} className="back-button">
          <ArrowLeft size={16} />
          Back to Leaderboard
        </button>
        <h1>Rate Project</h1>
      </div>

      <div className="project-preview">
        <div className="project-image">
          <img src={project.screenshot} alt={project.name} />
        </div>

        <div className="project-details">
          <div className="project-title-section">
            <h2>{project.name}</h2>
            <span className="day-tag">Day {project.day}</span>
          </div>

          <div className="project-meta">
            <div className="submitter">
              <img
                className="submitter-avatar"
                src={project.submitterAvatar}
                alt={project.submittedBy}
              />
              <span>{project.submittedBy}</span>
            </div>
            <div className="submission-date">
              Submitted on{" "}
              {new Date(project.submittedDate).toLocaleDateString()}
            </div>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-label">Frameworks:</span>
              <span className="tech-value">{project.frameworks}</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Languages:</span>
              <span className="tech-value">{project.languages}</span>
            </div>
          </div>

          <div className="project-links">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link live"
            >
              View Live Project
            </a>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link repo"
            >
              GitHub Repository
            </a>
          </div>

          <div className="current-rating">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= project.currentRating ? "star filled" : "star"
                  }
                  fill={star <= project.currentRating ? "#ffc107" : "none"}
                />
              ))}
            </div>
            <span className="rating-value">
              {project.currentRating.toFixed(1)}
            </span>
            <span className="rating-count">
              ({project.ratingCount} ratings)
            </span>
          </div>

          <div className="project-actions">
            <button className="action-button">
              <ThumbsUp size={16} />
              Like
            </button>
            <button className="action-button">
              <MessageSquare size={16} />
              Comment
            </button>
            <button className="action-button">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="rating-form-container">
        <h3>Rate This Project</h3>
        <form onSubmit={handleSubmit} className="rating-form">
          <div className="criteria-ratings">
            <div className="criteria-item">
              <label>Functionality</label>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={
                      star <=
                      (criteria.functionality || hover === "functionality"
                        ? hover
                        : 0)
                        ? "star interactive filled"
                        : "star interactive"
                    }
                    onClick={() => handleCriteriaChange("functionality", star)}
                    onMouseEnter={() => setHover({ functionality: star })}
                    onMouseLeave={() => setHover(0)}
                    fill={star <= criteria.functionality ? "#ffc107" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="criteria-item">
              <label>Design & UI</label>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={
                      star <=
                      (criteria.design || hover === "design" ? hover : 0)
                        ? "star interactive filled"
                        : "star interactive"
                    }
                    onClick={() => handleCriteriaChange("design", star)}
                    onMouseEnter={() => setHover({ design: star })}
                    onMouseLeave={() => setHover(0)}
                    fill={star <= criteria.design ? "#ffc107" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="criteria-item">
              <label>Creativity & Innovation</label>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={
                      star <=
                      (criteria.creativity || hover === "creativity"
                        ? hover
                        : 0)
                        ? "star interactive filled"
                        : "star interactive"
                    }
                    onClick={() => handleCriteriaChange("creativity", star)}
                    onMouseEnter={() => setHover({ creativity: star })}
                    onMouseLeave={() => setHover(0)}
                    fill={star <= criteria.creativity ? "#ffc107" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="criteria-item">
              <label>Code Quality</label>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={
                      star <= (criteria.code || hover === "code" ? hover : 0)
                        ? "star interactive filled"
                        : "star interactive"
                    }
                    onClick={() => handleCriteriaChange("code", star)}
                    onMouseEnter={() => setHover({ code: star })}
                    onMouseLeave={() => setHover(0)}
                    fill={star <= criteria.code ? "#ffc107" : "none"}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="overall-rating">
            <label>Overall Rating</label>
            <div className="stars-input large">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={
                    star <= (rating || hover)
                      ? "star interactive filled"
                      : "star interactive"
                  }
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  fill={star <= rating ? "#ffc107" : "none"}
                />
              ))}
            </div>
          </div>

          <div className="comment-input">
            <label htmlFor="comment">Comments (Optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this project..."
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-rating-button"
            disabled={Object.values(criteria).some((val) => val === 0)}
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectRating;
