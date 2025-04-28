import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Code <span className="accent">&lt;30&gt;</span>
            </h3>
            <p className="footer-tagline">
              Connect with the 30 Days of Code Challenge community
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigate</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#rules">Rules</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Past Challenges</a>
                </li>
                <li>
                  <a href="#">Learning Path</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} 30 Days of Code Challenge with
            VickyJay. All rights reserved.
          </p>
          <p className="footer-love">
            Made by Snap Dragon Team<Heart size={16} className="heart-icon" />for  developers
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
