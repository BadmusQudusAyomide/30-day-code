import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css"; // We'll keep this CSS file
import "./AuthSuccess.jsx"; // Adding this import from the second version

// AnimatedBackground component for floating orbs (keeping this from first version)
const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      <div className="orb orb-5"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
};

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "emailOrUsername":
        if (!value.trim()) error = "Email or username is required";
        break;

      case "password":
        if (!value) error = "Password is required";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "my-backend-pkhd.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess();

      localStorage.setItem("token", data.user.token);

      navigate("/dashboard");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modern-auth-container">
      <AnimatedBackground />

      <div className="card-container">
        <div className="auth-card">
          <div className="card-content">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">
              Login to continue your coding challenge
            </p>

            {apiError && <div className="error-message">{apiError}</div>}

            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label>Email or Username</label>
                <input
                  type="text"
                  name="emailOrUsername"
                  placeholder="name@example.com or username"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={errors.emailOrUsername ? "error" : ""}
                />
                {errors.emailOrUsername && (
                  <span className="error-text">{errors.emailOrUsername}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={errors.password ? "error" : ""}
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
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="forgot-password">
                <Link to="/forgot">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="oauth-buttons">
              <button
                type="button"
                className="oauth-button github"
                onClick={() => {
                  const redirectPath = "/dashboard";
                  localStorage.removeItem("token");
                  window.location.href = `${
                    process.env.REACT_APP_API_URL ||
                    "my-backend-pkhd.onrender.com"
                  }/api/auth/github?redirect=${encodeURIComponent(
                    redirectPath
                  )}`;
                }}
              >
                <FaGithub />
                GitHub
              </button>

              <button
                type="button"
                className="oauth-button google"
                onClick={() => {
                  const redirectPath = "/dashboard";
                  localStorage.removeItem("token");
                  window.location.href = `${
                    process.env.REACT_APP_API_URL ||
                    "my-backend-pkhd.onrender.com"
                  }/api/auth/google?redirect=${encodeURIComponent(
                    redirectPath
                  )}`;
                }}
              >
                <FaGoogle />
                Google
              </button>
            </div>

            <p className="switch-auth">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p className="admin-login">
              Admin? <Link to="/admin">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
