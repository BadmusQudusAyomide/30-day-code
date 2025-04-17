import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ currentPath, isOpen }) => {
  return (
    <div className={`sidebar glass-card ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo neumorphic">
        <i className="fas fa-code"></i>
        <span>CampusCush</span>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link 
            to="/admin/leaderboard"
            className={currentPath.includes("leaderboard") ? "active" : ""}
          >
            <i className="fas fa-trophy"></i>
            <span>Leaderboard</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/submissions"
            className={currentPath.includes("submissions") ? "active" : ""}
          >
            <i className="fas fa-inbox"></i>
            <span>Submissions</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/users"
            className={currentPath.includes("users") ? "active" : ""}
          >
            <i className="fas fa-users"></i>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/settings"
            className={currentPath.includes("settings") ? "active" : ""}
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;