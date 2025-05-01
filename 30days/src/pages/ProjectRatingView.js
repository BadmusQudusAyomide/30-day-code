import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ArrowLeft, MessageSquare } from "react-feather";

// Using CSS Modules to prevent global CSS conflicts
import styles from "./ProjectRatingView.module.css";

const ProjectRatingView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const [projectRes, ratingsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/ratings/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (projectRes.data.success && ratingsRes.data.success) {
          setProject(projectRes.data.project);
          // Calculate proper average rating for each rating item
          const ratingsWithProperAverage = ratingsRes.data.ratings.map(
            (rating) => {
              const criteriaValues = Object.values(rating.criteria);
              const sum = criteriaValues.reduce((acc, val) => acc + val, 0);
              const average = sum / criteriaValues.length;
              return {
                ...rating,
                averageRating: average,
              };
            }
          );
          setRatings(ratingsWithProperAverage);
        } else {
          setError("Failed to load project data");
        }
      } catch (err) {
        setError("Error loading project details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, API_URL]);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starValue = index + 1;
        const isFilled = rating >= starValue;
        const isHalf = rating >= starValue - 0.5 && rating < starValue;

        return (
          <span key={index} className={styles.starContainer}>
            <Star
              size={18}
              className={`${styles.ratingStar} ${
                isFilled ? styles.filled : ""
              }`}
              fill={isFilled ? "currentColor" : "none"}
            />
            {isHalf && (
              <div className={styles.halfStar} style={{ width: "50%" }}>
                <Star
                  size={18}
                  className={`${styles.ratingStar} ${styles.filled}`}
                  fill="currentColor"
                />
              </div>
            )}
          </span>
        );
      });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft size={16} /> Back to Projects
        </button>
        <h1 className={styles.title}>Project Feedback</h1>
        <h2 className={styles.projectName}>{project?.projectName}</h2>
      </div>

      {ratings.length === 0 ? (
        <div className={styles.noRatings}>
          <MessageSquare size={48} className={styles.noRatingsIcon} />
          <p>No feedback available yet</p>
        </div>
      ) : (
        <div className={styles.ratingsList}>
          {ratings.map((rating) => (
            <div key={rating._id} className={styles.ratingItem}>
              <div className={styles.ratingHeader}>
                <h3 className={styles.feedbackTitle}>Admin Feedback</h3>
                <div className={styles.overallRating}>
                  <span>Overall: {rating.averageRating.toFixed(1)}/5</span>
                  <div className={styles.stars}>
                    {renderStars(rating.averageRating)}
                    <span className={styles.ratingValue}>
                      {rating.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.criteriaRatings}>
                <div className={styles.criteriaItem}>
                  <span>Functionality:</span>
                  <div className={styles.stars}>
                    {renderStars(rating.criteria.functionality)}
                    <span className={styles.ratingValue}>
                      {rating.criteria.functionality.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaItem}>
                  <span>Design:</span>
                  <div className={styles.stars}>
                    {renderStars(rating.criteria.design)}
                    <span className={styles.ratingValue}>
                      {rating.criteria.design.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaItem}>
                  <span>Creativity:</span>
                  <div className={styles.stars}>
                    {renderStars(rating.criteria.innovation)}
                    <span className={styles.ratingValue}>
                      {rating.criteria.innovation.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaItem}>
                  <span>Code Quality:</span>
                  <div className={styles.stars}>
                    {renderStars(rating.criteria.codeQuality)}
                    <span className={styles.ratingValue}>
                      {rating.criteria.codeQuality.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaItem}>
                  <span>Usability:</span>
                  <div className={styles.stars}>
                    {renderStars(rating.criteria.completeness)}
                    <span className={styles.ratingValue}>
                      {rating.criteria.completeness.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {rating.feedback && (
                <div className={styles.feedback}>
                  <h4 className={styles.commentsTitle}>Comments:</h4>
                  <p className={styles.commentsText}>{rating.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectRatingView;
