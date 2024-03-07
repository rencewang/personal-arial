import React, { useState } from 'react';
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
                defaultExpanded
                category
              }
              id
            }
          }
        }
      }
    }
  `);

  const onePost = (post, postIndex) => (
    <details key={postIndex} open={post.node.frontmatter.defaultExpanded}>
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

      <span className="highlight">{post.node.frontmatter.description}</span>

      <Link to={post.node.frontmatter.permalink}>
        <span className="highlight">Read More</span>
      </Link>
    </details>
  );

  // create component with posts in a given category, or return all posts if category is 'All'
  const filterPosts = (category) =>
    data.allMarkdownRemark.year
      .slice(0)
      .reverse()
      .map((year, index) => (
        <div key={index} className="year-group">
          {year.edges.map((post, postIndex) => {
            if (category === 'All') {
              return onePost(post, postIndex);
            } else if (post.node.frontmatter.category.includes(category)) {
              return onePost(post, postIndex);
            } else {
              return null;
            }
          })}
        </div>
      ));
  const [displayedPosts, setDisplayedPosts] = useState(filterPosts('All'));

  return (
    <>
      <Seo title="Blog" />
      <section>
        <div className="page-filter">
          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedPosts(filterPosts('All'));
              }}
            >
              All
            </span>
          </div>

          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedPosts(filterPosts('Essay'));
              }}
            >
              Essays
            </span>
          </div>

          <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              role="presentation"
              onClick={() => {
                setDisplayedPosts(filterPosts('Review'));
              }}
            >
              Reviews
            </span>
          </div>

          {/* <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              onClick={() => {
                setDisplayedPosts(filterPosts('Analysis'));
              }}
            >
              Analysis
            </span>
          </div> */}
        </div>

        <div className="displayed-posts">{displayedPosts}</div>
      </section>
    </>
  );
};

export default BlogPage;
