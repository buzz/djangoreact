import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import 'isomorphic-fetch'


const URL = '/api/v2'

const api = reduxApi({
    nav: `${URL}/nav/`,
    page: `${URL}/pages/:id/`,
})

export default api.use('fetch', adapterFetch(fetch))
