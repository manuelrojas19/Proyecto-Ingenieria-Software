require('dotenv').config();

const {
  STORAGE_PATH_DEV,
  STORAGE_PATH_PROD,
} = process.env;

module.exports = {
  'development': {
    path: STORAGE_PATH_DEV,
  },
  'production': {
    path: STORAGE_PATH_PROD,
  },
};
