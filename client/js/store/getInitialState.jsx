// catch up with server render state
const getInitialState = () => {
  if (process.env.is_browser && '__PRELOADED_STATE__' in window) {
    const state = window.__PRELOADED_STATE__
    delete window.__PRELOADED_STATE__
    const scriptTag = document.getElementById('__PRELOADED_STATE__')
    if (scriptTag) {
      scriptTag.parentElement.removeChild(scriptTag)
    }
    return state
  } else {
    return {}
  }
}

export default getInitialState
