import { call, put, takeLatest } from 'redux-saga/effects'

import { pagesFetchSucceeded, pagesFetchFailed } from 'js/actions'
import { pagesApi } from 'js/sagas/api'

export function* fetchPages(action) {
  try {
    const pages = yield call(pagesApi)
    yield put(pagesFetchSucceeded(pages))
  } catch (e) {
    yield put(pagesFetchFailed(e))
  }
}

export function* watchPages() {
  yield takeLatest('PAGES_FETCH_REQUESTED', fetchPages)
}
