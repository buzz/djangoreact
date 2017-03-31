import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import 'isomorphic-fetch'


const URL = '/api/v2'

export default reduxApi({
    page: {
        url: `${URL}/resolve/?path=:path`,
        transformer(data) {
            try {
                return data.items[0]
            }
            catch (e) {
                if (!e instanceof TypeError)
                    throw(e)
            }
            return null
        }
    }
}).use('fetch', adapterFetch(fetch))
