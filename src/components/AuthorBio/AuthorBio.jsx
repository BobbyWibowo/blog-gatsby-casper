import React from 'react'
import './AuthorBio.css'

class AuthorBio extends React.Component {
  render () {
    const { bio } = this.props
    if (bio)
      return <h2 className="author-bio" dangerouslySetInnerHTML={{ __html: bio }}></h2>

    return null
  }
}

export default AuthorBio
