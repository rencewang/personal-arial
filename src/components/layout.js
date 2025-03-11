import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Footer from './footer';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  const loaderRef = useRef();
  const [showLoader, setShowLoader] = useState(true);

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

    const timeoutOpacity = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = '0';
      }
      setShowLoader(false);
    }, 500);

    const timeoutVisibility = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.display = 'none';
      }
    }, 1000);

    // Ensure loader starts fully visible
    if (loaderRef.current) {
      loaderRef.current.style.opacity = '1';
      loaderRef.current.style.display = 'block';
    }

    setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      loaderRef.current.style.opacity = '1';
      clearTimeout(timeoutOpacity);
      clearTimeout(timeoutVisibility);
    };
  }, []);

  return (
    <main>
      <Footer />

      <div className="content" ref={contentRef}>
        {React.cloneElement(children, { screenSize })}
      </div>

      {showLoader && <div className="loader" ref={loaderRef} />}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
