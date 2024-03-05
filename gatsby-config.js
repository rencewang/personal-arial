module.exports = {
  siteMetadata: {
    title: 'Lawrence Wang',
    description:
      'Personal site for Lawrence Wang, currently a student at Yale University, intereted in art, economics, and computer science, aspiring to become a designer and developer for the world wide web.',
    author: 'Lawrence Wang',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/threelayout.js`),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-156829821-2',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.ico',
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-XZ15GRH075'],
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-mdx',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './src/content/posts/',
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'traditional',
        path: `${__dirname}/static/artimages/traditional/`,
      },
      __key: 'traditional',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'digital',
        path: `${__dirname}/static/artimages/digital/`,
      },
      __key: 'digital',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'design',
        path: `${__dirname}/static/artimages/design/`,
      },
      __key: 'design',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'art',
        path: './static/artimages/',
      },
      __key: 'art',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: './static/',
      },
      __key: 'static',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1600,
            },
          },
          'gatsby-remark-static-images',
        ],
      },
    },
  ],
};
