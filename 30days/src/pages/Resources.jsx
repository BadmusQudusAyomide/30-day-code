import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("devResourcesBookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage when updated
  useEffect(() => {
    localStorage.setItem("devResourcesBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (resourceUrl) => {
    if (bookmarks.includes(resourceUrl)) {
      setBookmarks(bookmarks.filter((url) => url !== resourceUrl));
    } else {
      setBookmarks([...bookmarks, resourceUrl]);
    }
  };

  const categories = [
    "all",
    "developer tools",
    "documentation",
    "learning",
    "setup",
    "testing",
    "contribution",
    "community",
  ];

  return (
    <div className="res-developer-resources">
      {/* Back to Dashboard Button */}
      <div className="res-dashboard-back">
        <button 
          className="res-back-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <nav className="res-top-nav">
        <div className="res-logo">
          <span className="res-dev-icon">{"</>"}</span>
          <span className="res-logo-text">DevHub</span>
        </div>

        <button
          className="res-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`res-nav-links ${isMobileMenuOpen ? "res-open" : ""}`}>
          <a href="#bookmarks">
            My Bookmarks{" "}
            <span className="res-bookmark-count">{bookmarks.length}</span>
          </a>
          <a href="#trending">Trending</a>
          <a href="#contribute">Contribute</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <header className="res-header">
        <div className="res-header-content">
          <h1>Developer Resources Hub</h1>
          <p>
            Your ultimate collection of tools, documentation, and learning
            resources
          </p>

          <div className="res-search-container">
            <input
              type="text"
              placeholder="Search resources..."
              className="res-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="res-search-button">
              <span className="res-search-icon">🔍</span>
              <span className="res-search-text">Search</span>
            </button>
          </div>
        </div>

        <div className="res-animated-shapes">
          <div className="res-shape res-shape-1"></div>
          <div className="res-shape res-shape-2"></div>
          <div className="res-shape res-shape-3"></div>
        </div>
      </header>

      <div className="res-category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`res-category-tab ${
              activeCategory === category ? "res-active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="res-resources-container">
        {/* Developer Tools Section */}
        <section
          className={`res-resource-section ${
            activeCategory !== "all" && activeCategory !== "developer tools"
              ? "res-hidden"
              : ""
          }`}
          id="developer-tools"
        >
          <h2 className="res-section-title">
            <span className="res-section-icon">🛠️</span>
            Developer Tools
            <span className="res-section-count">12 resources</span>
          </h2>
          <div className="res-cards-container">
            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Code Editors</h3>
                <button
                  className="res-card-expand-btn"
                  aria-label="Expand section"
                >
                  +
                </button>
              </div>
              <ul>
                <li>
                  <a
                    href="https://code.visualstudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-vs-code">VS</span>
                    VS Code
                    <span className="res-resource-tag">Popular</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://code.visualstudio.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://code.visualstudio.com/")
                    }
                    aria-label="Bookmark VS Code"
                  >
                    {bookmarks.includes("https://code.visualstudio.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.jetbrains.com/idea/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-intellij">IJ</span>
                    IntelliJ IDEA
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.jetbrains.com/idea/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.jetbrains.com/idea/")
                    }
                    aria-label="Bookmark IntelliJ IDEA"
                  >
                    {bookmarks.includes("https://www.jetbrains.com/idea/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.sublimetext.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-sublime">ST</span>
                    Sublime Text
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.sublimetext.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.sublimetext.com/")
                    }
                    aria-label="Bookmark Sublime Text"
                  >
                    {bookmarks.includes("https://www.sublimetext.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://atom.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-atom">A</span>
                    Atom
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://atom.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://atom.io/")}
                    aria-label="Bookmark Atom"
                  >
                    {bookmarks.includes("https://atom.io/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Version Control</h3>
                <button
                  className="res-card-expand-btn"
                  aria-label="Expand section"
                >
                  +
                </button>
              </div>
              <ul>
                <li>
                  <a
                    href="https://git-scm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-git">Git</span>
                    Git
                    <span className="res-resource-tag">Essential</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://git-scm.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://git-scm.com/")}
                    aria-label="Bookmark Git"
                  >
                    {bookmarks.includes("https://git-scm.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-github">GH</span>
                    GitHub
                    <span className="res-resource-tag">Popular</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://github.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://github.com/")}
                    aria-label="Bookmark GitHub"
                  >
                    {bookmarks.includes("https://github.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://about.gitlab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-gitlab">GL</span>
                    GitLab
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://about.gitlab.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://about.gitlab.com/")}
                    aria-label="Bookmark GitLab"
                  >
                    {bookmarks.includes("https://about.gitlab.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.gitkraken.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-gitkraken">GK</span>
                    GitKraken
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.gitkraken.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://www.gitkraken.com/")}
                    aria-label="Bookmark GitKraken"
                  >
                    {bookmarks.includes("https://www.gitkraken.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Package Managers</h3>
                <button
                  className="res-card-expand-btn"
                  aria-label="Expand section"
                >
                  +
                </button>
              </div>
              <ul>
                <li>
                  <a
                    href="https://www.npmjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-npm">npm</span>
                    npm
                    <span className="res-resource-tag">Essential</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.npmjs.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://www.npmjs.com/")}
                    aria-label="Bookmark npm"
                  >
                    {bookmarks.includes("https://www.npmjs.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://yarnpkg.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-yarn">Y</span>
                    Yarn
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://yarnpkg.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://yarnpkg.com/")}
                    aria-label="Bookmark Yarn"
                  >
                    {bookmarks.includes("https://yarnpkg.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://pip.pypa.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-pip">pip</span>
                    pip (Python)
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://pip.pypa.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://pip.pypa.io/")}
                    aria-label="Bookmark pip"
                  >
                    {bookmarks.includes("https://pip.pypa.io/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://getcomposer.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-composer">C</span>
                    Composer (PHP)
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://getcomposer.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://getcomposer.org/")}
                    aria-label="Bookmark Composer"
                  >
                    {bookmarks.includes("https://getcomposer.org/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section
          className={`res-resource-section ${
            activeCategory !== "all" && activeCategory !== "documentation"
              ? "res-hidden"
              : ""
          }`}
          id="documentation"
        >
          <h2 className="res-section-title">
            <span className="res-section-icon">📚</span>
            Technical Documentation
            <span className="res-section-count">12 resources</span>
          </h2>
          <div className="res-cards-container">
            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Frontend</h3>
                <button
                  className="res-card-expand-btn"
                  aria-label="Expand section"
                >
                  +
                </button>
              </div>
              <ul>
                <li>
                  <a
                    href="https://developer.mozilla.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-mdn">MDN</span>
                    MDN Web Docs
                    <span className="res-resource-tag">Essential</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://developer.mozilla.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://developer.mozilla.org/")
                    }
                    aria-label="Bookmark MDN Web Docs"
                  >
                    {bookmarks.includes("https://developer.mozilla.org/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://reactjs.org/docs/getting-started.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-react">⚛️</span>
                    React Docs
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes(
                        "https://reactjs.org/docs/getting-started.html"
                      )
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark(
                        "https://reactjs.org/docs/getting-started.html"
                      )
                    }
                    aria-label="Bookmark React Docs"
                  >
                    {bookmarks.includes(
                      "https://reactjs.org/docs/getting-started.html"
                    )
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://vuejs.org/v2/guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-vue">Vue</span>
                    Vue.js Docs
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://vuejs.org/v2/guide/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://vuejs.org/v2/guide/")
                    }
                    aria-label="Bookmark Vue.js Docs"
                  >
                    {bookmarks.includes("https://vuejs.org/v2/guide/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://angular.io/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-angular">A</span>
                    Angular Docs
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://angular.io/docs")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://angular.io/docs")}
                    aria-label="Bookmark Angular Docs"
                  >
                    {bookmarks.includes("https://angular.io/docs") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* New Section: Trending Tools */}
        <section className="res-resource-section" id="trending">
          <h2 className="res-section-title">
            <span className="res-section-icon">🔥</span>
            Trending Tools
            <span className="res-section-count">New & Popular</span>
          </h2>
          <div className="res-trending-slider">
            <div className="res-trending-card">
              <div className="res-trending-icon">🚀</div>
              <h3>Next.js 13</h3>
              <p>React framework with improved routing and styling</p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">Framework</span>
                <span className="res-trending-stars">45.2k ⭐</span>
              </div>
              <a
                href="https://nextjs.org"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>

            <div className="res-trending-card">
              <div className="res-trending-icon">⚡</div>
              <h3>Tailwind CSS</h3>
              <p>Utility-first CSS framework for rapid UI development</p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">CSS</span>
                <span className="res-trending-stars">68.9k ⭐</span>
              </div>
              <a
                href="https://tailwindcss.com"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>

            <div className="res-trending-card">
              <div className="res-trending-icon">🔄</div>
              <h3>Rome</h3>
              <p>All-in-one toolchain for JavaScript and TypeScript</p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">Tooling</span>
                <span className="res-trending-stars">21.3k ⭐</span>
              </div>
              <a
                href="https://rome.tools"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>
          </div>
        </section>

        {/* New Section: Bookmarked Resources */}
        <section className="res-resource-section" id="bookmarks">
          <h2 className="res-section-title">
            <span className="res-section-icon">🔖</span>
            My Bookmarked Resources
            <span className="res-section-count">{bookmarks.length} saved</span>
          </h2>
          {bookmarks.length > 0 ? (
            <div className="res-bookmarks-list">
              {bookmarks.map((url) => (
                <div className="res-bookmark-item" key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                  <button
                    className="res-remove-bookmark-btn"
                    onClick={() => toggleBookmark(url)}
                    aria-label="Remove bookmark"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="res-empty-bookmarks">
              <p>You haven't bookmarked any resources yet.</p>
              <p>Click the ☆ icon next to resources to save them here.</p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="res-newsletter-section">
          <div className="res-newsletter-content">
            <h2>Stay Updated with Developer Trends</h2>
            <p>
              Get weekly curated resources and tools delivered to your inbox.
            </p>
            <div className="res-newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
            <p className="res-newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </div>

      <footer className="res-footer">
        <div className="res-footer-content">
          <div className="res-footer-section">
            <h3>DevHub</h3>
            <p>
              Your central hub for developer resources, tools, and learning
              materials.
            </p>
            <div className="res-social-links">
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="GitHub">
                🐙
              </a>
              <a href="#" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" aria-label="Discord">
                💬
              </a>
            </div>
          </div>

          <div className="res-footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#developer-tools">Developer Tools</a>
              </li>
              <li>
                <a href="#documentation">Documentation</a>
              </li>
              <li>
                <a href="#trending">Trending Tools</a>
              </li>
              <li>
                <a href="#bookmarks">My Bookmarks</a>
              </li>
            </ul>
          </div>

          <div className="res-footer-section">
            <h3>Information</h3>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contribute">Contribute</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="res-footer-bottom">
          <p>
            © {new Date().getFullYear()} Developer Resources Hub. Made with 💻
            by developers for developers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
