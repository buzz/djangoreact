import React from 'react'

import UnknownBlock from 'js/components/blocks/UnknownBlock'
import UnsafeBlock from 'js/components/blocks/UnsafeBlock'
import Heading from 'js/components/blocks/Heading'
import Image from 'js/components/blocks/Image'

const Block = props => {
  const { type, value } = props.block
  switch (type) {
  case 'heading':
    return <Heading text={value.text} size={value.size} />
  case 'richtext':
    return <UnsafeBlock markup={value} />
  case 'image':
    return <Image alt={value.alt}
                  src={value.url}
                  alignment={value.alignment}
                  caption={value.caption} />
  default:
    return <UnknownBlock type={type} value={value} />
  }
}

export default Block
