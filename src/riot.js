import * as globals from './globals'
import {createComponent, defineComponent, mountComponent} from './core/component'
import {$$} from './utils/dom'
import cssManager from './core/css-manager'
import {isFunction} from './utils/checks'
import {panic} from './utils/misc'

const { DOM_COMPONENT_INSTANCE_PROPERTY, COMPONENTS_IMPLEMENTATION_MAP, PLUGINS_SET } = globals

/**
 * Riot public api
 */

/**
 * Register a custom tag by name
 * @param   {string} name - component name
 * @param   {Object} implementation - tag implementation
 * @returns {Map} map containing all the components implementations
 */
export function register(name, {css, template, tag}) {
  if (COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component "${name}" was already registered`)

  COMPONENTS_IMPLEMENTATION_MAP.set(name, createComponent({name, css, template, tag}))

  return COMPONENTS_IMPLEMENTATION_MAP
}

/**
 * Unregister a riot web component
 * @param   {string} name - component name
 * @returns {Map} map containing all the components implementations
 */
export function unregister(name) {
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component "${name}" was never registered`)

  COMPONENTS_IMPLEMENTATION_MAP.delete(name)
  cssManager.remove(name)

  return COMPONENTS_IMPLEMENTATION_MAP
}

/**
 * Mounting function that will work only for the components that were globally registered
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {Object} initialState - the initial component state
 * @param   {string} name - optional component name
 * @returns {Array} list of nodes upgraded
 */
export function mount(selector, initialState, name) {
  return $$(selector).map(element => mountComponent(element, initialState, name))
}

/**
 * Sweet unmounting helper function for the DOM node mounted manually by the user
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @returns {Array} list of nodes unmounted
 */
export function unmount(selector) {
  return $$(selector).map(element => {
    if (element[DOM_COMPONENT_INSTANCE_PROPERTY]) {
      element[DOM_COMPONENT_INSTANCE_PROPERTY].unmount()
    }
    return element
  })
}

/**
 * Define a riot plugin
 * @param   {Function} plugin - function that will receive all the components created
 * @returns {Set} the set containing all the plugins installed
 */
export function install(plugin) {
  if (!isFunction(plugin)) panic('Plugins must be of type function')
  if (PLUGINS_SET.has(plugin)) panic('This plugin was already install')

  PLUGINS_SET.add(plugin)

  return PLUGINS_SET
}

/**
 * Uninstall a riot plugin
 * @param   {Function} plugin - plugin previously installed
 * @returns {Set} the set containing all the plugins installed
 */
export function uninstall(plugin) {
  if (!PLUGINS_SET.has(plugin)) panic('This plugin was never installed')

  PLUGINS_SET.delete(plugin)

  return PLUGINS_SET
}

/** @type {string} current riot version */
export const version = 'WIP'

// expose some internal stuff that might be used from external tools
export const __ = {
  cssManager,
  createComponent,
  defineComponent,
  globals
}
