import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const WritingAccordion = () => {
  const data = useStaticQuery(graphql`
    query WritingAccordionQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" }, published: { eq: true } }
        }
        sort: { frontmatter: { updated: DESC } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              permalink
              updated(formatString: "MMM DD, YYYY")
              year: updated(formatString: "YYYY")
              description
              category
            }
          }
        }
      }
    }
  `);

  const [visibleCount, setVisibleCount] = React.useState(5);
  const posts = data.allMarkdownRemark.edges;
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="writing-accordion" style={{ width: '100%' }}>
        <div className="subtitle">Table of Contents</div>
      {visiblePosts.map(({ node }) => (
        <details 
          key={node.id} 
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
              {node.frontmatter.title}
            </span>
            <span style={{ fontSize: '1rem', opacity: 0.7, whiteSpace: 'nowrap', marginLeft: '1rem' }}>
              {node.frontmatter.updated}
            </span>
          </summary>
          
          <div style={{ marginTop: '0.8rem', paddingLeft: '0' }}>
            <p style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              {node.frontmatter.description}
            </p>
            <Link 
              to={node.frontmatter.permalink}
              style={{ 
                textDecoration: 'underline', 
                fontWeight: 'bold',
                color: '#1e1cd8'
              }}
            >
               → Read Entry
            </Link>
          </div>
        </details>
      ))}

      {visibleCount < posts.length && (
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
          Show More ({posts.length - visibleCount} remaining)
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

export default WritingAccordion;
