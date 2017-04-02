import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import watch from 'redux-watch'
import { devToolsEnhancer } from 'redux-devtools-extension';

import rest from 'js/rest'
import { pageTreeReducer } from 'js/reducers'
import { getPageIdFromPath } from 'js/components/app'


const reducer = combineReducers({
    ...rest.reducers,
    routing: routerReducer,
    pageTree: pageTreeReducer,
})

// TODO: make the server render initial page and persist $REDUX_STATE
const myCreateStore = applyMiddleware(thunk)(createStore)
const state = window.$REDUX_STATE
const store = myCreateStore(reducer, state, devToolsEnhancer())
delete window.$REDUX_STATE

// load page on route
const routeWatch = watch(store.getState, 'routing.locationBeforeTransitions.pathname')
store.subscribe(routeWatch((path, oldPath, objectPath) => {
    const state = store.getState()
    const page_id = getPageIdFromPath(state.pages.data.items, path)
    store.dispatch(rest.actions.page.reset()) // need this to work
    store.dispatch(rest.actions.page.sync({id: page_id}))
}))

export default store
