import React from 'react'
import PropTypes from 'prop-types'

export default class UnsafeBlock extends React.Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
  }

  render() {
    const markup = { __html: this.props.markup }
    return (
      <div dangerouslySetInnerHTML={markup}></div>
    )
  }
}
