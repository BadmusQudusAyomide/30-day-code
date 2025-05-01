import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Header Skeleton */}
      <div className="skeleton-header">
        <Skeleton width={150} height={40} />
        <div className="skeleton-nav">
          <Skeleton width={60} count={4} inline={true} containerClassName="skeleton-nav-items" />
        </div>
        <div className="skeleton-auth">
          <Skeleton width={80} height={36} inline={true} style={{ marginRight: '10px' }} />
          <Skeleton width={80} height={36} inline={true} />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="skeleton-hero">
        <div className="skeleton-hero-content">
          <Skeleton height={60} width="70%" style={{ marginBottom: '20px' }} />
          <Skeleton height={40} width="50%" style={{ marginBottom: '20px' }} />
          <Skeleton count={3} style={{ marginBottom: '10px' }} />
          <Skeleton width={180} height={48} style={{ marginTop: '20px' }} />
        </div>
        <div className="skeleton-hero-visual">
          <Skeleton circle height={300} width={300} />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="skeleton-features">
        <Skeleton height={50} width="40%" style={{ margin: '0 auto 40px' }} />
        <div className="skeleton-features-grid">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-feature-card">
              <Skeleton circle height={50} width={50} style={{ marginBottom: '20px' }} />
              <Skeleton height={30} width="80%" style={{ marginBottom: '15px' }} />
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="skeleton-cta">
        <div className="skeleton-cta-content">
          <Skeleton height={50} width="60%" style={{ marginBottom: '20px' }} />
          <Skeleton count={3} style={{ marginBottom: '15px' }} />
          <Skeleton width={180} height={48} />
        </div>
        <div className="skeleton-cta-code">
          <Skeleton height={200} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;