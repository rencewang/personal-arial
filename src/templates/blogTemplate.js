import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import Seo from '../components/seo';

const BlogTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, updated, category },
    excerpt: autoExcerpt,
    html,
  } = data.markdownRemark;
  const { next, previous } = pageContext;

  // Ensure that the <p> and <h2> tags are wrapped in a span with the class 'highlight'
  let newhtml = html
    .replace(/<p[^>]*>/g, "<p><span class='highlight'>")
    .replace(/<\/p>/g, '</span></p>')
    .replace(/<h2[^>]*>/g, "<h2><span class='highlight'>")
    .replace(/<\/h2>/g, '</span></h2>');

  const [contentFontSize, setContentFontSize] = useState('1.5rem');

  return (
    <article className="post">
      <div className="page-filter">
        <div className="link-button" aria-hidden="true">
          <span
            className="highlight"
            role="presentation"
            onClick={() => {
              setContentFontSize('1rem');
            }}
          >
            Small
          </span>
        </div>
        <div className="link-button" aria-hidden="true">
          <span
            className="highlight"
            role="presentation"
            onClick={() => {
              setContentFontSize('1.5rem');
            }}
          >
            Medium
          </span>
        </div>
        <div className="link-button" aria-hidden="true">
          <span
            className="highlight"
            role="presentation"
            onClick={() => {
              setContentFontSize('2rem');
            }}
          >
            Large
          </span>
        </div>
      </div>
      <h1 className="title highlight">
        {title.replace('&#58;', ':').replace('&amp;', '&')}
      </h1>
      <div style={{ marginTop: '10px' }}>
        <span className="highlight">{updated}</span>
        <span className="highlight"> in </span>
        <span className="highlight">{category}</span>
      </div>
      {next != null ? (
        <div className="postnav">
          <div>
            <span className="highlight">Previous:</span>
          </div>
          <div>
            <Link to={next.frontmatter.permalink}>
              <span className="highlight">
                {next.frontmatter.title
                  .replace('&#58;', ':')
                  .replace('&amp;', '&')}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
      {previous != null ? (
        <div className="postnav">
          <div>
            <span className="highlight">Next:</span>
          </div>
          <div>
            <Link to={previous.frontmatter.permalink}>
              <span className="highlight">
                {previous.frontmatter.title
                  .replace('&#58;', ':')
                  .replace('&amp;', '&')}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
      <div className="postcontent" style={{ fontSize: contentFontSize }}>
        <div dangerouslySetInnerHTML={{ __html: newhtml }} />
      </div>
      <div>
        <Link to="/blog">
          <span className="highlight">Back to All Posts</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogTemplate;

export const Head = ({ data }) => {
  const {
    frontmatter: { title },
    excerpt: autoExcerpt,
  } = data.markdownRemark;
  const seoExcerpt = autoExcerpt;

  return (
    <Seo
      title={title.replace('&#58;', ':').replace('&amp;', '&')}
      description={seoExcerpt}
    />
  );
};

export const postQuery = graphql`
  query ($permalink: String!) {
    markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        updated(formatString: "MMMM DD[,] YYYY")
        tag
        category
        permalink
      }
      id
      html
      excerpt
    }
  }
`;
