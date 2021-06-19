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
    permit('Empleado', 'Finanzas'),
    CommissionController.findCommissionsByEmployee,
);

router.get(
    ROOT_PATH + '/commission/:id',
    verifyToken,
    permit('Empleado'),
    CommissionController.findCommissionByIdAndEmployee,
);

router.get(
    ROOT_PATH + '/manager/commission',
    verifyToken,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);

router.get(
    ROOT_PATH + '/manager/commission/:id',
    verifyToken,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    ROOT_PATH + '/manager/commission/:id',
    verifyToken,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);

router.patch(
    ROOT_PATH + '/finances/commission/:id',
    verifyToken,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.get(
    ROOT_PATH + '/finances/:department/commission',
    verifyToken,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    ROOT_PATH + '/finances/employees/:id/commission',
    verifyToken,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    ROOT_PATH + '/finances/commission/:id',
    verifyToken,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

module.exports = router;
