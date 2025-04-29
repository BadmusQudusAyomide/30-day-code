import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundOrbs from "./BackgroundOrbs";
import "./AuthStyles.css";

const AdminSignup = ({ setAuthenticated }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animation for the form appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Use this endpoint only if you have a special admin registration endpoint
      // Otherwise, you'll need to modify your backend to handle admin creation
      const response = await axios.post("/api/auth/admin-signup", {
        fullName,
        username,
        email,
        password,
        adminKey, // Special key that only admin creators would know
      });

      const { user } = response.data;

      // Store user data in localStorage
      localStorage.setItem("adminToken", user.token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.setItem("isAdminAuthenticated", "true");

      // Set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      // Call the parent component's authentication function
      setAuthenticated();
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BackgroundOrbs />

      <div
        className="auth-card glass-card"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <h2 className="auth-title">Create Admin Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminKey">Admin Registration Key</label>
            <input
              type="password"
              id="adminKey"
              className="input-field"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
              placeholder="Enter admin registration key"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span>
                <i
                  className="fas fa-circle-notch fa-spin"
                  style={{ marginRight: "8px" }}
                ></i>
                Creating Account...
              </span>
            ) : (
              "Create Admin Account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <div>
            <Link to="/admin/login" className="auth-link">
              Already have an admin account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
