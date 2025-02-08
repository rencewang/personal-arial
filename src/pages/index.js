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
      <section className="page-content border-right">
        <About />
      </section>
      <section className="page-content border-right">
        <WritingList />
      </section>
      {/* <ProjectList /> */}
      <section className="page-content">
        <ArtList />
      </section>
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Lawrence Wang" />;
