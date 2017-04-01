import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import App, { getPageIdFromPath } from 'js/components/app'
import rest from 'js/rest'
import store from 'js/store'
import observe from 'js/observe'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createHistory(), store)

// TODO: use action to trigger sync instead of manually listening?
observe(
    store,
    state => state.routing.locationBeforeTransitions.pathname,
    (store, prevPath, path) => {
        const state = store.getState()
        const page_id = getPageIdFromPath(state.pages.data.items, path)
        store.dispatch(rest.actions.page.reset()) // need this to work
        store.dispatch(rest.actions.page.sync({id: page_id}))
    }
)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route component={App} />
        </Router>
    </Provider>
), document.getElementById('djangoreact-app'))
