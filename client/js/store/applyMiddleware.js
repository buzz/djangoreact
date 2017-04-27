// implemented using CommonJS to allow for conditional import
const { applyMiddleware } = require('redux')

const myApplyMiddleware = (...middlewares) => {
  const appliedMiddlewares = applyMiddleware(...middlewares)
  if (process.env.is_browser && process.env.NODE_ENV === 'development') {
    // support redux dev tools on dev
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(appliedMiddlewares)
  }
  return appliedMiddlewares
}

export default myApplyMiddleware
