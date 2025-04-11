import React, { useState } from "react";
import { Save, Camera, X, Edit2, ArrowLeft } from "lucide-react";
import "./UserProfile.css";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Frontend developer passionate about creating intuitive user experiences.",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    theme: "light",
    notifications: {
      email: true,
      push: true,
      newsletter: false,
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(userData);

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

  const handleSave = () => {
    setUserData(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData(userData);
    setEditMode(false);
  };

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

      <div className="profile-grid">
        {/* Profile Photo Section */}
        <div className="profile-sidebar">
          <div className="photo-container">
            <div className="profile-photo">
              <img
                src="https://res.cloudinary.com/dx7ybhsrm/image/upload/v1744304003/IMG-20241127-WA0097_3_fjwtbx.jpg"
                alt="Profile"
                className="photo-image"
              />
            </div>
            {editMode && (
              <button className="photo-edit-button">
                <Camera size={18} />
              </button>
            )}
          </div>
          <h2 className="sidebar-name">{userData.name}</h2>
          <p className="sidebar-email">{userData.email}</p>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="profile-fields">
              <div className="field-group">
                <label className="field-label">Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                ) : (
                  <p className="field-value">{userData.name}</p>
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
                  />
                ) : (
                  <p className="field-value">{userData.email}</p>
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
                  <p className="field-value">{userData.bio}</p>
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
                  <p className="field-value">{userData.location}</p>
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
                  <p className="field-value">{userData.website}</p>
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
                    <p className="field-value capitalize">{userData.theme}</p>
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
                          checked={tempData.notifications.email}
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
                          checked={tempData.notifications.push}
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
                          checked={tempData.notifications.newsletter}
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
                        {userData.notifications.email ? "Enabled" : "Disabled"}
                      </p>
                      <p className="field-value">
                        Push Notifications:{" "}
                        {userData.notifications.push ? "Enabled" : "Disabled"}
                      </p>
                      <p className="field-value">
                        Newsletter:{" "}
                        {userData.notifications.newsletter
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
