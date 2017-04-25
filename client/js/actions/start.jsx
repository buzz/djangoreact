export function appStartRequested(path) {
  return {
    type: 'APP_START_REQUESTED',
    path,
  }
}

export function appStartSucceeded() {
  return {
    type: 'APP_START_SUCCEEDED',
  }
}

export function appStartFailed(err) {
  return {
    type: 'APP_START_FAILED',
    message: err.message,
  }
}
