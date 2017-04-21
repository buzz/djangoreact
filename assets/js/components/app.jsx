import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { pagesFetchRequested } from 'js/actions'
import NavBar from 'js/components/navbar'
import Page from 'js/components/page'

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    pageTree: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const path = this.props.location.pathname
    this.props.dispatch(pagesFetchRequested(path))
  }

  render() {
    const loc = this.props.routing.locationBeforeTransitions || this.props.location
    let path = loc ? loc.pathname : '/'
    return (
      <div id="main-wrapper">
        <NavBar path={path} pageTree={this.props.pageTree}/>
        <Page page={this.props.page}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  page: state.page,
  pageTree: state.pageTree,
})

export default connect(mapStateToProps)(App)
