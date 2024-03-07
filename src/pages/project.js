import React from 'react';

import Seo from '../components/seo';
import projects from '../content/projects/projects';
import '../styles/general.scss';

const ProjectPage = () => {
  return (
    <>
      <Seo title="Projects" />

      <section id="project">
        <div className="page-nav">
          <div className="link-button" aria-hidden="true">
            <span className="highlight">All</span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span className="highlight">Tools</span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span className="highlight">Nothings</span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span className="highlight">Research</span>
          </div>
        </div>

        {projects.map((project, index) => (
          <details key={index} open={index < 3}>
            <summary>
              <span className="title highlight">{project.title}</span>
              &nbsp;
              <span className="highlight bold italic">{project.year}</span>
            </summary>

            <span className="highlight">{project.description}</span>
            <a href={project.link}>
              <span className="highlight">View</span>
            </a>
          </details>
        ))}
      </section>
    </>
  );
};

export default ProjectPage;
