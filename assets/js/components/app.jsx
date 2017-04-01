import _ from 'lodash'
import React, { PropTypes } from 'react'
import rest from 'js/rest'
import { connect } from 'react-redux'

import NavBar from 'js/components/navbar'
import Page from 'js/components/page'


export const getPageIdFromPath = (items, path) => {
    const checkPath = item => {
        if (item.url_path === path) {
            return item.id
        }
        else if (item.menuitems) {
            for (const child of item.menuitems) {
                const found = checkPath(child)
                if (!_.isUndefined(found)) return found;
            }
        }
    }
    if (!_.isUndefined(items)) {
        for (const item of items) {
            const found = checkPath(item)
            if (!_.isUndefined(found)) return found;
        }
    }
    throw new Error(`Can't resolve path to id: ${path}`)
}

class App extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        nav: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired,
    }

    componentDidMount() {
        const path = this.props.location.pathname
        const dispatch = this.props.dispatch
        // initial page request
        if (!this.props.page.sync) {
            dispatch(rest.actions.nav.sync(function(_, nav) {
                const id = getPageIdFromPath(nav.menuitems, path)
                dispatch(rest.actions.page.sync({id: id}))
            }))
        }
    }

    render() {
        return (
            <div id="main-wrapper">
                <NavBar items={this.props.nav.data.menuitems}/>
                <Page page={this.props.page}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    page: state.page,
})
export default connect(mapStateToProps)(App)
