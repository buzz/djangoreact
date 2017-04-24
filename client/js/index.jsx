import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'js/components/Root'
import store from 'js/store'
import history from 'js/history'
import { appStart } from 'js/actions'

ReactDOM.render(<Root store={store} />, document.getElementById('djangoreact-app'))
store.dispatch(appStart(history.pathname))
