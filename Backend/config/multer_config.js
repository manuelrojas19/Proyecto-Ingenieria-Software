const multer = require('multer');

const localStorage = require('../util/local_storage');

module.exports = {
  'development': {
    storage: localStorage,
    limits: {
      fileSize: 25000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xml)$/)) {
        return cb(new Error('File must be a .xml'));
      }
      cb(undefined, true);
    },
  },
  'production': {
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 25000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xml)$/)) {
        return cb(new Error('File must be a .xml'));
      }
      cb(undefined, true);
    },
  },
};
