import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="hexagon-spinner">
        <div className="hex"></div>
        <div className="hex"></div>
        <div className="hex"></div>
        <div className="hex"></div>
      </div>
      <p className="loading-text">Our agents are analyzing your code...</p>
    </div>
  );
};

export default LoadingSpinner;
