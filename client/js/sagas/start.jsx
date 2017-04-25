import { call, put, race, select, take, takeLatest } from 'redux-saga/effects'

import { pagesFetchRequested, pageFetchRequested, appStartSucceeded, appStartFailed } from 'js/actions'
import * as selectors from 'js/sagas/selectors'

import { push } from 'react-router-redux'
import { getPageByPath } from 'js/sagas/location'

function* startApp(action) {
  try {
    const path = action.path

    // 1.) load pages
    const pagesAtStart = yield select(selectors.pages)
    if (pagesAtStart.length < 1) {
      yield put(pagesFetchRequested(path))
      const { error } = yield race({
        fetchedPages: take('PAGES_FETCH_SUCCEEDED'),
        error: take('PAGES_FETCH_FAILED'),
      })
      if (error) {
        throw (error)
      }
    }

    // 2.) load page
    const page = yield select(selectors.page)
    if (!page.hasOwnProperty('id')) {
      if (process.env.is_browser) {
        // navigate to page
        yield put(push(action.path))
      } else {
        // on node the router is static. we manually fetch the page
        const pages = yield select(selectors.pages)
        const pageStub = yield call(getPageByPath, pages, action.path)
        yield put(pageFetchRequested(pageStub.id))
      }
      const { error } = yield race({
        fetchedPage: take('PAGE_FETCH_SUCCEEDED'),
        error: take('PAGE_FETCH_FAILED'),
      })
      if (error) {
        throw (error)
      }
    }

    // 3.) done
    yield put(appStartSucceeded())
  } catch (e) {
    yield put(appStartFailed(e))
  }
}

export function* watchAppStart() {
  yield takeLatest('APP_START_REQUESTED', startApp)
}
