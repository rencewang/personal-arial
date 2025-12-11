import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import ShimmerCanvas from "@/components/ShimmerCanvas";

import "@/styles/general.scss";

const Layout = ({ children }) => {
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [children]);

  const [isAmbient, setIsAmbient] = useState(true);

  // Helper to get time string instantly
  const getAmbientString = () => {
    if (typeof window === "undefined") return "";
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const region = timeZone ? timeZone.replace(/_/g, " ") : "Local Time";
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      return `${timeString} in ${region}`;
    } catch (e) {
      return "";
    }
  };

  const [currentTime, setCurrentTime] = useState(getAmbientString);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getAmbientString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className="background-canvas">
        <ShimmerCanvas />
      </div>

      {/* 2. Top Nav / Retract Toggle */}
      <nav className="top-nav">
        <button
          onClick={() => setIsAmbient(!isAmbient)}
          className="link-button"
        >
          From the Desk of Lawrence Wang
        </button>
      </nav>

      {/* 3. Main Content Overlay */}
      {!isAmbient && (
        <div className="page-content" ref={contentRef}>
          {React.cloneElement(children)}
        </div>
      )}

      {/* 4. Ambient Mode Display */}
      <div className="ambient-content">
        <div className="highlight subtitle">{currentTime}</div>
        <div className="italic">Snow is falling upward.</div>
      </div>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
