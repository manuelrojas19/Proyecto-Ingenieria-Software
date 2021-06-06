const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';

const FactureController = require('../controllers/facture_controller.js');
const upload = require('../util/upload');

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

module.exports = router;
