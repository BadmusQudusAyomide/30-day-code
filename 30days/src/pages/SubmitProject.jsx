import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./SubmitProject.css";

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    liveLink: "",
    repoLink: "",
    description: "",
    day: "19",
    frameworks: "",
    languages: "",
  });

  const [projectImage, setProjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
   
      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB limit. Please choose a smaller image.");
        e.target.value = null;
        return;
      }

      setProjectImage(file);
      setError(null);

     
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to submit a project");
      }

      const imageFormData = new FormData();
      imageFormData.append("projectImage", projectImage);

     

      const imageUploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/uploads/project-image`,
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = imageUploadResponse.data.imageUrl;

     

      const projectResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/projects`,
        {
          ...formData,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          projectName: "",
          liveLink: "",
          repoLink: "",
          description: "",
          day: "19",
          frameworks: "",
          languages: "",
        });
        setProjectImage(null);
        setImagePreview(null);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-project-container">
      <div className="submit-project-card">
        <div className="back-to-dashboard">
          <Link to="/dashboard" className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <h2>Submit Your Project</h2>
        <p className="subtitle">Day {formData.day} Challenge Submission</p>

        {error && <div className="error-message">{error}</div>}

        {submitted ? (
          <div className="success-message">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h3>Successfully Submitted!</h3>
            <p>Your project has been submitted for review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label htmlFor="projectName">Project Name *</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
                placeholder="Enter your project name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="liveLink">Live Link *</label>
                <input
                  type="url"
                  id="liveLink"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  required
                  placeholder="https://your-project-url.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="repoLink">Repository Link *</label>
                <input
                  type="url"
                  id="repoLink"
                  name="repoLink"
                  value={formData.repoLink}
                  onChange={handleChange}
                  required
                  placeholder="https://github.com/yourusername/repo"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your project in detail (goals, challenges, learnings)"
                rows="5"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="day">Challenge Day *</label>
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      Day {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="frameworks">Frameworks/Libraries</label>
                <input
                  type="text"
                  id="frameworks"
                  name="frameworks"
                  value={formData.frameworks}
                  onChange={handleChange}
                  placeholder="React, Redux, Tailwind, etc."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="languages">Programming Languages *</label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                required
                placeholder="JavaScript, HTML, CSS, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectImage">
                Project Screenshot * (Max: 2MB)
              </label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="projectImage"
                  name="projectImage"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                  style={{ opacity: 0, position: "absolute", zIndex: -1 }} 
                />
                <label
                  htmlFor="projectImage"
                  className="file-input-button"
                  style={{ cursor: "pointer" }} 
                >
                  Choose File
                </label>
                <span className="file-name">
                  {projectImage ? projectImage.name : "No file chosen"}
                </span>
              </div>
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Project preview" />
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Project"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;
