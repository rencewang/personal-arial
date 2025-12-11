import React, { useState } from 'react';
import projects from '../content/projects/projects';

const ProjectAccordion = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className="project-accordion" style={{ width: '100%', marginTop: '3rem' }}>
        <div className="subtitle">Projects</div>
      {visibleProjects.map((project, index) => (
        <details 
          key={index} 
          style={{ 
            borderBottom: '1px solid #1e1cd8', 
            margin: '0', 
            padding: '0rem 0' 
          }}
        >
          <summary 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'baseline',
              cursor: 'pointer',
              listStyle: 'none',
              outline: 'none',
              margin: '0.2rem 0'
            }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {project.title}
            </span>
            <span style={{ fontSize: '1rem', opacity: 0.7, whiteSpace: 'nowrap', marginLeft: '1rem' }}>
              {project.year}
            </span>
          </summary>
          
          <div style={{ marginTop: '0.8rem', paddingLeft: '0' }}>
            <p style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              {project.description}
            </p>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'underline', 
                fontWeight: 'bold',
                color: '#1e1cd8'
              }}
            >
               → View Project
            </a>
          </div>
        </details>
      ))}

      {visibleCount < projects.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          style={{
            marginTop: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: '#1e1cd8',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
             textUnderlineOffset: '0.2rem'
          }}
        >
          Show More ({projects.length - visibleCount} remaining)
        </button>
      )}

      <style>{`
        details > summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectAccordion;
