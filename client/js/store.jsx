import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { appStart } from 'js/actions'
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

// catch up with server render state
const state = window.__PRELOADED_STATE__ || {}
const scriptEl = document.getElementById('__PRELOADED_STATE__')
if (scriptEl) {
  delete window.__PRELOADED_STATE__
  scriptEl.parentElement.removeChild(scriptEl)
}

// create store
const store = createStore(reducer, state, composeWithDevTools(
  applyMiddleware(sagaMiddleware, myRouterMiddleware),
))

// run app sagas
sagaMiddleware.run(rootSaga)

// initialize
store.dispatch(appStart(history.pathname))

export default store
