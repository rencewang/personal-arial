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
            <span className="subtitle">{project.title}</span>
            &nbsp;
            <span className="bold italic">{project.year}</span>
          </summary>

          <div style={{ margin: '0 0 0.2rem 0' }}>{project.description}</div>

          <div className="bold">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </div>
        </details>
      ))}
    </>
  );
};

export default ProjectList;
