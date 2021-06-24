const express = require('express');
const {FactureController} = require('../controllers/index.js');
const {permit, auth} = require('../middleware/auth');
const upload = require('../middleware/upload.js');

const router = new express.Router();

router.get(
    '/employee/me/commissions/:commission/factures',
    auth,
    FactureController.employeeFindFacturesByCommission,
);

router.get(
    '/employee/factures',
    auth,
    permit('Empleado'),
    FactureController.findAllFactures,
);

router.post(
    '/employee/factures',
    auth,
    permit('Empleado'),
    upload.single('facture'),
    FactureController.createFacture,
);

router.get(
    '/manager/commissions/:commission/factures',
    auth,
    permit('Jefe de Area'),
    FactureController.findFacturesByCommission,
);

router.get(
    '/finance/commissions/:commission/factures',
    auth,
    permit('Finanzas'),
    FactureController.findFacturesByCommission,
);

router.get(
    '/finance/employees/:employee/factures',
    auth,
    permit('Finanzas'),
    FactureController.findFacturesByEmployee,
);

module.exports = router;
