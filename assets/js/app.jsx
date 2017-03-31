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
            console.log(this.props.page.data)
            title = this.props.page.data.items[0].title
            body = this.props.page.data.items[0].body
        } catch (e) {
            title = ''
            body = ''
        }
        function createMarkup() {
            return { __html: body }
        }
        return (
            <div className="container">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={createMarkup()} />
            </div>
        )
    }
}
