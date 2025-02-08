import React, { useState, useEffect } from 'react';

import Dropdown from '../components/dropdown';
import Projects from '../content/projects/projects';

const ProjectList = () => {
  const defaultCategory = 'All Projects';
  const projectCategories = [
    defaultCategory,
    ...new Set(Projects.map((project) => project.category)),
  ];

  const [category, setCategory] = useState(defaultCategory);
  const [displayedProjects, setDisplayedProjects] = useState(Projects);

  const filterProjects = () => {
    if (category === defaultCategory) {
      return Projects;
    }
    return Projects.filter((project) => project.category === category);
  };

  useEffect(() => {
    setDisplayedProjects(filterProjects());
  }, [category]);

  return (
    <>
      <Dropdown
        options={projectCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedProjects.map((project, index) => (
        <details className="separate" key={index} open={index < 3}>
          <summary>
            <span className="title">{project.title}</span>
            &nbsp;
            <span className="bold italic">{project.year}</span>
          </summary>

          <div>{project.description}</div>

          <div className="pill">
            <a href={project.link} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </details>
      ))}
    </>
  );
};

export default ProjectList;
