import { put, select, takeLatest } from 'redux-saga/effects'

import { pageFetchRequested } from 'js/actions'
import * as selectors from 'js/sagas/selectors'

export const getPageByPath = (pages, path) =>
  pages.find(p => p.meta.url_path === path)

function* locationChange(action) {
  const pathname = action.payload.pathname
  try {
    const pages = yield select(selectors.pages)
    const page = getPageByPath(pages, pathname)
    yield put(pageFetchRequested(page.id))
  } catch (e) {
    throw (e)
  }
}

export function* watchLocation() {
  yield takeLatest('@@router/LOCATION_CHANGE', locationChange)
}
