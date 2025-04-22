import React, { useState, useEffect } from "react";
import { Save, Camera, X, Edit2, ArrowLeft } from "lucide-react";
import axios from "axios"; // You'll need to install axios
import "./UserProfile.css";

// Create a custom hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user data", err);
      }
    }
    setLoading(false);
  }, []);

  // Set up axios with authentication header
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  });

  // Add auth token to all requests
  api.interceptors.request.use((config) => {
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Login function
  const login = async (emailOrUsername, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000/api"
        }/auth/login`,
        { emailOrUsername, password }
      );
      const userData = response.data.user;

      // Store in state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await api.put("/auth/profile", userData);
      const updatedUser = response.data.user;

      // Update state and localStorage with new user data
      setUser({ ...user, ...updatedUser });
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout, updateProfile, api };
};

export default function UserProfile() {
  const { user, loading, error, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Set initial profile data when user data is loaded
  useEffect(() => {
    if (user) {
      setTempData({
        fullName: user.fullName || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        theme: user.theme || "light",
        notifications: {
          email: user.notifications?.email !== false,
          push: user.notifications?.push !== false,
          newsletter: user.notifications?.newsletter || false,
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setTempData({
        ...tempData,
        [parent]: {
          ...tempData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      setUpdateError(null);
      setUpdateSuccess(false);

      // Create a FormData instance if there's an image to upload
      if (profileImage) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);

        // Upload the image first, then update the profile with the image URL
        // Adjust this API endpoint to match your backend
        // const imageResponse = await axios.post("/api/uploads/profile-image", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${user.token}`
        //   }
        // });
        // const imageUrl = imageResponse.data.url;
        // await updateProfile({ ...tempData, profileImage: imageUrl });
      } else {
        // Just update the profile without image
        await updateProfile(tempData);
      }

      setUpdateSuccess(true);
      setEditMode(false);
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Failed to update profile");
      console.error("Profile update failed", err);
    }
  };

  const handleCancel = () => {
    // Reset tempData to current user data
    if (user) {
      setTempData({
        fullName: user.fullName || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        theme: user.theme || "light",
        notifications: {
          email: user.notifications?.email !== false,
          push: user.notifications?.push !== false,
          newsletter: user.notifications?.newsletter || false,
        },
      });
    }
    setProfileImage(null);
    setEditMode(false);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-left">
          <button className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1 className="profile-title">My Profile</h1>
        </div>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="edit-button">
            <Edit2 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="header-actions">
            <button onClick={handleCancel} className="cancel-button">
              <X size={16} />
              Cancel
            </button>
            <button onClick={handleSave} className="save-button">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {updateError && (
        <div className="error-alert">
          {updateError}
          <button onClick={() => setUpdateError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {updateSuccess && (
        <div className="success-alert">
          Profile updated successfully!
          <button onClick={() => setUpdateSuccess(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="profile-grid">
        {/* Profile Photo Section */}
        <div className="profile-sidebar">
          <div className="photo-container">
            <div className="profile-photo">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="photo-image"
              />
            </div>
            {editMode && (
              <div className="photo-edit-section">
                <label
                  htmlFor="profile-photo-upload"
                  className="photo-edit-button"
                >
                  <Camera size={18} />
                </label>
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {profileImage && (
                  <span className="photo-filename">{profileImage.name}</span>
                )}
              </div>
            )}
          </div>
          <h2 className="sidebar-name">{user.fullName || user.username}</h2>
          <p className="sidebar-email">{user.email}</p>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="profile-fields">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={tempData.fullName}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                ) : (
                  <p className="field-value">{user.fullName}</p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Username</label>
                {editMode ? (
                  <input
                    type="text"
                    name="username"
                    value={tempData.username}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                ) : (
                  <p className="field-value">{user.username}</p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={tempData.email}
                    onChange={handleInputChange}
                    className="field-input"
                    disabled // Email should not be editable for security reasons
                  />
                ) : (
                  <p className="field-value">{user.email}</p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Bio</label>
                {editMode ? (
                  <textarea
                    name="bio"
                    value={tempData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="field-textarea"
                  />
                ) : (
                  <p className="field-value">
                    {user.bio || "No bio added yet."}
                  </p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Location</label>
                {editMode ? (
                  <input
                    type="text"
                    name="location"
                    value={tempData.location}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                ) : (
                  <p className="field-value">
                    {user.location || "Not specified"}
                  </p>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Website</label>
                {editMode ? (
                  <input
                    type="text"
                    name="website"
                    value={tempData.website}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                ) : (
                  <p className="field-value">
                    {user.website ? (
                      <a
                        href={
                          user.website.startsWith("http")
                            ? user.website
                            : `https://${user.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="preferences-section">
              <h2 className="section-title">Preferences</h2>
              <div className="profile-fields">
                <div className="field-group">
                  <label className="field-label">Theme</label>
                  {editMode ? (
                    <select
                      name="theme"
                      value={tempData.theme}
                      onChange={handleInputChange}
                      className="field-select"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  ) : (
                    <p className="field-value capitalize">
                      {user.theme || "Light"}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <h3 className="subsection-title">Notification Settings</h3>
                  {editMode ? (
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          name="notifications.email"
                          checked={tempData.notifications?.email}
                          onChange={handleInputChange}
                          className="checkbox-input"
                        />
                        <label
                          htmlFor="email-notifications"
                          className="checkbox-label"
                        >
                          Email Notifications
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="checkbox"
                          id="push-notifications"
                          name="notifications.push"
                          checked={tempData.notifications?.push}
                          onChange={handleInputChange}
                          className="checkbox-input"
                        />
                        <label
                          htmlFor="push-notifications"
                          className="checkbox-label"
                        >
                          Push Notifications
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="notifications.newsletter"
                          checked={tempData.notifications?.newsletter}
                          onChange={handleInputChange}
                          className="checkbox-input"
                        />
                        <label htmlFor="newsletter" className="checkbox-label">
                          Newsletter Updates
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="notification-status">
                      <p className="field-value">
                        Email Notifications:{" "}
                        {user.notifications?.email !== false
                          ? "Enabled"
                          : "Disabled"}
                      </p>
                      <p className="field-value">
                        Push Notifications:{" "}
                        {user.notifications?.push !== false
                          ? "Enabled"
                          : "Disabled"}
                      </p>
                      <p className="field-value">
                        Newsletter:{" "}
                        {user.notifications?.newsletter
                          ? "Subscribed"
                          : "Unsubscribed"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
