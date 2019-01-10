import kebabCase from 'kebab-case'

/**
 * convert keys and values
 *
 * @param {{}} obj source object
 * @param {Function} convert converting function
 * @returns {{}} converted object
 */
function convertKeyAndValue(obj, convert) {
  return Object.entries(obj).reduce((accum, [key, value]) => {
    const [newKey, newValue] = convert([key, value])
    accum[newKey] = newValue
    return accum
  }, {})
}

/**
 * convert keys to kebab-case from camel-case
 *
 * @param {{}} obj source object
 * @returns {{}} converted object
 */
export function toKebabCase(obj) {
  return convertKeyAndValue(obj, ([key, value]) => [kebabCase(key), value])
}

/**
 * convert keys to camel-case from kebab-case
 *
 * @param {{}} obj source object
 * @returns {{}} converted object
 */
export function fromKebabCase(obj) {
  // eslint-disable-next-line fp/no-mutating-methods
  return convertKeyAndValue(obj, ([key, value]) => [kebabCase.reverse(key), value])
}
