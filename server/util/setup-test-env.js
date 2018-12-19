// To get normal classnames instead of CSS Modules classnames for testing
require('mock-css-modules')

require('@babel/register')
require('babel-polyfill')
require('raf/polyfill')

const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}

// use .default export?
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
