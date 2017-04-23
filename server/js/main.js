import yargs from 'yargs'
import { createRenderServer } from './renderServer'

if (!('api_pages_url' in process.env)) {
  console.log('Environment variable $api_pages_url needs to be set.')
  process.exit(-1)
}
const endpoint = process.env.api_pages_url

// command line args
const argv = yargs
  .option('a', {
    alias: 'address',
    description: 'Address to listen to',
    default: '127.0.0.1',
  })
  .option('p', {
    alias: 'port',
    description: 'Port to listen to',
    default: '5000',
  })
  .help('h').alias('h', 'help')
  .strict()
  .argv
const address = argv.address
const port = argv.port

createRenderServer(port, address).then(() => {
  console.log(`Listening at http://${address}:${port}`)
  console.log(`Calling endpoint at ${endpoint}`)
}).catch((err) => {
  console.log('Could not create renderServer:', err)
})
