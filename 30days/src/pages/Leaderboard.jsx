import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Leaderboard.css";
import {
  Users,
  Crown,
  Award,
  Flame,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Trophy,
  Code,
  ArrowLeft,
  FileText,
  Star,
  Award as AwardIcon,
} from "lucide-react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "totalPoints",
    direction: "descending",
  });
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryStats, setSummaryStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    totalPoints: 0,
  });
  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  // Calculate challenge progress
  const calculateChallengeProgress = () => {
    // This is a placeholder - you might want to get this from an API or calculate based on the current date
    const startDate = new Date("2025-03-10"); // Replace with your actual challenge start date
    const totalDays = 30;

    const today = new Date();
    const daysPassed =
      Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const currentDay = Math.min(daysPassed, totalDays);
    const progressPercentage = Math.floor((currentDay / totalDays) * 100);
    const daysLeft = totalDays - currentDay;

    return {
      currentDay,
      totalDays,
      progressPercentage,
      daysLeft,
    };
  };

  const progress = calculateChallengeProgress();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { state: { from: "/leaderboard" } });
          return;
        }

        // Fetch leaderboard data from our new endpoint
        const response = await axios.get(
          `${API_URL}/api/leaderboard/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Ensure all users have totalPoints property
          const processedData = response.data.data.map((user) => ({
            ...user,
            // If the API returns totalScore instead of totalPoints, map it
            totalPoints: user.totalPoints || user.totalScore || 0,
          }));
          setLeaderboardData(processedData);

          // Calculate summary statistics
          const totalUsers = processedData.length;
          const totalSubmissions = processedData.reduce(
            (sum, user) => sum + (user.projectsSubmitted || 0),
            0
          );
          const totalPoints = processedData.reduce(
            (sum, user) => sum + (user.totalPoints || 0),
            0
          );

          setSummaryStats({
            totalUsers,
            totalSubmissions,
            totalPoints,
          });
        } else {
          throw new Error(
            response.data.message || "Failed to fetch leaderboard data"
          );
        }
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to load leaderboard data. Please try again later.");

        // If API call fails, we could use mock data as fallback
        generateMockData();
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [navigate, API_URL]);

  // Fallback - Generate mock data if API fails
  const generateMockData = () => {
    const currentUserId = localStorage.getItem("userId") || "current-user-id";
    const users = [];

    // Create the current user
    users.push({
      id: currentUserId,
      name: "Your Name",
      avatar: `https://i.pravatar.cc/150?img=1`,
      projectsSubmitted: Math.floor(Math.random() * 15) + 5,
      projectQuality: Math.floor(Math.random() * 18) + 80,
      streak: Math.floor(Math.random() * 15) + 5,
      isCurrentUser: true,
      recentProjects: generateMockProjects(currentUserId, 5),
    });

    // Generate other users
    for (let i = 1; i < 25; i++) {
      const projectsSubmitted = Math.floor(Math.random() * 30) + 1;
      const projectQuality = Math.floor(Math.random() * 18) + 80;
      const streak = Math.floor(Math.random() * 30) + 1;
      const totalPoints =
        projectsSubmitted * 3 + projectQuality * 0.5 + streak * 2;
      const userId = `user-${i}`;

      users.push({
        id: userId,
        name: `User ${i}`,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        projectsSubmitted,
        projectQuality,
        streak,
        totalPoints: Math.floor(totalPoints),
        isCurrentUser: false,
        recentProjects: generateMockProjects(
          userId,
          Math.floor(Math.random() * 5) + 1
        ),
      });
    }

    // Calculate the current user's total points
    const currentUser = users[0];
    currentUser.totalPoints = Math.floor(
      currentUser.projectsSubmitted * 3 +
        currentUser.projectQuality * 0.5 +
        currentUser.streak * 2
    );

    // Sort users by total points
    const sortedUsers = users.sort((a, b) => b.totalPoints - a.totalPoints);
    setLeaderboardData(sortedUsers);

    // Calculate summary statistics
    const totalUsers = sortedUsers.length;
    const totalSubmissions = sortedUsers.reduce(
      (sum, user) => sum + (user.projectsSubmitted || 0),
      0
    );
    const totalPoints = sortedUsers.reduce(
      (sum, user) => sum + (user.totalPoints || 0),
      0
    );

    setSummaryStats({
      totalUsers,
      totalSubmissions,
      totalPoints,
    });
  };

  // Generate mock projects (for fallback only)
  const generateMockProjects = (userId, count = 5) => {
    const projects = [];
    for (let i = 0; i < count; i++) {
      const day = Math.floor(Math.random() * progress.currentDay) + 1;
      projects.push({
        _id: `project-${userId}-${i}`,
        projectName: `Project ${i + 1}`,
        day,
        submissionDate: new Date(
          Date.now() - (progress.currentDay - day) * 24 * 60 * 60 * 1000
        ).toISOString(),
        imageUrl: "https://via.placeholder.com/150",
      });
    }
    return projects;
  };

  // NEW FUNCTION: Get avatar content (similar to AdminLeaderboard)
  const getAvatarContent = (user) => {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className="us-avatar-img"
          onError={(e) => {
            // When image fails to load, replace with initials
            e.target.style.display = "none";
            e.target.parentNode.querySelector(
              ".us-avatar-initials"
            ).style.display = "flex";
          }}
        />
      );
    }
    return null;
  };

  // NEW FUNCTION: Get initials from user name
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    setLeaderboardData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const viewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "us-text-success";
    if (score >= 75) return "us-text-info";
    if (score >= 60) return "us-text-warning";
    return "us-text-danger";
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="us-icon-gold" size={20} />;
    if (index === 1) return <Award className="us-icon-silver" size={20} />;
    if (index === 2) return <Award className="us-icon-bronze" size={20} />;
    return <span className="us-font-bold us-text-rank">{index + 1}</span>;
  };

  // Find current user's rank
  const getCurrentUserRank = () => {
    const currentUserIndex = leaderboardData.findIndex(
      (user) => user.isCurrentUser
    );
    return currentUserIndex !== -1 ? currentUserIndex + 1 : "-";
  };

  // Format date to local string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="us-leaderboard-page">
        <div className="us-loading-state">
          <div className="us-spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="us-leaderboard-page">
        <div className="us-error-state">
          <div className="us-error-icon">!</div>
          <h3>Error Loading Leaderboard</h3>
          <p>{error}</p>
          <button
            className="us-retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="us-leaderboard-page">
      {/* Back to Dashboard Button */}
      <div className="us-back-button-container">
        <button
          className="us-back-button"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} className="us-icon-back" />
          Back to Dashboard
        </button>
      </div>

      {/* Stats Container */}
      <div className="us-stats-overview">
        <div className="us-stat-card">
          <div className="us-stat-card-icon">
            <Users size={24} className="us-icon-stats" />
          </div>
          <div className="us-stat-card-content">
            <span className="us-stat-card-value">
              {summaryStats.totalUsers}
            </span>
            <span className="us-stat-card-label">Total Users</span>
          </div>
        </div>

        <div className="us-stat-card">
          <div className="us-stat-card-icon">
            <FileText size={24} className="us-icon-stats" />
          </div>
          <div className="us-stat-card-content">
            <span className="us-stat-card-value">
              {summaryStats.totalSubmissions}
            </span>
            <span className="us-stat-card-label">Total Submissions</span>
          </div>
        </div>

        <div className="us-stat-card">
          <div className="us-stat-card-icon">
            <Star size={24} className="us-icon-stats" />
          </div>
          <div className="us-stat-card-content">
            <span className="us-stat-card-value">
              {summaryStats.totalPoints.toLocaleString()}
            </span>
            <span className="us-stat-card-label">Total Points</span>
          </div>
        </div>

        <div className="us-stat-card">
          <div className="us-stat-card-icon">
            <AwardIcon size={24} className="us-icon-stats" />
          </div>
          <div className="us-stat-card-content">
            <span className="us-stat-card-value">{getCurrentUserRank()}</span>
            <span className="us-stat-card-label">Your Rank</span>
          </div>
        </div>
      </div>

      {/* Challenge Header */}
      <div className="us-challenge-header">
        <div className="us-challenge-header-content">
          <h1 className="us-title-main">Welcome to the 30 Days Challenge!</h1>
          <p className="us-subtitle">
            Keep going! You're making great progress.
          </p>

          <div className="us-challenge-progress">
            <div className="us-progress-info">
              <span className="us-progress-day">
                {progress.currentDay} / {progress.totalDays}
              </span>
              <span className="us-progress-current">
                Day {progress.currentDay}
              </span>
              <span className="us-progress-percent">
                {progress.progressPercentage}% complete
              </span>
            </div>
            <div className="us-progress-bar-container">
              <div
                className="us-progress-bar"
                style={{ width: `${progress.progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="us-challenge-actions">
            <button
              className="us-action-btn us-submit-btn"
              onClick={() => navigate("/submit-project")}
            >
              Submit Project
              <span className="us-action-desc">Upload today's challenge</span>
            </button>
            <button
              className="us-action-btn us-projects-btn"
              onClick={() => navigate("/projects")}
            >
              My Projects
              <span className="us-action-desc">
                {leaderboardData.find((user) => user.isCurrentUser)
                  ?.projectsSubmitted || 0}{" "}
                submitted
              </span>
            </button>
            <button className="us-action-btn us-leaderboard-btn us-active">
              Leaderboard
              <span className="us-action-desc">
                Rank: #{getCurrentUserRank()} of {leaderboardData.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Container */}
      <div className="us-leaderboard-container">
        <div className="us-leaderboard-header">
          <h2 className="us-section-title">Challenge Leaderboard</h2>
          <div className="us-leaderboard-stats">
            <div className="us-stat-bubble">
              <Trophy size={16} className="us-icon" />
              <span>Top Performers</span>
            </div>
            <div className="us-stat-bubble">
              <Users size={16} className="us-icon" />
              <span>{leaderboardData.length} Participants</span>
            </div>
          </div>
        </div>

        <div className="us-leaderboard-controls">
          <button
            className={`us-sort-btn ${
              sortConfig.key === "totalPoints" ? "us-active" : ""
            }`}
            onClick={() => requestSort("totalPoints")}
          >
            Total Points
            {sortConfig.key === "totalPoints" &&
              (sortConfig.direction === "ascending" ? (
                <ChevronUp size={16} className="us-icon-sort" />
              ) : (
                <ChevronDown size={16} className="us-icon-sort" />
              ))}
          </button>
          <button
            className={`us-sort-btn ${
              sortConfig.key === "projectsSubmitted" ? "us-active" : ""
            }`}
            onClick={() => requestSort("projectsSubmitted")}
          >
            Projects
            {sortConfig.key === "projectsSubmitted" &&
              (sortConfig.direction === "ascending" ? (
                <ChevronUp size={16} className="us-icon-sort" />
              ) : (
                <ChevronDown size={16} className="us-icon-sort" />
              ))}
          </button>
          <button
            className={`us-sort-btn ${
              sortConfig.key === "projectQuality" ? "us-active" : ""
            }`}
            onClick={() => requestSort("projectQuality")}
          >
            Quality
            {sortConfig.key === "projectQuality" &&
              (sortConfig.direction === "ascending" ? (
                <ChevronUp size={16} className="us-icon-sort" />
              ) : (
                <ChevronDown size={16} className="us-icon-sort" />
              ))}
          </button>
          <button
            className={`us-sort-btn ${
              sortConfig.key === "streak" ? "us-active" : ""
            }`}
            onClick={() => requestSort("streak")}
          >
            Streak
            {sortConfig.key === "streak" &&
              (sortConfig.direction === "ascending" ? (
                <ChevronUp size={16} className="us-icon-sort" />
              ) : (
                <ChevronDown size={16} className="us-icon-sort" />
              ))}
          </button>
        </div>

        <div className="us-leaderboard-list">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className={`us-leaderboard-card ${
                expanded === user.id ? "us-expanded" : ""
              } ${user.isCurrentUser ? "us-current-user" : ""}`}
            >
              <div
                className="us-leaderboard-main"
                onClick={() => toggleExpand(user.id)}
              >
                <div className="us-rank-badge">{getRankIcon(index)}</div>
                <div className="us-user-avatar">
                  {/* Updated avatar handling */}
                  {getAvatarContent(user)}
                  {/* Add initials container that will show if image fails */}
                  <div
                    className="us-avatar-initials"
                    style={{ display: user.avatar ? "none" : "flex" }}
                  >
                    {getUserInitials(user.name)}
                  </div>
                  {user.isCurrentUser && (
                    <div className="us-user-you-badge">YOU</div>
                  )}
                </div>
                <div className="us-user-info">
                  <h3 className="us-user-name">{user.name}</h3>
                  <div className="us-score-info">
                    <span
                      className={`us-total-score ${getScoreColor(
                        user.totalPoints || 0
                      )}`}
                    >
                      {user.totalPoints || 0} points
                    </span>
                  </div>
                </div>
                <div className="us-quick-stats">
                  <div className="us-stat-item">
                    <span className="us-stat-value">
                      {user.projectsSubmitted}
                    </span>
                    <span className="us-stat-label">Projects</span>
                  </div>
                  <div className="us-stat-item">
                    <span
                      className={`us-stat-value ${getScoreColor(
                        user.projectQuality
                      )}`}
                    >
                      {user.projectQuality}
                    </span>
                    <span className="us-stat-label">Quality</span>
                  </div>
                  <div className="us-stat-item">
                    <span className="us-stat-value us-streak">
                      {user.streak}{" "}
                      <Flame size={14} className="us-streak-icon" />
                    </span>
                    <span className="us-stat-label">Streak</span>
                  </div>
                </div>
                <div className="us-expand-indicator">
                  {expanded === user.id ? (
                    <ChevronUp size={18} className="us-icon-chevron" />
                  ) : (
                    <ChevronDown size={18} className="us-icon-chevron" />
                  )}
                </div>
              </div>

              {expanded === user.id && (
                <div className="us-extended-details">
                  <div className="us-detailed-stats">
                    <div className="us-stat-row">
                      <span className="us-stat-name">Projects</span>
                      <div className="us-mini-progress-container">
                        <div
                          className="us-mini-progress-bar"
                          style={{
                            width: `${(user.projectsSubmitted / 30) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="us-stat-number">
                        {user.projectsSubmitted}
                      </span>
                    </div>
                    <div className="us-stat-row">
                      <span className="us-stat-name">Quality</span>
                      <div className="us-mini-progress-container">
                        <div
                          className={`us-mini-progress-bar us-quality ${getScoreColor(
                            user.projectQuality
                          )}`}
                          style={{ width: `${user.projectQuality}%` }}
                        ></div>
                      </div>
                      <span className="us-stat-number">
                        {user.projectQuality}%
                      </span>
                    </div>
                    <div className="us-stat-row">
                      <span className="us-stat-name">Streak</span>
                      <div className="us-mini-progress-container">
                        <div
                          className="us-mini-progress-bar us-streak"
                          style={{ width: `${(user.streak / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className="us-stat-number">{user.streak} days</span>
                    </div>
                  </div>

                  <div className="us-projects-section">
                    <h4 className="us-projects-title">Recent Projects</h4>
                    {user.recentProjects && user.recentProjects.length > 0 ? (
                      <div className="us-projects-grid">
                        {user.recentProjects.map((project) => (
                          <div
                            key={project._id}
                            className="us-project-card"
                            onClick={() => viewProject(project._id)}
                          >
                            <div className="us-project-info">
                              <span className="us-project-name">
                                {project.projectName}
                              </span>
                              <span className="us-project-day">
                                Day {project.day}
                              </span>
                            </div>
                            <ExternalLink
                              size={16}
                              className="us-project-link"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="us-no-projects">
                        <p>No projects found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
