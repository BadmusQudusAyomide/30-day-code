// SkeletonLoading.js
import React from "react";
import "./SkeletonLoading.css";

const SkeletonLoading = () => {
  return (
    <div
      className="skeleton-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#282c34", // Match your app background
        zIndex: 1000,
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "60px",
          background: "#444",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      ></div>

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "300px",
            background: "#444",
            borderRadius: "8px",
            marginRight: "20px",
          }}
        ></div>
        <div
          style={{
            width: "300px",
            height: "300px",
            background: "#444",
            borderRadius: "8px",
          }}
        ></div>
      </div>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            style={{
              height: "150px",
              background: "#444",
              borderRadius: "8px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;
