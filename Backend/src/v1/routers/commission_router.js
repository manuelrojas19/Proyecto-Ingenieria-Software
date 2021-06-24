const express = require('express');
const {permit, auth} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '';
const URL_PATH_V2 = '/api/v2';

const {CommissionController} = require('../controllers/index.js');

/**
 * V1 Routing
 *
*/

// Employee

router.post(
    ROOT_PATH + '/commission',
    auth,
    permit('Empleado'),
    CommissionController.createCommission,
);

router.get(
    ROOT_PATH + '/commission',
    auth,
    permit('Empleado', 'Finanzas'),
    CommissionController.findCommissionsByEmployee,
);

router.get(
    ROOT_PATH + '/commission/:id',
    auth,
    permit('Empleado'),
    CommissionController.findCommissionByIdAndEmployee,
);


// Manager

router.get(
    ROOT_PATH + '/manager/commission',
    auth,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);

router.get(
    ROOT_PATH + '/manager/commission/:id',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    ROOT_PATH + '/manager/commission/:id',
    auth,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);


// Finances

router.patch(
    ROOT_PATH + '/finances/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.get(
    ROOT_PATH + '/finances/:department/commission',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    ROOT_PATH + '/finances/employees/:id/commission',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    ROOT_PATH + '/finances/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

router.patch(
    ROOT_PATH + '/deposit/commission/:id',
    auth,
    permit('Finanzas'),
    CommissionController.depositToCommision,
);

/**
 * V2 Routing
 *
*/

// Employee

router.get(
    `${URL_PATH_V2}/employee/commissions`,
    auth,
    permit('Empleado'),
    CommissionController.findCommissionsByEmployee,
);

router.post(
    `${URL_PATH_V2}/employee/commissions`,
    auth,
    permit('Empleado'),
    CommissionController.createCommission,
);

router.get(
    `${URL_PATH_V2}/employee/commissions/:id`,
    auth,
    permit('Empleado'),
    CommissionController.findCommissionByIdAndEmployee,
);

// Manager

router.get(
    `${URL_PATH_V2}/manager/commissions`,
    auth,
    permit('Jefe de Area'),
    CommissionController.findCommissionsByManager,
);

router.get(
    `${URL_PATH_V2}/manager/commissions/:id`,
    auth,
    permit('Jefe de Area', 'Finanzas'),
    CommissionController.findCommissionByIdAndManager,
);

router.patch(
    `${URL_PATH_V2}/manager/commissions/:id/approve`,
    auth,
    permit('Jefe de Area'),
    CommissionController.updateCommissionByManager,
);

// Finances

router.get(
    `${URL_PATH_V2}/finance/departments/:department/commissions/:id`,
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByDepartment,
);

router.get(
    `${URL_PATH_V2}/finance/employees/:employee/commissions`,
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionsByEmployeeId,
);

router.get(
    `${URL_PATH_V2}/finance/commissions/:id`,
    auth,
    permit('Finanzas'),
    CommissionController.findCommissionById,
);

router.patch(
    `${URL_PATH_V2}/finance/commissions/:id/approve`,
    auth,
    permit('Finanzas'),
    CommissionController.updateCommissionByFinances,
);

router.patch(
    ROOT_PATH + '/finance/commission/:id/deposit',
    auth,
    permit('Finanzas'),
    CommissionController.depositToCommision,
);

module.exports = router;
