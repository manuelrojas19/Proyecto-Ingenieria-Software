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

router.get(
    ROOT_PATH + '/commission',
    verifyToken,
    permit('Empleado'),
    CommissionController.findCommissionsByEmployee,
);

router.get(
    ROOT_PATH + '/manager-commissions',
    verifyToken,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);


module.exports = router;
