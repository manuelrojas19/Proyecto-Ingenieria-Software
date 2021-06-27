/**
 * Clase para representar un error operacional
 */
class BaseError extends Error {
  /**
   * Create a point.
   * @param {string} message - Mensaje del error
   * @param {string} name - Nombre del error
   * @param {number} statusCode - Http status code del error.
   * @param {boolean} isOperational - Tipo de error
   */
  constructor(message, name, statusCode, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
