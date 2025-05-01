import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ResourcesSkeleton = () => {
  return (
    <div className="res-developer-resources">
      {/* Back Button & Theme Toggle */}
      <div className="res-dashboard-back">
        <Skeleton width={120} height={24} />
        <Skeleton circle width={32} height={32} />
      </div>

      {/* Navigation */}
      <nav className="res-top-nav">
        <Skeleton width={100} height={30} />
        <Skeleton circle width={32} height={32} />
      </nav>

      {/* Header */}
      <header className="res-header">
        <div className="res-header-content">
          <Skeleton height={48} width="70%" style={{ marginBottom: '16px' }} />
          <Skeleton height={24} width="90%" style={{ marginBottom: '24px' }} />
          
          {/* Search */}
          <div className="res-search-container">
            <Skeleton height={48} borderRadius={24} />
          </div>
          
          {/* Stats */}
          <div className="res-stats">
            <Skeleton width={80} height={60} borderRadius={8} />
            <Skeleton width={80} height={60} borderRadius={8} />
            <Skeleton width={80} height={60} borderRadius={8} />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="res-category-tabs">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} width={80} height={36} borderRadius={18} />
        ))}
      </div>

      {/* Featured Resources */}
      <section className="res-resource-section">
        <Skeleton height={40} width="40%" style={{ marginBottom: '24px' }} />
        <div className="res-featured-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="res-featured-card">
              <Skeleton circle width={48} height={48} style={{ marginBottom: '16px' }} />
              <Skeleton height={24} width="80%" style={{ marginBottom: '8px' }} />
              <Skeleton count={2} style={{ marginBottom: '16px' }} />
              <Skeleton height={24} width="40%" style={{ marginBottom: '8px' }} />
              <Skeleton height={24} width="60%" />
            </div>
          ))}
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className="res-resource-section">
        <Skeleton height={40} width="40%" style={{ marginBottom: '24px' }} />
        <div className="res-cards-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="res-resource-card">
              <Skeleton height={24} width="60%" style={{ marginBottom: '16px' }} />
              <ul>
                {[...Array(4)].map((_, j) => (
                  <li key={j}>
                    <Skeleton width={24} height={24} style={{ marginRight: '12px' }} />
                    <Skeleton width="60%" height={16} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="res-footer">
        <div className="res-footer-content">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="res-footer-section">
              <Skeleton height={24} width="60%" style={{ marginBottom: '16px' }} />
              <Skeleton count={3} width="80%" />
            </div>
          ))}
        </div>
        <div className="res-footer-bottom">
          <Skeleton width="60%" height={16} />
        </div>
      </footer>
    </div>
  );
};

export default ResourcesSkeleton;