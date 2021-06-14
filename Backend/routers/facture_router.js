const express = require('express');

const {verifyToken, permit} = require('../middleware/auth');
const upload = require('../middleware/upload.js');

const FactureController = require('../controllers/facture_controller.js');

const router = new express.Router();

const ROOT_PATH = '/api/v1';

router.get(
    ROOT_PATH + '/facture',
    verifyToken,
    permit('Empleado'),
    FactureController.findAllFactures,
);

router.post(
    ROOT_PATH + '/facture',
    verifyToken,
    permit('Empleado'),
    upload.single('facture'),
    FactureController.createFacture,
);

router.get(
    ROOT_PATH + '/employee/:commission/facture',
    verifyToken,
    FactureController.findFacturesByCommissionAndEmployee,
);

router.get(
    ROOT_PATH + '/:commission/facture',
    verifyToken,
    permit('Jefe de Area', 'Finanzas'),
    FactureController.findFacturesByCommission,
);

module.exports = router;
