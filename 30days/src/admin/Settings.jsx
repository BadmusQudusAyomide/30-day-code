import React, { useState } from "react";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetStatus, setResetStatus] = useState(null);

  const handleStartChallenge = () => {
    alert("🔥 Challenge started! 30 days of awesomeness begins now!");
  };

const handleResetData = async () => {
  if (!window.confirm("⚠️ This will delete ALL challenge data (projects, points) but keep user accounts. Create backup first?")) {
    return;
  }

  setIsResetting(true);
  setResetStatus(null);

  try {
    const adminToken = localStorage.getItem("adminToken");
    const response = await axios.post("/api/admin/reset-with-backup", {}, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    setResetStatus({
      type: "success",
      message: "Challenge reset successfully! Backup created.",
    });
  } catch (error) {
    setResetStatus({
      type: "error",
      message: error.response?.data?.message || "Failed to reset challenge"
    });
  } finally {
    setIsResetting(false);
  }
};

  const viewBackup = () => {
    if (resetStatus?.backupId) {
      // Navigate to backup view or show modal
      alert(
        `Backup ID: ${resetStatus.backupId}\nRedirecting to backup details...`
      );
      // window.location.href = `/admin/backups/${resetStatus.backupId}`;
    }
  };

  return (
    <div className="simple-challenge-container">
      <h1 className="main-title">Admin Challenge Controls</h1>

      <div className="settings-card">
        <h2 className="settings-title">
          <i className="fas fa-crown"></i> Challenge Administration
        </h2>

        <div className="fixed-setting">
          <i className="fas fa-calendar"></i>
          <span>Fixed Duration: 30 Days</span>
        </div>

        <div className="action-buttons">
          <button className="start-button pulse" onClick={handleStartChallenge}>
            <i className="fas fa-rocket"></i> START CHALLENGE
          </button>

          <button
            className={`reset-button ${isResetting ? "loading" : ""}`}
            onClick={handleResetData}
            disabled={isResetting}
          >
            {isResetting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Resetting...
              </>
            ) : (
              <>
                <i className="fas fa-trash-alt"></i> Reset Challenge Data
              </>
            )}
          </button>
        </div>

        {resetStatus && (
          <div className={`reset-status ${resetStatus.type}`}>
            <p>
              {resetStatus.type === "success" ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-exclamation-triangle"></i>
              )}
              {resetStatus.message}
            </p>
            {resetStatus.backupId && (
              <button className="view-backup-button" onClick={viewBackup}>
                <i className="fas fa-archive"></i> View Backup
              </button>
            )}
          </div>
        )}
      </div>

      <div className="quick-settings">
        <h3>
          <i className="fas fa-sliders-h"></i> Quick Options
        </h3>
        <div className="setting-option">
          <i className="fas fa-bell"></i> Notifications: ON
        </div>
        <div className="setting-option">
          <i className="fas fa-envelope"></i> Email Reminders: ON
        </div>
      </div>
    </div>
  );
};

export default Settings;
