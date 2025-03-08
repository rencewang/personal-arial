import React, { useState, useEffect } from 'react';

import Dropdown from '../components/dropdown';
import WritingList from '../components/writing';
import ArtList from '../components/art';
import About from '../components/about';
import ProjectList from '../components/project';
import Seo from '../components/seo';

import '../styles/general.scss';

const Index = ({ screenSize }) => {
  const [selected, setSelected] = useState(
    screenSize < 1000 ? 'Writing' : 'Art'
  );

  useEffect(() => {
    setSelected(screenSize < 1000 ? 'Writing' : 'Art');
  }, [screenSize]); // Update tab when screen size changes

  const options =
    screenSize < 1000 ? ['Writing', 'Art', 'Projects'] : ['Art', 'Projects'];
  const components = {
    Writing: WritingList,
    Art: ArtList,
    Projects: ProjectList,
  };
  const SelectedComponent = components[selected] || ProjectList;

  // const determineDefaultTab = (width) => (width < 1000 ? 'Writing' : 'Art');
  // const [selected, setSelected] = useState(() =>
  //   determineDefaultTab(screenSize)
  // );

  // const options =
  //   screenSize < 1000 ? ['Writing', 'Art', 'Projects'] : ['Art', 'Projects'];

  // const components = {
  //   Writing: WritingList,
  //   Art: ArtList,
  //   Projects: ProjectList,
  // };
  // const SelectedComponent = components[selected] || ArtList;

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newSize = window.innerWidth;
  //     setScreenSize(newSize);
  //     setSelected(determineDefaultTab(newSize));
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div className="index">
      <section className="page-content border-right left-section">
        <About />
      </section>

      <section className="extra-section"></section>

      <section className="page-content border-right middle-section">
        <WritingList />
      </section>

      <section className="page-content right-section">
        <Dropdown
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        <div style={{ marginTop: '5px' }}>
          <SelectedComponent />
        </div>
      </section>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
