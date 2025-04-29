import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("totalPoints");
  const [sortDirection, setSortDirection] = useState("desc");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/leaderboard/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.success) {
          setUsers(response.data.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to fetch leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  const handleSort = (field) => {
    const newDirection =
      field === sortField && sortDirection === "desc" ? "asc" : "desc";

    setSortField(field);
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      if (newDirection === "asc") {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setUsers(sortedUsers);
  };

  const getAvatarContent = (user) => {
    if (user.avatar) {
      return (
        <img className="ad-champion-avatar" src={user.avatar} alt={user.name} />
      );
    } else {
      const initials = user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

      return <div className="ad-avatar-initials">{initials}</div>;
    }
  };

  const getTableAvatarContent = (user) => {
    if (user.avatar) {
      return (
        <img
          className="ad-user-avatar-modern"
          src={user.avatar}
          alt={user.name}
        />
      );
    } else {
      const initials = user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

      return <div className="ad-table-avatar-initials">{initials}</div>;
    }
  };

  if (loading) {
    return (
      <div className="ad-leaderboard-loading">
        <div className="ad-loading-pulse"></div>
        <p>Loading leaderboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ad-leaderboard-error">
        <div className="ad-error-icon">⚠️</div>
        <h3>Error Loading Leaderboard</h3>
        <p>{error}</p>
        <button
          className="ad-btn-retry"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="ad-leaderboard-container-modern">
      <div className="ad-leaderboard-header-modern">
        <h2 className="ad-leaderboard-title-modern">Leaderboard</h2>
        <div className="ad-leaderboard-subtitle-modern">
          Top performers based on project submissions and ratings
        </div>
      </div>

      {users.length > 0 ? (
        <>
          {/* Podium Section */}
          <div className="ad-leaderboard-champions">
            <div className="ad-podium-wrapper">
              {/* First Place - Reordered for mobile */}
              {users[0] && (
                <div className="ad-champion-card ad-gold-card">
                  <div className="ad-champion-position">1</div>
                  <div className="ad-champion-crown ad-gold">👑</div>
                  <div className="ad-champion-avatar-container">
                    <div className="ad-champion-avatar-glow ad-gold-glow"></div>
                    {getAvatarContent(users[0])}
                  </div>
                  <div className="ad-champion-info">
                    <h3 className="ad-champion-name">{users[0].name}</h3>
                    <div className="ad-champion-points">
                      <span className="ad-points-value">
                        {users[0].totalPoints}
                      </span>
                      <span className="ad-points-label">points</span>
                    </div>
                    <div className="ad-champion-stats">
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          {users[0].projectsSubmitted}
                        </div>
                        <div className="ad-stat-label">Projects</div>
                      </div>
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          <span className="ad-streak-fire">🔥</span>{" "}
                          {users[0].streak}
                        </div>
                        <div className="ad-stat-label">Streak</div>
                      </div>
                    </div>
                    <a
                      href={`/admin/users/${users[0].id}/projects`}
                      className="ad-view-projects-btn ad-gold-btn"
                    >
                      View Projects
                    </a>
                  </div>
                </div>
              )}

              {/* Second Place */}
              {users[1] && (
                <div className="ad-champion-card ad-silver-card">
                  <div className="ad-champion-position">2</div>
                  <div className="ad-champion-crown ad-silver">🥈</div>
                  <div className="ad-champion-avatar-container">
                    <div className="ad-champion-avatar-glow ad-silver-glow"></div>
                    {getAvatarContent(users[1])}
                  </div>
                  <div className="ad-champion-info">
                    <h3 className="ad-champion-name">{users[1].name}</h3>
                    <div className="ad-champion-points">
                      <span className="ad-points-value">
                        {users[1].totalPoints}
                      </span>
                      <span className="ad-points-label">points</span>
                    </div>
                    <div className="ad-champion-stats">
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          {users[1].projectsSubmitted}
                        </div>
                        <div className="ad-stat-label">Projects</div>
                      </div>
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          <span className="ad-streak-fire">🔥</span>{" "}
                          {users[1].streak}
                        </div>
                        <div className="ad-stat-label">Streak</div>
                      </div>
                    </div>
                    <a
                      href={`/admin/users/${users[1].id}/projects`}
                      className="ad-view-projects-btn ad-silver-btn"
                    >
                      View Projects
                    </a>
                  </div>
                </div>
              )}

              {/* Third Place */}
              {users[2] && (
                <div className="ad-champion-card ad-bronze-card">
                  <div className="ad-champion-position">3</div>
                  <div className="ad-champion-crown ad-bronze">🥉</div>
                  <div className="ad-champion-avatar-container">
                    <div className="ad-champion-avatar-glow ad-bronze-glow"></div>
                    {getAvatarContent(users[2])}
                  </div>
                  <div className="ad-champion-info">
                    <h3 className="ad-champion-name">{users[2].name}</h3>
                    <div className="ad-champion-points">
                      <span className="ad-points-value">
                        {users[2].totalPoints}
                      </span>
                      <span className="ad-points-label">points</span>
                    </div>
                    <div className="ad-champion-stats">
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          {users[2].projectsSubmitted}
                        </div>
                        <div className="ad-stat-label">Projects</div>
                      </div>
                      <div className="ad-stat">
                        <div className="ad-stat-value">
                          <span className="ad-streak-fire">🔥</span>{" "}
                          {users[2].streak}
                        </div>
                        <div className="ad-stat-label">Streak</div>
                      </div>
                    </div>
                    <a
                      href={`/admin/users/${users[2].id}/projects`}
                      className="ad-view-projects-btn ad-bronze-btn"
                    >
                      View Projects
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="ad-leaderboard-table-container-modern">
            <div className="ad-table-header">
              <h3>Other Competitors</h3>
              <div className="ad-sort-controls">
                <span>Sort by:</span>
                <button
                  className={`ad-sort-btn ${
                    sortField === "totalPoints" ? "active" : ""
                  }`}
                  onClick={() => handleSort("totalPoints")}
                >
                  Points{" "}
                  {sortField === "totalPoints" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`ad-sort-btn ${
                    sortField === "projectsSubmitted" ? "active" : ""
                  }`}
                  onClick={() => handleSort("projectsSubmitted")}
                >
                  Projects{" "}
                  {sortField === "projectsSubmitted" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>

            <div className="ad-table-wrapper">
              <table className="ad-leaderboard-table-modern">
                <thead>
                  <tr>
                    <th className="ad-rank-column">Rank</th>
                    <th className="ad-user-column">User</th>
                    <th className="ad-projects-column">Projects</th>
                    <th className="ad-points-column">Points</th>
                    <th className="ad-streak-column">Streak</th>
                    <th className="ad-actions-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(3).map((user, index) => (
                    <tr key={user.id}>
                      <td className="ad-rank-cell-modern">{index + 4}</td>
                      <td className="ad-user-cell-modern">
                        <div className="ad-user-info">
                          {getTableAvatarContent(user)}
                          <span className="ad-user-name">{user.name}</span>
                        </div>
                      </td>
                      <td className="ad-projects-cell-modern">
                        {user.projectsSubmitted}
                      </td>
                      <td className="ad-points-cell-modern">
                        <span className="ad-points-badge-modern">
                          {user.totalPoints}
                        </span>
                      </td>
                      <td className="ad-streak-cell-modern">
                        <div className="ad-streak-display">
                          <span className="ad-streak-fire">🔥</span>
                          <span>{user.streak}</span>
                        </div>
                      </td>
                      <td className="ad-actions-cell-modern">
                        <a
                          href={`/admin/users/${user.id}/projects`}
                          className="ad-view-button-modern"
                        >
                          View Projects
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="ad-leaderboard-empty-modern">
          <div className="ad-empty-icon-modern">👥</div>
          <h3>No Users Found</h3>
          <p>
            No users have registered yet or there was an error fetching the
            data.
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
