import { call, put, takeLatest } from 'redux-saga/effects'

import { pageFetchSucceeded, pageFetchFailed } from 'js/actions'
import { pageApi } from 'js/sagas/api'

export function* fetchPage(action) {
  try {
    const page = yield call(pageApi, action.id)
    yield put(pageFetchSucceeded(page))
  } catch (e) {
    yield put(pageFetchFailed(e))
  }
}

export function* watchPage() {
  yield takeLatest('PAGE_FETCH_REQUESTED', fetchPage)
}
