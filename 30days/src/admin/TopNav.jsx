import React from "react";

const TopNav = () => {
  return (
    <div className="top-nav glass-card">
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="input-field" />
      </div>
      <div className="nav-actions">
        <div className="notification-badge">
          <i className="fas fa-bell"></i>
          <span>3</span>
        </div>
        <div className="user-profile">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Admin"
            className="user-avatar"
          />
          <span>Admin</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
