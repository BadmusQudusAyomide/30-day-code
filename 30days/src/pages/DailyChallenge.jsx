import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added import for Link
import axios from "axios";
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
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

  // Fetch current day from API
  useEffect(() => {
    const fetchCurrentDay = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle no token case
          setCurrentDay(1);
          setLoading(false);
          return;
        }

        const authHeader = `Bearer ${token}`;
        const dayResponse = await axios.get(
          `${API_URL}/api/challenge/current-day`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );

        // Set the day from the API response
        setCurrentDay(dayResponse.data.day || 1);
      } catch (err) {
        setError("Failed to load current challenge day");
        // Fallback to day 1
        setCurrentDay(1);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDay();
  }, [API_URL]);

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

  const allChallenges = [
    {
      day: 1,
      title: "Counter App",
      description:
        "Build a simple counter that can increment, decrement, and reset.",
      difficulty: "Beginner",
      requirements: [
        "Create a component with count state",
        "Implement increment, decrement and reset functionality",
        "Display the current count",
      ],
    },
    {
      day: 2,
      title: "Todo List",
      description:
        "Create a basic todo list that allows adding and removing items.",
      difficulty: "Beginner",
      requirements: [
        "Create input for new todos",
        "Display list of todos",
        "Implement delete functionality",
      ],
    },
    {
      day: 3,
      title: "Weather App",
      description: "Fetch weather data from an API and display it.",
      difficulty: "Intermediate",
      requirements: [
        "Use fetch or axios to get weather data",
        "Display relevant weather information",
        "Add loading states",
      ],
    },
    {
      day: 4,
      title: "Calculator",
      description: "Build a functional calculator with basic operations.",
      difficulty: "Intermediate",
      requirements: [
        "Implement all basic math operations",
        "Handle decimal numbers",
        "Clear functionality",
      ],
    },
    {
      day: 5,
      title: "Quiz App",
      description: "Create a multiple choice quiz with score tracking.",
      difficulty: "Intermediate",
      requirements: [
        "Store quiz questions",
        "Track user answers",
        "Calculate and display score",
      ],
    },
    {
      day: 6,
      title: "Recipe Finder",
      description: "Search for recipes using an API and display results.",
      difficulty: "Intermediate",
      requirements: [
        "Implement search functionality",
        "Display recipe cards",
        "Show recipe details",
      ],
    },
    {
      day: 7,
      title: "Expense Tracker",
      description: "Track income and expenses with visualization.",
      difficulty: "Intermediate",
      requirements: [
        "Add/remove transactions",
        "Calculate balance",
        "Display chart of expenses",
      ],
    },
    {
      day: 8,
      title: "Memory Game",
      description: "Create a card matching memory game.",
      difficulty: "Intermediate",
      requirements: [
        "Generate random card pairs",
        "Track matched pairs",
        "Add timer/score",
      ],
    },
    {
      day: 9,
      title: "Blog App",
      description: "Create a blog with posts and comments.",
      difficulty: "Advanced",
      requirements: [
        "Display blog posts",
        "Add comment functionality",
        "Implement routing",
      ],
    },
    {
      day: 10,
      title: "E-commerce Product Page",
      description: "Build a product page with cart functionality.",
      difficulty: "Advanced",
      requirements: [
        "Product gallery",
        "Add to cart functionality",
        "Cart preview",
      ],
    },
    {
      day: 11,
      title: "Authentication System",
      description: "Implement login/register with form validation.",
      difficulty: "Advanced",
      requirements: [
        "Create auth forms",
        "Form validation",
        "Mock authentication",
      ],
    },
    {
      day: 12,
      title: "Drag and Drop Board",
      description: "Create a kanban board with drag and drop.",
      difficulty: "Advanced",
      requirements: [
        "Create draggable cards",
        "Implement drop zones",
        "Persist state",
      ],
    },
    {
      day: 13,
      title: "Chat App UI",
      description: "Build a real-time chat interface.",
      difficulty: "Advanced",
      requirements: [
        "Message list",
        "Input for new messages",
        "Mock real-time updates",
      ],
    },
    {
      day: 14,
      title: "Movie Database",
      description: "Create a movie search app with favorites.",
      difficulty: "Advanced",
      requirements: [
        "Search movies from API",
        "Display movie details",
        "Favorite functionality",
      ],
    },
    {
      day: 15,
      title: "Music Player",
      description: "Build a music player with playlists.",
      difficulty: "Advanced",
      requirements: ["Audio playback", "Playlist management", "Progress bar"],
    },
    {
      day: 16,
      title: "CSS Animation Challenge",
      description: "Create interactive UI with advanced CSS animations.",
      difficulty: "Intermediate",
      requirements: ["Hover effects", "Transitions", "Keyframe animations"],
    },
    {
      day: 17,
      title: "API Integration Challenge",
      description: "Fetch and display data from multiple APIs.",
      difficulty: "Advanced",
      requirements: [
        "Combine data from 2+ APIs",
        "Error handling",
        "Loading states",
      ],
    },
    {
      day: 18,
      title: "Form Validation",
      description: "Build a complex form with validation.",
      difficulty: "Intermediate",
      requirements: [
        "Multiple field types",
        "Real-time validation",
        "Submission handling",
      ],
    },
    {
      day: 19,
      title: "Responsive Dashboard",
      description: "Create a responsive admin dashboard.",
      difficulty: "Advanced",
      requirements: [
        "Responsive layout",
        "Data visualization",
        "Interactive elements",
      ],
    },
    {
      day: 20,
      title: "Portfolio Website",
      description: "Build your personal portfolio site.",
      difficulty: "Intermediate",
      requirements: [
        "About/projects sections",
        "Contact form",
        "Responsive design",
      ],
    },
    {
      day: 21,
      title: "Redux Todo App",
      description: "Recreate todo app using Redux for state management.",
      difficulty: "Advanced",
      requirements: [
        "Redux store setup",
        "Actions and reducers",
        "Connect components",
      ],
    },
    {
      day: 22,
      title: "Infinite Scroll",
      description: "Implement infinite scroll with API pagination.",
      difficulty: "Advanced",
      requirements: [
        "Detect scroll position",
        "Load more data",
        "Performance optimization",
      ],
    },
    {
      day: 23,
      title: "Dark Mode Toggle",
      description: "Add theme switching to an app.",
      difficulty: "Intermediate",
      requirements: ["Theme context", "Toggle component", "Persist preference"],
    },
    {
      day: 24,
      title: "Accessibility Audit",
      description: "Improve an existing app's accessibility.",
      difficulty: "Intermediate",
      requirements: [
        "Keyboard navigation",
        "ARIA attributes",
        "Screen reader testing",
      ],
    },
    {
      day: 25,
      title: "TypeScript Conversion",
      description: "Convert a JavaScript React app to TypeScript.",
      difficulty: "Advanced",
      requirements: [
        "Type interfaces",
        "Type props and state",
        "Fix type errors",
      ],
    },
    {
      day: 26,
      title: "Performance Optimization",
      description: "Identify and fix performance bottlenecks.",
      difficulty: "Advanced",
      requirements: ["React.memo", "useCallback/useMemo", "Code splitting"],
    },
    {
      day: 27,
      title: "Testing Challenge",
      description: "Add unit and integration tests to an app.",
      difficulty: "Advanced",
      requirements: ["Jest setup", "Component tests", "Mock API calls"],
    },
    {
      day: 28,
      title: "Custom Hooks",
      description: "Create reusable custom hooks.",
      difficulty: "Advanced",
      requirements: [
        "Extract hook logic",
        "Handle dependencies",
        "Document usage",
      ],
    },
    {
      day: 29,
      title: "Open Source Contribution",
      description: "Contribute to an open source React project.",
      difficulty: "Advanced",
      requirements: ["Find an issue", "Make a PR", "Address feedback"],
    },
    {
      day: 30,
      title: "Capstone Project",
      description: "Build a complete app using all learned concepts.",
      difficulty: "Advanced",
      requirements: [
        "Combine multiple features",
        "Polish UI/UX",
        "Deploy to production",
      ],
    },
  ];

  // Get the current challenge based on the current day
  const currentChallenge =
    allChallenges.find((challenge) => challenge.day === currentDay) ||
    allChallenges[0];

  // Get past challenges based on the current day
  const pastChallenges = allChallenges
    .filter((challenge) => challenge.day < currentDay)
    .reverse();

  const reactResources = [
    {
      title: "React Official Documentation",
      url: "https://reactjs.org/docs/getting-started.html",
      type: "documentation",
    },
    {
      title: "React Hooks Cheat Sheet",
      url: "https://react-hooks-cheatsheet.com/",
      type: "cheatsheet",
    },
    {
      title: "React Tutorial for Beginners",
      url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
      type: "video",
    },
    {
      title: "React Patterns",
      url: "https://reactpatterns.com/",
      type: "patterns",
    },
    {
      title: "React TypeScript Cheat Sheet",
      url: "https://react-typescript-cheatsheet.netlify.app/",
      type: "cheatsheet",
    },
    {
      title: "React Testing Library",
      url: "https://testing-library.com/docs/react-testing-library/intro/",
      type: "testing",
    },
  ];

  if (loading) {
    return (
      <div className="daily-container">
        <div className="glass-card">
          {/* Back to Dashboard Button */}
          <div className="back-nav">
            <Link to="/dashboard" className="back-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <header className="challenge-header">
            <h1>🚀 30-Day React Challenge</h1>
            <div className="loading-spinner"></div>
            <p>Loading today's challenge...</p>
          </header>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="daily-container">
        <div className="glass-card">
          {/* Back to Dashboard Button */}
          <div className="back-nav">
            <Link to="/dashboard" className="back-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <header className="challenge-header">
            <h1>🚀 30-Day React Challenge</h1>
            <div className="error-message">
              <p>{error}</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-container">
      <div className="glass-card">
        {/* Back to Dashboard Button */}
        <div className="back-nav">
          <Link to="/dashboard" className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <header className="challenge-header">
          <h1>🚀 30-Day React Challenge</h1>
          <p className="day-number">Day {currentDay} of 30</p>
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
              "The secret of getting ahead is getting started." - Mark Twain
            </blockquote>

            <div className="challenge-details">
              <div className="challenge-header">
                <h2>{currentChallenge.title}</h2>
                <span
                  className={`badge difficulty-${currentChallenge.difficulty.toLowerCase()}`}
                >
                  {currentChallenge.difficulty}
                </span>
              </div>
              <p>{currentChallenge.description}</p>

              <div className="requirements">
                <h3>Requirements:</h3>
                <ul className="req-list">
                  {currentChallenge.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="bonus-section">
                <h3>Bonus Points:</h3>
                <ul className="bonus-list">
                  <li>Make it responsive for all screen sizes</li>
                  <li>Add animations and transitions</li>
                  <li>Implement local storage persistence</li>
                  <li>Write unit tests for your components</li>
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
              <h3>React Resources</h3>
              <div className="resources-grid">
                {reactResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card"
                  >
                    <span className="resource-icon">
                      {resource.type === "video"
                        ? "🎥"
                        : resource.type === "documentation"
                        ? "📚"
                        : resource.type === "cheatsheet"
                        ? "📝"
                        : "🧩"}
                    </span>
                    <h4>{resource.title}</h4>
                  </a>
                ))}
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

            {pastChallenges.length > 0 ? (
              pastChallenges.map((challenge) => (
                <div className="past-challenge-card" key={challenge.day}>
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
              ))
            ) : (
              <div className="no-past-challenges">
                <p>You're just getting started! No past challenges yet.</p>
              </div>
            )}

            {pastChallenges.length > 0 && (
              <button className="view-all-btn">View All Past Challenges</button>
            )}
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
                <span className="stat-number">{currentDay - 1}</span>
                <span className="stat-label">Days Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {Math.round(((currentDay - 1) / 30) * 100)}%
                </span>
                <span className="stat-label">Overall Progress</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {currentDay > 1 ? currentDay - 1 : 0}
                </span>
                <span className="stat-label">Current Streak</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {Math.floor((currentDay - 1) / 7)}
                </span>
                <span className="stat-label">Weeks Completed</span>
              </div>
            </div>

            <div className="streak-calendar">
              <h3>Your Progress Calendar</h3>
              <div className="calendar-grid">
                {allChallenges.map((challenge) => (
                  <div
                    key={challenge.day}
                    className={`calendar-day ${
                      challenge.day < currentDay
                        ? "completed"
                        : challenge.day === currentDay
                        ? "current"
                        : "upcoming"
                    }`}
                    title={`Day ${challenge.day}: ${challenge.title}`}
                  >
                    {challenge.day}
                  </div>
                ))}
              </div>
              <div className="calendar-legend">
                <div className="legend-item">
                  <span className="legend-color completed"></span>
                  <span>Completed</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color current"></span>
                  <span>Current</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color upcoming"></span>
                  <span>Upcoming</span>
                </div>
              </div>
            </div>

            <div className="skill-progress">
              <h3>Skills Development</h3>
              <div className="skill-bar">
                <span className="skill-name">React Fundamentals</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${Math.min(100, (currentDay / 30) * 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="skill-percent">
                  {Math.round((currentDay / 30) * 100)}%
                </span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">State Management</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, ((currentDay - 5) / 25) * 100)
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="skill-percent">
                  {Math.round(Math.max(0, ((currentDay - 5) / 25) * 100))}%
                </span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">API Integration</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, ((currentDay - 2) / 28) * 100)
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="skill-percent">
                  {Math.round(Math.max(0, ((currentDay - 2) / 28) * 100))}%
                </span>
              </div>
              <div className="skill-bar">
                <span className="skill-name">UI/UX Design</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{
                      width: `${Math.min(100, (currentDay / 15) * 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="skill-percent">
                  {Math.round((currentDay / 15) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <footer className="challenge-footer">
          <div className="footer-content">
            <div className="community-stats">
              <span>
                👥 {Math.floor(Math.random() * 2000) + 1000} participants today
              </span>
              <span>
                🏆 Top performer: ReactMaster{Math.floor(Math.random() * 100)}
              </span>
            </div>
            <button className="share-btn">Share Your Progress</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DailyChallenge;
