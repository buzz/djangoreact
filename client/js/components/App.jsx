import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavBar from 'js/components/NavBar'
import Page from 'js/components/Page'

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    pageTree: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
