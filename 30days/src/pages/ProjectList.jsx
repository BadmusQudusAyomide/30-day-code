import React, { useState, useEffect, useMemo } from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiSearch,
  FiX,
  FiClock,
  FiExternalLink,
  FiGithub,
  FiPlus,
} from "react-icons/fi";

const ProjectList = () => {
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

  const API_URL = process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { state: { from: "/projects" } });
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/projects/my-projects`,
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
        console.error("Error fetching projects:", err);
        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate, API_URL]);

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

  return (
    <div className="pl-container">
      <div className="pl-back-navigation">
        <button
          onClick={() => navigate("/dashboard")}
          className="pl-back-button"
        >
          <FiArrowLeft className="pl-icon" />
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/SubmitProject")}
          className="pl-add-project-button"
        >
          <FiPlus className="pl-icon" />
          New Project
        </button>
      </div>

      <div className="pl-header">
        <div className="pl-header-content">
          <h1>My Projects</h1>
          <p className="pl-subtitle">
            Track your progress in the 30-day coding challenge
          </p>
        </div>
      </div>

      <div className="pl-filter-section">
        <div className="pl-filter-controls">
          <div className="pl-search-container">
            <div className="pl-search-input">
              <FiSearch className="pl-search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                name="search"
                value={filter.search}
                onChange={handleFilterChange}
                aria-label="Search projects"
              />
              {filter.search && (
                <button
                  onClick={clearSearch}
                  className="pl-clear-search"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          <div className="pl-filter-group">
            <select
              id="language-filter"
              name="language"
              value={filter.language}
              onChange={handleFilterChange}
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="pl-filter-group">
            <select
              id="day-filter"
              name="day"
              value={filter.day}
              onChange={handleFilterChange}
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
            <button onClick={clearAllFilters} className="pl-clear-filters">
              Clear All
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="pl-loading-state">
          <div className="pl-spinner"></div>
          <p>Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="pl-error-state">
          <div className="pl-error-icon">!</div>
          <h3>Error Loading Projects</h3>
          <p>{error}</p>
          <button
            className="pl-retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="pl-empty-state">
          <div className="pl-empty-icon">📁</div>
          <h3>No projects found</h3>
          {filter.search ||
          filter.day !== "all" ||
          filter.language !== "all" ? (
            <p>Try adjusting your search or filter criteria</p>
          ) : (
            <p>Start by submitting your first project</p>
          )}
          <button
            onClick={() => navigate("/submit-project")}
            className="pl-submit-button"
          >
            <FiPlus className="pl-icon" />
            Submit Your First Project
          </button>
        </div>
      ) : (
        <div className="pl-projects-container">
          <div className="pl-projects-summary">
            <p className="pl-total-count">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {sortedDays.map((day) => (
            <div key={day} className="pl-day-group">
              <div className="pl-day-header">
                <h2>Day {day}</h2>
                <span className="pl-project-count">
                  {projectsByDay[day].length} project
                  {projectsByDay[day].length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="pl-projects-grid">
                {projectsByDay[day].map((project) => (
                  <div
                    key={project._id}
                    className={`pl-project-card ${
                      expandedProject === project._id ? "pl-expanded" : ""
                    }`}
                  >
                    <div className="pl-project-image-container">
                      <img
                        src={project.imageUrl}
                        alt={project.projectName}
                        onError={handleImageError}
                        className="pl-project-image"
                      />
                      <div className="pl-day-indicator">Day {project.day}</div>
                    </div>

                    <div className="pl-project-content">
                      <div className="pl-project-header">
                        <h3>{project.projectName}</h3>
                        {project.status && (
                          <span
                            className={`pl-status-badge pl-${project.status.toLowerCase()}`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>

                      <div className="pl-tags-container">
                        {project.languages.split(",").map((lang, index) => (
                          <span key={index} className="pl-language-tag">
                            {lang.trim()}
                          </span>
                        ))}
                      </div>

                      <p className="pl-project-description">
                        {expandedProject === project._id
                          ? project.description
                          : project.description.length > 120
                          ? `${project.description.substring(0, 120)}...`
                          : project.description}
                        {project.description.length > 120 && (
                          <button
                            onClick={() => toggleProjectExpansion(project._id)}
                            className="pl-read-more"
                          >
                            {expandedProject === project._id
                              ? "Show less"
                              : "Read more"}
                          </button>
                        )}
                      </p>

                      <div className="pl-project-footer">
                        <div className="pl-project-date">
                          <FiClock className="pl-clock-icon" />
                          {formatDate(
                            project.submissionDate || project.createdAt
                          )}
                        </div>

                        <div className="pl-project-links">
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pl-project-link pl-live-link"
                              aria-label="View live demo"
                            >
                              <FiExternalLink className="pl-link-icon" />
                              Demo
                            </a>
                          )}
                          {project.repoLink && (
                            <a
                              href={project.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pl-project-link pl-repo-link"
                              aria-label="View source code"
                            >
                              <FiGithub className="pl-link-icon" />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredProjects.length > 5 && (
            <div className="pl-back-to-top-container">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="pl-back-to-top-button"
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

export default ProjectList;