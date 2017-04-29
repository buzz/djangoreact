import React from 'react'
import PropTypes from 'prop-types'

export default class Heading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6']),
  }

  render() {
    const HTag = this.props.size || 'h2'
    return (
      <HTag className="block-heading">{this.props.text}</HTag>
    )
  }
}
