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
  const years = data.allMarkdownRemark.year.map((year) => year.year);
  years.reverse().unshift(defaultYear);
  const categories = ['All Category', 'Essay', 'Review'];

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const onePost = (post, postIndex) => (
    <details key={postIndex} open>
      <summary>
        <span className="title highlight">{post.node.frontmatter.title}</span>
        &nbsp;
        <span className="highlight bold italic">
          {post.node.frontmatter.updated}
        </span>
      </summary>
      <span className="highlight">{post.node.frontmatter.description}</span>
      <br />
      <Link to={post.node.frontmatter.permalink}>
        <span className="highlight">Read More</span>
      </Link>
    </details>
  );

  // create component with posts in a given category, and given year
  // or return all posts if category and year is 'All'
  const filterPosts = (category, year) =>
    data.allMarkdownRemark.year
      .slice(0)
      .reverse()
      .map((year, index) => (
        <div key={index} className="year-group">
          {year.edges.map((post, postIndex) => {
            if (category === defaultCategory) {
              return onePost(post, postIndex);
            } else if (post.node.frontmatter.category.includes(category)) {
              return onePost(post, postIndex);
            } else {
              return null;
            }
          })}
        </div>
      ));

  const [displayedPosts, setDisplayedPosts] = useState(
    filterPosts(defaultCategory, defaultYear)
  );

  // handle dropdown menu changes to selected states
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleYearChange = (year) => setSelectedYear(year);

  useEffect(() => {
    setDisplayedPosts(filterPosts(selectedCategory, selectedYear));
  }, [selectedCategory, selectedYear]);

  return (
    <section>
      <Dropdown options={categories} onSelect={handleCategoryChange} />
      <Dropdown options={years} onSelect={handleYearChange} />

      {/* <div className="page-filter">
        <div className="link-button" aria-hidden="true">
          <span
            className="highlight"
            role="presentation"
            onClick={() => {
              setDisplayedCategory(filterPosts('All'));
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
              setDisplayedCategory(filterPosts('Essay'));
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
              setDisplayedCategory(filterPosts('Review'));
            }}
          >
            Reviews
          </span>
        </div>

        <div className="link-button" aria-hidden="true">
            <span
              className="highlight"
              onClick={() => {
                setDisplayedPosts(filterPosts('Analysis'));
              }}
            >
              Analysis
            </span>
          </div> 
      </div> */}

      <div className="displayed-posts">{displayedPosts}</div>
    </section>
  );
};

export default BlogPage;

export const Head = () => <Seo title="Writing" />;
