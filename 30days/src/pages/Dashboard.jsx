import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Akinola Saregbagi",
    projectsSubmitted: 18,
    currentDay: 19,
    totalDays: 30,
    rank: 42,
    totalParticipants: 1204,
    avatarColor: "#6366f1", // Default color for avatar
  });

  // Simulate loading user data
  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    console.log("Dashboard loaded - would fetch user data here");

    // Generate a random color for avatar based on username
    const generateColorFromName = (name) => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = `hsl(${hash % 360}, 70%, 60%)`;
      setUserData((prev) => ({ ...prev, avatarColor: color }));
    };

    generateColorFromName(userData.name);
  }, [userData.name]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Add confirmation for better UX
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
  };

  const calculateProgressPercentage = () => {
    return (userData.currentDay / userData.totalDays) * 100;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand">
          <div className="logo">
            <span className="code-text">Code</span>
            <span className="days-text">&lt;30&gt;</span>
          </div>
        </div>
        <div className="user-info">
          <div className="user-name">{userData.name}</div>
          <button
            className="avatar-button"
            onClick={() => handleNavigation("/profile")}
            style={{ backgroundColor: userData.avatarColor }}
            aria-label="View profile"
            title="View and edit your profile"
          >
            {userData.name.charAt(0)}
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-header-section">
          <h1 className="welcome">Welcome to the 30 Days Challenge!</h1>
          <p className="welcome-subtitle">
            Keep going! You're making great progress.
          </p>
        </div>

        <div className="progress-overview">
          <div className="day-progress">
            <div className="day-indicator">
              <span className="day-number">{userData.currentDay}</span>
              <span className="day-label">/ {userData.totalDays}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${calculateProgressPercentage()}%`,
                }}
              ></div>
            </div>
            <div className="progress-stats">
              <div className="day-text">Day {userData.currentDay}</div>
              <div className="percentage-text">
                {Math.round(calculateProgressPercentage())}% complete
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div
            className="grid-item submit-project"
            onClick={() => handleNavigation("/SubmitProject")}
          >
            <div className="item-icon">📤</div>
            <div className="item-content">
              <h3>Submit Project</h3>
              <p>Upload today's challenge</p>
            </div>
            <div className="item-action">→</div>
          </div>

          <div
            className="grid-item my-projects"
            onClick={() => handleNavigation("/ProjectList")}
          >
            <div className="item-icon">📁</div>
            <div className="item-content">
              <h3>My Projects</h3>
              <p>{userData.projectsSubmitted} submitted</p>
            </div>
            <div className="item-action">→</div>
          </div>

          <div
            className="grid-item leaderboard"
            onClick={() => handleNavigation("/leaderboard")}
          >
            <div className="item-icon">🏆</div>
            <div className="item-content">
              <h3>Leaderboard</h3>
              <p>
                Rank: #{userData.rank} of {userData.totalParticipants}
              </p>
            </div>
            <div className="item-action">→</div>
          </div>

          <div
            className="grid-item daily-challenge"
            onClick={() => handleNavigation("/daily-challenge")}
          >
            <div className="item-icon">📝</div>
            <div className="item-content">
              <h3>Daily Challenge</h3>
              <p>View Day {userData.currentDay} task</p>
            </div>
            <div className="item-action">→</div>
          </div>

          <div
            className="grid-item resources"
            onClick={() => handleNavigation("/resources")}
          >
            <div className="item-icon">📚</div>
            <div className="item-content">
              <h3>Resources</h3>
              <p>Helpful materials</p>
            </div>
            <div className="item-action">→</div>
          </div>

          <div
            className="grid-item community"
            onClick={() => handleNavigation("/community")}
          >
            <div className="item-icon">👥</div>
            <div className="item-content">
              <h3>Community</h3>
              <p>{userData.totalParticipants} participants</p>
            </div>
            <div className="item-action">→</div>
          </div>
        </div>

        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>
          Code&lt;30&gt; Challenge © 2025 |{" "}
          <a href="#" className="footer-link">
            Terms
          </a>{" "}
          |{" "}
          <a href="#" className="footer-link">
            Privacy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
