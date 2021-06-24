const multer = require('multer');

const env = process.env.NODE_ENV;
const multerConfig = require('../../../config/multer_config.js')[env];

const upload = multer(multerConfig);

module.exports = upload;
