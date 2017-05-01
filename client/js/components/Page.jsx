import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import StreamField from 'js/components/StreamField'

const Col = props => (
  <div className="row">
    <div className="col">
      {props.children}
    </div>
  </div>
)

export default class Page extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    pageTree: PropTypes.object.isRequired,
  }

  render() {
    const page = this.props.page
    const pageTree = this.props.pageTree

    const title = page.title
      ? <h2>{page.title}</h2>
      : null

    const publishedAt = 'meta' in page && page.meta.published_at !== null
      ? <div className="published-at">{page.meta.published_at}</div>
      : null

    const blocks = 'body' in page
      ? page.body
      : []

    const body = (
      <Col>
        <StreamField pageTree={pageTree} blocks={blocks} />
      </Col>
    )

    const img = 'meta' in page && page.meta.image !== null
      ? (
        <Col>
          <img className="page-img" src={page.meta.image.url} alt={page.meta.image.alt} />
        </Col>
      )
      : null

    const key = 'id' in page
      ? page.id
      : parseInt(Math.random() * 1000000)

    return (
      <div className="page-content container">
        <div>
          <CSSTransitionGroup component="div"
                              transitionName="page-fade"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
            <div className="relative-container" key={key}>
              {img}
              <Col>
                {publishedAt}
                {title}
              </Col>
              {body}
            </div>
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}
