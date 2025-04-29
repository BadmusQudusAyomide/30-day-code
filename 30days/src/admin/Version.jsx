import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Version.css";

const Version = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [previousChallenge, setPreviousChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exporting, setExporting] = useState({
    current: false,
    previous: false,
  });
  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const [currentRes, previousRes] = await Promise.all([
          axios.get(`${API_URL}/api/challenge/active`),
          axios.get(`${API_URL}/api/challenge/previous`),
        ]);

        if (currentRes.data?.success)
          setCurrentChallenge(currentRes.data.challenge);
        if (previousRes.data?.success)
          setPreviousChallenge(previousRes.data.challenge);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [API_URL]);

  useEffect(() => {
    if (!currentChallenge?.startDate || !currentChallenge?.endDate) return;

    try {
      const start = new Date(currentChallenge.startDate);
      const end = new Date(currentChallenge.endDate);
      const today = new Date();

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("Invalid date range");
        return;
      }

      const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const passedDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1;
      const finalProgress = Math.min((passedDays / totalDays) * 100, 100);

      // Animate progress
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= finalProgress) {
          clearInterval(interval);
        }
        setProgress(Math.floor(current));
      }, 20);

      return () => clearInterval(interval);
    } catch (err) {
      console.error("Error calculating progress:", err);
    }
  }, [currentChallenge]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
    } catch (err) {
      return "Invalid date";
    }
  };

  const exportToCSV = async (challengeId, isCurrent) => {
    const exportKey = isCurrent ? "current" : "previous";
    setExporting((prev) => ({ ...prev, [exportKey]: true }));

    try {
      // Check for token in multiple possible locations
      let token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        (document.cookie.match(/token=([^;]+)/) || [])[1];

      if (!token) {
        console.error("Token not found in any storage");
        throw new Error("Please log in again - no session found");
      }

      console.log("Using token:", token.substring(0, 10) + "...");

      const response = await axios.get(
        `${API_URL}/api/challenge/${challengeId}/export`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      // Handle successful download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `challenge_${exportKey}_data.csv`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("Export error details:", {
        message: err.message,
        response: err.response?.data,
        stack: err.stack,
      });

      let errorMessage = "Export failed";
      if (err.message.includes("token")) {
        errorMessage = "Session expired - please log in again";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      alert(errorMessage);

      // Optionally redirect to login if token is invalid
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setExporting((prev) => ({ ...prev, [exportKey]: false }));
    }
  };
  const renderChallengeCard = (challenge, isCurrent) => {
    if (!challenge) return null;

    const isCompleted =
      challenge.endDate && new Date(challenge.endDate) < new Date();
    const statusClass = isCompleted ? "-ver-completed" : "-ver-active";
    const exportKey = isCurrent ? "current" : "previous";

    return (
      <div className={`-ver-card ${statusClass} -ver-animate-fadein`}>
        <h3 className="-ver-title -ver-animate-slideup">
          {challenge.name} {isCurrent ? "(Current)" : "(Previous)"}
        </h3>
        <div className="-ver-dates">
          <p
            className="-ver-animate-slideup"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="-ver-label">Start:</span>{" "}
            {formatDate(challenge.startDate)}
          </p>
          <p
            className="-ver-animate-slideup"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="-ver-label">End:</span>{" "}
            {formatDate(challenge.endDate)}
          </p>
        </div>
        <div
          className="-ver-status -ver-animate-slideup"
          style={{ animationDelay: "0.3s" }}
        >
          Status:{" "}
          <span className={`-ver-status-badge ${statusClass}`}>
            {isCompleted ? "Completed" : "Active"}
          </span>
        </div>

        {isCurrent && (
          <div
            className="-ver-progress-container -ver-animate-slideup"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="-ver-progress-bar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <button
          className={`-ver-export-btn -ver-animate-slideup ${statusClass}`}
          style={{ animationDelay: "0.5s" }}
          onClick={() => exportToCSV(challenge._id, isCurrent)}
          disabled={exporting[exportKey]}
        >
          {exporting[exportKey] ? (
            <>
              <span className="-ver-spinner-small"></span>
              Exporting...
            </>
          ) : (
            <>
              <i className="-ver-icon">📊</i>
              Export Data (CSV)
            </>
          )}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="-ver-loading-screen">
        <div className="-ver-spinner"></div>
        Loading challenge info...
      </div>
    );
  }

  return (
    <div className="-ver-container -ver-animate-fadein">
      <h2 className="-ver-header -ver-animate-slidedown">Challenge Versions</h2>

      <div className="-ver-challenges">
        {renderChallengeCard(currentChallenge, true)}
        {renderChallengeCard(previousChallenge, false)}
      </div>

      {!currentChallenge && !previousChallenge && (
        <div className="-ver-empty -ver-animate-fadein">
          <p>No challenge information available.</p>
        </div>
      )}
    </div>
  );
};

export default Version;
