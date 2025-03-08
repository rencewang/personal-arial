import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Footer from './footer';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  const loaderRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [children]);

  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    const timeout = setTimeout(() => {
      loaderRef.current.style.opacity = '0';
    }, 500);

    setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main>
      <Footer />

      <div className="content" ref={contentRef}>
        {React.cloneElement(children, { screenSize })}
      </div>

      <div className="loader" ref={loaderRef} />
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
