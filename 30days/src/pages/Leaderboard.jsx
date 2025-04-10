import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

// Mock data for the leaderboard
const initialUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    projects: 15,
    streak: true,
    quality: 3,
    totalScore: 19,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "SW",
    projects: 14,
    streak: true,
    quality: 3,
    totalScore: 18,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "MC",
    projects: 12,
    streak: true,
    quality: 3,
    totalScore: 16,
  },
  {
    id: 4,
    name: "Taylor Davis",
    avatar: "TD",
    projects: 10,
    streak: false,
    quality: 3,
    totalScore: 13,
  },
  {
    id: 5,
    name: "Jordan Smith",
    avatar: "JS",
    projects: 9,
    streak: true,
    quality: 2,
    totalScore: 12,
  },
  {
    id: 6,
    name: "Casey Brown",
    avatar: "CB",
    projects: 8,
    streak: false,
    quality: 2,
    totalScore: 10,
  },
  {
    id: 7,
    name: "Morgan Lee",
    avatar: "ML",
    projects: 7,
    streak: false,
    quality: 2,
    totalScore: 9,
  },
  {
    id: 8,
    name: "Riley Johnson",
    avatar: "RJ",
    projects: 6,
    streak: true,
    quality: 1,
    totalScore: 8,
  },
  {
    id: 9,
    name: "Jamie Wilson",
    avatar: "JW",
    projects: 5,
    streak: false,
    quality: 1,
    totalScore: 6,
  },
  {
    id: 10,
    name: "Quinn Taylor",
    avatar: "QT",
    projects: 4,
    streak: false,
    quality: 1,
    totalScore: 5,
  },
  {
    id: 11,
    name: "Avery Martinez",
    avatar: "AM",
    projects: 3,
    streak: false,
    quality: 0,
    totalScore: 3,
  },
];

const ProjectLeaderboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [qualityRating, setQualityRating] = useState(0);
  const [activeTab, setActiveTab] = useState("quality");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Stats for admin dashboard
  const stats = {
    totalUsers: users.length,
    totalProjects: users.reduce((sum, user) => sum + user.projects, 0),
    avgQuality: (
      users.reduce((sum, user) => sum + user.quality, 0) / users.length
    ).toFixed(1),
    activeStreaks: users.filter((user) => user.streak).length,
  };

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [activeFilter, searchTerm, users]);

  const applyFilters = () => {
    let result = [...users];

    // Apply filter buttons
    if (activeFilter === "streak") {
      result = result.filter((user) => user.streak);
    } else if (activeFilter === "quality") {
      result = result.filter((user) => user.quality >= 2);
    } else if (activeFilter === "projects") {
      result = [...result].sort((a, b) => b.projects - a.projects);
    }

    // Apply search
    if (searchTerm) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Always sort by total score for final display
    result = result.sort((a, b) => b.totalScore - a.totalScore);

    setFilteredUsers(result);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleQualitySelect = (e) => {
    setQualityRating(parseInt(e.target.value));
  };

  const handleQualityUpdate = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) => {
      if (user.id === parseInt(selectedUser)) {
        // Recalculate total score: projects + streak bonus + quality
        const streakBonus = user.streak ? 1 : 0;
        const totalScore = user.projects + streakBonus + qualityRating;
        return { ...user, quality: qualityRating, totalScore };
      }
      return user;
    });

    setUsers(updatedUsers);
    // Reset selections
    setSelectedUser("");
    setQualityRating(0);

    // Show success notification
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.textContent = "Quality rating updated successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("hide");
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
    document.body.classList.toggle("animations-disabled", !animationsEnabled);
  };

  // Generate gradient color based on position
  const getGradientColor = (index) => {
    if (index === 0) return "gold-gradient";
    if (index === 1) return "silver-gradient";
    if (index === 2) return "bronze-gradient";
    return "";
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(3)].map((_, i) => (
          <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
            {i < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  // Generate avatar background based on name
  const getAvatarBackground = (name) => {
    const colors = [
      "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
      "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
      "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`leaderboard-container ${
        animationsEnabled ? "animations-enabled" : ""
      }`}
    >
      <div className="backdrop-blur"></div>

      <header className="leaderboard-header">
        <div className="header-content">
          <h1>
            <span className="trophy-icon">🏆</span>
            Project Leaderboard
          </h1>
          <p className="subtitle">Track performance, celebrate excellence</p>
        </div>
        <div className="badge">Elite Performance Tracker</div>
      </header>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Projects</h3>
            <p>
              Projects are the core of your performance. Each submitted project
              counts as 1 point towards your total score.
            </p>
          </div>
          <div className="stat-bg"></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>Streak</h3>
            <p>
              Maintain consistent performance by submitting projects regularly.
              Active streaks earn you a bonus point!
            </p>
          </div>
          <div className="stat-bg"></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Quality</h3>
            <p>
              Quality matters! Each project is rated by admins on a scale of 0-3
              stars, adding to your total score.
            </p>
          </div>
          <div className="stat-bg"></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>Total Score</h3>
            <p>
              Your total score combines projects, streak bonus, and quality
              ratings. Aim for the top of the leaderboard!
            </p>
          </div>
          <div className="stat-bg"></div>
        </div>
      </div>

      <div className="filter-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilterClick("all")}
          >
            <span className="filter-icon">📋</span>
            <span>All</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "streak" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("streak")}
          >
            <span className="filter-icon">🔥</span>
            <span>Active Streak</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "quality" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("quality")}
          >
            <span className="filter-icon">⭐</span>
            <span>High Quality</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "projects" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("projects")}
          >
            <span className="filter-icon">📊</span>
            <span>Most Projects</span>
          </button>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="leaderboard">
        <div className="leaderboard-header-row">
          <div className="column-header">Rank</div>
          <div className="column-header">User</div>
          <div className="column-header">Projects</div>
          <div className="column-header">Streak</div>
          <div className="column-header">Quality</div>
          <div className="column-header">Total Score</div>
        </div>

        <ul className="leaderboard-list">
          {filteredUsers.map((user, index) => (
            <li
              key={user.id}
              className={`leaderboard-item ${getGradientColor(index)}`}
            >
              <div className="rank">
                {index < 3 ? (
                  <div className={`crown-icon position-${index + 1}`}>
                    {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                  </div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="user">
                <div
                  className="avatar"
                  style={{ background: getAvatarBackground(user.name) }}
                >
                  {user.avatar}
                </div>
                <div className="user-info">
                  <div className="name">{user.name}</div>
                  <div
                    className={`status ${user.streak ? "active" : "inactive"}`}
                  >
                    {user.streak ? "🔥 Active Streak" : "Inactive"}
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="metric-container">
                  <span className="value">{user.projects}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(user.projects / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="streak">
                <div
                  className={`streak-badge ${
                    user.streak ? "active-streak" : "inactive-streak"
                  }`}
                >
                  {user.streak ? "🔥" : "⊗"}
                </div>
              </div>
              <div className="quality">{renderStars(user.quality)}</div>
              <div className="total-score">
                <div className="score-badge">{user.totalScore}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-controls">
        <div className="admin-header">
          <h2>
            <span className="admin-icon">👤</span> Admin Dashboard
          </h2>
          <div className="admin-tabs">
            <div
              className={`admin-tab ${activeTab === "quality" ? "active" : ""}`}
              onClick={() => handleTabClick("quality")}
            >
              <span className="tab-icon">⭐</span>
              Quality Control
            </div>
            <div
              className={`admin-tab ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => handleTabClick("stats")}
            >
              <span className="tab-icon">📊</span>
              Statistics
            </div>
          </div>
        </div>

        {activeTab === "quality" ? (
          <div className="quality-control">
            <div className="form-group">
              <label>Select User</label>
              <select
                className="admin-select"
                value={selectedUser}
                onChange={handleUserSelect}
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quality Rating</label>
              <select
                className="admin-select"
                value={qualityRating}
                onChange={handleQualitySelect}
              >
                <option value="0">0 - Needs Improvement</option>
                <option value="1">1 - Satisfactory</option>
                <option value="2">2 - Good Performance</option>
                <option value="3">3 - Outstanding Work</option>
              </select>
            </div>

            <button
              className="admin-btn"
              onClick={handleQualityUpdate}
              disabled={!selectedUser}
            >
              <span className="btn-icon">💾</span>
              Update Rating
            </button>
          </div>
        ) : (
          <div className="admin-stats">
            <div className="admin-stat">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">👥</span>
              </div>
              <div className="value">{stats.totalUsers}</div>
              <div className="label">Total Users</div>
              <div className="stat-bg"></div>
            </div>
            <div className="admin-stat">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">📊</span>
              </div>
              <div className="value">{stats.totalProjects}</div>
              <div className="label">Total Projects</div>
              <div className="stat-bg"></div>
            </div>
            <div className="admin-stat">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">⭐</span>
              </div>
              <div className="value">{stats.avgQuality}</div>
              <div className="label">Avg Quality</div>
              <div className="stat-bg"></div>
            </div>
            <div className="admin-stat">
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🔥</span>
              </div>
              <div className="value">{stats.activeStreaks}</div>
              <div className="label">Active Streaks</div>
              <div className="stat-bg"></div>
            </div>
          </div>
        )}
      </div>

      <button className="submit-project-btn pulse">
        <span className="btn-icon">➕</span>
        Submit Project
      </button>

      <button className="animation-toggle" onClick={toggleAnimations}>
        <span>{animationsEnabled ? "✨" : "⚡"}</span>
      </button>

      <div className="floating-elements">
        <div
          className="floating-element"
          style={{ top: "10%", left: "5%", animationDelay: "0s" }}
        >
          🏆
        </div>
        <div
          className="floating-element"
          style={{ top: "30%", right: "8%", animationDelay: "1.5s" }}
        >
          ⭐
        </div>
        <div
          className="floating-element"
          style={{ bottom: "20%", left: "15%", animationDelay: "3s" }}
        >
          🔥
        </div>
        <div
          className="floating-element"
          style={{ bottom: "40%", right: "15%", animationDelay: "4.5s" }}
        >
          📊
        </div>
      </div>
    </div>
  );
};

export default ProjectLeaderboard;
