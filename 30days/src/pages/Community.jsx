import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityPage.css";

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [popularSubmissions, setPopularSubmissions] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/community/all-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch community data");
        }

        const { data } = await response.json();
        
        setCurrentUser(data.currentUser);
        setUsers(data.users);
        setPopularSubmissions(data.popularSubmissions);
        setPosts([]); // Empty posts until implemented

      } catch (error) {
        console.error("Error fetching community data:", error);
        setUsers([]);
        setPopularSubmissions([]);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [navigate]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleLike = () => {
    setShowPopup(true);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="community-container">
        <div className="loading-indicator">Loading community data...</div>
      </div>
    );
  }

  return (
    <div className="community-container">
      {/* Coming Soon Popup */}
      {showPopup && (
        <div className="coming-soon-overlay">
          <div className="coming-soon-popup">
            <h2>Community Features Coming Soon!</h2>
            <p>We're working hard to bring you an amazing community experience.</p>
            <p>This is a preview of what's to come. Most features are currently disabled.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <header className="community-header">
        <div className="header-top">
          <button onClick={handleBackToDashboard} className="back-button">
            ← Back to Dashboard
          </button>
        </div>
        <h1>Community Hub</h1>
        <p>
          Connect with other members, share ideas, and get feedback on your
          submissions
        </p>
      </header>

      <div className="community-layout">
        <aside className="community-sidebar">
          <div className="sidebar-section">
            <h3>Top Contributors</h3>
            <div className="contributors-grid">
              {users.slice(0, 6).map((user, index) => (
                <div key={user.id} className={`contributor-card rank-${index + 1}`}>
                  <div className="contributor-rank">{index + 1}</div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="contributor-avatar"
                  />
                  <div className="contributor-details">
                    <h4 className="contributor-name">{user.name}</h4>
                    <p className="contributor-role">{user.role}</p>
                    <div className="contributor-stats">
                      <span className="submissions-count">
                        {user.submissions || 0} submissions
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Popular Submissions</h3>
            <div className="submissions-grid">
              {popularSubmissions.map((submission) => (
                <div key={submission.id} className="submission-card" onClick={() => setShowPopup(true)}>
                  <div className="submission-thumbnail">
                    <img src={submission.thumbnail} alt={submission.title} />
                  </div>
                  <div className="submission-info">
                    <h4>{submission.title}</h4>
                    <p className="submission-author">
                      by <span>@{submission.authorUsername || submission.author}</span>
                    </p>
                    <div className="submission-stats">
                      <span className="likes">❤️ {submission.likes || 0}</span>
                      <span className="views">👁️ {submission.views || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="community-main">
          <div className="community-tabs">
            <button
              className={activeTab === "feed" ? "active" : ""}
              onClick={() => setActiveTab("feed")}
            >
              Activity Feed
            </button>
            <button
              className={activeTab === "discussions" ? "active" : ""}
              onClick={() => setActiveTab("discussions")}
            >
              Discussions
            </button>
            <button
              className={activeTab === "members" ? "active" : ""}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
          </div>

          {activeTab === "feed" && (
            <div className="feed-container">
              <form onSubmit={handlePostSubmit} className="post-form">
                <div className="post-form-header">
                  <img
                    src={currentUser?.profileImage || "https://i.pravatar.cc/150?img=1"}
                    alt={currentUser?.fullName || currentUser?.username || "You"}
                    className="post-user-avatar"
                  />
                  <textarea
                    placeholder="Share something with the community..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    onClick={() => setShowPopup(true)}
                    readOnly
                  />
                </div>
                <div className="post-form-actions">
                  <button type="submit" className="post-button" disabled>
                    Post
                  </button>
                </div>
              </form>

              <div className="posts-list">
                {posts.length === 0 && (
                  <div className="empty-state">
                    <h3>No posts yet</h3>
                    <p>Be the first to share something with the community!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "discussions" && (
            <div className="discussions-container">
              <h2>Discussion Topics</h2>
              <div className="discussion-topics">
                <div className="empty-state">
                  <h3>Discussions coming soon</h3>
                  <p>We'll be launching discussion forums in the next update!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="members-container">
              <div className="members-search">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setShowPopup(true)}
                  readOnly
                />
              </div>
              <div className="members-grid">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="member-card" onClick={() => setShowPopup(true)}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="member-avatar"
                    />
                    <h3>{user.name}</h3>
                    <p className="member-role">{user.role}</p>
                    <div className="member-stats">
                      <span>{user.submissions || 0} submissions</span>
                    </div>
                    <button className="message-button" disabled>
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Community;