// components/BackupLeaderboard.js
import React from "react";
import "./BackupLeaderboard.css";

const BackupLeaderboard = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) {
    return <div className="no-leaderboard">No leaderboard data available</div>;
  }

  return (
    <div className="backup-leaderboard">
      <h4 className="leaderboard-title">
        <i className="fas fa-trophy"></i> Leaderboard Snapshot
      </h4>
      <div className="leaderboard-podium">
        {leaderboard.slice(0, 3).map((user, index) => (
          <div key={user.id} className={`podium-item podium-${index + 1}`}>
            <div className="podium-rank">{index + 1}</div>
            <div className="podium-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-initials">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </div>
              )}
            </div>
            <div className="podium-name">{user.name}</div>
            <div className="podium-points">{user.totalPoints} pts</div>
          </div>
        ))}
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.slice(3, 10).map((user, index) => (
            <tr key={user.id}>
              <td>{index + 4}</td>
              <td className="user-cell">
                {user.avatar && (
                  <img
                    className="user-avatar"
                    src={user.avatar}
                    alt={user.name}
                  />
                )}
                <span>{user.name}</span>
              </td>
              <td>{user.totalPoints}</td>
              <td>{user.projectsSubmitted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackupLeaderboard;
