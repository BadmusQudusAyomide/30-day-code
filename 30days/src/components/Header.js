import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        Code &lt;30&gt;
      </Link>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#rules">Rules</a>
        <a href="#faq">FAQ</a>
      </div>

      <div className="cta-buttons">
        <Link to="/login" className="btn btn-outline">
  Login
</Link>
<Link to="/login?signup=true" className="btn btn-primary">
  Sign up
</Link>

      </div>
    </header>
  );
};

export default Header;
