import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./AdminProjectList.css";

import axios from "axios";
import {
  FiArrowLeft,
  FiSearch,
  FiX,
  FiClock,
  FiExternalLink,
  FiGithub,
  FiStar,
} from "react-icons/fi";

const AdminProjectList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    day: "all",
    search: "",
    language: "all",
  });
  const [expandedProject, setExpandedProject] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/login", {
            state: { from: `/admin/users/${userId}/projects` },
          });
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/projects/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const validProjects = response.data.projects.filter(
            (project) =>
              project.projectName &&
              project.day !== undefined &&
              project.description
          );
          setProjects(validProjects);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId, navigate, API_URL]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesDay =
        filter.day === "all" || project.day === parseInt(filter.day);
      const matchesSearch =
        filter.search === "" ||
        project.projectName
          .toLowerCase()
          .includes(filter.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.search.toLowerCase());
      const matchesLanguage =
        filter.language === "all" ||
        project.languages.toLowerCase().includes(filter.language.toLowerCase());

      return matchesDay && matchesSearch && matchesLanguage;
    });
  }, [projects, filter.day, filter.search, filter.language]);

  const projectsByDay = useMemo(() => {
    return filteredProjects.reduce((acc, project) => {
      if (!acc[project.day]) {
        acc[project.day] = [];
      }
      acc[project.day].push(project);
      return acc;
    }, {});
  }, [filteredProjects]);

  const sortedDays = Object.keys(projectsByDay).sort((a, b) => b - a);
  const days = Array.from(new Set(projects.map((project) => project.day))).sort(
    (a, b) => a - b
  );

  const languages = Array.from(
    new Set(
      projects.flatMap((project) =>
        project.languages.split(",").map((lang) => lang.trim())
      )
    )
  )
    .filter((lang) => lang !== "")
    .sort();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const clearSearch = () => {
    setFilter({
      ...filter,
      search: "",
    });
  };

  const clearAllFilters = () => {
    setFilter({
      day: "all",
      search: "",
      language: "all",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleProjectExpansion = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  };

  const goBack = () => {
    navigate("/admin/users");
  };

  const navigateToRateProject = (projectId) => {
    navigate(`/admin/rate-project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loader"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <div className="admin-error-icon">!</div>
        <h3>Error Loading Projects</h3>
        <p>{error}</p>
        <button
          className="admin-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-project-list">
      <div className="admin-top-navigation">
        <button onClick={goBack} className="admin-back-button">
          <FiArrowLeft />
          <span>Back to Users</span>
        </button>
      </div>

      <div className="admin-header">
        <h2>User Projects</h2>
        <p className="admin-subtitle">
          Viewing all projects for user #{userId}
        </p>
      </div>

      <div className="admin-filter-panel">
        <div className="admin-search-container">
          <FiSearch className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            aria-label="Search projects"
            className="admin-search-input"
          />
          {filter.search && (
            <button
              onClick={clearSearch}
              className="admin-clear-button"
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="admin-filter-controls">
          <div className="admin-filter-group">
            <label htmlFor="language-filter">Language</label>
            <select
              id="language-filter"
              name="language"
              value={filter.language}
              onChange={handleFilterChange}
              className="admin-select"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-filter-group">
            <label htmlFor="day-filter">Day</label>
            <select
              id="day-filter"
              name="day"
              value={filter.day}
              onChange={handleFilterChange}
              className="admin-select"
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
          </div>

          {(filter.search ||
            filter.day !== "all" ||
            filter.language !== "all") && (
            <button onClick={clearAllFilters} className="admin-clear-all">
              Clear All
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">📁</div>
          <h3>No projects found</h3>
          {filter.search ||
          filter.day !== "all" ||
          filter.language !== "all" ? (
            <p>Try adjusting your search or filter criteria</p>
          ) : (
            <p>This user hasn't submitted any projects yet</p>
          )}
        </div>
      ) : (
        <div className="admin-projects-container">
          <div className="admin-projects-summary">
            <p className="admin-total-count">
              Showing {filteredProjects.length} projects
            </p>
          </div>

          {sortedDays.map((day) => (
            <div key={day} className="admin-day-section">
              <div className="admin-day-header">
                <h3>Day {day}</h3>
                <span className="admin-badge">
                  {projectsByDay[day].length} project
                  {projectsByDay[day].length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="admin-projects-grid">
                {projectsByDay[day].map((project) => (
                  <div
                    key={project._id}
                    className={`admin-project-card ${
                      expandedProject === project._id ? "expanded" : ""
                    }`}
                  >
                    <div className="admin-project-image-container">
                      <img
                        src={project.imageUrl}
                        alt={project.projectName}
                        onError={handleImageError}
                        className="admin-project-image"
                      />
                      <div className="admin-day-badge">Day {project.day}</div>
                    </div>

                    <div className="admin-project-content">
                      <div className="admin-project-header">
                        <h4>{project.projectName}</h4>
                        {project.status && (
                          <span
                            className={`admin-status-indicator ${project.status.toLowerCase()}`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>

                      <div className="admin-tag-container">
                        {project.languages.split(",").map((lang, index) => (
                          <span key={index} className="admin-language-tag">
                            {lang.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="admin-project-description">
                        <p>
                          {expandedProject === project._id
                            ? project.description
                            : project.description.length > 120
                            ? `${project.description.substring(0, 120)}...`
                            : project.description}
                        </p>
                        {project.description.length > 120 && (
                          <button
                            onClick={() => toggleProjectExpansion(project._id)}
                            className="admin-text-button"
                          >
                            {expandedProject === project._id
                              ? "Show less"
                              : "Read more"}
                          </button>
                        )}
                      </div>

                      <div className="admin-project-footer">
                        <div className="admin-submission-time">
                          <FiClock />
                          <span>
                            {formatDate(
                              project.submissionDate || project.createdAt
                            )}
                          </span>
                        </div>

                        <div className="admin-project-actions">
                          <div className="admin-primary-action">
                            <button
                              onClick={() => navigateToRateProject(project._id)}
                              className="admin-rate-button"
                            >
                              <FiStar />
                              <span>Rate Project</span>
                            </button>
                          </div>

                          <div className="admin-secondary-actions">
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-demo-link"
                              >
                                <FiExternalLink />
                                <span>Demo</span>
                              </a>
                            )}
                            {project.repoLink && (
                              <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-code-link"
                              >
                                <FiGithub />
                                <span>Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredProjects.length > 5 && (
            <div className="admin-back-to-top">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="admin-back-top-button"
              >
                Back to top
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjectList;
