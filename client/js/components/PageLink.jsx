import React from 'react'

import { Link } from 'react-router-dom'

const PageLink = ({ className, isActive = false, ...rest }) => (
  <Link
    className={isActive ? [ 'active', className ].join(' ') : className}
    {...rest}
  />
)

export default PageLink
