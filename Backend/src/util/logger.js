const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
  prettyPrint: true,
  level: process.env.NODE_ENV === 'production' ? 'info': 'debug'});

const expressLogger = expressPino({logger});

module.exports = {logger, expressLogger};
