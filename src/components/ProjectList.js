import React, { useState } from "react";
import projects from "@/content/projects/projects";

const ProjectList = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <section>
      <div className="subtitle">Projects</div>

      <div className="details-group">
        {visibleProjects.map((project, index) => (
          <details key={index}>
            <summary>
              <div className="subsubtitle">{project.title}</div>
              <div>{project.year}</div>
            </summary>

            <div>
              <div className="details-description">{project.description}</div>
              <a
                className="bold pill"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </details>
        ))}
      </div>

      {visibleCount < projects.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="link-button"
        >
          Show More ({projects.length - visibleCount} remaining)
        </button>
      )}
    </section>
  );
};

export default ProjectList;
