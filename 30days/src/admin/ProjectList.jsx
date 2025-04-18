import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "react-feather";
import "./styles.css";

const ProjectList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    search: "",
    status: "all", // all, ranked, unranked
  });

  useEffect(() => {
    // Simulate API call to fetch user's projects
    const fetchProjects = async () => {
      try {
        setTimeout(() => {
          const mockProjects = [
            {
              id: 101,
              title: "Weather Dashboard",
              description:
                "Interactive weather application with real-time data visualization",
              day: 12,
              ranked: true,
              currentRating: 4.5,
              technologies: ["React", "Chart.js", "OpenWeatherAPI"],
              submittedDate: "2023-06-10",
              screenshot:
                "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            {
              id: 102,
              title: "E-commerce Platform",
              description:
                "Full-featured online store with cart and payment integration",
              day: 15,
              ranked: false,
              technologies: ["React", "Node.js", "MongoDB"],
              submittedDate: "2023-06-18",
              screenshot:
                "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            {
              id: 103,
              title: "Task Management App",
              description:
                "Productivity application with drag-and-drop task organization",
              day: 8,
              ranked: true,
              currentRating: 4.2,
              technologies: ["Vue.js", "Firebase"],
              submittedDate: "2023-05-28",
              screenshot:
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
          ];
          setProjects(mockProjects);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus =
      filter.status === "all" ||
      (filter.status === "ranked" && project.ranked) ||
      (filter.status === "unranked" && !project.ranked);
    return matchesSearch && matchesStatus;
  });

  const handleProjectClick = (projectId) => {
    navigate(`/admin/rate-project/${projectId}`);
  };

  const goBack = () => {
    navigate("/admin/users");
  };

  if (loading) {
    return (
      <div className="project-list-loading glass-card">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <button onClick={goBack} className="btn btn-neumorphic">
          <ArrowLeft size={16} /> Back to Users
        </button>
        <h2>Projects by User #{userId}</h2>
      </div>

      <div className="filter-section">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search projects..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="filter-select">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All Projects</option>
            <option value="ranked">Ranked</option>
            <option value="unranked">Unranked</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="no-projects glass-card">
          <h3>No projects found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-card"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-image">
                <img src={project.screenshot} alt={project.title} />
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {project.ranked ? (
                    <span className="ranked-badge">
                      <Star size={14} /> {project.currentRating}
                    </span>
                  ) : (
                    <span className="unranked-badge">Not Rated</span>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span className="project-day">Day {project.day}</span>
                  <span className="project-date">
                    {new Date(project.submittedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-primary rate-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  {project.ranked ? "Update Rating" : "Rate Project"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
