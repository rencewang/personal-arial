import React, { useState, useEffect } from 'react';

import Dropdown from '../components/dropdown';
import WritingAccordion from '../components/WritingAccordion';
// import ArtList from '../components/art';
import About from '../components/about';
import ProjectAccordion from '../components/ProjectAccordion';
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
    Writing: WritingAccordion,
    // Art: ArtList,
    Projects: ProjectAccordion,
  };
  // const SelectedComponent = components[selected] || ProjectList;

  return (
    <div className="index-single-column">
      <WritingAccordion />
      <ProjectAccordion />

      <div style={{ marginTop: '2rem' }}>
        <About />
      </div>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
