import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import 'isomorphic-fetch'

import App from 'js/app'
import rest from 'js/rest'

// Prepare store
const reducer = combineReducers(rest.reducers)
const finalCreateStore = applyMiddleware(thunk)(createStore)
const initialState = window.$REDUX_STATE
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer)
delete window.$REDUX_STATE

const history = createBrowserHistory()

function select(state) {
    return {
        page: state.page
    }
}
const CApp = connect(select)(App)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="*" component={CApp}/>
        </Router>
    </Provider>
), document.getElementById('djangoreact-app'))
