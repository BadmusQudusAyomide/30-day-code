import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import StatsCards from "./StatsCards";
import Leaderboard from "./Leaderboard";
import Submissions from "./Submissions";
import Users from "./Users";
import Settings from "./Settings";
import ProjectList from "./ProjectList";
import ProjectRating from "./ProjectRating";
import "./styles.css";

function AdminDashboard({ onLogout }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="app-container">
      <Sidebar
        currentPath={location.pathname}
        isOpen={sidebarOpen}
        onLogout={onLogout}
        toggleSidebar={toggleSidebar}
      />
      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <TopNav onLogout={onLogout} toggleSidebar={toggleSidebar} />
        <StatsCards />
        <div className="content-area">
          <Routes>
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="rate-project/:projectId" element={<ProjectRating />} />
            <Route path="users/:userId/projects" element={<ProjectList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;