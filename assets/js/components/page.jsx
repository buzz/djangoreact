import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FadeSwapper } from 'js/components/animation'


export default class Page extends React.Component {
    static propTypes = {
        page: PropTypes.object.isRequired,
    }

    render() {
        let inner = '', pageId = -1
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
            <FadeSwapper transitionName="page-fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                <div key={pageId} className="page-content container">{inner}</div>
            </FadeSwapper>
        )
    }
}
