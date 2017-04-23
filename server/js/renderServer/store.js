import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { pageTreeReducer, pagesReducer, pageReducer } from 'js/reducers'
import rootSaga from 'js/sagas'

function serverCreateStore() {
  // reducers
  const reducer = combineReducers({
    routing: routerReducer,
    pages: pagesReducer,
    pageTree: pageTreeReducer,
    page: pageReducer,
  })

  // middlewares
  const sagaMiddleware = createSagaMiddleware()
  const myRouterMiddleware = routerMiddleware()

  const store = createStore(
    reducer, {}, applyMiddleware(sagaMiddleware, myRouterMiddleware))

  sagaMiddleware.run(rootSaga)

  return store
}

export default serverCreateStore
