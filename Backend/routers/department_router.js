const express = require('express');
const {auth, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';
const URL_PATH_V2 = '/api/v2';

const DepartmentController = require('../controllers/department_controller.js');

/**
 * v1 Routing
 *
*/

router.get(
    ROOT_PATH + '/finances/department',
    auth,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);

/**
 * v2 Routing
 *
*/

router.get(
    `${URL_PATH_V2}/departments`,
    auth,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);


module.exports = router;
