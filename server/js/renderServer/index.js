import http from 'http'
import express from 'express'
import serve from './serve'

// fire up server
export const createRenderServer = (port, address) => {
  return new Promise((resolve) => {
    const app = express()
    const server = http.Server(app)
    app.get('/', serve)
    server.listen(port, address, () => { resolve(server) })
  })
}
