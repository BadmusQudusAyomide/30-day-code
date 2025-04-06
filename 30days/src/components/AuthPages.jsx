import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";

const AuthPages = ({ onLoginSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup =
    new URLSearchParams(location.search).get("signup") === "true";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    strength: "weak",
    hasMinChars: false,
    hasNumber: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const hasMinChars = password.length >= 6;
    const hasNumber = /\d/.test(password);

    let strength = "weak";
    if (hasMinChars && hasNumber) strength = "strong";
    else if (hasMinChars || hasNumber) strength = "fair";

    setPasswordStrength({ strength, hasMinChars, hasNumber });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      console.log("User signed up:", formData);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } else {
      console.log("User logged in:", formData);
      localStorage.setItem("isAuthenticated", "true");
      onLoginSuccess();
      navigate("/");
    }
  };

  const handleOAuthLogin = (provider) => {
    alert(`OAuth login with ${provider} coming soon!`);
  };

  return (
    <div className="auth-page">
      <div className="auth-nav">
        <div className="auth-nav-links">
          <Link to="/login" className={!isSignup ? "active" : ""}>
            Login
          </Link>
          <Link to="/login?signup=true" className={isSignup ? "active" : ""}>
            Sign Up
          </Link>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon">
            <span>{isSignup ? "👤" : "🔐"}</span>
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          </div>

          <p className="auth-subtitle">
            {isSignup
              ? "Sign up to 30days code challenge"
              : "Login to continue"}
          </p>

          <div className="code-badge">Code &lt;30&gt;</div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {isSignup && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-indicator ${passwordStrength.strength}`}
                      style={{
                        width:
                          passwordStrength.strength === "weak"
                            ? "33%"
                            : passwordStrength.strength === "fair"
                            ? "66%"
                            : "100%",
                      }}
                    ></div>
                  </div>
                  <div className="strength-text">
                    {passwordStrength.strength}
                  </div>
                  <div className="password-requirements">
                    <div
                      className={`requirement ${
                        passwordStrength.hasMinChars ? "met" : ""
                      }`}
                    >
                      <span className="check-icon">
                        {passwordStrength.hasMinChars ? "✓" : "○"}
                      </span>
                      At least 6 characters
                    </div>
                    <div
                      className={`requirement ${
                        passwordStrength.hasNumber ? "met" : ""
                      }`}
                    >
                      <span className="check-icon">
                        {passwordStrength.hasNumber ? "✓" : "○"}
                      </span>
                      Contains a number
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isSignup && (
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="auth-button">
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          {!isSignup && (
            <div className="oauth-section">
              <div className="oauth-divider">
                <span>or continue with</span>
              </div>

              <div className="oauth-buttons">
                <button
                  className="oauth-button github"
                  onClick={() => handleOAuthLogin("GitHub")}
                >
                  <span className="oauth-icon">🐙</span> GitHub
                </button>

                <button
                  className="oauth-button google"
                  onClick={() => handleOAuthLogin("Google")}
                >
                  <span className="oauth-icon">🟢</span> Google
                </button>
              </div>
            </div>
          )}

          <div className="auth-footer">
            {isSignup ? (
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Link to="/login?signup=true">Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
