import { push } from 'react-router-redux'
import { call, put, takeLatest } from 'redux-saga/effects'

import { pagesFetchSucceeded, pagesFetchFailed, pageFetchRequested } from 'js/actions'
import { pagesApi } from 'js/sagas/api'
import { getPageByPath } from 'js/sagas/location'

export function* fetchPages(action) {
  try {
    const pages = yield call(pagesApi)
    yield put(pagesFetchSucceeded(pages))
    if (process.env.is_browser && action.path) {
      // navigate to page
      yield put(push(action.path))
    } else {
      // on node the browser history is missing. we manually fetch the page
      const page = getPageByPath(pages, action.path)
      yield put(pageFetchRequested(page.id))
    }
  } catch (e) {
    yield put(pagesFetchFailed(e))
    throw (e)
  }
}

export function* watchPages() {
  yield takeLatest('PAGES_FETCH_REQUESTED', fetchPages)
}
