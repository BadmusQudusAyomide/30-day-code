import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BackgroundOrbs from "./BackgroundOrbs";
import "./AuthStyles.css";

const AdminLogin = ({ setAuthenticated }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        emailOrUsername,
        password,
      });

      const { user } = response.data;

      // Check if user is an admin
      if (!user.isAdmin) {
        setError("You do not have admin privileges");
        setLoading(false);
        return;
      }

      console.log("Admin login successful, user:", user);
      console.log("Token:", user.token);

      // Store user data in localStorage
      localStorage.setItem("adminToken", user.token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.setItem("isAdminAuthenticated", "true");

      // Set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      // Pass token and user to parent component
      setAuthenticated(user.token, user);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", err);
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
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <h2 className="auth-title">Admin Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              className="input-field"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              placeholder="Enter your email or username"
              autoComplete="username"
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
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span>
                <i
                  className="fas fa-circle-notch fa-spin"
                  style={{ marginRight: "8px" }}
                ></i>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <div style={{ marginBottom: "1rem" }}>
            <Link to="/login" className="auth-link">
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "5px" }}
              ></i>
              Back to User Login
            </Link>
          </div>

          <div>
            Don't have an account?{" "}
            <Link to="/admin/signup" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
