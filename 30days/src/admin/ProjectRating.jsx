import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  Check,
  X,
  Code,
  ExternalLink,
  GitHub,
  Calendar,
  Clock,
  Award,
  MessageSquare,
  AlertCircle,
} from "react-feather";
import "./ProjectRating.css";

const ProjectRating = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Rating state with the exact criteria names we need for the backend
  const [ratingState, setRatingState] = useState({
    criteria: {
      functionality: { value: 0, hover: 0 },
      design: { value: 0, hover: 0 },
      innovation: { value: 0, hover: 0 }, // This represents "Creativity" in the UI
      codeQuality: { value: 0, hover: 0 },
      completeness: { value: 0, hover: 0 }, // This represents "Usability" in the UI
    },
    feedback: "",
  });

  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get admin token from localStorage
        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/login", {
            state: { from: `/admin/rate-project/${projectId}` },
          });
          return;
        }

        // Fetch project data from API
        const response = await axios.get(
          `${API_URL}/api/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProject(response.data.project);
        } else {
          setError(response.data.message || "Failed to load project details");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Unable to load project information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate, API_URL]);

  // Calculate average rating from criteria
  const calculateAverageRating = () => {
    const criteriaValues = Object.values(ratingState.criteria).map(
      (criterion) => criterion.value
    );
    const sum = criteriaValues.reduce((total, value) => total + value, 0);
    const average = sum / criteriaValues.length;
    return average === 0 ? 0 : parseFloat(average.toFixed(1));
  };

  // Handle star rating selection for criteria
  const handleCriteriaRating = (criterion, rating) => {
    setRatingState((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [criterion]: {
          ...prev.criteria[criterion],
          value: rating,
        },
      },
    }));
  };

  // Handle star rating hover for criteria
  const handleCriteriaHover = (criterion, hover) => {
    setRatingState((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [criterion]: {
          ...prev.criteria[criterion],
          hover: hover,
        },
      },
    }));
  };

  // Handle feedback text change
  const handleFeedbackChange = (e) => {
    setRatingState((prev) => ({
      ...prev,
      feedback: e.target.value,
    }));
  };
  // Check if any criterion has been rated
  const hasRating = Object.values(ratingState.criteria).some(
    (criterion) => criterion.value > 0
  );

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Validate form - check if at least one rating is provided
      const hasRating = Object.values(ratingState.criteria).some(
        (criterion) => criterion.value > 0
      );

      if (!hasRating) {
        setError("Please provide ratings for at least one criterion");
        setSubmitting(false);
        return;
      }

      // Get admin token
      const token = localStorage.getItem("adminToken");

      // Prepare the rating data - extract just the values
      const criteriaValues = {};
      Object.entries(ratingState.criteria).forEach(([key, data]) => {
        criteriaValues[key] = data.value;
      });

      const ratingData = {
        projectId,
        criteria: criteriaValues,
        feedback: ratingState.feedback,
      };

      // Submit rating to API
      // In ProjectRating.js, update handleSubmit
      const response = await axios.post(
        `${API_URL}/api/ratings/submit`,
        ratingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSubmitted(true);
        // Redirect after successful submission with delay
        setTimeout(() => {
          navigate("/admin/submissions");
        }, 2500);
      } else {
        setError(response.data.message || "Failed to submit rating");
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars for rating
  const renderStars = (value, hoverValue, size, onSelect, onHover, onLeave) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starValue = index + 1;
        const isFilled =
          hoverValue >= starValue || (!hoverValue && value >= starValue);

        return (
          <Star
            key={index}
            size={size}
            className={`pr-rating-star ${isFilled ? "pr-filled" : ""} ${
              onSelect ? "pr-interactive" : ""
            }`}
            onClick={() => onSelect && onSelect(starValue)}
            onMouseEnter={() => onHover && onHover(starValue)}
            onMouseLeave={() => onLeave && onLeave(0)}
          />
        );
      });
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="pr-project-rating-container">
        <div className="pr-project-loading">
          <div className="pr-loading-spinner"></div>
          <h2>Loading Project</h2>
          <p>Please wait while we retrieve the project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !project) {
    return (
      <div className="pr-project-rating-container">
        <div className="pr-project-error">
          <AlertCircle size={48} className="pr-error-icon" />
          <h2>Project Not Found</h2>
          <p>{error}</p>
          <button
            className="pr-action-button pr-primary"
            onClick={() => navigate("/admin/submissions")}
          >
            <ArrowLeft size={16} /> Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="pr-project-rating-container">
        <div className="pr-rating-success">
          <div className="pr-success-animation">
            <Check size={48} className="pr-success-icon" />
          </div>
          <h2>Rating Submitted Successfully!</h2>
          <p>
            Your evaluation has been recorded. Average rating:{" "}
            {calculateAverageRating()}
          </p>
          <p className="pr-redirect-message">
            Redirecting to the submissions page...
          </p>
        </div>
      </div>
    );
  }

  // Extract student details from project
  const studentName =
    project?.user?.fullName || project?.user?.username || "Unknown Student";
  const studentAvatar =
    project?.user?.profileImage ||
    `https://i.pravatar.cc/150?img=${project?._id?.substring(0, 6) || "1"}`;

  // Calculate the average rating for display
  const averageRating = calculateAverageRating();

  return (
    <div className="pr-project-rating-container">
      {/* Header */}
      <div className="pr-rating-header">
        <button
          className="pr-back-button"
          onClick={() => navigate("/admin/submissions")}
        >
          <ArrowLeft size={16} /> Back to Submissions
        </button>
        <h1>Project Evaluation</h1>
      </div>

      {/* Project Preview */}
      <div className="pr-project-preview">
        <div className="pr-project-image">
          <img
            src={
              project?.imageUrl ||
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
            alt={project?.projectName}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>
        <div className="pr-project-details">
          <div className="pr-project-title-section">
            <h2>{project?.projectName}</h2>
            <span className="pr-day-tag">Day {project?.day}</span>
          </div>

          <div className="pr-project-meta">
            <div className="pr-submitter">
              <img
                src={studentAvatar}
                alt={studentName}
                className="pr-submitter-avatar"
              />
              <span>{studentName}</span>
            </div>
            <div className="pr-submission-date">
              <Clock size={14} />{" "}
              {formatDate(project?.submissionDate || project?.createdAt)}
            </div>
          </div>

          <p className="pr-project-description">{project?.description}</p>

          <div className="pr-tech-stack">
            <div className="pr-tech-item">
              <span className="pr-tech-label">Languages:</span>
              <span className="pr-tech-value">{project?.languages}</span>
            </div>
            {project?.frameworks && (
              <div className="pr-tech-item">
                <span className="pr-tech-label">Frameworks:</span>
                <span className="pr-tech-value">{project?.frameworks}</span>
              </div>
            )}
          </div>

          <div className="pr-project-links">
            {project?.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pr-project-link pr-live"
              >
                <ExternalLink size={16} /> View Demo
              </a>
            )}
            {project?.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pr-project-link pr-repo"
              >
                <GitHub size={16} /> View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Rating Form */}
      <div className="pr-rating-form-container">
        <h3>Rate This Project</h3>

        <div className="pr-rating-form">
          {/* Overall Rating Display (calculated from criteria) */}
          {averageRating > 0 && (
            <div className="pr-overall-rating">
              <label>Overall Rating: {averageRating.toFixed(1)}/5</label>
              <div className="pr-stars-display">
                {renderStars(averageRating, 0, 24, null, null, null)}
              </div>
            </div>
          )}

          {/* Criteria Ratings */}
          <div className="pr-criteria-ratings">
            {[
              { key: "functionality", label: "Functionality" },
              { key: "design", label: "Design" },
              { key: "innovation", label: "Creativity" },
              { key: "codeQuality", label: "Code Quality" },
              { key: "completeness", label: "Usability" },
            ].map(({ key, label }) => (
              <div key={key} className="pr-criteria-item">
                <label>{label}</label>
                <div className="pr-stars-input">
                  {renderStars(
                    ratingState.criteria[key].value,
                    ratingState.criteria[key].hover,
                    20,
                    (rating) => handleCriteriaRating(key, rating),
                    (hover) => handleCriteriaHover(key, hover),
                    () => handleCriteriaHover(key, 0)
                  )}
                </div>
                {ratingState.criteria[key].value > 0 && (
                  <span className="pr-rating-value">
                    {ratingState.criteria[key].value}/5
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="pr-comment-input">
            <label>Feedback & Comments</label>
            <textarea
              value={ratingState.feedback}
              onChange={handleFeedbackChange}
              placeholder="Provide constructive feedback about this project..."
              rows="5"
            ></textarea>
          </div>

          {/* Error Message */}
          {error && (
            <div className="pr-rating-error-message">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="pr-submit-rating-button"
            onClick={handleSubmit}
            disabled={submitting || !hasRating}
          >
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectRating;
