import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Footer from './footer';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();

  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  const [screenSize, setScreenSize] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set grid height to window height
  // const [gridHeight, setGridHeight] = useState('100vh');
  // useLayoutEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const updateGridHeight = () => {
  //       setGridHeight(window.innerHeight);
  //     };

  //     updateGridHeight();
  //     window.addEventListener('scroll', updateGridHeight);
  //     window.addEventListener('resize', updateGridHeight);

  //     return () => {
  //       window.removeEventListener('scroll', updateGridHeight);
  //       window.removeEventListener('resize', updateGridHeight);
  //     };
  //   }
  // }, []);

  return (
    // <main style={{ height: gridHeight }}>
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
