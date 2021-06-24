const express = require('express');
const {EmployeeController} = require('../controllers');
const {auth, permit} = require('../middleware/auth.js');

const FINANCES = 'Finanzas';
const MANAGER = 'Jefe de Area';

const router = new express.Router();

router.get(
    '/employees/me',
    auth,
    EmployeeController.me,
);

router.get(
    '/manager/employees',
    auth,
    permit(MANAGER),
    EmployeeController.findEmployeesByDepartment,
);

router.get(
    '/employees',
    auth,
    permit(FINANCES),
    EmployeeController.findAllEmployees,
);

router.get(
    '/finance/departments/:department/employees',
    auth,
    permit(FINANCES),
    EmployeeController.findEmployeesByDepartment,
);

router.get(
    '/employees/:id',
    auth,
    permit(FINANCES),
    EmployeeController.findEmplooyeById,
);

module.exports = router;
