// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Public components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AuthSuccess from "./components/Auth/AuthSuccess";

// Protected pages (user)
import Dashboard from "./pages/Dashboard";
import SubmitProject from "./pages/SubmitProject";
import ProjectList from "./pages/ProjectList";
import Leaderboard from "./pages/Leaderboard";
import ProjectRating from "./pages/ProjectRating";
import UserProfile from "./pages/UserProfile";
import DailyChallenge from "./pages/DailyChallenge";

// Admin components
import AdminLogin from "./admin/components/Auth/Login";
import AdminSignup from "./admin/components/Auth/Signup";
import AdminDashboard from "./admin/AdminDashboard"; // renamed from admin/App.js

import "./styles.css";

// Configure axios defaults
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://my-backend-pkhd.onrender.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In App.js
    const checkAuthStatus = async () => {
      const userToken = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");

      console.log("Checking auth status:");
      console.log("User token exists:", !!userToken);
      console.log("Admin token exists:", !!adminToken);
      setLoading(true);

      try {
        if (userToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userToken}`;

          const response = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          if (response.data.success) {
            setIsAuthenticated(true);
            setIsAdminAuthenticated(false);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          } else {
            throw new Error(response.data.message || "Authentication failed");
          }
        } else if (adminToken) {
          console.log("Verifying admin token...");

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${adminToken}`;

          const response = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          console.log("Admin auth response:", response.data);
          console.log("Is user admin?", response.data.user?.isAdmin);

          if (response.data.success && response.data.user?.isAdmin) {
            console.log("Admin authentication successful");

            setIsAdminAuthenticated(true);
            setIsAuthenticated(false);
            localStorage.setItem(
              "adminUser",
              JSON.stringify(response.data.user)
            );
          } else {
            console.log(
              "Admin check failed - user is not admin or success is false"
            );

            throw new Error("Admin authentication failed");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("user");
        localStorage.removeItem("adminUser");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("isAdminAuthenticated");
        delete axios.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage events (for when other tabs change auth state)
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("isAdminAuthenticated");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setIsAuthenticated(true);
    setIsAdminAuthenticated(false);
  };

  // In App.js
  const handleAdminLoginSuccess = (token, userData) => {
    if (!token || !userData) {
      console.error("Invalid token or user data");
      return;
    }

    // Store all data in localStorage
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(userData));

    // Set axios defaults
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Update state
    setIsAdminAuthenticated(true);
    setIsAuthenticated(false);

    // Force reload to ensure clean state
    window.location.href = "/admin/leaderboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "false");
    delete axios.defaults.headers.common["Authorization"];

    setIsAuthenticated(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.setItem("isAdminAuthenticated", "false");
    delete axios.defaults.headers.common["Authorization"];

    setIsAdminAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  const AdminProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    if (!isAdminAuthenticated) return <Navigate to="/admin/login" replace />;
    return children;
  };

  const HomePage = () => (
    <div className="app">
      <BackgroundAnimation />
      <Header
        isAuthenticated={isAuthenticated || isAdminAuthenticated}
        onLogout={isAdminAuthenticated ? handleAdminLogout : handleLogout}
      />
      <main>
        <Hero />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );

  if (loading) {
    return <div className="loading">Loading application...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={
          isAuthenticated || isAdminAuthenticated ? (
            <Navigate
              to={isAdminAuthenticated ? "/admin/leaderboard" : "/dashboard"}
              replace
            />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path="/auth/success"
        element={<AuthSuccess onLoginSuccess={handleLoginSuccess} />}
      />

      <Route
        path="/signup"
        element={
          isAuthenticated || isAdminAuthenticated ? (
            <Navigate
              to={isAdminAuthenticated ? "/admin/leaderboard" : "/dashboard"}
              replace
            />
          ) : (
            <Signup onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      {/* Admin Auth Routes */}
      <Route
        path="/admin/login"
        element={
          isAdminAuthenticated ? (
            <Navigate to="/admin/leaderboard" replace />
          ) : isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AdminLogin setAuthenticated={handleAdminLoginSuccess} />
          )
        }
      />

      <Route
        path="/admin/signup"
        element={
          isAdminAuthenticated ? (
            <Navigate to="/admin/leaderboard" replace />
          ) : isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AdminSignup setAuthenticated={handleAdminLoginSuccess} />
          )
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/*"
        element={
          <AdminProtectedRoute>
            <AdminDashboard onLogout={handleAdminLogout} />
          </AdminProtectedRoute>
        }
      />

      {/* Regular User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/SubmitProject"
        element={
          <ProtectedRoute>
            <SubmitProject onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ProjectList"
        element={
          <ProtectedRoute>
            <ProjectList onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectRating onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daily-challenge"
        element={
          <ProtectedRoute>
            <DailyChallenge onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route
        path="*"
        element={
          isAdminAuthenticated ? (
            <Navigate to="/admin/leaderboard" replace />
          ) : isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
