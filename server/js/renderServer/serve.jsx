import React from 'react'
import ReactDOMServer from 'react-dom/server'

import configureStore from 'js/store'
import appSaga from 'js/sagas'
import Root from 'js/components/Root'
import { call, put, race, take } from 'redux-saga/effects'
import { appStartRequested } from 'js/actions'

const renderMarkup = (store, pathname = '/') => ReactDOMServer.renderToString(
  <Root store={store} pathname={pathname} />
)

const response = ({markup = '', state = {}, error = null}) => ({
  markup,
  state,
  error,
})

// create store and get app markup/state
function fetchAppSnapshot(pathname) {
  return new Promise((resolve, reject) => {
    // waits for app to start and extracts markup/state
    function* fetchAppSnapshotSaga() {
      yield put(appStartRequested(pathname))
      const { error } = yield race({
        succeeded: take('APP_START_SUCCEEDED'),
        error: take('APP_START_FAILED'),
      })
      if (error) {
        yield call(reject, error)
      } else {
        // extract markup and app state
        const markup = yield call(renderMarkup, store, pathname)
        const state = store.getState()
        yield call(resolve, { markup, state })
      }
    }

    const store = configureStore()

    // run main/markup saga concurrently
    store.runSaga(function* () {
      yield [
        call(appSaga),
        call(fetchAppSnapshotSaga),
      ]
    })
  })
}

// serve html markup, requires GET parameter "pathname"
const serve = (req, res) => {
  const pathname = req.query.pathname

  if (!pathname) {
    res.json(response({ error: 'Parameter "pathname" missing.' }))
  }

  fetchAppSnapshot(pathname)
    .then(snapshot => {
      res.json(response(snapshot))
    })
    .catch(error => {
      res.json(response({ error }))
    })
}

export default serve
