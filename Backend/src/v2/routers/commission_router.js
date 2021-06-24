const express = require('express');
const {CommissionController} = require('../controllers/index.js');
const {permit, auth} = require('../middleware/auth');

const router = new express.Router();

router.get(
    '/employee/commissions',
    auth,
    permit('Empleado'),
    CommissionController.findCommissionsByEmployee,
);

router.post(
    '/employee/commissions',
    auth,
    permit('Empleado'),
    CommissionController.createCommission,
);

router.get(
    '/employee/commissions/:id',
    auth,
    permit('Empleado'),
    CommissionController.findCommissionByIdAndEmployee,
);

// Manager

router.get(
    '/manager/commissions',
    auth,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);

router.get(
    '/manager/commissions/:id',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    '/manager/commissions/:id/approve',
    auth,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);

// Finances

router.get(
    '/finance/departments/:department/commissions/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    '/finance/employees/:employee/commissions',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    '/finance/commissions/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

router.patch(
    '/finance/commissions/:id/approve',
    auth,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.patch(
    '/finance/commission/:id/deposit',
    auth,
    permit('Finanzas'),
    CommissionController.depositToCommision,
);

module.exports = router;
