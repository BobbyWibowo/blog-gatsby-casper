<!-- markdownlint-disable MD033 -->
# blog-gatsby-casper

<div align="center">
    <img src="static/logos/logo-600x600.png" alt="Logo" width='200px' height='200px'/>
</div>

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

This was based on Gatsby v2 fork of [gatsby-starter-casper](https://github.com/haysclark/gatsby-starter-casper) by [@haysclark](https://github.com/haysclark).  
The upgrade to v2 was mostly done by [@hnspn](https://github.com/hnspn) with a little help from the folks at [GatsbyCentral](https://www.gatsbycentral.com/).

## Notable changes in this fork

* Switched to [standard](https://github.com/standard/standard) for ESLint's config.
* Switched to [gatsby-plugin-mdx](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/) to use MDX instead of merely Markdown for pages.
* Updated _almost all_ dependencies.  
We seem to be getting warnings from [core-js](https://github.com/zloirock/core-js) about their new v3. Some of Gatsby's sub-dependencies seem to be still depending on core-js v1, and this project seem to originally use v2. I don't yet have the time to look into what to do to make sure this is ready for v3, so we will remain with v2 (and maybe also v1 for that specific Gatsby's sub-dependencies, I don't know, not sure how that works).
* Vendor-prefixed CSS properties wherever applicable.
* Cleaned up all CSS, JS, JSX files to match configured Stylelint & ESLint's guidelines.
* Added `.editorconfig` for proper editor behaviors depending on file types.
* Updated post's share buttons to use social icon & count components from [react-share](https://github.com/nygardk/react-share) instead of Casper's own icons.  
I plan to get rid of Casper icons entirely, in favor of icons built manually with [Fontello](https://github.com/fontello/fontello).
* Reduced height of splash images in posts from `65vh` to `35vh`.
* Got rid of all Google Analytics-related codes/dependencies.
* Updated theme to be _dark-ish_, matching the colorschemes of [safe.fiery.me](https://github.com/BobbyWibowo/lolisafe).  
Though there isn't really any proper colorscheme guidelines there..
* Better index page's pagination (auto scroll to the posts list).
* Actually made syntax highlighting work..

## License

MIT
