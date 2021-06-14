require('dotenv').config();
const {
  NODE_ENV,
} = process.env;

const cloudStorage = require('./cloud_storage.js');

const storage = (file) => {
  if (NODE_ENV === 'development') {
    return file.path;
  } else if (NODE_ENV == 'production') {
    return cloudStorage(file);
  }
};

module.exports = storage;
