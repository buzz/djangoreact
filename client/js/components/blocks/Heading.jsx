import React from 'react'
import BaseBlock from 'js/components/blocks/BaseBlock'

export default class Heading extends BaseBlock {
  render() {
    return <h2>{this.props.value}</h2>
  }
}
