const express = require('express');
const {DepartmentController} = require('../controllers/index.js');
const {auth, permit} = require('../middleware/auth');

const router = new express.Router();

router.get(
    '/departments',
    auth,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);


module.exports = router;
