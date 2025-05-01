import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiExternalLink,
  FiGithub,
  FiClock,
  FiUser,
  FiMail,
  FiCalendar,
  FiBox,
} from "react-icons/fi";
import axios from "axios";

// Contained styles to avoid global variable dependencies
const UserStyles = () => {
  return (
    <style jsx>{`
      .users-page {
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
        background-color: #f5f7fa;
      }

      @media (min-width: 768px) {
        .users-page {
          padding: 2rem;
        }
      }

      .users-header {
        margin-bottom: 2rem;
        text-align: center;
      }

      .users-header h2 {
        font-size: 1.75rem;
        font-weight: 600;
        color: #2c3e50;
      }

      .users-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      @media (min-width: 768px) {
        .users-grid {
          gap: 1.5rem;
        }
      }

      .user-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .user-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      .user-summary {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        cursor: pointer;
      }

      @media (min-width: 640px) {
        .user-summary {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        width: 100%;
      }

      @media (min-width: 640px) {
        .user-info {
          margin-bottom: 0;
          width: auto;
        }
      }

      .avatar-container {
        position: relative;
        flex-shrink: 0;
        width: 60px;
        height: 60px;
      }

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #f0f0f0;
        background-color: #f8f8f8;
      }

      .user-initials {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
        border: 2px solid #f0f0f0;
      }

      .user-details {
        flex: 1;
        min-width: 0;
      }

      .user-name {
        margin: 0 0 0.25rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c3e50;
      }

      .user-email {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin: 0 0 0.5rem;
        font-size: 0.875rem;
        color: #5d6778;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .user-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        font-size: 0.75rem;
        color: #7f8c9d;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: black;
      }

      .user-status {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.5rem;
      }

      @media (min-width: 640px) {
        .user-status {
          margin-top: 0;
        }
      }

      .status-badge {
        padding: 0.25rem 0.625rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
        white-space: nowrap;
      }

      .status-badge.active {
        background-color: #e6f7eb;
        color: #1e7c45;
      }

      .status-badge.inactive {
        background-color: #fbe9e7;
        color: #c62828;
      }

      .status-badge.pending {
        background-color: #fff8e1;
        color: #ff8f00;
      }

      .expand-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 50%;
        background: #f5f5f5;
        color: #555;
        transition: all 0.2s ease;
      }

      .expand-icon.active {
        background: #ebebeb;
        transform: rotate(180deg);
      }

      .user-projects {
        padding: 0 1rem 1rem;
      }

      @media (min-width: 640px) {
        .user-projects {
          padding: 0 1.25rem 1.25rem;
        }
      }

      .projects-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0 1rem;
      }

      .projects-header h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #2c3e50;
      }

      .projects-count {
        font-size: 0.75rem;
        font-weight: 500;
        color: #5d6778;
        background: #f5f5f5;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
      }

      .loading-projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 0;
      }

      .spinner {
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 3px solid #3498db;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        margin-bottom: 0.75rem;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loading-message {
        font-size: 0.875rem;
        color: #5d6778;
      }

      .projects-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .project-item {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 0.75rem;
        transition: all 0.2s ease;
      }

      .project-item:hover {
        background: #f2f2f2;
      }

      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .project-title {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
        color: #2c3e50;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }

      .project-day {
        background: #3498db;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 500;
      }

      .project-links {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .project-link {
        color: #5d6778;
        transition: color 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        text-decoration: none;
        padding: 0.25rem 0.5rem;
        background: #f0f0f0;
        border-radius: 4px;
      }

      .project-link:hover {
        color: #3498db;
        background: #e6e6e6;
      }

      .project-description {
        margin: 0;
        font-size: 0.8rem;
        color: #5d6778;
        line-height: 1.4;
      }

      .no-projects {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        font-size: 0.875rem;
        color: #5d6778;
        margin-bottom: 1rem;
      }

      .view-all-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.625rem 1rem;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
      }

      .view-all-btn:hover {
        background: #2980b9;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 0;
      }

      .loading-container .spinner {
        width: 36px;
        height: 36px;
        margin-bottom: 1rem;
      }

      .loading-container .loading-message {
        font-size: 1rem;
        color: #5d6778;
      }

      .divider {
        height: 1px;
        background: #eaeaea;
        margin: 0.25rem 0 1rem;
      }

      .skeleton {
        position: relative;
        overflow: hidden;
      }

      .skeleton::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        animation: shimmer 1.5s infinite;
        z-index: 1;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      .skeleton-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
      }

      .skeleton-name {
        height: 20px;
        width: 120px;
        background-color: rgba(255, 255, 255, 0.1);
        margin-bottom: 8px;
        border-radius: 4px;
      }

      .skeleton-email {
        height: 16px;
        width: 180px;
        background-color: rgba(255, 255, 255, 0.1);
        margin-bottom: 12px;
        border-radius: 4px;
      }

      .skeleton-meta {
        height: 14px;
        width: 80px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .skeleton-status {
        height: 24px;
        width: 60px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
      }

      .skeleton-expand {
        height: 28px;
        width: 28px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      }

      .skeleton-header {
        height: 20px;
        width: 120px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .skeleton-count {
        height: 20px;
        width: 60px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
      }

      .skeleton-project {
        background-color: rgba(255, 255, 255, 0.05);
      }

      .skeleton-project-title {
        height: 18px;
        width: 70%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .skeleton-project-day {
        height: 20px;
        width: 50px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
      }

      .skeleton-link {
        height: 24px;
        width: 80px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      .skeleton-description {
        height: 16px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        margin-top: 8px;
      }

      .skeleton-button {
        height: 40px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        margin-top: 16px;
      }

      /* Responsive adjustments */
      @media (max-width: 640px) {
        .skeleton-name {
          width: 100px;
        }
        .skeleton-email {
          width: 140px;
        }
        .skeleton-meta {
          width: 60px;
        }
      }
    `}</style>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userProjects, setUserProjects] = useState({});
  const [loadingProjects, setLoadingProjects] = useState({});
  const [userSubmissionsCount, setUserSubmissionsCount] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState({});
  const navigate = useNavigate();

  // Maximum number of projects to display per user
  const MAX_PROJECTS_TO_DISPLAY = 2;

  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  useEffect(() => {
    const fetchUsersAndCounts = async () => {
      try {
        setLoadingCounts(true);
        const usersResponse = await axios.get(`${API_URL}/api/auth/users`, {
          withCredentials: true,
        });
        const usersData = usersResponse.data;
        setUsers(usersData);

        // Initialize counts with existing submissions data (fallback)
        const initialCounts = {};
        usersData.forEach((user) => {
          initialCounts[user._id] = user.submissions || 0;
        });
        setUserSubmissionsCount(initialCounts);

        // Fetch accurate counts in the background
        const updatedCounts = {};
        await Promise.all(
          usersData.map(async (user) => {
            try {
              const countResponse = await axios.get(
                `${API_URL}/api/projects/user/${user._id}/count`,
                { withCredentials: true }
              );
              updatedCounts[user._id] = countResponse.data.count || 0;
            } catch (err) {
              updatedCounts[user._id] = initialCounts[user._id];
            }
          })
        );
        setUserSubmissionsCount(updatedCounts);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingCounts(false);
      }
    };

    fetchUsersAndCounts();
  }, [API_URL]);

  useEffect(() => {
    if (expandedUserId && !userProjects[expandedUserId]) {
      fetchUserProjects(expandedUserId);
    }
  }, [expandedUserId, userProjects]);

  const fetchUserProjects = async (userId) => {
    setLoadingProjects((prev) => ({ ...prev, [userId]: true }));

    try {
      const projectsResponse = await axios.get(
        `${API_URL}/api/projects/user/${userId}`,
        {
          withCredentials: true,
        }
      );

      setUserProjects((prev) => ({
        ...prev,
        [userId]: projectsResponse.data.projects || [],
      }));
    } catch (err) {
      console.error("Error fetching user projects:", err);
      setUserProjects((prev) => ({
        ...prev,
        [userId]: [],
      }));
    } finally {
      setLoadingProjects((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const toggleUserExpansion = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleImageError = (userId) => {
    setAvatarLoadError((prev) => ({ ...prev, [userId]: true }));
  };

  // Generate user initials from full name
  const getUserInitials = (fullName) => {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2);
  };

  // Generate a consistent color based on user ID
  const getInitialsBackgroundColor = (userId) => {
    const colors = [
      "#3498db", // Blue
      "#2ecc71", // Green
      "#e74c3c", // Red
      "#f39c12", // Orange
      "#9b59b6", // Purple
      "#1abc9c", // Teal
      "#d35400", // Dark Orange
      "#c0392b", // Dark Red
      "#8e44ad", // Dark Purple
      "#16a085", // Dark Teal
    ];

    // Generate a simple hash from userId to pick a consistent color
    let hash = 0;
    if (userId) {
      for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
      }
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  const UserCardSkeleton = () => (
    <div className="user-card skeleton">
      <div className="user-summary">
        <div className="user-info">
          <div className="avatar-container">
            <div className="skeleton-avatar"></div>
          </div>
          <div className="user-details">
            <div className="skeleton-name"></div>
            <div className="skeleton-email"></div>
            <div className="user-meta">
              <div className="skeleton-meta"></div>
              <div className="skeleton-meta"></div>
            </div>
          </div>
        </div>
        <div className="user-status">
          <div className="skeleton-status"></div>
          <div className="skeleton-expand"></div>
        </div>
      </div>
    </div>
  );

  const ProjectsSkeleton = () => (
    <div className="user-projects skeleton">
      <div className="divider"></div>
      <div className="projects-header">
        <div className="skeleton-header"></div>
        <div className="skeleton-count"></div>
      </div>
      <div className="projects-list">
        {[1, 2].map((i) => (
          <div key={i} className="project-item skeleton-project">
            <div className="project-header">
              <div className="skeleton-project-title"></div>
              <div className="skeleton-project-day"></div>
            </div>
            <div className="project-links">
              <div className="skeleton-link"></div>
              <div className="skeleton-link"></div>
            </div>
            <div className="skeleton-description"></div>
          </div>
        ))}
      </div>
      <div className="skeleton-button"></div>
    </div>
  );

  const renderSkeletonLoader = () => (
    <div className="users-grid">
      {[1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={i}>
          <UserCardSkeleton />
          {/* Randomly show expanded projects for some cards */}
          {i % 2 === 0 && <ProjectsSkeleton />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="users-page">
      <UserStyles />
      <div className="users-header">
        <h2>User Management</h2>
      </div>

      {loadingCounts ? (
        renderSkeletonLoader()
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div
                className="user-summary"
                onClick={() => toggleUserExpansion(user._id)}
              >
                <div className="user-info">
                  <div className="avatar-container">
                    {!avatarLoadError[user._id] ? (
                      <img
                        src={`https://i.pravatar.cc/150?img=${user._id}`}
                        alt={user.fullName}
                        className="user-avatar"
                        onError={() => handleImageError(user._id)}
                      />
                    ) : (
                      <div
                        className="user-initials"
                        style={{
                          backgroundColor: getInitialsBackgroundColor(user._id),
                        }}
                      >
                        {getUserInitials(user.fullName)}
                      </div>
                    )}
                  </div>
                  <div className="user-details">
                    <h3 className="user-name">{user.fullName}</h3>
                    <p className="user-email">
                      <FiMail size={12} />
                      {user.email}
                    </p>
                    <div className="user-meta">
                      <span className="meta-item">
                        <FiCalendar size={12} />
                        {formatDate(user.createdAt)}
                      </span>
                      <span className="meta-item">
                        <FiBox size={12} />
                        {userSubmissionsCount[user._id] ?? 0} submissions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="user-status">
                  <span className={`status-badge ${user.status || "active"}`}>
                    {user.status || "active"}
                  </span>
                  <span
                    className={`expand-icon ${
                      expandedUserId === user._id ? "active" : ""
                    }`}
                  >
                    {expandedUserId === user._id ? "−" : "+"}
                  </span>
                </div>
              </div>

              {expandedUserId === user._id && (
                <div className="user-projects">
                  <div className="divider"></div>
                  <div className="projects-header">
                    <h4>Recent Projects</h4>
                    <span className="projects-count">
                      {userProjects[user._id]?.length || 0} projects
                    </span>
                  </div>

                  {loadingProjects[user._id] ? (
                    <ProjectsSkeleton />
                  ) : (
                    <>
                      {userProjects[user._id]?.length > 0 ? (
                        <div className="projects-list">
                          {/* Display only the first MAX_PROJECTS_TO_DISPLAY projects */}
                          {userProjects[user._id]
                            .slice(0, MAX_PROJECTS_TO_DISPLAY)
                            .map((project) => (
                              <div key={project._id} className="project-item">
                                <div className="project-header">
                                  <h5 className="project-title">
                                    {project.projectName}
                                  </h5>
                                  <span className="project-day">
                                    Day {project.day}
                                  </span>
                                </div>
                                <div className="project-links">
                                  {project.liveLink && (
                                    <a
                                      href={project.liveLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="project-link"
                                    >
                                      <FiExternalLink size={12} />
                                      Live Demo
                                    </a>
                                  )}
                                  {project.repoLink && (
                                    <a
                                      href={project.repoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="project-link"
                                    >
                                      <FiGithub size={12} />
                                      Repository
                                    </a>
                                  )}
                                </div>
                                <p className="project-description">
                                  {project.description.length > 100
                                    ? `${project.description.substring(
                                        0,
                                        100
                                      )}...`
                                    : project.description}
                                </p>
                              </div>
                            ))}

                          {/* Show additional projects message if there are more */}
                          {userProjects[user._id].length >
                            MAX_PROJECTS_TO_DISPLAY && (
                            <div
                              className="project-item"
                              style={{ textAlign: "center" }}
                            >
                              <p className="project-description">
                                {userProjects[user._id].length -
                                  MAX_PROJECTS_TO_DISPLAY}{" "}
                                more project
                                {userProjects[user._id].length -
                                  MAX_PROJECTS_TO_DISPLAY !==
                                1
                                  ? "s"
                                  : ""}{" "}
                                not shown
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="no-projects">
                          <p>No recent projects found</p>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    className="view-all-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/users/${user._id}/projects`);
                    }}
                  >
                    View All Projects
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
