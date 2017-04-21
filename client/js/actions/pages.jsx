export function pagesFetchRequested(path) {
  return {
    type: 'PAGES_FETCH_REQUESTED',
    path,
  }
}

export function pagesFetchSucceeded(pages) {
  return {
    type: 'PAGES_FETCH_SUCCEEDED',
    pages,
  }
}

export function pagesFetchFailed(err) {
  return {
    type: 'PAGES_FETCH_FAILED',
    message: err.message,
  }
}
