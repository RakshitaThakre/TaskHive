import React from 'react';
import './StatsCard.css';

function StatsCard({ completed, total }) {
  return (
    <div className="stats-container">
      <div className="stat-box">
        <div className="stat-number">{completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      
      <div className="stat-divider"></div>
      
      <div className="stat-box">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
    </div>
  );
}

export default StatsCard;