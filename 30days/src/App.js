import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Public components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const adminAuthStatus =
        localStorage.getItem("isAdminAuthenticated") === "true";

      if (authStatus && adminAuthStatus) {
        localStorage.setItem("isAdminAuthenticated", "false");
        setIsAdminAuthenticated(false);
      }

      setIsAuthenticated(authStatus);
      setIsAdminAuthenticated(adminAuthStatus);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  // Regular user login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAdminAuthenticated(false);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdminAuthenticated", "false");
  };

  // Admin login
  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAuthenticated(false);
    localStorage.setItem("isAdminAuthenticated", "true");
    localStorage.setItem("isAuthenticated", "false");
  };

  // Regular user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  // Admin logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.setItem("isAdminAuthenticated", "false");
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  const AdminProtectedRoute = ({ children }) => {
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

  return (
    <Router>
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

        {/* Admin Dashboard Routes */}
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

        {/* Catch-all Route */}
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
    </Router>
  );
}

export default App;
