import React from 'react'
import PropTypes from 'prop-types'

export default class Heading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    return <h2>{this.props.text}</h2>
  }
}
