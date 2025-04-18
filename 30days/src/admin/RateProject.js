import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

const RateProject = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the rating to your backend
    console.log("Rating submitted:", { userId, projectId, rating, feedback });
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="rating-container glass-card">
      <h2>Rate Project</h2>
      <p className="rating-subtitle">Rating project #{projectId} by user #{userId}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star ${rating >= star ? "active" : ""}`}
              onClick={() => setRating(star)}
            >
              <i className="fas fa-star"></i>
            </button>
          ))}
        </div>
        
        <div className="form-group">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            className="input-field"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            placeholder="Provide detailed feedback..."
          />
        </div>
        
        <div className="rating-actions">
          <button 
            type="button" 
            className="btn btn-neumorphic"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  );
};

export default RateProject;