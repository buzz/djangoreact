import yargs from 'yargs'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import reactRender from 'react-render'

import createStore from './store'
import Root from './Root'
import { pageFetchRequested, pagesFetchRequested } from 'js/actions'
import { getPageByPath } from 'js/sagas/location'

const argv = yargs
  .option('p', {
    alias: 'port',
    description: 'Port to listen on',
    default: 8008,
  })
  .option('a', {
    alias: 'address',
    description: 'Specify address to bind to',
    default: '127.0.0.1',
  })
  .help('h').alias('h', 'help')
  .strict()
  .argv

const ADDRESS = argv.address
const PORT = argv.port

const app = express()
const server = http.Server(app)

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('React render server')
})

const render = (store, pathname = '/') => ReactDOMServer.renderToString(
  <Root store={store} pathname={pathname} />
)

app.get('/render', (req, res) => {
  const pathname = '/contact/'
  const store = createStore()
  let pageRequested = false

  let unsubscribe = store.subscribe((e) => {
    const state = store.getState()
    const page = state.page
    const pages = state.pages

    if (!pageRequested && pages.length > 0) {
      pageRequested = true
      console.log('PAGES LOADED!')
      // router is not working on the server so we are manually
      // requesting the page
      const page = getPageByPath(pages, pathname)
      store.dispatch(pageFetchRequested(page.id))
    } else if (page.id) {
      console.log('PAGE LOADED!')
      console.log(page)
      unsubscribe()
      // render page
      const html = render(store, pathname)
      res.json({
        html,
        state: store.getState(),
        error: null,
      })
    }
  })
  store.dispatch(pagesFetchRequested(pathname))

  // const opts = {
  //   path: '/home/buzz/dokumente/dev/djangoreact/server/js/Root.jsx',
  //   props: {
  //     store,
  //     pathname,
  //   },
  //   toStaticMarkup: true,
  //   noCache: false,
  // }
  // reactRender(opts, (err, markup) => {
  //   if (err) {
  //     console.log(err.stack)
  //     res.json({
  //       error: {
  //         type: err.constructor.name,
  //         message: err.message,
  //         stack: err.stack,
  //       },
  //       markup: null,
  //     })
  //   } else {
  //     res.json({
  //       error: null,
  //       markup,
  //     })
  //   }
  // })
})

server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`)
})
