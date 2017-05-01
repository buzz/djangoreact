export default function pageTreeReducer(state, action) {
  const initialState = {
    title: '',
    meta: {
      url_path: '/',
    },
    children: [],
  }

  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === 'PAGES_FETCH_SUCCEEDED') {
    const makeChild = child => {
      const children = pages.filter(p => p.meta.parent === child.id)
      return {
        ...child,
        children: children.map(makeChild),
      }
    }
    const pages = action.pages
    const rootPage = pages.find(p => p.meta.parent === null)
    const children = pages
      .filter(p => p.meta.parent === rootPage.id)
      .map(makeChild)
    return {
      ...state,
      ...rootPage,
      children,
    }
  }

  return state
}
