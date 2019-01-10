const { component } = require('../dist/riot/riot')
const { JSDOM } = require('jsdom')
const { expect } = require('chai')

describe('component', () => {
  describe('props', () => {
    beforeEach(() => {
      const jsdom = new JSDOM('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>')
      global.window = jsdom.window
      global.document = jsdom.window.document
      global.Node = jsdom.window.Node
    })

    afterEach(() => {
      delete global.window // eslint-disable-line fp/no-delete
      delete global.document // eslint-disable-line fp/no-delete
      delete global.Node // eslint-disable-line fp/no-delete
    })

    it('maps attributes to props after created.', () => {
      const root = document.createElement('span')
      root.setAttribute('test', 'A')
      root.setAttribute('test-test', 'B')
      document.documentElement.appendChild(root)

      const template = function(template) {
        return template('<span>Hello</span>')
      }

      const instance = component({template}).mount(root)

      try {
        expect(instance.props).to.deep.equals({test: 'A', testTest: 'B'})
      } finally {
        instance.unmount()
        document.documentElement.removeChild(root)
      }
    })
  })
})
