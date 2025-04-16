import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      onLoginSuccess();
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your coding challenge</p>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="forgot-password">
          <Link to="/forgot">Forgot password?</Link>
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="divider">or continue with</div>

        <div className="oauth-buttons">
          <button className="oauth-button github">
            <FaGithub />
            GitHub
          </button>
          <button className="oauth-button google">
            <FaGoogle />
            Google
          </button>
        </div>

        <p className="switch-auth">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="admin-login">
          Admin? <Link to="/admin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
