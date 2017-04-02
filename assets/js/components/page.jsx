import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Page extends React.Component {
    static propTypes = {
        page: PropTypes.object.isRequired,
    }

    render() {
        let inner = '', pageId = parseInt(Math.random () * 1000000)
        if (this.props.page.sync) {
            let title, body
            try {
                const d = this.props.page.data
                pageId = d.id
                title = d.title
                body = d.body
            } catch (e) {
                if (!e instanceof TypeError)
                    throw(e)
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
        }
        return (
            <div className="page-content container">
                <div>
                    <ReactCSSTransitionGroup transitionName="page-fade"
                                             transitionEnterTimeout={375}
                                             transitionLeaveTimeout={250}>
                        <div className="relative-container" key={pageId}>{inner}</div>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}
