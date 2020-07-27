const config = require('./data/SiteConfig')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

const netlifyHeaders = {}
if (config.siteRssNewsfeed)
  netlifyHeaders[config.siteRssNewsfeed] = [
    'Access-Control-Allow-Origin: *'
  ]

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + pathPrefix}/logos/logo-512x512.png`,
      author: config.siteRssAuthor,
      copyright: `${config.copyright.label} © ${config.copyright.year || new Date().getFullYear()}`
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [
          '.mdx',
          '.md'
        ],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 710,
              backgroundColor: 'none',
              quality: 100,
              withWebp: true
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 710,
              ratio: 1.77,
              related: false,
              noIframeBorder: true
            }
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow'
            }
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs'
        ],
        // temp fix for bug: https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
        plugins: [
          'gatsby-remark-images'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/${config.blogPostDir}`
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'authors',
        path: `${__dirname}/content/${config.blogAuthorDir}`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor
      }
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-preset-env')({
            stage: 0
          })
        ]
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logos/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: netlifyHeaders
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup (ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMdx = ref.query.allMdx
          ret.generator = 'GatsbyJS'
          return ret
        },
        query: `
          {
            site {
              siteMetadata {
                rssMetadata {
                  site_url
                  feed_url
                  title
                  description
                  image_url
                  author
                  copyright
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize (ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allMdx.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{
                  'content:encoded': edge.node.html
                }]
              }))
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        cover
                        date
                        category
                        tags
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: config.siteRss,
            title: config.siteTitleAlt
          },
          // "Newsfeed" RSS feed. For polling by clients of safe.fiery.me, cause less posts = smaller size.
          {
            serialize (ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allMdx.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug
              }))
            },
            query: `
              {
                allMdx(
                  limit: ${config.siteRssNewsfeedPosts},
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        cover
                        date
                        category
                        tags
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: config.siteRssNewsfeed,
            title: config.siteTitleAlt
          }
        ]
      }
    }
  ]
}
