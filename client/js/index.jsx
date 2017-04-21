import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'

import App from 'js/components/app'
import store, { history } from 'js/store'

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </Provider>
), document.getElementById('djangoreact-app'))
