// Create a new ErrorBoundary.js component
import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="dashboard-error">
          <h3>Dashboard Error</h3>
          <p>Something went wrong. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// Then wrap your Dashboard component:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <ErrorBoundary>
        <Dashboard onLogout={handleLogout} />
      </ErrorBoundary>
    </ProtectedRoute>
  }
/>