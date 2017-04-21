export function pageFetchRequested(id) {
  return {
    type: 'PAGE_FETCH_REQUESTED',
    id,
  }
}

export function pageFetchSucceeded(page) {
  return {
    type: 'PAGE_FETCH_SUCCEEDED',
    page,
  }
}

export function pageFetchFailed(err) {
  return {
    type: 'PAGE_FETCH_FAILED',
    message: err.message,
  }
}
