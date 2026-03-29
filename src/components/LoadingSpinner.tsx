import React from 'react';

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const s = Math.max(16, size);
  return (
    <div className="loading-container" aria-live="polite" aria-busy="true">
      <div className="spinner" style={{ width: s, height: s }} />
    </div>
  );
};

export default LoadingSpinner;
