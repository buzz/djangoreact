import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'js/components/Root'
import store from 'js/store'

ReactDOM.render(<Root store={store} />, document.getElementById('djangoreact-app'))
