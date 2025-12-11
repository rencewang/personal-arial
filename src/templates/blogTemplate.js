import React, { useState, useMemo } from 'react';
import { graphql, Link } from 'gatsby';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';

const PostNav = ({ post, label }) =>
  post && (
    <div className="postnav">
      <div>{label}:</div>
      <div>
        <Link to={post.frontmatter.permalink}>{post.frontmatter.title}</Link>
      </div>
    </div>
  );

const BlogTemplate = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { next, previous } = pageContext;

  const fontSizeOptions = { Small: '1rem', Medium: '1.5rem', Large: '2rem' };
  const [contentFontSize, setContentFontSize] = useState('Medium');

  const contentStyle = useMemo(
    () => ({ fontSize: fontSizeOptions[contentFontSize] }),
    [contentFontSize]
  );

  return (
    <article className="page-content post">
      <div className="postheader">
        <div className="pill">
          <Link to="/">Back</Link>
        </div>
        <Dropdown
          options={Object.keys(fontSizeOptions)}
          selected={contentFontSize}
          setSelected={setContentFontSize}
        />
      </div>

      <h1 className="title">{frontmatter.title}</h1>
      <div style={{ marginTop: '0.6rem' }}>
        {frontmatter.updated} in {frontmatter.category}
      </div>
      <PostNav post={previous} label="Previous" />
      <PostNav post={next} label="Next" />

      <div className="postcontent" style={contentStyle}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div>
        <Link to="/">Back to All Posts</Link>
      </div>
    </article>
  );
};

export default BlogTemplate;

export const Head = ({ data }) => {
  const { frontmatter, excerpt: autoExcerpt } = data.markdownRemark;
  const excerpt = autoExcerpt || frontmatter.seoDescription;

  return <Seo title={frontmatter.title} description={excerpt} />;
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
