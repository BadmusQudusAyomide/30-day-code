import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";
import "./AuthSuccess.jsx";

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
        "https://my-backend-pkhd.onrender.com/api/auth/login",
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

      console.log("Login successful, token stored:", data.user.token);
      localStorage.setItem("token", data.user.token);
      console.log(
        "Token in localStorage after setting:",
        localStorage.getItem("token")
      );
      navigate("/dashboard");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin} noValidate>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your coding challenge</p>

        {apiError && <div className="error-message">{apiError}</div>}

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

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="divider">or continue with</div>

        <div className="oauth-buttons">
          <button
            type="button"
            className="oauth-button github"
            onClick={() => {
              const redirectPath = "/dashboard";
              localStorage.removeItem("token");
              window.location.href = `${
                process.env.REACT_APP_API_URL ||
                "https://my-backend-pkhd.onrender.com"
              }/api/auth/github?redirect=${encodeURIComponent(redirectPath)}`;
            }}
          >
            <FaGithub /> Continue with GitHub
          </button>

          <button
            type="button"
            className="oauth-button google"
            onClick={() => {
              // Always redirect to dashboard after Google auth
              const redirectPath = "/dashboard";

              // Clear any existing tokens
              localStorage.removeItem("token");

              // Make sure this URL matches your backend route
              window.location.href = `${
                process.env.REACT_APP_API_URL ||
                "https://my-backend-pkhd.onrender.com"
              }/api/auth/google?redirect=${encodeURIComponent(redirectPath)}`;
            }}
          >
            <FaGoogle /> Continue with Google
          </button>
        </div>

        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="admin-login">
          Admin? <Link to="/admin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
