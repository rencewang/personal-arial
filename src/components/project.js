import React, { useState, useMemo } from 'react';

import Dropdown from '../components/dropdown';
import Projects from '../content/projects/projects';

const ProjectList = () => {
  const defaultCategory = 'All Projects';
  const projectCategories = [
    defaultCategory,
    ...new Set(Projects.map((project) => project.category)),
  ];

  const [category, setCategory] = useState(defaultCategory);

  // Memoized filtering logic
  const displayedProjects = useMemo(
    () =>
      category === defaultCategory
        ? Projects
        : Projects.filter((project) => project.category === category),
    [category]
  );
  return (
    <>
      <Dropdown
        options={projectCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedProjects.map((project, index) => (
        <details className="separate-row" key={index} open={index < 3}>
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
