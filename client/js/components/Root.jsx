import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Provider } from 'react-redux'

import App from 'js/components/App'
import getRouter from 'js/router'

// TODO: write page title to window

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    pathname: PropTypes.string,
  }

  render() {
    const store = this.props.store
    const Router = getRouter({store, pathname: this.props.pathname || '/'})
    return (
      <Provider store={store}>
        <Router>
          <Route component={App}/>
        </Router>
      </Provider>
    )
  }
}
