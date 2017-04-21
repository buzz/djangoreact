import 'isomorphic-fetch'

const URL = '/api/v2'
const URL_PAGES = `${URL}/pages/`

export function pagesApi() {
  return fetch(URL_PAGES)
    .then(response => response.json())
    .then(json => json.items)
}

const pageCache = {}

export function pageApi(id) {
  return new Promise((resolve, reject) => {
    if (pageCache[id]) {
      resolve(pageCache[id])
    } else {
      return fetch(`${URL_PAGES}${id}/`)
        .then(response => response.json())
        .then(page => {
          pageCache[id] = page
          resolve(page)
        })
        .catch(reject)
    }
  })
}
