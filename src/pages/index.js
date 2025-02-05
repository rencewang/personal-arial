import React from 'react';

import About from '../components/about';
import ProjectList from '../components/project';
import Seo from '../components/seo';
import '../styles/general.scss';

const Index = () => {
  return (
    <div className="index">
      <About />
      <ProjectList />
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
