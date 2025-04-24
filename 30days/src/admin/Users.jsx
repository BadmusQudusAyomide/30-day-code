import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiExternalLink, FiGithub, FiClock } from "react-icons/fi";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userProjects, setUserProjects] = useState({});
  const [loadingProjects, setLoadingProjects] = useState({});
  const [userSubmissionsCount, setUserSubmissionsCount] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

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
  }, []);

  useEffect(() => {
    if (expandedUserId && !userProjects[expandedUserId]) {
      fetchUserProjects(expandedUserId);
    }
  }, [expandedUserId]);

  
  const fetchUserProjects = async (userId) => {
    setLoadingProjects((prev) => ({ ...prev, [userId]: true }));

    try {
      const [projectsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/projects/user/${userId}`, {
          withCredentials: true,
        }),
      ]);

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
    <div className="users-page-container">
      <div className="page-header">
        <h2>User Management</h2>
      </div>

      {loadingCounts ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      ) : (
        <div className="users-container">
          {users.map((user) => (
            <div key={user._id} className="user-card glass-card">
              <div
                className="user-summary"
                onClick={() => toggleUserExpansion(user._id)}
              >
                <div className="user-info">
                  <img
                    src={`https://i.pravatar.cc/150?img=${user._id}`}
                    alt={user.fullName}
                    className="user-avatar"
                    onError={handleImageError}
                  />
                  <div className="user-details">
                    <h3 className="user-name">{user.fullName}</h3>
                    <p className="user-email">{user.email}</p>
                    <div className="user-meta">
                      <span>Joined: {formatDate(user.createdAt)}</span>
                      <span>
                        Submissions: {userSubmissionsCount[user._id] ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="user-status">
                  <span className={`status-badge ${user.status || "active"}`}>
                    {user.status || "active"}
                  </span>
                  <span className="expand-icon">
                    {expandedUserId === user._id ? "−" : "+"}
                  </span>
                </div>
              </div>

              {expandedUserId === user._id && (
                <div className="user-projects">
                  <h4>Recent Projects</h4>
                  {loadingProjects[user._id] ? (
                    <div className="loading-projects">
                      <div className="spinner"></div>
                      <p>Loading projects...</p>
                    </div>
                  ) : (
                    <>
                      {userProjects[user._id]?.length > 0 ? (
                        <div className="projects-list">
                          {" "}
                          {/* Changed from projects-grid */}
                          {userProjects[user._id].map((project) => (
                            <div
                              key={project._id}
                              className="compact-project-card"
                            >
                              {" "}
                              {/* Changed class */}
                              <div className="compact-project-header">
                                <h5>{project.projectName}</h5>
                                <span className="compact-day-badge">
                                  Day {project.day}
                                </span>
                              </div>
                              <div className="compact-project-links">
                                {project.liveLink && (
                                  <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="compact-link"
                                  >
                                    <FiExternalLink className="link-icon" />
                                  </a>
                                )}
                                {project.repoLink && (
                                  <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="compact-link"
                                  >
                                    <FiGithub className="link-icon" />
                                  </a>
                                )}
                              </div>
                              <p className="compact-project-description">
                                {project.description.length > 60
                                  ? `${project.description.substring(0, 60)}...`
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
                    className="btn btn-primary view-all-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/users/${user._id}/projects`); // Use absolute path
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
