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
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    let posts = data.allMarkdownRemark.year;

    if (selectedYear !== defaultYear) {
      posts = posts.filter((year) => year.year === selectedYear);
    }

    const filteredPosts = posts
      .flatMap((year) => year.edges.reverse())
      .filter((post) =>
        selectedCategory === defaultCategory
          ? true
          : post.node.frontmatter.category.includes(selectedCategory)
      )
      .reverse();

    setFilteredPosts(filteredPosts);
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

      {/* Table Layout for Blog Posts */}
      <table className="blog-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Year</th>
            <th>Category</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post, index) => (
            <tr key={index}>
              <td className="post-title">
                <details>
                  <summary>{post.node.frontmatter.title}</summary>
                  <div className="post-description">
                    <p>{post.node.frontmatter.description}</p>
                  </div>
                </details>
              </td>
              <td className="post-year">{post.node.frontmatter.updated}</td>
              <td className="post-year">{post.node.frontmatter.updated}</td>
              <td className="post-category">
                {post.node.frontmatter.category}
              </td>
              <td className="post-category">
                <Link to={post.node.frontmatter.permalink}>Read More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BlogPage;

export const Head = () => <Seo title="Writing" />;
