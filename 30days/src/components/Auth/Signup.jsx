import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css"; // Same CSS file for consistent styling

// Reusing the same AnimatedBackground component
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

const Signup = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name too short";
        else if (!/^[a-zA-Z\s'-]+$/.test(value)) error = "Invalid characters";
        break;

      case "username":
        if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Only letters, numbers and underscores";
        }
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Minimum 8 characters";
        else if (!/[A-Z]/.test(value)) error = "Need at least 1 uppercase";
        else if (!/[a-z]/.test(value)) error = "Need at least 1 lowercase";
        else if (!/[0-9]/.test(value)) error = "Need at least 1 number";
        else if (!/[^A-Za-z0-9]/.test(value)) error = "Need at least 1 symbol";
        break;

      case "confirmPassword":
        if (value !== formData.password) error = "Passwords must match";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change only after first blur
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
      if (key !== "username") {
        // username is optional
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://my-backend-pkhd.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            username: formData.username || undefined,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess();
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

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
        <div className="auth-card signup-card">
          <div className="card-content">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join our coding community</p>

            {apiError && <div className="error-message">{apiError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-text">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Username (optional)</label>
                <input
                  type="text"
                  name="username"
                  placeholder="coder123"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <span className="error-text">{errors.username}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password *</label>
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
                {formData.password && (
                  <div className="password-hints">
                    <span
                      className={formData.password.length >= 8 ? "valid" : ""}
                    >
                      • 8+ characters
                    </span>
                    <span
                      className={/[A-Z]/.test(formData.password) ? "valid" : ""}
                    >
                      • Uppercase
                    </span>
                    <span
                      className={/[a-z]/.test(formData.password) ? "valid" : ""}
                    >
                      • Lowercase
                    </span>
                    <span
                      className={/[0-9]/.test(formData.password) ? "valid" : ""}
                    >
                      • Number
                    </span>
                    <span
                      className={
                        /[^A-Za-z0-9]/.test(formData.password) ? "valid" : ""
                      }
                    >
                      • Symbol
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Sign Up"
                )}
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
                    "https://my-backend-pkhd.onrender.com"
                  }/api/auth/github?redirect=${encodeURIComponent(
                    redirectPath
                  )}`;
                }}
              >
                <FaGithub /> GitHub
              </button>
              <button
                type="button"
                className="oauth-button google"
                onClick={() => {
                  const redirectPath = "/dashboard";
                  localStorage.removeItem("token");
                  window.location.href = `${
                    process.env.REACT_APP_API_URL ||
                    "https://my-backend-pkhd.onrender.com"
                  }/api/auth/google?redirect=${encodeURIComponent(
                    redirectPath
                  )}`;
                }}
              >
                <FaGoogle /> Google
              </button>
            </div>
            <p className="switch-auth">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
