import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';

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

  const fontSizeOptions = { Small: '1rem', Medium: '1.5rem', Large: '2rem' };
  const defaultFontSize = 'Medium';
  const [contentFontSize, setContentFontSize] = useState(
    fontSizeOptions[defaultFontSize]
  );

  const handleContentFontSizeChange = (option) => {
    setContentFontSize(fontSizeOptions[option]);
  };

  return (
    <article className="post">
      <Dropdown
        options={Object.keys(fontSizeOptions)}
        selected={defaultFontSize}
        setSelected={handleContentFontSizeChange}
      />

      <h1 className="title highlight">{title}</h1>
      <div style={{ marginTop: '10px' }}>
        <span className="highlight">{updated}</span>
        <span className="highlight"> in </span>
        <span className="highlight">{category}</span>
      </div>
      {next && (
        <div className="postnav">
          <div>
            <span className="highlight">Previous:</span>
          </div>
          <div>
            <Link to={next.frontmatter.permalink}>
              <span className="highlight">{next.frontmatter.title}</span>
            </Link>
          </div>
        </div>
      )}

      {previous && (
        <div className="postnav">
          <div>
            <span className="highlight">Next:</span>
          </div>
          <div>
            <Link to={previous.frontmatter.permalink}>
              <span className="highlight">{previous.frontmatter.title}</span>
            </Link>
          </div>
        </div>
      )}

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
    frontmatter: { title, seoDescription },
    excerpt: autoExcerpt,
  } = data.markdownRemark;
  const excerpt = autoExcerpt || seoDescription;

  return <Seo title={title} description={excerpt} />;
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
        seoDescription
      }
      id
      html
      excerpt
    }
  }
`;
