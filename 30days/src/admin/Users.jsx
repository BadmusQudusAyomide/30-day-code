import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "react-feather";

const Users = () => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const navigate = useNavigate();

  const toggleUserExpansion = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

   const users = [
     {
       id: 1,
       name: "Alex Johnson",
       email: "alex@example.com",
       joined: "12 days ago",
       status: "active",
       submissions: 12,
       projects: [
         { id: 101, title: "Weather App", ranked: true, date: "2 days ago" },
         {
           id: 102,
           title: "E-commerce Site",
           ranked: false,
           date: "5 days ago",
         },
       ],
     },
     {
       id: 2,
       name: "Sarah Miller",
       email: "sarah@example.com",
       joined: "11 days ago",
       status: "active",
       submissions: 12,
       projects: [
         { id: 201, title: "Task Manager", ranked: true, date: "1 day ago" },
         { id: 202, title: "Recipe Finder", ranked: true, date: "3 days ago" },
       ],
     },
     {
       id: 3,
       name: "David Kim",
       email: "david@example.com",
       joined: "10 days ago",
       status: "active",
       submissions: 12,
       projects: [
         {
           id: 301,
           title: "Fitness Tracker",
           ranked: false,
           date: "4 days ago",
         },
         { id: 302, title: "Budget App", ranked: true, date: "6 days ago" },
       ],
     },
     {
       id: 4,
       name: "Emma Wilson",
       email: "emma@example.com",
       joined: "9 days ago",
       status: "active",
       submissions: 11,
       projects: [
         { id: 401, title: "Recipe App", ranked: true, date: "1 day ago" },
         {
           id: 402,
           title: "Travel Planner",
           ranked: false,
           date: "3 days ago",
         },
       ],
     },
     {
       id: 5,
       name: "James Brown",
       email: "james@example.com",
       joined: "8 days ago",
       status: "active",
       submissions: 10,
       projects: [
         {
           id: 501,
           title: "Social Media Dashboard",
           ranked: true,
           date: "2 days ago",
         },
         {
           id: 502,
           title: "E-learning Platform",
           ranked: true,
           date: "5 days ago",
         },
       ],
     },
     {
       id: 6,
       name: "Olivia Davis",
       email: "olivia@example.com",
       joined: "7 days ago",
       status: "inactive",
       submissions: 5,
       projects: [
         { id: 601, title: "Job Board", ranked: false, date: "1 week ago" },
         {
           id: 602,
           title: "Portfolio Site",
           ranked: false,
           date: "2 weeks ago",
         },
       ],
     },
   ];

  return (
    <div className="users-page-container">
      <div className="page-header">
        <h2>User Management</h2>
        <div className="stats-container">
          {/* Add your stats here if needed */}
        </div>
      </div>

      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-card glass-card">
            <div 
              className="user-summary" 
              onClick={() => toggleUserExpansion(user.id)}
            >
              <div className="user-info">
                <img
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <div className="user-meta">
                    <span>Joined: {user.joined}</span>
                    <span>Submissions: {user.submissions}</span>
                  </div>
                </div>
              </div>
              <div className="user-status">
                <span className={`status-badge ${user.status}`}>
                  {user.status}
                </span>
                <span className="expand-icon">
                  {expandedUserId === user.id ? '−' : '+'}
                </span>
              </div>
            </div>

            {expandedUserId === user.id && (
              <div className="user-projects">
                <h4>Recent Projects</h4>
                {user.projects.map((project) => (
                  <div
                    key={project.id}
                    className="project-item"
                    onClick={() => navigate(`/admin/rate-project/${project.id}`)}
                  >
                    <div className="project-info">
                      <div className="project-title">
                        {project.title}
                        {project.ranked && (
                          <span className="ranked-badge">
                            <Star size={12} /> Ranked
                          </span>
                        )}
                      </div>
                      <div className="project-meta">
                        <span className="project-date">{project.date}</span>
                        {!project.ranked && (
                          <button
                            className="btn btn-small btn-rank"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/rate-project/${project.id}`);
                            }}
                          >
                            Rank Project
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  to={`/admin/users/${user.id}/projects`}
                  className="btn btn-primary view-all-btn"
                >
                  View All Projects <ArrowLeft size={14} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;