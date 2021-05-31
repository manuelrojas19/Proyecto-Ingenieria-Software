const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1/facture';

const FactureController = require('../controllers/facture_controller.js');

router.get(
    ROOT_PATH + '/all',
    verifyToken,
    permit('Empleado'),
    FactureController.findAllFactures,
);

module.exports = router;
