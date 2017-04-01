import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


export default class Page extends React.Component {
    static propTypes = {
        page: PropTypes.object.isRequired,
    }

    render() {
        let inner = ''
        if (this.props.page.sync) {
            let title, body
            try {
                const d = this.props.page.data
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
        else {
            inner = <p>Loading…</p>
        }
        return (
            <div className="page-content container">{inner}</div>
        )
    }
}
