const express = require('express');
const {verifyToken} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';

const EmplooyeController = require('../controllers/emplooye_controller.js');

router.get(
    ROOT_PATH + '/employee/me',
    verifyToken,
    EmplooyeController.me,
);

router.get(
    ROOT_PATH + '/employee',
    verifyToken,
    EmplooyeController.findAllEmployees,
);

module.exports = router;
