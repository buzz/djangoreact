import React from 'react'
import PropTypes from 'prop-types'

import PageListItem from 'js/components/blocks/PageListItem'

export default class PageList extends React.Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { className = '' } = this.props
    const pages = this.props.pages.map(page => (
      <PageListItem key={page.id} page={page} />
    ))

    return (
      <div className={`page-list ${className}`}>{pages}</div>
    )
  }
}
