const BaseError = require('./base_error.js');
const errorNames = require('./error_names.js');
const httpStatusCodes = require('./http_status_codes.js');

/**
 *  Clase para representar un error operacional de credenciales incorrectas
 */
class CredentialsError extends BaseError {
  /**
   * Create a point.
   * @param {string} message - Mensaje del error
   * @param {number} name - Http status code del error.
   * @param {number} statusCode - Http status code del erro.
   * @param {boolean} isOperational - Tipo de error. 1 - operacional 0 - bug
   */
  constructor(
      message,
      name = errorNames.INVALID_CREDENTIALS,
      statusCode = httpStatusCodes.UNAUTHORIZED,
      isOperational = true,
  ) {
    super(message, name, statusCode, isOperational);
  }
}

module.exports = CredentialsError;
