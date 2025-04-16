import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Akinola Saregbagi",
    projectsSubmitted: 18,
    currentDay: 19,
    totalDays: 30,
    rank: 42,
    totalParticipants: 1204,
    avatarColor: "#6366f1",
  });

  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
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

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    if (onLogout) {
      // Call the parent's logout handler that was passed as a prop
      onLogout();
    } else {
      // Fallback if onLogout is not provided
      localStorage.setItem("isAuthenticated", "false");
      navigate("/login");
    }
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const calculateProgressPercentage = () => {
    return (userData.currentDay / userData.totalDays) * 100;
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`dashboard neo ${darkMode ? "dark" : "light"}`}>
      <header className="dashboard-header">
        <div className="brand">
          <div className="logo">
            <span className="code-text">Code</span>
            <span className="days-text">&lt;30&gt;</span>
          </div>
        </div>
        <div className="header-controls">
          <div className="dark-mode-toggle">
            <input
              type="checkbox"
              id="darkmode-toggle"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label htmlFor="darkmode-toggle" className="toggle-label">
              <span className="toggle-icon moon">🌙</span>
              <span className="toggle-icon sun">☀️</span>
            </label>
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
                  background: `linear-gradient(90deg, ${
                    userData.avatarColor
                  }, ${adjustColor(userData.avatarColor, 20)})`,
                  boxShadow: darkMode
                    ? `0 4px 8px rgba(0, 0, 0, 0.3), 0 -4px 8px rgba(255, 255, 255, 0.05)`
                    : `0 4px 8px rgba(163, 177, 198, 0.6), 0 -4px 8px rgba(255, 255, 255, 0.8)`,
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
          {renderGridItem(
            "📤",
            "Submit Project",
            "Upload today's challenge",
            "/SubmitProject"
          )}
          {renderGridItem(
            "📁",
            "My Projects",
            `${userData.projectsSubmitted} submitted`,
            "/ProjectList"
          )}
          {renderGridItem(
            "🏆",
            "Leaderboard",
            `Rank: #${userData.rank} of ${userData.totalParticipants}`,
            "/leaderboard"
          )}
          {renderGridItem(
            "📝",
            "Daily Challenge",
            `View Day ${userData.currentDay} task`,
            "/daily-challenge"
          )}
          {renderGridItem("📚", "Resources", "Helpful materials", "/resources")}
          {renderGridItem(
            "👥",
            "Community",
            `${userData.totalParticipants} participants`,
            "/community"
          )}
        </div>

        <div className="logout-container">
          <button className="logout-button" onClick={openLogoutModal}>
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

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className={`logout-modal ${darkMode ? "dark" : "light"}`}>
            <div className="modal-header">
              <h3>Confirm Logout</h3>
              <button className="close-button" onClick={handleCancelLogout}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to logout?</p>
              <div className="modal-icon">🔒</div>
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button 
                className="confirm-button" 
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderGridItem(emoji, title, description, path) {
    return (
      <div
        className="grid-item"
        onClick={() => handleNavigation(path)}
        data-type={title.toLowerCase().replace(" ", "-")}
      >
        <div className="item-icon">{emoji}</div>
        <div className="item-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="item-action">→</div>
      </div>
    );
  }

  function adjustColor(color, amount) {
    // Simple color adjustment for demo purposes
    let col = color.startsWith("#") ? color.slice(1) : color;
    let num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num & 0x0000ff) + amount;
    let b = ((num >> 8) & 0x00ff) + amount;

    r = Math.max(Math.min(255, r), 0).toString(16).padStart(2, "0");
    g = Math.max(Math.min(255, g), 0).toString(16).padStart(2, "0");
    b = Math.max(Math.min(255, b), 0).toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
  }
};

export default Dashboard;