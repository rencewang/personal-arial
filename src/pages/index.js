import React, { useState, useEffect } from "react";

import Dropdown from "../components/dropdown";
import WritingList from "../components/writing";
import ArtList from "../components/art";
import About from "../components/about";
import ProjectList from "../components/project";
import Seo from "../components/seo";

import "../styles/general.scss";

const Index = () => {
  const getScreenWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 1200;

  const getInitialSelected = () => {
    if (getScreenWidth() < 500) return "About";
    if (getScreenWidth() < 1000) return "Writing";
    return "Art";
  };

  const [screenSize, setScreenSize] = useState(getScreenWidth());
  const [selected, setSelected] = useState(getInitialSelected);
  const [prevScreenSize, setPrevScreenSize] = useState(getScreenWidth());

  useEffect(() => {
    const handleResize = () => {
      const newSize = getScreenWidth();

      // Detect transitions between key breakpoints
      if (prevScreenSize < 500 && newSize >= 500) {
        setSelected("Writing"); // Switch to WritingList when crossing 500px
      } else if (prevScreenSize > 500 && newSize <= 500) {
        setSelected("Writing"); // Switch to ArtList when crossing 1000px
      } else if (prevScreenSize > 1000 && newSize <= 1000) {
        setSelected("Writing"); // Switch to ArtList when crossing 1000px
      } else if (prevScreenSize < 1000 && newSize >= 1000) {
        setSelected("Art"); // Switch to ArtList when crossing 1000px
      }

      setPrevScreenSize(newSize);
      setScreenSize(newSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prevScreenSize]); // Only trigger when screenSize actually changes

  // Determine available options based on screen size
  const getOptions = () => {
    if (screenSize < 500) return ["About", "Writing", "Art", "Projects"];
    if (screenSize < 1000) return ["Writing", "Art", "Projects"];
    return ["Art", "Projects"];
  };

  const renderContent = () => {
    switch (selected) {
      case "About":
        return <About />;
      case "Writing":
        return <WritingList />;
      case "Art":
        return <ArtList />;
      case "Projects":
        return <ProjectList />;
      default:
        return <ProjectList />;
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Runs only on client-side
  }, []);

  if (!isClient) {
    return null; // Don't render until `window` is available
  }

  return (
    <div className="index">
      {/* Always show About if width > 500px */}
      {/* {screenSize >= 500 && ( */}
      <section className="page-content border-right left-section">
        <About />
      </section>
      {/* )} */}

      {/* Extra column (empty with background color) if width > 2000px */}
      {screenSize >= 2000 && <section className="extra-section"></section>}

      {/* Always show Writing if width > 1000px */}
      {screenSize >= 1000 && (
        <section className="page-content border-right middle-section">
          <WritingList />
        </section>
      )}

      {/* Selectable Section */}
      <section className="page-content right-section">
        <Dropdown
          options={getOptions()}
          selected={selected}
          setSelected={setSelected}
        />
        <div style={{ marginTop: "5px" }}>{renderContent()}</div>
      </section>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
