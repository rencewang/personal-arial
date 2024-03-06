import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Footer from './footer';
import ThreeCanvas from './canvas';
import '../styles/general.scss';

// Main render function
const Layout = ({ children }) => {
  // Checking broswer size for three.js zoom
  const isBrowser = typeof window !== 'undefined';
  // let fov;
  // if (isBrowser) {
  //   fov = window.innerWidth > 500 ? 40 : 75;
  // }

  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  // Add option to strip or fill background
  const canvasRef = useRef();
  const [stripButtonText, changeStripButtonText] = useState('Fill');
  // const StripSite = () => {
  //   if (canvasRef.current.style.display === 'none') {
  //     changeStripButtonText('Strip');
  //     canvasRef.current.style.display = 'block';
  //     document.documentElement.style.setProperty(
  //       '--highlight-color',
  //       '#ffc131'
  //     );
  //     document.documentElement.style.setProperty(
  //       '--background-color',
  //       '#cdedee'
  //     );
  //   } else {
  //     canvasRef.current.style.display = 'none';
  //     changeStripButtonText('Fill');
  //     document.documentElement.style.setProperty(
  //       '--highlight-color',
  //       'transparent'
  //     );
  //     document.documentElement.style.setProperty(
  //       '--background-color',
  //       '#f8f8f8'
  //     );
  //   }
  // };

  return (
    <main>
      <Helmet>
        <body style={{ overflow: 'hidden' }} />
      </Helmet>

      <header>
        <div id="top">
          <div
            className="link-button"
            // onClick={() => StripSite(canvasRef)}
            aria-hidden="true"
          >
            <Link to="/">Lawrence Wang</Link>
            {/* {stripButtonText} */}
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

      {/* <section id="background"></section> */}

      {isBrowser && (
        <section id="canvas" ref={canvasRef} style={{ display: 'block' }}>
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
