import { routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension';

import rest from 'js/rest'


const reducer = combineReducers({
    ...rest.reducers,
    routing: routerReducer,
})

// TODO: make the server render initial page and persist $REDUX_STATE
const myCreateStore = applyMiddleware(thunk)(createStore)
const state = window.$REDUX_STATE
const store = myCreateStore(reducer, state, devToolsEnhancer())
delete window.$REDUX_STATE

export default store
