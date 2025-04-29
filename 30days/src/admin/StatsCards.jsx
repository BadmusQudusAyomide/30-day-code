import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileUpload, FaUsers, FaBolt, FaCalendarCheck } from "react-icons/fa";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalUsers: 0,
    activeToday: 0,
    challengeDay: 1,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchStat = async (endpoint, statKey) => {
    try {
      const res = await axios.get(`${API_URL}${endpoint}`, {
        withCredentials: true,
      });
      setStats((prev) => ({
        ...prev,
        [statKey]: res.data.count ?? res.data.day ?? 0,
      }));
      setErrors((prev) => ({ ...prev, [statKey]: null }));
    } catch (err) {
      console.error(`Error fetching ${statKey}:`, err);
      setErrors((prev) => ({ ...prev, [statKey]: err.message }));
      if (statKey === "challengeDay") {
        setStats((prev) => ({ ...prev, [statKey]: 1 }));
      }
    }
  };

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      setErrors({});

      await Promise.all([
        fetchStat("/api/projects/count", "totalSubmissions"),
        fetchStat("/api/auth/users/count", "totalUsers"),
        fetchStat("/api/auth/users/active", "activeToday"),
        fetchStat("/api/challenge/current-day", "challengeDay"),
      ]);

      setLoading(false);
    };

    fetchAllStats();
  }, []);

  const formatStat = (value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  };

  return (
    <div className="stats-container">
      {Object.values(errors).filter(Boolean).length > 0 && (
        <div className="stats-error">
          Some statistics failed to load. Try refreshing the page.
        </div>
      )}

      <div className="stat-card glass-card">
        <FaFileUpload className="stat-icon" />
        <div className="stat-value">
          {loading ? "..." : formatStat(stats.totalSubmissions)}
        </div>
        <div className="stat-label">Total Submissions</div>
        {errors.totalSubmissions && (
          <div className="stat-error">⚠️ Not available</div>
        )}
      </div>

      <div className="stat-card glass-card">
        <FaUsers className="stat-icon" />
        <div className="stat-value">
          {loading ? "..." : formatStat(stats.totalUsers)}
        </div>
        <div className="stat-label">Total Users</div>
      </div>

      <div className="stat-card glass-card">
        <FaBolt className="stat-icon" />
        <div className="stat-value">
          {loading ? "..." : formatStat(stats.activeToday)}
        </div>
        <div className="stat-label">Active Today</div>
        {errors.activeToday && (
          <div className="stat-error">⚠️ Not available</div>
        )}
      </div>

      <div className="stat-card glass-card">
        <FaCalendarCheck className="stat-icon" />
        <div className="stat-value">
          {loading ? "..." : `Day ${stats.challengeDay}/30`}
        </div>
        <div className="stat-label">Challenge Progress</div>
      </div>
    </div>
  );
};

export default StatsCards;
