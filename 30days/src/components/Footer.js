import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>Connect with the 30 Days of Code Challenge community</p>
      <div className="social-links">
        <a href="#" aria-label="GitHub">
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
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a href="#" aria-label="Discord">
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
            <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h4"></path>
            <circle cx="15" cy="15" r="1"></circle>
            <circle cx="18" cy="18" r="1"></circle>
            <circle cx="21" cy="21" r="1"></circle>
          </svg>
        </a>
        <a href="#" aria-label="Twitter">
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
            <path d="M22 4c-1 .5-2.1.9-3.2 1.1a4.5 4.5 0 0 0-7.8 3.1c0 .4 0 .7.1 1A12.8 12.8 0 0 1 3 5.2c-.5.8-.7 1.8-.7 2.8 0 1.9 1 3.5 2.3 4.5a4.5 4.5 0 0 1-2-.6v.1c0 2.2 1.5 4 3.6 4.4a4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1 9 9 0 0 1-5.6 2A9.3 9.3 0 0 1 2 21a12.8 12.8 0 0 0 7 2c8.3 0 13-7 13-13 0-.2 0-.4-.1-.6a9.1 9.1 0 0 0 2.3-2.4"></path>
          </svg>
        </a>
      </div>
      <p className="copyright">
        © 2025 30 Days of Code Challenge with VickyJay. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
