import React from 'react'
import PropTypes from 'prop-types'

import PageLink from 'js/components/PageLink'
import UnsafeBlock from 'js/components/blocks/UnsafeBlock'

export default class PageListItem extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  render() {
    const page = this.props.page

    const img = 'image' in page.meta
      ? (
        <div className="col-md-3">
          <img className="page-img" src={page.meta.image.url} alt={page.meta.image.alt} />
        </div>
      )
      : null

    const date = 'published_at' in page.meta
      ? (<span className="published-at">{page.meta.published_at}</span>)
      : null

    const excerpt = 'excerpt' in page.meta
      ? (<UnsafeBlock markup={page.meta.excerpt} className="excerpt"/>)
      : null

    return (
      <PageLink className="page-stub"
                to={page.meta.url_path}
                title={page.title}>
        <div className="row">
          {img}
          <div className="col">
            {date}
            <h2>{page.title}</h2>
            {excerpt}
          </div>
        </div>
      </PageLink>
    )
  }
}
