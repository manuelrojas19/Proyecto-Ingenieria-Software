const express = require('express');
const {auth, permit} = require('../middleware/auth');
const router = new express.Router();

const {DepartmentController} = require('../controllers/index.js');

router.get(
    '/finances/department',
    auth,
    permit('Finanzas'),
    DepartmentController.findAllDepartments,
);

module.exports = router;
