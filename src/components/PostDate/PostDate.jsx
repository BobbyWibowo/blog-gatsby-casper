import React from 'react'
import moment from 'moment'
import './PostDate.css'

class PostDate extends React.Component {
  render () {
    const { date } = this.props
    return (
      <time
        className="post-date"
        dateTime={moment(new Date(date)).format()}
      >
        {moment(new Date(date)).format('ddd, D MMM YYYY, hh:mm A')}
      </time>
    )
  }
}

export default PostDate
