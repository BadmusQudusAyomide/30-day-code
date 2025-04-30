import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

// Omor nah The Component be this
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import StatsCards from "./StatsCards";
import Leaderboard from "./Leaderboard";
import Submissions from "./Submissions";
import Users from "./Users";
import Settings from "./Settings";
import AdminProjectList from "./AdminProjectList";
import ProjectRating from "./ProjectRating";
import "./styles.css";
import Version from "../admin/Version";
import "./Leaderboard.css";



function AdminDashboard({ onLogout }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          onLogout();
          return;
        }

        const response = await axios.get("/api/auth/me");

        if (!response.data.success || !response.data.user?.isAdmin) {
          console.error("Admin check failed:", response.data);
          onLogout();
          return;
        }

        setAdminUser(response.data.user);
      } catch (error) {
        console.error("Admin verification failed:", error);
        onLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [onLogout]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    delete axios.defaults.headers.common["Authorization"];

    onLogout();
  };

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        currentPath={location.pathname}
        isOpen={sidebarOpen}
        onLogout={handleLogout}
        toggleSidebar={toggleSidebar}
        user={adminUser}
      />
      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <TopNav
          onLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          user={adminUser}
        />
        <StatsCards />
        <div className="content-area">
          <Routes>
            <Route index element={<Navigate to="leaderboard" replace />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings user={adminUser} />} />
            <Route path="rate-project/:projectId" element={<ProjectRating />} />
            <Route
              path="users/:userId/projects"
              element={<AdminProjectList />}
            />
            <Route
              path="users/:userId/projects/:projectId/rate"
              element={<ProjectRating />}
            />
            <Route path="version" element={<Version />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
