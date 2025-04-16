import React from 'react';

const Leaderboard = () => {
  const topUsers = [
    { id: 1, name: 'Alex Johnson', points: 245, submissions: 12, streak: 12, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Sarah Miller', points: 230, submissions: 12, streak: 10, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'David Kim', points: 215, submissions: 12, streak: 8, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
  ];

  const allUsers = [
    { id: 4, name: 'Emma Wilson', points: 200, submissions: 12, status: 'active' },
    { id: 5, name: 'James Brown', points: 195, submissions: 11, status: 'active' },
    { id: 6, name: 'Olivia Davis', points: 180, submissions: 10, status: 'active' },
    { id: 7, name: 'Michael Lee', points: 175, submissions: 10, status: 'active' },
    { id: 8, name: 'Sophia Martinez', points: 160, submissions: 9, status: 'active' },
    { id: 9, name: 'William Taylor', points: 150, submissions: 8, status: 'active' },
    { id: 10, name: 'Ava Anderson', points: 140, submissions: 7, status: 'inactive' }
  ];

  return (
    <div>
      <h2 className="section-title">Leaderboard</h2>
      
      <div className="leaderboard-top">
        {topUsers.map((user, index) => (
          <div key={user.id} className="top-user glass-card">
            <div className="user-rank">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
            </div>
            <img src={user.avatar} alt={user.name} className="user-avatar-lg" />
            <h3 className="user-name">{user.name}</h3>
            <div className="user-points">{user.points} pts</div>
            <div className="user-submissions">{user.submissions} submissions</div>
            <div className="user-streak">
              <i className="fas fa-fire streak-icon"></i>
              {user.streak} day streak
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Submissions</th>
              <th>Points</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 4}</td>
                <td>{user.name}</td>
                <td>{user.submissions}</td>
                <td>{user.points}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-neumorphic">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;