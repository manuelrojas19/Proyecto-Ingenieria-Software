const express = require('express');
const {CommissionController} = require('../controllers');
const {permit, auth} = require('../middleware/auth.js');

const router = new express.Router();

router.get(
    '/employees/me/commissions',
    auth,
    permit('Empleado'),
    CommissionController.employeeFindCommissions,
);


router.post(
    '/employees/me/commissions',
    auth,
    permit('Empleado'),
    CommissionController.createCommission,
);

router.get(
    '/employees/me/commissions/:id',
    auth,
    permit('Empleado'),
    CommissionController.employeeFindCommissionById,
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
