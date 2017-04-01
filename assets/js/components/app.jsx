import _ from 'lodash'
import React, { PropTypes } from 'react'
import rest from 'js/rest'
import { connect } from 'react-redux'

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
        location: PropTypes.object.isRequired,
        pages: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired,
    }

    componentDidMount() {
        const path = this.props.location.pathname
        const dispatch = this.props.dispatch
        // initial pages request
        if (!this.props.pages.sync) {
            dispatch(rest.actions.pages.sync(function(_, pages) {
                const id = getPageIdFromPath(pages.items, path)
                dispatch(rest.actions.page.sync({ id: id }))
            }))
        }
    }

    render() {
        const path = this.props.location.pathname
        const pages = _.isUndefined(this.props.pages) ? {} : this.props.pages
        return (
            <div id="main-wrapper">
                <NavBar path={path} pages={pages}/>
                <Page page={this.props.page}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pages: state.pages,
    page: state.page,
})

export default connect(mapStateToProps)(App)
