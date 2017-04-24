import React from 'react'
import { syncHistoryWithStore } from 'react-router-redux'
import { StaticRouter, Router } from 'react-router'

import history from 'js/history'

const getRouter = ({ store, pathname = '/' }) => {
  if (process.env.is_browser) {
    // Create an enhanced history that syncs navigation events with the store
    const syncedHistory = syncHistoryWithStore(history, store)
    const router = ({children}) => (
      <Router history={syncedHistory}>{children}</Router>
    )
    return router
  } else {
    // Dummy router for the server
    const context = {}
    const router = ({children}) => (
      <StaticRouter location={pathname} context={context}>{children}</StaticRouter>
    )
    return router
  }
}

export default getRouter
