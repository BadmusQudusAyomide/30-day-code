import React, { useState } from 'react';

const Settings = () => {
  const [duration, setDuration] = useState(30);
  const [dailyLimit, setDailyLimit] = useState(1);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h2 className="section-title">Challenge Settings</h2>
      
      <div className="setting-group glass-card">
        <div className="setting-title">
          <i className="fas fa-calendar-alt"></i>
          <span>Challenge Configuration</span>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">Challenge Duration</div>
          <div className="slider-container">
            <input 
              type="range" 
              min="7" 
              max="60" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="slider" 
            />
            <div>{duration} days</div>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">Daily Submission Limit</div>
          <div className="slider-container">
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={dailyLimit} 
              onChange={(e) => setDailyLimit(e.target.value)}
              className="slider" 
            />
            <div>{dailyLimit} per day</div>
          </div>
        </div>
      </div>
      
      <div className="setting-group glass-card">
        <div className="setting-title">
          <i className="fas fa-bell"></i>
          <span>Notifications</span>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">Email Alerts</div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={emailAlerts} 
              onChange={() => setEmailAlerts(!emailAlerts)} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">In-App Notifications</div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={() => setNotifications(!notifications)} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="setting-group glass-card">
        <div className="setting-title">
          <i className="fas fa-shield-alt"></i>
          <span>Admin Settings</span>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">Reset Challenge</div>
          <button className="btn btn-neumorphic">Reset Data</button>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">Export Data</div>
          <button className="btn btn-neumorphic">Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;