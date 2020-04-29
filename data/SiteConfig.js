module.exports = {
  blogPostDir: 'posts', // The name of directory that contains your posts.
  blogAuthorDir: 'authors', // The name of directory that contains your author configs.
  blogAuthorId: 'bobby', // The default and fallback author ID used for blog posts without a defined author.
  siteTitle: 'Bobby\'s Blog', // Site title.
  siteTitleAlt: 'Bobby\'s Blog', // Alternative site title for SEO.
  siteLogo: '/logos/logo-600x600.png', // Logo used for SEO and manifest. e.g. "/logos/logo-1024.png",
  siteLogoSmall: '/logos/logo-38x38.png', // Logo used on pages (top left corner)
  siteUrl: 'https://blog.fiery.me', // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-casper/.
  siteDescription: '', // Website description used for RSS feeds/meta description tag.
  siteCover: '/images/75863283_p0-compressor.jpg', // Optional, the cover image used in header for home page. e.g: "/images/blog-cover.jpg",
  siteNavigation: false, // If navigation is enabled the Menu button will be visible
  siteRss: '/rss.xml', // Path to the RSS file.
  siteRssAuthor: 'Bobby Wibowo', // The author name used in the RSS file
  sitePaginationLimit: 10, // The max number of posts per page.
  disqusShortname: 'fiery', // enables Disqus comments, visually deviates from original Casper theme.
  siteSocialUrls: [
    {
      title: 'GitHub',
      url: 'https://github.com/BobbyWibowo'
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/BobbyWibowoB'
    },
    {
      title: 'E-mail',
      url: 'mailto:bobby@fiery.me'
    }
  ],
  postDefaultCategoryID: 'n/a', // Default category for posts (unused).
  // Links to social profiles/projects you want to display in the navigation bar (unused).
  userLinks: [],
  // Copyright string for the footer of the website and RSS feed.
  copyright: {
    label: 'Bobby Wibowo', // Label used before the year
    year: '2018-2020', // optional, defaults to current year
    url: 'https://fiery.me/' // optional, set link address of copyright, defaults to site root
  },
  themeColor: '#4285f4', // Used for setting manifest and progress theme colors.
  backgroundColor: '#303030', // Used for setting manifest background color.
  promoteGatsby: true // Enables the GatsbyJS promotion information in footer.
}
