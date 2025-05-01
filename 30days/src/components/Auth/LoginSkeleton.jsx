import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoginSkeleton = () => {
  return (
    <div className="modern-auth-container">
      {/* Animated background remains the same */}
      <div className="card-container">
        <div className="auth-card">
          <div className="card-content">
            {/* Title */}
            <Skeleton height={40} width="60%" style={{ margin: "0 auto 10px" }} />
            <Skeleton height={20} width="70%" style={{ margin: "0 auto 30px" }} />
            
            {/* Form fields */}
            <div className="form-group">
              <Skeleton height={16} width="30%" style={{ marginBottom: "8px" }} />
              <Skeleton height={48} borderRadius={12} />
            </div>
            
            <div className="form-group">
              <Skeleton height={16} width="30%" style={{ marginBottom: "8px" }} />
              <div className="password-input">
                <Skeleton height={48} borderRadius={12} />
              </div>
            </div>
            
            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <Skeleton height={16} width="30%" />
            </div>
            
            {/* Login button */}
            <Skeleton height={48} borderRadius={12} style={{ marginBottom: "24px" }} />
            
            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
              <Skeleton height={1} width="100%" />
            </div>
            
            {/* OAuth buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <Skeleton height={48} width="100%" borderRadius={12} />
              <Skeleton height={48} width="100%" borderRadius={12} />
            </div>
            
            {/* Signup link */}
            <div style={{ textAlign: "center" }}>
              <Skeleton height={16} width="70%" style={{ margin: "0 auto" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton;