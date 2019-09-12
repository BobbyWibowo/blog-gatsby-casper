import React from 'react'
import './AuthorImage.css'

class AuthorImage extends React.Component {
  render () {
    const { name, thumb114, url } = this.props.author
    const lookup = ['thumb24', 'thumb68', 'thumb114', 'image']
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
