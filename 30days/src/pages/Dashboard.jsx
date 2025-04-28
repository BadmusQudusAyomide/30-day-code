import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [darkMode, setDarkMode] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);

  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

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

        // Fetch user data
        const userResponse = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: authHeader,
          },
        });
        console.log("User API response:", userResponse.data);
        const userData = userResponse.data;

        // Fetch projects to get the accurate count
        const projectsResponse = await axios.get(
          `${API_URL}/api/projects/my-projects`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );

        // Get the actual count from projects response
        const actualProjectCount = projectsResponse.data.success
          ? projectsResponse.data.projects.filter(
              (project) =>
                project.projectName &&
                project.day !== undefined &&
                project.description
            ).length
          : 0;

        // Fetch leaderboard data to get current ranking
        const leaderboardResponse = await axios.get(
          `${API_URL}/api/leaderboard/leaderboard`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log("Leaderboard API response:", leaderboardResponse.data);

        // Process leaderboard data
        let userRank = 0;
        let totalParticipants = 0;
        let top3Users = [];

        if (leaderboardResponse.data.success) {
          const leaderboardData = leaderboardResponse.data.data;
          totalParticipants = leaderboardData.length;

          // Sort by total points
          const sortedData = [...leaderboardData].sort(
            (a, b) =>
              (b.totalPoints || b.totalScore || 0) -
              (a.totalPoints || a.totalScore || 0)
          );

          // Get top 3 performers
          top3Users = sortedData.slice(0, 3).map((user) => ({
            name: user.name,
            points: user.totalPoints || user.totalScore || 0,
            avatarColor: generateColorFromName(user.name),
          }));

          // Find user's rank
          const userId = userData.user._id;
          userRank =
            sortedData.findIndex(
              (user) => user.id === userId || user._id === userId
            ) + 1;
          if (userRank === 0) userRank = totalParticipants; // Default to last if not found
        }

        const avatarColor = generateColorFromName(
          userData.user.username || userData.user.email
        );

        setUserData({
          name:
            userData.user.fullName ||
            userData.user.username ||
            userData.user.email.split("@")[0],
          projectsSubmitted: actualProjectCount, // Use the actual count from projects
          currentDay: userData.stats?.currentDay || 1,
          totalDays: 30,
          rank: userRank || userData.stats?.rank || 0,
          totalParticipants:
            totalParticipants || userData.stats?.totalParticipants || 1000,
          avatarColor,
        });

        setTopPerformers(top3Users);
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
  }, [navigate, API_URL]);

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
            "📊",
            "Leaderboard",
            `You're ranked #${userData.rank}`,
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

        <div className="leaderboard-preview">
          <div className="leaderboard-preview-header">
            <h2>Current Rankings</h2>
            <button
              className="view-all-button"
              onClick={() => handleNavigation("/leaderboard")}
            >
              View Full Leaderboard →
            </button>
          </div>
          <div className="top-performers">
            {topPerformers.length >= 3 ? (
              <>
                {renderTopPerformer(
                  2,
                  topPerformers[1].name,
                  topPerformers[1].points,
                  topPerformers[1].avatarColor
                )}
                {renderTopPerformer(
                  1,
                  topPerformers[0].name,
                  topPerformers[0].points,
                  topPerformers[0].avatarColor
                )}
                {renderTopPerformer(
                  3,
                  topPerformers[2].name,
                  topPerformers[2].points,
                  topPerformers[2].avatarColor
                )}
              </>
            ) : (
              <>
                {renderTopPerformer(2, "Loading...", 0, "#f59e0b")}
                {renderTopPerformer(1, "Loading...", 0, "#3b82f6")}
                {renderTopPerformer(3, "Loading...", 0, "#10b981")}
              </>
            )}
          </div>
          <div className="your-rank-container">
            <div className="your-rank-card">
              <div className="rank-number">#{userData.rank}</div>
              <div className="rank-info">
                <div className="rank-user">
                  <div
                    className="rank-avatar"
                    style={{ backgroundColor: userData.avatarColor }}
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="rank-name">{userData.name}</div>
                </div>
                <div className="rank-points">
                  <span className="points-value">
                    {userData.projectsSubmitted * 45}
                  </span>
                  <span className="points-label">Points</span>
                </div>
              </div>
              <button
                className="improve-rank-button"
                onClick={() => handleNavigation("/SubmitProject")}
              >
                Improve Rank
              </button>
            </div>
          </div>
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

  function renderTopPerformer(rank, name, points, color) {
    return (
      <div className="top-performer">
        <div className="performer-rank">#{rank}</div>
        <div className="performer-avatar" style={{ backgroundColor: color }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="performer-info">
          <div className="performer-name">{name}</div>
          <div className="performer-points">{points} points</div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
