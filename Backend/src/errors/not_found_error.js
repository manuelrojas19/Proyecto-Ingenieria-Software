const BaseError = require('./base_error.js');
const errorNames = require('./error_names.js');
const httpStatusCodes = require('./http_status_codes.js');

/**
 *  Clase para representar un error operacional de recurso no encontrado
 */
class NotFoundError extends BaseError {
  /**
   * Create a point.
   * @param {string} message - Mensaje del error
   * @param {number} name - Http status code del error, en este caso 404.
   * @param {number} statusCode - Http status code del error, en este caso 404.
   * @param {boolean} isOperational - Tipo de error. 1 - operacional 0 - bug
   */
  constructor(
      message,
      name = errorNames.NOT_FOUND,
      statusCode = httpStatusCodes.NOT_FOUND,
      isOperational = true,
  ) {
    super(message, name, statusCode, isOperational);
  }
}

module.exports = NotFoundError;
