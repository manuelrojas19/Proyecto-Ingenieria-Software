const {logger} = require('../util/logger');

require('dotenv').config();

const {
  DB_HOST_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  DB_HOST_PROD,
  DB_USERNAME_PROD,
  DB_PASSWORD_PROD,
} = process.env;

module.exports = {
  'development': {
    'username': DB_USERNAME_DEV,
    'password': DB_PASSWORD_DEV,
    'database': 'Viaticos',
    'host': DB_HOST_DEV,
    'dialect': 'mysql',
    'logging': (sql) => logger.info(sql),
  },
  'test': {
    'username': DB_USERNAME_DEV,
    'password': DB_PASSWORD_DEV,
    'database': 'tems_db_test',
    'host': DB_HOST_DEV,
    'dialect': 'mysql',
  },

  'production': {
    'username': DB_USERNAME_PROD,
    'password': DB_PASSWORD_PROD,
    'database': 'Viaticos',
    'host': DB_HOST_PROD,
    'dialect': 'mysql',
    'dialectOptions': {
      'socketPath': DB_HOST_PROD,
    },
  },
};
