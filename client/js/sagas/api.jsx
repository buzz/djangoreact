import 'isomorphic-fetch'

const API_PAGES_URL = process.env.api_pages_url

export function pagesApi() {
  return fetch(API_PAGES_URL)
    .then(response => response.json())
    .then(json => json.items)
}

// TODO: refactor cache into reducer, having cache in state?
const pageCache = {}

export function pageApi(id) {
  return new Promise((resolve, reject) => {
    if (pageCache[id]) {
      resolve(pageCache[id])
    } else {
      return fetch(`${API_PAGES_URL}${id}/`)
        .then(response => response.json())
        .then(page => {
          pageCache[id] = page
          resolve(page)
        })
        .catch(reject)
    }
  })
}
