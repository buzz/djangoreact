import React from 'react'

import UnknownBlock from 'js/components/blocks/UnknownBlock'
import UnsafeBlock from 'js/components/blocks/UnsafeBlock'
import Heading from 'js/components/blocks/Heading'
import Image from 'js/components/blocks/Image'
import PageList from 'js/components/blocks/PageList'

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
  case 'blog_posts':
    const blogPages = props.pageTree.children.find(
      page => page.meta.type === 'reactail.BlogIndexPage').children
    return <PageList pages={blogPages} className="blog-posts" />
  default:
    return <UnknownBlock type={type} value={value} />
  }
}

export default Block
