import BaseBlock from 'js/components/blocks/BaseBlock'
import blockTypes from 'js/components/blocks/blockTypes'

export default function getBlockByType(type) {
  if (blockTypes.hasOwnProperty(type)) {
    return blockTypes[type]
  }
  return BaseBlock
}
