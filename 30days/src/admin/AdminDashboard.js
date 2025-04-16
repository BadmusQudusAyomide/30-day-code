import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import StatsCards from "./StatsCards";
import Leaderboard from "./Leaderboard";
import Submissions from "./Submissions";
import Users from "./Users";
import Settings from "./Settings";
import "./styles.css";

function AdminDashboard({ onLogout }) {
  const [activeView, setActiveView] = useState("leaderboard");

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main-content">
        <TopNav onLogout={onLogout} />
        <StatsCards />
        <div className="content-area">
          {activeView === "leaderboard" && <Leaderboard />}
          {activeView === "submissions" && <Submissions />}
          {activeView === "users" && <Users />}
          {activeView === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
