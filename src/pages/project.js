import React, { useState, useEffect } from 'react';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';
import projects from '../content/projects/projects';

const ProjectPage = () => {
  const defaultCategory = 'All Projects';
  const projectCategories = [
    defaultCategory,
    ...new Set(projects.map((project) => project.category)),
  ];

  const [category, setCategory] = useState(defaultCategory);
  const [displayedProjects, setDisplayedProjects] = useState(projects);

  const filterProjects = () => {
    if (category === defaultCategory) {
      return projects;
    }
    return projects.filter((project) => project.category === category);
  };

  useEffect(() => {
    setDisplayedProjects(filterProjects());
  }, [category]);

  return (
    <section id="project">
      <Dropdown
        options={projectCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedProjects.map((project, index) => (
        <details key={index} open={index < 3}>
          <summary>
            <span className="title highlight">{project.title}</span>
            &nbsp;
            <span className="highlight bold italic">{project.year}</span>
          </summary>

          <span className="highlight">{project.description}</span>
          <br />

          <div className="pill">
            <a href={project.link} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </details>
      ))}
    </section>
  );
};

export default ProjectPage;

export const Head = () => <Seo title="Projects" />;
