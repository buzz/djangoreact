import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'js/components/Root'
import history from 'js/history'
import configureStore from 'js/store'
import appSaga from 'js/sagas'
import { appStartRequested } from 'js/actions'

const store = configureStore()
ReactDOM.render(<Root store={store} />, document.getElementById('reactail-app'))
store.runSaga(appSaga)
store.dispatch(appStartRequested(history.pathname))
