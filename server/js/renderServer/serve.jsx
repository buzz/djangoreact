import React from 'react'
import ReactDOMServer from 'react-dom/server'

import createStore from './store'
import Root from './Root'

import { pageFetchRequested, pagesFetchRequested } from 'js/actions'
import { getPageByPath } from 'js/sagas/location'

const renderMarkup = (store, pathname = '/') => ReactDOMServer.renderToString(
  <Root store={store} pathname={pathname} />
)

function fetchMarkup(pathname) {
  const store = createStore()

  const awaitPage = () => {
    return new Promise((resolve, reject) => {
      let unsubscribe = store.subscribe(() => {
        const page = store.getState().page
        if (page.id) {
          unsubscribe()
          // render page
          const markup = renderMarkup(store, pathname)
          resolve({
            markup,
            state: store.getState(),
            error: null,
          })
        }
      })
    })
  }

  const awaitPages = () => {
    return new Promise((resolve, reject) => {
      let unsubscribe = store.subscribe(() => {
        const pages = store.getState().pages

        if (pages.length > 0) {
          unsubscribe()
          const stubPage = getPageByPath(pages, pathname)
          if (stubPage) {
            resolve(stubPage.id)
          } else {
            reject(new Error(`Invalid value for "pathname=${pathname}" received.`))
          }
          resolve(pages)
        }
      })
    })
  }

  // trigger API request
  store.dispatch(pagesFetchRequested(pathname))
  return awaitPages().then(currentPageId => {
    // router is not working on the server so we are manually
    // requesting the page
    store.dispatch(pageFetchRequested(currentPageId))
    return awaitPage().then(data => {
      console.log(`Markup served. pathname=${pathname} title=${data.title} id=${data.id}`)
      return data
    })
  })
}

// serve html markup, requires GET parameter "pathname"
const serve = (req, res) => {
  const pathname = req.query.pathname

  if (!pathname) {
    res.json({
      markup: null,
      err: 'Parameter "pathname" missing.',
    })
  }

  fetchMarkup(pathname).then(data => {
    res.json(data)
  }).catch(err => {
    res.json({
      markup: '',
      state: {},
      error: err,
    })
  })
}

export default serve
