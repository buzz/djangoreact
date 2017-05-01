import React from 'react'
import PropTypes from 'prop-types'

export default class UnsafeBlock extends React.Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
  }

  render() {
    const { markup, ...rest } = this.props
    const html = { __html: markup }
    return (
      <div dangerouslySetInnerHTML={html} {...rest}></div>
    )
  }
}
