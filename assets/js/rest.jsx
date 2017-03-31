import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const URL = '/api/v2';

export default reduxApi({
    page: `${URL}/resolve/`
}).use('fetch', adapterFetch(fetch));
