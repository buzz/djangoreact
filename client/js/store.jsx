import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { pageTreeReducer, pagesReducer, pageReducer } from 'js/reducers'
import rootSaga from 'js/sagas'
import history from 'js/history'

// reducers
const reducer = combineReducers({
  routing: routerReducer,
  pages: pagesReducer,
  pageTree: pageTreeReducer,
  page: pageReducer,
})

// middlewares
const sagaMiddleware = createSagaMiddleware()
const myRouterMiddleware = routerMiddleware(history)

// TODO: make the server render initial page and persist $REDUX_STATE
const state = window.$REDUX_STATE
const store = createStore(reducer, state, composeWithDevTools(
  applyMiddleware(sagaMiddleware, myRouterMiddleware),
))
delete window.$REDUX_STATE

sagaMiddleware.run(rootSaga)

export default store
