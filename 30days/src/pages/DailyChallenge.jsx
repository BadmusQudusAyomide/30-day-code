import React, { useState } from "react";
import "./DailyChallenge.css";

const DailyChallenge = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read today's instructions", completed: false },
    { id: 2, title: "Write your code solution", completed: false },
    { id: 3, title: "Test your work thoroughly", completed: false },
    { id: 4, title: "Submit the challenge", completed: false },
  ]);

  const [activeTab, setActiveTab] = useState("current");
  const [newTaskText, setNewTaskText] = useState("");

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
          title: newTaskText,
          completed: false,
        },
      ]);
      setNewTaskText("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  const pastChallenges = [
    {
      day: 18,
      title: "API Integration",
      description:
        "Create a weather app that fetches data from a public API and displays current conditions and forecasts.",
      difficulty: "Intermediate",
    },
    {
      day: 17,
      title: "Authentication System",
      description:
        "Build a simple login/registration system with form validation and state management.",
      difficulty: "Advanced",
    },
    {
      day: 16,
      title: "CSS Animation",
      description:
        "Design an interactive button with hover effects and click animations using pure CSS.",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="daily-container">
      <div className="glass-card">
        <header className="challenge-header">
          <h1>🚀 Daily Challenge</h1>
          <p className="day-number">Day 19 of 30</p>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "current" ? "active" : ""}`}
              onClick={() => setActiveTab("current")}
            >
              Today's Challenge
            </button>
            <button
              className={`tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past Challenges
            </button>
            <button
              className={`tab ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => setActiveTab("stats")}
            >
              Your Stats
            </button>
          </div>
        </header>

        {activeTab === "current" && (
          <>
            <blockquote className="quote">
              "Success is the sum of small efforts, repeated day in and day
              out."
            </blockquote>

            <div className="challenge-details">
              <div className="challenge-header">
                <h2>Today's Challenge</h2>
                <span className="badge">Intermediate</span>
              </div>
              <p>
                Build a to-do list app using React. It should allow users to
                add, delete, and mark tasks as complete. Make sure it's
                responsive!
              </p>

              <div className="requirements">
                <h3>Requirements:</h3>
                <ul className="req-list">
                  <li>
                    Create a component structure with at least 3 components
                  </li>
                  <li>Implement state management using React hooks</li>
                  <li>Add form validation for new tasks</li>
                  <li>Style with CSS or a framework of your choice</li>
                </ul>
              </div>

              <div className="bonus-section">
                <h3>Bonus Points:</h3>
                <ul className="bonus-list">
                  <li>Add local storage to persist tasks</li>
                  <li>Implement drag and drop for task reordering</li>
                  <li>Add task categories or priority levels</li>
                </ul>
              </div>
            </div>

            <div className="task-list">
              <div className="task-header">
                <h3>Your Progress</h3>
                <form onSubmit={addTask} className="add-task-form">
                  <input
                    type="text"
                    placeholder="Add a task..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    className="task-input"
                  />
                  <button type="submit" className="add-task-btn">
                    +
                  </button>
                </form>
              </div>

              <ul>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <div
                      className="task-content"
                      onClick={() => toggleTask(task.id)}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                      />
                      <span>{task.title}</span>
                    </div>
                    <button
                      className="delete-task"
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="progress-wrapper">
              <div className="progress-label">
                {completedCount}/{tasks.length} Completed
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button
              className="complete-button"
              disabled={completedCount !== tasks.length}
            >
              ✅ Mark Challenge as Complete
            </button>

            <div className="help-resources">
              <h3>Helpful Resources</h3>
              <div className="resources-grid">
                <div className="resource-card">
                  <span className="resource-icon">📚</span>
                  <h4>React Docs</h4>
                </div>
                <div className="resource-card">
                  <span className="resource-icon">🎥</span>
                  <h4>Tutorial Video</h4>
                </div>
                <div className="resource-card">
                  <span className="resource-icon">💻</span>
                  <h4>Code Sandbox</h4>
                </div>
                <div className="resource-card">
                  <span className="resource-icon">🧩</span>
                  <h4>Component Library</h4>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "past" && (
          <div className="past-challenges">
            <h2>Previous Challenges</h2>
            <p className="subtitle">
              Revisit past challenges to practice your skills
            </p>

            {pastChallenges.map((challenge, index) => (
              <div className="past-challenge-card" key={index}>
                <div className="past-challenge-header">
                  <span className="day-badge">Day {challenge.day}</span>
                  <span
                    className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
                <div className="card-actions">
                  <button className="view-btn">View Details</button>
                  <button className="retry-btn">Retry Challenge</button>
                </div>
              </div>
            ))}

            <button className="view-all-btn">View All Past Challenges</button>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="stats-container">
            <h2>Your Challenge Statistics</h2>
            <p className="subtitle">
              Track your progress throughout the 30-day challenge
            </p>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">19</span>
                <span className="stat-label">Days Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">73%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">11</span>
                <span className="stat-label">Streak</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">4</span>
                <span className="stat-label">Perfect Scores</span>
              </div>
            </div>

            <div className="streak-calendar">
              <h3>Your Activity Calendar</h3>
              <div className="calendar-grid">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className={`calendar-day ${
                      i < 19
                        ? Math.random() > 0.2
                          ? "completed"
                          : "missed"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-progress">
              <h3>Skills Development</h3>
              <div className="skill-bar">
                <span className="skill-name">React</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="skill-percent">85%</span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">CSS</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="skill-percent">70%</span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">JavaScript</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <span className="skill-percent">92%</span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">API Integration</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <span className="skill-percent">65%</span>
              </div>
            </div>
          </div>
        )}

        <footer className="challenge-footer">
          <div className="footer-content">
            <div className="community-stats">
              <span>👥 2,457 participants today</span>
              <span>🏆 Top performer: DevNinja92</span>
            </div>
            <button className="share-btn">Share Progress</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DailyChallenge;
