import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Version.css";


const Version = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restoring, setRestoring] = useState(null);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      setError(null);

      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get("/api/admin/backups", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setBackups(response.data);
    } catch (err) {
      console.error("Failed to fetch backups:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (backupId) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const backupRes = await axios.get(`/api/admin/backups/${backupId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const backup = backupRes.data.backup;

      confirmAlert({
        title: "Confirm Restore",
        message: (
          <div className="restore-confirmation">
            <p>This will restore:</p>
            <ul>
              <li>
                <i className="fas fa-calendar-alt"></i> Challenge period:{" "}
                {new Date(
                  backup.data.metadata.challengePeriod.start
                ).toLocaleDateString()}{" "}
                to{" "}
                {new Date(
                  backup.data.metadata.challengePeriod.end
                ).toLocaleDateString()}
              </li>
              <li>
                <i className="fas fa-users"></i>{" "}
                {backup.data.statistics.totalParticipants} participants
              </li>
              <li>
                <i className="fas fa-project-diagram"></i>{" "}
                {backup.data.statistics.totalProjects} projects
              </li>
            </ul>
            <p>Continue with restore?</p>
          </div>
        ),
        buttons: [
          {
            label: "Yes, Restore Now",
            className: "confirm-restore-btn",
            onClick: async () => {
              try {
                setRestoring(backupId);
                await axios.post(
                  `/api/admin/restore-backup/${backupId}`,
                  {},
                  {
                    headers: { Authorization: `Bearer ${adminToken}` },
                  }
                );

                alert(
                  "System restored successfully! The page will now refresh."
                );
                window.location.reload();
              } catch (err) {
                alert(
                  `Restore failed: ${
                    err.response?.data?.message || err.message
                  }`
                );
              } finally {
                setRestoring(null);
              }
            },
          },
          {
            label: "Cancel",
            className: "cancel-btn",
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      });
    } catch (err) {
      alert(`Failed to get backup details: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  if (loading) {
    return (
      <div className="backup-loading">
        <i className="fas fa-circle-notch fa-spin"></i>
        <span>Loading backups...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backup-container">
        <div className="backup-error">
          <i className="fas fa-exclamation-circle"></i>
          <h3>Error loading backups</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchBackups}>
            <i className="fas fa-sync-alt"></i> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="backup-container">
      <div className="backup-header">
        <h1 className="backup-title">
          <i className="fas fa-history"></i> Challenge Backups
        </h1>
        <button
          className="refresh-button"
          onClick={fetchBackups}
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}></i>{" "}
          Refresh
        </button>
      </div>

      {backups.length === 0 ? (
        <div className="no-backups">
          <i className="fas fa-database"></i>
          <p>No backups available yet</p>
        </div>
      ) : (
        <div className="backup-grid">
          {backups.map((backup) => (
            <div key={backup._id} className="backup-item">
              <div className="backup-item-header">
                <h3 className="backup-item-title">{backup.name}</h3>
                <div className="backup-item-meta">
                  <span className="backup-date">
                    <i className="fas fa-calendar-alt"></i> {formatDate(backup.createdAt)}
                  </span>
                  <span className="backup-creator">
                    <i className="fas fa-user"></i> {backup.createdBy?.username || "System"}
                  </span>
                </div>
              </div>

              <div className="backup-item-stats">
                <div className="stat">
                  <span className="stat-label">Projects</span>
                  <span className="stat-value">{backup.data.statistics.totalProjects}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Users</span>
                  <span className="stat-value">{backup.data.statistics.totalParticipants}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Points</span>
                  <span className="stat-value">{backup.data.statistics.averagePoints.toFixed(1)}</span>
                </div>
              </div>

              {backup.data.metadata?.challengePeriod && (
                <div className="backup-item-period">
                  <div className="period-date">
                    <i className="fas fa-play"></i> Start:{" "}
                    {new Date(backup.data.metadata.challengePeriod.start).toLocaleDateString()}
                  </div>
                  <div className="period-date">
                    <i className="fas fa-flag-checkered"></i> End:{" "}
                    {new Date(backup.data.metadata.challengePeriod.end).toLocaleDateString()}
                  </div>
                </div>
              )}

              <div className="backup-item-actions">
                <button
                  className="restore-button"
                  onClick={() => handleRestore(backup._id)}
                  disabled={restoring === backup._id}
                >
                  {restoring === backup._id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-undo"></i>
                  )}
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Version;