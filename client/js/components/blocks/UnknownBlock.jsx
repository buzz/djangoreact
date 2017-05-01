import React from 'react'
import PropTypes from 'prop-types'

export default class UnknownBlock extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }

  render() {
    const { type, value } = this.props
    return (
      <div>
        <h2>Unknown block (<code>{type}</code>)</h2>
        <pre>{value}</pre>
      </div>
    )
  }
}
