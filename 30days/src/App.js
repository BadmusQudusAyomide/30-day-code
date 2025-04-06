import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import AuthPages from "./components/AuthPages";

// Protected pages
import Dashboard from "./pages/Dashboard";
// import SubmitProject from "./pages/SubmitProject";
// import MyProjects from "./pages/MyProjects";
// import Leaderboard from "./pages/Leaderboard";
// import DailyChallenge from "./pages/DailyChallenge";
// import Resources from "./pages/Resources";
// import Community from "./pages/Community";
// import Profile from "./pages/Profile";

import "./styles.css";

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated on app load
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Homepage component with your existing structure
  const HomePage = () => (
    <div className="app">
      <BackgroundAnimation />
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthPages onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        {/* <Route 
          path="/submit-project" 
          element={
            <ProtectedRoute>
              <SubmitProject onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/my-projects" 
          element={
            <ProtectedRoute>
              <MyProjects onLogout={handleLogout} />
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
          path="/daily-challenge" 
          element={
            <ProtectedRoute>
              <DailyChallenge onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/resources" 
          element={
            <ProtectedRoute>
              <Resources onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/community" 
          element={
            <ProtectedRoute>
              <Community onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        /> */}

        {/* Redirect any unknown routes to home if not authenticated, otherwise to dashboard */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;