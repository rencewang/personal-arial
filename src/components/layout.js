import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Footer from './footer';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  // Set grid height to window height
  const [gridHeight, setGridHeight] = useState('100vh');
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const updateGridHeight = () => {
        setGridHeight(window.innerHeight);
      };

      updateGridHeight();
      window.addEventListener('scroll', updateGridHeight);
      window.addEventListener('resize', updateGridHeight);

      return () => {
        window.removeEventListener('scroll', updateGridHeight);
        window.removeEventListener('resize', updateGridHeight);
      };
    }
  }, []);

  return (
    <main style={{ height: gridHeight }}>
      {/* <header>
        <Link to="/">rence.la</Link>

        <nav className="navigation">
          <Link to="/blog">Writing</Link>
          <Link to="/project">Project</Link>
          <Link to="/art">Art</Link>
        </nav>
      </header> */}

      <section ref={contentRef}>{children}</section>

      <Footer />
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
