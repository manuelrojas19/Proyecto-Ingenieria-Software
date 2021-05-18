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
    'database': 'tems_db_dev',
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

  // TODO: Comentar en Gcloud
  'production': {
    'username': DB_USERNAME_PROD,
    'password': DB_PASSWORD_PROD,
    'database': 'sistema_viaticos_db_prod',
    'host': DB_HOST_PROD,
    'dialect': 'mysql',
  },
  // Descomentar en gcloud
  // 'production': {
  //   'username': DB_USERNAME_PROD,
  //   'password': DB_PASSWORD_PROD,
  //   'database': 'sistema_viaticos_db_prod',
  //   'host': '/cloudsql/' + DB_HOST_PROD,
  //   'dialect': 'mysql',
  //   'dialectOptions': {
  //     'socketPath': '/cloudsql/' + DB_HOST_PROD,
  //   },
  // },
};
