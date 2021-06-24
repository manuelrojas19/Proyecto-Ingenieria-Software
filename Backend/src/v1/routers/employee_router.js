const express = require('express');
const {auth, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '';
const URL_PATH_V2 = '/api/v2';

const FINANCES = 'Finanzas';
const MANAGER = 'Jefe de Area';

const {EmployeeController} = require('../controllers/index.js');

/**
 * V1 Routing
 *
*/

router.get(
    ROOT_PATH + '/employee/me',
    auth,
    EmployeeController.me,
);

router.get(
    ROOT_PATH + '/employee',
    auth,
    EmployeeController.findAllEmployees,
);

router.get(
    ROOT_PATH + '/employee/:id',
    auth,
    permit('Finanzas'),
    EmployeeController.findEmplooyeById,
);

router.get(
    ROOT_PATH + '/:department/employee',
    auth,
    EmployeeController.findEmployeesByDepartment,
);

/**
 * V2 Routing
 *
*/

router.get(
    `${URL_PATH_V2}/employees/me`,
    auth,
    EmployeeController.me,
);

router.get(
    `${URL_PATH_V2}/manager/employees`,
    auth,
    permit(MANAGER),
    EmployeeController.findEmployeesByDepartment,
);


router.get(
    `${URL_PATH_V2}/employees`,
    auth,
    permit(FINANCES),
    EmployeeController.findAllEmployees,
);

router.get(
    `${URL_PATH_V2}/finance/departments/:department/employees`,
    auth,
    permit(FINANCES),
    EmployeeController.findEmployeesByDepartment,
);

router.get(
    `${URL_PATH_V2}/employees/:id`,
    auth,
    permit(FINANCES),
    EmployeeController.findEmplooyeById,
);

module.exports = router;
