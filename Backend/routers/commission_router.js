const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';

const CommissionController = require('../controllers/commission_controller.js');

router.post(
    ROOT_PATH + '/commission',
    verifyToken,
    permit('Empleado'),
    CommissionController.createCommission,
);

module.exports = router;
