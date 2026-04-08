import React from 'react';
import './BackgroundEffects.css';

const BackgroundEffects = ({ isDay }) => {
  return (
    <div className="bg-effects-container">
      {isDay ? (
        // Day Time Animations: Slowly drifting clouds
        <div className="day-effects">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
          <div className="cloud cloud-5"></div>
          <div className="sun-glow"></div>
        </div>
      ) : (
        // Night Time Animations: Twinkling stars & Shooting stars
        <div className="night-effects">
          <div className="stars twinkling"></div>
          <div className="stars twinkling-slow"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star delay-1"></div>
          <div className="moon-glow"></div>
        </div>
      )}
    </div>
  );
};

export default BackgroundEffects;
