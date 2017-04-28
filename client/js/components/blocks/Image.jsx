import React from 'react'
import BaseBlock from 'js/components/blocks/BaseBlock'

export default class Image extends BaseBlock {
  render() {
    return <img alt={this.props.value} src="" />
  }
}
