import 'isomorphic-fetch'

const URL = '/api/v2'
const URL_PAGES = `${URL}/pages/`

export function pagesApi() {
  return fetch(URL_PAGES)
    .then(response => response.json())
    .then(json => json.items)
}

export function pageApi(id) {
  return fetch(`${URL_PAGES}${id}/`)
    .then(response => response.json())
}
