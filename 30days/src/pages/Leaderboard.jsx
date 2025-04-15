// Updated Leaderboard.jsx with improved mobile responsiveness
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.css";
import {
  Users,
  Crown,
  Award,
  Flame,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Calendar,
  Trophy,
  Code,
} from "lucide-react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "totalScore",
    direction: "descending",
  });
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(11); // 11 days left (19/30)

  useEffect(() => {
    // Simulating data fetch
    const mockData = [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744303867/ChatGPT_Image_Apr_2_2025_05_56_53_AM_fnlzvs.png",
        projectsSubmitted: 24,
        projectQuality: 92,
        streak: 15,
        totalScore: 131,
        projects: [
          { id: 101, name: "Task Manager App", day: 12, liveLink: "https://example.com/task-app" },
          { id: 102, name: "Weather Dashboard", day: 15, liveLink: "https://example.com/weather" },
          { id: 103, name: "Portfolio Website", day: 19, liveLink: "https://example.com/portfolio" },
        ],
      },
      {
        id: 2,
        name: "Sarah Miller",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744304003/IMG-20241127-WA0097_3_fjwtbx.jpg",
        projectsSubmitted: 19,
        projectQuality: 97,
        streak: 21,
        totalScore: 137,
        projects: [
          { id: 104, name: "Recipe Finder", day: 8, liveLink: "https://example.com/recipe" },
          { id: 105, name: "Movie Database", day: 14, liveLink: "https://example.com/movies" },
        ],
      },
      {
        id: 3,
        name: "David Chen",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744303867/ChatGPT_Image_Apr_2_2025_05_56_53_AM_fnlzvs.png",
        projectsSubmitted: 31,
        projectQuality: 85,
        streak: 7,
        totalScore: 123,
        projects: [
          { id: 106, name: "Chat Application", day: 5, liveLink: "https://example.com/chat" },
          { id: 107, name: "E-commerce Store", day: 10, liveLink: "https://example.com/store" },
          { id: 108, name: "Blog Platform", day: 21, liveLink: "https://example.com/blog" },
        ],
      },
      {
        id: 4,
        name: "Maria Rodriguez",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744303867/ChatGPT_Image_Apr_2_2025_05_56_53_AM_fnlzvs.png",
        projectsSubmitted: 26,
        projectQuality: 91,
        streak: 19,
        totalScore: 136,
        projects: [
          { id: 109, name: "Quiz App", day: 7, liveLink: "https://example.com/quiz" },
          { id: 110, name: "Fitness Tracker", day: 16, liveLink: "https://example.com/fitness" },
        ],
      },
      {
        id: 5,
        name: "James Wilson",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744304003/IMG-20241127-WA0097_3_fjwtbx.jpg",
        projectsSubmitted: 17,
        projectQuality: 88,
        streak: 12,
        totalScore: 117,
        projects: [
          { id: 111, name: "Budget Calculator", day: 9, liveLink: "https://example.com/budget" },
          { id: 112, name: "News Aggregator", day: 18, liveLink: "https://example.com/news" },
        ],
      },
      {
        id: 6,
        name: "Emma Thompson",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744303867/ChatGPT_Image_Apr_2_2025_05_56_53_AM_fnlzvs.png",
        projectsSubmitted: 23,
        projectQuality: 94,
        streak: 25,
        totalScore: 142,
        projects: [
          { id: 113, name: "Social Media Dashboard", day: 6, liveLink: "https://example.com/social" },
          { id: 114, name: "Music Player", day: 11, liveLink: "https://example.com/music" },
          { id: 115, name: "Note Taking App", day: 20, liveLink: "https://example.com/notes" },
        ],
      },
      {
        id: 7,
        name: "Michael Davis",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744303867/ChatGPT_Image_Apr_2_2025_05_56_53_AM_fnlzvs.png",
        projectsSubmitted: 21,
        projectQuality: 87,
        streak: 14,
        totalScore: 122,
        projects: [
          { id: 116, name: "Calendar App", day: 13, liveLink: "https://example.com/calendar" },
          { id: 117, name: "Todo List", day: 17, liveLink: "https://example.com/todo" },
        ],
      },
      {
        id: 42, // Your position
        name: "You",
        avatar: "https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744304003/IMG-20241127-WA0097_3_fjwtbx.jpg",
        projectsSubmitted: 18,
        projectQuality: 89,
        streak: 19,
        totalScore: 118,
        projects: [
          { id: 118, name: "Password Generator", day: 4, liveLink: "https://example.com/password" },
          { id: 119, name: "Drawing App", day: 22, liveLink: "https://example.com/draw" },
        ],
      },
    ];

    // Sort the data based on total score by default
    const sortedData = [...mockData].sort((a, b) => b.totalScore - a.totalScore);
    setLeaderboardData(sortedData);
  }, []);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    setLeaderboardData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const viewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="text-yellow-500" size={20} />;
    if (index === 1) return <Award className="text-gray-400" size={20} />;
    if (index === 2) return <Award className="text-amber-600" size={20} />;
    return <span className="font-bold text-gray-500">{index + 1}</span>;
  };

  return (
    <div className="leaderboard-page">
      {/* Challenge Header */}
      <div className="challenge-header">
        <div className="challenge-header-content">
          <h1>Welcome to the 30 Days Challenge!</h1>
          <p>Keep going! You're making great progress.</p>
          
          <div className="challenge-progress">
            <div className="progress-info">
              <span>19 / 30</span>
              <span>Day 19</span>
              <span>63% complete</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '63%' }}></div>
            </div>
          </div>
          
          <div className="challenge-actions">
            <button className="action-btn submit-btn">
              Submit Project
              <span>Upload today's challenge</span>
            </button>
            <button className="action-btn projects-btn">
              My Projects
              <span>18 submitted</span>
            </button>
            <button className="action-btn leaderboard-btn active">
              Leaderboard
              <span>Rank: #42 of 1204</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Container */}
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>Challenge Leaderboard</h2>
          <div className="leaderboard-stats">
            <div className="stat-bubble">
              <Trophy size={16} />
              <span>Top Performers</span>
            </div>
            <div className="stat-bubble">
              <Users size={16} />
              <span>1204 Participants</span>
            </div>
          </div>
        </div>

        <div className="leaderboard-controls">
          <button
            className={`sort-btn ${sortConfig.key === "totalScore" ? "active" : ""}`}
            onClick={() => requestSort("totalScore")}
          >
            Total Score
            {sortConfig.key === "totalScore" && (
              sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            className={`sort-btn ${sortConfig.key === "projectsSubmitted" ? "active" : ""}`}
            onClick={() => requestSort("projectsSubmitted")}
          >
            Projects
            {sortConfig.key === "projectsSubmitted" && (
              sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            className={`sort-btn ${sortConfig.key === "projectQuality" ? "active" : ""}`}
            onClick={() => requestSort("projectQuality")}
          >
            Quality
            {sortConfig.key === "projectQuality" && (
              sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
          <button
            className={`sort-btn ${sortConfig.key === "streak" ? "active" : ""}`}
            onClick={() => requestSort("streak")}
          >
            Streak
            {sortConfig.key === "streak" && (
              sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </button>
        </div>

        <div className="leaderboard-list">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className={`leaderboard-card ${expanded === user.id ? "expanded" : ""} ${user.id === 42 ? "current-user" : ""}`}
            >
              <div className="leaderboard-main" onClick={() => toggleExpand(user.id)}>
                <div className="rank-badge">
                  {getRankIcon(index)}
                </div>
                <div className="user-avatar">
                  <img src={user.avatar} alt={user.name} />
                  {user.id === 42 && <div className="user-you-badge">YOU</div>}
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <div className="score-info">
                    <span className={`total-score ${getScoreColor(user.totalScore)}`}>
                      {user.totalScore} pts
                    </span>
                  </div>
                </div>
                <div className="quick-stats">
                  <div className="stat-item">
                    <span className="stat-value">{user.projectsSubmitted}</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className={`stat-value ${getScoreColor(user.projectQuality)}`}>
                      {user.projectQuality}
                    </span>
                    <span className="stat-label">Quality</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value streak">
                      {user.streak} <Flame size={14} className="streak-icon" />
                    </span>
                    <span className="stat-label">Streak</span>
                  </div>
                </div>
              </div>

              {expanded === user.id && (
                <div className="extended-details">
                  <div className="detailed-stats">
                    <div className="stat-row">
                      <span className="stat-name">Projects</span>
                      <div className="mini-progress-container">
                        <div 
                          className="mini-progress-bar" 
                          style={{ width: `${(user.projectsSubmitted / 35) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-number">{user.projectsSubmitted}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Quality</span>
                      <div className="mini-progress-container">
                        <div 
                          className={`mini-progress-bar quality ${getScoreColor(user.projectQuality)}`}
                          style={{ width: `${user.projectQuality}%` }}
                        ></div>
                      </div>
                      <span className="stat-number">{user.projectQuality}%</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Streak</span>
                      <div className="mini-progress-container">
                        <div 
                          className="mini-progress-bar streak"
                          style={{ width: `${(user.streak / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-number">{user.streak} days</span>
                    </div>
                  </div>

                  <div className="projects-section">
                    <h4>Recent Projects</h4>
                    <div className="projects-grid">
                      {user.projects.map((project) => (
                        <div 
                          key={project.id} 
                          className="project-card"
                          onClick={() => viewProject(project.id)}
                        >
                          <div className="project-info">
                            <span className="project-name">{project.name}</span>
                            <span className="project-day">Day {project.day}</span>
                          </div>
                          <ExternalLink size={16} className="project-link" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;