const BaseError = require('../errors/base_error');
const {logger} = require('../util/logger');

/* eslint-disable require-jsdoc */

function logError(error, req, res, next) {
  logger.error(error);
  next(error);
}

function handleError(error, req, res, next) {
  if (!isOperationalError(error)) {
    res.status(500).send({error: error.message});
  } else {
    res.status(error.statusCode).send({error: error.message});
  }
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  handleError,
  isOperationalError,
};
