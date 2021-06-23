const express = require('express');

const {permit, auth} = require('../middleware/auth');
const upload = require('../middleware/upload.js');

const FactureController = require('../controllers/facture_controller.js');

const router = new express.Router();

const ROOT_PATH = '/api/v1';
const URL_PATH_V2 = '/api/v2';


/**
 * v2 Routing
 *
*/

router.get(
    ROOT_PATH + '/facture',
    auth,
    permit('Empleado'),
    FactureController.findAllFactures,
);

router.post(
    ROOT_PATH + '/facture',
    auth,
    permit('Empleado'),
    upload.single('facture'),
    FactureController.createFacture,
);

router.get(
    ROOT_PATH + '/employee/:commission/facture',
    auth,
    FactureController.findFacturesByCommissionAndEmployee,
);

router.get(
    ROOT_PATH + '/:commission/facture',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    FactureController.findFacturesByCommission,
);

router.get(
    ROOT_PATH + '/finances/:employee/facture',
    auth,
    FactureController.findFacturesByEmployee,
);

/**
 * v2 Routing
 *
*/

router.get(
    `${URL_PATH_V2}/employee/factures`,
    auth,
    permit('Empleado'),
    FactureController.findAllFactures,
);

router.post(
    `${URL_PATH_V2}/employee/factures`,
    auth,
    permit('Empleado'),
    upload.single('facture'),
    FactureController.createFacture,
);

router.get(
    `${URL_PATH_V2}/employee/commissions/:commission/factures`,
    auth,
    FactureController.findFacturesByCommissionAndEmployee,
);

router.get(
    `${URL_PATH_V2}/manager/commissions/:commission/factures`,
    auth,
    permit('Jefe de Area'),
    FactureController.findFacturesByCommission,
);

router.get(
    `${URL_PATH_V2}/finance/commissions/:commission/factures`,
    auth,
    permit('Finanzas'),
    FactureController.findFacturesByCommission,
);

router.get(
    `${URL_PATH_V2}/finance/employees/:employee/factures`,
    auth,
    permit('Finanzas'),
    FactureController.findFacturesByEmployee,
);


module.exports = router;
