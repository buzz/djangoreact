import rest from 'js/rest'


export function pageTreeReducer(state, action) {
    const initialState = {
        title: '',
        meta: { url_path: '/' },
        children: [],
    }

    if (typeof state === 'undefined') {
        return initialState
    }

    if (action.type === rest.events.pages.actionSuccess) {
        const makeChild = child => {
            const children = pages.filter(p => p.meta.parent === child.id)
            return {
                ...child,
                children: children.map(makeChild),
            }
        }
        const pages = action.data.items
        const rootPage = pages.find(p => p.meta.parent === null)
        const newState = { ...rootPage }
        const rootChildren = pages.filter(p => p.meta.parent === rootPage.id)
        newState.children = rootChildren.map(makeChild)
        return { ...state, ...newState }
    }

    return state
}
