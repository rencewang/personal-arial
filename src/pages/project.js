import React, { useState } from 'react';

import Seo from '../components/seo';
import projects from '../content/projects/projects';
import '../styles/general.scss';

const ProjectPage = () => {
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  const filterProjects = (category) => {
    if (category === 'All') {
      return projects;
    }
    return projects.filter((project) => project.category === category);
  };

  return (
    <>
      <Seo title="Projects" />

      <section id="project">
        <div className="page-filter">
          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedProjects(filterProjects('All'));
              }}
            >
              All
            </span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedProjects(filterProjects('Tool'));
              }}
            >
              Tools
            </span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedProjects(filterProjects('Creative'));
              }}
            >
              Creative
            </span>
          </div>
          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedProjects(filterProjects('Research'));
              }}
            >
              Research
            </span>
          </div>
        </div>

        {displayedProjects.map((project, index) => (
          <details key={index} open={index < 3}>
            <summary>
              <span className="title highlight">{project.title}</span>
              &nbsp;
              <span className="highlight bold italic">{project.year}</span>
            </summary>

            <span className="highlight">{project.description}</span>
            <a href={project.link} target="_blank" rel="noreferrer">
              <span className="highlight">View &#x2197;</span>
            </a>
          </details>
        ))}
      </section>
    </>
  );
};

export default ProjectPage;
