import { put, select, takeLatest } from 'redux-saga/effects'

import { pageFetchRequested } from 'js/actions'
import { getPageFromPath } from 'js/sagas/util'
import * as selectors from 'js/sagas/selectors'

function* locationChange(action) {
  const pathname = action.payload.pathname
  try {
    const pages = yield select(selectors.pages)
    const page = yield getPageFromPath(pages, pathname)
    yield put(pageFetchRequested(page.id))
  } catch (e) {
    throw (e)
  }
}

export function* watchLocation() {
  yield takeLatest('@@router/LOCATION_CHANGE', locationChange)
}
