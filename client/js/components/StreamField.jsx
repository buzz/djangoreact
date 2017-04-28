import React from 'react'
import PropTypes from 'prop-types'

import getBlockByType from 'js/components/blocks'

export default class StreamField extends React.Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
  }

  render() {
    const blocks = this.props.blocks.map((block, index) => {
      const Block = getBlockByType(block.type)
      return (
        <Block key={index} type={block.type} value={block.value} />
      )
    })
    return (
      <div className="stream-field">
        {blocks}
      </div>
    )
  }
}
