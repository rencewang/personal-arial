import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import ShimmerCanvas from './ShimmerCanvas';
import WindCanvas from './WindCanvas';
import AsciiCanvas from './AsciiCanvas';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  const footerRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [children]);
  
  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const [isAmbient, setIsAmbient] = useState(true);
  
  // Weather State: 'snow', 'rain', 'fog', 'wind'
  const [weather, setWeather] = useState('snow');

  // Helper to get time string instantly
  const getAmbientString = () => {
    if (typeof window === 'undefined') return '';
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const region = timeZone ? timeZone.replace(/_/g, ' ') : 'Local Time';
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      return `${region} is ${timeString}`;
    } catch (e) {
      return '';
    }
  };

  const [currentTime, setCurrentTime] = useState(getAmbientString);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getAmbientString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    if (contentRef.current) contentRef.current.style.opacity = '0';

    const timeout = setTimeout(() => {
      if (contentRef.current) contentRef.current.style.opacity = '1';
    }, 100);

    setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [isAmbient]);

  const cycleWeather = () => {
    const weathers = ['snow', 'rain', 'fog', 'wind', 'ascii'];
    const nextIndex = (weathers.indexOf(weather) + 1) % weathers.length;
    setWeather(weathers[nextIndex]);
  };

  const getWeatherDescription = () => {
    switch (weather) {
      case 'wind': return 'Wind is brewing.'; // Kept user's edit
      case 'ascii': return 'System is driving.';
      case 'snow': 
      default: return 'Snow is falling upward.';
    }
  };

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 1. Full Screen Background - Switch based on Weather */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {weather === 'snow' && <ShimmerCanvas />}
        {weather === 'wind' && <WindCanvas />}
        {weather === 'ascii' && <AsciiCanvas />}
      </div>

      {/* 2. Top Nav / Retract Toggle */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '0.6rem', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <button 
          onClick={() => setIsAmbient(!isAmbient)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '1rem',
            textDecoration: 'underline',
            textUnderlineOffset: '0.2rem'
          }}
        >
          From the Desk of Lawrence Wang
          {/* {isAmbient ? 'From the Desk of Lawrence Wang' : 'Take It Back'} */}
        </button>
      </nav>

      {/* 3. Main Content Overlay */}
      {!isAmbient && (
        <div 
          className="content centered-column" 
          ref={contentRef}
          style={{
            maxWidth: '600px',
            margin: '4rem auto 2rem', // Top margin for nav
            padding: '1rem',
            height: 'calc(100vh - 6rem)',
            background: 'rgba(255, 255, 255)', // Slight opacity to read text over shimmer
            backdropFilter: 'blur(5px)',
            border: '1px solid #1e1cd8', // Thin blue border
            overflowY: 'auto',
            transition: 'opacity 0.2s ease',
            zIndex: 50
          }}
        >
          {React.cloneElement(children, { screenSize })}
        </div>
      )}

      {/* 4. Ambient Mode Display */}
      {/* {isAmbient && ( */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center',
            width: '100%',
            zIndex: 10,
            cursor: isAmbient ? 'pointer' : 'default',
            pointerEvents: isAmbient ? 'auto' : 'none' // Only clickable when ambient
          }}
          onClick={isAmbient ? cycleWeather : undefined}
        >
          <div className="title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {currentTime}
          </div>
          <div style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            {getWeatherDescription()}
          </div>
        </div>
      {/* )} */}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
