import React, { useEffect, useState } from 'react';
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
                updated(formatString: "YYYY-MM-DD")
                description
                category
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
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
  ];
  const categories = [defaultCategory, 'Essay', 'Review'];

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [displayedPosts, setDisplayedPosts] = useState();

  const onePost = (post, postIndex) => (
    <details
      className="separate-row"
      key={postIndex}
      open={post.node.frontmatter.defaultExpanded}
    >
      <summary>
        <span className="title">{post.node.frontmatter.title}</span>
        {/* &nbsp;
        <span className="bold italic">{post.node.frontmatter.updated}</span> */}
      </summary>
      <div>{post.node.frontmatter.description}</div>

      <div className="pill">
        <Link to={post.node.frontmatter.permalink}>Read More</Link>
      </div>
    </details>
  );

  useEffect(() => {
    const filterPosts = () => {
      // Filter posts by year first
      let filteredYear = data.allMarkdownRemark.year;

      if (selectedYear !== defaultYear) {
        filteredYear = filteredYear.filter(
          (year) => year.year === selectedYear
        );
      }

      // Now, filter by category
      return filteredYear
        .slice(0)
        .reverse()
        .map((year, index) => (
          <div key={index}>
            {year.edges
              .filter(
                (post) =>
                  selectedCategory === defaultCategory ||
                  post.node.frontmatter.category.includes(selectedCategory)
              )
              .map((post, postIndex) => onePost(post, postIndex))}
          </div>
        ));
    };

    setDisplayedPosts(filterPosts());
  }, [selectedCategory, selectedYear]);

  return (
    <>
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

      <div className="displayed-posts">{displayedPosts}</div>
    </>
  );
};

export default WritingList;
