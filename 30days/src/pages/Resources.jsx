import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

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
    "frameworks",
    "apis",
    "testing",
    "design",
    "databases",
    "devops",
    "security",
    "community",
  ];

  // Featured resources data
  const featuredResources = [
    {
      title: "Next.js 14",
      description: "The React Framework for the Web",
      url: "https://nextjs.org",
      icon: "🚀",
      category: "frameworks",
      stars: "52.3k ⭐",
    },
    {
      title: "Tailwind CSS",
      description:
        "Rapidly build modern websites without ever leaving your HTML",
      url: "https://tailwindcss.com",
      icon: "🎨",
      category: "frameworks",
      stars: "68.9k ⭐",
    },
    {
      title: "Vercel",
      description: "Develop. Preview. Ship. For the best frontend teams",
      url: "https://vercel.com",
      icon: "▲",
      category: "devops",
      stars: "Popular",
    },
    {
      title: "Postman",
      description: "API platform for building and using APIs",
      url: "https://postman.com",
      icon: "📬",
      category: "apis",
      stars: "20M+ users",
    },
  ];

  // Filter resources based on search term
  const filteredResources = featuredResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`res-developer-resources ${darkMode ? "res-dark-mode" : ""}`}
    >
      {/* Back to Dashboard Button */}
      <div className="res-dashboard-back">
        <button
          className="res-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
        <button
          className="res-theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? "☀️" : "🌙"}
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
            Curated collection of 500+ tools, documentation, and learning
            resources for modern developers
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

          <div className="res-stats">
            <div className="res-stat">
              <strong>500+</strong> Resources
            </div>
            <div className="res-stat">
              <strong>50+</strong> Categories
            </div>
            <div className="res-stat">
              <strong>100K+</strong> Developers
            </div>
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
        {/* Featured Resources Section */}
        <section className="res-resource-section" id="featured">
          <h2 className="res-section-title">
            <span className="res-section-icon">⭐</span>
            Featured Resources
            <span className="res-section-count">
              {featuredResources.length} featured
            </span>
          </h2>
          <div className="res-featured-grid">
            {filteredResources.map((resource, index) => (
              <div className="res-featured-card" key={index}>
                <div className="res-featured-icon">{resource.icon}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="res-featured-meta">
                  <span className="res-featured-tag">{resource.category}</span>
                  <span className="res-featured-stars">{resource.stars}</span>
                </div>
                <div className="res-featured-actions">
                  <a
                    href={resource.url}
                    className="res-featured-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes(resource.url) ? "res-bookmarked" : ""
                    }`}
                    onClick={() => toggleBookmark(resource.url)}
                    aria-label={`Bookmark ${resource.title}`}
                  >
                    {bookmarks.includes(resource.url) ? "★" : "☆"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

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
            <span className="res-section-count">24 resources</span>
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
                    <span className="res-resource-tag res-tag-popular">
                      Popular
                    </span>
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
                    <span className="res-resource-tag res-tag-essential">
                      Professional
                    </span>
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
                    <span className="res-resource-tag res-tag-lightweight">
                      Lightweight
                    </span>
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
                    href="https://neovim.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-neovim">NV</span>
                    Neovim
                    <span className="res-resource-tag res-tag-terminal">
                      Terminal
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://neovim.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://neovim.io/")}
                    aria-label="Bookmark Neovim"
                  >
                    {bookmarks.includes("https://neovim.io/") ? "★" : "☆"}
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
                    <span className="res-resource-tag res-tag-essential">
                      Essential
                    </span>
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
                    <span className="res-resource-tag res-tag-popular">
                      Popular
                    </span>
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
                    href="https://gitlab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-gitlab">GL</span>
                    GitLab
                    <span className="res-resource-tag res-tag-ci">CI/CD</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://gitlab.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://gitlab.com/")}
                    aria-label="Bookmark GitLab"
                  >
                    {bookmarks.includes("https://gitlab.com/") ? "★" : "☆"}
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
                    <span className="res-resource-tag res-tag-gui">GUI</span>
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
                    <span className="res-resource-tag res-tag-essential">
                      Essential
                    </span>
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
                    <span className="res-resource-tag res-tag-fast">Fast</span>
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
                    href="https://pnpm.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-pnpm">pnpm</span>
                    pnpm
                    <span className="res-resource-tag res-tag-efficient">
                      Efficient
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://pnpm.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://pnpm.io/")}
                    aria-label="Bookmark pnpm"
                  >
                    {bookmarks.includes("https://pnpm.io/") ? "★" : "☆"}
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
                    <span className="res-resource-tag res-tag-python">
                      Python
                    </span>
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
            <span className="res-section-count">32 resources</span>
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
                    <span className="res-resource-tag res-tag-essential">
                      Essential
                    </span>
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
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-react">⚛️</span>
                    React Docs
                    <span className="res-resource-tag res-tag-framework">
                      Framework
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://react.dev/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://react.dev/")}
                    aria-label="Bookmark React Docs"
                  >
                    {bookmarks.includes("https://react.dev/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://vuejs.org/guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-vue">Vue</span>
                    Vue.js Docs
                    <span className="res-resource-tag res-tag-framework">
                      Framework
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://vuejs.org/guide/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://vuejs.org/guide/")}
                    aria-label="Bookmark Vue.js Docs"
                  >
                    {bookmarks.includes("https://vuejs.org/guide/") ? "★" : "☆"}
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
                    <span className="res-resource-tag res-tag-framework">
                      Framework
                    </span>
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

            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Backend</h3>
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
                    href="https://nodejs.org/en/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-node">Node</span>
                    Node.js Docs
                    <span className="res-resource-tag res-tag-runtime">
                      Runtime
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://nodejs.org/en/docs/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://nodejs.org/en/docs/")
                    }
                    aria-label="Bookmark Node.js Docs"
                  >
                    {bookmarks.includes("https://nodejs.org/en/docs/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-express">Ex</span>
                    Express.js Docs
                    <span className="res-resource-tag res-tag-framework">
                      Framework
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://expressjs.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://expressjs.com/")}
                    aria-label="Bookmark Express.js Docs"
                  >
                    {bookmarks.includes("https://expressjs.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://docs.djangoproject.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-django">Dj</span>
                    Django Docs
                    <span className="res-resource-tag res-tag-python">
                      Python
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://docs.djangoproject.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://docs.djangoproject.com/")
                    }
                    aria-label="Bookmark Django Docs"
                  >
                    {bookmarks.includes("https://docs.djangoproject.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://laravel.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-laravel">Lv</span>
                    Laravel Docs
                    <span className="res-resource-tag res-tag-php">PHP</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://laravel.com/docs")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://laravel.com/docs")}
                    aria-label="Bookmark Laravel Docs"
                  >
                    {bookmarks.includes("https://laravel.com/docs") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Resources Section */}
        <section
          className={`res-resource-section ${
            activeCategory !== "all" && activeCategory !== "learning"
              ? "res-hidden"
              : ""
          }`}
          id="learning"
        >
          <h2 className="res-section-title">
            <span className="res-section-icon">🎓</span>
            Learning Resources
            <span className="res-section-count">45 resources</span>
          </h2>
          <div className="res-cards-container">
            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Interactive Learning</h3>
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
                    href="https://www.freecodecamp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-fcc">FCC</span>
                    freeCodeCamp
                    <span className="res-resource-tag res-tag-free">Free</span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.freecodecamp.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.freecodecamp.org/")
                    }
                    aria-label="Bookmark freeCodeCamp"
                  >
                    {bookmarks.includes("https://www.freecodecamp.org/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.codecademy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-codecademy">CA</span>
                    Codecademy
                    <span className="res-resource-tag res-tag-interactive">
                      Interactive
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.codecademy.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.codecademy.com/")
                    }
                    aria-label="Bookmark Codecademy"
                  >
                    {bookmarks.includes("https://www.codecademy.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.theodinproject.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-odin">Odin</span>
                    The Odin Project
                    <span className="res-resource-tag res-tag-open-source">
                      Open Source
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.theodinproject.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.theodinproject.com/")
                    }
                    aria-label="Bookmark The Odin Project"
                  >
                    {bookmarks.includes("https://www.theodinproject.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://exercism.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-exercism">Ex</span>
                    Exercism
                    <span className="res-resource-tag res-tag-practice">
                      Practice
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://exercism.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://exercism.org/")}
                    aria-label="Bookmark Exercism"
                  >
                    {bookmarks.includes("https://exercism.org/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>Video Courses</h3>
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
                    href="https://www.udemy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-udemy">Ud</span>
                    Udemy
                    <span className="res-resource-tag res-tag-courses">
                      Courses
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.udemy.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://www.udemy.com/")}
                    aria-label="Bookmark Udemy"
                  >
                    {bookmarks.includes("https://www.udemy.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.pluralsight.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-pluralsight">
                      PS
                    </span>
                    Pluralsight
                    <span className="res-resource-tag res-tag-professional">
                      Professional
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://www.pluralsight.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://www.pluralsight.com/")
                    }
                    aria-label="Bookmark Pluralsight"
                  >
                    {bookmarks.includes("https://www.pluralsight.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://frontendmasters.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-fem">FE</span>
                    Frontend Masters
                    <span className="res-resource-tag res-tag-frontend">
                      Frontend
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://frontendmasters.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleBookmark("https://frontendmasters.com/")
                    }
                    aria-label="Bookmark Frontend Masters"
                  >
                    {bookmarks.includes("https://frontendmasters.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://egghead.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-egghead">Eh</span>
                    egghead.io
                    <span className="res-resource-tag res-tag-short">
                      Short Lessons
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://egghead.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://egghead.io/")}
                    aria-label="Bookmark egghead.io"
                  >
                    {bookmarks.includes("https://egghead.io/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section
          className={`res-resource-section ${
            activeCategory !== "all" && activeCategory !== "frameworks"
              ? "res-hidden"
              : ""
          }`}
          id="frameworks"
        >
          <h2 className="res-section-title">
            <span className="res-section-icon">🧩</span>
            Frameworks & Libraries
            <span className="res-section-count">28 resources</span>
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
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-react">⚛️</span>
                    React
                    <span className="res-resource-tag res-tag-popular">
                      Popular
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://reactjs.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://reactjs.org/")}
                    aria-label="Bookmark React"
                  >
                    {bookmarks.includes("https://reactjs.org/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://vuejs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-vue">Vue</span>
                    Vue.js
                    <span className="res-resource-tag res-tag-progressive">
                      Progressive
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://vuejs.org/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://vuejs.org/")}
                    aria-label="Bookmark Vue.js"
                  >
                    {bookmarks.includes("https://vuejs.org/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://angular.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-angular">A</span>
                    Angular
                    <span className="res-resource-tag res-tag-enterprise">
                      Enterprise
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://angular.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://angular.io/")}
                    aria-label="Bookmark Angular"
                  >
                    {bookmarks.includes("https://angular.io/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://svelte.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-svelte">Sv</span>
                    Svelte
                    <span className="res-resource-tag res-tag-compiler">
                      Compiler
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://svelte.dev/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://svelte.dev/")}
                    aria-label="Bookmark Svelte"
                  >
                    {bookmarks.includes("https://svelte.dev/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>

            <div className="res-resource-card">
              <div className="res-card-header">
                <h3>CSS Frameworks</h3>
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
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-tailwind">Tw</span>
                    Tailwind CSS
                    <span className="res-resource-tag res-tag-utility">
                      Utility-first
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://tailwindcss.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://tailwindcss.com/")}
                    aria-label="Bookmark Tailwind CSS"
                  >
                    {bookmarks.includes("https://tailwindcss.com/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://getbootstrap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-bootstrap">Bs</span>
                    Bootstrap
                    <span className="res-resource-tag res-tag-popular">
                      Popular
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://getbootstrap.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://getbootstrap.com/")}
                    aria-label="Bookmark Bootstrap"
                  >
                    {bookmarks.includes("https://getbootstrap.com/")
                      ? "★"
                      : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://bulma.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-bulma">Bl</span>
                    Bulma
                    <span className="res-resource-tag res-tag-flexbox">
                      Flexbox
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://bulma.io/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://bulma.io/")}
                    aria-label="Bookmark Bulma"
                  >
                    {bookmarks.includes("https://bulma.io/") ? "★" : "☆"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://chakra-ui.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-resource-icon res-chakra">Ck</span>
                    Chakra UI
                    <span className="res-resource-tag res-tag-accessibility">
                      Accessible
                    </span>
                  </a>
                  <button
                    className={`res-bookmark-btn ${
                      bookmarks.includes("https://chakra-ui.com/")
                        ? "res-bookmarked"
                        : ""
                    }`}
                    onClick={() => toggleBookmark("https://chakra-ui.com/")}
                    aria-label="Bookmark Chakra UI"
                  >
                    {bookmarks.includes("https://chakra-ui.com/") ? "★" : "☆"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trending Tools Section */}
        <section className="res-resource-section" id="trending">
          <h2 className="res-section-title">
            <span className="res-section-icon">🔥</span>
            Trending Tools
            <span className="res-section-count">New & Popular</span>
          </h2>
          <div className="res-trending-slider">
            <div className="res-trending-card">
              <div className="res-trending-icon">🚀</div>
              <h3>Next.js 14</h3>
              <p>The React Framework for Production with improved App Router</p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">Framework</span>
                <span className="res-trending-stars">52.3k ⭐</span>
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
              <h3>Bun</h3>
              <p>
                Fast JavaScript runtime, bundler, test runner, and package
                manager
              </p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">Runtime</span>
                <span className="res-trending-stars">41.7k ⭐</span>
              </div>
              <a
                href="https://bun.sh"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>

            <div className="res-trending-card">
              <div className="res-trending-icon">🔄</div>
              <h3>Tauri</h3>
              <p>
                Build smaller, faster, and more secure desktop apps with web
                technologies
              </p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">Desktop</span>
                <span className="res-trending-stars">67.2k ⭐</span>
              </div>
              <a
                href="https://tauri.app"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>

            <div className="res-trending-card">
              <div className="res-trending-icon">🛠️</div>
              <h3>Astro</h3>
              <p>Build faster websites with less client-side JavaScript</p>
              <div className="res-trending-meta">
                <span className="res-trending-tag">SSG</span>
                <span className="res-trending-stars">32.8k ⭐</span>
              </div>
              <a
                href="https://astro.build"
                className="res-trending-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </a>
            </div>
          </div>
        </section>

        {/* Bookmarked Resources Section */}
        <section className="res-resource-section" id="bookmarks">
          <h2 className="res-section-title">
            <span className="res-section-icon">🔖</span>
            My Bookmarked Resources
            <span className="res-section-count">{bookmarks.length} saved</span>
          </h2>
          {bookmarks.length > 0 ? (
            <div className="res-bookmarks-list">
              {bookmarks.map((url) => {
                const resource = featuredResources.find(
                  (r) => r.url === url
                ) || { title: url, description: "" };
                return (
                  <div className="res-bookmark-item" key={url}>
                    <div className="res-bookmark-content">
                      <h3>{resource.title}</h3>
                      {resource.description && <p>{resource.description}</p>}
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </div>
                    <button
                      className="res-remove-bookmark-btn"
                      onClick={() => toggleBookmark(url)}
                      aria-label="Remove bookmark"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
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
              Get weekly curated resources, tools, and industry insights
              delivered to your inbox.
            </p>
            <div className="res-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="res-newsletter-input"
              />
              <button className="res-newsletter-submit">Subscribe</button>
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
                <span className="res-social-icon">🐦</span> Twitter
              </a>
              <a href="#" aria-label="GitHub">
                <span className="res-social-icon">🐙</span> GitHub
              </a>
              <a href="#" aria-label="LinkedIn">
                <span className="res-social-icon">💼</span> LinkedIn
              </a>
              <a href="#" aria-label="Discord">
                <span className="res-social-icon">💬</span> Discord
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
                <a href="#learning">Learning Resources</a>
              </li>
              <li>
                <a href="#frameworks">Frameworks</a>
              </li>
              <li>
                <a href="#bookmarks">My Bookmarks</a>
              </li>
            </ul>
          </div>

          <div className="res-footer-section">
            <h3>Categories</h3>
            <ul>
              {categories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <li key={category}>
                    <a
                      href={`#${category.replace(/\s+/g, "-")}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </a>
                  </li>
                ))}
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
              <li>
                <a href="#contact">Contact</a>
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
