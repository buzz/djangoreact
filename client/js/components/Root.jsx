import React from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'js/components/App'
import history from 'js/history'
import store from 'js/store'

// Create an enhanced history that syncs navigation events with the store
const syncedHistory = syncHistoryWithStore(history, store)

const Root = () => (
  <Provider store={store}>
    <Router history={syncedHistory}>
      <Route component={App} />
    </Router>
  </Provider>
)

export default Root
