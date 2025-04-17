import React from "react";

const StatsCards = () => {
  return (
    <div className="stats-container">
      <div className="stat-card glass-card">
        <i className="fas fa-file-upload stat-icon"></i>
        <div className="stat-value">1,248</div>
        <div className="stat-label">Total Submissions</div>
      </div>
      <div className="stat-card glass-card">
        <i className="fas fa-users stat-icon"></i>
        <div className="stat-value">86</div>
        <div className="stat-label">Total Users</div>
      </div>
      <div className="stat-card glass-card">
        <i className="fas fa-bolt stat-icon"></i>
        <div className="stat-value">42</div>
        <div className="stat-label">Active Today</div>
      </div>
      <div className="stat-card glass-card">
        <i className="fas fa-calendar-check stat-icon"></i>
        <div className="stat-value">Day 12/30</div>
        <div className="stat-label">Challenge Progress</div>
      </div>
    </div>
  );
};

export default StatsCards;
