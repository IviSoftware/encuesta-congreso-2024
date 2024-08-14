import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ percentage }) => {
    console.log('percentage',percentage)
  return (
    <div className="progress-bar-container mb-8">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export {ProgressBar};
