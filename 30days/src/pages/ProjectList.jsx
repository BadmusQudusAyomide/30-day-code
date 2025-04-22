import React, { useState, useEffect } from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed

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

  // Define base URL from environment variable or default
  const API_URL = process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Get the token from localStorage
        const token = localStorage.getItem("userToken");

        if (!token) {
          // If no token, redirect to login
          navigate("/login", { state: { from: "/projects" } });
          return;
        }

        // Fetch projects from API with authorization header
        const response = await axios.get(
          `${API_URL}/api/projects/my-projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);

        // Check for unauthorized error
        if (err.response && err.response.status === 401) {
          // Token expired or invalid, redirect to login
          localStorage.removeItem("userToken");
          navigate("/login", { state: { from: "/projects" } });
          return;
        }

        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate, API_URL]);

  // Get unique days and languages for filters
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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Filter projects based on criteria
  const filteredProjects = projects.filter((project) => {
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

  // Group projects by day
  const projectsByDay = filteredProjects.reduce((acc, project) => {
    if (!acc[project.day]) {
      acc[project.day] = [];
    }
    acc[project.day].push(project);
    return acc;
  }, {});

  // Sort days in descending order
  const sortedDays = Object.keys(projectsByDay).sort((a, b) => b - a);

  // Format date
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
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    // Fallback to a placeholder if the image fails to load
    e.target.src =
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="project-list-container">
      {/* Back navigation button */}
      <div className="back-navigation">
        <button
          onClick={() => navigate("/dashboard")}
          className="go-home-button"
        >
          ← Back to Home
        </button>
      </div>

      <div className="project-list-header">
        <h2>Submitted Projects</h2>
        <p className="subtitle">
          Browse through all your 30-day challenge submissions
        </p>
      </div>

      <div className="filter-section">
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
            placeholder="Search projects..."
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
          />
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
          <p>Loading projects...</p>
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
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3>No projects found</h3>
          <p>Try adjusting your search or filter criteria</p>
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
                    onClick={() => toggleProjectExpansion(project._id)}
                  >
                    <div className="project-image">
                      <img
                        src={project.imageUrl}
                        alt={project.projectName}
                        onError={handleImageError}
                      />
                    </div>

                    <div className="project-info">
                      <h4>{project.projectName}</h4>

                      <div className="project-tags">
                        {project.languages.split(",").map((lang, index) => (
                          <span key={index} className="tag language-tag">
                            {lang.trim()}
                          </span>
                        ))}
                        {project.frameworks &&
                          project.frameworks
                            .split(",")
                            .map((framework, index) => (
                              <span key={index} className="tag framework-tag">
                                {framework.trim()}
                              </span>
                            ))}
                      </div>

                      <p className="project-description">
                        {expandedProject === project._id
                          ? project.description
                          : project.description.length > 120
                          ? `${project.description.substring(0, 120)}...`
                          : project.description}
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
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
                          GitHub
                        </a>
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
