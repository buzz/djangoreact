import 'isomorphic-fetch'

let BASE_URL = ''
if (typeof module !== 'undefined' && module.exports) {
  // under node
  BASE_URL = 'http://127.0.0.1:8000'
}
const URL = `${BASE_URL}/api/v2`
const URL_PAGES = `${URL}/pages/`

export function pagesApi() {
  console.log(`fetching ${URL_PAGES}`)
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
