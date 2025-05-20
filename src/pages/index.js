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
  }, [screenSize]);

  const options =
    screenSize < 1000 ? ['Writing', 'Art', 'Projects'] : ['Art', 'Projects'];
  const components = {
    Writing: WritingList,
    Art: ArtList,
    Projects: ProjectList,
  };
  const SelectedComponent = components[selected] || ProjectList;

  return (
    <div className="index">
      <section className="page-content border-right left-section">
        <About />
      </section>

      <section className="extra-section" />

      <section className="page-content border-right middle-section">
        <WritingList />
      </section>

      <section className="page-content right-section">
        <Dropdown
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        <div style={{ marginTop: '0.3rem' }}>
          <SelectedComponent />
        </div>
      </section>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
