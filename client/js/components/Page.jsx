import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Page extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  render() {
    let inner = ''
    let id, title, body
    try {
      ({ id, title, body } = this.props.page)
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw (e)
      }
      id = parseInt(Math.random() * 1000000)
      title = ''
      body = ''
    }

    const createMarkup = () => ({ __html: body })

    inner = (
      <div>
        <div className="row">
          <div className="col">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
        </div>
      </div>
    )

    return (
      <div className="page-content container">
        <div>
          <ReactCSSTransitionGroup transitionName="page-fade"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={500}>
            <div className="relative-container" key={id}>{inner}</div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
