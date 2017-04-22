import React from 'react'
import { StaticRouter, Route } from 'react-router'
import { Provider } from 'react-redux'

import App from 'js/components/App'

const Root = ({ store, pathname, context = {} }) => (
  <Provider store={store}>
    <StaticRouter location={pathname} context={context}>
      <Route component={App}/>
    </StaticRouter>
  </Provider>
)

export default Root
