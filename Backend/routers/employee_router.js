const express = require('express');
const {verifyToken} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1/employee';

const EmplooyeController = require('../controllers/emplooye_controller.js');

router.get(
    ROOT_PATH + '/me',
    verifyToken,
    EmplooyeController.me,
);

module.exports = router;
