const BaseError = require('./base_error.js');
const errorNames = require('./error_names.js');
const httpStatusCodes = require('./http_status_codes.js');

/**
 *  Clase para representar un error operacional de validación
 */
class ValidationError extends BaseError {
  /**
   * Create a point.
   * @param {string} message - Mensaje del error
   * @param {number} name - Nombre del error
   * @param {number} statusCode - Http status code del error, en este caso 401.
   * @param {boolean} isOperational - Tipo de error. 1 - operacional 0 - bug
   */
  constructor(
      message,
      name = errorNames.VALIDATION_FAILED,
      statusCode = httpStatusCodes.UNPROCESSABLE,
      isOperational = true,
  ) {
    super(message, name, statusCode, isOperational);
  }
}

module.exports = ValidationError;
