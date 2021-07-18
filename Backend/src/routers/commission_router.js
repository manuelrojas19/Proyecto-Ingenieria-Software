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
    CommissionController.employeeCreateCommission,
);

router.get(
    '/employees/me/commissions/:id',
    auth,
    permit('Empleado'),
    CommissionController.employeeFindCommissionById,
);

// Manager

router.get(
    '/managers/me/commissions',
    auth,
    permit('Jefe de Area'),
    CommissionController.managerFindCommissions,
);

router.get(
    '/managers/me/commissions/:id',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    '/managers/me/commissions/:id/approve',
    auth,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);

// Finances

router.get(
    '/departments/:department/commissions/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    '/employees/:employee/commissions',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    '/commissions/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

router.patch(
    '/commissions/:id/approve',
    auth,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.patch(
    '/commission/:id/deposit',
    auth,
    permit('Finanzas'),
    CommissionController.depositToCommision,
);

module.exports = router;
