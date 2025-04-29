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
      }

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #f0f0f0;
        background-color: #f8f8f8;
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
  const navigate = useNavigate();

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
              console.error(`Error fetching count for user ${user._id}:`, err);
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
  }, [expandedUserId, userProjects, API_URL]);

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
      console.error(`Error fetching projects for user ${userId}:`, err);
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

  const handleImageError = (e) => {
    e.target.src = "https://i.pravatar.cc/150?img=3";
  };

  return (
    <div className="users-page">
      <UserStyles />
      <div className="users-header">
        <h2>User Management</h2>
      </div>

      {loadingCounts ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-message">Loading user data...</p>
        </div>
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
                    <img
                      src={`https://i.pravatar.cc/150?img=${user._id}`}
                      alt={user.fullName}
                      className="user-avatar"
                      onError={handleImageError}
                    />
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
                    <div className="loading-projects">
                      <div className="spinner"></div>
                      <p className="loading-message">Loading projects...</p>
                    </div>
                  ) : (
                    <>
                      {userProjects[user._id]?.length > 0 ? (
                        <div className="projects-list">
                          {userProjects[user._id].map((project) => (
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
