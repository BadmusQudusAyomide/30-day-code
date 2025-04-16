import React from 'react';

const Submissions = () => {
  const submissions = [
    {
      id: 1,
      user: 'josh_code',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      time: '2h ago',
      content: 'My submission for Day 12 - built a weather app using React and OpenWeather API. Implemented geolocation and 5-day forecast. Still working on the UI improvements.',
      attachments: ['weather-app-screenshot.png']
    },
    {
      id: 2,
      user: 'dev_sarah',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      time: '4h ago',
      content: 'Day 12 submission: Completed the e-commerce product page with cart functionality. Used React hooks for state management.',
      attachments: ['ecommerce-screenshot.jpg']
    },
    {
      id: 3,
      user: 'coder_amit',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      time: '6h ago',
      content: 'Submitted my solution for the algorithm challenge. Implemented Dijkstra\'s algorithm with a priority queue. Time complexity O(E + V log V).',
      attachments: ['algorithm-code.py']
    }
  ];

  return (
    <div>
      <h2 className="section-title">Submission Review</h2>
      
      {submissions.map(submission => (
        <div key={submission.id} className="submission-card glass-card">
          <div className="submission-header">
            <div className="submission-user">
              <img src={submission.avatar} alt={submission.user} className="user-avatar" />
              <div>
                <div className="user-name">@{submission.user}</div>
                <div className="submission-time">{submission.time}</div>
              </div>
            </div>
            <div className="submission-day">Day 12</div>
          </div>
          
          <div className="submission-content">
            <p>{submission.content}</p>
            {submission.attachments && (
              <div className="submission-attachments">
                {submission.attachments.map((file, index) => (
                  <div key={index} className="attachment">
                    <i className="fas fa-paperclip"></i> {file}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="submission-actions">
            <button className="btn btn-primary">
              <i className="fas fa-check"></i> Approve
            </button>
            <button className="btn btn-neumorphic">
              <i className="fas fa-times"></i> Reject
            </button>
            <button className="btn btn-neumorphic">
              <i className="fas fa-comment"></i> Message
            </button>
            <button className="btn btn-neumorphic">
              <i className="fas fa-eye"></i> View Code
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Submissions;