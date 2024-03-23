import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Footer from './footer';
import ThreeCanvas from './canvas';
import '../styles/general.scss';

const Layout = ({ children }) => {
  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  const [gridHeight, setGridHeight] = useState('100vh');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateGridHeight = () => {
        setGridHeight(window.innerHeight);
      };

      updateGridHeight();
      window.addEventListener('scroll', updateGridHeight);

      return () => {
        window.removeEventListener('scroll', updateGridHeight);
      };
    }
  }, []);

  return (
    <main style={{ height: gridHeight }}>
      <header>
        <Link to="/">rence.la</Link>

        <div className="navigation">
          <nav>
            <Link to="/blog">Writing</Link>
          </nav>
          <nav>
            <Link to="/project">Project</Link>
          </nav>
          <nav>
            <Link to="/art">Art</Link>
          </nav>
        </div>
      </header>

      <section className="content-container" ref={contentRef}>
        <div id="content">{children}</div>
      </section>

      <Footer />

      <section id="canvas">
        <ThreeCanvas />
      </section>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
