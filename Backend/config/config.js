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
    'host': '/cloudsql/' + DB_HOST_PROD,
    'dialect': 'mysql',
    'dialectOptions': {
      'socketPath': '/cloudsql/' + DB_HOST_PROD,
    },
  },
};
