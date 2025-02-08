import React, { useState, useEffect } from 'react';

import Dropdown from '../components/dropdown';
import WritingList from '../components/writing';
import ArtList from '../components/art';
import About from '../components/about';
import ProjectList from '../components/project';
import Seo from '../components/seo';

import '../styles/general.scss';

const Index = () => {
  const getInitialSelected = () => {
    if (window.innerWidth < 500) return 'About';
    if (window.innerWidth < 1000) return 'Writing';
    return 'Art';
  };

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [selected, setSelected] = useState(getInitialSelected);
  const [prevScreenSize, setPrevScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth;

      // Detect transitions between key breakpoints
      if (prevScreenSize < 500 && newSize >= 500) {
        setSelected('Writing'); // Switch to WritingList when crossing 500px
      } else if (prevScreenSize > 500 && newSize <= 500) {
        setSelected('Writing'); // Switch to ArtList when crossing 1000px
      } else if (prevScreenSize > 1000 && newSize <= 1000) {
        setSelected('Writing'); // Switch to ArtList when crossing 1000px
      } else if (prevScreenSize < 1000 && newSize >= 1000) {
        setSelected('Art'); // Switch to ArtList when crossing 1000px
      }

      setPrevScreenSize(newSize);
      setScreenSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [prevScreenSize]); // Only trigger when screenSize actually changes

  // Determine available options based on screen size
  const getOptions = () => {
    if (screenSize < 500) return ['About', 'Writing', 'Art', 'Projects'];
    if (screenSize < 1000) return ['Writing', 'Art', 'Projects'];
    return ['Art', 'Projects'];
  };

  const renderContent = () => {
    switch (selected) {
      case 'About':
        return <About />;
      case 'Writing':
        return <WritingList />;
      case 'Art':
        return <ArtList />;
      case 'Projects':
        return <ProjectList />;
      default:
        return <ProjectList />;
    }
  };

  return (
    <div className="index">
      {/* Always show About if width > 500px */}
      {screenSize >= 500 && (
        <section className="page-content border-right left-section">
          <About />
        </section>
      )}

      {/* Always show WritingList if width > 1000px */}
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
        <div style={{ marginTop: '5px' }}>{renderContent()}</div>
      </section>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
