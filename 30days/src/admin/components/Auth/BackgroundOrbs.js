import React, { useEffect, useRef } from 'react';

const BackgroundOrbs = () => {
  const orbContainerRef = useRef(null);

  useEffect(() => {
    // Create multiple orbs with different colors, sizes, and animation delays
    const orbsData = [
      { 
        color: 'rgba(110, 142, 251, 0.4)', 
        size: '300px', 
        left: '10%', 
        top: '20%', 
        delay: '0s',
        duration: '15s'
      },
      { 
        color: 'rgba(167, 119, 227, 0.3)', 
        size: '400px', 
        left: '60%', 
        top: '10%', 
        delay: '3s',
        duration: '20s'
      },
      { 
        color: 'rgba(86, 190, 235, 0.25)', 
        size: '350px', 
        left: '80%', 
        top: '60%', 
        delay: '2s',
        duration: '17s'
      },
      { 
        color: 'rgba(241, 91, 181, 0.2)', 
        size: '280px', 
        left: '30%', 
        top: '70%', 
        delay: '1s',
        duration: '22s'
      },
      { 
        color: 'rgba(110, 142, 251, 0.15)', 
        size: '500px', 
        left: '5%', 
        top: '60%', 
        delay: '4s',
        duration: '25s'
      },
    ];

    // Remove any existing orbs (important for cleanup)
    if (orbContainerRef.current) {
      while (orbContainerRef.current.firstChild) {
        orbContainerRef.current.removeChild(orbContainerRef.current.firstChild);
      }

      // Create and append new orbs
      orbsData.forEach(orbData => {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.backgroundColor = orbData.color;
        orb.style.width = orbData.size;
        orb.style.height = orbData.size;
        orb.style.left = orbData.left;
        orb.style.top = orbData.top;
        orb.style.animationDelay = orbData.delay;
        orb.style.animationDuration = orbData.duration;
        
        orbContainerRef.current.appendChild(orb);
      });
    }

    // Cleanup function to remove orbs when component unmounts
    return () => {
      if (orbContainerRef.current) {
        while (orbContainerRef.current.firstChild) {
          orbContainerRef.current.removeChild(orbContainerRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div className="orb-container" ref={orbContainerRef}></div>;
};

export default BackgroundOrbs;