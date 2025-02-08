import React from 'react';

import Seo from '../components/seo';
import ProjectList from '../components/project';

const ProjectPage = () => (
  <section className="page-content">
    <ProjectList />
  </section>
);

export default ProjectPage;

export const Head = () => <Seo title="Projects" />;
