/**
 * Entry Script
 */
const dotenv = require('dotenv')
dotenv.config()

if (process.env.NODE_ENV === 'production') {
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js')
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('@babel/register')()
  require('babel-polyfill')

  require('./server')
}
