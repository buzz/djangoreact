import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import rest from 'js/rest'
import NavBar from 'js/components/navbar'
import Page from 'js/components/page'


export const getPageIdFromPath = (pages, path) => {
    for (const page of pages) {
        if (page.meta.url_path === path)
            return page.id
    }
    throw new Error(`Can't resolve path to id: ${path}`)
}

class App extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        pages: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired,
        pageTree: PropTypes.object.isRequired,
        routing: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }

    componentDidMount() {
        // load pages and requested page
        const dispatch = this.props.dispatch
        const path = this.props.location.pathname
        if (!this.props.pages.sync) {
            dispatch(rest.actions.pages.sync(function(_, pages) {
                const id = getPageIdFromPath(pages.items, path)
                dispatch(rest.actions.page.sync({ id: id }))
            }))
        }
    }

    render() {
        const _loc = this.props.routing.locationBeforeTransitions
        const loc = _loc ? _loc : this.props.location
        let path = loc ? loc.pathname : '/'
        return (
            <div id="main-wrapper">
                <NavBar path={path}
                        pageTree={this.props.pageTree}
                        pages={this.props.pages}/>
                <Page page={this.props.page}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    routing: state.routing,
    pages: state.pages,
    page: state.page,
    pageTree: state.pageTree,
})

export default connect(mapStateToProps)(App)
