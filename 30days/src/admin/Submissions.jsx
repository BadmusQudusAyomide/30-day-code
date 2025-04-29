import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiX,
  FiMessageSquare,
  FiEye,
  FiClock,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import "./Submissions.css";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch projects with user data populated
      const response = await axios.get(`${API_URL}/api/projects/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          populate: "user", // Ensure user data is populated
        },
      });

      if (response.data.success) {
        const submissionsData = response.data.projects.map((project) => ({
          ...project,
          status: project.status || "submitted",
          submittedAt: project.submissionDate || project.createdAt,
          // Ensure user object exists and has basic structure
          user: project.user
            ? {
                _id: project.user._id,
                username: project.user.username || "unknown",
                fullName: project.user.fullName,
                profileImage: project.user.profileImage,
                email: project.user.email,
              }
            : {
                _id: "unknown",
                username: "unknown",
                fullName: "Unknown User",
                profileImage: null,
                email: "unknown@example.com",
              },
        }));

        // Apply filter
        const filtered = submissionsData.filter((sub) => {
          if (filter === "all") return true;
          return sub.status === filter;
        });

        setSubmissions(filtered);
      } else {
        setError(response.data.message || "Failed to fetch submissions");
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);
  const handleAction = async (submissionId, action) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // Using your existing project update endpoint
      const response = await axios.put(
        `${API_URL}/api/projects/${submissionId}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the local state to reflect the change
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub._id === submissionId ? { ...sub, status: action } : sub
          )
        );
      } else {
        setError(response.data.message || `Failed to ${action} submission`);
      }
    } catch (err) {
      console.error(`Error ${action} submission:`, err);
      setError(`Failed to ${action} submission. Please try again.`);
    }
  };

  const viewSubmissionDetails = (submissionId) => {
    navigate(`/admin/projects/${submissionId}`);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Unknown time";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getUserAvatar = (user) => {
    if (user?.profileImage) {
      return `${API_URL}/${user.profileImage}`;
    }
    // Return a default avatar based on user initials if no profile image
    const initials = user?.fullName 
      ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
      : 'UU';
    return `https://ui-avatars.com/api/?name=${initials}&background=random&size=128`;
  };

  return (
    <div className="submissions-container">
      <div className="submissions-header">
        <h2>Recent Submissions</h2>
        <div className="submissions-controls">
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "submitted" ? "active" : ""}
              onClick={() => setFilter("submitted")}
            >
              Pending
            </button>
            <button
              className={filter === "approved" ? "active" : ""}
              onClick={() => setFilter("approved")}
            >
              Approved
            </button>
            <button
              className={filter === "rejected" ? "active" : ""}
              onClick={() => setFilter("rejected")}
            >
              Rejected
            </button>
          </div>
          <button
            className="refresh-button"
            onClick={fetchSubmissions}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? "spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading submissions...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="empty-state">
          <p>No submissions found</p>
          {filter !== "all" && (
            <button onClick={() => setFilter("all")}>
              Show all submissions
            </button>
          )}
        </div>
      ) : (
        <div className="submissions-list">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className={`submission-card ${submission.status}`}
            >
              <div className="submission-header">
                <div className="user-info">
                  {submission.user?.profileImage ? (
                    <img
                      src={getUserAvatar(submission.user)}
                      alt={submission.user.username}
                      className="user-avatar"
                      onError={(e) => {
                        e.target.src = getUserAvatar({
                          ...submission.user,
                          profileImage: null,
                        });
                      }}
                    />
                  ) : (
                    <div className="avatar-fallback">
                      {submission.user?.fullName
                        ? submission.user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "UU"}
                    </div>
                  )}
                  <div>
                    <div className="username">
                      @{submission.user?.username || "unknown"}
                      {submission.user?.fullName && (
                        <span className="full-name">
                          {" "}
                          ({submission.user.fullName})
                        </span>
                      )}
                    </div>
                    <div className="submission-time">
                      <FiClock /> {formatTime(submission.submittedAt)}
                    </div>
                  </div>
                </div>
                <div className="submission-day">Day {submission.day}</div>
              </div>

              <div className="submission-content">
                <h3>{submission.projectName}</h3>
                <p>{submission.description}</p>

                {submission.imageUrl && (
                  <div className="attachments">
                    <a
                      href={submission.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="attachment"
                    >
                      Project Screenshot
                    </a>
                  </div>
                )}
              </div>

              <div className="submission-footer">
                <div className="submission-links">
                  {submission.liveLink && (
                    <a
                      href={submission.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-button"
                    >
                      Live Demo
                    </a>
                  )}
                  {submission.repoLink && (
                    <a
                      href={submission.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-button"
                    >
                      View Code
                    </a>
                  )}
                </div>

                <div className="submission-actions">
                  {submission.status === "submitted" && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => handleAction(submission._id, "approved")}
                      >
                        <FiCheck /> Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleAction(submission._id, "rejected")}
                      >
                        <FiX /> Reject
                      </button>
                    </>
                  )}
                  <button
                    className="details-button"
                    onClick={() => viewSubmissionDetails(submission._id)}
                  >
                    <FiEye /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;
