import React from 'react'
import PropTypes from 'prop-types'

export default class Image extends React.Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  render() {
    const className = this.props.className || ''
    return (
      <img className={`img-fluid mx-auto d-block ${className}"`}
           alt={this.props.alt}
           src={this.props.src} />
    )
  }
}
