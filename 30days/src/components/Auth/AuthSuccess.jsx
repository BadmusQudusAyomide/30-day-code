// src/components/Auth/AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AuthSuccess = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const completeAuth = async () => {
      try {
        const token = searchParams.get('token');
        const redirect = searchParams.get('redirect') || '/dashboard';

        if (!token) {
          throw new Error('Missing authentication token');
        }

        // Verify token and get user data
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.data.success) {
          throw new Error(response.data.message || 'Authentication failed');
        }

        // Complete login process
        onLoginSuccess(token, response.data.user);
        navigate(redirect);
      } catch (err) {
        console.error('Authentication error:', err);
        navigate(`/login?error=${encodeURIComponent(err.message)}`);
      }
    };

    completeAuth();
  }, [navigate, searchParams, onLoginSuccess]);

  return (
    <div className="auth-loading">
      <h2>Completing Authentication</h2>
      <p>Please wait while we prepare your dashboard...</p>
    </div>
  );
};

export default AuthSuccess;