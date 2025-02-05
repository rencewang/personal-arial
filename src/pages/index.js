import React from 'react';

import WritingList from '../components/writing';
import ArtList from '../components/art';
import About from '../components/about';
import ProjectList from '../components/project';
import Seo from '../components/seo';
import '../styles/general.scss';

const Index = () => {
  return (
    <div className="index">
      <About />
      <WritingList />
      <ProjectList />
      <ArtList />
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
