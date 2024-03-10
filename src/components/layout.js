import React, { useEffect, useRef } from 'react';
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

  return (
    <main>
      <header>
        <div id="top">
          <Link to="/">rence.la</Link>

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
