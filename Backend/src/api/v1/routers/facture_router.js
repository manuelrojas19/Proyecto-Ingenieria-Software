const express = require('express');

const {permit, auth} = require('../middleware/auth');
const upload = require('../middleware/upload.js');

const {FactureController} = require('../controllers/index.js');

const router = new express.Router();

router.get(
    '/facture',
    auth,
    permit('Empleado'),
    FactureController.findAllFactures,
);

router.post(
    '/facture',
    auth,
    permit('Empleado'),
    upload.single('facture'),
    FactureController.createFacture,
);

router.get(
    '/employee/:commission/facture',
    auth,
    FactureController.findFacturesByCommissionAndEmployee,
);

router.get(
    '/:commission/facture',
    auth,
    permit('Jefe de Area', 'Finanzas'),
    FactureController.findFacturesByCommission,
);

router.get(
    '/finances/:employee/facture',
    auth,
    FactureController.findFacturesByEmployee,
);


module.exports = router;
