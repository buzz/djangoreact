import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import 'isomorphic-fetch'


const URL = '/api/v2'

const api = reduxApi({
    pages: `${URL}/pages/`,
    page: `${URL}/pages/:id/`,
})

export default api.use('fetch', adapterFetch(fetch))
