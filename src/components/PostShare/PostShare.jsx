import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  RedditIcon
} from 'react-share'
import './PostShare.css'

const formatSiteUrl = (siteUrl, pathPrefix, path) =>
  siteUrl + (pathPrefix === '/' ? '' : pathPrefix) + path

// const getCover = post => {
//   const { cover } = post;
//   if (cover && cover.childImageSharp && cover.childImageSharp.original) {
//     return cover.childImageSharp.original.src;
//   }
//   return "";
// };

class PostShare extends React.Component {
  render () {
    const { postNode, postPath, config } = this.props
    const post = postNode.frontmatter
    const url = formatSiteUrl(config.siteUrl, config.pathPrefix, postPath)

    const iconSize = 36
    const filter = count => (count > 0 ? count : '')

    return (
      <section className="share">
        <h4 style={{ marginBottom: '1rem' }}>Share this post</h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TwitterShareButton url={url} title={post.title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={post.title}>
            <FacebookIcon round size={iconSize} />
            <FacebookShareCount url={url}>
              {count => <div className="share-count">{filter(count)}</div>}
            </FacebookShareCount>
          </FacebookShareButton>
          <RedditShareButton url={url} title={post.title}>
            <RedditIcon round size={iconSize} />
            <RedditShareCount url={url}>
              {count => <div className="share-count">{filter(count)}</div>}
            </RedditShareCount>
          </RedditShareButton>
        </div>
      </section>
    )
  }
}

export default PostShare
