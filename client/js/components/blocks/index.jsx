import React from 'react'

import UnknownBlock from 'js/components/blocks/UnknownBlock'
import UnsafeBlock from 'js/components/blocks/UnsafeBlock'
import Heading from 'js/components/blocks/Heading'
import Image from 'js/components/blocks/Image'

const Block = props => {
  const value = props.block.value
  switch (props.block.type) {
  case 'heading':
    return <Heading text={value} />
  case 'richtext':
    return <UnsafeBlock markup={value} />
  case 'image':
    return <Image alt={value.title} src={value.url} />
  default:
    return <UnknownBlock type={props.block.type} value={value} />
  }
}

export default Block
