import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Footer from './footer';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [children]);

  const [isClient, setIsClient] = useState(false);
  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setScreenSize(window.innerWidth);

    setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: '#1e1cd8' }}
      />
    );
  }

  return (
    <main>
      <Footer />

      <div className="content" ref={contentRef}>
        {React.cloneElement(children, { screenSize })}
      </div>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
