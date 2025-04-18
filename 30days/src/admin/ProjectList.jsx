import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

const ProjectList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    search: "",
    status: "all",
  });

  useEffect(() => {
    // Simulate API call with user-specific projects
    setTimeout(() => {
      const mockProjects = [
        {
          id: 101,
          title: "Weather App",
          ranked: true,
          date: "2 days ago",
          description: "A weather application with real-time updates"
        },
        {
          id: 102,
          title: "E-commerce Site",
          ranked: false,
          date: "5 days ago",
          description: "Online store with shopping cart functionality"
        },
        // Add more projects as needed
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, [userId]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         project.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus = filter.status === "all" || 
                         (filter.status === "ranked" && project.ranked) ||
                         (filter.status === "unranked" && !project.ranked);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="project-list-container">
      <h2 className="section-title">Projects by User #{userId}</h2>
      
      <div className="filter-section">
        <div className="search-input">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search projects..."
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
        <div className="filter-select">
          <select
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option value="all">All Projects</option>
            <option value="ranked">Ranked</option>
            <option value="unranked">Unranked</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">No projects found</div>
      ) : (
        <div className="projects-list">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="project-item glass-card"
              onClick={() => navigate(`/admin/rate-project/${userId}/${project.id}`)}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                {project.ranked ? (
                  <span className="ranked-badge">
                    <i className="fas fa-star"></i> Ranked
                  </span>
                ) : (
                  <button 
                    className="btn btn-small btn-rank"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/rate-project/${userId}/${project.id}`);
                    }}
                  >
                    Rank Project
                  </button>
                )}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <span className="project-date">{project.date}</span>
                <button 
                  className="btn btn-primary btn-view"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/rate-project/${userId}/${project.id}`);
                  }}
                >
                  {project.ranked ? "Update Rating" : "Rate Now"}
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