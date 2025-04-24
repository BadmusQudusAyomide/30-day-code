import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this import
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    projectsSubmitted: 0,
    currentDay: 0,
    totalDays: 30,
    rank: 0,
    totalParticipants: 0,
    avatarColor: "#6366f1",
  });
  // Add these state declarations
  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        if (!token) {
          navigate("/login");
          return;
        }
          const authHeader = `Bearer ${token}`;
          console.log("Authorization header:", authHeader);

         
         const response = await axios.get("https://my-backend-pkhd.onrender.com/api/auth/me", {
           headers: {
             Authorization: authHeader, // Make sure token is correctly formatted
           },
         });

         console.log("API response:", response.data);

        const data = response.data;

        const avatarColor = generateColorFromName(
          data.user.username || data.user.email
        );

        setUserData({
          name:
            data.user.fullName ||
            data.user.username ||
            data.user.email.split("@")[0],
          projectsSubmitted: data.stats?.projectsSubmitted || 0,
          currentDay: data.stats?.currentDay || 1,
          totalDays: 30,
          rank: data.stats?.rank || 0,
          totalParticipants: data.stats?.totalParticipants || 1000,
          avatarColor,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
         if (err.response) {
           console.error("Error response data:", err.response.data);
           console.error("Error response status:", err.response.status);
           console.error("Error response headers:", err.response.headers);
         }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const generateColorFromName = (name) => {
    if (!name) return "#6366f1";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) {
      onLogout();
    } else {
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

  const adjustColor = (color, amount) => {
    // Simple color adjustment for gradient
    let col = color.startsWith("#") ? color.slice(1) : color;
    if (col.startsWith("hsl")) {
      // Handle HSL color format
      const values = col.match(/\d+/g);
      if (values && values.length >= 3) {
        const h = parseInt(values[0]);
        const s = parseInt(values[1]);
        const l = Math.min(100, parseInt(values[2]) + amount);
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
    }
    return color;
  };

  if (loading) {
    return (
      <div className={`dashboard-loading ${darkMode ? "dark" : "light"}`}>
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`dashboard-error ${darkMode ? "dark" : "light"}`}>
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`dashboard neo ${darkMode ? "dark" : "light"}`}>
      <header className="dashboard-header">
        <div className="brand">
          <div className="logo" onClick={() => navigate("/")}>
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
              {userData.name.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-header-section">
          <h1 className="welcome">
            Welcome back, {userData.name.split(" ")[0]}!
          </h1>
          <p className="welcome-subtitle">
            {userData.projectsSubmitted > 0
              ? `You've submitted ${userData.projectsSubmitted} projects so far!`
              : "Ready to start your coding challenge?"}
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
          Code&lt;30&gt; Challenge © {new Date().getFullYear()} |{" "}
          <a href="#" className="footer-link">
            Terms
          </a>{" "}
          |{" "}
          <a href="#" className="footer-link">
            Privacy
          </a>
        </p>
      </footer>

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
              <button className="cancel-button" onClick={handleCancelLogout}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmLogout}>
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
};

export default Dashboard;
