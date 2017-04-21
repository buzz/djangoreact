export default function pagesReducer(state, action) {
  const initialState = []

  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === 'PAGES_FETCH_SUCCEEDED') {
    return action.pages
  }

  return state
}
