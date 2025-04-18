import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic would go here
    setAuthenticated(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h2 className="auth-title">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        
        <div className="auth-footer">
          <div style={{ marginBottom: '10px' }}>
            <Link to="/login" className="auth-link">
              <i className="fas fa-arrow-left"></i> Back to User Page
            </Link>
          </div>
          <div>
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;