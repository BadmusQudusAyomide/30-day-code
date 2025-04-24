import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

const AdminProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAdminAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated or not an admin, redirect to admin login
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated and admin, render the child routes
  return <Outlet />;
};

export default AdminProtectedRoute;
