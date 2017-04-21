import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'

import { pageTreeReducer, pagesReducer, pageReducer } from 'js/reducers'
import rootSaga from 'js/sagas'

const reducer = combineReducers({
  routing: routerReducer,
  pages: pagesReducer,
  pageTree: pageTreeReducer,
  page: pageReducer,
})

const baseHistory = createHistory()
const sagaMiddleware = createSagaMiddleware()
const myRouterMiddleware = routerMiddleware(baseHistory)

// TODO: make the server render initial page and persist $REDUX_STATE
const state = window.$REDUX_STATE
const store = createStore(reducer, state, composeWithDevTools(
  applyMiddleware(sagaMiddleware, myRouterMiddleware),
))
delete window.$REDUX_STATE

sagaMiddleware.run(rootSaga)

// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore(baseHistory, store)

export default store
