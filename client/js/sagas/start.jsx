import { put, takeLatest } from 'redux-saga/effects'

import { pagesFetchRequested } from 'js/actions'

function* appStart(action) {
  const path = action.path
  console.log(`appStart Saga path=${path}`)
  yield put(pagesFetchRequested(path))
}

export function* watchAppStart() {
  yield takeLatest('APP_START', appStart)
}
