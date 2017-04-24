import { createStore, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import history from 'js/history'
import { appStart } from 'js/actions'
import { pageTreeReducer, pagesReducer, pageReducer } from 'js/reducers'
import rootSaga from 'js/sagas'
import getInitialState from 'js/store/getInitialState'
import myApplyMiddleware from 'js/store/applyMiddleware'

const reducer = combineReducers({
  routing: routerReducer,
  pages: pagesReducer,
  pageTree: pageTreeReducer,
  page: pageReducer,
})

const sagaMiddleware = createSagaMiddleware()
const myRouterMiddleware = process.env.is_browser ? routerMiddleware(history) : routerMiddleware()
const enhancer = myApplyMiddleware(sagaMiddleware, myRouterMiddleware)
const state = getInitialState()

const store = createStore(reducer, state, enhancer)

sagaMiddleware.run(rootSaga)
store.dispatch(appStart('TODO'))
// store.dispatch(appStart(history.pathname))

export default store
