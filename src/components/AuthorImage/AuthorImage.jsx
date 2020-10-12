import React from 'react'
import './AuthorImage.css'

class AuthorImage extends React.Component {
  render () {
    const { name, url } = this.props.author
    const lookup = ['image']
    const image = this.props.author[lookup.find(key => {
      return Object.prototype.hasOwnProperty.call(this.props.author, key)
    })]
    if (image)
      return (
        <figure className="author-image">
          <a
            className="img"
            href={url}
            style={{ backgroundImage: `url("${image}")` }}
          >
            <span className="hidden">{`${name}'s Picture`}</span>
          </a>
        </figure>
      )

    return null
  }
}

export default AuthorImage
