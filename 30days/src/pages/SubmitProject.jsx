import React, { useState } from "react";
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
    projectImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please choose a smaller image.");
        e.target.value = null;
        return;
      }

      setFormData((prev) => ({ ...prev, projectImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted project data:", formData);
    // Here you would typically send the data to your backend
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        projectName: "",
        liveLink: "",
        repoLink: "",
        description: "",
        day: "19",
        frameworks: "",
        languages: "",
        projectImage: null,
      });
      setImagePreview(null);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="submit-project-container">
      <div className="submit-project-card">
        <h2>Submit Your Project</h2>
        <p className="subtitle">Day {formData.day} Challenge Submission</p>

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
                  required
                  className="file-input"
                />
                <div className="file-input-button">Choose File</div>
                <span className="file-name">
                  {formData.projectImage
                    ? formData.projectImage.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Project preview" />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Submit Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;
