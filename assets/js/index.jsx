import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from 'js/components/app'
import rest from 'js/rest'

// Prepare store
const reducer = combineReducers(rest.reducers)
const finalCreateStore = applyMiddleware(thunk)(createStore)
const initialState = window.$REDUX_STATE
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer)
delete window.$REDUX_STATE


const history = createBrowserHistory()

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="(.+)" component={App} />
        </Router>
    </Provider>
), document.getElementById('djangoreact-app'))
