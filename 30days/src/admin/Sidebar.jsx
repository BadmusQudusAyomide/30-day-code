import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar glass-card">
      <div className="sidebar-logo neumorphic">
        <i className="fas fa-code"></i>
        <span>CampusCush</span>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link
            to="/admin/leaderboard"
            className={activeView === "leaderboard" ? "active" : ""}
            onClick={() => setActiveView("leaderboard")}
          >
            <i className="fas fa-trophy"></i>
            <span>Leaderboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/submissions"
            className={activeView === "submissions" ? "active" : ""}
            onClick={() => setActiveView("submissions")}
          >
            <i className="fas fa-inbox"></i>
            <span>Submissions</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={activeView === "users" ? "active" : ""}
            onClick={() => setActiveView("users")}
          >
            <i className="fas fa-users"></i>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className={activeView === "settings" ? "active" : ""}
            onClick={() => setActiveView("settings")}
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
