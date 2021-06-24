const express = require('express');
const {auth, permit} = require('../middleware/auth');
const router = new express.Router();

const {EmployeeController} = require('../controllers/index.js');

router.get(
    '/employee/me',
    auth,
    EmployeeController.me,
);

router.get(
    '/employee',
    auth,
    EmployeeController.findAllEmployees,
);

router.get(
    '/employee/:id',
    auth,
    permit('Finanzas'),
    EmployeeController.findEmplooyeById,
);

router.get(
    '/:department/employee',
    auth,
    EmployeeController.findEmployeesByDepartment,
);

module.exports = router;
