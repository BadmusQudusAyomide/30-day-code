import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardSkeleton = () => {
  return (
    <div className="dashboard">
      {/* Header Skeleton */}
      <header className="dashboard-header">
        <div className="brand">
          <Skeleton width={120} height={30} />
        </div>
        <div className="header-controls">
          <div className="user-info">
            <Skeleton width={80} height={20} style={{ marginRight: '1rem' }} />
            <Skeleton circle width={44} height={44} />
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Welcome Section */}
        <div className="dashboard-header-section">
          <Skeleton height={48} width="60%" style={{ margin: '0 auto 10px' }} />
          <Skeleton height={24} width="70%" style={{ margin: '0 auto 30px' }} />
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="day-progress">
            <Skeleton height={60} width="120px" style={{ margin: '0 auto' }} />
            
            <div className="progress-container">
              <div className="progress-labels">
                <Skeleton width={40} />
                <Skeleton width={60} />
                <Skeleton width={40} />
              </div>
              
              <Skeleton height={8} borderRadius={4} />
              
              <div className="progress-stats">
                <Skeleton height={60} width="100%" borderRadius={8} />
                <Skeleton height={60} width="100%" borderRadius={8} />
                <Skeleton height={60} width="100%" borderRadius={8} />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="grid-item">
              <Skeleton circle width={56} height={56} />
              <div className="item-content">
                <Skeleton height={24} width="60%" />
                <Skeleton height={16} width="80%" />
              </div>
              <Skeleton width={20} height={20} />
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="logout-container">
          <Skeleton height={48} width={160} borderRadius={10} />
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <Skeleton width={300} height={20} />
      </footer>
    </div>
  );
};

export default DashboardSkeleton;