import React from 'react'
import ReactDOMServer from 'react-dom/server'

import createStore from './store'
import Root from './Root'

// client code
import { pageFetchRequested, pagesFetchRequested } from 'js/actions'
import { getPageByPath } from 'js/sagas/location'

const renderMarkup = (store, pathname = '/') => ReactDOMServer.renderToString(
  <Root store={store} pathname={pathname} />
)

// serve html markup, requires GET parameter "pathname"
const serve = (req, res) => {
  const pathname = req.query.pathname

  if (!pathname) {
    res.json({
      markup: null,
      err: 'Parameter "pathname" missing.',
    })
  }

  const store = createStore()
  let pageRequested = false

  let unsubscribe = store.subscribe(() => {
    const state = store.getState()
    const page = state.page
    const pages = state.pages

    if (!pageRequested && pages.length > 0) {
      pageRequested = true
      console.log('PAGES LOADED')
      // router is not working on the server so we are manually
      // requesting the page
      const stubPage = getPageByPath(pages, pathname)
      if (stubPage) {
        store.dispatch(pageFetchRequested(stubPage.id))
        console.log('REQUESTED PAGE FETCH')
      } else {
        res.json({
          markup: null,
          err: 'Invalid value for "pathname" received.',
        })
      }
    } else if (page.id) {
      console.log('PAGE LOADED')
      unsubscribe()
      // render page
      const markup = renderMarkup(store, pathname)
      console.log('MARKUP RENDERED')
      res.json({
        markup,
        state: store.getState(),
        error: null,
      })
    }
  })
  store.dispatch(pagesFetchRequested(pathname))
}

export default serve
