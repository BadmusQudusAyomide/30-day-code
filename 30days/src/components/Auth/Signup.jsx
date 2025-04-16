import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import "./Signup.css";
import "./signupFormFix.css"; 


const Signup = ({ onLoginSuccess }) => {
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

  const navigate = useNavigate();

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log("User signed up:", formData);
    localStorage.setItem("isAuthenticated", "true");
    onLoginSuccess();
    navigate("/dashboard");
  };

  const handleOAuthLogin = (provider) => {
    console.log(`Signing up with ${provider}`);
    alert(
      `Signing up with ${provider} - this would redirect to OAuth in a real app`
    );
  };

  return (
    <div className="auth-container neumorphic-container">
      <div className="auth-card neumorphic-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the 30-day coding challenge</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-group neumorphic-inset">
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

          <div className="form-group">
            <label>Email</label>
            <div className="input-group neumorphic-inset">
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
            <div className="input-group neumorphic-inset">
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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className={`strength-indicator ${passwordStrength.strength}`}
                ></div>
              </div>
              <div className="strength-text">
                {passwordStrength.strength} password
              </div>
              <div className="password-requirements">
                <div
                  className={`requirement ${
                    passwordStrength.hasMinChars ? "met" : ""
                  }`}
                >
                  ✓ At least 6 characters
                </div>
                <div
                  className={`requirement ${
                    passwordStrength.hasNumber ? "met" : ""
                  }`}
                >
                  ✓ Contains a number
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group neumorphic-inset">
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button neumorphic-button primary"
          >
            Create Account
          </button>
        </form>

        <div className="oauth-section">
          <div className="divider">
            <span>or sign up with</span>
          </div>

          <div className="oauth-buttons">
            <button
              type="button"
              className="oauth-button neumorphic-button github"
              onClick={() => handleOAuthLogin("GitHub")}
            >
              <FaGithub style={{ marginRight: "0.5rem" }} /> GitHub
            </button>
            <button
              type="button"
              className="oauth-button neumorphic-button google"
              onClick={() => handleOAuthLogin("Google")}
            >
              <FaGoogle style={{ marginRight: "0.5rem" }} /> Google
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p className="admin-link">
            Admin? <Link to="/admin/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
