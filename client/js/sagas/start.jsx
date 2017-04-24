import { put, select, takeLatest } from 'redux-saga/effects'

import { pagesFetchRequested } from 'js/actions'
import * as selectors from 'js/sagas/selectors'

function* appStart(action) {
  const path = action.path
  console.log(`appStart Saga path=${path}`)
  // const page = yield select(selectors.page)
  const pages = yield select(selectors.pages)
  if (pages.length < 1) {
    console.log('appStart Saga no pages available. Fetching...')
    yield put(pagesFetchRequested(path))
  }
}

export function* watchAppStart() {
  yield takeLatest('APP_START', appStart)
}
