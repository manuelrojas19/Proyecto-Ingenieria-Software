const express = require('express');
const {DepartmentController} = require('../controllers');
const {auth, permit} = require('../middleware/auth.js');

const router = new express.Router();

router.get(
    '/departments',
    auth,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);


module.exports = router;
