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

  // Mock data initialization
  useEffect(() => {
    // Simulate loading data
    const mockPosts = [
      {
        id: 1,
        user: {
          name: "Alex Johnson",
          avatar: "https://i.pravatar.cc/150?img=1",
          role: "Moderator",
        },
        content:
          "Just submitted my latest project! Check it out and let me know what you think.",
        timestamp: "2 hours ago",
        likes: 14,
        comments: 5,
        isLiked: false,
      },
      {
        id: 2,
        user: {
          name: "Sam Wilson",
          avatar: "https://i.pravatar.cc/150?img=5",
          role: "Contributor",
        },
        content:
          "Looking for collaborators on a new open-source submission system. Anyone interested?",
        timestamp: "5 hours ago",
        likes: 8,
        comments: 3,
        isLiked: true,
      },
      {
        id: 3,
        user: {
          name: "Taylor Smith",
          avatar: "https://i.pravatar.cc/150?img=11",
          role: "Member",
        },
        content:
          "Has anyone encountered issues with the submission API? Getting 404 errors suddenly.",
        timestamp: "1 day ago",
        likes: 5,
        comments: 7,
        isLiked: false,
      },
    ];

    const mockUsers = [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        submissions: 12,
        role: "Moderator",
      },
      {
        id: 2,
        name: "Sam Wilson",
        avatar: "https://i.pravatar.cc/150?img=5",
        submissions: 8,
        role: "Contributor",
      },
      {
        id: 3,
        name: "Casey Kim",
        avatar: "https://i.pravatar.cc/150?img=6",
        submissions: 5,
        role: "Member",
      },
      {
        id: 4,
        name: "Taylor Smith",
        avatar: "https://i.pravatar.cc/150?img=11",
        submissions: 3,
        role: "Member",
      },
    ];

    const mockSubmissions = [
      {
        id: 1,
        title: "AI Content Moderation System",
        author: "Alex Johnson",
        likes: 24,
        views: 156,
        thumbnail: "https://via.placeholder.com/150/007bff/ffffff?text=AI",
      },
      {
        id: 2,
        title: "Blockchain Submission Tracker",
        author: "Sam Wilson",
        likes: 18,
        views: 98,
        thumbnail:
          "https://via.placeholder.com/150/28a745/ffffff?text=Blockchain",
      },
      {
        id: 3,
        title: "React UI Component Library",
        author: "Casey Kim",
        likes: 32,
        views: 210,
        thumbnail: "https://via.placeholder.com/150/dc3545/ffffff?text=React",
      },
    ];

    setPosts(mockPosts);
    setUsers(mockUsers);
    setPopularSubmissions(mockSubmissions);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      user: {
        name: "Current User",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "Member",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Adjust the route as needed for your application
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="community-container">
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
            <ul className="contributors-list">
              {users.slice(0, 5).map((user) => (
                <li key={user.id} className="contributor-item">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="contributor-avatar"
                  />
                  <div className="contributor-info">
                    <span className="contributor-name">{user.name}</span>
                    <span className="contributor-role">{user.role}</span>
                  </div>
                  <span className="contributor-submissions">
                    {user.submissions} submissions
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Popular Submissions</h3>
            <div className="submissions-grid">
              {popularSubmissions.map((submission) => (
                <div key={submission.id} className="submission-card">
                  <img src={submission.thumbnail} alt={submission.title} />
                  <div className="submission-info">
                    <h4>{submission.title}</h4>
                    <p>by {submission.author}</p>
                    <div className="submission-stats">
                      <span>❤️ {submission.likes}</span>
                      <span>👁️ {submission.views}</span>
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
                <textarea
                  placeholder="Share something with the community..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="post-form-actions">
                  <button type="submit" className="post-button">
                    Post
                  </button>
                </div>
              </form>

              <div className="posts-list">
                {posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="post-avatar"
                      />
                      <div className="post-user-info">
                        <span className="post-username">{post.user.name}</span>
                        <span className="post-userrole">{post.user.role}</span>
                      </div>
                      <span className="post-time">{post.timestamp}</span>
                    </div>
                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>
                    <div className="post-actions">
                      <button
                        className={`like-button ${post.isLiked ? "liked" : ""}`}
                        onClick={() => handleLike(post.id)}
                      >
                        ❤️ {post.likes}
                      </button>
                      <button className="comment-button">
                        💬 {post.comments} comments
                      </button>
                      <button className="share-button">↗️ Share</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "discussions" && (
            <div className="discussions-container">
              <h2>Discussion Topics</h2>
              <div className="discussion-topics">
                <div className="topic-card">
                  <h3>Submission Guidelines</h3>
                  <p>
                    Latest updates to our submission requirements and formatting
                    standards
                  </p>
                  <div className="topic-stats">
                    <span>24 posts</span>
                    <span>Last updated 2 days ago</span>
                  </div>
                </div>
                <div className="topic-card">
                  <h3>Technical Support</h3>
                  <p>
                    Having issues with the submission system? Ask for help here
                  </p>
                  <div className="topic-stats">
                    <span>56 posts</span>
                    <span>Last updated 5 hours ago</span>
                  </div>
                </div>
                <div className="topic-card">
                  <h3>Feature Requests</h3>
                  <p>Suggest new features for the submission platform</p>
                  <div className="topic-stats">
                    <span>18 posts</span>
                    <span>Last updated 1 week ago</span>
                  </div>
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
                />
              </div>
              <div className="members-grid">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="member-card">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="member-avatar"
                    />
                    <h3>{user.name}</h3>
                    <p>{user.role}</p>
                    <div className="member-stats">
                      <span>{user.submissions} submissions</span>
                    </div>
                    <button className="message-button">Message</button>
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
