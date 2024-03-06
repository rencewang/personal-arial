import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Footer from './footer';
import ThreeCanvas from './canvas';
import '../styles/general.scss';

// Main render function
const Layout = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';

  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  return (
    <main>
      <Helmet>
        <body style={{ overflow: 'hidden' }} />
      </Helmet>

      <header>
        <div id="top">
          <div className="link-button" aria-hidden="true">
            <Link to="/">Lawrence Wang</Link>
          </div>
          <div className="navigation">
            <nav>
              <Link to="/blog">writing</Link>
            </nav>
            <nav>
              <Link to="/project">project</Link>
            </nav>
            <nav>
              <Link to="/art">art</Link>
            </nav>
          </div>
        </div>
      </header>

      <section id="content" ref={contentRef}>
        {children}
      </section>

      <Footer />

      {isBrowser && (
        <section id="canvas" style={{ display: 'block' }}>
          <ThreeCanvas />
        </section>
      )}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;