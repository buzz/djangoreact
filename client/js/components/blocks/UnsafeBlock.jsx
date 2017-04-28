import React from 'react'
import BaseBlock from 'js/components/blocks/BaseBlock'

export default class UnsafeBlock extends BaseBlock {
  render() {
    const markup = { __html: this.props.value }
    return (
      <div dangerouslySetInnerHTML={markup}></div>
    )
  }
}
