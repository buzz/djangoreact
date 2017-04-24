// implemented using CommonJS to allow for conditional import

let history

if (process.env.is_browser) {
  const createHistory = require('history').createBrowserHistory
  history = createHistory()
} else {
  history = null
}

export default history
