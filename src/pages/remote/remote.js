import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";
import './remote.css'

function Remote() {
  const [isShaking, setIsShaking] = useState(false);
  const [initialTouchX, setInitialTouchX] = useState(null);

  const handleTouchStart = (event) => {
      const touch = event.touches[0];
      setInitialTouchX(touch.clientX);
  };

  const handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const finalTouchX = touch.clientX;
      const swipeThreshold = 50; // Adjust this value as needed

      if (initialTouchX !== null) {
          const swipeDistance = finalTouchX - initialTouchX;

          if (Math.abs(swipeDistance) > swipeThreshold) {
              setIsShaking(true); // Start shaking effect
              setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
          }
      }

      setInitialTouchX(null);
  };

  return (
      <div className={`swipe-container ${isShaking ? 'shake' : ''}`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          Swipe Me!
      </div>
  );
}

export default Remote;
