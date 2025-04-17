import React from "react";

const Users = () => {
  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      joined: "12 days ago",
      status: "active",
      submissions: 12,
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@example.com",
      joined: "11 days ago",
      status: "active",
      submissions: 12,
    },
    {
      id: 3,
      name: "David Kim",
      email: "david@example.com",
      joined: "10 days ago",
      status: "active",
      submissions: 12,
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      joined: "9 days ago",
      status: "active",
      submissions: 11,
    },
    {
      id: 5,
      name: "James Brown",
      email: "james@example.com",
      joined: "8 days ago",
      status: "active",
      submissions: 10,
    },
    {
      id: 6,
      name: "Olivia Davis",
      email: "olivia@example.com",
      joined: "7 days ago",
      status: "inactive",
      submissions: 5,
    },
  ];

  return (
    <div>
      <h2 className="section-title">User Management</h2>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Submissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        user.id % 2 === 0 ? "women" : "men"
                      }/${user.id}.jpg`}
                      alt={user.name}
                      className="user-avatar"
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.joined}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{user.submissions}</td>
                <td>
                  <div className="user-actions">
                    <button
                      className="btn btn-neumorphic"
                      style={{ marginRight: "5px" }}
                    >
                      <i className="fas fa-envelope"></i>
                    </button>
                    <button className="btn btn-neumorphic">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;