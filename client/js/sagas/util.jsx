export const getPageFromPath = (pages, path) => {
  return new Promise((resolve, reject) => {
    for (const page of pages) {
      if (page.meta.url_path === path) {
        resolve(page)
      }
    }
    reject(new Error(`Can't resolve path to id: ${path}`))
  })
}
