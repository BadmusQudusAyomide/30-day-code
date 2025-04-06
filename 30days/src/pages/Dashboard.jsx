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
  });

  // Simulate loading user data
  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    console.log("Dashboard loaded - would fetch user data here");
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
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
          >
            {userData.name.charAt(0)}
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <h1 className="welcome">Welcome to the 30 Days Challenge!</h1>

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
                  width: `${(userData.currentDay / userData.totalDays) * 100}%`,
                }}
              ></div>
            </div>
            <div className="day-text">Day {userData.currentDay}</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div
            className="grid-item"
            onClick={() => handleNavigation("/submit-project")}
          >
            <div className="item-icon">📤</div>
            <div className="item-content">
              <h3>Submit Project</h3>
              <p>Upload today's challenge</p>
            </div>
          </div>

          <div
            className="grid-item"
            onClick={() => handleNavigation("/my-projects")}
          >
            <div className="item-icon">📁</div>
            <div className="item-content">
              <h3>My Projects</h3>
              <p>{userData.projectsSubmitted} submitted</p>
            </div>
          </div>

          <div
            className="grid-item"
            onClick={() => handleNavigation("/leaderboard")}
          >
            <div className="item-icon">🏆</div>
            <div className="item-content">
              <h3>Leaderboard</h3>
              <p>Rank: #{userData.rank}</p>
            </div>
          </div>

          <div
            className="grid-item"
            onClick={() => handleNavigation("/daily-challenge")}
          >
            <div className="item-icon">📝</div>
            <div className="item-content">
              <h3>Daily Challenge</h3>
              <p>Day {userData.currentDay} task</p>
            </div>
          </div>

          <div
            className="grid-item"
            onClick={() => handleNavigation("/resources")}
          >
            <div className="item-icon">📚</div>
            <div className="item-content">
              <h3>Resources</h3>
              <p>Helpful materials</p>
            </div>
          </div>

          <div
            className="grid-item"
            onClick={() => handleNavigation("/community")}
          >
            <div className="item-icon">👥</div>
            <div className="item-content">
              <h3>Community</h3>
              <p>{userData.totalParticipants} participants</p>
            </div>
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
        <p>Code&lt;30&gt; Challenge © 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
