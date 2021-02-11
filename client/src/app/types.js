/**
 * @typedef Error
 * @property {string} message
 * @property {string} name
 */

/**
 * @callback onError
 * @param {Error} error
 * @return {undefined}
 */

/**
 * @callback onSuccess
 * @param {*} param
 * @return {undefined}
 */

/**
 * @typedef ICallback
 * @property {onSuccess} onSuccess
 * @property {onError} onError
 */

export default {};
