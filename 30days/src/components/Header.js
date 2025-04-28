import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <Code className="logo-icon" size={28} />
          <span className="logo-text">
            Code <span className="accent">&lt;30&gt;</span>
          </span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#rules" onClick={() => setMenuOpen(false)}>
            Rules
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
        </nav>

        <div className={`cta-buttons ${menuOpen ? "open" : ""}`}>
          <Link
            to="/login"
            className="btn btn-outline"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/login?signup=true"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
