import React, { useState } from "react";
import projects from "@/content/projects/projects";

const ProjectList = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <section>
      <div className="subtitle">Projects</div>
      {visibleProjects.map((project, index) => (
        <details key={index} className="accordion-item">
          <summary className="accordion-summary">
            <span className="accordion-title">{project.title}</span>
            <span className="accordion-date">{project.year}</span>
          </summary>

          <div className="accordion-content">
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              → View Project
            </a>
          </div>
        </details>
      ))}

      {visibleCount < projects.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="show-more-btn"
        >
          Show More ({projects.length - visibleCount} remaining)
        </button>
      )}
    </section>
  );
};

export default ProjectList;
