import React, { useState, useEffect } from "react";
import "./ProjectList.css";

const ProjectList = () => {
  // Sample data - in a real application, this would come from an API
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    day: "all",
    search: "",
    language: "all",
  });
  const [expandedProject, setExpandedProject] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          projectName: "Weather Dashboard",
          liveLink: "https://weather-dashboard.vercel.app",
          repoLink: "https://github.com/akinola/weather-dashboard",
          description:
            "A weather application that shows current and forecasted weather using OpenWeatherMap API. Built with responsive design for all device sizes.",
          day: 12,
          frameworks: "React, Material UI",
          languages: "JavaScript, HTML, CSS",
          imageUrl:
            "https://www.gettyimages.com/detail/news-photo/die-weltmeisterin-marita-koch-unterh%C3%A4lt-sich-mit-ihrem-news-photo/957265586",
          submittedAt: "2025-03-27T14:23:00",
          author: "Akinola Saregbagi",
        },
        {
          id: 2,
          projectName: "Task Manager",
          liveLink: "https://task-manager-pro.netlify.app",
          repoLink: "https://github.com/akinola/task-manager",
          description:
            "A comprehensive task management application with features like drag-and-drop, priority setting, due dates, and categories.",
          day: 15,
          frameworks: "React, Redux, Styled Components",
          languages: "TypeScript, HTML, CSS",
          imageUrl: "/api/placeholder/400/200",
          submittedAt: "2025-03-30T09:15:00",
          author: "Akinola Saregbagi",
        },
        {
          id: 3,
          projectName: "Personal Portfolio",
          liveLink: "https://akinola-portfolio.dev",
          repoLink: "https://github.com/akinola/portfolio",
          description:
            "My personal developer portfolio showcasing projects, skills, and experience. Features dark/light mode and animated transitions.",
          day: 19,
          frameworks: "Next.js, Framer Motion",
          languages: "JavaScript, HTML, CSS",
          imageUrl: "/api/placeholder/400/200",
          submittedAt: "2025-04-05T16:45:00",
          author: "Akinola Saregbagi",
        },
        {
          id: 4,
          projectName: "Code Snippet Manager",
          liveLink: "https://snippets-vault.app",
          repoLink: "https://github.com/akinola/code-snippets",
          description:
            "An application for saving and organizing code snippets with syntax highlighting, tags, and search functionality.",
          day: 19,
          frameworks: "React, Firebase, CodeMirror",
          languages: "JavaScript, HTML, CSS",
          imageUrl: "/api/placeholder/400/200",
          submittedAt: "2025-04-05T20:12:00",
          author: "Akinola Saregbagi",
        },
        {
          id: 5,
          projectName: "Movie Explorer",
          liveLink: "https://movie-explorer-app.vercel.app",
          repoLink: "https://github.com/akinola/movie-explorer",
          description:
            "An app that allows users to browse movies, view details, search, and create watchlists using the TMDB API.",
          day: 8,
          frameworks: "Vue.js, Vuetify",
          languages: "JavaScript, HTML, CSS",
          imageUrl: "/api/placeholder/400/200",
          submittedAt: "2025-03-20T11:30:00",
          author: "Akinola Saregbagi",
        },
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

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
      project.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      project.author.toLowerCase().includes(filter.search.toLowerCase());
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

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Submitted Projects</h2>
        <p className="subtitle">Browse through all the amazing submissions</p>
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
                    key={project.id}
                    className={`project-card ${
                      expandedProject === project.id ? "expanded" : ""
                    }`}
                    onClick={() => toggleProjectExpansion(project.id)}
                  >
                    <div className="project-image">
                      <img src={project.imageUrl} alt={project.projectName} />
                    </div>

                    <div className="project-info">
                      <h4>{project.projectName}</h4>
                      <p className="project-author">by {project.author}</p>

                      <div className="project-tags">
                        {project.languages.split(",").map((lang, index) => (
                          <span key={index} className="tag language-tag">
                            {lang.trim()}
                          </span>
                        ))}
                        {project.frameworks
                          .split(",")
                          .map((framework, index) => (
                            <span key={index} className="tag framework-tag">
                              {framework.trim()}
                            </span>
                          ))}
                      </div>

                      <p className="project-description">
                        {expandedProject === project.id
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
                          {formatDate(project.submittedAt)}
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
