import React from 'react'
import connect from 'react-redux'
import rest from 'js/rest'


export default class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(rest.actions.page.sync())
    }

    render() {
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

        function createMarkup() {
            return { __html: body }
        }

        return (
            <div className="container">
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
}
