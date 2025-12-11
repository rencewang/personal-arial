import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const WritingList = () => {
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

  const [visibleCount, setVisibleCount] = useState(5);
  const posts = data.allMarkdownRemark.edges;
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <section>
      <div className="subtitle">Table of Contents</div>
      {visiblePosts.map(({ node }) => (
        <details key={node.id} className="accordion-item">
          <summary className="accordion-summary">
            <span className="accordion-title">{node.frontmatter.title}</span>
            <span className="accordion-date">{node.frontmatter.updated}</span>
          </summary>

          <div className="accordion-content">
            <p>{node.frontmatter.description}</p>
            <Link to={node.frontmatter.permalink}>→ Read Entry</Link>
          </div>
        </details>
      ))}

      {visibleCount < posts.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="show-more-btn"
        >
          Show More ({posts.length - visibleCount} remaining)
        </button>
      )}
    </section>
  );
};

export default WritingList;
