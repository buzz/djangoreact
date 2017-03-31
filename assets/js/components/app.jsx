import React from 'react'
import rest from 'js/rest'

import NavBar from 'js/components/navbar'
import Page from 'js/components/page'


export default class App extends React.Component {
    render() {
        return (
            <div id="main-wrapper">
                <NavBar/>
                <Page path={this.props.location.pathname}/>
            </div>
        )
    }
}
