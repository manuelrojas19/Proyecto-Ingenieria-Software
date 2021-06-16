const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
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

router.get(
    ROOT_PATH + '/employee/:id',
    verifyToken,
    permit('Finanzas'),
    EmplooyeController.findEmplooyeById,
);

router.get(
    ROOT_PATH + '/:department/employee',
    verifyToken,
    EmplooyeController.findEmployeesByDepartment,
);


module.exports = router;
