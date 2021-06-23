const express = require('express');
const {auth, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';
const URL_PATH_V2 = '/api/v2';

const FINANCES = 'Finanzas';
const MANAGER = 'Jefe de Area';

const EmplooyeController = require('../controllers/emplooye_controller.js');

/**
 * V1 Routing
 *
*/

router.get(
    ROOT_PATH + '/employee/me',
    auth,
    EmplooyeController.me,
);

router.get(
    ROOT_PATH + '/employee',
    auth,
    EmplooyeController.findAllEmployees,
);

router.get(
    ROOT_PATH + '/employee/:id',
    auth,
    permit('Finanzas'),
    EmplooyeController.findEmplooyeById,
);

router.get(
    ROOT_PATH + '/:department/employee',
    auth,
    EmplooyeController.findEmployeesByDepartment,
);

/**
 * V2 Routing
 *
*/

router.get(
    `${URL_PATH_V2}/employees/me`,
    auth,
    EmplooyeController.me,
);

router.get(
    `${URL_PATH_V2}/employees`,
    auth,
    permit(FINANCES),
    EmplooyeController.findAllEmployees,
);

router.get(
    `${URL_PATH_V2}/employees/:id`,
    auth,
    permit(FINANCES),
    EmplooyeController.findEmplooyeById,
);

router.get(
    `${URL_PATH_V2}/departments/:department/employees`,
    auth,
    permit(FINANCES, MANAGER),
    EmplooyeController.findEmployeesByDepartment,
);


module.exports = router;
