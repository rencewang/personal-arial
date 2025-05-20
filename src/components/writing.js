import React, { useState, useMemo } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Dropdown from '../components/dropdown';

const WritingList = () => {
  const data = useStaticQuery(graphql`
    query BlogNavigationQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" }, published: { eq: true } }
        }
        sort: { frontmatter: { updated: DESC } }
      ) {
        year: group(field: { frontmatter: { year: SELECT } }) {
          year: fieldValue
          edges {
            node {
              frontmatter {
                title
                permalink
                substack
                updated(formatString: "YYYY-MM-DD")
                formattedUpdated: updated(formatString: "MMMM DD[,] YYYY")
                description
                category
                defaultExpanded
              }
              id
            }
          }
        }
      }
    }
  `);

  const defaultCategory = 'All Category';
  const defaultYear = 'All Year';
  const years = [
    defaultYear,
    ...data.allMarkdownRemark.year.map((y) => y.year),
  ];
  const categories = [defaultCategory, 'Essay', 'Review'];

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const filteredPosts = useMemo(() => {
    return data.allMarkdownRemark.year
      .sort((a, b) => b.year - a.year) // Ensure years are in descending order
      .filter(
        (year) => selectedYear === defaultYear || year.year === selectedYear
      )
      .map((year) => ({
        year: year.year,
        posts: year.edges
          .filter(
            (post) =>
              selectedCategory === defaultCategory ||
              post.node.frontmatter.category.includes(selectedCategory)
          )
          .sort(
            (a, b) =>
              new Date(b.node.frontmatter.updated) -
              new Date(a.node.frontmatter.updated)
          ), // Sort posts by date descending
      }))
      .filter((yearGroup) => yearGroup.posts.length > 0); // Remove empty groups
  }, [selectedCategory, selectedYear, data]);

  const renderPost = (post) => (
    <details
      key={post.node.id}
      className="separate-row"
      open={post.node.frontmatter.defaultExpanded}
    >
      <summary>
        <span className="title">{post.node.frontmatter.title}</span>
      </summary>

      <div className="bold">
        {post.node.frontmatter.formattedUpdated} in{' '}
        {post.node.frontmatter.category}
      </div>

      <div style={{ margin: '0.2rem 0' }}>
        {post.node.frontmatter.description}
      </div>

      {/* <a
        className="bold"
        href={post.node.frontmatter.substack}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: '0.9rem' }}
      >
        Read on Substack
      </a> */}

      <Link className="bold" to={post.node.frontmatter.permalink}>
        Read Here
      </Link>
    </details>
  );

  return (
    <>
      <div className="dropdown-container">
        <Dropdown
          options={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <Dropdown
          options={years}
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
      </div>

      <div className="displayed-posts">
        {filteredPosts.map((yearGroup) => (
          <div key={yearGroup.year}>{yearGroup.posts.map(renderPost)}</div>
        ))}
      </div>
    </>
  );
};

export default WritingList;
