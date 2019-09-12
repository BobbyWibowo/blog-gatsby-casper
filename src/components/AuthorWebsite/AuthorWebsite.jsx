import React from 'react'
import './AuthorWebsite.css'

class AuthorWebsite extends React.Component {
  render () {
    const { url } = this.props
    if (url)
      return (
        <span className="author-link icon-link">
          <a href={url} target="_blank" rel="noopener">{url}</a>
        </span>
      )

    return null
  }
}

export default AuthorWebsite
