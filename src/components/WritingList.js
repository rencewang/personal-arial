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
      <div className="details-group">
        {visiblePosts.map(({ node }) => (
          <details key={node.id}>
            <summary>
              <div className="subsubtitle">{node.frontmatter.title}</div>
              <div>{node.frontmatter.updated}</div>
            </summary>

            <div>
              <div className="details-description">
                {node.frontmatter.description}
              </div>

              <div className="pill bold">
                <Link to={node.frontmatter.permalink}>Read More</Link>
              </div>
            </div>
          </details>
        ))}
      </div>

      {visibleCount < posts.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="link-button"
        >
          Show More ({posts.length - visibleCount} remaining)
        </button>
      )}
    </section>
  );
};

export default WritingList;
