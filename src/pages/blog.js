import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Seo from '../components/seo';

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query BlogNavigationQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" }, published: { eq: true } }
        }
        sort: { frontmatter: { updated: DESC } }
      ) {
        year: group(field: { frontmatter: { year: SELECT } }) {
          fieldValue
          edges {
            node {
              frontmatter {
                title
                permalink
                updated(formatString: "YYYY")
                description
              }
              id
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <Seo title="Blog" />
      <section>
        {data.allMarkdownRemark.year
          .slice(0)
          .reverse()
          .map((year, index) => (
            <div key={index} className="year-group">
              {year.edges.map((post, postIndex) => (
                <details key={postIndex} open={index === 0 && postIndex < 3}>
                  <summary>
                    <span className="title highlight">
                      {post.node.frontmatter.title
                        .replace('&#58;', ':')
                        .replace('&amp;', '&')}
                    </span>
                    &nbsp;
                    <span className="highlight bold italic">
                      {post.node.frontmatter.updated}
                    </span>
                  </summary>

                  <span className="highlight">
                    {post.node.frontmatter.description}
                  </span>

                  <Link to={post.node.frontmatter.permalink}>
                    <span className="highlight">Read More</span>
                  </Link>
                </details>
              ))}
            </div>
          ))}
      </section>
    </>
  );
};

export default BlogPage;
