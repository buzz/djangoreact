import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'js/components/app'
import rest from 'js/rest'
import store from 'js/store'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createHistory(), store)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route component={App}/>
        </Router>
    </Provider>
), document.getElementById('djangoreact-app'))
