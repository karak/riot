import each from './../common/util/misc/each'
import { updateExpression } from './update'

/**
 * Update all of the intermidiate child expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
export default function shallowUpdate(expressions) {
  each(expressions, updateExpression.bind(this))
  // TODO: modify
}
