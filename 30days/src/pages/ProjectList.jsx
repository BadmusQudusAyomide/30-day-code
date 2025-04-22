import React, { useState, useEffect, useMemo } from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          // Filter out invalid projects
          const validProjects = response.data.projects.filter(project => 
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
        
        let errorMsg = "An error occurred while fetching projects";
        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login", { state: { from: "/projects" } });
            return;
          } else if (err.response.status === 500) {
            errorMsg = "Server error - please try again later";
          }
        } else if (err.request) {
          errorMsg = "Network error - please check your connection";
        }
        
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate, API_URL]);

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesDay =
        filter.day === "all" || project.day === parseInt(filter.day);

      const matchesSearch =
        project.projectName.toLowerCase().includes(filter.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.search.toLowerCase());

      const matchesLanguage =
        filter.language === "all" ||
        project.languages.toLowerCase().includes(filter.language.toLowerCase());

      return matchesDay && matchesSearch && matchesLanguage;
    });
  }, [projects, filter.day, filter.search, filter.language]);

  // Memoized grouped projects
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
    <div className="project-list-container">
      <div className="back-navigation">
        <button
          onClick={() => navigate("/dashboard")}
          className="go-home-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="project-list-header">
        <h2>My Projects</h2>
        <p className="subtitle">
          Explore all your submissions for the 30-day coding challenge
        </p>
      </div>

      <div className="filter-section">
        <div className="search-input-container">
          <div className="search-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search projects by name or description..."
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
            />
            {filter.search && (
              <button onClick={clearSearch} className="clear-search-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          {(filter.search || filter.day !== "all" || filter.language !== "all") && (
            <button onClick={clearAllFilters} className="clear-filters-button">
              Clear All
            </button>
          )}
        </div>

        <div className="filter-selects">
          <div className="filter-select">
            <label htmlFor="day-filter">Day:</label>
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

          <div className="filter-select">
            <label htmlFor="language-filter">Language:</label>
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
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>Error Loading Projects</h3>
          <p>{error}</p>
          <button 
            className="go-home-button" 
            style={{marginTop: "1rem"}}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h3>No projects found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            onClick={() => navigate("/submit-project")}
            className="submit-project-button"
          >
            Submit Your First Project
          </button>
        </div>
      ) : (
        <div className="projects-by-day">
          {sortedDays.map((day) => (
            <div key={day} className="day-section">
              <div className="day-header">
                <h3>Day {day}</h3>
                <span className="project-count">
                  {projectsByDay[day].length} project
                  {projectsByDay[day].length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="projects-grid">
                {projectsByDay[day].map((project) => (
                  <div
                    key={project._id}
                    className={`project-card ${
                      expandedProject === project._id ? "expanded" : ""
                    }`}
                  >
                    <div className="project-image">
                      <img
                        src={project.imageUrl}
                        alt={project.projectName}
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </div>

                    <div className="project-info">
                      <h4>{project.projectName}</h4>

                      <div className="project-tags">
                        {project.status && (
                          <span className={`project-status ${project.status.toLowerCase()}`}>
                            {project.status}
                          </span>
                        )}
                        
                        {project.languages.split(",").map((lang, index) => (
                          <span key={index} className="tag language-tag">
                            {lang.trim()}
                          </span>
                        ))}
                      </div>

                      <p className="project-description">
                        {expandedProject === project._id
                          ? project.description
                          : project.description.length > 120
                          ? `${project.description.substring(0, 120)}...`
                          : project.description}
                        {project.description.length > 120 && (
                          <button 
                            onClick={() => toggleProjectExpansion(project._id)}
                            className="read-more-button"
                          >
                            {expandedProject === project._id ? "Show less" : "Read more"}
                          </button>
                        )}
                      </p>

                      <div className="project-meta">
                        <span className="project-date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {formatDate(
                            project.submissionDate || project.createdAt
                          )}
                        </span>
                      </div>

                      <div className="project-links">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link live-link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Live Demo
                          </a>
                        )}
                        {project.repoLink && (
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link repo-link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;