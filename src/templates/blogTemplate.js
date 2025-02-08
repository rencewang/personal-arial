import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';

const PostNav = (post, label) => {
  return (
    <div className="postnav">
      <div>{label}:</div>
      <div>
        <Link to={post.frontmatter.permalink}>{post.frontmatter.title}</Link>
      </div>
    </div>
  );
};

const BlogTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, updated, category },
    html,
  } = data.markdownRemark;
  const { next, previous } = pageContext;

  const fontSizeOptions = { Small: '1rem', Medium: '1.5rem', Large: '2rem' };
  const defaultFontSize = 'Medium';
  const [contentFontSize, setContentFontSize] = useState(defaultFontSize);

  const handleContentFontSizeChange = (option) => {
    setContentFontSize(option);
  };

  return (
    <section className="page-content">
      <article className="post">
        <Dropdown
          options={Object.keys(fontSizeOptions)}
          selected={contentFontSize}
          setSelected={handleContentFontSizeChange}
        />

        <h1 className="title">{title}</h1>
        <div style={{ marginTop: '10px' }}>
          {updated} in {category}
        </div>
        {next && PostNav(next, 'Previous')}
        {previous && PostNav(previous, 'Next')}

        <div
          className="postcontent"
          style={{ fontSize: fontSizeOptions[contentFontSize] }}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <div>
          <Link to="/">Back to All Posts</Link>
        </div>
      </article>
    </section>
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
