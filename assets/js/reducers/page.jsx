export default function pageReducer(state, action) {
  const initialState = {}

  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === 'PAGE_FETCH_SUCCEEDED') {
    return action.page
  }

  return state
}
