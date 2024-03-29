import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';

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
          year: fieldValue
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
      className="separate"
      key={postIndex}
      open={post.node.frontmatter.defaultExpanded}
    >
      <summary>
        <span className="title">{post.node.frontmatter.title}</span>
        &nbsp;
        <span className="bold italic">{post.node.frontmatter.updated}</span>
      </summary>
      <div>{post.node.frontmatter.description}</div>

      <div className="pill">
        <Link to={post.node.frontmatter.permalink}>Read More</Link>
      </div>
    </details>
  );

  useEffect(() => {
    // change displayedPosts to posts in a given category, and given year
    // or return all posts if category and year is 'All'
    setDisplayedPosts(() => {
      // first, filter by year
      let filteredYear = data.allMarkdownRemark.year;
      if (selectedYear !== defaultYear) {
        filteredYear = filteredYear.filter(
          (year) => year.year === selectedYear
        );
      }

      // then, filter by category and return posts
      return filteredYear
        .slice(0)
        .reverse()
        .map((year, index) => (
          <div key={index}>
            {year.edges.map((post, postIndex) => {
              if (selectedCategory === defaultCategory) {
                return onePost(post, postIndex);
              } else if (
                post.node.frontmatter.category.includes(selectedCategory)
              ) {
                return onePost(post, postIndex);
              } else {
                return null;
              }
            })}
          </div>
        ));
    });
  }, [selectedCategory, selectedYear]);

  return (
    <section>
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
    </section>
  );
};

export default BlogPage;

export const Head = () => <Seo title="Writing" />;
