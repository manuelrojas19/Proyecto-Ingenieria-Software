const express = require('express');
const {permit, auth} = require('../middleware/auth');
const router = new express.Router();

const CommissionController = require('../controllers/commission_controller.js');

router.post(
    '/commission',
    auth,
    permit('Empleado'),
    CommissionController.createCommission,
);

router.get(
    '/commission',
    auth,
    permit('Empleado', 'Finanzas'),
    CommissionController.findCommissionsByEmployee,
);

router.get(
    '/commission/:id',
    auth,
    permit('Empleado'),
    CommissionController.findCommissionByIdAndEmployee,
);


// Manager

router.get(
    '/manager/commission',
    auth,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);

router.get(
    '/manager/commission/:id',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    '/manager/commission/:id',
    auth,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);


// Finances

router.patch(
    '/finances/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.get(
    '/finances/:department/commission',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    '/finances/employees/:id/commission',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    '/finances/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

router.patch(
    '/deposit/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.depositToCommision,
);

module.exports = router;
