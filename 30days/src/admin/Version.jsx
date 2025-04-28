import React, { useEffect, useState } from "react";
import "./styles.css"; // Still using the same stylesheet

const Version = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Temporary fake challenge data
    const fakeChallenge = {
      name: "30-Day Coding Challenge",
      startDate: "2025-04-01",
      endDate: "2025-04-30",
    };

    setChallenge(fakeChallenge);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!challenge) return;

    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);
    const today = new Date();

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const passedDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1;

    const finalProgress = Math.min((passedDays / totalDays) * 100, 100);

    // Animate progress
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= finalProgress) {
        current = finalProgress;
        clearInterval(interval);
      }
      setProgress(Math.floor(current));
    }, 20);
  }, [challenge]);

  if (loading) {
    return (
      <div className="version-loading-screen">Loading challenge info...</div>
    );
  }

  if (!challenge) {
    return (
      <div className="version-page-container">
        <h2>No challenge information available.</h2>
      </div>
    );
  }

  return (
    <div className="version-page-container">
      <div className="version-card">
        <h2 className="version-page-title">{challenge.name}</h2>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(challenge.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(challenge.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {new Date(challenge.endDate) > new Date() ? "Ongoing" : "Completed"}
        </p>

        <div className="version-progress-bar-container">
          <div
            className="version-progress-bar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Version;
