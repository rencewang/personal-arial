import React, { useState, useEffect } from 'react';

import Dropdown from '../components/dropdown';
import WritingList from '../components/writing';
import ArtList from '../components/art';
import About from '../components/about';
import ProjectList from '../components/project';
import Seo from '../components/seo';

import '../styles/general.scss';

const Index = () => {
  const getScreenWidth = () =>
    typeof window !== 'undefined' ? window.innerWidth : 1200;
  const determineDefaultTab = (width) => (width < 1000 ? 'Writing' : 'Art');

  const [screenSize, setScreenSize] = useState(getScreenWidth());
  const [selected, setSelected] = useState(
    determineDefaultTab(getScreenWidth())
  );
  const options =
    screenSize < 1000 ? ['Writing', 'Art', 'Projects'] : ['Art', 'Projects'];

  useEffect(() => {
    const handleResize = () => {
      const newSize = getScreenWidth();
      setScreenSize(newSize);

      if (screenSize >= 1000 && newSize < 1000) setSelected('Writing');
      if (screenSize < 1000 && newSize >= 1000) setSelected('Art');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  // Determine available options based on screen size
  const getOptions = () => {
    if (screenSize < 1000) return ['Writing', 'Art', 'Projects'];
    return ['Art', 'Projects'];
  };

  const renderContent = () => {
    const components = {
      Writing: WritingList,
      Art: ArtList,
      Projects: ProjectList,
    };
    const SelectedComponent = components[selected] || ProjectList;
    return <SelectedComponent />;
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
      <section className="page-content border-right left-section">
        <About />
      </section>

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
          options={options}
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
