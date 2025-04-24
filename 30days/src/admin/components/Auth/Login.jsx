import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ setAuthenticated }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('/api/auth/login', {
        emailOrUsername,
        password
      });
      
      const { user } = response.data;
      
      // Check if user is an admin
      if (!user.isAdmin) {
        setError('You do not have admin privileges');
        setLoading(false);
        return;
      }
      
      // Store user data in localStorage
      localStorage.setItem('adminToken', user.token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      // Call the parent component's authentication function
      setAuthenticated();
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
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
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <div style={{ marginBottom: '10px' }}>
            <Link to="/login" className="auth-link">
              <i className="fas fa-arrow-left"></i> Back to User Login
            </Link>
          </div>
          <div>
            Don't have an account? <Link to="/admin/signup" className="auth-link">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;