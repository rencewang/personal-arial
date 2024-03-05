const path = require('path');

const blogTemplate = path.resolve(`./src/templates/blogTemplate.js`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        tls: false,
        net: false,
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, getNodes }) => {
  const { createPage } = actions;
  const allNodes = getNodes();

  const result = await graphql(`
    query {
      posts: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" }, published: { eq: true } }
        }
        sort: { frontmatter: { updated: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              permalink
              title
            }
          }
        }
      }
    }
  `);

  const posts = result.data.posts.edges;
  posts.forEach(({ node }, index) => {
    createPage({
      component: blogTemplate,
      path: node.frontmatter.permalink,
      context: {
        permalink: node.frontmatter.permalink,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
        previous: index === 0 ? null : posts[index - 1].node,
      },
    });
  });
};
