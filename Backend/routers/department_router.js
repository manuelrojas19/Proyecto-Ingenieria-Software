const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';

const DepartmentController = require('../controllers/department_controller.js');

router.get(
    ROOT_PATH + '/finances/department',
    verifyToken,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);

module.exports = router;
