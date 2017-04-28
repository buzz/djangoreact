import React from 'react'
import PropTypes from 'prop-types'

export default class UnknownBlock extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div>
        <h2>Unknown block (<code>{this.props.type}</code>)</h2>
        <pre>{this.props.value}</pre>
      </div>
    )
  }
}
