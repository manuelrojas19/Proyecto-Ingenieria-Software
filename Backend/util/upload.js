const multer = require('multer');
const storage = require('./storage');

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xml)$/)) {
      return cb(new Error('File must be a .xml'));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
