import React from 'react'
import ReactDOMServer from 'react-dom/server'

import store from 'js/store'
import Root from 'js/components/Root'

import { appStart } from 'js/actions'

const renderMarkup = (store, pathname = '/') => ReactDOMServer.renderToString(
  <Root store={store} pathname={pathname} />
)

// function fetchMarkup(pathname) {
  // const awaitPage = () => {
  //   return new Promise((resolve, reject) => {
  //     let unsubscribe = store.subscribe(() => {
  //       const page = store.getState().page
  //       if (page.id) {
  //         unsubscribe()
  //         // render page
  //         const markup = renderMarkup(store, pathname)
  //         resolve({
  //           markup,
  //           state: store.getState(),
  //           error: null,
  //         })
  //       }
  //     })
  //   })
  // }
  //
  // const awaitPages = () => {
  //   return new Promise((resolve, reject) => {
  //     let unsubscribe = store.subscribe(() => {
  //       const pages = store.getState().pages
  //
  //       if (pages.length > 0) {
  //         unsubscribe()
  //         const stubPage = getPageByPath(pages, pathname)
  //         if (stubPage) {
  //           resolve(stubPage.id)
  //         } else {
  //           reject(new Error(`Invalid value for "pathname=${pathname}" received.`))
  //         }
  //         resolve(pages)
  //       }
  //     })
  //   })
  // }

  // trigger API request
  // store.dispatch(appStart(pathname))
  // return awaitPages().then(currentPageId => {
  //   // router is not working on the server so we are manually
  //   // requesting the page
  //   store.dispatch(pageFetchRequested(currentPageId))
  //   return awaitPage().then(data => {
  //     const page = data.state.page
  //     console.log(`Markup served. pathname=${pathname} title=${page.title} id=${page.id}`)
  //     return data
  //   })
  // })
// }

function fetchMarkup(pathname) {
  // wait for page data to be loaded
  const awaitPage = new Promise((resolve, reject) => {
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
  store.dispatch(appStart(pathname))
  return awaitPage
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
