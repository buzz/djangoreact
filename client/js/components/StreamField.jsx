import React from 'react'
import PropTypes from 'prop-types'

import Block from 'js/components/blocks'

export default class StreamField extends React.Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
  }

  render() {
    const blocks = this.props.blocks.map(
      (block, index) => <Block block={block} key={index} />
    )
    return (
      <div className="stream-field">
        {blocks}
      </div>
    )
  }
}
