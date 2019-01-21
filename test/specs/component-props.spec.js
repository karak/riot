import {__} from '../../src/riot'
const {createComponent} = __
import {expect} from 'chai'

describe('component', () => {
  describe('props', () => {
    it('maps attributes to props after created.', () => {
      const root = document.createElement('span')
      root.setAttribute('test', 'A')
      root.setAttribute('test-test', 'B')
      document.documentElement.appendChild(root)

      const template = function(template) {
        return template('<span>Hello</span>')
      }

      const instance = createComponent({template})({}).mount(root)

      try {
        expect(instance.props).to.deep.equals({test: 'A', testTest: 'B'})
      } finally {
        instance.unmount()
        document.documentElement.removeChild(root)
      }
    })
  })
})
